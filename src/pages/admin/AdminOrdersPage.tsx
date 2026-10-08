import { useState } from 'react'
import { mockOrders, mockUsers, saveOrders } from '../../data/mock'
import { formatPrice, formatDate, formatReward } from '../../utils/calculate'
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLORS,
  ADMIN_NEXT_STATUS,
} from '../../utils/status'
import type { Order, OrderStatus } from '../../types'

const filterTabs: { label: string; value: OrderStatus | 'ALL' }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Ждут оплаты', value: 'CREATED' },
  { label: 'Оплачены', value: 'PAID' },
  { label: 'Выкуплены', value: 'PURCHASED' },
  { label: 'В пути', value: 'IN_TRANSIT' },
  { label: 'В пункте выдачи', value: 'AT_POINT' },
  { label: 'Выданы', value: 'ISSUED' },
  { label: 'Отменены', value: 'CANCELLED' },
]

const actionBtn = 'text-xs px-2 py-1 rounded font-medium transition-colors border-none cursor-pointer whitespace-nowrap'

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [, setRefreshKey] = useState(0)

  const orders = mockOrders.filter((o) => filter === 'ALL' || o.status === filter)

  const patch = (order: Order, data: Partial<Order>) => {
    Object.assign(order, data, { updatedAt: new Date().toISOString() })
    saveOrders()
    setRefreshKey((k) => k + 1)
  }

  const markPaid = (order: Order) => {
    if (!confirm(`Отметить заказ ${order.orderNumber} оплаченным? Только если оплата ${formatPrice(order.price)} поступила на счёт ТехЭйджент.`)) return
    patch(order, { paymentStatus: 'PAID', paidAt: new Date().toISOString(), status: 'PAID' })
  }

  const cancel = (order: Order) => {
    if (!confirm(`Отменить заказ ${order.orderNumber}?`)) return
    patch(order, { status: 'CANCELLED' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Заказы</h1>
        <span className="text-text-muted text-sm">{mockOrders.length} всего</span>
      </div>

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
                <th className="text-left px-4 py-3 font-medium text-text-muted">Заказ</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Товар и Партнёр</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Покупатель</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Цена</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Статус и действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">Заказов нет</td>
                </tr>
              )}
              {orders.map((order) => {
                const partner = mockUsers.find((u) => u.id === order.userId)
                const next = ADMIN_NEXT_STATUS[order.status]
                const unpaid = order.status === 'CREATED' && order.paymentStatus !== 'PAID'
                return (
                  <tr key={order.id} className="hover:bg-bg-light transition-colors align-top">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-medium text-text-primary">{order.orderNumber}</p>
                      <p className="text-xs text-text-muted">{formatDate(order.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3 max-w-48">
                      <p className="text-text-primary truncate">{order.productName}</p>
                      <p className="text-xs text-text-muted truncate">{partner?.companyName || '—'}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-secondary min-w-36">
                      <p className="text-text-primary text-sm">{order.buyerName}</p>
                      <p className="whitespace-nowrap">{order.buyerPhone}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-medium text-text-primary">{formatPrice(order.price)}</p>
                      <p className="text-xs text-text-muted">вознагр. {formatReward(order.partnerReward)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                        {(order.status !== 'CANCELLED' || order.paymentStatus === 'PAID') && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${PAYMENT_STATUS_COLORS[order.paymentStatus]}`}>
                            {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-start gap-1.5 mt-2">
                        {unpaid && (
                          <>
                            <button onClick={() => markPaid(order)} className={`${actionBtn} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}>
                              Оплата поступила
                            </button>
                            <button onClick={() => cancel(order)} className={`${actionBtn} bg-red-50 text-red-700 hover:bg-red-100`}>
                              Отменить
                            </button>
                          </>
                        )}
                        {next && (
                          <button onClick={() => patch(order, { status: next })} className={`${actionBtn} bg-primary/10 text-primary hover:bg-primary/20`}>
                            &rarr; {ORDER_STATUS_LABELS[next]}
                          </button>
                        )}
                        {order.status === 'AT_POINT' && (
                          <span className="text-xs text-text-muted">Выдачу подтверждает Партнёр</span>
                        )}
                        {order.status === 'ISSUED' && (
                          <span className={`text-xs ${order.issueActUploaded ? 'text-text-muted' : 'text-red-600'}`}>
                            {order.issuedToName ? `${order.issuedToName}, ` : ''}
                            {order.issueActUploaded ? 'акт загружен' : 'акт не загружен'}
                          </span>
                        )}
                      </div>
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
