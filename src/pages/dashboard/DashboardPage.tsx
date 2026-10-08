import { Link } from 'react-router-dom'
import { Plus, PackageCheck, PackageOpen, Link2, FileSignature, ChevronRight, PlusCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { waitingPairsCount } from '../../data/partnerDocuments'
import {
  formatPrice,
  formatDate,
  formatPercent,
  accruedReward,
  paidTotal,
  rewardPercentAt,
  pendingRewardChange,
} from '../../utils/calculate'
import { isIssued } from '../../utils/status'
import { useDataRevision } from '../../utils/store'
import OrderRow from '../../components/app/OrderRow'

const LEGAL_FORMS = new Set(['ООО', 'ОсОО', 'ИП', 'АО', 'ПАО', 'ОАО', 'ЗАО'])

/** Буквы для кружка с аватаром: «Демо-партнёр 1» → «ДП», «ООО „Ромашка“» → «Р» */
function initials(name: string): string {
  const words = name
    .split(/[\s\-«»"„“]+/)
    .filter((w) => w && !LEGAL_FORMS.has(w) && /\p{L}/u.test(w[0]))
  return words.slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'П'
}

/** 1 заказ, 2 заказа, 5 заказов */
function ordersWord(n: number): string {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'заказа'
  return 'заказов'
}

interface Action {
  to: string
  label: [string, string]
  icon: LucideIcon
  count?: number
  main?: boolean
  off?: boolean
}

export default function DashboardPage() {
  const { user } = useAuth()
  useDataRevision()
  const orders = mockOrders.filter((o) => o.userId === user?.id)
  const waiting = user ? waitingPairsCount(user.id) : 0
  const canOrder = user?.partnerStatus === 'VERIFIED'
  const percent = user ? rewardPercentAt(user) : undefined
  const accrued = accruedReward(orders)
  const pending = user ? pendingRewardChange(user) : null
  const issued = orders.filter(isIssued).length
  const atPoint = orders.filter((o) => o.status === 'AT_POINT').length
  const inTransit = orders.filter((o) => o.status === 'IN_TRANSIT').length
  const unpaid = orders.filter((o) => o.status === 'CREATED').length

  const actions: Action[] = [
    { to: '/dashboard/orders/new', label: ['Новый', 'заказ'], icon: Plus, main: true, off: !canOrder },
    { to: '/dashboard/orders?status=AT_POINT', label: ['Выдать', 'товар'], icon: PackageCheck, count: atPoint },
    { to: '/dashboard/orders?status=IN_TRANSIT', label: ['Принять', 'товар'], icon: PackageOpen, count: inTransit },
    { to: '/dashboard/orders?status=CREATED', label: ['Ссылка', 'на оплату'], icon: Link2, count: unpaid },
  ]

  const recentOrders = orders.slice(0, 5)
  const name = user?.companyName || 'Кабинет партнёра'

  return (
    <div className="max-w-3xl">
      {/* Кто вошёл и где пункт выдачи */}
      <div className="flex items-center gap-3 mb-4 lg:mb-6">
        <span className="w-11 h-11 rounded-full bg-primary/10 text-primary grid place-items-center font-bold shrink-0">
          {initials(name)}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="app-name text-[17px] lg:text-2xl font-bold text-text-primary leading-tight truncate">{name}</h1>
          {user?.pointAddress && (
            <p className="text-[13px] text-text-muted truncate mt-0.5">Пункт выдачи · {user.pointAddress}</p>
          )}
        </div>
        {canOrder && (
          <Link
            to="/dashboard/orders/new"
            className="hidden lg:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all no-underline shrink-0"
          >
            <PlusCircle size={18} />
            Новый заказ
          </Link>
        )}
      </div>

      {/* Вознаграждение крупно, как остаток на счёте */}
      <section className="app-hero" aria-label="Вознаграждение">
        <div className="app-hero-label">Начислено вознаграждения</div>
        <div className="app-hero-sum">{percent && accrued !== null ? formatPrice(accrued) : '—'}</div>
        <p className="app-hero-note">
          {percent
            ? `${formatPercent(percent)} от цены товара · начисляется после выдачи и загрузки подписанного акта`
            : 'Процент вознаграждения ТехЭйджент установит при подтверждении анкеты'}
        </p>
        <div className="app-hero-split">
          <div>
            <span>Оплачено покупателями</span>
            <b>{formatPrice(paidTotal(orders))}</b>
          </div>
          <div>
            <span>Выдано</span>
            <b>{issued} из {orders.length} {ordersWord(orders.length)}</b>
          </div>
        </div>
      </section>
      {pending && (
        <p className="text-[13px] leading-snug text-amber-800 bg-amber-50 rounded-2xl px-4 py-3 mt-3">
          С {formatDate(pending.from)} вознаграждение — {formatPercent(pending.percent)} от цены товара для заказов, оформленных с этой даты.
        </p>
      )}

      {/* Главные действия круглыми кнопками */}
      <nav className="app-actions my-5" aria-label="Действия">
        {actions.map((a) => (
          <Link
            key={a.label.join(' ')}
            to={a.to}
            className={`app-act ${a.main ? 'app-act-main' : ''} ${a.off ? 'app-act-off' : ''}`}
            aria-disabled={a.off || undefined}
            tabIndex={a.off ? -1 : undefined}
          >
            <span className="app-act-circle">
              <a.icon size={27} strokeWidth={a.main ? 2.4 : 2} />
            </span>
            {Boolean(a.count) && <span className="app-badge">{a.count}</span>}
            <span>
              {a.label[0]}
              <br />
              {a.label[1]}
            </span>
          </Link>
        ))}
      </nav>
      {!canOrder && user?.partnerStatus !== 'REJECTED' && (
        <p className="text-[13px] text-text-muted -mt-2 mb-5 text-center">Заказы можно оформлять после подтверждения анкеты</p>
      )}

      {waiting > 0 && (
        <Link
          to="/dashboard/documents"
          className="mb-5 flex items-center gap-3 rounded-[18px] bg-amber-50 border border-amber-200 px-3.5 py-3 text-amber-900 no-underline hover:bg-amber-100 transition-colors"
        >
          <span className="w-10 h-10 rounded-xl bg-amber-100 grid place-items-center shrink-0">
            <FileSignature size={22} />
          </span>
          <span className="flex-1 min-w-0 leading-snug">
            <b className="block text-[15px]">
              {waiting === 1 ? 'Отчёт агента и акт' : `Отчёты агента и акты: ${waiting}`}
            </b>
            <span className="text-sm">Ждут вашего решения</span>
          </span>
          <ChevronRight size={20} className="shrink-0" />
        </Link>
      )}

      <div className="app-section-head">
        <h2>Последние заказы</h2>
        <Link to="/dashboard/orders">Все</Link>
      </div>
      {recentOrders.length === 0 ? (
        <div className="app-list p-8 text-center text-text-muted">
          <p>Заказов пока нет</p>
          {canOrder && (
            <Link to="/dashboard/orders/new" className="inline-flex items-center gap-1 text-primary font-medium mt-2 no-underline">
              <PlusCircle size={16} />
              Оформить заказ
            </Link>
          )}
        </div>
      ) : (
        <div className="app-list">
          {recentOrders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
