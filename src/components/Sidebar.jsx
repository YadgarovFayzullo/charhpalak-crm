import { NavLink } from 'react-router-dom'
import { ME, NAV } from '../data/mock.js'

export default function Sidebar() {
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
          {n.badge && <span className="bd">{n.badge}</span>}
        </NavLink>
      ))}
      <div style={{ marginTop: 'auto', padding: '14px 8px 0', borderTop: '1px solid #1F3A2A', display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: ME.bg, color: ME.fg, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>{ME.i}</span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, fontSize: 13 }}>
          <b>{ME.name}</b>
          <span style={{ color: '#A9BBAE', fontSize: 11 }}>{ME.role}</span>
        </span>
      </div>
    </nav>
  )
}
