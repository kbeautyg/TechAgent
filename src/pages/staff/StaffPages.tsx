import { Fragment, useCallback, useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link, NavLink, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ChevronRight, ExternalLink, LogOut } from 'lucide-react'
import { api, apiErrorText, ApiError, type PartnerApplicationView, type PartnerOrderView, type PartnerProfile, type SiteOrder, type SiteOrderStatus } from '../../lib/api'
import { logoutAccount, refreshAccount, useAccount } from '../../utils/account'
import { formatPrice, formatDateTime } from '../../utils/calculate'
import { PageBar } from '../../components/app/ui'
import StatusMark from '../../components/app/StatusMark'
import { SITE_STATUS_COLOR, SITE_STATUS_LABEL, STAFF_TODO, itemsTitle } from '../../utils/siteOrderStatus'
import { copyText } from '../../utils/clipboard'

/*
 * Раздел сотрудников ТехЭйджент: заказы покупателей с сайта и партнёры.
 * Сотрудник ведёт заказ по этапам; на каждом этапе покупателю уходит письмо, а в его кабинете меняется статус.
 * Заявки партнёров: одобрение заводит учётку и отправляет партнёру письмо с временным паролем.
 * Договор партнёр заключает сам — отметкой о согласии с офертой при первом входе.
 */

/** Заказ в разделе сотрудников: у заказа в пункте партнёра — ещё приёмка, выдача, акт и обращения */
type StaffOrderView = SiteOrder & Partial<Omit<PartnerOrderView, keyof SiteOrder>>
const staffFile = (number: string, name: string) => `/api/staff/orders/${number}/files/${encodeURIComponent(name)}`
const CLAIM_LABEL = { EXCHANGE: 'Обмен', RETURN: 'Возврат', DEFECT: 'Недостаток товара' } as const

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

