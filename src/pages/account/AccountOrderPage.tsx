import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, ExternalLink, FileText, MapPin, MessageCircle, QrCode } from 'lucide-react'
import { api, apiErrorText, type SiteOrder, type SiteOrderStatus } from '../../lib/api'
import { formatPrice, formatDateTime } from '../../utils/calculate'
import { PageBar, StickyBar } from '../../components/app/ui'
import StatusMark from '../../components/app/StatusMark'
import { RequireBuyer, OrderThumb, DemoBanner } from './AccountPage'
import { useAccount } from '../../utils/account'
import { SITE_STATUS_LABEL, SITE_STATUS_COLOR, stepTime } from '../../utils/siteOrderStatus'
import { products } from '../../data/products'
import ProductThumb from '../../components/catalog/ProductThumb'
import { SUPPORT_EMAIL, DELIVERY_TERM } from '../../seo/site'

const SUPPORT_BOT = 'https://t.me/techagent_support_bot'

/** Шаги на экране заказа: что уже было и что впереди */
const TIMELINE: { status: SiteOrderStatus; title: string; hint?: string }[] = [
  { status: 'NEW', title: 'Оформлен', hint: 'Проверяем наличие' },
  { status: 'AWAITING_PAYMENT', title: 'Наличие подтверждено', hint: 'Можно оплатить через СБП' },
  { status: 'PAID', title: 'Оплачен' },
  { status: 'SHIPPED', title: 'Едет в пункт СДЭК', hint: DELIVERY_TERM },
  { status: 'READY', title: 'Можно забирать', hint: 'Возьмите документ или код из СМС СДЭК' },
  { status: 'RECEIVED', title: 'Получен' },
]
const ORDER = TIMELINE.map((t) => t.status)

export default function AccountOrderPage() {
  return (
    <RequireBuyer>
      <OrderScreen />
    </RequireBuyer>
  )
}

