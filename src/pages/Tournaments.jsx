import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, PageTop, Search, Status, Tabs, Toggle } from '../components/ui.jsx'
import { appLink, TOURNAMENT_STATUS, TOURNAMENTS } from '../data/mock.js'

const TABS = [['all', 'Hammasi'], ['draft', 'Qoralama'], ['rev', 'Tekshiruvda'], ['pub', 'E’lon qilingan'], ['run', 'Davom etmoqda'], ['end', 'Yakunlangan'], ['stop', 'To‘xtatilgan']]
const MAX_FEATURED = 4

export default function Tournaments() {
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [feat, setFeat] = useState(['pirat', 'autumn', 'padel'])
  const [banner, setBanner] = useState('padel')
  const [stopped, setStopped] = useState([])
  const [modal, setModal] = useState('')

  const stOf = (t) => (stopped.includes(t.id) ? 'stop' : t.st)
  const live = (t) => ['pub', 'run'].includes(stOf(t))
  const byId = (id) => TOURNAMENTS.find((t) => t.id === id)
  const query = q.trim().toLowerCase()
  const list = TOURNAMENTS.filter((t) => (tab === 'all' || stOf(t) === tab) && (!query || `${t.name} ${t.org} ${t.sport}`.toLowerCase().includes(query)))
  const stopT = modal ? byId(modal) : null

  const toggleFeat = (t) => {
    if (!live(t)) return
    if (feat.includes(t.id)) setFeat(feat.filter((x) => x !== t.id))
    else if (feat.length < MAX_FEATURED) setFeat([...feat, t.id])
  }
  const move = (i, d) => {
    const j = i + d
    if (j < 0 || j >= feat.length) return
    const f = feat.slice()
    ;[f[i], f[j]] = [f[j], f[i]]
    setFeat(f)
  }
  const doStop = () => {
    setStopped([...stopped, modal])
    setFeat(feat.filter((x) => x !== modal))
    if (banner === modal) setBanner('')
    setModal('')
  }

  return (
    <main className="main">
      <PageTop sub="Tasdiqlangan arizalar shu yerga tushadi" title="Turnirlar">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Search placeholder="Qidirish…" value={q} onChange={setQ} style={{ minWidth: 220 }} />
          <Link className="btn" to="/arizalar">Arizalar (3 yangi)</Link>
        </div>
      </PageTop>
      <Tabs label="Turnir holati" wrap value={tab} onChange={setTab}
        items={TABS.map(([id, l]) => [id, l, TOURNAMENTS.filter((t) => id === 'all' || stOf(t) === id).length])} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '999 1 640px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="tw">
            <table>
              <thead><tr><th>Turnir</th><th>Tashkilotchi</th><th>Sana</th><th>Ishtirok</th><th>Yig‘ilgan</th><th>Holat</th><th>Saytda</th><th>Banner</th><th></th></tr></thead>
              <tbody>
                {list.map((t) => {
                  const ok = live(t)
                  const [label, cls] = TOURNAMENT_STATUS[stOf(t)]
                  return (
                    <tr key={t.id}>
                      <td><div style={{ display: 'flex', flexDirection: 'column' }}><b>{t.name}</b><span className="mu" style={{ fontSize: 12 }}>{t.sport}</span></div></td>
                      <td>{t.org}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{t.date}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 80 }}>
                          <span style={{ fontSize: 13 }}>{t.c} / {t.m}</span>
                          <span style={{ height: 4, borderRadius: 2, background: '#E6ECE1', overflow: 'hidden' }}>
                            <span style={{ display: 'block', height: '100%', width: `${Math.round((t.c / t.m) * 100)}%`, background: '#5FA318' }} />
                          </span>
                        </div>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>{t.money}</td>
                      <td><Status cls={cls}>{label}</Status></td>
                      <td><Toggle on={feat.includes(t.id)} onClick={() => toggleFeat(t)} label="Saytda ko‘rsatish" disabled={!ok} /></td>
                      <td><Toggle on={banner === t.id} onClick={() => setBanner(banner === t.id ? '' : t.id)} label="Bannerda ko‘rsatish" disabled={!ok} /></td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <a className="btn sm" href={appLink('/tournament/pirat-cup')} target="_blank" rel="noreferrer">Ochish</a>{' '}
                        <button type="button" className="btn sm no" onClick={() => ok && setModal(t.id)} style={ok ? undefined : { visibility: 'hidden' }}>To‘xtatish</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <span className="mu" style={{ fontSize: 12 }}>«Saytda» = kigo.uz bosh sahifasidagi «Tanlangan turnirlar» (4 ta joy). «Banner» = mini ilova bosh ekranining tepasidagi katta karta (1 ta). Faqat «E’lon qilingan» va «Davom etmoqda» turnirlarni yoqish mumkin.</span>
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="box">
            <div className="bh"><b>Saytdagi tartib</b><span className="mu" style={{ fontSize: 12 }}>{feat.length} / {MAX_FEATURED}</span></div>
            {feat.map((id, i) => (
              <div key={id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid #E1E7DC', borderRadius: 10 }}>
                <b style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, width: 18 }}>{i + 1}</b>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{byId(id).name}</span>
                <button type="button" className="btn sm" onClick={() => move(i, -1)} aria-label="Yuqoriga">↑</button>
                <button type="button" className="btn sm" onClick={() => move(i, 1)} aria-label="Pastga">↓</button>
              </div>
            ))}
            {feat.length < MAX_FEATURED && (
              <div style={{ padding: 10, border: '1.5px dashed #C9D3C4', borderRadius: 10, fontSize: 13, color: '#5A6B5E', textAlign: 'center' }}>Bo‘sh joy: jadvaldan «Saytda» ni yoqing</div>
            )}
            <Link to="/landing" style={{ fontSize: 13 }}>Landing bo‘limida ko‘rinishini ko‘rish →</Link>
          </div>
          <div className="box">
            <div className="bh"><b>Avtomatik qoidalar</b></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, lineHeight: 1.4 }}>
              <span>• Boshlanish sanasida holat «Davom etmoqda» bo‘ladi.</span>
              <span>• Oxirgi natija kiritilgach «Yakunlangan», saytdan va bannerdan o‘zi tushadi.</span>
              <span>• Ro‘yxat to‘lsa, kartada «Joy qolmadi» yoziladi.</span>
              <span>• Minimal ishtirokchi yig‘ilmasa, 48 soat oldin tashkilotchiga ogohlantirish.</span>
            </div>
          </div>
        </div>
      </div>

      {stopT && (
        <Modal label="To‘xtatish">
          <b style={{ fontSize: 18 }}>«{stopT.name}» turnirini to‘xtatish</b>
          <span style={{ fontSize: 14, lineHeight: 1.45 }}>Turnir saytdan va ilovadan olinadi. To‘lagan <b>{stopT.c}</b> ishtirokchiga pul avtomatik qaytariladi ({stopT.money} so‘m). Tashkilotchi va ishtirokchilarga bot xabar yuboradi.</span>
          <label className="fl" htmlFor="sr">Sabab (hamma ko‘radi)<textarea id="sr" defaultValue="Tashkilotchi iltimosiga ko‘ra turnir boshqa sanaga ko‘chiriladi." /></label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn" onClick={() => setModal('')}>Bekor</button>
            <button type="button" className="btn" onClick={doStop} style={{ background: '#8A2A2A', color: '#fff', borderColor: '#8A2A2A' }}>To‘xtatish va pulni qaytarish</button>
          </div>
        </Modal>
      )}
    </main>
  )
}
