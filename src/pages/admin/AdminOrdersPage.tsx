import { useState } from 'react'
import { Search } from 'lucide-react'
import { mockOrders, mockUsers, updateOrder } from '../../data/mock'
import { formatPrice, formatDate, formatReward, storageUntil, storageExpired, cancelledAtPoint } from '../../utils/calculate'
import {
  ORDER_STATUS_LABELS,
  ADMIN_NEXT_STATUS,
  AT_POINT_FILTER_LABEL,
  BUYER_CLAIM_LABELS,
  isIssued,
  orderStatusLabel,
  orderStatusColor,
  paymentStatusLabel,
  paymentStatusColor,
  photoNote,
} from '../../utils/status'
import { useDataRevision } from '../../utils/store'
import type { Order, OrderStatus } from '../../types'

type Filter = OrderStatus | 'ALL' | 'CLAIMS'

const filterTabs: { label: string; value: Filter }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Ждут оплаты', value: 'CREATED' },
  { label: 'Оплачены', value: 'PAID' },
  { label: 'Выкуплены', value: 'PURCHASED' },
  { label: 'В пути', value: 'IN_TRANSIT' },
  { label: AT_POINT_FILTER_LABEL, value: 'AT_POINT' },
  { label: 'Выданы', value: 'ISSUED' },
  { label: 'Отменены', value: 'CANCELLED' },
  { label: 'С обращениями', value: 'CLAIMS' },
]

const actionBtn = 'text-xs px-2 py-1 rounded font-medium transition-colors border-none cursor-pointer whitespace-nowrap'

/** Отмена с возвратом денег — по оплаченному заказу до выдачи товара (п. 6.1 оферты купли-продажи) */
const REFUNDABLE: OrderStatus[] = ['PAID', 'PURCHASED', 'IN_TRANSIT', 'AT_POINT']
const isRefundable = (o: Order) => REFUNDABLE.includes(o.status) && o.paymentStatus === 'PAID' && !o.refundedAt

/** Статус успели изменить в другой вкладке — действие не применено */
const STALE = 'Заказ уже изменён в другой вкладке — данные на странице обновлены.'

function matchesFilter(o: Order, filter: Filter): boolean {
  if (filter === 'ALL') return true
  if (filter === 'CLAIMS') return (o.buyerClaims ?? []).length > 0
  // «Выданы» — без заказов, возвращённых после выдачи
  if (filter === 'ISSUED') return isIssued(o)
  return o.status === filter
}

/** Отметки о заказе, на которые ТехЭйджент нужно обратить внимание: приёмка, хранение, обращения, возврат */
function OrderNotes({ order }: { order: Order }) {
  const notes: { text: string; tone: 'muted' | 'warn' | 'alert' }[] = []
  if (order.receivedIssue) {
    notes.push({ text: `При приёмке: ${order.receivedIssue}${photoNote(order)}`, tone: 'warn' })
  }
  if (order.status === 'AT_POINT') {
    const until = storageUntil(order)
    if (!order.notifiedAt) notes.push({ text: 'Покупатель ещё не уведомлён о поступлении', tone: 'muted' })
    else if (storageExpired(order)) notes.push({ text: 'Срок хранения истёк', tone: 'alert' })
    else if (until) notes.push({ text: `Хранится до ${formatDate(until.toISOString())}`, tone: 'muted' })
  }
  if (cancelledAtPoint(order)) {
    notes.push({ text: 'Товар остался в пункте выдачи — партнёр хранит его до указания ТехЭйджент', tone: 'warn' })
  }
  for (const c of order.buyerClaims ?? []) {
    notes.push({
      text: `Обращение покупателя (${BUYER_CLAIM_LABELS[c.type].toLowerCase()}), ${formatDate(c.createdAt)}: ${c.text}${c.photoAttached ? ' (фото приложено)' : ''}`,
      tone: 'alert',
    })
  }
  if (order.refundedAt && !order.returnedAt) notes.push({ text: `Возврат оплаты оформлен ${formatDate(order.refundedAt)}`, tone: 'muted' })
  if (order.returnedAt) notes.push({ text: `Товар возвращён после выдачи ${formatDate(order.returnedAt)}, вознаграждение аннулировано`, tone: 'muted' })
  if (notes.length === 0) return null
  const tone = { muted: 'text-text-muted', warn: 'text-amber-700', alert: 'text-red-700' }
  return (
    <div className="mt-1.5 space-y-1 w-64 max-w-64">
      {notes.map((n, i) => (
        // Длинный текст обращения переносится в любом месте и не растягивает строку таблицы
        <p key={i} className={`text-xs whitespace-pre-line [overflow-wrap:anywhere] ${tone[n.tone]}`}>{n.text}</p>
      ))}
    </div>
  )
}

