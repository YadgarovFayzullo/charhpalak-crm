import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadError, Loading, PageTop, Status, Tabs } from '../components/ui.jsx'
import { PAYMENT_STATUS } from '../data/constants.js'
import { api, useApi } from '../api.js'
import { useSession } from '../session.jsx'

const TABS = [['all', 'Hammasi'], ['bron', 'Bronlar'], ['turnir', 'Turnir to‘lovlari'], ['dars', 'Murabbiy darslari'], ['obuna', 'Klub obunalari'], ['ref', 'Qaytarishlar']]
const REFUND_STATES = ['refreq', 'refunded', 'denied']
const HEADERS = ['№', 'Kim', 'Nima uchun', 'Qayerda', 'Summa', 'KiGo ulushi', 'Usul', 'Holat']

// CSV that Excel opens; ";" separator and BOM so Uzbek letters display correctly.
function exportCsv(rows) {
  const lines = [HEADERS, ...rows.map((r) => [r.no, r.who, `${r.what} (${r.when})`, r.where, r.sum, r.fee, r.pay, PAYMENT_STATUS[r.st][0]])]
  const csv = lines.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n')
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'kigo-tolovlar.csv' })
  a.click()
  URL.revokeObjectURL(url)
}

export default function Payments() {
  const { run } = useSession()
  const res = useApi('/api/admin/payments')
  const [tab, setTab] = useState('all')
  const d = res.data

  const list = (d?.rows || []).filter((r) => tab === 'all' || r.kind === tab || (tab === 'ref' && REFUND_STATES.includes(r.st)))
  const decide = async (r, approve) => {
    const row = await run(() => api(`/api/admin/payments/${r.id}/refund`, { method: 'POST', body: { approve } }))
    if (row) res.setData((x) => ({ ...x, rows: x.rows.map((y) => (y.id === row.id ? row : y)), kpis: { ...x.kpis, refunds: x.kpis.refunds - 1 } }))
  }

  return (
    <main className="main">
      <PageTop sub="Click va Payme orqali o‘tgan hamma pullar" title="Bronlar va to‘lovlar">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="fc">{d?.range || '…'}</span>
          <button type="button" className="btn" onClick={() => exportCsv(list)} disabled={!d}>⇩ Excel</button>
        </div>
      </PageTop>

      {!d ? (res.error ? <LoadError error={res.error} onRetry={res.reload} /> : <Loading />) : (
        <>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>Jami o‘tgan</span><span className="v">{d.kpis.total}</span><span className="mu" style={{ fontSize: 12 }}>{d.kpis.totalSub}</span></div>
            <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>KiGo komissiyasi</span><span className="v">{d.kpis.commission}</span><span className="mu" style={{ fontSize: 12 }}>klublar 1–2% · murabbiylar 5%</span></div>
            <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>Obuna to‘lovlari</span><span className="v">{d.kpis.subs}</span><span className="mu" style={{ fontSize: 12 }}>klub tariflari</span></div>
            <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>Qaytarish so‘rovlari</span><span className="v" style={{ color: d.kpis.refunds ? '#B4321C' : undefined }}>{d.kpis.refunds}</span><span className="mu" style={{ fontSize: 12 }}>ko‘rib chiqilishi kerak</span></div>
          </div>

          <Tabs label="To‘lov turi" items={TABS} value={tab} onChange={setTab} />

          <div className="tw">
            <table>
              <thead><tr>{HEADERS.map((h) => <th key={h}>{h}</th>)}<th></th></tr></thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id}>
                    <td className="mu" style={{ fontSize: 12 }}>{r.no}</td>
                    <td>{r.who}</td>
                    <td><div style={{ display: 'flex', flexDirection: 'column' }}><span>{r.what}</span><span className="mu" style={{ fontSize: 12 }}>{r.when}</span></div></td>
                    <td>{r.where}</td>
                    <td style={{ whiteSpace: 'nowrap' }}><b>{r.sum} so‘m</b></td>
                    <td style={{ whiteSpace: 'nowrap' }}>{r.fee}</td>
                    <td>{r.pay}</td>
                    <td><Status cls={PAYMENT_STATUS[r.st][1]}>{PAYMENT_STATUS[r.st][0]}</Status></td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {r.st === 'refreq' && (
                        <>
                          <button type="button" className="btn sm ok" onClick={() => decide(r, true)}>Qaytarish</button>{' '}
                          <button type="button" className="btn sm no" onClick={() => decide(r, false)}>Rad</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {list.length === 0 && <tr><td colSpan={9} className="mu">Hozircha yo‘q{tab === 'turnir' || tab === 'dars' || tab === 'obuna' ? ' — bu to‘lovlar Click/Payme ulangach paydo bo‘ladi' : ''}</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="box">
              <b>Qaytarish qoidalari</b>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, lineHeight: 1.45 }}>
                <span>• Bron 2 soatdan oldin bekor qilinsa: 100% avtomatik qaytadi.</span>
                <span>• 2 soatdan kam qolganda: klub qaroriga ko‘ra, so‘rov shu yerga tushadi.</span>
                <span>• Turnir to‘xtatilsa: hamma ishtirokchiga avtomatik 100%.</span>
                <span>• Pul Click/Payme orqali 1–3 ish kunida qaytadi.</span>
              </div>
              <Link to="/sozlamalar" style={{ fontSize: 13 }}>Sozlamalarda o‘zgartirish →</Link>
            </div>
            <div className="box">
              <b>Hamkorlarga to‘lov (payout)</b>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                {d.payouts.map(([name, sum]) => <div key={name} style={{ display: 'flex', justifyContent: 'space-between' }}><span>{name}</span><b>{sum} · {d.nextPayout}</b></div>)}
                {d.payouts.length === 0 && <span className="mu">Shu oyda to‘lov yo‘q</span>}
              </div>
              <span className="mu" style={{ fontSize: 12 }}>Haftada bir marta, komissiya ushlab qolinib o‘tkaziladi.</span>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
