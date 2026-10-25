import { useState } from 'react'
import { Avatar, Check, PageTop, Toggle } from '../components/ui.jsx'
import { PERMISSION_MATRIX, PERMISSIONS, ROLES, RULES, RULES_ON, STAFF, STAFF_ROLES } from '../data/mock.js'

export default function Settings() {
  const [who, setWho] = useState(STAFF_ROLES)
  const [matrix, setMatrix] = useState(PERMISSION_MATRIX)
  const [rules, setRules] = useState(RULES_ON)
  const [saved, setSaved] = useState(true)

  const change = (setter) => (value) => { setter(value); setSaved(false) }
  const cycleRole = (i) => change(setWho)(who.map((r, k) => (k === i ? (r + 1) % ROLES.length : r)))
  // Super admin (first column) always has every permission.
  const togglePerm = (i, j) => j !== 0 && change(setMatrix)(matrix.map((row, a) => (a === i ? row.map((v, b) => (b === j ? 1 - v : v)) : row)))
  const toggleRule = (i) => change(setRules)(rules.map((v, k) => (k === i ? 1 - v : v)))

  return (
    <main className="main">
      <PageTop sub="Kim nimaga ruxsatli va platforma qoidalari" title="Sozlamalar va rollar">
        <button type="button" className="btn pri" onClick={() => setSaved(true)}>{saved ? '✓ Saqlangan' : 'O‘zgarishlarni saqlash'}</button>
      </PageTop>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', alignItems: 'start' }}>
        <div className="box">
          <div className="bh"><b>Jamoa</b><span className="mu" style={{ fontSize: 12 }}>admin panelga Telegram orqali kiradi</span></div>
          {STAFF.map(([i, bg, n, u], k) => (
            <div key={u} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0', borderTop: '1px solid #EEF1EA' }}>
              <Avatar i={i} bg={bg} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{n}</b><span className="mu" style={{ fontSize: 12 }}>{u}</span></span>
              <button type="button" className="fc" onClick={() => cycleRole(k)}>{ROLES[who[k]]} ▾</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #EEF1EA', paddingTop: 12 }}>
            <label className="fl" htmlFor="inv" style={{ flex: 1 }}>Taklif qilish<input id="inv" placeholder="@telegram_username" /></label>
            <button type="button" className="btn" style={{ alignSelf: 'flex-end' }}>Taklif yuborish</button>
          </div>
        </div>

        <div className="box">
          <div className="bh"><b>Rollar va ruxsatlar</b><span className="mu" style={{ fontSize: 12 }}>katakni bosing</span></div>
          <div className="tw" style={{ border: 0 }}>
            <table>
              <thead><tr><th>Ruxsat</th>{ROLES.map((r) => <th key={r} style={{ textAlign: 'center' }}>{r}</th>)}</tr></thead>
              <tbody>
                {PERMISSIONS.map((l, i) => (
                  <tr key={l}>
                    <td style={{ fontSize: 13 }}>{l}</td>
                    {ROLES.map((r, j) => (
                      <td key={r} style={{ textAlign: 'center' }}>
                        <Check on={Boolean(matrix[i][j])} onClick={() => togglePerm(i, j)} label={`${r}: ${l}`} style={{ display: 'inline-flex', width: 'auto', padding: 0 }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="box">
          <div className="bh"><b>Komissiya va tariflar</b></div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
            <label className="fl" htmlFor="c1">Klub oylik tarifi<input id="c1" defaultValue="300 000 so‘m" onChange={() => setSaved(false)} /></label>
            <label className="fl" htmlFor="c2">Klub bronidan komissiya<input id="c2" defaultValue="1–2%" onChange={() => setSaved(false)} /></label>
            <label className="fl" htmlFor="c3">Murabbiy darsidan<input id="c3" defaultValue="5%" onChange={() => setSaved(false)} /></label>
            <label className="fl" htmlFor="c4">Turnir kirish to‘lovidan<input id="c4" placeholder="[belgilanmagan]" onChange={() => setSaved(false)} /></label>
            <label className="fl" htmlFor="c5">Homiylik paketi<input id="c5" placeholder="[belgilanmagan]" onChange={() => setSaved(false)} /></label>
            <label className="fl" htmlFor="c6">Klub sinov muddati<input id="c6" placeholder="[agar bo‘lsa]" onChange={() => setSaved(false)} /></label>
          </div>
        </div>

        <div className="box">
          <div className="bh"><b>Arizalar va to‘lov qoidalari</b></div>
          {RULES.map(([l, h], i) => (
            <div key={l} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '4px 0' }}>
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{l}</b><span className="mu" style={{ fontSize: 12 }}>{h}</span></span>
              <Toggle on={Boolean(rules[i])} label={l} onClick={() => toggleRule(i)} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
