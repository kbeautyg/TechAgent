import { Link } from 'react-router-dom'
import { Package, TrendingUp, Clock, PlusCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDate } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/status'

export default function DashboardPage() {
  const { user } = useAuth()
  const orders = mockOrders.filter((o) => o.userId === user?.id)

  const thisMonth = orders.filter((o) => {
    const d = new Date(o.createdAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const totalRevenue = thisMonth.reduce((s, o) => s + o.totalCost, 0)
  const totalCommission = thisMonth.reduce((s, o) => s + o.commission, 0)

  const stats = [
    { label: 'Заказов за месяц', value: thisMonth.length.toString(), icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Сумма заказов', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Комиссия', value: formatPrice(totalCommission), icon: Clock, color: 'text-accent', bg: 'bg-accent/10' },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Добро пожаловать{user?.companyName ? `, ${user.companyName}` : ''}!</h1>
          <p className="text-text-secondary text-sm mt-1">Обзор вашей активности</p>
        </div>
        <Link
          to="/dashboard/orders/new"
          className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 no-underline"
        >
          <PlusCircle size={18} />
          Новый заказ
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-text-muted text-xs">{s.label}</p>
                <p className="text-xl font-bold mt-0.5 text-text-primary">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="card">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-bold text-text-primary">Последние заказы</h2>
          <Link to="/dashboard/orders" className="text-primary text-sm font-medium no-underline hover:underline">
            Все заказы
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            <p>У вас пока нет заказов</p>
            <Link
              to="/dashboard/orders/new"
              className="inline-flex items-center gap-1 text-primary font-medium mt-2 no-underline"
            >
              <PlusCircle size={16} />
              Создать первый заказ
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-bg-light transition-colors no-underline"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-text-primary">{order.orderNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mt-0.5">{order.productName}</p>
                  <p className="text-text-muted text-xs mt-0.5">Клиент: {order.clientName} &middot; {formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-text-primary">{formatPrice(order.totalCost)}</p>
                  {order.isTradeIn && (
                    <span className="text-xs text-accent font-medium">Trade-in</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden mt-6">
        <Link
          to="/dashboard/orders/new"
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 no-underline w-full"
        >
          <PlusCircle size={18} />
          Создать новый заказ
        </Link>
      </div>
    </div>
  )
}
