import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageTop, Avatar } from '../components/ui.jsx'
import { DASH } from '../data/mock.js'

const WEEKDAYS = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

function today() {
  const d = new Date()
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}-${MONTHS[d.getMonth()]}`
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [per, setPer] = useState(1)
  const [q, setQ] = useState('')

  const values = DASH.bars[per]
  const max = Math.max(...values)
  const bars = values.map((v, i) => ({ v: v || '', l: DASH.barLabels[per][i], h: (v ? Math.round((v / max) * 140) : 2) + 'px', c: i === 4 ? '#5FA318' : '#C8DDB0' }))

  return (
    <main className="main">
      <PageTop sub={today()} title="Boshqaruv">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <form className="srch" onSubmit={(e) => { e.preventDefault(); navigate(`/arizalar?q=${encodeURIComponent(q)}`) }}>
            <input aria-label="Qidirish" placeholder="Qidirish: ariza, klub, foydalanuvchi…" value={q} onChange={(e) => setQ(e.target.value)} />
          </form>
          <div style={{ display: 'flex', gap: 6 }}>
            {DASH.periods.map((p, i) => (
              <button key={p} type="button" className={per === i ? 'fc on' : 'fc'} onClick={() => setPer(i)}>{p}</button>
            ))}
          </div>
        </div>
      </PageTop>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', borderRadius: 12, background: '#FFF1CC', color: '#7A5200', fontSize: 14, flexWrap: 'wrap' }}>
        <b>2 ta ariza 24 soatdan beri javobsiz.</b>
        <span style={{ flex: 1 }}>Tashkilotchilar kutmoqda, muddat o‘tdi.</span>
        <Link className="btn sm" to="/arizalar">Ko‘rish</Link>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {DASH.kpis[per].map(([l, v, d, c, href]) => (
          <Link key={l} className="box kpi" to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="mu" style={{ fontSize: 13 }}>{l}</span>
            <span className="v">{v}</span>
            <span style={{ fontSize: 12, color: c }}>{d}</span>
          </Link>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)' }}>
        <div className="box">
          <div className="bh"><b>Ko‘rib chiqilishi kerak</b><Link to="/arizalar" style={{ fontSize: 13 }}>Barcha arizalar →</Link></div>
          <div className="tw" style={{ border: 0 }}>
            <table>
              <thead><tr><th>Ariza</th><th>Turi</th><th>Kimdan</th><th>Kutmoqda</th><th>Holat</th><th></th></tr></thead>
              <tbody>
                {DASH.queue.map(([n, t, w, age, wc, sc, s]) => (
                  <tr key={n}>
                    <td><b>{n}</b></td><td>{t}</td><td>{w}</td>
                    <td style={{ color: wc, fontWeight: 600 }}>{age}</td>
                    <td><span className={`st ${sc}`}>{s}</span></td>
                    <td style={{ textAlign: 'right' }}><Link className="btn sm" to="/arizalar">Ochish</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="box">
          <div className="bh"><b>Bronlar, kunlar bo‘yicha</b><span className="mu" style={{ fontSize: 12 }}>{DASH.periods[per]}</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 180, paddingTop: 8, borderBottom: '1px solid #E1E7DC' }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 11, color: '#5A6B5E' }}>{b.v}</span>
                <span style={{ width: '100%', maxWidth: 34, borderRadius: '6px 6px 0 0', background: b.c, height: b.h }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {bars.map((b, i) => <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#5A6B5E' }}>{b.l}</span>)}
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="box">
          <div className="bh"><b>Hozir saytda va ilovada</b><Link to="/landing" style={{ fontSize: 13 }}>Tahrirlash →</Link></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            {DASH.live.map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}><span>{k}</span><b>{v}</b></div>)}
          </div>
        </div>
        <div className="box">
          <div className="bh"><b>So‘nggi harakatlar</b><span className="mu" style={{ fontSize: 12 }}>jamoa</span></div>
          {DASH.feed.map(([i, bg, who, what, t], k) => (
            <div key={k} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13 }}>
              <Avatar i={i} bg={bg} size={28} fontSize={11} />
              <span style={{ flex: 1, lineHeight: 1.4 }}><b>{who}</b> {what}</span>
              <span className="mu" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</span>
            </div>
          ))}
        </div>
        <div className="box">
          <div className="bh"><b>Tezkor amallar</b></div>
          {DASH.quick.map(([to, label]) => <Link key={label} className="btn" to={to} style={{ justifyContent: 'flex-start' }}>{label}</Link>)}
        </div>
      </div>
    </main>
  )
}
