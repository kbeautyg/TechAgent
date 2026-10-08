import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Package, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Обзор', end: true },
  { to: '/admin/users', icon: Users, label: 'Партнёры', end: false },
  { to: '/admin/orders', icon: Package, label: 'Заказы', end: false },
  { to: '/admin/reports', icon: FileText, label: 'Отчёты', end: false },
]

export default function AdminLayout() {
  const { user } = useAuth()
  const { pathname, search } = useLocation()

  if (!user || user.role !== 'ADMIN') {
    // После входа вернём туда, куда человек шёл
    return <Navigate to="/login" replace state={{ from: pathname + search }} />
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[max(12px,env(safe-area-inset-top))] pb-6 lg:py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* На мобильных вместо бокового меню — нижняя навигация */}
          <aside className="hidden lg:block lg:w-56 shrink-0">
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
