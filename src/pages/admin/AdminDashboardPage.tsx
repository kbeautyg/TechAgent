import { Users, Package, TrendingUp, Clock, AlertCircle, Truck } from 'lucide-react'
import { mockOrders, mockUsers } from '../../data/mock'
import { formatPrice } from '../../utils/calculate'

export default function AdminDashboardPage() {
  const clients = mockUsers.filter((u) => u.role === 'CLIENT')
  const orders = mockOrders

  const totalRevenue = orders.reduce((s, o) => s + o.totalCost, 0)
  const totalCommission = orders.reduce((s, o) => s + o.commission, 0)
  const pendingPayments = orders.filter((o) => o.paymentStatus === 'PENDING').length
  const inProgress = orders.filter((o) => ['PURCHASING', 'PURCHASED'].includes(o.status)).length
  const inDelivery = orders.filter((o) => o.status === 'SHIPPING').length

  const stats = [
    { label: 'Партнёров', value: clients.length.toString(), icon: Users, color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Всего заказов', value: orders.length.toString(), icon: Package, color: 'text-secondary', bg: 'bg-secondary/5' },
    { label: 'Сумма заказов', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/5' },
    { label: 'Прибыль (3%)', value: formatPrice(totalCommission), icon: TrendingUp, color: 'text-success', bg: 'bg-success/5' },
  ]

  const activeStats = [
    { label: 'Ожидают оплаты', value: pendingPayments, icon: Clock, color: 'text-warning', bg: 'bg-warning/5' },
    { label: 'В работе', value: inProgress, icon: AlertCircle, color: 'text-secondary', bg: 'bg-secondary/5' },
    { label: 'В доставке', value: inDelivery, icon: Truck, color: 'text-primary', bg: 'bg-primary/5' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Панель администратора</h1>

      {/* Main stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-3">
              <div className={`icon-box ${s.bg} ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-text-muted text-xs">{s.label}</p>
                <p className="text-xl font-bold text-text-primary mt-0.5">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active orders */}
      <h2 className="font-bold text-lg text-text-primary mb-4">Активные заказы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {activeStats.map((s) => (
          <div key={s.label} className="card p-5 flex items-center gap-3">
            <div className={`icon-box ${s.bg} ${s.color}`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-text-muted text-xs">{s.label}</p>
              <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <h2 className="font-bold text-lg text-text-primary mb-4">Последние заказы</h2>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-light">
                <th className="text-left px-4 py-3 font-medium text-text-muted">Номер</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Товар</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Партнёр</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Сумма</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.slice(0, 10).map((order) => {
                const ip = mockUsers.find((u) => u.id === order.userId)
                return (
                  <tr key={order.id} className="hover:bg-bg-light transition-colors">
                    <td className="px-4 py-3 font-medium text-text-primary">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-text-secondary">{order.productName}</td>
                    <td className="px-4 py-3 text-text-secondary">{ip?.companyName || '—'}</td>
                    <td className="px-4 py-3 font-medium text-text-primary">{formatPrice(order.totalCost)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400' :
                        order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400' :
                        order.paymentStatus === 'PENDING' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {order.status === 'COMPLETED' ? 'Завершен' :
                         order.status === 'CANCELLED' ? 'Отменен' :
                         order.paymentStatus === 'PENDING' ? 'Ожидает оплаты' :
                         'В работе'}
                      </span>
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
