import { useState } from 'react'
import { mockOrders, mockUsers, saveOrders } from '../../data/mock'
import { formatPrice, formatDate } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ORDER_STEPS } from '../../utils/status'
import type { OrderStatus } from '../../types'

const filterTabs: { label: string; value: OrderStatus | 'ALL' }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Созданы', value: 'CREATED' },
  { label: 'Оплачены', value: 'PAID' },
  { label: 'Выкупаем', value: 'PURCHASING' },
  { label: 'Доставка', value: 'SHIPPING' },
  { label: 'Завершены', value: 'COMPLETED' },
  { label: 'Отменены', value: 'CANCELLED' },
]

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [, setRefreshKey] = useState(0)

  const orders = mockOrders.filter((o) => filter === 'ALL' || o.status === filter)

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const order = mockOrders.find((o) => o.id === orderId)
    if (order) {
      order.status = newStatus
      order.updatedAt = new Date().toISOString()
      saveOrders()
      setRefreshKey(k => k + 1)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Все заказы</h1>
        <span className="text-text-muted text-sm">{mockOrders.length} заказов</span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filterTabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border-none cursor-pointer ${
              filter === t.value
                ? 'bg-primary text-white'
                : 'bg-bg-light text-text-secondary hover:bg-bg-light hover:text-text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-light">
                <th className="text-left px-4 py-3 font-medium text-text-muted">Номер</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Товар</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Партнёр</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Клиент</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Сумма</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Статус</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Дата</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => {
                const ip = mockUsers.find((u) => u.id === order.userId)
                const currentIdx = ORDER_STEPS.indexOf(order.status)
                const nextStatus = currentIdx < ORDER_STEPS.length - 1 ? ORDER_STEPS[currentIdx + 1] : null
                return (
                  <tr key={order.id} className="hover:bg-bg-light transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-text-primary">{order.orderNumber}</span>
                      {order.isTradeIn && (
                        <span className="ml-1 text-xs text-primary font-medium">TI</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary max-w-48 truncate">{order.productName}</td>
                    <td className="px-4 py-3 text-text-secondary text-xs">{ip?.companyName || '—'}</td>
                    <td className="px-4 py-3 text-text-secondary">{order.clientName}</td>
                    <td className="px-4 py-3 font-medium text-text-primary">{formatPrice(order.totalCost)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-muted text-xs">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      {nextStatus && order.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleStatusChange(order.id, nextStatus)}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium hover:bg-primary/20 transition-colors border-none cursor-pointer whitespace-nowrap"
                        >
                          &rarr; {ORDER_STATUS_LABELS[nextStatus]}
                        </button>
                      )}
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
