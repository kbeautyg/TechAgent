import { NavLink, Outlet, Navigate, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, PlusCircle, User, FileText, MessageCircle, Clock, XCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import FirstLogin from '../../pages/dashboard/FirstLogin'
import { DEMO_MODE } from '../../data/mock'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Обзор', end: true },
  { to: '/dashboard/orders', icon: Package, label: 'Заказы', end: false },
  { to: '/dashboard/orders/new', icon: PlusCircle, label: 'Новый заказ', end: false },
  // В боевой сборке чата нет — там контакты менеджера
  { to: '/dashboard/chat', icon: MessageCircle, label: DEMO_MODE ? 'Чат' : 'Связь с менеджером', end: false },
  { to: '/dashboard/profile', icon: User, label: 'Профиль', end: false },
  { to: '/dashboard/documents', icon: FileText, label: 'Документы', end: false },
]

/** Боевая сборка без бэкенда: кабинет честно предупреждает, что данные никуда не уходят. В демо-режиме не показывается */
export function PreviewNotice({ className = '' }: { className?: string }) {
  if (DEMO_MODE) return null
  return (
    <p className={`rounded-lg border border-border bg-white px-3 py-2 text-xs leading-relaxed text-text-secondary ${className}`}>
      Кабинет работает в режиме предпросмотра: данные остаются в этом браузере и в ТехЭйджент пока не передаются.
      Чтобы стать партнёром,{' '}
      <Link to="/register" className="text-primary no-underline hover:underline">оставьте заявку</Link>
    </p>
  )
}

export default function DashboardLayout() {
  const { user } = useAuth()
  const { pathname, search } = useLocation()

  if (!user || user.role !== 'CLIENT') {
    // После входа вернём туда, куда человек шёл
    return <Navigate to="/login" replace state={{ from: pathname + search }} />
  }

  const status = user.partnerStatus ?? 'PENDING'

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-6">
        <PreviewNotice className="mb-4 lg:mb-6" />
        {status === 'PENDING' && (
          <div className="mb-4 lg:mb-6 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
            <Clock size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold">Анкета на проверке у ТехЭйджент.</span> Оформлять заказы можно после подтверждения.
            </p>
          </div>
        )}
        {status === 'REJECTED' && (
          <div className="mb-4 lg:mb-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-900">
            <XCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold">ТехЭйджент отклонил анкету.</span> Оформлять заказы нельзя. Проверьте данные в{' '}
              <Link to="/dashboard/profile" className="text-red-900 underline">профиле</Link> или напишите на{' '}
              <a href="mailto:partners@techagent.pro" className="text-red-900 underline">partners@techagent.pro</a>.
            </p>
          </div>
        )}

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
                      // «Заказы» не подсвечиваем на странице нового заказа
                      isActive && !(item.to === '/dashboard/orders' && pathname === '/dashboard/orders/new')
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
            {/* Учётку завёл ТехЭйджент по заявке: сначала свой пароль и акцепт оферты (п. 2.1) */}
            {user.mustChangePassword || !user.offerAcceptedAt ? <FirstLogin /> : <Outlet />}
          </main>
        </div>
      </div>
    </div>
  )
}
