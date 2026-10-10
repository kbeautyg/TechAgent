import { useCallback, useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ChevronRight, ExternalLink, LogOut } from 'lucide-react'
import { api, apiErrorText, type SiteOrder, type SiteOrderStatus } from '../../lib/api'
import { logoutAccount, refreshAccount, useAccount } from '../../utils/account'
import { formatPrice, formatDateTime } from '../../utils/calculate'
import { PageBar } from '../../components/app/ui'
import StatusMark from '../../components/app/StatusMark'
import { SITE_STATUS_COLOR, SITE_STATUS_LABEL, STAFF_TODO, itemsTitle } from '../../utils/siteOrderStatus'
import { copyText } from '../../utils/clipboard'

/*
 * Раздел сотрудников ТехЭйджент: заказы покупателей с сайта.
 * Сотрудник ведёт заказ по этапам; на каждом этапе покупателю уходит письмо, а в его кабинете меняется статус.
 */

const fieldCls =
  'w-full h-[50px] px-4 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none text-base'

function RequireStaff({ children }: { children: ReactNode }) {
  const account = useAccount()
  if (!account.loaded) return <div className="min-h-[50vh]" aria-busy="true" />
  if (account.role !== 'staff') return <Navigate to="/staff/login" replace />
  return <>{children}</>
}

export function StaffLoginPage() {
  const account = useAccount()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  if (account.role === 'staff') return <Navigate to="/staff" replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api('/auth/staff', { password })
      await refreshAccount()
      navigate('/staff', { replace: true })
    } catch (x) {
      setError(apiErrorText(x))
      setBusy(false)
    }
  }

  return (
    <div className="acc-narrow">
      <h1 className="acc-h1">Заказы с сайта</h1>
      <p className="acc-lead">Вход для сотрудников ТехЭйджент.</p>
      <form onSubmit={submit} className="acc-card space-y-4">
        <div>
          <label htmlFor="st-pass" className="block text-sm font-semibold mb-2 ml-1 text-text-secondary">Пароль</label>
          <input id="st-pass" type="password" autoComplete="current-password" value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }} className={fieldCls} autoFocus />
        </div>
        {error && <p className="text-red-600 text-[13.5px] m-0 ml-1">{error}</p>}
        <button type="submit" disabled={busy || !password} className="app-btn app-btn-primary">{busy ? 'Входим…' : 'Войти'}</button>
      </form>
    </div>
  )
}

const FILTERS: { key: SiteOrderStatus | ''; label: string }[] = [
  { key: '', label: 'Все' },
  { key: 'NEW', label: 'Новые' },
  { key: 'AWAITING_PAYMENT', label: 'Ждут оплаты' },
  { key: 'PAID', label: 'Оплачены' },
  { key: 'SHIPPED', label: 'В пути' },
  { key: 'READY', label: 'В пункте' },
  { key: 'RECEIVED', label: 'Получены' },
  { key: 'CANCELLED', label: 'Отменены' },
]

export function StaffOrdersPage() {
  return (
    <RequireStaff>
      <StaffOrders />
    </RequireStaff>
  )
}

