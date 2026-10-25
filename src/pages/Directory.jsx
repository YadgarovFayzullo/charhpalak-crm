import { useState } from 'react'
import { Avatar, Chips, KV, PageTop, Search, Status, Tabs, Toggle } from '../components/ui.jsx'
import { appLink, DIRECTORY, DIRECTORY_STATUS } from '../data/mock.js'

const TABS = [['klub', 'Klublar'], ['murabbiy', 'Murabbiylar'], ['foyd', 'Foydalanuvchilar']]

export default function Directory({ initialTab = 'klub' }) {
  const [tab, setTab] = useState(initialTab)
  const [flt, setFlt] = useState('all')
  const [sel, setSel] = useState(0)
  const [q, setQ] = useState('')
  const [toggles, setToggles] = useState({})
  const [blocked, setBlocked] = useState({})

  const cur = DIRECTORY[tab]
  const query = q.trim().toLowerCase()
  const rows = cur.rows
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => (flt === 'all' || r[7] === flt) && (!query || `${r[2]} ${r[3]} ${r[9].map((k) => k[1]).join(' ')}`.toLowerCase().includes(query)))
  const d = cur.rows[sel] || cur.rows[0]
  const key = tab + sel
  const isBlocked = Boolean(blocked[key])

  const pickTab = (t) => {
    setTab(t)
    setSel(0)
    setFlt('all')
  }
  // Arena FC (the debtor) is hidden from the site by default, as in the design.
  const toggleOn = (j) => toggles[`${key}:${j}`] ?? !(tab === 'klub' && j === 0 && sel === 2)

  return (
    <main className="main">
      <PageTop sub="Tasdiqlangan hamkorlar va foydalanuvchilar" title="Klublar, murabbiylar, foydalanuvchilar">
        <Search placeholder="Qidirish: nom, telefon, @username…" value={q} onChange={setQ} />
      </PageTop>
      <Tabs label="Ro‘yxat" value={tab} onChange={pickTab} items={TABS.map(([id, l]) => [id, l, DIRECTORY[id].count])} />
      <Chips items={cur.filters} value={flt} onChange={setFlt} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '999 1 560px', minWidth: 0 }}>
          <div className="tw">
            <table>
              <thead><tr>{cur.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {rows.map(({ r, i }) => {
                  const b = Boolean(blocked[tab + i])
                  return (
                    <tr key={r[2]} className={sel === i ? 'rw sel' : 'rw'} onClick={() => setSel(i)}>
                      <td>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <Avatar i={r[0]} bg={r[1]} />
                          <span style={{ display: 'flex', flexDirection: 'column' }}>
                            <b>{r[2]} <span style={{ color: '#2C7A12', fontSize: 12 }}>{r[7] === 'ok' ? '✓' : ''}</span></b>
                            <span className="mu" style={{ fontSize: 12 }}>{r[3]}</span>
                          </span>
                        </div>
                      </td>
                      <td>{r[4]}</td><td>{r[5]}</td><td>{r[6]}</td>
                      <td><Status cls={b ? 's-no' : DIRECTORY_STATUS[r[7]]}>{b ? 'Bloklangan' : r[8]}</Status></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="box" style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar i={d[0]} bg={d[1]} size={48} fontSize={15} />
            <span style={{ display: 'flex', flexDirection: 'column', flex: 1 }}><b style={{ fontSize: 18 }}>{d[2]}</b><span className="mu" style={{ fontSize: 13 }}>{d[3]}</span></span>
            <Status cls={isBlocked ? 's-no' : DIRECTORY_STATUS[d[7]]}>{isBlocked ? 'Bloklangan' : d[8]}</Status>
          </div>
          <KV items={d[9]} cols="130px" style={{ fontSize: 13 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid #EEF1EA', paddingTop: 10 }}>
            {cur.toggles.map(([l, h], j) => (
              <div key={l} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '4px 0' }}>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{l}</b><span className="mu" style={{ fontSize: 12 }}>{h}</span></span>
                <Toggle on={toggleOn(j)} label={l} onClick={() => setToggles({ ...toggles, [`${key}:${j}`]: !toggleOn(j) })} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid #EEF1EA', paddingTop: 12 }}>
            <a className="btn sm" href={appLink(cur.route)} target="_blank" rel="noreferrer">Sahifasini ko‘rish</a>
            <button type="button" className="btn sm">✈ Yozish</button>
            <button type="button" className="btn sm no" onClick={() => setBlocked({ ...blocked, [key]: !isBlocked })}>{isBlocked ? 'Blokdan chiqarish' : 'Bloklash'}</button>
          </div>
        </div>
      </div>
    </main>
  )
}
