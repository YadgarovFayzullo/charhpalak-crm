import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTop, Status, Tabs } from '../components/ui.jsx'
import { PAYMENT_STATUS, PAYMENTS } from '../data/mock.js'

const TABS = [['all', 'Hammasi'], ['bron', 'Bronlar'], ['turnir', 'Turnir to‘lovlari'], ['dars', 'Murabbiy darslari'], ['obuna', 'Klub obunalari'], ['ref', 'Qaytarishlar']]
const REFUND_STATES = ['refreq', 'refunded', 'denied']
const HEADERS = ['№', 'Kim', 'Nima uchun', 'Qayerda', 'Summa', 'KiGo ulushi', 'Usul', 'Holat']

// CSV that Excel opens; ";" separator and BOM so Uzbek letters display correctly.
function exportCsv(rows, stOf) {
  const lines = [HEADERS, ...rows.map((r) => [r[0], r[1], `${r[2]} (${r[3]})`, r[4], r[5], r[6], r[7], PAYMENT_STATUS[stOf(r)][0]])]
  const csv = lines.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n')
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'kigo-tolovlar.csv' })
  a.click()
  URL.revokeObjectURL(url)
}

export default function Payments() {
  const [tab, setTab] = useState('all')
  const [ref, setRef] = useState({})

  const stOf = (r) => ref[r[0]] || r[8]
  const list = PAYMENTS.filter((r) => tab === 'all' || r[9] === tab || (tab === 'ref' && REFUND_STATES.includes(stOf(r))))
  const refN = PAYMENTS.filter((r) => stOf(r) === 'refreq').length

  return (
    <main className="main">
      <PageTop sub="Click va Payme orqali o‘tgan hamma pullar" title="Bronlar va to‘lovlar">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="fc">1–24 oktabr</span>
          <button type="button" className="btn" onClick={() => exportCsv(list, stOf)}>⇩ Excel</button>
        </div>
      </PageTop>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
        <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>Jami o‘tgan</span><span className="v">486 mln</span><span className="mu" style={{ fontSize: 12 }}>3 510 bron · 214 turnir to‘lovi</span></div>
        <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>KiGo komissiyasi</span><span className="v">7,8 mln</span><span className="mu" style={{ fontSize: 12 }}>klublar 1–2% · murabbiylar 5%</span></div>
        <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>Obuna to‘lovlari</span><span className="v">[N] × 300k</span><span className="mu" style={{ fontSize: 12 }}>klub tariflari</span></div>
        <div className="box kpi"><span className="mu" style={{ fontSize: 13 }}>Qaytarish so‘rovlari</span><span className="v" style={{ color: '#B4321C' }}>{refN}</span><span className="mu" style={{ fontSize: 12 }}>ko‘rib chiqilishi kerak</span></div>
      </div>

      <Tabs label="To‘lov turi" items={TABS} value={tab} onChange={setTab} />

      <div className="tw">
        <table>
          <thead><tr>{HEADERS.map((h) => <th key={h}>{h}</th>)}<th></th></tr></thead>
          <tbody>
            {list.map((r) => {
              const st = stOf(r)
              return (
                <tr key={r[0]}>
                  <td className="mu" style={{ fontSize: 12 }}>{r[0]}</td>
                  <td>{r[1]}</td>
                  <td><div style={{ display: 'flex', flexDirection: 'column' }}><span>{r[2]}</span><span className="mu" style={{ fontSize: 12 }}>{r[3]}</span></div></td>
                  <td>{r[4]}</td>
                  <td style={{ whiteSpace: 'nowrap' }}><b>{r[5]} so‘m</b></td>
                  <td style={{ whiteSpace: 'nowrap' }}>{r[6]}</td>
                  <td>{r[7]}</td>
                  <td><Status cls={PAYMENT_STATUS[st][1]}>{PAYMENT_STATUS[st][0]}</Status></td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {st === 'refreq' && (
                      <>
                        <button type="button" className="btn sm ok" onClick={() => setRef({ ...ref, [r[0]]: 'refunded' })}>Qaytarish</button>{' '}
                        <button type="button" className="btn sm no" onClick={() => setRef({ ...ref, [r[0]]: 'denied' })}>Rad</button>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>«Pirat»</span><b>37,6 mln · 28-okt</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Cyber Zone</span><b>51,5 mln · 28-okt</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Chilonzor Padel Open (tashkilotchi)</span><b>turnirdan keyin</b></div>
          </div>
          <span className="mu" style={{ fontSize: 12 }}>Haftada bir marta, komissiya ushlab qolinib o‘tkaziladi.</span>
        </div>
      </div>
    </main>
  )
}
