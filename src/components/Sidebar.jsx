import { NavLink } from 'react-router-dom'
import { NAV } from '../data/constants.js'
import { useSession } from '../session.jsx'

export default function Sidebar() {
  const { me, logout } = useSession()
  const badge = (key) => (key && me.badges[key] ? me.badges[key] : null)

  return (
    <nav className="side" aria-label="Admin menyu">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 18px' }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: '#C8F25A', color: '#0F1F14', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14 }}>Ki</span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <b style={{ fontSize: 16 }}>KiGo Admin</b>
          <span style={{ fontSize: 11, color: '#A9BBAE' }}>admin.kigo.uz</span>
        </span>
      </div>
      {NAV.map((n) => (
        <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'nv on' : 'nv')}>
          <span className="ic">{n.ic}</span>
          <span style={{ flex: 1 }}>{n.label}</span>
          {badge(n.badge) && <span className="bd">{badge(n.badge)}</span>}
        </NavLink>
      ))}
      <div style={{ marginTop: 'auto', padding: '14px 8px 0', borderTop: '1px solid #1F3A2A', display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: me.color, color: '#9A3A12', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>{me.initials}</span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, fontSize: 13, flex: 1 }}>
          <b>{me.name}</b>
          <span style={{ color: '#A9BBAE', fontSize: 11 }}>{me.roleName}</span>
        </span>
        <button type="button" onClick={logout} aria-label="Chiqish" title="Chiqish" style={{ background: 'none', border: 0, color: '#A9BBAE', cursor: 'pointer', fontSize: 16, minWidth: 32, minHeight: 32 }}>⎋</button>
      </div>
    </nav>
  )
}
