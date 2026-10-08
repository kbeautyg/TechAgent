import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDate, storageNote } from '../../utils/calculate'
import { AT_POINT_FILTER_LABEL, isIssued, orderStatusLabel, orderStatusColor } from '../../utils/status'
import { useDataRevision } from '../../utils/store'
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

export default function OrdersPage() {
  const { user } = useAuth()
  useDataRevision()
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')
  const canOrder = user?.partnerStatus === 'VERIFIED'

  const q = search.trim().toLowerCase()
  const own = mockOrders.filter((o) => o.userId === user?.id)
  // «Выданы» — без заказов, возвращённых после выдачи
  const matches = (o: Order) => filter === 'ALL' || (filter === 'ISSUED' ? isIssued(o) : o.status === filter)
  const filtered = own
    .filter(matches)
    .filter((o) =>
      q === '' ||
      o.productName.toLowerCase().includes(q) ||
      o.buyerName.toLowerCase().includes(q) ||
      o.orderNumber.includes(q)
    )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Заказы</h1>
        {canOrder && (
          <Link
            to="/dashboard/orders/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 no-underline"
          >
            <PlusCircle size={18} />
            Новый заказ
          </Link>
        )}
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Номер, товар или покупатель"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
        />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filterTabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all border-none cursor-pointer ${
              filter === t.value
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-bg-light text-text-secondary hover:bg-bg-light'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            <p>{own.length === 0 ? 'Заказов пока нет' : 'Ничего не найдено'}</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((order) => {
              const note = storageNote(order)
              return (
              <Link
                key={order.id}
                to={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-bg-light transition-colors no-underline"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-text-primary">{order.orderNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderStatusColor(order)}`}>
                      {orderStatusLabel(order)}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mt-1 truncate">{order.productName}</p>
                  <p className="text-text-muted text-xs mt-0.5">
                    Покупатель: {order.buyerName} &middot; {formatDate(order.createdAt)}
                  </p>
                  {note && (
                    <p className={`text-xs mt-0.5 ${note.expired ? 'text-red-600 font-medium' : 'text-text-secondary'}`}>{note.text}</p>
                  )}
                </div>
                <p className="font-bold text-sm text-text-primary shrink-0 ml-4 whitespace-nowrap">{formatPrice(order.price)}</p>
              </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
