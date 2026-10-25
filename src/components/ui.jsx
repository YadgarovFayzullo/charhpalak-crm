// Small building blocks repeated across the admin screens.

export function PageTop({ sub, title, children }) {
  return (
    <div className="top">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span className="mu" style={{ fontSize: 13 }}>{sub}</span>
        <h1 className="d" style={{ fontSize: 34 }}>{title}</h1>
      </div>
      {children}
    </div>
  )
}

export function Search({ placeholder, value, onChange, style }) {
  return (
    <label className="srch" style={style}>
      <input aria-label="Qidirish" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

/** Underlined tabs: items = [[id, label, count?]] */
export function Tabs({ items, value, onChange, label, wrap = false }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #DDE4D8', flexWrap: wrap ? 'wrap' : undefined }} role="tablist" aria-label={label}>
      {items.map(([id, text, n]) => (
        <button key={id} type="button" className={value === id ? 'tab on' : 'tab'} role="tab" aria-selected={value === id} onClick={() => onChange(id)}>
          {text}{n !== undefined && <> <span className="st s-gray" style={{ padding: '1px 8px' }}>{n}</span></>}
        </button>
      ))}
    </div>
  )
}

/** Pill filters: items = [[id, label]] */
export function Chips({ items, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {items.map(([id, text]) => (
        <button key={id} type="button" className={value === id ? 'fc on' : 'fc'} onClick={() => onChange(id)}>{text}</button>
      ))}
    </div>
  )
}

export function Toggle({ on, onClick, label, disabled }) {
  return (
    <button
      type="button"
      className={on ? 'tg on' : 'tg'}
      onClick={disabled ? undefined : onClick}
      aria-label={label}
      aria-pressed={on}
      style={disabled ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
    />
  )
}

export function Check({ on, onClick, children, warn, style, label }) {
  return (
    <button type="button" className={`ck${on ? ' on' : ''}${warn ? ' warn' : ''}`} onClick={onClick} aria-pressed={on} aria-label={label} style={style}>
      <i>{on ? '✓' : ''}</i>{children}
    </button>
  )
}

export function Status({ cls, children }) {
  return <span className={`st ${cls}`}>{children}</span>
}

export function KV({ items, cols = '150px', style }) {
  return (
    <div className="kv" style={{ gridTemplateColumns: `${cols} minmax(0, 1fr)`, ...style }}>
      {items.map(([k, v]) => [<span key={`k${k}`}>{k}</span>, <b key={`v${k}`} style={{ fontWeight: 600 }}>{v}</b>])}
    </div>
  )
}

export function Modal({ label, children }) {
  return (
    <div className="ov">
      <div className="modal" role="dialog" aria-label={label}>{children}</div>
    </div>
  )
}

export function Toast({ children, onClose, icon = '✓' }) {
  return (
    <div className="toast" role="status" style={icon === '!' ? { position: 'static' } : undefined}>
      <span style={{ color: icon === '!' ? '#FFB86B' : '#C8F25A' }}>{icon}</span>{children}
      <button type="button" className="btn sm" onClick={onClose} style={{ background: 'transparent', color: '#EEF3EA', borderColor: '#2C4C39' }}>Yopish</button>
    </div>
  )
}

export function Loading() {
  return <div className="box" style={{ alignItems: 'center', color: '#5A6B5E' }}>Yuklanmoqda…</div>
}

export function LoadError({ error, onRetry }) {
  return (
    <div className="box" style={{ alignItems: 'center', color: '#8A2A2A' }}>
      {error?.message || 'Xatolik'}
      {onRetry && <button type="button" className="btn sm" onClick={onRetry}>Qayta urinish</button>}
    </div>
  )
}

export function Avatar({ i, bg, size = 32, fontSize, style }) {
  return <span className="av" style={{ background: bg, width: size, height: size, fontSize, ...style }}>{i}</span>
}
