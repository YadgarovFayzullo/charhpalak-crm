import { useState } from 'react'
import { KV, PageTop, Status, Tabs } from '../components/ui.jsx'
import { COMPLAINTS, REVIEWS } from '../data/mock.js'

const PRIORITY = { 'Shoshilinch': 's-no', 'O‘rta': 's-rev' }

export default function Complaints() {
  const [tab, setTab] = useState('sh')
  const [sel, setSel] = useState(0)
  const [acts, setActs] = useState({})
  const [done, setDone] = useState({})
  const [replies, setReplies] = useState({})

  const list = tab === 'sh' ? COMPLAINTS : REVIEWS
  const d = list[sel] || list[0]
  const key = tab + sel
  const isDone = Boolean(done[key])
  const chosen = acts[key] || []

  const toggleAct = (j) => setActs({ ...acts, [key]: chosen.includes(j) ? chosen.filter((x) => x !== j) : [...chosen, j] })

  return (
    <main className="main">
      <PageTop sub="Foydalanuvchilar «⋯ › Shikoyat qilish» orqali yuboradi" title="Shikoyatlar va sharhlar" />
      <Tabs label="Bo‘lim" value={tab} onChange={(t) => { setTab(t); setSel(0) }}
        items={[['sh', 'Shikoyatlar', COMPLAINTS.length], ['sr', 'Sharhlar moderatsiyasi', REVIEWS.length]]} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map((c, i) => {
            const dn = Boolean(done[tab + i])
            const on = sel === i
            return (
              <button key={c[0]} type="button" onClick={() => setSel(i)} style={{ textAlign: 'left', font: 'inherit', color: '#13241A', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6, padding: 14, borderRadius: 14, background: on ? '#F4FBE3' : '#fff', border: `1px solid ${on ? '#B5DF45' : '#E1E7DC'}` }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                  <b style={{ fontSize: 14 }}>{c[0]}</b>
                  <Status cls={dn ? 's-ok' : 's-new'}>{dn ? 'Hal qilindi' : tab === 'sh' ? 'Ochiq' : 'Kutmoqda'}</Status>
                </span>
                <span className="mu" style={{ fontSize: 13 }}>{c[1]}</span>
                <span style={{ display: 'flex', gap: 6 }}>
                  <Status cls={PRIORITY[c[2]] || c[3]}>{c[2]}</Status>
                  <span className="mu" style={{ fontSize: 12 }}>{c[4]}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="box" style={{ flex: '1 1 460px', minWidth: 0 }}>
          <div className="bh"><b style={{ fontSize: 18 }}>{d[0]}</b><Status cls={isDone ? 's-ok' : 's-new'}>{isDone ? 'Hal qilindi' : 'Ochiq'}</Status></div>
          <KV items={d[5]} style={{ fontSize: 13 }} />
          <div style={{ padding: '12px 14px', borderRadius: 12, background: '#F8FAF5', border: '1px solid #E1E7DC', fontSize: 14, lineHeight: 1.5 }}>«{d[6]}»</div>
          {d[7].length > 0 && (
            <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {d[7].map((f) => <span key={f} className="btn sm" style={{ cursor: 'default' }}>📎 {f}</span>)}
            </span>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid #EEF1EA', paddingTop: 12 }}>
            <span className="mu" style={{ fontSize: 12 }}>Chora</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {d[9].map((a, j) => <button key={a} type="button" className={chosen.includes(j) ? 'fc on' : 'fc'} onClick={() => toggleAct(j)}>{a}</button>)}
            </div>
          </div>
          <label className="fl" htmlFor="ans">Javob (ikkala tomonga bot orqali boradi)
            <textarea id="ans" value={replies[key] ?? d[8]} onChange={(e) => setReplies({ ...replies, [key]: e.target.value })} />
          </label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn">Boshqa adminga o‘tkazish</button>
            <button type="button" className="btn pri" onClick={() => setDone({ ...done, [key]: !isDone })}>
              {isDone ? 'Qayta ochish' : tab === 'sh' ? 'Hal qilindi deb yopish' : 'Saqlash'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
