import { mockOrders, mockUsers } from '../../data/mock'
import { formatPrice } from '../../utils/calculate'
import { Icon } from '../../lib/techagent'
import type { Order } from '../../types'

/* Coarse, payment-aware badge for the recent-orders widget — surfaces unpaid orders
   at a glance rather than every fine-grained order status. */
function recentOrderBadge(order: Order) {
  if (order.status === 'CANCELLED') return { label: 'Отменён', color: '#C81E2C', bg: '#FFECEC' }
  if (order.status === 'COMPLETED') return { label: 'Завершён', color: '#0B7A55', bg: '#E4F8F0' }
  if (order.paymentStatus === 'PENDING') return { label: 'Ожидает оплаты', color: '#B5680A', bg: '#FFF3E0' }
  return { label: 'В работе', color: '#1B44F5', bg: '#EDF0FF' }
}

export default function AdminDashboardPage() {
  const clients = mockUsers.filter((u) => u.role === 'CLIENT')
  const orders = mockOrders

  const totalRevenue = orders.reduce((s, o) => s + o.totalCost, 0)
  const totalCommission = orders.reduce((s, o) => s + o.commission, 0)
  const pendingPayments = orders.filter((o) => o.paymentStatus === 'PENDING').length
  const inProgress = orders.filter((o) => ['PURCHASING', 'PURCHASED'].includes(o.status)).length
  const inDelivery = orders.filter((o) => o.status === 'SHIPPING').length

  const stats = [
    { label: 'Партнёров', value: String(clients.length), glyph: 'user' },
    { label: 'Всего заказов', value: String(orders.length), glyph: 'box' },
    { label: 'Сумма заказов', value: formatPrice(totalRevenue), glyph: 'coins' },
    { label: 'Прибыль (3%)', value: formatPrice(totalCommission), glyph: 'bolt' },
  ]
  const activeStats = [
    { label: 'Ожидают оплаты', value: pendingPayments, glyph: 'doc', color: '#E38A00', bg: '#FFF3E0' },
    { label: 'В работе', value: inProgress, glyph: 'box', color: '#6D4BF5', bg: '#F1ECFF' },
    { label: 'В доставке', value: inDelivery, glyph: 'truck', color: '#1B44F5', bg: '#EDF0FF' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: '0 0 22px' }}>Панель администратора</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 28 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 12, background: '#EDF0FF', display: 'grid', placeItems: 'center' }}><Icon name={s.glyph} size={19} color="#1B44F5" /></span>
            <div><div style={{ fontSize: 12, color: '#8891A5' }}>{s.label}</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16.5, marginTop: 2 }}>{s.value}</div></div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Активные заказы</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 28 }}>
        {activeStats.map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 12, background: s.bg, display: 'grid', placeItems: 'center' }}><Icon name={s.glyph} size={19} color={s.color} /></span>
            <div><div style={{ fontSize: 12, color: '#8891A5' }}>{s.label}</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 20 }}>{s.value}</div></div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Последние заказы</div>
      <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
              <tr style={{ background: '#F7F8FC', borderBottom: '1px solid #EEF0F6' }}>
                {['Номер', 'Товар', 'Партнёр', 'Сумма', 'Статус'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#8891A5', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order) => {
                const ip = mockUsers.find((u) => u.id === order.userId)
                const meta = recentOrderBadge(order)
                return (
                  <tr key={order.id} style={{ borderTop: '1px solid #F0F1F6' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{order.orderNumber}</td>
                    <td style={{ padding: '12px 16px', color: '#5B647A', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.productName}</td>
                    <td style={{ padding: '12px 16px', color: '#5B647A' }}>{ip?.companyName || '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{formatPrice(order.totalCost)}</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ font: "600 11px/1 sans-serif", padding: '4px 9px', borderRadius: 999, color: meta.color, background: meta.bg }}>{meta.label}</span></td>
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
