import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { products } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { mockOrders, getNextOrderNumber, saveOrders } from '../../data/mock'
import { calculateOrder, formatPrice } from '../../utils/calculate'

type Step = 1 | 2 | 3 | 4 | 5

const field: React.CSSProperties = { width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '13px 15px', fontSize: 14.5, outline: 'none' }
const label: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }
const card: React.CSSProperties = { background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 'clamp(20px,3vw,28px)' }
const row: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13.5 }
const primaryBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 20px', fontWeight: 600, fontSize: 14 }
const ghostBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', color: '#5B647A', fontWeight: 600, fontSize: 14 }

function ProductSearchDropdown({ value, onChange }: { value: string; onChange: (name: string, price?: number) => void }) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setQuery(value) }, [value])
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return products.slice(0, 30)
    const q = query.toLowerCase()
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)).slice(0, 30)
  }, [query])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <label style={label}>Название товара</label>
      <div style={{ position: 'relative' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8891A5" strokeWidth="1.9" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" /></svg>
        <input value={query} onChange={(e) => { setQuery(e.target.value); setOpen(true); onChange(e.target.value) }} onFocus={() => setOpen(true)} className="ta-input" style={{ ...field, paddingLeft: 40, paddingRight: query ? 36 : 15 }} placeholder="Начните вводить название…" />
        {query && (
          <button onClick={() => { setQuery(''); onChange(''); setOpen(false) }} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#8891A5', cursor: 'pointer', padding: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div style={{ position: 'absolute', zIndex: 30, marginTop: 6, width: '100%', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 14, boxShadow: '0 20px 44px rgba(11,16,32,.14)', maxHeight: 280, overflowY: 'auto' }}>
          {filtered.map((p) => (
            <button key={p.id} onClick={() => { onChange(p.name, p.price); setQuery(p.name); setOpen(false) }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 14px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #F5F6FA', cursor: 'pointer' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: '#8891A5' }}>{p.brand} · {p.category}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1B44F5', flex: 'none' }}>{formatPrice(p.price)}</span>
            </button>
          ))}
        </div>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <div style={{ position: 'absolute', zIndex: 30, marginTop: 6, width: '100%', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 14, padding: 16, textAlign: 'center', fontSize: 13, color: '#8891A5' }}>Товар не найден. Можно ввести название вручную.</div>
      )}
    </div>
  )
}

function StepDots({ step }: { step: Step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
      {[1, 2, 3, 4].map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, background: s < step ? '#12B981' : s === step ? '#1B44F5' : '#F2F4FB', color: s <= step ? '#fff' : '#8891A5' }}>
            {s < step ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5 5 11-11" /></svg> : s}
          </span>
          {s < 4 && <span style={{ width: 28, height: 2, background: s < step ? '#12B981' : '#EEF0FF' }} />}
        </div>
      ))}
    </div>
  )
}

