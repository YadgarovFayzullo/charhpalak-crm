import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { KV, LoadError, Loading, PageTop, Status, Tabs, Toast, Toggle } from '../components/ui.jsx'
import { FAQ, GENERAL_HERO, LANDING_HELP } from '../data/constants.js'
import { api, useApi } from '../api.js'
import { useSession } from '../session.jsx'

const EDITORS = { hero: 'hero', tur: 'tur', cta: 'cta', faq: 'faq', spons: 'spons', shop: 'shop' }
const MODES = ['Avtomatik', 'Reyting bo‘yicha', 'Qo‘lda']
const BASE = { display: 'flex', flexDirection: 'column', gap: 4, padding: 10, borderRadius: 10, background: '#12261B', border: '1px solid #22402F' }

export default function Landing({ initialSection }) {
  const content = useApi('/api/admin/content')
  const tournaments = useApi('/api/admin/tournaments')
  if (!content.data || !tournaments.data) {
    return (
      <main className="main">
        <PageTop sub="Har bir tugma qaysi blokni boshqarishini o‘ngdagi ko‘rinishda ko‘rasiz" title="Landing va ilova kontenti" />
        {content.error || tournaments.error ? <LoadError error={content.error || tournaments.error} onRetry={() => { content.reload(); tournaments.reload() }} /> : <Loading />}
      </main>
    )
  }
  return <Editor content={content} tournaments={tournaments.data} initialSection={initialSection} />
}

