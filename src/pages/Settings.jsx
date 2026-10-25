import { useEffect, useState } from 'react'
import { Avatar, Check, LoadError, Loading, PageTop, Toggle } from '../components/ui.jsx'
import { api, useApi } from '../api.js'
import { useSession } from '../session.jsx'

const COMMISSIONS = [
  ['club_tariff', 'Klub oylik tarifi', ''], ['club_commission', 'Klub bronidan komissiya', ''], ['coach', 'Murabbiy darsidan', ''],
  ['tournament', 'Turnir kirish to‘lovidan', '[belgilanmagan]'], ['sponsor', 'Homiylik paketi', '[belgilanmagan]'], ['trial', 'Klub sinov muddati', '[agar bo‘lsa]'],
]

export default function Settings() {
  const res = useApi('/api/admin/team')
  if (!res.data) {
    return (
      <main className="main">
        <PageTop sub="Kim nimaga ruxsatli va platforma qoidalari" title="Sozlamalar va rollar" />
        {res.error ? <LoadError error={res.error} onRetry={res.reload} /> : <Loading />}
      </main>
    )
  }
  return <Form res={res} />
}

function Form({ res }) {
  const { run, refresh } = useSession()
  const saved = res.data
  const init = () => ({
    roles: Object.fromEntries(saved.staff.map((p) => [p.userId, p.role])),
    matrix: saved.matrix, rules: saved.rules.map((r) => r[2]), commissions: saved.commissions,
  })
  const [s, setS] = useState(init)
  const [dirty, setDirty] = useState(false)
  const [invite, setInvite] = useState('')
  useEffect(() => { setS(init()); setDirty(false) }, [saved]) // eslint-disable-line react-hooks/exhaustive-deps

  const change = (patch) => { setS((x) => ({ ...x, ...patch })); setDirty(true) }
  const cycleRole = (uid) => change({ roles: { ...s.roles, [uid]: (s.roles[uid] + 1) % saved.roles.length } })
  // Super admin (first column) always has every permission.
  const togglePerm = (i, j) => j !== 0 && change({ matrix: s.matrix.map((row, a) => (a === i ? row.map((v, b) => (b === j ? 1 - v : v)) : row)) })
  const toggleRule = (i) => change({ rules: s.rules.map((v, k) => (k === i ? !v : v)) })

  const save = async () => {
    if (!dirty) return
    const r = await run(() => api('/api/admin/team', { method: 'PUT', body: s }))
    if (r) { res.setData(r); refresh() }
  }
  const sendInvite = async () => {
    const r = await run(() => api('/api/admin/team/staff', { method: 'POST', body: { username: invite } }))
    if (r) { res.setData(r); setInvite('') }
  }

  return (
    <main className="main">
      <PageTop sub="Kim nimaga ruxsatli va platforma qoidalari" title="Sozlamalar va rollar">
        <button type="button" className="btn pri" onClick={save}>{dirty ? 'O‘zgarishlarni saqlash' : '✓ Saqlangan'}</button>
      </PageTop>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', alignItems: 'start' }}>
        <div className="box">
          <div className="bh"><b>Jamoa</b><span className="mu" style={{ fontSize: 12 }}>admin panelga Telegram orqali kiradi</span></div>
          {saved.staff.map((p) => (
            <div key={p.userId} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0', borderTop: '1px solid #EEF1EA' }}>
              <Avatar i={p.i} bg={p.bg} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{p.name}</b><span className="mu" style={{ fontSize: 12 }}>{p.username}</span></span>
              <button type="button" className="fc" onClick={() => cycleRole(p.userId)}>{saved.roles[s.roles[p.userId]]} ▾</button>
            </div>
          ))}
          <form style={{ display: 'flex', gap: 8, borderTop: '1px solid #EEF1EA', paddingTop: 12 }} onSubmit={(e) => { e.preventDefault(); invite.trim() && sendInvite() }}>
            <label className="fl" htmlFor="inv" style={{ flex: 1 }}>Taklif qilish<input id="inv" placeholder="@telegram_username" value={invite} onChange={(e) => setInvite(e.target.value)} /></label>
            <button type="submit" className="btn" style={{ alignSelf: 'flex-end' }}>Taklif yuborish</button>
          </form>
          <span className="mu" style={{ fontSize: 12 }}>Taklif qilinadigan odam avval @charhpalak_bot ga /start yozgan bo‘lishi kerak.</span>
        </div>

        <div className="box">
          <div className="bh"><b>Rollar va ruxsatlar</b><span className="mu" style={{ fontSize: 12 }}>katakni bosing</span></div>
          <div className="tw" style={{ border: 0 }}>
            <table>
              <thead><tr><th>Ruxsat</th>{saved.roles.map((r) => <th key={r} style={{ textAlign: 'center' }}>{r}</th>)}</tr></thead>
              <tbody>
                {saved.permissions.map((l, i) => (
                  <tr key={l}>
                    <td style={{ fontSize: 13 }}>{l}</td>
                    {saved.roles.map((r, j) => (
                      <td key={r} style={{ textAlign: 'center' }}>
                        <Check on={Boolean(s.matrix[i][j])} onClick={() => togglePerm(i, j)} label={`${r}: ${l}`} style={{ display: 'inline-flex', width: 'auto', padding: 0 }} />
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
            {COMMISSIONS.map(([k, label, ph]) => (
              <label key={k} className="fl" htmlFor={k}>{label}
                <input id={k} placeholder={ph} value={s.commissions[k] || ''} onChange={(e) => change({ commissions: { ...s.commissions, [k]: e.target.value } })} />
              </label>
            ))}
          </div>
        </div>

        <div className="box">
          <div className="bh"><b>Arizalar va to‘lov qoidalari</b></div>
          {saved.rules.map(([l, h], i) => (
            <div key={l} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '4px 0' }}>
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{l}</b><span className="mu" style={{ fontSize: 12 }}>{h}</span></span>
              <Toggle on={s.rules[i]} label={l} onClick={() => toggleRule(i)} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
