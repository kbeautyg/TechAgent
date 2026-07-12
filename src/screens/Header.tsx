import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from '../lib/techagent'

const navLinks = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Как это работает', to: '/how-it-works' },
  { label: 'О платформе', to: '/about' },
]

const navBtn: React.CSSProperties = { background: 'none', border: 'none', padding: '9px 13px', borderRadius: 9, fontWeight: 500, fontSize: 14.5, color: '#3A4256' }

export default function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isBackoffice = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')

  const doLogout = () => { logout(); navigate('/') }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(245,246,251,.86)', backdropFilter: 'saturate(180%) blur(14px)', WebkitBackdropFilter: 'saturate(180%) blur(14px)', borderBottom: '1px solid #E7E9F2' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg,#FB2C36 0%,#FB2C36 28%,#1B44F5 62%,#1B44F5 100%)' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: '13px clamp(16px,4vw,40px)', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-.03em' }}><span style={{ color: '#FB2C36' }}>Tech</span><span style={{ color: '#1B44F5' }}>Agent</span></span>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8, flexWrap: 'wrap' }} className="ta-desktop-nav">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className="ta-nav" style={({ isActive }) => ({ ...navBtn, color: isActive ? '#1B44F5' : '#3A4256', textDecoration: 'none' })}>{l.label}</NavLink>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }} className="ta-desktop-nav">
          {user ? (
            <>
              {user.role === 'ADMIN' && !isBackoffice && (
                <Link to="/admin" className="ta-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '10px 15px', fontWeight: 600, fontSize: 14, color: '#0B1020', textDecoration: 'none' }}><Icon name="shield" size={16} />Админка</Link>
              )}
              {user.role === 'CLIENT' && !isBackoffice && (
                <Link to="/dashboard" className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 16px rgba(27,68,245,.28)', textDecoration: 'none' }}>Кабинет партнёра</Link>
              )}
              <button onClick={doLogout} className="ta-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '10px 15px', fontWeight: 600, fontSize: 14, color: '#3A4256' }}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="ta-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '10px 15px', fontWeight: 600, fontSize: 14, color: '#0B1020', textDecoration: 'none' }}>
                <Icon name="user" size={16} />Войти
              </Link>
              <Link to="/register" className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 16px rgba(27,68,245,.28)', textDecoration: 'none' }}>
                Стать партнёром
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className="ta-mobile-toggle" aria-label="Меню" style={{ marginLeft: 'auto', display: 'none', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0B1020" strokeWidth="2" strokeLinecap="round"><path d={mobileOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="ta-mobile-panel" style={{ borderTop: '1px solid #E7E9F2', background: '#fff', padding: '10px clamp(16px,4vw,40px) 18px', display: 'none', flexDirection: 'column', gap: 4 }}>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} style={{ padding: '11px 6px', fontWeight: 500, fontSize: 15, color: '#0B1020', textDecoration: 'none', borderBottom: '1px solid #F0F1F6' }}>{l.label}</Link>
          ))}
          {user ? (
            <>
              {user.role === 'ADMIN' && <Link to="/admin" style={{ padding: '11px 6px', fontWeight: 600, fontSize: 15, color: '#1B44F5', textDecoration: 'none' }}>Админка</Link>}
              {user.role === 'CLIENT' && <Link to="/dashboard" style={{ padding: '11px 6px', fontWeight: 600, fontSize: 15, color: '#1B44F5', textDecoration: 'none' }}>Кабинет партнёра</Link>}
              <button onClick={doLogout} style={{ textAlign: 'left', padding: '11px 6px', fontWeight: 600, fontSize: 15, color: '#C81E2C', background: 'none', border: 'none' }}>Выйти</button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <Link to="/login" style={{ flex: 1, textAlign: 'center', padding: '13px', borderRadius: 11, border: '1px solid #E7E9F2', fontWeight: 600, fontSize: 14.5, color: '#0B1020', textDecoration: 'none' }}>Войти</Link>
              <Link to="/register" style={{ flex: 1, textAlign: 'center', padding: '13px', borderRadius: 11, background: '#1B44F5', color: '#fff', fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}>Регистрация</Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
