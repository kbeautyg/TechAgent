import { NavLink, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, PlusCircle, MessageCircle, User, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const authNav = [
  { to: '/', icon: Home, label: 'Главная', end: true },
  { to: '/catalog', icon: ShoppingBag, label: 'Каталог', end: false },
  { to: '/dashboard/orders/new', icon: PlusCircle, label: 'Заказ', end: false, accent: true },
  { to: '/dashboard/chat', icon: MessageCircle, label: 'Чат', end: false },
  { to: '/dashboard/profile', icon: User, label: 'Профиль', end: false },
]

const publicNav = [
  { to: '/', icon: Home, label: 'Главная', end: true },
  { to: '/catalog', icon: ShoppingBag, label: 'Каталог', end: false },
  { to: '/login', icon: LogIn, label: 'Войти', end: false, accent: true },
  { to: '/about', icon: MessageCircle, label: 'О нас', end: false },
  { to: '/register', icon: User, label: 'Старт', end: false },
]

export default function MobileBottomNav() {
  const { user } = useAuth()
  const location = useLocation()

  // Hide on admin pages
  if (location.pathname.startsWith('/admin')) return null

  const nav = user ? authNav : publicNav

  return (
    <nav className="mobile-bottom-nav">
      {nav.map((item) => {
        const isActive = item.end
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to) && item.to !== '/'

        return (
          <NavLink
            key={item.to}
            to={item.to}
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