/** Шапка раздела: заголовок, переключатель «Заказы / Партнёры» и выход */
function StaffHead({ title, onLogout }: { title: string; onLogout: () => void }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <h1 className="acc-h1 m-0 flex-1">{title}</h1>
        <button type="button" className="app-round" aria-label="Выйти" onClick={onLogout}>
          <LogOut size={20} />
        </button>
      </div>
      <nav className="staff-filters staff-sections mb-4" aria-label="Разделы">
        <NavLink to="/staff" end className={({ isActive }) => (isActive ? 'on' : '')}>Заказы</NavLink>
        <NavLink to="/staff/partners" className={({ isActive }) => (isActive ? 'on' : '')}>Партнёры</NavLink>
      </nav>
    </>
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
      <StaffHead title="Заказы с сайта" onLogout={async () => { await logoutAccount(); navigate('/', { replace: true }) }} />
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
                <span className="app-row-sub">{o.buyerName} · {o.partner ? `партнёр ${o.partner.companyName}` : o.city} · {formatDateTime(o.createdAt)}</span>
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
  const [order, setOrder] = useState<StaffOrderView | null>(null)
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
    api<{ order: StaffOrderView; next: SiteOrderStatus[] }>(`/staff/orders/${encodeURIComponent(number)}`)
      .then((r) => { setOrder(r.order); setNext(r.next); setNote(r.order.staffNote ?? '') })
      .catch((e) => setError(apiErrorText(e)))
  }, [number])
  useEffect(load, [load])

  const move = async (status: SiteOrderStatus, extra: Record<string, string> = {}) => {
    setBusy(true)
    setError('')
    try {
      const r = await api<{ order: StaffOrderView; next: SiteOrderStatus[] }>(`/staff/orders/${number}/status`, { status, ...extra })
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

  const toPartner = order.pickupType === 'PARTNER'
  const where = [order.city, order.sdekPoint].filter(Boolean).join(', ')
  const contacts = `${order.buyerName}\n${order.phone}${order.email ? `\n${order.email}` : ''}\n${toPartner ? 'Пункт партнёра' : 'СДЭК'}: ${where}`

  return (
    <div className="acc-wide acc-staff">
      <PageBar back="/staff" backLabel="Все заказы" title={`Заказ ${order.number}`}
        extra={<StatusMark color={SITE_STATUS_COLOR[order.status]}>{SITE_STATUS_LABEL[order.status]}</StatusMark>} />

      <div className="acc-cols">
        <div className="flex flex-col gap-3 min-w-0">
          <div className="acc-card staff-action">
            <p className="acc-k m-0">Сейчас</p>
            <b className="acc-v">{order.partner && order.status === 'SHIPPED' ? 'Едет — партнёр отметит приёмку в своём кабинете' : STAFF_TODO[order.status]}</b>

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
                {order.payPage && (
                  <p className="acc-note m-0">
                    {order.consentAt
                      ? `Покупатель отметил согласие с офертой и на обработку данных ${formatDateTime(order.consentAt)}.`
                      : 'Покупатель ещё не отмечал согласия на странице оплаты заказа — ссылка банка откроется ему после этого.'}
                  </p>
                )}
                <button type="button" disabled={busy} className="app-btn app-btn-success"
                  onClick={() => move('PAID')}>Оплата поступила — {formatPrice(order.total)}</button>
              </div>
            )}
            {order.status === 'PAID' && (
              <div className="mt-4 space-y-3">
                <label htmlFor="st-track" className="block text-sm font-semibold ml-1 text-text-secondary">
                  {toPartner ? 'Трек-номер, если есть' : 'Трек-номер СДЭК'}
                </label>
                <input id="st-track" type="text" value={track} onChange={(e) => setTrack(e.target.value)} className={fieldCls} />
                <button type="button" disabled={busy || (!toPartner && !track.trim())} className="app-btn app-btn-primary"
                  onClick={() => move('SHIPPED', { trackNumber: track.trim() })}>{toPartner ? 'Отправлено в пункт партнёра' : 'Отправлено в СДЭК'}</button>
              </div>
            )}
            {order.status === 'SHIPPED' && (
              <button type="button" disabled={busy} className={`app-btn mt-4 ${order.partner ? 'app-btn-soft' : 'app-btn-primary'}`} onClick={() => move('READY')}>
                {order.partner ? 'Отметить приёмку за партнёра' : toPartner ? 'Прибыл в пункт партнёра' : 'Прибыл в пункт СДЭК'}
              </button>
            )}
            {order.status === 'READY' && (
              <button type="button" disabled={busy} className={`app-btn mt-4 ${order.partner ? 'app-btn-soft' : 'app-btn-success'}`} onClick={() => move('RECEIVED')}>
                {order.partner ? 'Отметить выдачу за партнёра' : 'Покупатель получил заказ'}
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
            {order.partner && ['SHIPPED', 'READY'].includes(order.status) && (
              <p className="acc-note">Обычно это делает партнёр в своём кабинете: приёмку — с проверкой упаковки, выдачу — с фото подписанного акта.</p>
            )}
            {next.length > 0 && (
              <p className="acc-note">{order.email ? 'Покупателю уйдёт письмо, статус в его кабинете обновится.' : 'Покупатель не оставлял email — писем ему нет.'}{order.partner ? ' Партнёру — письмо об оплате, отправке и отмене.' : ''}</p>
            )}
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
            {order.email ? (
              <a href={`mailto:${order.email}?subject=${encodeURIComponent('Заказ ' + order.number)}`} className="app-kv no-underline text-inherit"><div className="app-kv-text"><span className="app-kv-label">Email</span><span className="app-kv-value">{order.email}</span></div></a>
            ) : (
              <div className="app-kv"><div className="app-kv-text"><span className="app-kv-label">Email</span><span className="app-kv-value text-text-muted">не указан</span></div></div>
            )}
            <div className="app-kv"><div className="app-kv-text"><span className="app-kv-label">{toPartner ? 'Пункт выдачи партнёра' : 'Пункт СДЭК'}</span><span className="app-kv-value">{where}</span></div></div>
            {order.comment && <div className="app-kv"><div className="app-kv-text"><span className="app-kv-label">Комментарий покупателя</span><span className="app-kv-value">{order.comment}</span></div></div>}
          </div>
          {order.partner && <PartnerPart order={order} />}
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

/* ── Партнёры: заявки и учётки ── */

export function StaffPartnersPage() {
  return (
    <RequireStaff>
      <StaffPartners />
    </RequireStaff>
  )
}

/** Точка на карте магазина (api/partner-points.json) */
interface MapPoint {
  code: string
  name: string
  address: string
  city: string
  active: boolean
  /** Заведена сотрудником (не из partner-points.json) */
  own: boolean
}

interface PartnersData {
  applications: PartnerApplicationView[]
  partners: PartnerProfile[]
  points: MapPoint[]
}

/** Выданный пароль показываем один раз: письмо могло не дойти — тогда его диктуют партнёру */
interface Issued {
  email: string
  password: string
  mail: boolean
}

function IssuedBox({ issued }: { issued: Issued }) {
  return (
    <div className="acc-card border-emerald-300 bg-emerald-50">
      <p className="m-0 text-[15px] text-emerald-900">
        {issued.mail
          ? <>Письмо с доступом ушло на <b>{issued.email}</b>.</>
          : <>Почта сервера не настроена — письмо не ушло. Передайте доступ партнёру сами: <b>{issued.email}</b>.</>}
      </p>
      <p className="mt-2 mb-0 text-[14px] text-emerald-900">
        Временный пароль: <b className="font-mono text-[16px] select-all">{issued.password}</b>
        <span className="block text-[13px] mt-1">Показан один раз — на случай, если письмо не дойдёт и пароль нужно продиктовать.</span>
      </p>
    </div>
  )
}

function KV({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="app-kv">
      <div className="app-kv-text">
        <span className="app-kv-label">{label}</span>
        <span className="app-kv-value break-words">{value || '—'}</span>
      </div>
    </div>
  )
}

function ApplicationCard({ a, onDone }: { a: PartnerApplicationView; onDone: (issued?: Issued) => void }) {
  const [percent, setPercent] = useState('5')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [declineOpen, setDeclineOpen] = useState(false)
  const [reason, setReason] = useState('')
  const pct = Number(percent.replace(',', '.'))
  const pctOk = Number.isFinite(pct) && pct > 0 && pct <= 50

  const approve = async () => {
    setBusy(true)
    setError('')
    try {
      const r = await api<{ password: string; mail: boolean; partner: PartnerProfile }>(`/staff/applications/${a.id}/approve`, { rewardPercent: pct })
      onDone({ email: r.partner.email, password: r.password, mail: r.mail })
    } catch (x) {
      setError(apiErrorText(x))
      setBusy(false)
    }
  }
  const decline = async () => {
    setBusy(true)
    setError('')
    try {
      await api(`/staff/applications/${a.id}/decline`, { reason: reason.trim() })
      onDone()
    } catch (x) {
      setError(apiErrorText(x))
      setBusy(false)
    }
  }

  return (
    <div className="acc-card">
      <p className="acc-k m-0">Заявка от {formatDateTime(a.createdAt)}</p>
      <b className="acc-v block mb-3">{a.companyName}</b>
      <div className="app-group mb-4">
        <KV label="ИНН / ОГРН" value={`${a.inn} / ${a.ogrn}`} />
        <KV label="Адрес пункта выдачи" value={a.pointAddress} />
        <KV label="Контактное лицо" value={`${a.contactName}, ${a.phone}`} />
        <KV label="Email — сюда уйдёт доступ" value={a.email} />
        <KV label="Реквизиты для выплаты" value={`${a.bankName}, БИК ${a.bik}, р/с ${a.account}`} />
        {a.comment && <KV label="Комментарий" value={a.comment} />}
      </div>
      <label htmlFor={`pct-${a.id}`} className="block text-sm font-semibold mb-2 ml-1 text-text-secondary">
        Вознаграждение, % от цены товара — партнёр увидит его в кабинете (оферта, п. 7.1)
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input id={`pct-${a.id}`} inputMode="decimal" value={percent} onChange={(e) => setPercent(e.target.value)}
          className={`${fieldCls} sm:w-32`} />
        <button type="button" disabled={busy || !pctOk} className="app-btn app-btn-primary sm:flex-1" onClick={approve}>
          {busy ? 'Отправляем…' : 'Одобрить и отправить доступ'}
        </button>
      </div>
      <p className="acc-note text-left">
        Партнёру уйдёт письмо с адресом входа и временным паролем. Договор он заключит сам — отметкой о согласии с офертой при первом входе.
      </p>
      {declineOpen ? (
        <div className="mt-4 space-y-3 pt-4 border-t border-border">
          <label htmlFor={`rs-${a.id}`} className="block text-sm font-semibold ml-1 text-text-secondary">Причина отказа — её увидит заявитель</label>
          <input id={`rs-${a.id}`} type="text" value={reason} onChange={(e) => setReason(e.target.value)} className={fieldCls}
            placeholder="Например: в этом районе пункт уже есть" />
          <button type="button" disabled={busy} className="app-btn bg-red-600 text-white hover:bg-red-700" onClick={decline}>
            Отклонить и написать заявителю
          </button>
        </div>
      ) : (
        <button type="button" className="acc-link-btn" onClick={() => setDeclineOpen(true)}>Отклонить заявку…</button>
      )}
      {error && <p className="text-red-600 text-[13.5px] mt-3 mb-0">{error}</p>}
    </div>
  )
}

/** Пункт выдачи партнёра: адрес из анкеты, точка на карте магазина (из списка или новая), видна ли покупателям.
 *  Привязанная точка видна покупателям при оформлении заказа; её адрес — в заказах партнёра и на странице оплаты */
function PointPicker({ p, points, taken, onSaved }: { p: PartnerProfile; points: MapPoint[]; taken: Map<string, string>; onSaved: () => void }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [address, setAddress] = useState(p.pointAddress)
  const [adding, setAdding] = useState(false)
  const [np, setNp] = useState({ name: '', city: 'Москва', address: '', coords: '', workTime: '' })
  const save = async (body: Record<string, unknown>): Promise<boolean> => {
    setBusy(true)
    setError('')
    try {
      await api(`/staff/partners/${p.id}/point`, body)
      onSaved()
      return true
    } catch (x) {
      const f = x instanceof ApiError ? x.fields ?? [] : []
      setError(
        f.includes('city') ? 'Город не найден в справочнике СДЭК — проверьте название.'
          : f.includes('coords') ? 'Не нашли координаты: вставьте их из Яндекс Карт, например 55.742, 37.504.'
            : f.includes('pointAddress') ? 'Укажите адрес полностью.'
              : apiErrorText(x),
      )
      return false
    } finally {
      setBusy(false)
    }
  }
  const npField = (k: keyof typeof np, label: string, placeholder = '') => (
    <div>
      <label htmlFor={`np-${k}-${p.id}`} className="block text-[13px] font-semibold mb-1 ml-1 text-text-secondary">{label}</label>
      <input id={`np-${k}-${p.id}`} value={np[k]} placeholder={placeholder} onChange={(e) => setNp({ ...np, [k]: e.target.value })} className={fieldCls} />
    </div>
  )
  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex items-center gap-3 mb-3">
        <b className="flex-1 text-[15px] text-text-primary">Пункт выдачи</b>
        {p.pointVisible
          ? <StatusMark size="sm" color="#12B981">Виден покупателям</StatusMark>
          : <StatusMark size="sm" color="#94A3B8">Скрыт от покупателей</StatusMark>}
      </div>

      <label htmlFor={`pa-${p.id}`} className="block text-sm font-semibold mb-1.5 ml-1 text-text-secondary">Адрес из анкеты</label>
      <div className="flex gap-2">
        <input id={`pa-${p.id}`} value={address} onChange={(e) => setAddress(e.target.value)} className={fieldCls} />
        {address.trim() !== p.pointAddress && (
          <button type="button" disabled={busy} className="app-btn app-btn-primary w-auto px-4 shrink-0" onClick={() => void save({ pointAddress: address.trim() })}>
            Сохранить
          </button>
        )}
      </div>

      <label htmlFor={`pt-${p.id}`} className="block text-sm font-semibold mt-3 mb-1.5 ml-1 text-text-secondary">Точка на карте магазина</label>
      <select id={`pt-${p.id}`} value={p.pointCode ?? ''} disabled={busy} onChange={(e) => void save({ pointCode: e.target.value })} className={fieldCls}>
        <option value="">Нет на карте</option>
        {points.map((x) => {
          const other = taken.get(x.code)
          return (
            <option key={x.code} value={x.code} disabled={Boolean(other) && other !== p.companyName}>
              {x.city}, {x.name} — {x.address}{other && other !== p.companyName ? ` (${other})` : ''}
            </option>
          )
        })}
      </select>
      <p className="text-[13px] text-text-muted mt-1.5 ml-1 mb-0">
        {p.pointCode
          ? p.pointVisible
            ? 'Покупатели видят точку на карте при оформлении заказа на сайте; такие заказы приходят партнёру в кабинет. В заказах партнёра и на странице оплаты — адрес этой точки.'
            : 'Точка откроется покупателям, когда партнёр примет оферту.'
          : 'Без точки покупатели сайта этот пункт не видят. Заказы самого партнёра идут на адрес из анкеты.'}
      </p>

      {adding ? (
        <div className="mt-3 p-3 rounded-xl bg-bg-light space-y-2.5">
          {npField('name', 'Название на карте', 'Например: Горбушкин двор, павильон 2-145')}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {npField('city', 'Город')}
            {npField('workTime', 'Часы работы', 'Ежедневно 10:00–20:00')}
          </div>
          {npField('address', 'Адрес', 'Улица, дом, корпус')}
          {npField('coords', 'Координаты из Яндекс Карт', 'Пусто — найдём по адресу')}
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" disabled={busy || !np.name.trim() || !np.address.trim()} className="app-btn app-btn-primary w-auto px-5"
              onClick={async () => { if (await save({ newPoint: np })) setAdding(false) }}>
              {busy ? 'Сохраняем…' : 'Добавить и привязать'}
            </button>
            <button type="button" className="acc-link-btn m-0" onClick={() => setAdding(false)}>Отмена</button>
          </div>
        </div>
      ) : (
        <button type="button" className="acc-link-btn" onClick={() => { setNp((v) => ({ ...v, address: v.address || p.pointAddress.replace(/^(г\.?\s*)?Москва,\s*/i, '') })); setAdding(true) }}>
          Новая точка на карте…
        </button>
      )}
      {error && <p className="text-red-600 text-[13.5px] mt-2 mb-0">{error}</p>}
    </div>
  )
}

function PartnerRow({ p, onIssued, picker }: { p: PartnerProfile; onIssued: (i: Issued) => void; picker: ReactNode }) {
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const reset = async () => {
    setBusy(true)
    setError('')
    try {
      const r = await api<{ password: string; mail: boolean }>(`/staff/partners/${p.id}/reset`, {})
      onIssued({ email: p.email, password: r.password, mail: r.mail })
      setConfirm(false)
    } catch (x) {
      setError(apiErrorText(x))
    }
    setBusy(false)
  }
  return (
    <div className="acc-card">
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
        <div className="min-w-0 flex-1">
          <b className="acc-v block">{p.companyName}</b>
          <p className="text-[14px] text-text-secondary m-0 mt-1 break-words">{p.email} · {p.contactName}, {p.phone}</p>
          <p className="text-[14px] text-text-secondary m-0 mt-1">{p.pointAddress} · вознаграждение {String(p.rewardPercent).replace('.', ',')}%</p>
        </div>
        <span className="shrink-0">
          {p.offerAcceptedAt
            ? <StatusMark size="sm" color="#12B981">Оферту принял</StatusMark>
            : <StatusMark size="sm" color="#F59E0B">Ждём первого входа</StatusMark>}
        </span>
      </div>
      <p className="acc-note text-left">
        {p.offerAcceptedAt
          ? <>Согласие с агентским договором-офертой (ред. {p.offerEdition}) отмечено партнёром {formatDateTime(p.offerAcceptedAt)}{p.offerAcceptIp ? `, адрес ${p.offerAcceptIp}` : ''}. Доступ открыт {formatDateTime(p.createdAt)}.</>
          : <>Доступ открыт {formatDateTime(p.createdAt)}. Договор будет заключён, когда партнёр войдёт и сам отметит согласие с офертой.</>}
      </p>
      {picker}
      {confirm ? (
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <button type="button" disabled={busy} className="app-btn app-btn-primary w-auto px-5" onClick={reset}>
            {busy ? 'Отправляем…' : 'Выдать новый пароль'}
          </button>
          <button type="button" className="acc-link-btn m-0" onClick={() => setConfirm(false)}>Отмена</button>
          <span className="text-[13px] text-text-muted w-full">Старый пароль перестанет работать, партнёру уйдёт письмо.</span>
        </div>
      ) : (
        <button type="button" className="acc-link-btn" onClick={() => setConfirm(true)}>Новый временный пароль…</button>
      )}
      {error && <p className="text-red-600 text-[13.5px] mt-3 mb-0">{error}</p>}
    </div>
  )
}

function StaffPartners() {
  const [data, setData] = useState<PartnersData | null>(null)
  const [error, setError] = useState('')
  const [issued, setIssued] = useState<Issued | null>(null)
  const navigate = useNavigate()

  const load = useCallback(() => {
    api<PartnersData>('/staff/partners').then(setData).catch((e) => setError(apiErrorText(e)))
  }, [])
  useEffect(load, [load])

  const fresh = data?.applications.filter((a) => a.status === 'NEW') ?? []
  const declined = data?.applications.filter((a) => a.status === 'DECLINED') ?? []
  /** Какая точка за каким партнёром: у точки один партнёр */
  const taken = new Map((data?.partners ?? []).filter((p) => p.pointCode).map((p) => [p.pointCode!, p.companyName]))

  return (
    <div className="acc-wide acc-staff">
      <StaffHead title="Партнёры" onLogout={async () => { await logoutAccount(); navigate('/', { replace: true }) }} />
      {error && <p className="acc-warn">{error}</p>}
      {issued && <div className="mb-4"><IssuedBox issued={issued} /></div>}
      {data && (
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="app-group-title">Новые заявки{fresh.length > 0 && `: ${fresh.length}`}</h2>
            {fresh.length === 0
              ? <p className="acc-note text-left">Новых заявок нет. Заявки приходят с techagent.pro/register — и письмом на partners@techagent.pro.</p>
              : <div className="flex flex-col gap-3">
                  {fresh.map((a) => (
                    <ApplicationCard key={a.id} a={a} onDone={(i) => { if (i) setIssued(i); window.scrollTo(0, 0); load() }} />
                  ))}
                </div>}
          </section>
          <section>
            <h2 className="app-group-title">Партнёры{data.partners.length > 0 && `: ${data.partners.length}`}</h2>
            {data.partners.length === 0
              ? <p className="acc-note text-left">Пока никого — одобрите заявку, и партнёр появится здесь.</p>
              : <div className="flex flex-col gap-3">
                  {data.partners.map((p) => (
                    <PartnerRow key={p.id} p={p} onIssued={(i) => { setIssued(i); window.scrollTo(0, 0) }}
                      picker={<PointPicker p={p} points={data.points} taken={taken} onSaved={load} />} />
                  ))}
                </div>}
          </section>
          {declined.length > 0 && (
            <details className="acc-card">
              <summary className="cursor-pointer font-semibold text-text-primary">Отклонённые заявки: {declined.length}</summary>
              <ul className="mt-3 mb-0 pl-5 text-[14px] text-text-secondary space-y-1">
                {declined.map((a) => (
                  <li key={a.id}>{a.companyName}, {a.email} — {formatDateTime(a.createdAt)}{a.declineReason && `. Причина: ${a.declineReason}`}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}

/** Заказ в пункте партнёра: кто партнёр, вознаграждение и что сделано в пункте — приёмка, уведомление, выдача, обращения */
function PartnerPart({ order }: { order: StaffOrderView }) {
  const p = order.partner!
  const kv = (label: string, value: ReactNode) => (
    <div className="app-kv"><div className="app-kv-text"><span className="app-kv-label">{label}</span><span className="app-kv-value">{value}</span></div></div>
  )
  const photos = (order.files ?? []).filter((f) => f.startsWith('accept-'))
  return (
    <div className="app-group">
      {kv(order.source === 'PARTNER' ? 'Оформил партнёр' : 'Пункт партнёра (заказ с сайта)', <>{p.companyName}<br /><span className="text-text-muted text-[13px]">{p.phone} · {p.email}</span></>)}
      {kv('Вознаграждение партнёра', order.source === 'PARTNER' && order.reward != null
        ? `${formatPrice(order.reward)} · ${String(order.rewardPercent).replace('.', ',')}%${order.status === 'RECEIVED' && order.actFile ? '' : ' — после выдачи с актом'}`
        : 'не начисляется — заказ оформлен на сайте')}
      {order.payPage && kv('Страница оплаты', <a href={order.payPage} target="_blank" rel="noopener noreferrer" className="acc-link">{order.payPage.replace(/^https?:\/\//, '')}</a>)}
      {order.receivedAt && kv('Принят в пункте', formatDateTime(order.receivedAt))}
      {order.receivedIssue && kv('Замечание при приёмке', <>
        {order.receivedIssue}
        {photos.length > 0 && <span className="flex flex-wrap gap-x-3">{photos.map((f, i) => <a key={f} href={staffFile(order.number, f)} target="_blank" rel="noopener" className="acc-link">Фото {i + 1}</a>)}</span>}
      </>)}
      {order.notifiedAt && kv('Покупатель уведомлён', formatDateTime(order.notifiedAt))}
      {order.issuedAt && kv('Выдан', <>
        {formatDateTime(order.issuedAt)}{order.issuedToName ? ` · ${order.issuedToName}` : ''}
        {order.actFile ? <a href={staffFile(order.number, order.actFile)} target="_blank" rel="noopener" className="acc-link block">Подписанный акт</a> : <span className="block text-text-muted text-[13px]">акт не загружен</span>}
      </>)}
      {(order.claims ?? []).map((c) => <Fragment key={c.id}>{kv(`Обращение · ${CLAIM_LABEL[c.type]} · ${formatDateTime(c.createdAt)}`, <>
        <span className="whitespace-pre-wrap">{c.text}</span>
        {c.photo && <a href={staffFile(order.number, c.photo)} target="_blank" rel="noopener" className="acc-link block">Фото</a>}
      </>)}</Fragment>)}
    </div>
  )
}