export default function NewOrderPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [copied, setCopied] = useState(false)
  const [orderType, setOrderType] = useState<'normal' | 'tradein'>('normal')
  const [productName, setProductName] = useState('')
  const [productCost, setProductCost] = useState('')
  const [oldProduct, setOldProduct] = useState('')
  const [oldValue, setOldValue] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [createdOrder, setCreatedOrder] = useState<typeof mockOrders[0] | null>(null)

  const costNum = parseInt(productCost) || 0
  const oldNum = parseInt(oldValue) || 0
  const calc = calculateOrder(costNum, orderType === 'tradein', oldNum)
  const canGoStep3 = productName.trim() && costNum > 0 && (orderType === 'normal' || (oldProduct.trim() && oldNum > 0))
  const canGoStep4 = clientName.trim() && clientPhone.trim()

  const handleCreate = () => {
    const orderNumber = getNextOrderNumber()
    const paymentId = 'pay_' + crypto.randomUUID().slice(0, 12)
    const newOrder = {
      id: crypto.randomUUID(), orderNumber, userId: user!.id, productName, productCost: costNum,
      commission: calc.commission, totalCost: calc.totalCost, isTradeIn: orderType === 'tradein',
      oldProduct: orderType === 'tradein' ? oldProduct : undefined, oldValue: orderType === 'tradein' ? oldNum : undefined,
      clientPayment: calc.clientPayment, ipPayment: calc.ipPayment, clientName, clientPhone,
      clientEmail: clientEmail || undefined, paymentId, paymentLink: `/pay/${paymentId}`,
      paymentStatus: 'PENDING' as const, status: 'CREATED' as const,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }
    mockOrders.unshift(newOrder)
    saveOrders()
    setCreatedOrder(newOrder)
    setStep(5)
  }

  const paymentUrl = createdOrder ? `${window.location.origin}/pay/${createdOrder.paymentId}` : ''
  const handleCopy = () => { navigator.clipboard.writeText(paymentUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div style={{ maxWidth: 620, margin: '0 auto' }}>
      {step < 5 && (
        <>
          <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: '0 0 16px' }}>Новый заказ</h1>
          <StepDots step={step} />
        </>
      )}

      {step === 1 && (
        <div style={card}>
          <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16.5, marginBottom: 16 }}>Выберите тип заказа</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[{ key: 'normal', title: 'Обычная покупка', desc: 'Клиент покупает новое устройство' }, { key: 'tradein', title: 'Trade-in (обмен)', desc: 'Клиент меняет старое устройство на новое' }].map((opt) => {
              const active = orderType === opt.key
              return (
                <label key={opt.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 15, borderRadius: 14, border: `1px solid ${active ? '#1B44F5' : '#E7E9F2'}`, background: active ? '#EDF0FF' : '#fff', cursor: 'pointer' }}>
                  <input type="radio" checked={active} onChange={() => setOrderType(opt.key as 'normal' | 'tradein')} style={{ marginTop: 3, accentColor: '#1B44F5' }} />
                  <div><div style={{ fontWeight: 600, fontSize: 14.5 }}>{opt.title}</div><div style={{ fontSize: 13, color: '#8891A5', marginTop: 2 }}>{opt.desc}</div></div>
                </label>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 22 }}>
            <button onClick={() => setStep(2)} className="ta-btn-primary" style={{ ...primaryBtn, boxShadow: '0 8px 18px rgba(27,68,245,.24)' }}>Далее <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={card}>
          <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16.5, marginBottom: 16 }}>Информация о товаре</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ProductSearchDropdown value={productName} onChange={(name, price) => { setProductName(name); if (price && !productCost) setProductCost(String(price)) }} />
            <div>
              <label style={label}>Стоимость товара у поставщика</label>
              <div style={{ position: 'relative' }}>
                <input type="number" value={productCost} onChange={(e) => setProductCost(e.target.value)} className="ta-input" style={field} placeholder="75000" min="0" />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#8891A5', fontSize: 13.5 }}>₽</span>
              </div>
            </div>

            {orderType === 'tradein' && (
              <>
                <div style={{ borderTop: '1px solid #EEF0F6', paddingTop: 6, fontWeight: 700, fontSize: 13.5 }}>Старое устройство (Trade-in)</div>
                <div>
                  <label style={label}>Старое устройство</label>
                  <input value={oldProduct} onChange={(e) => setOldProduct(e.target.value)} className="ta-input" style={field} placeholder="iPhone 13 128GB" />
                </div>
                <div>
                  <label style={label}>Оценка старого устройства</label>
                  <div style={{ position: 'relative' }}>
                    <input type="number" value={oldValue} onChange={(e) => setOldValue(e.target.value)} className="ta-input" style={field} placeholder="40000" min="0" />
                    <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#8891A5', fontSize: 13.5 }}>₽</span>
                  </div>
                </div>
              </>
            )}

            {costNum > 0 && (
              <div style={{ background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 14, padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Автоматический расчёт</div>
                <div style={row}><span style={{ color: '#8891A5' }}>Стоимость товара</span><span>{formatPrice(costNum)}</span></div>
                <div style={row}><span style={{ color: '#8891A5' }}>Комиссия (3%)</span><span>{formatPrice(calc.commission)}</span></div>
                <div style={{ ...row, borderTop: '1px solid #E7E9F2', fontWeight: 700 }}><span>Итого</span><span style={{ color: '#1B44F5' }}>{formatPrice(calc.totalCost)}</span></div>
                {orderType === 'tradein' && oldNum > 0 && (
                  <>
                    <div style={{ ...row, borderTop: '1px solid #E7E9F2' }}><span style={{ color: '#8891A5' }}>Старое устройство</span><span style={{ color: '#0B7A55' }}>−{formatPrice(oldNum)}</span></div>
                    <div style={{ ...row, fontWeight: 700 }}><span>Доплата клиента</span><span style={{ color: '#1B44F5' }}>{formatPrice(calc.clientPayment || 0)}</span></div>
                    <div style={{ ...row, color: '#8891A5' }}><span>Партнёр доплачивает</span><span>{formatPrice(calc.ipPayment || 0)}</span></div>
                  </>
                )}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
            <button onClick={() => setStep(1)} style={ghostBtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Назад</button>
            <button onClick={() => setStep(3)} disabled={!canGoStep3} className="ta-btn-primary" style={{ ...primaryBtn, boxShadow: '0 8px 18px rgba(27,68,245,.24)', opacity: canGoStep3 ? 1 : 0.5 }}>Далее <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={card}>
          <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16.5, marginBottom: 16 }}>Данные клиента</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><label style={label}>Имя клиента</label><input value={clientName} onChange={(e) => setClientName(e.target.value)} className="ta-input" style={field} placeholder="Пётр" /></div>
            <div><label style={label}>Телефон клиента</label><input type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="ta-input" style={field} placeholder="+7 999 555-12-34" /></div>
            <div><label style={label}>Email клиента <span style={{ color: '#AEB4C4', fontWeight: 500 }}>(опционально)</span></label><input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="ta-input" style={field} placeholder="email@example.com" /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
            <button onClick={() => setStep(2)} style={ghostBtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Назад</button>
            <button onClick={() => setStep(4)} disabled={!canGoStep4} className="ta-btn-primary" style={{ ...primaryBtn, boxShadow: '0 8px 18px rgba(27,68,245,.24)', opacity: canGoStep4 ? 1 : 0.5 }}>Далее <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={card}>
          <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16.5, marginBottom: 16 }}>Подтверждение заказа</div>
          <div style={{ background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 14, padding: 16, marginBottom: 14 }}>
            <div style={row}><span style={{ color: '#8891A5' }}>Товар</span><span style={{ fontWeight: 600 }}>{productName}</span></div>
            <div style={row}><span style={{ color: '#8891A5' }}>Стоимость</span><span>{formatPrice(costNum)}</span></div>
            <div style={row}><span style={{ color: '#8891A5' }}>Комиссия (3%)</span><span>{formatPrice(calc.commission)}</span></div>
            <div style={{ ...row, borderTop: '1px solid #E7E9F2', fontWeight: 700 }}><span>Итого</span><span style={{ color: '#1B44F5' }}>{formatPrice(calc.totalCost)}</span></div>
            {orderType === 'tradein' && oldNum > 0 && (
              <>
                <div style={{ ...row, borderTop: '1px solid #E7E9F2' }}><span style={{ color: '#8891A5' }}>Trade-in: {oldProduct}</span><span style={{ color: '#0B7A55' }}>−{formatPrice(oldNum)}</span></div>
                <div style={{ ...row, fontWeight: 700 }}><span>Доплата клиента</span><span style={{ color: '#1B44F5' }}>{formatPrice(calc.clientPayment || 0)}</span></div>
              </>
            )}
          </div>
          <div style={{ background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 14, padding: 16 }}>
            <div style={row}><span style={{ color: '#8891A5' }}>Клиент</span><span>{clientName}</span></div>
            <div style={row}><span style={{ color: '#8891A5' }}>Телефон</span><span>{clientPhone}</span></div>
            {clientEmail && <div style={row}><span style={{ color: '#8891A5' }}>Email</span><span>{clientEmail}</span></div>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
            <button onClick={() => setStep(3)} style={ghostBtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Назад</button>
            <button onClick={handleCreate} className="ta-btn-primary" style={{ ...primaryBtn, background: '#12B981', boxShadow: '0 8px 18px rgba(18,185,129,.24)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12.5l5 5 11-11" /></svg>Создать заказ</button>
          </div>
        </div>
      )}

      {step === 5 && createdOrder && (
        <div style={{ ...card, textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: '#E4F8F0', display: 'grid', placeItems: 'center' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#12B981" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5 11-11" /></svg></div>
          <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 21, marginBottom: 6 }}>Заказ {createdOrder.orderNumber} создан!</div>
          <div style={{ fontSize: 14, color: '#8891A5', marginBottom: 20 }}>Отправьте ссылку клиенту для оплаты</div>

          <div style={{ background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 13, padding: 14, marginBottom: 14, fontSize: 12.5, color: '#5B647A', wordBreak: 'break-all' }}>{paymentUrl}</div>
          <button onClick={handleCopy} className="ta-btn-primary" style={{ ...primaryBtn, boxShadow: '0 8px 18px rgba(27,68,245,.24)', marginBottom: 22 }}>{copied ? 'Скопировано!' : 'Копировать ссылку'}</button>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 16, padding: 14 }}><QRCodeSVG value={paymentUrl} size={140} /></div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 22 }}>К оплате: <span style={{ color: '#1B44F5' }}>{formatPrice(createdOrder.isTradeIn ? (createdOrder.clientPayment || 0) : createdOrder.totalCost)}</span></div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            <button onClick={() => navigate('/dashboard/orders')} className="ta-outline" style={{ background: '#fff', color: '#0B1020', border: '1px solid #E7E9F2', borderRadius: 12, padding: '12px 20px', fontWeight: 600, fontSize: 14 }}>К списку заказов</button>
            <button onClick={() => { setStep(1); setProductName(''); setProductCost(''); setOldProduct(''); setOldValue(''); setClientName(''); setClientPhone(''); setClientEmail(''); setCreatedOrder(null); setOrderType('normal') }} className="ta-btn-primary" style={{ ...primaryBtn, boxShadow: '0 8px 18px rgba(27,68,245,.24)' }}>Создать ещё один</button>
          </div>
        </div>
      )}
    </div>
  )
}
