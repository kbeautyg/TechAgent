import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDate } from '../../utils/calculate'
import { STATUS_META, Icon } from '../../lib/techagent'
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
    .filter((o) => search === '' || o.productName.toLowerCase().includes(search.toLowerCase()) || o.clientName.toLowerCase().includes(search.toLowerCase()) || o.orderNumber.includes(search))

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: 0 }}>Мои заказы</h1>
        <Link to="/dashboard/orders/new" className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 14px rgba(27,68,245,.24)', textDecoration: 'none' }}>
          <Icon name="plus" size={16} />Новый заказ
        </Link>
      </div>

      <div style={{ position: 'relative', marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8891A5" strokeWidth="1.9" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" /></svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по номеру, товару или клиенту…" className="ta-input" style={{ width: '100%', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 12, padding: '12px 14px 12px 40px', fontSize: 14, outline: 'none' }} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 2 }}>
        {filterTabs.map((t) => {
          const active = filter === t.value
          return <button key={t.value} onClick={() => setFilter(t.value)} style={{ padding: '9px 14px', borderRadius: 11, fontWeight: 600, fontSize: 13.5, whiteSpace: 'nowrap', border: 'none', flex: 'none', background: active ? '#1B44F5' : '#fff', color: active ? '#fff' : '#3A4256', boxShadow: active ? '0 6px 14px rgba(27,68,245,.24)' : 'none' }}>{t.label}</button>
        })}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#8891A5' }}>Заказы не найдены</div>
        ) : (
          filtered.map((order, i) => {
            const meta = STATUS_META[order.status]
            return (
              <Link key={order.id} to={`/dashboard/orders/${order.id}`} className="ta-tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '15px 20px', borderTop: i === 0 ? 'none' : '1px solid #F0F1F6', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{order.orderNumber}</span>
                    <span style={{ font: "600 11px/1 sans-serif", padding: '4px 8px', borderRadius: 999, color: meta.color, background: meta.bg }}>{meta.label}</span>
                    {order.isTradeIn && <span style={{ font: "600 11px/1 sans-serif", padding: '4px 8px', borderRadius: 999, color: '#B5680A', background: '#FFF3E0' }}>Trade-in</span>}
                  </div>
                  <div style={{ fontSize: 13.5, color: '#5B647A', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.productName}</div>
                  <div style={{ fontSize: 12, color: '#8891A5', marginTop: 2 }}>Клиент: {order.clientName} · {formatDate(order.createdAt)}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14.5, flex: 'none' }}>{formatPrice(order.totalCost)}</div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
