import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mockOrders } from '../../data/mock'
import { formatPrice, formatDateTime } from '../../utils/calculate'
import { ORDER_TRACK_STEPS, STATUS_META, Icon } from '../../lib/techagent'
import { PAYMENT_STATUS_LABELS } from '../../utils/status'

const card: React.CSSProperties = { background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 22 }
const row: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 14 }

export default function OrderDetailPage() {
  const { id } = useParams()
  const [copied, setCopied] = useState(false)
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ color: '#8891A5', marginBottom: 14 }}>Заказ не найден</p>
        <Link to="/dashboard/orders" style={{ color: '#1B44F5', fontWeight: 600, textDecoration: 'none' }}>Вернуться к списку</Link>
      </div>
    )
  }

  const currentStepIndex = ORDER_TRACK_STEPS.indexOf(order.status)
  const paymentUrl = `${window.location.origin}/pay/${order.paymentId}`
  const meta = STATUS_META[order.status]

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Link to="/dashboard/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#8891A5', fontSize: 13.5, textDecoration: 'none', marginBottom: 16 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Назад к списку
      </Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.3rem,2.6vw,1.7rem)', letterSpacing: '-.02em', margin: 0 }}>Заказ {order.orderNumber}</h1>
        <span style={{ font: "600 11.5px/1 sans-serif", padding: '6px 10px', borderRadius: 999, color: meta.color, background: meta.bg }}>{meta.label}</span>
        {order.isTradeIn && <span style={{ font: "600 11.5px/1 sans-serif", padding: '6px 10px', borderRadius: 999, color: '#B5680A', background: '#FFF3E0' }}>Trade-in</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }} className="ta-order-main">
          <div style={card}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 14 }}>Товар</div>
            <div style={row}><span style={{ color: '#8891A5' }}>Название</span><span style={{ fontWeight: 500 }}>{order.productName}</span></div>
            <div style={row}><span style={{ color: '#8891A5' }}>Стоимость</span><span>{formatPrice(order.productCost)}</span></div>
            <div style={row}><span style={{ color: '#8891A5' }}>Комиссия (3%)</span><span>{formatPrice(order.commission)}</span></div>
            <div style={{ ...row, borderTop: '1px solid #EEF0F6', fontWeight: 700 }}><span>Итого</span><span style={{ color: '#1B44F5' }}>{formatPrice(order.totalCost)}</span></div>

            {order.isTradeIn && (
              <div style={{ marginTop: 14, padding: 16, background: '#FFF3E0', border: '1px solid #FFE1B3', borderRadius: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>Trade-in</div>
                <div style={row}><span style={{ color: '#8891A5' }}>Старое устройство</span><span>{order.oldProduct}</span></div>
                <div style={row}><span style={{ color: '#8891A5' }}>Оценка</span><span>{formatPrice(order.oldValue || 0)}</span></div>
                <div style={{ ...row, borderTop: '1px solid #FFE1B3', fontWeight: 700 }}><span>Доплата клиента</span><span>{formatPrice(order.clientPayment || 0)}</span></div>
                <div style={{ ...row, color: '#8891A5' }}><span>Партнёр доплачивает</span><span>{formatPrice(order.ipPayment || 0)}</span></div>
              </div>
            )}
          </div>

          <div style={card}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 14 }}>Клиент</div>
            <div style={row}><span style={{ color: '#8891A5' }}>Имя</span><span>{order.clientName}</span></div>
            <div style={row}><span style={{ color: '#8891A5' }}>Телефон</span><span>{order.clientPhone}</span></div>
            {order.clientEmail && <div style={row}><span style={{ color: '#8891A5' }}>Email</span><span>{order.clientEmail}</span></div>}
          </div>

          <div style={card}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 16 }}>Этапы</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ORDER_TRACK_STEPS.map((step, i) => {
                const isDone = i <= currentStepIndex
                const isCurrent = i === currentStepIndex
                return (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 24, height: 24, flex: 'none', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, background: isDone ? '#12B981' : '#F2F4FB', color: isDone ? '#fff' : '#8891A5' }}>
                      {isDone ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5 5 11-11" /></svg> : i + 1}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#0B1020' : isDone ? '#3A4256' : '#8891A5' }}>{STATUS_META[step].label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          <div style={card}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 14 }}>Оплата</div>
            <div style={row}><span style={{ color: '#8891A5' }}>Статус</span><span style={{ fontWeight: 600 }}>{PAYMENT_STATUS_LABELS[order.paymentStatus]}</span></div>
            {order.paidAt && <div style={row}><span style={{ color: '#8891A5' }}>Дата</span><span>{formatDateTime(order.paidAt)}</span></div>}
            <div style={row}><span style={{ color: '#8891A5' }}>Сумма</span><span style={{ fontWeight: 700 }}>{formatPrice(order.isTradeIn ? (order.clientPayment || 0) : order.totalCost)}</span></div>
          </div>

          <div style={card}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 14 }}>Ссылка для оплаты</div>
            <div style={{ background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 11, padding: 11, fontSize: 12, color: '#5B647A', wordBreak: 'break-all', marginBottom: 12 }}>{paymentUrl}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleCopy} className="ta-btn-primary" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '10px', fontWeight: 600, fontSize: 13.5 }}>
                {copied ? <Icon name="shield" size={14} /> : null}{copied ? 'Скопировано' : 'Копировать'}
              </button>
              <Link to={`/pay/${order.paymentId}`} target="_blank" rel="noopener noreferrer" className="ta-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#F2F4FB', border: '1px solid #E7E9F2', borderRadius: 11, padding: '10px 13px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3A4256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
              </Link>
            </div>
          </div>

          <div style={card}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 14 }}>Даты</div>
            <div style={row}><span style={{ color: '#8891A5' }}>Создан</span><span>{formatDateTime(order.createdAt)}</span></div>
            <div style={row}><span style={{ color: '#8891A5' }}>Обновлён</span><span>{formatDateTime(order.updatedAt)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
