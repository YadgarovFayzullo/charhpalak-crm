import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KV, PageTop, Status, Tabs, Toast, Toggle } from '../components/ui.jsx'
import { FAQ, FEATURED_TOURNAMENTS, HERO_OPTIONS, LANDING_APP, LANDING_HELP, LANDING_SITE, SPONSORS } from '../data/mock.js'

const EDITORS = { hero: 'hero', tur: 'tur', cta: 'cta', faq: 'faq', spons: 'spons', shop: 'shop' }
const MODES = ['Avtomatik', 'Reyting bo‘yicha', 'Qo‘lda']
const BASE = { display: 'flex', flexDirection: 'column', gap: 4, padding: 10, borderRadius: 10, background: '#12261B', border: '1px solid #22402F' }

const initial = (section) => ({
  w: 'sayt', sel: section || 'hero', onOverride: {}, hero: 0, tur: FEATURED_TOURNAMENTS, mode: 'Avtomatik', dirty: 0, toast: false,
})

export default function Landing({ initialSection }) {
  const [s, setS] = useState(() => initial(initialSection))
  const set = (patch) => setS((x) => ({ ...x, ...patch }))
  const touch = (patch) => setS((x) => ({ ...x, ...patch, dirty: x.dirty + 1, toast: false }))

  const list = s.w === 'sayt' ? LANDING_SITE : LANDING_APP
  const isOn = (b) => s.onOverride[`${s.w}:${b[0]}`] ?? b[3]
  const cur = list.find((b) => b[0] === s.sel) || list[0]
  const editor = EDITORS[cur[0]] || 'list'
  const on = isOn(cur)
  const h = HERO_OPTIONS[s.hero]

  // Live preview blocks
  const PV = {
    hero: () => ({ t: h[0], d: h[1], items: [`${h[2]} →`], fs: 17, style: { display: 'flex', flexDirection: 'column', gap: 6, padding: '14px 12px', borderRadius: 12, background: 'linear-gradient(135deg, #1A3A26, #0F2418)', border: '1px solid #2C4C39' } }),
    sport: () => ({ t: 'Sport turlari', d: '', items: ['Bilyard', 'Futbol', 'Padel', 'Tennis', 'Shaxmat'] }),
    tur: () => ({ t: 'Tanlangan turnirlar', d: `${s.tur.length} ta karta`, items: s.tur }),
    club: () => ({ t: 'Tavsiya klublar', d: 'reyting bo‘yicha', items: ['«Pirat»', 'Tennis Park', 'Arena FC'] }),
    coach: () => ({ t: 'Murabbiylar', d: '', items: ['Dilnoza S.', 'Timur A.'] }),
    cta: () => ({ t: 'O‘z turniringizni o‘tkazing', d: 'Ariza qoldiring, 24 soatda tasdiqlaymiz', items: ['+ Turnir o‘tkazish'], style: { display: 'flex', flexDirection: 'column', gap: 4, padding: 10, borderRadius: 10, background: '#C8F25A', color: '#0F1F14' } }),
    part: () => ({ t: 'Hamkorlik', d: '', items: ['Klub', 'Murabbiy', 'Tashkilotchi', 'Homiy'] }),
    spons: () => ({ t: 'Homiylar', d: '', items: ['Padel Store', 'Sport Market', 'Hydro', '[logo]'] }),
    faq: () => ({ t: 'Savollar', d: '6 ta savol', items: [] }),
    shop: () => ({ t: 'Do‘kon · tez kunda', d: 'Kutish ro‘yxatiga yoziling', items: ['Yozilish'] }),
    quick: () => ({ t: 'Tezkor', d: '', items: ['Joy bron', 'Sherik', 'Turnir'] }),
    near: () => ({ t: 'Yaqin atrofda', d: '1,2 km', items: ['«Pirat»', 'Tennis Park'] }),
    games: () => ({ t: 'Ochiq o‘yinlar', d: 'bugun 4 ta', items: ['Padel 19:00', 'Futbol 20:30'] }),
  }
  const preview = list.filter(isOn).map((b) => {
    const v = PV[b[0]]()
    const hl = b[0] === s.sel ? { outline: '2px solid #C8F25A', outlineOffset: 2 } : {}
    return { key: b[0], ...v, style: { ...(v.style || BASE), ...hl } }
  })

  return (
    <main className="main">
      <PageTop sub="Har bir tugma qaysi blokni boshqarishini o‘ngdagi ko‘rinishda ko‘rasiz" title="Landing va ilova kontenti">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Status cls={s.dirty ? 's-rev' : 's-ok'}>{s.dirty ? `${s.dirty} ta o‘zgarish e’lon qilinmagan` : 'Hammasi e’lon qilingan'}</Status>
          <button type="button" className="btn" onClick={() => setS(initial(initialSection))}>Bekor qilish</button>
          <button type="button" className="btn pri" onClick={() => s.dirty && set({ dirty: 0, toast: true })} style={s.dirty ? undefined : { opacity: 0.5 }}>E’lon qilish</button>
        </div>
      </PageTop>
      <Tabs label="Qaysi sahifa" value={s.w} onChange={(w) => set({ w, sel: 'hero' })}
        items={[['sayt', 'kigo.uz sayti (landing)'], ['ilova', 'Telegram mini ilova: bosh ekran']]} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', maxWidth: 360, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="mu" style={{ fontSize: 12, padding: '0 2px' }}>Bloklar (yuqoridan pastga, sahifadagi tartibda)</span>
          {list.map((b) => {
            const o = isOn(b)
            return (
              <div key={b[0]} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', borderRadius: 12, border: '1px solid #E1E7DC', background: b[0] === s.sel ? '#F4FBE3' : '#fff' }}>
                <button type="button" onClick={() => set({ sel: b[0] })} style={{ flex: 1, background: 'none', border: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer', color: '#13241A', display: 'flex', flexDirection: 'column', gap: 2, padding: 0 }}>
                  <b style={{ fontSize: 14 }}>{b[1]}</b><span className="mu" style={{ fontSize: 12 }}>{b[2]}</span>
                </button>
                <Toggle on={o} label={b[1]} onClick={() => touch({ onOverride: { ...s.onOverride, [`${s.w}:${b[0]}`]: !o }, sel: b[0] })} />
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
              {HERO_OPTIONS.map((x, i) => (
                <button key={x[0]} type="button" className={s.hero === i ? 'btn pri' : 'btn'} onClick={() => touch({ hero: i })} style={{ justifyContent: 'flex-start', minHeight: 52, textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                  {x[0]}<span style={{ fontSize: 12, fontWeight: 400, opacity: 0.75 }}>{x[1]}</span>
                </button>
              ))}
              <label className="fl" htmlFor="hb">Tugma matni<input id="hb" key={s.hero} defaultValue={h[2]} onChange={() => touch({})} /></label>
              <label className="fl" htmlFor="hl">Tugma qayerga olib boradi<div className="in" id="hl">{h[3]}</div></label>
            </div>
          )}

          {editor === 'tur' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.tur.map((t, i) => (
                <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid #E1E7DC', borderRadius: 10 }}>
                  <b style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, width: 18 }}>{i + 1}</b>
                  <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><b style={{ fontSize: 14 }}>{t}</b><span className="mu" style={{ fontSize: 12 }}>{i === 0 ? 'eng yaqin: 3 kun qoldi' : 'E’lon qilingan'}</span></span>
                  <button type="button" className="btn sm" onClick={() => touch({ tur: s.tur.filter((x) => x !== t) })}>Olib tashlash</button>
                </div>
              ))}
              <Link className="btn" to="/turnirlar">+ Turnirlar bo‘limidan qo‘shish</Link>
              <span className="mu" style={{ fontSize: 12 }}>Yakunlangan turnir bu yerdan o‘zi tushadi. Bo‘sh joy qolsa, eng yaqin sanadagi turnir avtomatik qo‘yiladi.</span>
            </div>
          )}

          {editor === 'cta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label className="fl" htmlFor="ct">Sarlavha<input id="ct" defaultValue="O‘z turniringizni o‘tkazing" onChange={() => touch({})} /></label>
              <label className="fl" htmlFor="cx">Matn<textarea id="cx" defaultValue="Ariza qoldiring, 24 soat ichida tasdiqlaymiz. Ro‘yxat, to‘lov va setka KiGo’da." onChange={() => touch({})} /></label>
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
                {SPONSORS.map((p) => (
                  <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid #E1E7DC', borderRadius: 10, fontWeight: 700, fontSize: 14 }}>{p} <span className="mu" style={{ fontWeight: 400 }}>✕</span></span>
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
          <span className="mu" style={{ fontSize: 12, alignSelf: 'flex-start' }}>Jonli ko‘rinish · {s.w === 'sayt' ? 'kigo.uz telefonda' : 'mini ilova bosh ekrani'}</span>
          <div style={{ width: 330, maxWidth: '100%', height: 640, borderRadius: 28, background: '#0B1811', border: '6px solid #13241A', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: '#EEF3EA', fontSize: 11 }}>
            <div style={{ height: 30, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderBottom: '1px solid #1F3A2A' }}>
              <b style={{ color: '#C8F25A' }}>KiGo</b><span style={{ opacity: 0.7 }}>{s.w === 'sayt' ? 'kigo.uz' : 'mini ilova'}</span>
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

      {s.toast && <Toast onClose={() => set({ toast: false })}>O‘zgarishlar kigo.uz va mini ilovada e’lon qilindi</Toast>}
    </main>
  )
}
