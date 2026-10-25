import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadError, Loading, Modal, PageTop, Search, Status, Tabs, Toggle } from '../components/ui.jsx'
import { appLink, TOURNAMENT_STATUS } from '../data/constants.js'
import { api, useApi } from '../api.js'
import { useSession } from '../session.jsx'

const TABS = [['all', 'Hammasi'], ['draft', 'Qoralama'], ['rev', 'Tekshiruvda'], ['pub', 'E’lon qilingan'], ['run', 'Davom etmoqda'], ['end', 'Yakunlangan'], ['stop', 'To‘xtatilgan']]
const MAX_FEATURED = 4

export default function Tournaments() {
  const { run } = useSession()
  const res = useApi('/api/admin/tournaments')
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [modal, setModal] = useState('')
  const [reason, setReason] = useState('Tashkilotchi iltimosiga ko‘ra turnir boshqa sanaga ko‘chiriladi.')

  const all = res.data || []
  const live = (t) => ['pub', 'run'].includes(t.st)
  const query = q.trim().toLowerCase()
  const list = all.filter((t) => (tab === 'all' || t.st === tab) && (!query || `${t.name} ${t.org} ${t.sport}`.toLowerCase().includes(query)))
  const feat = all.filter((t) => t.featured).sort((a, b) => a.featured - b.featured)
  const stopT = all.find((t) => t.id === modal)
  const newApps = all.filter((t) => t.application).length

  const call = async (path, method, body) => {
    const rows = await run(() => api(`/api/admin/tournaments${path}`, { method, body }))
    if (rows) res.setData(rows)
    return rows
  }
  const toggleFeat = (t) => {
    if (!live(t)) return
    if (!t.featured && feat.length >= MAX_FEATURED) return
    call(`/${t.id}/featured`, 'POST', { on: !t.featured })
  }
  const move = (i, d) => {
    const j = i + d
    if (j < 0 || j >= feat.length) return
    const ids = feat.map((t) => t.id)
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
    call('/featured', 'PUT', { ids })
  }
  const doStop = async () => {
    if (await call(`/${modal}/stop`, 'POST', { reason })) setModal('')
  }

  return (
    <main className="main">
      <PageTop sub="Tasdiqlangan arizalar shu yerga tushadi" title="Turnirlar">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Search placeholder="Qidirish…" value={q} onChange={setQ} style={{ minWidth: 220 }} />
          <Link className="btn" to="/arizalar">Arizalar{newApps ? ` (${newApps} yangi)` : ''}</Link>
        </div>
      </PageTop>
      <Tabs label="Turnir holati" wrap value={tab} onChange={setTab}
        items={TABS.map(([id, l]) => [id, l, all.filter((t) => id === 'all' || t.st === id).length])} />

      {!res.data ? (res.error ? <LoadError error={res.error} onRetry={res.reload} /> : <Loading />) : (
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '999 1 640px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="tw">
              <table>
                <thead><tr><th>Turnir</th><th>Tashkilotchi</th><th>Sana</th><th>Ishtirok</th><th>Yig‘ilgan</th><th>Holat</th><th>Saytda</th><th>Banner</th><th></th></tr></thead>
                <tbody>
                  {list.map((t) => {
                    const ok = live(t)
                    const [label, cls] = TOURNAMENT_STATUS[t.st]
                    return (
                      <tr key={t.id}>
                        <td><div style={{ display: 'flex', flexDirection: 'column' }}><b>{t.name}</b><span className="mu" style={{ fontSize: 12 }}>{t.sport}</span></div></td>
                        <td>{t.org}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{t.date}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 80 }}>
                            <span style={{ fontSize: 13 }}>{t.c} / {t.m}</span>
                            <span style={{ height: 4, borderRadius: 2, background: '#E6ECE1', overflow: 'hidden' }}>
                              <span style={{ display: 'block', height: '100%', width: `${t.m ? Math.round((t.c / t.m) * 100) : 0}%`, background: '#5FA318' }} />
                            </span>
                          </div>
                        </td>
                        <td style={{ whiteSpace: 'nowrap' }}>{t.money}</td>
                        <td><Status cls={cls}>{label}</Status></td>
                        <td><Toggle on={Boolean(t.featured)} onClick={() => toggleFeat(t)} label="Saytda ko‘rsatish" disabled={!ok} /></td>
                        <td><Toggle on={t.banner} onClick={() => call(`/${t.id}/banner`, 'POST', { on: !t.banner })} label="Bannerda ko‘rsatish" disabled={!ok} /></td>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          {t.application
                            ? <Link className="btn sm" to={`/arizalar?key=${t.id}`}>Ochish</Link>
                            : <a className="btn sm" href={appLink(`/tournament/${t.id}`)} target="_blank" rel="noreferrer">Ochish</a>}{' '}
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
              {feat.map((t, i) => (
                <div key={t.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid #E1E7DC', borderRadius: 10 }}>
                  <b style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, width: 18 }}>{i + 1}</b>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{t.name}</span>
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
      )}

      {stopT && (
        <Modal label="To‘xtatish">
          <b style={{ fontSize: 18 }}>«{stopT.name}» turnirini to‘xtatish</b>
          <span style={{ fontSize: 14, lineHeight: 1.45 }}>Turnir saytdan va ilovadan olinadi. Ro‘yxatdan o‘tgan <b>{stopT.paid}</b> ishtirokchi va tashkilotchiga bot xabar yuboradi.</span>
          <label className="fl" htmlFor="sr">Sabab (hamma ko‘radi)<textarea id="sr" value={reason} onChange={(e) => setReason(e.target.value)} /></label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn" onClick={() => setModal('')}>Bekor</button>
            <button type="button" className="btn" disabled={!reason.trim()} onClick={doStop} style={{ background: '#8A2A2A', color: '#fff', borderColor: '#8A2A2A' }}>To‘xtatish va pulni qaytarish</button>
          </div>
        </Modal>
      )}
    </main>
  )
}
