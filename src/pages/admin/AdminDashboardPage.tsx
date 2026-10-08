import { Link } from 'react-router-dom'
import { Users, Package, Wallet, PackageOpen, PackageCheck, Award } from 'lucide-react'
import { mockOrders, mockUsers } from '../../data/mock'
import { formatPrice, formatReward, accruedReward, paidTotal } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/status'

export default function AdminDashboardPage() {
  const partners = mockUsers.filter((u) => u.role === 'CLIENT')
  const pendingPartners = partners.filter((u) => (u.partnerStatus ?? 'PENDING') === 'PENDING').length
  const orders = mockOrders

  const stats = [
    { label: 'Партнёров', value: partners.length.toString(), icon: Users },
    { label: 'Заказов', value: orders.length.toString(), icon: Package },
    { label: 'Оплачено покупателями', value: formatPrice(paidTotal(orders)), icon: Wallet },
    { label: 'Ждут выдачи', value: orders.filter((o) => o.status === 'AT_POINT').length.toString(), icon: PackageOpen },
    { label: 'Выдано', value: orders.filter((o) => o.status === 'ISSUED').length.toString(), icon: PackageCheck },
    { label: 'Вознаграждение Партнёров', value: formatReward(accruedReward(orders)), icon: Award },
  ]

  const work = [
    { label: 'Ждут оплаты', value: orders.filter((o) => o.status === 'CREATED' && o.paymentStatus !== 'PAID').length },
    { label: 'Выкупить у поставщика', value: orders.filter((o) => o.status === 'PAID').length },
    { label: 'Выкуплены, ждут отправки', value: orders.filter((o) => o.status === 'PURCHASED').length },
    { label: 'В пути', value: orders.filter((o) => o.status === 'IN_TRANSIT').length },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Панель администратора</h1>

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
          <div key={s.label} className="card p-4">
            <div className="flex items-center gap-2 text-text-muted">
              <s.icon size={16} />
              <p className="text-xs">{s.label}</p>
            </div>
            <p className="font-display text-xl font-bold text-text-primary mt-1 break-words">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted mb-8">
        Вознаграждение — по выданным заказам с загруженным актом приёма-передачи.
      </p>

      <h2 className="font-bold text-lg text-text-primary mb-4">В работе у ТехЭйджент</h2>
      <div className="card divide-y divide-border mb-8">
        {work.map((w) => (
          <div key={w.label} className="flex items-center justify-between px-5 py-3 text-sm">
            <span className="text-text-secondary">{w.label}</span>
            <span className="font-bold text-text-primary">{w.value}</span>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-lg text-text-primary mb-4">Последние заказы</h2>
      <div className="card overflow-hidden">
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
              {orders.slice(0, 10).map((order) => {
                const partner = mockUsers.find((u) => u.id === order.userId)
                return (
                  <tr key={order.id} className="hover:bg-bg-light transition-colors">
                    <td className="px-4 py-3 font-medium text-text-primary">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-text-secondary">{order.productName}</td>
                    <td className="px-4 py-3 text-text-secondary">{partner?.companyName || '—'}</td>
                    <td className="px-4 py-3 font-medium text-text-primary whitespace-nowrap">{formatPrice(order.price)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${ORDER_STATUS_COLORS[order.status]}`}>
                        {ORDER_STATUS_LABELS[order.status]}
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
