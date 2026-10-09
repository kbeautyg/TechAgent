import { useState } from 'react'
import { mockUsers, mockOrders, updateUser, scheduleRewardChange, REWARD_CHANGE_NOTICE_DAYS } from '../../data/mock'
import { formatDate, formatPercent, formatPrice, paidTotal, rewardPercentAt, pendingRewardChange } from '../../utils/calculate'
import { PARTNER_STATUS_LABELS, PARTNER_STATUS_BAR } from '../../utils/status'
import StatusMark from '../../components/app/StatusMark'
import { useDataRevision } from '../../utils/store'
import type { User } from '../../types'
import PartnerInvite from './PartnerInvite'

/** Границы размера вознаграждения, % цены товара */
const MIN_PERCENT = 0.1
const MAX_PERCENT = 99

const bigBtn = 'min-h-[46px] px-4 rounded-xl text-[15px] font-semibold transition-colors border-none cursor-pointer'
const smallBtn = 'text-xs px-2 py-1 rounded font-medium transition-colors border-none cursor-pointer whitespace-nowrap'

export default function AdminUsersPage() {
  useDataRevision()
  const [percents, setPercents] = useState<Record<string, string>>({})
  const partners = mockUsers.filter((u) => u.role === 'CLIENT')
  const pendingCount = partners.filter((u) => (u.partnerStatus ?? 'PENDING') === 'PENDING').length

  const nameOf = (u: User) => u.companyName || u.email

  const readPercent = (id: string): number | null => {
    const percent = Number((percents[id] ?? '').trim().replace(',', '.'))
    if (!Number.isFinite(percent) || percent < MIN_PERCENT || percent > MAX_PERCENT) {
      alert('Укажите вознаграждение от 0,1 до 99 % цены товара')
      return null
    }
    return Math.round(percent * 100) / 100
  }

  /** Подтверждение анкеты вместе с размером вознаграждения — его видит только сам Партнёр */
  const verify = (u: User) => {
    const percent = readPercent(u.id)
    if (percent === null) return
    if (!confirm(`Подтвердить анкету «${nameOf(u)}» с вознаграждением ${formatPercent(percent)} от цены товара? Партнёр сможет оформлять заказы.`)) return
    updateUser(u.id, {
      partnerStatus: 'VERIFIED',
      rewardPercent: percent,
      rewardPercentNext: undefined,
      rewardPercentNextFrom: undefined,
      rejectReason: undefined,
    })
    setPercents((p) => ({ ...p, [u.id]: '' }))
  }

  /** Отклонение — с причиной: её видит Партнёр в профиле */
  const reject = (u: User) => {
    const reason = prompt(`Причина отклонения анкеты «${nameOf(u)}» — её увидит партнёр в профиле:`)
    if (reason === null) return
    if (!reason.trim()) {
      alert('Укажите причину отклонения')
      return
    }
    updateUser(u.id, { partnerStatus: 'REJECTED', rejectReason: reason.trim() })
  }

  /** Изменение размера у подтверждённого Партнёра: применяется к заказам через 14 дней (оферта, п. 7.1) */
  const changePercent = (u: User) => {
    const percent = readPercent(u.id)
    if (percent === null) return
    if (!confirm(`Изменить вознаграждение «${nameOf(u)}» на ${formatPercent(percent)}? Новый размер — для заказов через ${REWARD_CHANGE_NOTICE_DAYS} дней после изменения.`)) return
    scheduleRewardChange(u.id, percent)
    setPercents((p) => ({ ...p, [u.id]: '' }))
  }

  /** Процент, подтверждение и отклонение: в таблице — мелко, на телефоне — крупными кнопками */
  const controls = (u: User, big: boolean) => {
    const status = u.partnerStatus ?? 'PENDING'
    return (
      <>
      <label className={big ? 'flex items-center gap-2 mt-3 text-[14px] text-text-muted' : 'flex items-center gap-1.5 mt-2 text-xs text-text-muted whitespace-nowrap'}>
        <input
          type="text"
          inputMode="decimal"
          value={percents[u.id] ?? ''}
          onChange={(e) => setPercents((p) => ({ ...p, [u.id]: e.target.value }))}
          className={big ? 'w-20 h-11 px-3 rounded-xl border border-border bg-white text-text-primary' : 'w-14 px-2 py-1 rounded border border-border bg-white text-text-primary text-xs'}
          aria-label="Вознаграждение, %"
        />
        % от цены товара
      </label>
      {status === 'VERIFIED' && (
        <>
          <button
            onClick={() => changePercent(u)}
            className={`${big ? bigBtn + ' w-full mt-3' : 'mt-2 text-xs px-2 py-1 rounded font-medium border-none cursor-pointer whitespace-nowrap'} bg-primary/10 text-primary hover:bg-primary/20 transition-colors`}
          >
            Изменить размер
          </button>
          <p className={big ? 'text-[13px] leading-snug text-text-muted mt-1.5' : 'text-xs text-text-muted mt-1 max-w-48'}>
            Новый размер — для заказов через {REWARD_CHANGE_NOTICE_DAYS} дней после изменения
          </p>
        </>
      )}
      <div className={big ? 'flex gap-2 mt-3 [&>button]:flex-1' : 'flex gap-2 mt-2'}>
        {status !== 'VERIFIED' && (
          <button
            onClick={() => verify(u)}
            className={`${big ? bigBtn : smallBtn} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
          >
            Подтвердить
          </button>
        )}
        {status !== 'REJECTED' && (
          <button
            onClick={() => reject(u)}
            className={`${big ? bigBtn : smallBtn} bg-red-50 text-red-700 hover:bg-red-100`}
          >
            Отклонить
          </button>
        )}
      </div>
      </>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6 gap-x-4 gap-y-1 flex-wrap">
        <h1 className="app-name text-[22px] lg:text-2xl font-bold text-text-primary leading-tight">Партнёры</h1>
        <span className="text-text-muted text-sm">
          {partners.length} всего{pendingCount > 0 && ` · ${pendingCount} на проверке`}
        </span>
      </div>

      <PartnerInvite />

      {partners.length === 0 ? (
        <div className="card p-8 text-center text-text-muted">Партнёров пока нет</div>
      ) : (
        <>
        {/* На телефоне вместо таблицы — карточка на партнёра */}
        <div className="lg:hidden space-y-3">
          {partners.map((u) => {
            const orders = mockOrders.filter((o) => o.userId === u.id)
            const status = u.partnerStatus ?? 'PENDING'
            const currentPercent = rewardPercentAt(u)
            const pending = pendingRewardChange(u)
            const rows: [string, string][] = [
              ['ИНН', u.inn || '—'],
              ['ОГРН', u.ogrn || '—'],
              ['Пункт выдачи', u.pointAddress || '—'],
              ['Контакт', u.contactName || '—'],
              ['Телефон', u.phone || '—'],
              ['Email', u.email],
              ['Банк', u.bankName || '—'],
              ['БИК', u.bik || '—'],
              ['Р/с', u.account || '—'],
              ['Заказы', `${orders.length} · оплачено ${formatPrice(paidTotal(orders))}`],
            ]
            return (
              <div key={u.id} className="app-group p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-[16px] leading-snug text-text-primary break-words">{u.companyName || '—'}</p>
                    <p className="text-[13px] text-text-muted mt-0.5">анкета от {formatDate(u.createdAt)}</p>
                  </div>
                  <span className="shrink-0 mt-0.5"><StatusMark size="sm" color={PARTNER_STATUS_BAR[status]}>{PARTNER_STATUS_LABELS[status]}</StatusMark></span>
                </div>
                {(currentPercent || pending) && (
                  <p className="text-[14px] text-text-secondary mt-2 leading-snug">
                    {currentPercent ? `Вознаграждение ${formatPercent(currentPercent)}` : ''}
                    {pending && <span className="block text-amber-700">с {formatDate(pending.from)} — {formatPercent(pending.percent)}</span>}
                  </p>
                )}
                {status === 'REJECTED' && u.rejectReason && (
                  <p className="text-[13px] text-red-700 mt-2 [overflow-wrap:anywhere]">Причина: {u.rejectReason}</p>
                )}
                <dl className="mt-3 pt-3 border-t border-border grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[14px] leading-snug m-0">
                  {rows.map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-text-muted">{k}</dt>
                      <dd className="m-0 text-text-primary text-right [overflow-wrap:anywhere]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 pt-1 border-t border-border">{controls(u, true)}</div>
              </div>
            )
          })}
        </div>
        <div className="card overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-light">
                  <th className="text-left px-4 py-3 font-medium text-text-muted">Партнёр</th>
                  <th className="text-left px-4 py-3 font-medium text-text-muted">Проверка и вознаграждение</th>
                  <th className="text-left px-4 py-3 font-medium text-text-muted">ИНН / ОГРН</th>
                  <th className="text-left px-4 py-3 font-medium text-text-muted">Пункт выдачи</th>
                  <th className="text-left px-4 py-3 font-medium text-text-muted">Контакты</th>
                  <th className="text-left px-4 py-3 font-medium text-text-muted">Реквизиты</th>
                  <th className="text-left px-4 py-3 font-medium text-text-muted">Заказы</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {partners.map((u) => {
                  const orders = mockOrders.filter((o) => o.userId === u.id)
                  const status = u.partnerStatus ?? 'PENDING'
                  const currentPercent = rewardPercentAt(u)
                  const pending = pendingRewardChange(u)
                  return (
                    <tr key={u.id} className="hover:bg-bg-light transition-colors align-top">
                      <td className="px-4 py-3 min-w-40">
                        <p className="font-medium text-text-primary">{u.companyName || '—'}</p>
                        <p className="text-xs text-text-muted mt-0.5">анкета от {formatDate(u.createdAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusMark size="sm" color={PARTNER_STATUS_BAR[status]}>{PARTNER_STATUS_LABELS[status]}</StatusMark>
                        {currentPercent ? (
                          <p className="text-xs text-text-secondary mt-1.5 whitespace-nowrap">вознаграждение {formatPercent(currentPercent)}</p>
                        ) : null}
                        {pending && (
                          <p className="text-xs text-amber-700 mt-0.5 whitespace-nowrap">
                            с {formatDate(pending.from)} — {formatPercent(pending.percent)}
                          </p>
                        )}
                        {status === 'REJECTED' && u.rejectReason && (
                          <p className="text-xs text-red-700 mt-1.5 w-48 [overflow-wrap:anywhere]">Причина: {u.rejectReason}</p>
                        )}
                        {controls(u, false)}
                      </td>
                      <td className="px-4 py-3 text-text-secondary font-mono text-xs whitespace-nowrap">
                        <p>{u.inn || '—'}</p>
                        <p>{u.ogrn || '—'}</p>
                      </td>
                      <td className="px-4 py-3 text-text-secondary min-w-48">{u.pointAddress || '—'}</td>
                      <td className="px-4 py-3 text-text-secondary text-xs">
                        <p className="text-text-primary text-sm">{u.contactName || '—'}</p>
                        <p>{u.phone || '—'}</p>
                        <p>{u.email}</p>
                      </td>
                      <td className="px-4 py-3 text-text-secondary text-xs">
                        <p>{u.bankName || '—'}</p>
                        <p className="font-mono">БИК {u.bik || '—'}</p>
                        <p className="font-mono">р/с {u.account || '—'}</p>
                      </td>
                      <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                        <p className="text-text-primary">{orders.length}</p>
                        <p className="text-xs">оплачено {formatPrice(paidTotal(orders))}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}
    </div>
  )
}
