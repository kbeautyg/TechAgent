import { useState } from 'react'
import { mockOrders, mockUsers, saveOrders } from '../../data/mock'
import { formatPrice, formatDate } from '../../utils/calculate'
import { ORDER_TRACK_STEPS, STATUS_META } from '../../lib/techagent'
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
const th: React.CSSProperties = { textAlign: 'left', padding: '12px 16px', color: '#8891A5', fontWeight: 600 }
const td: React.CSSProperties = { padding: '12px 16px' }

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
      setRefreshKey((k) => k + 1)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 18 }}>
        <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: 0 }}>Все заказы</h1>
        <span style={{ fontSize: 13.5, color: '#8891A5' }}>{mockOrders.length} заказов</span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 2 }}>
        {filterTabs.map((t) => {
          const active = filter === t.value
          return <button key={t.value} onClick={() => setFilter(t.value)} style={{ padding: '9px 14px', borderRadius: 11, fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', border: 'none', flex: 'none', background: active ? '#1B44F5' : '#fff', color: active ? '#fff' : '#3A4256' }}>{t.label}</button>
        })}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F7F8FC', borderBottom: '1px solid #EEF0F6' }}>
                {['Номер', 'Товар', 'Партнёр', 'Клиент', 'Сумма', 'Статус', 'Дата', 'Действия'].map((h) => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const ip = mockUsers.find((u) => u.id === order.userId)
                const meta = STATUS_META[order.status]
                const currentIdx = ORDER_TRACK_STEPS.indexOf(order.status)
                const nextStatus = currentIdx >= 0 && currentIdx < ORDER_TRACK_STEPS.length - 1 ? ORDER_TRACK_STEPS[currentIdx + 1] : null
                return (
                  <tr key={order.id} style={{ borderTop: '1px solid #F0F1F6' }}>
                    <td style={{ ...td, fontWeight: 600 }}>{order.orderNumber}{order.isTradeIn && <span style={{ marginLeft: 6, fontSize: 11, color: '#1B44F5', fontWeight: 700 }}>TI</span>}</td>
                    <td style={{ ...td, color: '#5B647A', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.productName}</td>
                    <td style={{ ...td, color: '#5B647A', fontSize: 12 }}>{ip?.companyName || '—'}</td>
                    <td style={{ ...td, color: '#5B647A' }}>{order.clientName}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{formatPrice(order.totalCost)}</td>
                    <td style={td}><span style={{ font: "600 11px/1 sans-serif", padding: '4px 9px', borderRadius: 999, color: meta.color, background: meta.bg }}>{meta.label}</span></td>
                    <td style={{ ...td, color: '#8891A5', fontSize: 12 }}>{formatDate(order.createdAt)}</td>
                    <td style={td}>
                      {nextStatus && order.status !== 'CANCELLED' && (
                        <button onClick={() => handleStatusChange(order.id, nextStatus)} style={{ fontSize: 12, background: '#EDF0FF', color: '#1B44F5', padding: '6px 10px', borderRadius: 8, fontWeight: 600, border: 'none', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                        → {STATUS_META[nextStatus].label}</button>
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
