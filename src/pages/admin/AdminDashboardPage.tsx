import { Link } from 'react-router-dom'
import { Users, Package, Wallet, PackageOpen, PackageCheck, Award, LogOut, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ProductIcon from '../../components/app/ProductIcon'
import { mockOrders, mockUsers } from '../../data/mock'
import { formatPrice, formatReward, accruedReward, paidTotal, storageExpired } from '../../utils/calculate'
import { AT_POINT_FILTER_LABEL, isIssued, orderStatusLabel, orderStatusBar, orderStatusShort } from '../../utils/status'
import StatusMark from '../../components/app/StatusMark'
import { useDataRevision } from '../../utils/store'

export default function AdminDashboardPage() {
  useDataRevision()
  const { logout } = useAuth()
  const partners = mockUsers.filter((u) => u.role === 'CLIENT')
  const pendingPartners = partners.filter((u) => (u.partnerStatus ?? 'PENDING') === 'PENDING').length
  const orders = mockOrders

  const stats = [
    { label: 'Партнёров', value: partners.length.toString(), icon: Users },
    { label: 'Заказов', value: orders.length.toString(), icon: Package },
    { label: 'Оплачено покупателями', value: formatPrice(paidTotal(orders)), icon: Wallet },
    { label: AT_POINT_FILTER_LABEL, value: orders.filter((o) => o.status === 'AT_POINT').length.toString(), icon: PackageOpen },
    { label: 'Выдано', value: orders.filter(isIssued).length.toString(), icon: PackageCheck },
    { label: 'Начислено вознаграждения', value: formatReward(accruedReward(orders)), icon: Award },
  ]

  const work = [
    { label: 'Ждут оплаты', value: orders.filter((o) => o.status === 'CREATED' && o.paymentStatus !== 'PAID').length },
    { label: 'Выкупить у поставщика', value: orders.filter((o) => o.status === 'PAID').length },
    { label: 'Выкуплены, ждут отправки', value: orders.filter((o) => o.status === 'PURCHASED').length },
    { label: 'В пути', value: orders.filter((o) => o.status === 'IN_TRANSIT').length },
    { label: 'Срок хранения истёк', value: orders.filter((o) => o.status === 'AT_POINT' && storageExpired(o)).length },
  ]

  return (
    <div>
      {/* На телефоне шапки сайта нет: переход на сайт и выход — кнопками рядом с заголовком */}
      <div className="flex items-center gap-2 mb-4 lg:mb-6">
        <h1 className="app-name flex-1 min-w-0 text-[22px] lg:text-2xl font-bold text-text-primary leading-tight">Панель администратора</h1>
        <Link to="/" className="app-round lg:hidden" aria-label="Сайт">
          <Globe size={21} />
        </Link>
        <button type="button" onClick={logout} className="app-round lg:hidden !text-red-600" aria-label="Выйти">
          <LogOut size={21} />
        </button>
      </div>

      {pendingPartners > 0 && (
        <Link
          to="/admin/users"
          className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 no-underline hover:bg-amber-100 transition-colors"
        >
          <span className="text-sm font-semibold">Анкет на проверке: {pendingPartners}</span>
          <span className="text-sm">Открыть &rarr;</span>
        </Link>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-4 min-w-0" style={{ containerType: 'inline-size' }}>
            <div className="flex items-center gap-2 text-text-muted">
              <s.icon size={16} className="shrink-0" />
              <p className="text-xs">{s.label}</p>
            </div>
            {/* Сумма с «₽» не переносится: размер цифр зависит от ширины плитки, миллионы тоже помещаются */}
            <p
              className="font-display text-base sm:text-xl font-bold text-text-primary mt-1 whitespace-nowrap"
              style={{ fontSize: 'clamp(0.75rem, 12.5cqi, 1.25rem)' }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[13px] lg:text-xs leading-snug text-text-muted mb-8">
        Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.
      </p>

      <h2 className="font-bold text-lg text-text-primary mb-4">В работе у ТехЭйджент</h2>
      <div className="card divide-y divide-border mb-8">
        {work.map((w) => (
          <div key={w.label} className="flex items-center justify-between gap-4 px-4 lg:px-5 min-h-[48px] py-2 text-[15px] lg:text-sm">
            <span className="text-text-secondary">{w.label}</span>
            <span className="font-bold text-text-primary">{w.value}</span>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-lg text-text-primary mb-4">Последние заказы</h2>
      {/* На телефоне — лентой, на компьютере — таблицей */}
      <div className="app-list lg:hidden">
        {orders.length === 0 && <p className="p-8 text-center text-text-muted">Заказов пока нет</p>}
        {[...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10).map((order) => {
          const partner = mockUsers.find((u) => u.id === order.userId)
          return (
            <div key={order.id} className="app-row">
              <span className="app-row-tile text-text-secondary"><ProductIcon productId={order.productId} size={22} /></span>
              <span className="app-row-mid">
                <span className="app-row-title">{order.productName}</span>
                <span className="app-row-sub">{order.orderNumber} · {partner?.companyName || '—'}</span>
              </span>
              <span className="app-row-right">
                <span className="app-row-sum">{formatPrice(order.price)}</span>
                <span className="app-row-status"><StatusMark size="sm" color={orderStatusBar(order)}>{orderStatusShort(order)}</StatusMark></span>
              </span>
            </div>
          )
        })}
      </div>
      <div className="card overflow-hidden hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-light">
                <th className="text-left px-4 py-3 font-medium text-text-muted">Номер</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Товар</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Партнёр</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Цена</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">Заказов пока нет</td>
                </tr>
              )}
              {/* Последние — по дате оформления, новые сверху */}
              {[...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10).map((order) => {
                const partner = mockUsers.find((u) => u.id === order.userId)
                return (
                  <tr key={order.id} className="hover:bg-bg-light transition-colors">
                    <td className="px-4 py-3 font-medium text-text-primary">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-text-secondary">{order.productName}</td>
                    <td className="px-4 py-3 text-text-secondary">{partner?.companyName || '—'}</td>
                    <td className="px-4 py-3 font-medium text-text-primary whitespace-nowrap">{formatPrice(order.price)}</td>
                    <td className="px-4 py-3">
                      <StatusMark size="sm" color={orderStatusBar(order)}>{orderStatusLabel(order)}</StatusMark>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
