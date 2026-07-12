import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDate } from '../../utils/calculate'
import { STATUS_META, Icon } from '../../lib/techagent'

export default function DashboardPage() {
  const { user } = useAuth()
  const orders = mockOrders.filter((o) => o.userId === user?.id)

  const thisMonth = orders.filter((o) => {
    const d = new Date(o.createdAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const totalRevenue = thisMonth.reduce((s, o) => s + o.totalCost, 0)
  const totalCommission = thisMonth.reduce((s, o) => s + o.commission, 0)

  const stats = [
    { label: 'Заказов за месяц', value: String(thisMonth.length), glyph: 'box' },
    { label: 'Сумма заказов', value: formatPrice(totalRevenue), glyph: 'coins' },
    { label: 'Комиссия', value: formatPrice(totalCommission), glyph: 'bolt' },
  ]
  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: 0 }}>Здравствуйте{user?.companyName ? `, ${user.companyName}` : ''}</h1>
          <p style={{ fontSize: 14, color: '#8891A5', margin: '6px 0 0' }}>Обзор вашей активности</p>
        </div>
        <Link to="/dashboard/orders/new" className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 14px rgba(27,68,245,.24)', textDecoration: 'none' }}>
          <Icon name="plus" size={16} />Новый заказ
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 26 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 12, background: '#EDF0FF', display: 'grid', placeItems: 'center' }}><Icon name={s.glyph} size={19} color="#1B44F5" /></span>
            <div><div style={{ fontSize: 12, color: '#8891A5' }}>{s.label}</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 17, marginTop: 2 }}>{s.value}</div></div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #EEF0F6' }}>
          <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5 }}>Последние заказы</div>
          <Link to="/dashboard/orders" style={{ color: '#1B44F5', fontWeight: 600, fontSize: 13.5, textDecoration: 'none' }}>Все заказы</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#8891A5' }}>
            <p style={{ margin: '0 0 10px' }}>У вас пока нет заказов</p>
            <Link to="/dashboard/orders/new" style={{ color: '#1B44F5', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="plus" size={15} />Создать первый заказ</Link>
          </div>
        ) : (
          <div>
            {recentOrders.map((order) => {
              const meta = STATUS_META[order.status]
              return (
                <Link key={order.id} to={`/dashboard/orders/${order.id}`} className="ta-tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '15px 20px', borderTop: '1px solid #F0F1F6', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{order.orderNumber}</span>
                      <span style={{ font: "600 11px/1 sans-serif", padding: '4px 8px', borderRadius: 999, color: meta.color, background: meta.bg }}>{meta.label}</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: '#5B647A', marginTop: 4 }}>{order.productName}</div>
                    <div style={{ fontSize: 12, color: '#8891A5', marginTop: 2 }}>Клиент: {order.clientName} · {formatDate(order.createdAt)}</div>
                  </div>
                  <div style={{ textAlign: 'right', flex: 'none' }}>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{formatPrice(order.totalCost)}</div>
                    {order.isTradeIn && <span style={{ fontSize: 11.5, color: '#E38A00', fontWeight: 600 }}>Trade-in</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