function OrderScreen() {
  const { number = '' } = useParams()
  const [order, setOrder] = useState<SiteOrder | null>(null)
  const [error, setError] = useState('')
  const demo = Boolean(useAccount().buyer?.demo)

  useEffect(() => {
    api<{ order: SiteOrder }>(`/my/orders/${encodeURIComponent(number)}`)
      .then((r) => setOrder(r.order))
      .catch((e) => setError(apiErrorText(e)))
  }, [number])

  if (error) {
    return (
      <div className="acc-narrow">
        <PageBar back="/account" backLabel="Мои заказы" title="Заказ" />
        <p className="acc-warn">{error}</p>
      </div>
    )
  }
  if (!order) return <div className="min-h-[50vh]" aria-busy="true" />

  const cancelled = order.status === 'CANCELLED'
  const cur = ORDER.indexOf(order.status)
  const pay = order.status === 'AWAITING_PAYMENT' && order.paymentUrl && !demo

  return (
    <div className="acc-wide">
      <DemoBanner />
      <PageBar
        back="/account"
        backLabel="Мои заказы"
        title={`Заказ ${order.number}`}
        extra={<StatusMark color={SITE_STATUS_COLOR[order.status]}>{SITE_STATUS_LABEL[order.status]}</StatusMark>}
      />

      <div className="acc-cols">
        <div className="flex flex-col gap-3 min-w-0">
          {cancelled ? (
            <div className="acc-card">
              <StatusMark color={SITE_STATUS_COLOR.CANCELLED}>Заказ отменён</StatusMark>
              {order.cancelReason && <p className="text-[14.5px] text-text-secondary mt-3 mb-0">{order.cancelReason}</p>}
              <p className="text-[13.5px] text-text-muted mt-2 mb-0">Если заказ был оплачен, деньги вернутся тем же способом в течение 10 дней.</p>
            </div>
          ) : (
            <ol className="acc-steps">
              {TIMELINE.map((t, i) => {
                const state = i < cur || order.status === 'RECEIVED' ? 'done' : i === cur ? 'now' : 'todo'
                const at = stepTime(order, t.status)
                const note = t.status === 'SHIPPED' && order.trackNumber ? `Трек-номер ${order.trackNumber}` : t.hint
                return (
                  <li key={t.status} className={`acc-step acc-step-${state}`}>
                    <span className="acc-dot">{state === 'done' && <Check size={14} strokeWidth={3} />}</span>
                    <span className="min-w-0">
                      <b>{t.title}</b>
                      {(at || state !== 'todo') && (
                        <span>{[at && state !== 'todo' ? formatDateTime(at) : '', state === 'now' || t.status === 'SHIPPED' ? note : ''].filter(Boolean).join(' · ')}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ol>
          )}

          {order.trackNumber && !cancelled && (
            <a
              href={`https://www.cdek.ru/ru/tracking?order_id=${encodeURIComponent(order.trackNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="acc-card acc-card-link"
            >
              <span className="min-w-0 flex-1">
                <span className="acc-k">Отследить на сайте СДЭК</span>
                <b className="acc-v">{order.trackNumber}</b>
              </span>
              <ExternalLink size={18} className="text-text-muted flex-none" />
            </a>
          )}

          <div className="app-group">
            <div className="app-kv">
              <div className="app-kv-text">
                <span className="app-kv-label">Пункт СДЭК</span>
                <span className="app-kv-value">{order.city}, {order.sdekPoint}</span>
              </div>
              <MapPin size={20} className="text-text-muted flex-none" />
            </div>
            <div className="app-kv">
              <div className="app-kv-text">
                <span className="app-kv-label">Получатель</span>
                <span className="app-kv-value">{order.buyerName} · {order.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <div className="acc-card">
            <ul className="co-items co-items-flat" aria-label="Состав заказа">
              {order.items.map((i) => {
                const p = products.find((x) => x.id === i.productId)
                return (
                  <li key={i.productId}>
                    {p ? <ProductThumb product={p} size={48} /> : <OrderThumb order={order} size={48} />}
                    <span className="co-items-name">{i.name}{i.qty > 1 && <b> × {i.qty}</b>}</span>
                    <span className="co-items-sum">{formatPrice(i.price * i.qty)}</span>
                  </li>
                )
              })}
            </ul>
            <div className="cart-sum-row mt-1"><span>Доставка в пункт СДЭК</span><span className="text-text-primary font-semibold">{formatPrice(order.delivery)}</span></div>
            <div className="cart-sum-total"><span>Итого</span><span>{formatPrice(order.total)}</span></div>
            {pay && (
              <a href={order.paymentUrl} target="_blank" rel="noopener noreferrer" className="app-btn app-btn-primary mt-4 max-lg:hidden">
                <QrCode size={20} /> Оплатить через СБП
              </a>
            )}
          </div>

          <div className="app-group">
            <Link to="/legal/sale-offer" className="app-kv no-underline text-inherit">
              <div className="app-kv-text">
                <span className="app-kv-label">Документ</span>
                <span className="app-kv-value">Оферта купли-продажи</span>
              </div>
              <FileText size={19} className="text-text-muted flex-none" />
            </Link>
            <Link to="/legal/payment" className="app-kv no-underline text-inherit">
              <div className="app-kv-text">
                <span className="app-kv-label">Документ</span>
                <span className="app-kv-value">Условия оплаты и возврата</span>
              </div>
              <FileText size={19} className="text-text-muted flex-none" />
            </Link>
          </div>

          <div className="acc-help">
            Вопрос по заказу —{' '}
            <a href={SUPPORT_BOT} target="_blank" rel="noopener noreferrer">в Telegram</a> или{' '}
            <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Заказ ' + order.number)}`}>{SUPPORT_EMAIL}</a>
          </div>
        </div>
      </div>

      <StickyBar>
        {pay ? (
          <a href={order.paymentUrl} target="_blank" rel="noopener noreferrer" className="app-btn app-btn-primary">
            <QrCode size={20} /> Оплатить {formatPrice(order.total)}
          </a>
        ) : (
          <a href={SUPPORT_BOT} target="_blank" rel="noopener noreferrer" className="app-btn app-btn-soft">
            <MessageCircle size={20} /> Вопрос по заказу
          </a>
        )}
      </StickyBar>
    </div>
  )
}