function Editor({ content, tournaments, initialSection }) {
  const { run } = useSession()
  const saved = content.data
  const fromSaved = () => ({ on: saved.on, hero: saved.hero, mode: saved.mode, sponsors: saved.sponsors, tur: saved.featured.map((t) => t.id) })
  const [w, setW] = useState('sayt')
  const [sel, setSel] = useState(initialSection || 'hero')
  const [s, setS] = useState(fromSaved)
  const [dirty, setDirty] = useState(0)
  const [toast, setToast] = useState(false)
  useEffect(() => { setS(fromSaved()); setDirty(0) }, [saved]) // eslint-disable-line react-hooks/exhaustive-deps

  const touch = (patch) => { setS((x) => ({ ...x, ...patch })); setDirty((n) => n + 1); setToast(false) }
  const list = w === 'sayt' ? saved.site : saved.app
  const isOn = (b) => s.on[`${w}:${b[0]}`] ?? b[3]
  const cur = list.find((b) => b[0] === sel) || list[0]
  const editor = EDITORS[cur[0]] || 'list'
  const on = isOn(cur)

  const liveTours = tournaments.filter((t) => ['pub', 'run'].includes(t.st))
  const heroOptions = [
    ...liveTours.slice(0, 2).map((t) => ({ id: t.id, title: t.name, sub: `Turnir · ${t.sport} · ${t.date}`, btn: 'Ro‘yxatdan o‘tish', link: 'Turnir sahifasi' })),
    GENERAL_HERO,
  ]
  const h = heroOptions.find((x) => x.id === s.hero) || GENERAL_HERO
  const tourName = (id) => tournaments.find((t) => t.id === id)?.name || id

  const publish = async () => {
    if (!dirty) return
    const r = await run(() => api('/api/admin/content', { method: 'PUT', body: { on: s.on, hero: s.hero, mode: s.mode, sponsors: s.sponsors, featured: s.tur, changes: dirty } }))
    if (!r) return
    content.setData(r)
    setToast(true)
  }

  const PV = {
    hero: () => ({ t: h.title, d: h.sub, items: [`${h.btn} →`], fs: 17, style: { display: 'flex', flexDirection: 'column', gap: 6, padding: '14px 12px', borderRadius: 12, background: 'linear-gradient(135deg, #1A3A26, #0F2418)', border: '1px solid #2C4C39' } }),
    sport: () => ({ t: 'Sport turlari', d: '', items: ['Bilyard', 'Futbol', 'Padel', 'Tennis', 'Shaxmat'] }),
    tur: () => ({ t: 'Tanlangan turnirlar', d: `${s.tur.length} ta karta`, items: s.tur.map(tourName) }),
    club: () => ({ t: 'Tavsiya klublar', d: s.mode.toLowerCase(), items: ['«Pirat»', '«Olimp»'] }),
    coach: () => ({ t: 'Murabbiylar', d: '', items: ['Dilnoza S.', 'Otabek K.'] }),
    cta: () => ({ t: 'O‘z turniringizni o‘tkazing', d: 'Ariza qoldiring, 24 soatda tasdiqlaymiz', items: ['+ Turnir o‘tkazish'], style: { display: 'flex', flexDirection: 'column', gap: 4, padding: 10, borderRadius: 10, background: '#C8F25A', color: '#0F1F14' } }),
    part: () => ({ t: 'Hamkorlik', d: '', items: ['Klub', 'Murabbiy', 'Tashkilotchi', 'Homiy'] }),
    spons: () => ({ t: 'Homiylar', d: '', items: s.sponsors }),
    faq: () => ({ t: 'Savollar', d: `${FAQ.length} ta savol`, items: [] }),
    shop: () => ({ t: 'Do‘kon · tez kunda', d: 'Kutish ro‘yxatiga yoziling', items: ['Yozilish'] }),
    quick: () => ({ t: 'Tezkor', d: '', items: ['Joy bron', 'Sherik', 'Turnir'] }),
    near: () => ({ t: 'Yaqin atrofda', d: 'joylashuv bo‘yicha', items: ['«Pirat»', '«Aqua Sport»'] }),
    games: () => ({ t: 'Ochiq o‘yinlar', d: 'sherik kerak', items: ['Futbol 19:00', 'Bilyard 21:00'] }),
  }
  const preview = list.filter(isOn).map((b) => {
    const v = PV[b[0]]()
    const hl = b[0] === sel ? { outline: '2px solid #C8F25A', outlineOffset: 2 } : {}
    return { key: b[0], ...v, style: { ...(v.style || BASE), ...hl } }
  })

  return (
    <main className="main">
      <PageTop sub="Har bir tugma qaysi blokni boshqarishini o‘ngdagi ko‘rinishda ko‘rasiz" title="Landing va ilova kontenti">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Status cls={dirty ? 's-rev' : 's-ok'}>{dirty ? `${dirty} ta o‘zgarish e’lon qilinmagan` : 'Hammasi e’lon qilingan'}</Status>
          <button type="button" className="btn" onClick={() => { setS(fromSaved()); setDirty(0) }}>Bekor qilish</button>
          <button type="button" className="btn pri" onClick={publish} style={dirty ? undefined : { opacity: 0.5 }}>E’lon qilish</button>
        </div>
      </PageTop>
      <Tabs label="Qaysi sahifa" value={w} onChange={(x) => { setW(x); setSel('hero') }}
        items={[['sayt', 'kigo.uz sayti (landing)'], ['ilova', 'Telegram mini ilova: bosh ekran']]} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', maxWidth: 360, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="mu" style={{ fontSize: 12, padding: '0 2px' }}>Bloklar (yuqoridan pastga, sahifadagi tartibda)</span>
          {list.map((b) => {
            const o = isOn(b)
            return (
              <div key={b[0]} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', borderRadius: 12, border: '1px solid #E1E7DC', background: b[0] === sel ? '#F4FBE3' : '#fff' }}>
                <button type="button" onClick={() => setSel(b[0])} style={{ flex: 1, background: 'none', border: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer', color: '#13241A', display: 'flex', flexDirection: 'column', gap: 2, padding: 0 }}>
                  <b style={{ fontSize: 14 }}>{b[1]}</b><span className="mu" style={{ fontSize: 12 }}>{b[2]}</span>
                </button>
                <Toggle on={o} label={b[1]} onClick={() => { setSel(b[0]); touch({ on: { ...s.on, [`${w}:${b[0]}`]: !o } }) }} />
              </div>
            )
          })}
        </div>

        <div className="box" style={{ flex: '1 1 340px', minWidth: 0 }}>
          <div className="bh"><b>{cur[1]}</b><Status cls={on ? 's-ok' : 's-gray'}>{on ? 'Ko‘rinadi' : 'Yashirin'}</Status></div>
          <span className="mu" style={{ fontSize: 13, lineHeight: 1.45 }}>{LANDING_HELP[cur[0]] || 'Yoqilgan bo‘lsa, blok shu tartibda chiqadi. Kontent tegishli bo‘limdan avtomatik olinadi.'}</span>

          {editor === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="mu" style={{ fontSize: 12 }}>Nimani ko‘rsatamiz</span>
              {heroOptions.map((x) => (
                <button key={x.id} type="button" className={h.id === x.id ? 'btn pri' : 'btn'} onClick={() => touch({ hero: x.id })} style={{ justifyContent: 'center', minHeight: 56, padding: '10px 14px', textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start', gap: 2, whiteSpace: 'normal' }}>
                  {x.title}<span style={{ fontSize: 12, fontWeight: 400, opacity: 0.75 }}>{x.sub}</span>
                </button>
              ))}
              <label className="fl" htmlFor="hb">Tugma matni<input id="hb" key={h.id} defaultValue={h.btn} /></label>
              <label className="fl" htmlFor="hl">Tugma qayerga olib boradi<div className="in" id="hl">{h.link}</div></label>
            </div>
          )}

          {editor === 'tur' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.tur.map((id, i) => (
                <div key={id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid #E1E7DC', borderRadius: 10 }}>
                  <b style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, width: 18 }}>{i + 1}</b>
                  <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{tourName(id)}</b><span className="mu" style={{ fontSize: 12 }}>E’lon qilingan</span></span>
                  <button type="button" className="btn sm" onClick={() => touch({ tur: s.tur.filter((x) => x !== id) })}>Olib tashlash</button>
                </div>
              ))}
              {s.tur.length === 0 && <span className="mu" style={{ fontSize: 13 }}>Hozircha tanlangan turnir yo‘q</span>}
              <Link className="btn" to="/turnirlar">+ Turnirlar bo‘limidan qo‘shish</Link>
              <span className="mu" style={{ fontSize: 12 }}>Yakunlangan turnir bu yerdan o‘zi tushadi. Bo‘sh joy qolsa, eng yaqin sanadagi turnir avtomatik qo‘yiladi.</span>
            </div>
          )}

          {editor === 'cta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label className="fl" htmlFor="ct">Sarlavha<input id="ct" defaultValue="O‘z turniringizni o‘tkazing" /></label>
              <label className="fl" htmlFor="cx">Matn<textarea id="cx" defaultValue="Ariza qoldiring, 24 soat ichida tasdiqlaymiz. Ro‘yxat, to‘lov va setka KiGo’da." /></label>
              <div className="kv" style={{ fontSize: 13 }}>
                <span>Tugma</span><b>+ Turnir o‘tkazish</b>
                <span>Saytda bosilsa</span><b>Telegram’da ariza formasi ochiladi</b>
                <span>Ariza tushadi</span><Link to="/arizalar">Arizalar › Turnir</Link>
              </div>
            </div>
          )}

          {editor === 'faq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FAQ.map((q) => (
                <div key={q} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 10, border: '1px solid #E1E7DC', borderRadius: 10, fontSize: 14 }}>
                  <span className="mu">⋮⋮</span><span style={{ flex: 1 }}>{q}</span><button type="button" className="btn sm">Tahrir</button>
                </div>
              ))}
              <button type="button" className="btn">+ Savol qo‘shish</button>
            </div>
          )}

          {editor === 'spons' && (
            <>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {s.sponsors.map((p) => (
                  <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid #E1E7DC', borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
                    {p} <button type="button" aria-label={`${p} ni olib tashlash`} onClick={() => touch({ sponsors: s.sponsors.filter((x) => x !== p) })} className="mu" style={{ fontWeight: 400, background: 'none', border: 0, cursor: 'pointer', padding: 0 }}>✕</button>
                  </span>
                ))}
              </div>
              <Link className="btn" to="/arizalar">+ Tasdiqlangan homiylardan</Link>
            </>
          )}

          {editor === 'shop' && (
            <KV cols="150px" style={{ fontSize: 13 }} items={[['Holat', '«Tez kunda» + kutish ro‘yxati'], ['Yozilganlar', '[N] kishi'], ['Ochilganda', 'bot hammasiga xabar yuboradi']]} />
          )}

          {editor === 'list' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="mu" style={{ fontSize: 12 }}>Qanday tanlanadi</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {MODES.map((m) => <button key={m} type="button" className={s.mode === m ? 'fc on' : 'fc'} onClick={() => touch({ mode: m })}>{m}</button>)}
              </div>
              <span className="mu" style={{ fontSize: 12 }}>«Qo‘lda» tanlansa, ro‘yxatdagi har bir elementda «Saytda» tugmasi paydo bo‘ladi.</span>
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span className="mu" style={{ fontSize: 12, alignSelf: 'flex-start' }}>Jonli ko‘rinish · {w === 'sayt' ? 'kigo.uz telefonda' : 'mini ilova bosh ekrani'}</span>
          <div style={{ width: 330, maxWidth: '100%', height: 640, borderRadius: 28, background: '#0B1811', border: '6px solid #13241A', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: '#EEF3EA', fontSize: 11 }}>
            <div style={{ height: 30, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderBottom: '1px solid #1F3A2A' }}>
              <b style={{ color: '#C8F25A' }}>KiGo</b><span style={{ opacity: 0.7 }}>{w === 'sayt' ? 'kigo.uz' : 'mini ilova'}</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {preview.map((v) => (
                <div key={v.key} style={v.style}>
                  <b style={{ fontSize: v.fs || 13, lineHeight: 1.15 }}>{v.t}</b>
                  <span style={{ opacity: 0.75 }}>{v.d}</span>
                  <span style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {v.items.map((i) => <span key={i} style={{ padding: '3px 6px', borderRadius: 6, background: 'rgba(238,243,234,.1)' }}>{i}</span>)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast onClose={() => setToast(false)}>O‘zgarishlar kigo.uz va mini ilovada e’lon qilindi</Toast>}
    </main>
  )
}
