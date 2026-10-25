import { useEffect, useRef, useState } from 'react'
import { api, setToken } from '../api.js'
import { useSession } from '../session.jsx'

// Sign in through the KiGo bot: open the link, press «Kirish» in Telegram, come back.
export default function Login() {
  const { refresh } = useSession()
  const [login, setLogin] = useState(null) // { token, link }
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const poll = useRef()

  const start = async () => {
    setError('')
    setStatus('')
    try {
      const l = await api('/api/admin/login', { method: 'POST' })
      setLogin(l)
      window.open(l.link, '_blank', 'noopener')
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    if (!login) return
    poll.current = setInterval(async () => {
      const r = await api(`/api/admin/login/${login.token}`).catch(() => null)
      if (!r || r.status === 'pending') return
      clearInterval(poll.current)
      if (r.status === 'ok') {
        setToken(login.token)
        refresh()
      } else {
        setStatus(r.status)
        setLogin(null)
      }
    }, 2000)
    return () => clearInterval(poll.current)
  }, [login, refresh])

  return (
    <div className="shell" style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="box" style={{ width: 'min(420px, 100%)', gap: 18, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: '#C8F25A', color: '#0F1F14', display: 'grid', placeItems: 'center', fontWeight: 800 }}>Ki</span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}><b style={{ fontSize: 18 }}>KiGo Admin</b><span className="mu" style={{ fontSize: 12 }}>admin.kigo.uz</span></span>
        </div>
        <h1 className="d" style={{ fontSize: 28 }}>Kirish</h1>
        <span className="mu" style={{ fontSize: 14, lineHeight: 1.45 }}>
          Admin panelga Telegram orqali kirasiz. Bot ochiladi, u yerda «✅ Kirish» ni bosing va shu sahifaga qayting.
        </span>
        {!login ? (
          <button type="button" className="btn pri" style={{ minHeight: 46 }} onClick={start}>✈ Telegram orqali kirish</button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 14px', borderRadius: 12, background: '#FFF1CC', color: '#7A5200', fontSize: 14 }}>
              <b>Telegram’da tasdiqlashni kutyapmiz…</b>
            </div>
            <a className="btn" href={login.link} target="_blank" rel="noreferrer">Botni qayta ochish</a>
            <button type="button" className="btn" onClick={() => setLogin(null)}>Bekor qilish</button>
          </div>
        )}
        {status === 'denied' && <span className="st s-no" style={{ alignSelf: 'flex-start' }}>Kirish rad etildi yoki siz jamoada emassiz</span>}
        {status === 'expired' && <span className="st s-info" style={{ alignSelf: 'flex-start' }}>Havola eskirdi, qayta urinib ko‘ring</span>}
        {error && <span className="st s-no" style={{ alignSelf: 'flex-start' }}>{error}</span>}
        <span className="mu" style={{ fontSize: 12 }}>Faqat KiGo jamoasi a’zolari kira oladi. Bosh admin sizni «Sozlamalar va rollar»dan qo‘shadi.</span>
      </div>
    </div>
  )
}