function StaffOrders() {
  const [params, setParams] = useSearchParams()
  const status = (params.get('status') ?? '') as SiteOrderStatus | ''
  const [data, setData] = useState<{ orders: SiteOrder[]; counts: Record<string, number> } | null>(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api<{ orders: SiteOrder[]; counts: Record<string, number> }>(`/staff/orders${status ? `?status=${status}` : ''}`)
      .then(setData)
      .catch((e) => setError(apiErrorText(e)))
  }, [status])

  const total = data ? Object.values(data.counts).reduce((a, b) => a + b, 0) : 0

  return (
    <div className="acc-wide acc-staff">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="acc-h1 m-0 flex-1">Заказы с сайта</h1>
        <button type="button" className="app-round" aria-label="Выйти"
          onClick={async () => { await logoutAccount(); navigate('/', { replace: true }) }}>
          <LogOut size={20} />
        </button>
      </div>
      <div className="staff-filters" role="tablist">
        {FILTERS.map((f) => {
          const n = f.key ? data?.counts[f.key] ?? 0 : total
          return (
            <button key={f.key || 'all'} type="button" role="tab" aria-selected={status === f.key}
              className={status === f.key ? 'on' : ''}
              onClick={() => setParams(f.key ? { status: f.key } : {}, { replace: true })}>
              {f.label}{n > 0 && <span>{n}</span>}
            </button>
          )
        })}
      </div>
      {error && <p className="acc-warn">{error}</p>}
      {data && data.orders.length === 0 && <p className="acc-note">Заказов нет.</p>}
      {data && data.orders.length > 0 && (
        <div className="app-list">
          {data.orders.map((o) => (
            <Link key={o.number} to={`/staff/orders/${o.number}`} className="app-row">
              <span className="app-row-mid">
                <span className="app-row-title">{o.number} · {itemsTitle(o)}</span>
                <span className="app-row-sub">{o.buyerName} · {o.city} · {formatDateTime(o.createdAt)}</span>
              </span>
              <span className="app-row-right">
                <span className="app-row-sum">{formatPrice(o.total)}</span>
                <StatusMark size="sm" color={SITE_STATUS_COLOR[o.status]}>{SITE_STATUS_LABEL[o.status]}</StatusMark>
              </span>
              <ChevronRight size={18} className="text-text-muted flex-none" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function StaffOrderPage() {
  return (
    <RequireStaff>
      <StaffOrder />
    </RequireStaff>
  )
}

function StaffOrder() {
  const { number = '' } = useParams()
  const [order, setOrder] = useState<SiteOrder | null>(null)
  const [next, setNext] = useState<SiteOrderStatus[]>([])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState('')
  const [track, setTrack] = useState('')
  const [reason, setReason] = useState('')
  const [cancelOpen, setCancelOpen] = useState(false)
  const [note, setNote] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const load = useCallback(() => {
    api<{ order: SiteOrder; next: SiteOrderStatus[] }>(`/staff/orders/${encodeURIComponent(number)}`)
      .then((r) => { setOrder(r.order); setNext(r.next); setNote(r.order.staffNote ?? '') })
      .catch((e) => setError(apiErrorText(e)))
  }, [number])
  useEffect(load, [load])

  const move = async (status: SiteOrderStatus, extra: Record<string, string> = {}) => {
    setBusy(true)
    setError('')
    try {
      const r = await api<{ order: SiteOrder; next: SiteOrderStatus[] }>(`/staff/orders/${number}/status`, { status, ...extra })
      setOrder(r.order)
      setNext(r.next)
      setCancelOpen(false)
    } catch (x) {
      setError(apiErrorText(x))
    }
    setBusy(false)
  }

  if (!order) {
    return (
      <div className="acc-wide">
        <PageBar back="/staff" backLabel="Все заказы" title={number} />
        {error ? <p className="acc-warn">{error}</p> : <div className="min-h-[40vh]" aria-busy="true" />}
      </div>
    )
  }

  const contacts = `${order.buyerName}\n${order.phone}\n${order.email}\nСДЭК: ${order.city}, ${order.sdekPoint}`

  return (
    <div className="acc-wide acc-staff">
      <PageBar back="/staff" backLabel="Все заказы" title={`Заказ ${order.number}`}
        extra={<StatusMark color={SITE_STATUS_COLOR[order.status]}>{SITE_STATUS_LABEL[order.status]}</StatusMark>} />

      <div className="acc-cols">
        <div className="flex flex-col gap-3 min-w-0">
          <div className="acc-card staff-action">
            <p className="acc-k m-0">Сейчас</p>
            <b className="acc-v">{STAFF_TODO[order.status]}</b>

            {order.status === 'NEW' && (
              <div className="mt-4 space-y-3">
                <label htmlFor="st-pay" className="block text-sm font-semibold ml-1 text-text-secondary">Ссылка на оплату через СБП</label>
                <input id="st-pay" type="url" inputMode="url" placeholder="https://…" value={paymentUrl}
                  onChange={(e) => setPaymentUrl(e.target.value)} className={fieldCls} />
                <button type="button" disabled={busy || !/^https:\/\/\S+$/.test(paymentUrl.trim())} className="app-btn app-btn-primary"
                  onClick={() => move('AWAITING_PAYMENT', { paymentUrl: paymentUrl.trim() })}>
                  Наличие есть — отправить ссылку
                </button>
              </div>
            )}
            {order.status === 'AWAITING_PAYMENT' && (
              <div className="mt-4 space-y-3">
                <a href={order.paymentUrl} target="_blank" rel="noopener noreferrer" className="acc-link">
                  Ссылка у покупателя <ExternalLink size={14} />
                </a>
                <button type="button" disabled={busy} className="app-btn app-btn-success"
                  onClick={() => move('PAID')}>Оплата поступила — {formatPrice(order.total)}</button>
              </div>
            )}
            {order.status === 'PAID' && (
              <div className="mt-4 space-y-3">
                <label htmlFor="st-track" className="block text-sm font-semibold ml-1 text-text-secondary">Трек-номер СДЭК</label>
                <input id="st-track" type="text" value={track} onChange={(e) => setTrack(e.target.value)} className={fieldCls} />
                <button type="button" disabled={busy || !track.trim()} className="app-btn app-btn-primary"
                  onClick={() => move('SHIPPED', { trackNumber: track.trim() })}>Отправлено в СДЭК</button>
              </div>
            )}
            {order.status === 'SHIPPED' && (
              <button type="button" disabled={busy} className="app-btn app-btn-primary mt-4" onClick={() => move('READY')}>
                Прибыл в пункт СДЭК
              </button>
            )}
            {order.status === 'READY' && (
              <button type="button" disabled={busy} className="app-btn app-btn-success mt-4" onClick={() => move('RECEIVED')}>
                Покупатель получил заказ
              </button>
            )}
            {next.includes('CANCELLED') && (
              cancelOpen ? (
                <div className="mt-4 space-y-3 pt-4 border-t border-border">
                  <label htmlFor="st-reason" className="block text-sm font-semibold ml-1 text-text-secondary">Причина отмены — её увидит покупатель</label>
                  <input id="st-reason" type="text" value={reason} onChange={(e) => setReason(e.target.value)} className={fieldCls}
                    placeholder="Например: товара нет у поставщика" />
                  <button type="button" disabled={busy || !reason.trim()} className="app-btn bg-red-600 text-white hover:bg-red-700"
                    onClick={() => move('CANCELLED', { reason: reason.trim() })}>Отменить заказ</button>
                </div>
              ) : (
                <button type="button" className="acc-link-btn" onClick={() => setCancelOpen(true)}>Отменить заказ…</button>
              )
            )}
            {next.length > 0 && <p className="acc-note">Покупателю уйдёт письмо, статус в его кабинете обновится.</p>}
            {error && <p className="text-red-600 text-[13.5px] mt-3 mb-0">{error}</p>}
          </div>

          <div className="acc-card">
            <p className="acc-k m-0 mb-2">История</p>
            <ol className="staff-log">
              {order.events.map((e, i) => (
                <li key={i}>
                  <span>{formatDateTime(e.at)}</span>
                  <b>{SITE_STATUS_LABEL[e.status]}</b>{e.note && <em> — {e.note}</em>}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <div className="acc-card">
            <ul className="co-items co-items-flat">
              {order.items.map((i) => (
                <li key={i.productId}>
                  <span className="co-items-name">{i.name}{i.qty > 1 && <b> × {i.qty}</b>}</span>
                  <span className="co-items-sum">{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="cart-sum-row"><span>{order.pickupType === 'PARTNER' ? 'Доставка в пункт партнёра' : 'Доставка СДЭК'}</span><span className="text-text-primary font-semibold">{order.pickupType === 'PARTNER' ? 'в цене' : formatPrice(order.delivery)}</span></div>
            <div className="cart-sum-total"><span>Итого</span><span>{formatPrice(order.total)}</span></div>
          </div>

          <div className="app-group">
            <div className="app-kv"><div className="app-kv-text"><span className="app-kv-label">Получатель</span><span className="app-kv-value">{order.buyerName}</span></div></div>
            <a href={`tel:${order.phone.replace(/[^\d+]/g, '')}`} className="app-kv no-underline text-inherit"><div className="app-kv-text"><span className="app-kv-label">Телефон</span><span className="app-kv-value">{order.phone}</span></div></a>
            <a href={`mailto:${order.email}?subject=${encodeURIComponent('Заказ ' + order.number)}`} className="app-kv no-underline text-inherit"><div className="app-kv-text"><span className="app-kv-label">Email</span><span className="app-kv-value">{order.email}</span></div></a>
            <div className="app-kv"><div className="app-kv-text"><span className="app-kv-label">{order.pickupType === 'PARTNER' ? 'Пункт выдачи партнёра' : 'Пункт СДЭК'}</span><span className="app-kv-value">{order.city}, {order.sdekPoint}</span></div></div>
            {order.comment && <div className="app-kv"><div className="app-kv-text"><span className="app-kv-label">Комментарий покупателя</span><span className="app-kv-value">{order.comment}</span></div></div>}
          </div>
          <button type="button" className="app-btn app-btn-soft"
            onClick={async () => { if (await copyText(contacts)) { setCopied(true); setTimeout(() => setCopied(false), 1500) } }}>
            {copied ? 'Скопировано' : 'Скопировать данные получателя'}
          </button>

          <div className="acc-card">
            <label htmlFor="st-note" className="acc-k block mb-2">Заметка сотрудников — покупатель её не видит</label>
            <textarea id="st-note" rows={3} value={note} onChange={(e) => { setNote(e.target.value); setNoteSaved(false) }}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary outline-none focus:border-primary text-base resize-none" />
            <button type="button" className="acc-link-btn" onClick={async () => {
              try { await api(`/staff/orders/${number}/note`, { staffNote: note }); setNoteSaved(true) } catch (x) { setError(apiErrorText(x)) }
            }}>{noteSaved ? 'Заметка сохранена' : 'Сохранить заметку'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
