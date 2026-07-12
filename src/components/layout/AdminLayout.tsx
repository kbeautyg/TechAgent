import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Icon } from '../../lib/techagent'

const navItems = [
  { to: '/admin', glyph: 'grid', label: 'Обзор', end: true },
  { to: '/admin/users', glyph: 'user', label: 'Партнёры', end: false },
  { to: '/admin/orders', glyph: 'box', label: 'Заказы', end: false },
]

export default function AdminLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: '#8891A5' }}>Загрузка…</div>
  }
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />
  }

  return (
    <section>
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(20px,3vw,34px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }} className="ta-dash-cols">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0B1020', color: '#8FA9FF', borderRadius: 12, padding: '11px 14px', font: "600 11px/1 'JetBrains Mono',monospace", letterSpacing: '.06em' }}>
              <Icon name="shield" size={15} color="#8FA9FF" />ПАНЕЛЬ АДМИНИСТРАТОРА
            </div>
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
          </div>
          <main style={{ flex: 1, minWidth: 0 }}>
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  )
}
