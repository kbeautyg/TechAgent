import { useState } from 'react'
import { mockOrders, mockUsers, saveOrders } from '../../data/mock'
import { formatPrice, formatDate, formatReward, storageUntil, storageExpired } from '../../utils/calculate'
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLORS,
  ADMIN_NEXT_STATUS,
  AT_POINT_FILTER_LABEL,
  BUYER_CLAIM_LABELS,
} from '../../utils/status'
import type { Order, OrderStatus } from '../../types'

const filterTabs: { label: string; value: OrderStatus | 'ALL' }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Ждут оплаты', value: 'CREATED' },
  { label: 'Оплачены', value: 'PAID' },
  { label: 'Выкуплены', value: 'PURCHASED' },
  { label: 'В пути', value: 'IN_TRANSIT' },
  { label: AT_POINT_FILTER_LABEL, value: 'AT_POINT' },
  { label: 'Выданы', value: 'ISSUED' },
  { label: 'Отменены', value: 'CANCELLED' },
]

const actionBtn = 'text-xs px-2 py-1 rounded font-medium transition-colors border-none cursor-pointer whitespace-nowrap'

/** Отметки о заказе, на которые ТехЭйджент нужно обратить внимание: приёмка, хранение, обращения, возврат */
function OrderNotes({ order }: { order: Order }) {
  const notes: { text: string; tone: 'muted' | 'warn' | 'alert' }[] = []
  if (order.receivedIssue) {
    notes.push({
      text: `При приёмке: ${order.receivedIssue}${order.receivedIssuePhoto ? ' (фото приложено)' : ''}`,
      tone: 'warn',
    })
  }
  if (order.status === 'AT_POINT') {
    const until = storageUntil(order)
    if (!order.notifiedAt) notes.push({ text: 'Покупатель ещё не уведомлён о поступлении', tone: 'muted' })
    else if (storageExpired(order)) notes.push({ text: 'Срок хранения истёк', tone: 'alert' })
    else if (until) notes.push({ text: `Хранится до ${formatDate(until.toISOString())}`, tone: 'muted' })
  }
  for (const c of order.buyerClaims ?? []) {
    notes.push({
      text: `Обращение покупателя (${BUYER_CLAIM_LABELS[c.type].toLowerCase()}), ${formatDate(c.createdAt)}: ${c.text}${c.photoAttached ? ' (фото приложено)' : ''}`,
      tone: 'alert',
    })
  }
  if (order.refundedAt) notes.push({ text: `Возврат оплаты оформлен ${formatDate(order.refundedAt)}`, tone: 'muted' })
  if (order.returnedAt) notes.push({ text: `Товар возвращён после выдачи ${formatDate(order.returnedAt)}, вознаграждение аннулировано`, tone: 'muted' })
  if (notes.length === 0) return null
  const tone = { muted: 'text-text-muted', warn: 'text-amber-700', alert: 'text-red-700' }
  return (
    <div className="mt-1.5 space-y-1 max-w-64">
      {notes.map((n, i) => (
        <p key={i} className={`text-xs whitespace-normal break-words ${tone[n.tone]}`}>{n.text}</p>
      ))}
    </div>
  )
}

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

  const moveTo = (order: Order, next: OrderStatus) => {
    if (!confirm(`Перевести заказ ${order.orderNumber} в статус «${ORDER_STATUS_LABELS[next]}»?`)) return
    patch(order, { status: next })
  }

  const cancel = (order: Order) => {
    if (!confirm(`Отменить заказ ${order.orderNumber}? Оплаты по нему не было.`)) return
    patch(order, { status: 'CANCELLED' })
  }

  const cancelWithRefund = (order: Order) => {
    if (
      !confirm(
        `Отменить заказ ${order.orderNumber} и вернуть покупателю ${formatPrice(order.price)}? ` +
          'Деньги возвращаются тем же способом, которым была произведена оплата.',
      )
    )
      return
    const now = new Date().toISOString()
    patch(order, { status: 'CANCELLED', refundedAt: now })
  }

  const returnAfterIssue = (order: Order) => {
    if (
      !confirm(
        `Оформить возврат товара по заказу ${order.orderNumber} и вернуть покупателю ${formatPrice(order.price)}? ` +
          'Вознаграждение партнёра по заказу аннулируется (п. 7.3 оферты).',
      )
    )
      return
    const now = new Date().toISOString()
    patch(order, { returnedAt: now, refundedAt: now })
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
                <th className="text-left px-4 py-3 font-medium text-text-muted">Товар и партнёр</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Покупатель</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Цена</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Статус и действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                    {mockOrders.length === 0 ? 'Заказов пока нет' : 'Ничего не найдено'}
                  </td>
                </tr>
              )}
              {orders.map((order) => {
                const partner = mockUsers.find((u) => u.id === order.userId)
                const next = ADMIN_NEXT_STATUS[order.status]
                const unpaid = order.status === 'CREATED' && order.paymentStatus !== 'PAID'
                const refundable = (order.status === 'PAID' || order.status === 'PURCHASED') && order.paymentStatus === 'PAID'
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
                      <p className="text-xs text-text-muted">
                        вознагр. {order.status === 'CANCELLED' ? 'не начисляется' : formatReward(order.partnerReward)}
                      </p>
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
                      <OrderNotes order={order} />
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
                          <button onClick={() => moveTo(order, next)} className={`${actionBtn} bg-primary/10 text-primary hover:bg-primary/20`}>
                            &rarr; {ORDER_STATUS_LABELS[next]}
                          </button>
                        )}
                        {refundable && (
                          <button onClick={() => cancelWithRefund(order)} className={`${actionBtn} bg-red-50 text-red-700 hover:bg-red-100`}>
                            Отменить с возвратом
                          </button>
                        )}
                        {order.status === 'IN_TRANSIT' && (
                          <span className="text-xs text-text-muted">Приёмку отмечает партнёр</span>
                        )}
                        {order.status === 'AT_POINT' && (
                          <span className="text-xs text-text-muted">Выдачу подтверждает партнёр</span>
                        )}
                        {order.status === 'ISSUED' && (
                          <span className={`text-xs ${order.issueActUploaded ? 'text-text-muted' : 'text-red-600'}`}>
                            {order.issuedToName ? `${order.issuedToName}, ` : ''}
                            {order.issueActUploaded ? 'акт загружен' : 'акт не загружен'}
                          </span>
                        )}
                        {order.status === 'ISSUED' && !order.returnedAt && (
                          <button onClick={() => returnAfterIssue(order)} className={`${actionBtn} bg-red-50 text-red-700 hover:bg-red-100`}>
                            Возврат после выдачи
                          </button>
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
