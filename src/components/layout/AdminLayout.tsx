import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { LayoutDashboard, Users, Package } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Обзор', end: true },
  { to: '/admin/users', icon: Users, label: 'Партнёры', end: false },
  { to: '/admin/orders', icon: Package, label: 'Заказы', end: false },
]

export default function AdminLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-text-muted">Загрузка...</div>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-56 shrink-0">
            <div className="bg-primary/10 border border-primary/20 text-primary rounded-xl p-3 mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide">Панель администратора</p>
            </div>
            <nav className="card-glass p-2 flex lg:flex-col gap-1 overflow-x-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium no-underline whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:bg-bg-light hover:text-text-primary'
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
