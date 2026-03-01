import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDate } from '../../utils/calculate'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/status'
import type { OrderStatus } from '../../types'

const filterTabs: { label: string; value: OrderStatus | 'ALL' }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Ожидают', value: 'CREATED' },
  { label: 'Оплачено', value: 'PAID' },
  { label: 'В работе', value: 'PURCHASING' },
  { label: 'В доставке', value: 'SHIPPING' },
  { label: 'Завершено', value: 'COMPLETED' },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')

  const allOrders = mockOrders.filter((o) => o.userId === user?.id)
  const filtered = allOrders
    .filter((o) => filter === 'ALL' || o.status === filter)
    .filter((o) =>
      search === '' ||
      o.productName.toLowerCase().includes(search.toLowerCase()) ||
      o.clientName.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.includes(search)
    )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Мои заказы</h1>
        <Link
          to="/dashboard/orders/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 no-underline"
        >
          <PlusCircle size={18} />
          Новый заказ
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по номеру, товару или клиенту..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
        />
      </div>

      {/* Filter tabs */}
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

      {/* Orders list */}
      <div className="card">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            <p>Заказы не найдены</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((order) => (
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
                    {order.isTradeIn && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">
                        Trade-in
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mt-1 truncate">{order.productName}</p>
                  <p className="text-text-muted text-xs mt-0.5">
                    Клиент: {order.clientName} &middot; {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="font-bold text-sm text-text-primary">{formatPrice(order.totalCost)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
