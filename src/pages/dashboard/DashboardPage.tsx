import { Link } from 'react-router-dom'
import { Package, Wallet, PackageOpen, PackageCheck, Award, PlusCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDate, formatReward, accruedReward, paidTotal } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/status'

export default function DashboardPage() {
  const { user } = useAuth()
  const orders = mockOrders.filter((o) => o.userId === user?.id)
  const canOrder = user?.partnerStatus === 'VERIFIED'

  const stats = [
    { label: 'Заказов', value: orders.length.toString(), icon: Package },
    { label: 'Оплачено покупателями', value: formatPrice(paidTotal(orders)), icon: Wallet },
    { label: 'Ждут выдачи', value: orders.filter((o) => o.status === 'AT_POINT').length.toString(), icon: PackageOpen },
    { label: 'Выдано', value: orders.filter((o) => o.status === 'ISSUED').length.toString(), icon: PackageCheck },
    { label: 'Ваше вознаграждение', value: formatReward(accruedReward(orders)), icon: Award },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">{user?.companyName || 'Кабинет Партнёра'}</h1>
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
        Вознаграждение считается по выданным заказам с загруженным актом приёма-передачи.
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
                </div>
                <p className="font-bold text-sm text-text-primary shrink-0 ml-4">{formatPrice(order.price)}</p>
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
