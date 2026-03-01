import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Copy, Search, X } from 'lucide-react'
import { products } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { mockOrders, getNextOrderNumber, saveOrders } from '../../data/mock'
import { calculateOrder, formatPrice } from '../../utils/calculate'
import { QRCodeSVG } from 'qrcode.react'

type Step = 1 | 2 | 3 | 4 | 5

function ProductSearchDropdown({ value, onChange }: { value: string; onChange: (name: string, price?: number) => void }) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setQuery(value) }, [value])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return products.slice(0, 30)
    const q = query.toLowerCase()
    return products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)).slice(0, 30)
  }, [query])

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium mb-1.5 text-text-secondary">Название товара</label>
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); onChange(e.target.value) }}
          onFocus={() => setOpen(true)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
          placeholder="Начните вводить название..."
        />
        {query && (
          <button onClick={() => { setQuery(''); onChange(''); setOpen(false) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer p-0">
            <X size={16} />
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-xl max-h-64 overflow-y-auto">
          {filtered.map(p => (
            <button
              key={p.id}
              onClick={() => { onChange(p.name, p.price); setQuery(p.name); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bg-section transition-colors bg-transparent border-none cursor-pointer border-b border-border last:border-b-0"
            >
              <span className="text-xl shrink-0">{p.image}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">{p.name}</div>
                <div className="text-xs text-text-muted">{p.brand} · {p.category}</div>
              </div>
              <span className="text-sm font-semibold text-primary shrink-0">{p.price.toLocaleString('ru-RU')} ₽</span>
            </button>
          ))}
        </div>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-xl p-4 text-center text-sm text-text-muted">
          Товар не найден. Вы можете ввести название вручную.
        </div>
      )}
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
      id: crypto.randomUUID(),
      orderNumber,
      userId: user!.id,
      productName,
      productCost: costNum,
      commission: calc.commission,
      totalCost: calc.totalCost,
      isTradeIn: orderType === 'tradein',
      oldProduct: orderType === 'tradein' ? oldProduct : undefined,
      oldValue: orderType === 'tradein' ? oldNum : undefined,
      clientPayment: calc.clientPayment,
      ipPayment: calc.ipPayment,
      clientName,
      clientPhone,
      clientEmail: clientEmail || undefined,
      paymentId,
      paymentLink: `/pay/${paymentId}`,
      paymentStatus: 'PENDING' as const,
      status: 'CREATED' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockOrders.unshift(newOrder)
    saveOrders()
    setCreatedOrder(newOrder)
    setStep(5)
  }

  const paymentUrl = createdOrder ? `${window.location.origin}/pay/${createdOrder.paymentId}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {step < 5 && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-3 text-text-primary">Новый заказ</h1>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    s < step ? 'bg-success text-white' : s === step ? 'bg-primary text-white' : 'bg-bg-light text-text-muted'
                  }`}
                >
                  {s < step ? <Check size={14} /> : s}
                </div>
                {s < 4 && <div className={`w-8 h-0.5 ${s < step ? 'bg-success' : 'bg-bg-light'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Order type */}
      {step === 1 && (
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4 text-text-primary">Выберите тип заказа</h2>
          <div className="space-y-3">
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                orderType === 'normal' ? 'border-primary bg-primary/5' : 'border-border hover:bg-bg-light'
              }`}
            >
              <input
                type="radio"
                name="orderType"
                checked={orderType === 'normal'}
                onChange={() => setOrderType('normal')}
                className="mt-1 accent-primary"
              />
              <div>
                <p className="font-semibold text-text-primary">Обычная покупка</p>
                <p className="text-text-secondary text-sm">Клиент покупает новое устройство</p>
              </div>
            </label>
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                orderType === 'tradein' ? 'border-primary bg-primary/5' : 'border-border hover:bg-bg-light'
              }`}
            >
              <input
                type="radio"
                name="orderType"
                checked={orderType === 'tradein'}
                onChange={() => setOrderType('tradein')}
                className="mt-1 accent-primary"
              />
              <div>
                <p className="font-semibold text-text-primary">Trade-in (обмен)</p>
                <p className="text-text-secondary text-sm">Клиент меняет старое устройство на новое</p>
              </div>
            </label>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm border-none cursor-pointer"
            >
              Далее <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Product info */}
      {step === 2 && (
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4 text-text-primary">Информация о товаре</h2>
          <div className="space-y-4">
            <ProductSearchDropdown
              value={productName}
              onChange={(name, price) => {
                setProductName(name)
                if (price && !productCost) setProductCost(String(price))
              }}
            />
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text-secondary">Стоимость товара у поставщика</label>
              <div className="relative">
                <input
                  type="number"
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                  placeholder="75000"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">{'\u20BD'}</span>
              </div>
            </div>

            {orderType === 'tradein' && (
              <>
                <div className="border-t border-border pt-4">
                  <h3 className="font-bold text-sm mb-3 text-text-primary">Старое устройство (Trade-in)</h3>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">Старое устройство</label>
                  <input
                    type="text"
                    value={oldProduct}
                    onChange={(e) => setOldProduct(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    placeholder="iPhone 13 128GB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-secondary">Оценка старого устройства</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={oldValue}
                      onChange={(e) => setOldValue(e.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      placeholder="40000"
                      min="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">{'\u20BD'}</span>
                  </div>
                </div>
              </>
            )}

            {/* Auto calculation */}
            {costNum > 0 && (
              <div className="card-soft rounded-lg p-4">
                <h3 className="font-bold text-sm mb-2 text-text-primary">Автоматический расчет</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Стоимость товара</span>
                    <span className="text-text-primary">{formatPrice(costNum)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Комиссия (3%)</span>
                    <span className="text-text-primary">{formatPrice(calc.commission)}</span>
                  </div>
                  <div className="border-t border-border pt-1.5 flex justify-between font-bold">
                    <span className="text-text-primary">Итого</span>
                    <span className="text-primary">{formatPrice(calc.totalCost)}</span>
                  </div>
                  {orderType === 'tradein' && oldNum > 0 && (
                    <>
                      <div className="border-t border-border pt-1.5 flex justify-between">
                        <span className="text-text-secondary">Старое устройство</span>
                        <span className="text-success">-{formatPrice(oldNum)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-text-primary">Доплата клиента</span>
                        <span className="text-primary">{formatPrice(calc.clientPayment || 0)}</span>
                      </div>
                      <div className="flex justify-between text-text-muted">
                        <span>Партнёр доплачивает</span>
                        <span>{formatPrice(calc.ipPayment || 0)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft size={16} /> Назад
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!canGoStep3}
              className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm border-none cursor-pointer disabled:opacity-50 disabled:shadow-none"
            >
              Далее <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Client info */}
      {step === 3 && (
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4 text-text-primary">Данные клиента</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text-secondary">Имя клиента</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                placeholder="Петр"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text-secondary">Телефон клиента</label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                placeholder="+7 999 555-12-34"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text-secondary">Email клиента <span className="text-text-muted">(опционально)</span></label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft size={16} /> Назад
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!canGoStep4}
              className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm border-none cursor-pointer disabled:opacity-50 disabled:shadow-none"
            >
              Далее <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4 text-text-primary">Подтверждение заказа</h2>
          <div className="space-y-4">
            <div className="card-soft rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Товар</span>
                <span className="font-medium text-text-primary">{productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Стоимость</span>
                <span className="text-text-primary">{formatPrice(costNum)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Комиссия (3%)</span>
                <span className="text-text-primary">{formatPrice(calc.commission)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span className="text-text-primary">Итого</span>
                <span className="text-primary">{formatPrice(calc.totalCost)}</span>
              </div>
              {orderType === 'tradein' && oldNum > 0 && (
                <>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Trade-in: {oldProduct}</span>
                      <span className="text-success">-{formatPrice(oldNum)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-1">
                      <span className="text-text-primary">Доплата клиента</span>
                      <span className="text-primary">{formatPrice(calc.clientPayment || 0)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="card-soft rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Клиент</span>
                <span className="text-text-primary">{clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Телефон</span>
                <span className="text-text-primary">{clientPhone}</span>
              </div>
              {clientEmail && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Email</span>
                  <span className="text-text-primary">{clientEmail}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-medium bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft size={16} /> Назад
            </button>
            <button
              onClick={handleCreate}
              className="flex items-center gap-1 bg-success hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm border-none cursor-pointer"
            >
              <Check size={16} /> Создать заказ
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 5 && createdOrder && (
        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-1 text-text-primary">Заказ {createdOrder.orderNumber} создан!</h2>
          <p className="text-text-secondary mb-6">Отправьте ссылку клиенту для оплаты</p>

          <div className="card-soft rounded-lg p-4 mb-4">
            <p className="text-xs text-text-muted mb-2">Ссылка для оплаты:</p>
            <p className="text-sm font-medium break-all text-text-primary">{paymentUrl}</p>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 text-sm border-none cursor-pointer mb-6"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Скопировано!' : 'Копировать ссылку'}
          </button>

          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-xl p-4">
              <QRCodeSVG value={paymentUrl} size={160} />
            </div>
          </div>

          <p className="text-lg font-bold mb-6 text-text-primary">
            К оплате: <span className="text-primary">{formatPrice(createdOrder.isTradeIn ? (createdOrder.clientPayment || 0) : createdOrder.totalCost)}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-bg-light transition-colors bg-transparent text-text-primary cursor-pointer"
            >
              К списку заказов
            </button>
            <button
              onClick={() => {
                setStep(1)
                setProductName('')
                setProductCost('')
                setOldProduct('')
                setOldValue('')
                setClientName('')
                setClientPhone('')
                setClientEmail('')
                setCreatedOrder(null)
                setOrderType('normal')
              }}
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 border-none cursor-pointer"
            >
              Создать еще один
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