/** Вознаграждение в списке: у отменённых не начисляется, у возвращённых аннулировано */
function rewardText(o: Order): string {
  if (o.status === 'CANCELLED') return 'не начисляется'
  if (o.returnedAt) return 'аннулировано'
  return formatReward(o.partnerReward)
}

export default function AdminOrdersPage() {
  useDataRevision()
  const [filter, setFilter] = useState<Filter>('ALL')
  const [search, setSearch] = useState('')

  const q = search.trim().toLowerCase()
  const partnerName = (o: Order) => mockUsers.find((u) => u.id === o.userId)?.companyName ?? ''
  const orders = mockOrders
    .filter((o) => matchesFilter(o, filter))
    .filter(
      (o) =>
        q === '' ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.buyerName.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q) ||
        partnerName(o).toLowerCase().includes(q),
    )

  /** Изменение применяется, только если заказ всё ещё в том статусе, который видел сотрудник */
  const patch = (order: Order, data: Partial<Order>, guard: (fresh: Order) => boolean) => {
    if (!updateOrder(order.id, data, guard)) alert(STALE)
  }

  const markPaid = (order: Order) => {
    if (!confirm(`Отметить заказ ${order.orderNumber} оплаченным? Только если оплата ${formatPrice(order.price)} поступила на счёт ТехЭйджент.`)) return
    patch(
      order,
      { paymentStatus: 'PAID', paidAt: new Date().toISOString(), status: 'PAID' },
      (o) => o.status === 'CREATED' && o.paymentStatus !== 'PAID',
    )
  }

  const moveTo = (order: Order, next: OrderStatus) => {
    if (!confirm(`Перевести заказ ${order.orderNumber} в статус «${ORDER_STATUS_LABELS[next]}»?`)) return
    patch(order, { status: next }, (o) => o.status === order.status)
  }

  const cancel = (order: Order) => {
    if (!confirm(`Отменить заказ ${order.orderNumber}? Оплаты по нему не было.`)) return
    patch(
      order,
      { status: 'CANCELLED', cancelledFrom: order.status },
      (o) => o.status === 'CREATED' && o.paymentStatus !== 'PAID',
    )
  }

  const cancelWithRefund = (order: Order) => {
    const atPoint = order.status === 'AT_POINT'
    const text =
      `Отменить заказ ${order.orderNumber} и вернуть покупателю уплаченную сумму ${formatPrice(order.price)}? ` +
      'Отказ от товара до получения — деньги возвращаются полностью (п. 6.1 оферты купли-продажи).' +
      (atPoint ? ' Товар находится в пункте выдачи — партнёр хранит его до указания ТехЭйджент.' : '')
    if (!confirm(text)) return
    patch(
      order,
      { status: 'CANCELLED', cancelledFrom: order.status, refundedAt: new Date().toISOString() },
      (o) => o.status === order.status && isRefundable(o),
    )
  }

  const returnAfterIssue = (order: Order) => {
    if (
      !confirm(
        `Оформить возврат товара по заказу ${order.orderNumber}? Покупателю возвращается уплаченная сумма, при возврате ` +
          'товара надлежащего качества — за вычетом расходов на доставку возвращённого товара (п. 7.2 оферты ' +
          'купли-продажи). Вознаграждение партнёра по заказу аннулируется (п. 7.3 агентского договора-оферты).',
      )
    )
      return
    const now = new Date().toISOString()
    patch(order, { returnedAt: now, refundedAt: now }, (o) => o.status === 'ISSUED' && !o.returnedAt)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Заказы</h1>
        <span className="text-text-muted text-sm">{mockOrders.length} всего</span>
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Номер, покупатель, товар или партнёр"
          aria-label="Поиск по заказам"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
        />
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
        {/* Таблица прокручивается по горизонтали внутри карточки и не ломает страницу */}
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
                      <p className="text-xs text-text-muted">вознагр. {rewardText(order)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${orderStatusColor(order)}`}>
                          {orderStatusLabel(order)}
                        </span>
                        {(order.status !== 'CANCELLED' || order.paymentStatus === 'PAID') && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${paymentStatusColor(order)}`}>
                            {paymentStatusLabel(order)}
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
                        {order.status === 'IN_TRANSIT' && (
                          <span className="text-xs text-text-muted">Приёмку отмечает партнёр</span>
                        )}
                        {order.status === 'AT_POINT' && (
                          <span className="text-xs text-text-muted">Выдачу подтверждает партнёр</span>
                        )}
                        {isRefundable(order) && (
                          <button onClick={() => cancelWithRefund(order)} className={`${actionBtn} bg-red-50 text-red-700 hover:bg-red-100`}>
                            Отменить с возвратом
                          </button>
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
