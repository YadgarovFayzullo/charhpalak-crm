import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Avatar, Check, Chips, KV, Modal, PageTop, Search, Status, Tabs, Toast } from '../components/ui.jsx'
import { APP_CHECKS, APP_PLACES, APP_TYPES, APPLICATIONS, FEATURED_SLOTS, INFO_FIELDS, ME, REJECT_REASONS, STATUS } from '../data/mock.js'

const FILTERS = [['all', 'Hammasi'], ['new', 'Yangi'], ['rev', 'Ko‘rib chiqilmoqda'], ['info', 'Ma’lumot so‘raldi'], ['ok', 'Tasdiqlangan'], ['no', 'Rad etilgan']]
const OPEN = ['new', 'rev', 'info']
const DONE = ['ok', 'pub', 'no']
const DEADLINES = ['24 soat', '72 soat', '7 kun']

export default function Applications() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [type, setType] = useState('turnir')
  const [flt, setFlt] = useState('all')
  const [selId, setSelId] = useState('T-0142')
  const [over, setOver] = useState({ 'T-0142': 'rev' }) // status changes made in this session
  const [checks, setChecks] = useState({ 'T-0142': [0, 2] })
  const [modal, setModal] = useState('')
  const [places, setPlaces] = useState({})
  const [slot, setSlot] = useState(3)
  const [fields, setFields] = useState(['Joy va sana', 'Sovrinlar'])
  const [deadline, setDeadline] = useState('72 soat')
  const [reason, setReason] = useState('Sana band')
  const [allowResend, setAllowResend] = useState(true)
  const [toast, setToast] = useState('')

  const stOf = (r) => over[r.id] || r.st
  const query = q.trim().toLowerCase()
  const matches = (r) => !query || [r.id, r.name, r.who, r.phone, r.tg].some((x) => x.toLowerCase().includes(query))
  const rows = APPLICATIONS.filter((r) => r.t === type && matches(r) && (flt === 'all' || stOf(r) === flt || (flt === 'ok' && stOf(r) === 'pub')))
  const sel = APPLICATIONS.find((r) => r.id === selId && r.t === type) || null
  const cst = sel ? stOf(sel) : ''
  const ck = APP_CHECKS[type]
  const done = (sel && checks[sel.id]) || []
  const allDone = done.length === ck.length
  const pls = APP_PLACES[type]
  const placeOn = (p) => (places[p[0]] !== undefined ? places[p[0]] : p[3])
  const featOn = type === 'turnir' && placeOn(pls[1])
  const isDone = DONE.includes(cst)
  const counts = Object.fromEntries(Object.keys(APP_TYPES).map((k) => [k, APPLICATIONS.filter((r) => r.t === k && OPEN.includes(stOf(r))).length]))

  // Opening a "new" application marks it as being reviewed.
  const pick = (r) => {
    if (stOf(r) === 'new') setOver({ ...over, [r.id]: 'rev' })
    setSelId(r.id)
    setModal('')
    setPlaces({})
  }
  const pickType = (k) => {
    setType(k)
    setSelId(APPLICATIONS.find((r) => r.t === k).id)
    setFlt('all')
    setModal('')
  }
  const setStatus = (v, msg) => {
    setOver({ ...over, [sel.id]: v })
    setModal('')
    setToast(msg)
  }
  const toggleCheck = (i) => {
    const cur = checks[sel.id] || []
    setChecks({ ...checks, [sel.id]: cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i] })
  }
  const toggleIn = (list, set, x) => set(list.includes(x) ? list.filter((y) => y !== x) : [...list, x])

  const history = sel ? [
    ['Ariza yuborildi', `${sel.when} · ${sel.who}`],
    ...(cst !== 'new' ? [['Ko‘rib chiqila boshladi', ME.name]] : []),
    ...(cst === 'info' ? [['Ma’lumot so‘raldi', `${ME.name} · javob kutilmoqda`]] : []),
    ...(cst === 'ok' || cst === 'pub' ? [['Tasdiqlandi', ME.name]] : []),
    ...(cst === 'pub' ? [['E’lon qilindi', 'tanlangan joylarda']] : []),
    ...(cst === 'no' ? [['Rad etildi', 'sabab yuborildi']] : []),
  ] : []

  let doneText = '', doneBtn = '', doneHref = '/turnirlar'
  if (cst === 'pub' || cst === 'ok') {
    doneText = type === 'turnir' ? 'Tasdiqlangan va e’lon qilingan. Ko‘rinish joylarini «Turnirlar» va «Landing» bo‘limida o‘zgartirasiz.' : 'Tasdiqlangan. Profil ochiq.'
    doneBtn = type === 'turnir' ? 'Turnirlar bo‘limida ochish' : 'Ro‘yxatda ochish'
    doneHref = type === 'turnir' ? '/turnirlar' : '/klublar'
  }
  if (cst === 'no') {
    doneText = 'Rad etilgan. Ariza beruvchi tuzatib qayta yuborsa, yana «Yangi» bo‘lib keladi.'
    doneBtn = 'Qayta ko‘rib chiqish'
    doneHref = '/arizalar'
  }

  return (
    <main className="main">
      <PageTop sub="Hamma kelgan so‘rovlar bir joyda" title="Arizalar">
        <Search placeholder="Qidirish: nom, raqam, telefon…" value={q} onChange={setQ} />
      </PageTop>
      <Tabs label="Ariza turi" items={Object.entries(APP_TYPES).map(([k, l]) => [k, l, counts[k]])} value={type} onChange={pickType} />
      <Chips items={FILTERS} value={flt} onChange={setFlt} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="tw">
            <table>
              <thead><tr><th>№</th><th>Nomi</th><th>Kimdan</th><th>Kutmoqda</th><th>Holat</th></tr></thead>
              <tbody>
                {rows.map((r) => {
                  const st = stOf(r)
                  return (
                    <tr key={r.id} className={sel?.id === r.id ? 'rw sel' : 'rw'} onClick={() => pick(r)}>
                      <td className="mu" style={{ fontSize: 12 }}>{r.id}</td>
                      <td><div style={{ display: 'flex', flexDirection: 'column' }}><b>{r.name}</b><span className="mu" style={{ fontSize: 12 }}>{r.sub}</span></div></td>
                      <td>{r.who}</td>
                      <td style={{ color: r.late && ['new', 'rev'].includes(st) ? '#B4321C' : '#13241A', fontWeight: 600, whiteSpace: 'nowrap' }}>{DONE.includes(st) ? '—' : r.age}</td>
                      <td><Status cls={STATUS[st][1]}>{STATUS[st][0]}</Status></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && <div className="box" style={{ alignItems: 'center', color: '#5A6B5E' }}>Bu filtrda ariza yo‘q</div>}
          <span className="mu" style={{ fontSize: 12 }}>Qatorni bosing. «Yangi» ariza ochilganda holati o‘zi «Ko‘rib chiqilmoqda» bo‘ladi.</span>
        </div>

        {sel && (
          <div className="box" style={{ flex: '1 1 520px', padding: 0, gap: 0, overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 8, borderBottom: '1px solid #E1E7DC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="mu" style={{ fontSize: 12 }}>{sel.id} · {APP_TYPES[sel.t]} · {sel.when}</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Status cls="s-gray">👁 {ME.name} ko‘ryapti</Status>
                  <Status cls={STATUS[cst][1]}>{STATUS[cst][0]}</Status>
                </span>
              </div>
              <h2 className="d" style={{ fontSize: 26 }}>{sel.name}</h2>
            </div>

            <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, borderBottom: '1px solid #E1E7DC' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <b style={{ fontSize: 14 }}>Ariza beruvchi</b>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Avatar i={sel.ini} bg="#FFD58A" size={40} />
                  <span style={{ display: 'flex', flexDirection: 'column', fontSize: 13 }}><b style={{ fontSize: 15 }}>{sel.who}</b><span className="mu">{sel.tg}</span></span>
                </div>
                <div className="kv" style={{ gridTemplateColumns: '110px minmax(0, 1fr)', fontSize: 13 }}>
                  <span>Telefon</span><span>{sel.phone} <span className="st s-ok" style={{ padding: '1px 6px' }}>✓ Telegram</span></span>
                  <span>KiGo’da</span><span>{sel.since}</span>
                  <span>Avvalgi</span><span>{sel.prev}</span>
                </div>
                <span style={{ display: 'flex', gap: 6 }}>
                  <a className="btn sm" href={`https://t.me/${sel.tg.replace('@', '')}`} target="_blank" rel="noreferrer">✈ Telegram’da yozish</a>
                  <a className="btn sm" href={`tel:${sel.phone.replace(/\s/g, '')}`}>☎ Qo‘ng‘iroq</a>
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <b style={{ fontSize: 14 }}>Ariza tafsilotlari</b>
                <KV items={sel.kv} cols="110px" style={{ fontSize: 13 }} />
                <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {sel.files.map((f) => <span key={f} className="btn sm" style={{ cursor: 'default' }}>📎 {f}</span>)}
                </span>
              </div>
            </div>

            <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, borderBottom: '1px solid #E1E7DC' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 14 }}>Tekshiruv ro‘yxati</b><span className="mu" style={{ fontSize: 12 }}>{done.length} / {ck.length}</span></div>
                {ck.map(([l, h], i) => (
                  <Check key={l} on={done.includes(i)} onClick={() => toggleCheck(i)}>
                    <span style={{ display: 'flex', flexDirection: 'column' }}><span>{l}</span><span className="mu" style={{ fontSize: 11 }}>{h}</span></span>
                  </Check>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <b style={{ fontSize: 14 }}>Tarix</b>
                {history.map(([t, w]) => (
                  <div key={t} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5FA318', marginTop: 6, flex: 'none' }} />
                    <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><span>{t}</span><span className="mu" style={{ fontSize: 11 }}>{w}</span></span>
                  </div>
                ))}
                <label className="fl" htmlFor="nt" style={{ marginTop: 4 }}>Ichki izoh (faqat adminlar ko‘radi)<input id="nt" placeholder="Masalan: klub admini bilan gaplashdim" /></label>
              </div>
            </div>

            <div style={{ padding: '14px 20px', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', background: '#F8FAF5' }}>
              {!isDone ? (
                <>
                  <button type="button" className="btn ok" onClick={() => allDone && setModal('ok')} style={allDone ? undefined : { opacity: 0.5 }}>✓ Tasdiqlash</button>
                  <button type="button" className="btn" onClick={() => setModal('info')}>? Ma’lumot so‘rash</button>
                  <button type="button" className="btn no" onClick={() => setModal('no')}>✕ Rad etish</button>
                  <span className="mu" style={{ fontSize: 12, flex: 1, textAlign: 'right' }}>
                    {allDone ? 'Hammasi tekshirildi' : `Tasdiqlash uchun tekshiruvni yakunlang (${done.length}/${ck.length})`}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: 14 }}>{doneText}</span>
                  <Link className="btn" to={doneHref}>{doneBtn}</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {modal === 'ok' && (
        <Modal label="Tasdiqlash">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><b style={{ fontSize: 18 }}>Tasdiqlash va qayerda ko‘rinishini tanlash</b><span className="mu" style={{ fontSize: 13 }}>{sel.name}</span></div>
          {pls.map((p) => {
            const lock = p[0] === 'list'
            return (
              <div key={p[0]} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderTop: '1px solid #EEF1EA' }}>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{p[1]}{lock && ' · majburiy'}</b><span className="mu" style={{ fontSize: 12 }}>{p[2]}</span></span>
                <button type="button" className={placeOn(p) ? 'tg on' : 'tg'} aria-label={p[1]} aria-pressed={placeOn(p)} style={lock ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
                  onClick={() => !lock && setPlaces({ ...places, [p[0]]: !placeOn(p) })} />
              </div>
            )
          })}
          {featOn && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="mu" style={{ fontSize: 12 }}>«Tanlangan turnirlar» joyi (saytda 4 ta karta)</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 6 }}>
                {FEATURED_SLOTS.map(([n, t], i) => (
                  <button key={n} type="button" className={slot === i ? 'btn pri' : 'btn'} onClick={() => setSlot(i)} style={{ borderRadius: 10, minHeight: 52, flexDirection: 'column', justifyContent: 'center', fontSize: 12, padding: 4 }}>
                    {n}-joy<span style={{ fontSize: 11, opacity: 0.75 }}>{slot === i ? 'shu turnir' : t}</span>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <label className="fl" htmlFor="f1" style={{ flex: 1 }}>Ko‘rsatish boshlanadi<input id="f1" defaultValue="25.10.2026" /></label>
                <label className="fl" htmlFor="f2" style={{ flex: 1 }}>Tugaydi<input id="f2" defaultValue="16.11.2026 (turnir boshlanguncha)" /></label>
              </div>
            </div>
          )}
          <span className="mu" style={{ fontSize: 12 }}>Ariza beruvchiga bot orqali «Tasdiqlandi» xabari ketadi.</span>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn" onClick={() => setModal('')}>Bekor</button>
            <button type="button" className="btn pri" onClick={() => setStatus(
              type === 'turnir' ? 'pub' : 'ok',
              type === 'turnir' ? `E’lon qilindi. Bot tashkilotchiga xabar yubordi.${featOn ? ` Saytda ${slot + 1}-joyda.` : ''}` : 'Tasdiqlandi. Ariza beruvchiga xabar ketdi.',
            )}>{type === 'turnir' ? 'Tasdiqlash va e’lon qilish' : 'Tasdiqlash'}</button>
          </div>
        </Modal>
      )}

      {modal === 'info' && (
        <Modal label="Ma’lumot so‘rash">
          <b style={{ fontSize: 18 }}>Qo‘shimcha ma’lumot so‘rash</b>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="mu" style={{ fontSize: 12 }}>Qaysi qism to‘g‘rilansin (ariza beruvchida shu maydonlar ochiladi)</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {INFO_FIELDS.map((f) => <button key={f} type="button" className={fields.includes(f) ? 'fc on' : 'fc'} onClick={() => toggleIn(fields, setFields, f)}>{f}</button>)}
            </div>
          </div>
          <label className="fl" htmlFor="im">Xabar<textarea id="im" defaultValue="Klub bilan kelishuvni tasdiqlovchi xat yoki administrator kontaktini yuboring. Sovrin fondi manbasini yozing." /></label>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
            <span className="mu">Javob muddati:</span>
            {DEADLINES.map((d) => <button key={d} type="button" className={deadline === d ? 'fc on' : 'fc'} onClick={() => setDeadline(d)}>{d}</button>)}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn" onClick={() => setModal('')}>Bekor</button>
            <button type="button" className="btn pri" onClick={() => setStatus('info', 'So‘rov botga yuborildi. Javob kelganda ariza yana «Ko‘rib chiqilmoqda» bo‘ladi.')}>Botga yuborish</button>
          </div>
        </Modal>
      )}

      {modal === 'no' && (
        <Modal label="Rad etish">
          <b style={{ fontSize: 18 }}>Arizani rad etish</b>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="mu" style={{ fontSize: 12 }}>Sabab (ariza beruvchi ko‘radi)</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {REJECT_REASONS.map((r) => <button key={r} type="button" className={reason === r ? 'fc on' : 'fc'} onClick={() => setReason(r)}>{r}</button>)}
            </div>
          </div>
          <label className="fl" htmlFor="rm">Izoh<textarea id="rm" defaultValue="Ko‘rsatilgan sanalarda klubda boshqa tadbir bor. Boshqa sana tanlab qayta yuborishingiz mumkin." /></label>
          <Check on={allowResend} onClick={() => setAllowResend(!allowResend)}><span>Qayta yuborishga ruxsat berish</span></Check>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn" onClick={() => setModal('')}>Bekor</button>
            <button type="button" className="btn no" onClick={() => setStatus('no', 'Rad etildi. Sabab ariza beruvchiga yuborildi.')} style={{ background: '#8A2A2A', color: '#fff', borderColor: '#8A2A2A' }}>Rad etish</button>
          </div>
        </Modal>
      )}

      {toast && <Toast onClose={() => setToast('')}>{toast}</Toast>}
    </main>
  )
}
