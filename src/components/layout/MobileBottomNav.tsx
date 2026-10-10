import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { House, ShoppingBag, User, Package, FileText, Users, MessageCircle, LayoutDashboard, ShoppingCart, CircleUserRound } from 'lucide-react'
import { useAccount } from '../../utils/account'
import { useCart, cartCount } from '../../utils/cart'
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

/* Посетитель сайта. «О платформе» и заявка партнёра — в меню-бургере и на экране «Вход» */
const publicNav: NavItem[] = [
  { to: '/', icon: House, label: 'Главная', end: true },
  { to: '/catalog', icon: ShoppingBag, label: 'Каталог', end: false },
  { to: '/cart', icon: ShoppingCart, label: 'Корзина', end: false },
  { to: '/login', icon: CircleUserRound, label: 'Войти', end: false },
]

/* Покупатель, вошедший в свой кабинет */
const buyerNav: NavItem[] = [
  { to: '/catalog', icon: ShoppingBag, label: 'Каталог', end: false },
  { to: '/cart', icon: ShoppingCart, label: 'Корзина', end: false },
  { to: '/account', icon: Package, label: 'Заказы', end: true },
  { to: '/account/profile', icon: CircleUserRound, label: 'Профиль', end: false },
]

const staffNav: NavItem[] = [
  { to: '/', icon: House, label: 'Главная', end: true },
  { to: '/catalog', icon: ShoppingBag, label: 'Каталог', end: false },
  { to: '/staff', icon: Package, label: 'Заказы', end: false },
]

/** Экраны с главной кнопкой внизу: меню прячется, как на экранах операций в банковском приложении */
const NO_TABBAR = /^\/dashboard\/orders\/(new|[^/]+)\/?$/

export default function MobileBottomNav() {
  const { user } = useAuth()
  const account = useAccount()
  const count = cartCount(useCart())
  const { pathname } = useLocation()

  const nav = user?.role === 'ADMIN' ? adminNav : user ? partnerNav
    : account.role === 'buyer' ? buyerNav : account.role === 'staff' ? staffNav : publicNav
  // Страница оплаты — для покупателя: только заказ и кнопка оплаты, без меню сайта
  // Корзина и оформление — своя кнопка внизу экрана, меню мешало бы ей
  const hidden = (Boolean(user) && NO_TABBAR.test(pathname)) || pathname.startsWith('/pay/') || /^\/(cart|checkout)\/?$/.test(pathname) || /^\/account\/orders\//.test(pathname)

  useEffect(() => {
    document.documentElement.classList.toggle('no-tabbar', hidden)
  }, [hidden])

  if (hidden) return null

  return (
    <nav className="mobile-bottom-nav" aria-label="Разделы">
      {nav.map((item) => {
        // «Заказы» горят и на экране заказа; главная — только сама
        const isActive = item.end ? pathname === item.to || (item.to === '/account' && pathname.startsWith('/account/orders')) : pathname.startsWith(item.to)
        return (
          <NavLink key={item.to} to={item.to} end={item.end} className={`mbn-item ${isActive ? 'mbn-active' : ''}`}>
            <span className="mbn-pill">
              <item.icon size={26} strokeWidth={isActive ? 2.2 : 1.8} />
            </span>
            {item.to === '/cart' && count > 0 && <span className="mbn-badge">{count > 9 ? '9+' : count}</span>}
            <span className="mbn-label">{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
