import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Icon } from '../../lib/techagent'

const navItems = [
  { to: '/dashboard', glyph: 'grid', label: 'Обзор', end: true },
  { to: '/dashboard/orders', glyph: 'box', label: 'Заказы', end: false },
  { to: '/dashboard/orders/new', glyph: 'plus', label: 'Новый заказ', end: false },
  { to: '/dashboard/chat', glyph: 'chat', label: 'Чат', end: false },
  { to: '/dashboard/documents', glyph: 'doc', label: 'Документы', end: false },
  { to: '/dashboard/profile', glyph: 'user', label: 'Профиль', end: false },
]

export default function DashboardLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: '#8891A5' }}>Загрузка…</div>
  }
  if (!user || user.role !== 'CLIENT') {
    return <Navigate to="/login" replace />
  }

  return (
    <section>
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(20px,3vw,34px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }} className="ta-dash-cols">
          <nav className="ta-sidebar">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="ta-sidebar-link"
                style={({ isActive }) => ({
                  background: isActive ? '#0B1020' : '#fff',
                  color: isActive ? '#fff' : '#3A4256',
                  border: `1px solid ${isActive ? '#0B1020' : '#E7E9F2'}`,
                })}
              >
                <Icon name={item.glyph} size={17} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <main style={{ flex: 1, minWidth: 0 }}>
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  )
}
