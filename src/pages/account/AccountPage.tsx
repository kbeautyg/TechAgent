import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ChevronRight, QrCode, Settings, ShoppingBag } from 'lucide-react'
import { api, apiErrorText, type SiteOrder } from '../../lib/api'
import { useAccount, logoutAccount } from '../../utils/account'
import { formatPrice, formatDate } from '../../utils/calculate'
import { products } from '../../data/products'
import ProductThumb from '../../components/catalog/ProductThumb'
import StatusMark from '../../components/app/StatusMark'
import {
  SITE_STATUS_LABEL, SITE_STATUS_COLOR, PROGRESS_STEPS, progressOf, isActive, itemsTitle, itemsMore, stepTime,
} from '../../utils/siteOrderStatus'

/** Пускает в кабинет только вошедшего покупателя; пока сервер отвечает — пустой экран без мигания */
export function RequireBuyer({ children }: { children: ReactNode }) {
  const account = useAccount()
  if (!account.loaded) return <div className="min-h-[50vh]" aria-busy="true" />
  if (account.role !== 'buyer') return <Navigate to="/login/buyer" replace />
  return <>{children}</>
}

/** Плашка демо-кабинета: это примеры, оплаты нет, можно выйти */
export function DemoBanner() {
  const { buyer } = useAccount()
  const navigate = useNavigate()
  if (!buyer?.demo) return null
  return (
    <div className="acc-demo">
      <span>Демо-кабинет: примеры заказов, оплата и изменения не работают.</span>
      <button type="button" onClick={async () => { await logoutAccount(); navigate('/login/buyer', { replace: true }) }}>Выйти из демо</button>
    </div>
  )
}

export function OrderThumb({ order, size }: { order: SiteOrder; size: number }) {
  const p = products.find((x) => x.id === order.items[0]?.productId)
  if (p) return <ProductThumb product={p} size={size} />
  return <div className="rounded-2xl bg-bg-light flex-none" style={{ width: size, height: size }} />
}

function useMyOrders() {
  const [orders, setOrders] = useState<SiteOrder[] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    api<{ orders: SiteOrder[] }>('/my/orders').then((r) => setOrders(r.orders)).catch((e) => setError(apiErrorText(e)))
  }, [])
  return { orders, error }
}

export function ProgressBar({ order }: { order: SiteOrder }) {
  const { done, now } = progressOf(order.status)
  const color = SITE_STATUS_COLOR[order.status]
  return (
    <div>
      <div className="acc-bar" aria-hidden="true">
        {PROGRESS_STEPS.map((s, i) => (
          <i key={s.status} className={i < done && i !== now ? 'done' : ''} style={i === now ? { background: color } : undefined} />
        ))}
      </div>
      <div className="acc-bar-l" aria-hidden="true">
        {PROGRESS_STEPS.map((s) => <span key={s.status}>{s.label}</span>)}
      </div>
    </div>
  )
}

function ActiveOrder({ order }: { order: SiteOrder }) {
  const demo = Boolean(useAccount().buyer?.demo)
  return (
    <div className="acc-order">
      <Link to={`/account/orders/${order.number}`} className="acc-order-top">
        <OrderThumb order={order} size={56} />
        <span className="min-w-0 flex-1">
          <b>{order.items[0]?.name ?? 'Заказ'}</b>
          <span>Заказ {order.number}{itemsMore(order) && ` · ${itemsMore(order)}`}</span>
        </span>
        <span className="acc-order-sum">{formatPrice(order.total)}</span>
      </Link>
      <div className="mt-3.5 mb-1">
        <StatusMark color={SITE_STATUS_COLOR[order.status]}>{SITE_STATUS_LABEL[order.status]}</StatusMark>
      </div>
      <ProgressBar order={order} />
      {order.status === 'AWAITING_PAYMENT' && order.paymentUrl && demo ? (
        <button type="button" disabled className="app-btn app-btn-primary mt-4">
          <QrCode size={20} /> Оплатить {formatPrice(order.total)}
        </button>
      ) : order.status === 'AWAITING_PAYMENT' && order.paymentUrl ? (
        <a href={order.paymentUrl} target="_blank" rel="noopener noreferrer" className="app-btn app-btn-primary mt-4">
          <QrCode size={20} /> Оплатить {formatPrice(order.total)}
        </a>
      ) : (
        <Link to={`/account/orders/${order.number}`} className="app-btn app-btn-soft mt-4">Подробнее о заказе</Link>
      )}
    </div>
  )
}

export default function AccountPage() {
  return (
    <RequireBuyer>
      <AccountHome />
    </RequireBuyer>
  )
}

function AccountHome() {
  const { buyer } = useAccount()
  const { orders, error } = useMyOrders()
  const initials = (buyer?.name || buyer?.email || '?').split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('')
  const active = orders?.filter(isActive) ?? []
  const past = orders?.filter((o) => !isActive(o)) ?? []

  return (
    <div className="acc-wide">
      <DemoBanner />
      <div className="acc-hello">
        <span className="acc-avatar">{initials}</span>
        <span className="min-w-0 flex-1">
          <b>{buyer?.name || 'Мои заказы'}</b>
          <span>{buyer?.email}</span>
        </span>
        <Link to="/account/profile" className="app-round" aria-label="Профиль">
          <Settings size={21} />
        </Link>
      </div>

      {error && <p className="acc-warn">{error}</p>}
      {!orders && !error && <div className="min-h-[30vh]" aria-busy="true" />}

      {orders && orders.length === 0 && (
        <div className="cart-empty">
          <ShoppingBag size={44} strokeWidth={1.5} className="text-text-light" />
          <h2 className="h-sans text-[20px] font-bold text-text-primary m-0">Заказов пока нет</h2>
          <Link to="/catalog" className="app-btn app-btn-primary max-w-[320px] mt-2">Перейти в каталог</Link>
        </div>
      )}

      {active.length > 0 && (
        <div className="acc-active">
          {active.map((o) => <ActiveOrder key={o.number} order={o} />)}
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2 className="app-group-title mt-6">Ранее</h2>
          <div className="app-list">
            {past.map((o) => (
              <Link key={o.number} to={`/account/orders/${o.number}`} className="app-row">
                <OrderThumb order={o} size={44} />
                <span className="app-row-mid">
                  <span className="app-row-title">{itemsTitle(o)}</span>
                  <span className="app-row-sub">
                    {o.status === 'RECEIVED'
                      ? `Получен ${formatDate(stepTime(o, 'RECEIVED') ?? o.updatedAt)} · ${o.city}`
                      : `Отменён ${formatDate(stepTime(o, 'CANCELLED') ?? o.updatedAt)}`}
                  </span>
                </span>
                <span className="app-row-right">
                  <span className="app-row-sum">{formatPrice(o.total)}</span>
                </span>
                <ChevronRight size={18} className="text-text-muted flex-none" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
