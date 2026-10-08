import { NavLink, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, PlusCircle, User, LogIn, Info, LayoutDashboard, Package, FileText, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface NavItem {
  to: string
  icon: LucideIcon
  label: string
  end: boolean
  accent?: boolean
}

/* Кабинет партнёра. Чат — ссылкой в «Обзоре» и в боковом меню на компьютере */
const partnerNav: NavItem[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Обзор', end: true },
  { to: '/dashboard/orders', icon: Package, label: 'Заказы', end: false },
  { to: '/dashboard/orders/new', icon: PlusCircle, label: 'Заказ', end: false, accent: true },
  { to: '/dashboard/documents', icon: FileText, label: 'Документы', end: false },
  { to: '/dashboard/profile', icon: User, label: 'Профиль', end: false },
]

const adminNav: NavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Обзор', end: true },
  { to: '/admin/orders', icon: Package, label: 'Заказы', end: false },
  { to: '/admin/users', icon: Users, label: 'Партнёры', end: false },
  { to: '/admin/reports', icon: FileText, label: 'Отчёты', end: false },
]

const publicNav: NavItem[] = [
  { to: '/', icon: Home, label: 'Главная', end: true },
  { to: '/catalog', icon: ShoppingBag, label: 'Каталог', end: false },
  { to: '/login', icon: LogIn, label: 'Войти', end: false, accent: true },
  { to: '/about', icon: Info, label: 'О нас', end: false },
  { to: '/register', icon: User, label: 'Партнёрам', end: false },
]

export default function MobileBottomNav() {
  const { user } = useAuth()
  const { pathname } = useLocation()

  const nav = user?.role === 'ADMIN' ? adminNav : user ? partnerNav : publicNav

  return (
    <nav className="mobile-bottom-nav">
      {nav.map((item) => {
        const isActive = item.end
          ? pathname === item.to
          : pathname.startsWith(item.to) &&
            // «Заказы» не подсвечиваем на странице нового заказа — у него своя кнопка
            !(item.to === '/dashboard/orders' && pathname === '/dashboard/orders/new')

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={`mbn-item ${isActive ? 'mbn-active' : ''} ${item.accent ? 'mbn-accent' : ''}`}
          >
            {item.accent ? (
              <div className="mbn-accent-circle">
                <item.icon size={22} strokeWidth={2.5} />
              </div>
            ) : (
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            )}
            <span className="mbn-label">{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
