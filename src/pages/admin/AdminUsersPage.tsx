import { useState } from 'react'
import { mockUsers, mockOrders, updateUser, scheduleRewardChange, REWARD_CHANGE_NOTICE_DAYS } from '../../data/mock'
import { formatDate, formatPercent, formatPrice, paidTotal, rewardPercentAt, pendingRewardChange } from '../../utils/calculate'
import { PARTNER_STATUS_LABELS, PARTNER_STATUS_COLORS } from '../../utils/status'
import { useDataRevision } from '../../utils/store'
import type { User } from '../../types'
import PartnerInvite from './PartnerInvite'

/** Границы размера вознаграждения, % цены товара */
const MIN_PERCENT = 0.1
const MAX_PERCENT = 99

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-text-primary">Партнёры</h1>
        <span className="text-text-muted text-sm">
          {partners.length} всего{pendingCount > 0 && ` · ${pendingCount} на проверке`}
        </span>
      </div>

      <PartnerInvite />

      {partners.length === 0 ? (
        <div className="card p-8 text-center text-text-muted">Партнёров пока нет</div>
      ) : (
        <div className="card overflow-hidden">
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
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${PARTNER_STATUS_COLORS[status]}`}>
                          {PARTNER_STATUS_LABELS[status]}
                        </span>
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
                        <label className="flex items-center gap-1.5 mt-2 text-xs text-text-muted whitespace-nowrap">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={percents[u.id] ?? ''}
                            onChange={(e) => setPercents((p) => ({ ...p, [u.id]: e.target.value }))}
                            className="w-14 px-2 py-1 rounded border border-border bg-white text-text-primary text-xs"
                            aria-label="Вознаграждение, %"
                          />
                          % от цены товара
                        </label>
                        {status === 'VERIFIED' && (
                          <>
                            <button
                              onClick={() => changePercent(u)}
                              className="mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium hover:bg-primary/20 transition-colors border-none cursor-pointer whitespace-nowrap"
                            >
                              Изменить размер
                            </button>
                            <p className="text-xs text-text-muted mt-1 max-w-48">
                              Новый размер — для заказов через {REWARD_CHANGE_NOTICE_DAYS} дней после изменения
                            </p>
                          </>
                        )}
                        <div className="flex gap-2 mt-2">
                          {status !== 'VERIFIED' && (
                            <button
                              onClick={() => verify(u)}
                              className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium hover:bg-emerald-100 transition-colors border-none cursor-pointer whitespace-nowrap"
                            >
                              Подтвердить
                            </button>
                          )}
                          {status !== 'REJECTED' && (
                            <button
                              onClick={() => reject(u)}
                              className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded font-medium hover:bg-red-100 transition-colors border-none cursor-pointer whitespace-nowrap"
                            >
                              Отклонить
                            </button>
                          )}
                        </div>
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
      )}
    </div>
  )
}
