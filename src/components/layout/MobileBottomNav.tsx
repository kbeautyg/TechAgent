import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { House, ShoppingBag, User, LogIn, Info, Package, FileText, Users, MessageCircle, Handshake, LayoutDashboard } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface NavItem {
  to: string
  icon: LucideIcon
  label: string
  end: boolean
}

/* Кабинет партнёра. Новый заказ — большая кнопка на главном экране и в «Заказах» */
const partnerNav: NavItem[] = [
  { to: '/dashboard', icon: House, label: 'Главная', end: true },
  { to: '/dashboard/orders', icon: Package, label: 'Заказы', end: false },
  { to: '/dashboard/chat', icon: MessageCircle, label: 'Связь', end: false },
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
  { to: '/', icon: House, label: 'Главная', end: true },
  { to: '/catalog', icon: ShoppingBag, label: 'Каталог', end: false },
  { to: '/about', icon: Info, label: 'О нас', end: false },
  { to: '/register', icon: Handshake, label: 'Партнёрам', end: false },
  { to: '/login', icon: LogIn, label: 'Войти', end: false },
]

/** Экраны с главной кнопкой внизу: меню прячется, как на экранах операций в банковском приложении */
const NO_TABBAR = /^\/dashboard\/orders\/(new|[^/]+)\/?$/

export default function MobileBottomNav() {
  const { user } = useAuth()
  const { pathname } = useLocation()

  const nav = user?.role === 'ADMIN' ? adminNav : user ? partnerNav : publicNav
  // Страница оплаты — для покупателя: только заказ и кнопка оплаты, без меню сайта
  // Корзина и оформление — своя кнопка внизу экрана, меню мешало бы ей
  const hidden = (Boolean(user) && NO_TABBAR.test(pathname)) || pathname.startsWith('/pay/') || /^\/(cart|checkout)\/?$/.test(pathname)

  useEffect(() => {
    document.documentElement.classList.toggle('no-tabbar', hidden)
  }, [hidden])

  if (hidden) return null

  return (
    <nav className="mobile-bottom-nav" aria-label="Разделы">
      {nav.map((item) => {
        // «Заказы» горят и на экране заказа; главная — только сама
        const isActive = item.end ? pathname === item.to : pathname.startsWith(item.to)
        return (
          <NavLink key={item.to} to={item.to} end={item.end} className={`mbn-item ${isActive ? 'mbn-active' : ''}`}>
            <span className="mbn-pill">
              <item.icon size={26} strokeWidth={isActive ? 2.2 : 1.8} />
            </span>
            <span className="mbn-label">{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
