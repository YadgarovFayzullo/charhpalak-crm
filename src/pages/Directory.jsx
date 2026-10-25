import { useEffect, useState } from 'react'
import { Avatar, Chips, KV, LoadError, Loading, PageTop, Search, Status, Tabs, Toggle } from '../components/ui.jsx'
import { appLink, DIRECTORY, DIRECTORY_STATUS } from '../data/constants.js'
import { api, useApi } from '../api.js'
import { useSession } from '../session.jsx'

const TABS = [['klub', 'Klublar'], ['murabbiy', 'Murabbiylar'], ['foyd', 'Foydalanuvchilar']]

function useDebounced(value, ms = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return v
}

export default function Directory({ initialTab = 'klub' }) {
  const { run } = useSession()
  const [tab, setTab] = useState(initialTab)
  const [flt, setFlt] = useState('all')
  const [selId, setSelId] = useState(null)
  const [q, setQ] = useState('')
  const query = useDebounced(q)
  const res = useApi('/api/admin/directory', { tab, q: query })

  const cur = DIRECTORY[tab]
  const rows = (res.data?.rows || []).filter((r) => flt === 'all' || r.st === flt)
  const d = res.data?.rows.find((r) => r.id === selId) || res.data?.rows[0]

  const pickTab = (t) => {
    setTab(t)
    setSelId(null)
    setFlt('all')
  }
  const patch = async (body) => {
    const row = await run(() => api(`/api/admin/directory/${tab}/${d.id}`, { method: 'PATCH', body }))
    if (row) res.setData((x) => ({ ...x, rows: x.rows.map((r) => (r.id === row.id ? row : r)) }))
  }

  return (
    <main className="main">
      <PageTop sub="Tasdiqlangan hamkorlar va foydalanuvchilar" title="Klublar, murabbiylar, foydalanuvchilar">
        <Search placeholder="Qidirish: nom, telefon, @username…" value={q} onChange={setQ} />
      </PageTop>
      <Tabs label="Ro‘yxat" value={tab} onChange={pickTab} items={TABS.map(([id, l]) => [id, l, res.data?.counts[id] ?? '…'])} />
      <Chips items={cur.filters} value={flt} onChange={setFlt} />

      {!res.data ? (res.error ? <LoadError error={res.error} onRetry={res.reload} /> : <Loading />) : (
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '999 1 560px', minWidth: 0 }}>
            <div className="tw">
              <table>
                <thead><tr>{cur.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className={d?.id === r.id ? 'rw sel' : 'rw'} onClick={() => setSelId(r.id)}>
                      <td>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <Avatar i={r.i} bg={r.bg} />
                          <span style={{ display: 'flex', flexDirection: 'column' }}>
                            <b>{r.name} <span style={{ color: '#2C7A12', fontSize: 12 }}>{r.st === 'ok' ? '✓' : ''}</span></b>
                            <span className="mu" style={{ fontSize: 12 }}>{r.sub}</span>
                          </span>
                        </div>
                      </td>
                      <td>{r.c2}</td><td>{r.c3}</td><td>{r.c4}</td>
                      <td><Status cls={DIRECTORY_STATUS[r.st]}>{r.stLabel}</Status></td>
                    </tr>
                  ))}
                  {rows.length === 0 && <tr><td colSpan={5} className="mu">Hech kim topilmadi</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          {d && (
            <div className="box" style={{ flex: '1 1 320px', minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Avatar i={d.i} bg={d.bg} size={48} fontSize={15} />
                <span style={{ display: 'flex', flexDirection: 'column', flex: 1 }}><b style={{ fontSize: 18 }}>{d.name}</b><span className="mu" style={{ fontSize: 13 }}>{d.sub}</span></span>
                <Status cls={DIRECTORY_STATUS[d.st]}>{d.stLabel}</Status>
              </div>
              <KV items={d.details} cols="130px" style={{ fontSize: 13 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid #EEF1EA', paddingTop: 10 }}>
                {cur.toggles.map(([l, h], j) => (
                  <div key={l} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '4px 0' }}>
                    <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{l}</b><span className="mu" style={{ fontSize: 12 }}>{h}</span></span>
                    <Toggle on={d.toggles[j]} label={l} onClick={() => patch({ toggle: j, value: !d.toggles[j] })} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid #EEF1EA', paddingTop: 12 }}>
                <a className="btn sm" href={appLink(d.route)} target="_blank" rel="noreferrer">Sahifasini ko‘rish</a>
                {d.sub.startsWith('@') && <a className="btn sm" href={`https://t.me/${d.sub.split(' ')[0].slice(1)}`} target="_blank" rel="noreferrer">✈ Yozish</a>}
                <button type="button" className="btn sm no" onClick={() => patch({ blocked: !d.blocked })}>{d.blocked ? 'Blokdan chiqarish' : 'Bloklash'}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
