import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { LayoutDashboard, Package, PlusCircle, User, FileText, MessageCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Обзор', end: true },
  { to: '/dashboard/orders', icon: Package, label: 'Заказы', end: false },
  { to: '/dashboard/orders/new', icon: PlusCircle, label: 'Новый заказ', end: false },
  { to: '/dashboard/chat', icon: MessageCircle, label: 'Чат', end: false },
  { to: '/dashboard/profile', icon: User, label: 'Профиль', end: false },
  { to: '/dashboard/documents', icon: FileText, label: 'Документы', end: false },
]

export default function DashboardLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-text-muted">Загрузка...</div>
      </div>
    )
  }

  if (!user || user.role !== 'CLIENT') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar — hidden on mobile (bottom nav replaces it) */}
          <aside className="hidden lg:block lg:w-56 shrink-0">
            <nav className="card-glass p-2 flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide">
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

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
