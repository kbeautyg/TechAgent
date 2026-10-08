import { Link } from 'react-router-dom'
import { Package, Wallet, PackageOpen, PackageCheck, Award, PlusCircle, MessageCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDate, storageNote, accruedReward, paidTotal, rewardPercentAt, pendingRewardChange } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, AT_POINT_FILTER_LABEL } from '../../utils/status'

export default function DashboardPage() {
  const { user } = useAuth()
  const orders = mockOrders.filter((o) => o.userId === user?.id)
  const canOrder = user?.partnerStatus === 'VERIFIED'
  const hasPercent = user ? Boolean(rewardPercentAt(user)) : false
  const accrued = accruedReward(orders)
  const pending = user ? pendingRewardChange(user) : null

  const stats = [
    { label: 'Заказов', value: orders.length.toString(), icon: Package },
    { label: 'Оплачено покупателями', value: formatPrice(paidTotal(orders)), icon: Wallet },
    { label: AT_POINT_FILTER_LABEL, value: orders.filter((o) => o.status === 'AT_POINT').length.toString(), icon: PackageOpen },
    { label: 'Выдано', value: orders.filter((o) => o.status === 'ISSUED').length.toString(), icon: PackageCheck },
    { label: 'Начислено вознаграждения', value: hasPercent && accrued !== null ? formatPrice(accrued) : '—', icon: Award },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <h1 className="text-2xl font-bold text-text-primary min-w-0 break-words">{user?.companyName || 'Кабинет партнёра'}</h1>
        <div className="flex items-center gap-4">
          {/* На компьютере чат — в боковом меню, на телефоне — здесь */}
          <Link
            to="/dashboard/chat"
            className="lg:hidden inline-flex items-center gap-1.5 text-primary text-sm font-medium no-underline"
          >
            <MessageCircle size={18} />
            Связь с менеджером
          </Link>
          {canOrder && (
            <Link
              to="/dashboard/orders/new"
              className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 no-underline"
            >
              <PlusCircle size={18} />
              Новый заказ
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="flex items-center gap-2 text-text-muted">
              <s.icon size={16} />
              <p className="text-xs">{s.label}</p>
            </div>
            <p className="font-display text-lg font-bold mt-1 text-text-primary break-words">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted mb-8">
        Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.
        {pending && (
          <span className="block mt-1 text-amber-700">
            С {formatDate(pending.from)} вознаграждение — {pending.percent}% от цены товара для заказов, оформленных с этой даты.
          </span>
        )}
      </p>

      <div className="card">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-bold text-text-primary">Последние заказы</h2>
          <Link to="/dashboard/orders" className="text-primary text-sm font-medium no-underline hover:underline">
            Все заказы
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            <p>Заказов пока нет</p>
            {canOrder && (
              <Link
                to="/dashboard/orders/new"
                className="inline-flex items-center gap-1 text-primary font-medium mt-2 no-underline"
              >
                <PlusCircle size={16} />
                Оформить заказ
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-bg-light transition-colors no-underline"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-text-primary">{order.orderNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mt-0.5 truncate">{order.productName}</p>
                  <p className="text-text-muted text-xs mt-0.5">Покупатель: {order.buyerName} &middot; {formatDate(order.createdAt)}</p>
                  {storageNote(order) && (
                    <p className={`text-xs mt-0.5 ${storageNote(order)?.expired ? 'text-red-600 font-medium' : 'text-text-secondary'}`}>
                      {storageNote(order)?.text}
                    </p>
                  )}
                </div>
                <p className="font-bold text-sm text-text-primary shrink-0 ml-4 whitespace-nowrap">{formatPrice(order.price)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {canOrder && (
        <div className="sm:hidden mt-6">
          <Link
            to="/dashboard/orders/new"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 no-underline w-full"
          >
            <PlusCircle size={18} />
            Новый заказ
          </Link>
        </div>
      )}
    </div>
  )
}
