import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, PlusCircle, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { AT_POINT_FILTER_LABEL, isIssued } from '../../utils/status'
import { useDataRevision } from '../../utils/store'
import type { Order, OrderStatus } from '../../types'
import OrderRow from '../../components/app/OrderRow'
import { PageBar, RoundLink } from '../../components/app/ui'

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
  // Кнопки главного экрана («Выдать товар», «Принять товар»…) открывают список сразу с нужным фильтром
  const [params, setParams] = useSearchParams()
  const fromUrl = params.get('status')
  const filter: OrderStatus | 'ALL' = filterTabs.some((t) => t.value === fromUrl) ? (fromUrl as OrderStatus) : 'ALL'
  const setFilter = (v: OrderStatus | 'ALL') => setParams(v === 'ALL' ? {} : { status: v }, { replace: true })

  // Выбранный фильтр всегда виден: лента сама докручивается до него (саму страницу не двигаем)
  const stripRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const strip = stripRef.current
    const chip = strip?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!strip || !chip) return
    const target = chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [filter])
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
    <div className="max-w-3xl">
      <PageBar
        title="Заказы"
        right={canOrder ? (
          <RoundLink to="/dashboard/orders/new" label="Новый заказ">
            <Plus size={24} className="text-primary" />
          </RoundLink>
        ) : undefined}
        extra={canOrder && (
          <Link
            to="/dashboard/orders/new"
            className="ml-auto inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all no-underline"
          >
            <PlusCircle size={18} />
            Новый заказ
          </Link>
        )}
      />

      <div className="relative mb-3">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Номер, товар или покупатель"
          aria-label="Поиск заказа"
          className="w-full h-12 pl-12 pr-4 rounded-2xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-[15px]"
        />
      </div>

      {/* Фильтр лентой: листается вбок только сама лента, страница стоит на месте */}
      <div ref={stripRef} className="relative flex gap-2 mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 pb-1">
        {filterTabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            aria-pressed={filter === t.value}
            className={`h-10 px-4 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border cursor-pointer shrink-0 ${
              filter === t.value
                ? 'bg-text-primary text-white border-text-primary'
                : 'bg-white text-text-secondary border-border hover:text-text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="app-list p-8 text-center text-text-muted">
          <p>{own.length === 0 ? 'Заказов пока нет' : 'Ничего не найдено'}</p>
        </div>
      ) : (
        <div className="app-list">
          {filtered.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
