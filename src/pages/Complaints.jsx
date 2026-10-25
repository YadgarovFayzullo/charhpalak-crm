import { useEffect, useState } from 'react'
import { KV, LoadError, Loading, PageTop, Status, Tabs } from '../components/ui.jsx'
import { api, useApi } from '../api.js'
import { useSession } from '../session.jsx'

export default function Complaints() {
  const { run } = useSession()
  const res = useApi('/api/admin/complaints')
  const [tab, setTab] = useState('complaint')
  const [selId, setSelId] = useState(null)
  const [reply, setReply] = useState('')

  const all = res.data || []
  const list = all.filter((c) => c.kind === tab)
  const d = list.find((c) => c.id === selId) || list[0]
  useEffect(() => { setReply(d?.reply || '') }, [d?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const save = async (body) => {
    const it = await run(() => api(`/api/admin/complaints/${d.id}`, { method: 'PATCH', body }))
    if (it) res.setData((x) => x.map((c) => (c.id === it.id ? it : c)))
  }
  const toggleAct = (j) => save({ actions: d.actions.includes(j) ? d.actions.filter((x) => x !== j) : [...d.actions, j] })
  const resolve = () => save({ reply, status: d.status === 'done' ? 'open' : 'done' })

  return (
    <main className="main">
      <PageTop sub="Foydalanuvchilar «⋯ › Shikoyat qilish» orqali yuboradi" title="Shikoyatlar va sharhlar" />
      <Tabs label="Bo‘lim" value={tab} onChange={(t) => { setTab(t); setSelId(null) }}
        items={[['complaint', 'Shikoyatlar', all.filter((c) => c.kind === 'complaint' && c.status === 'open').length], ['review', 'Sharhlar moderatsiyasi', all.filter((c) => c.kind === 'review' && c.status === 'open').length]]} />

      {!res.data ? (res.error ? <LoadError error={res.error} onRetry={res.reload} /> : <Loading />) : (
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {list.map((c) => {
              const on = d?.id === c.id
              const dn = c.status === 'done'
              return (
                <button key={c.id} type="button" onClick={() => setSelId(c.id)} style={{ textAlign: 'left', font: 'inherit', color: '#13241A', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6, padding: 14, borderRadius: 14, background: on ? '#F4FBE3' : '#fff', border: `1px solid ${on ? '#B5DF45' : '#E1E7DC'}` }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                    <b style={{ fontSize: 14 }}>{c.title}</b>
                    <Status cls={dn ? 's-ok' : 's-new'}>{dn ? 'Hal qilindi' : tab === 'complaint' ? 'Ochiq' : 'Kutmoqda'}</Status>
                  </span>
                  <span className="mu" style={{ fontSize: 13 }}>{c.sub}</span>
                  <span style={{ display: 'flex', gap: 6 }}>
                    <Status cls={c.priorityCls}>{c.priority}</Status>
                    <span className="mu" style={{ fontSize: 12 }}>{c.when}</span>
                  </span>
                </button>
              )
            })}
            {list.length === 0 && <div className="box" style={{ alignItems: 'center', color: '#5A6B5E' }}>Hozircha yo‘q</div>}
          </div>

          {d && (
            <div className="box" style={{ flex: '1 1 460px', minWidth: 0 }}>
              <div className="bh"><b style={{ fontSize: 18 }}>{d.title}</b><Status cls={d.status === 'done' ? 's-ok' : 's-new'}>{d.status === 'done' ? 'Hal qilindi' : 'Ochiq'}</Status></div>
              <KV items={d.details} style={{ fontSize: 13 }} />
              <div style={{ padding: '12px 14px', borderRadius: 12, background: '#F8FAF5', border: '1px solid #E1E7DC', fontSize: 14, lineHeight: 1.5 }}>«{d.text}»</div>
              {d.files.length > 0 && (
                <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {d.files.map((f) => <span key={f} className="btn sm" style={{ cursor: 'default' }}>📎 {f}</span>)}
                </span>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid #EEF1EA', paddingTop: 12 }}>
                <span className="mu" style={{ fontSize: 12 }}>Chora</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {d.options.map((a, j) => <button key={a} type="button" className={d.actions.includes(j) ? 'fc on' : 'fc'} onClick={() => toggleAct(j)}>{a}</button>)}
                </div>
              </div>
              <label className="fl" htmlFor="ans">{tab === 'complaint' ? 'Javob (ikkala tomonga bot orqali boradi)' : 'Izoh'}
                <textarea id="ans" value={reply} onChange={(e) => setReply(e.target.value)} />
              </label>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" className="btn">Boshqa adminga o‘tkazish</button>
                <button type="button" className="btn pri" onClick={resolve}>
                  {d.status === 'done' ? 'Qayta ochish' : tab === 'complaint' ? 'Hal qilindi deb yopish' : 'Saqlash'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
