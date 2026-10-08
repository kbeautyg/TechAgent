import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { mockOrders, mockUsers, DEMO_MODE } from '../../data/mock'
import {
  agentPairs,
  canRevoke,
  deductions,
  generateAgentDocuments,
  pairReviewState,
  pairTitle,
  reportableOrders,
  revokePair,
  type AgentPair,
  type ReviewState,
} from '../../data/partnerDocuments'
import { formatDate, formatPrice, periodLabel, periodOf } from '../../utils/calculate'
import { useDataRevision } from '../../utils/store'
import type { Document, User } from '../../types'

/** Последние 12 месяцев, начиная с текущего */
function monthOptions(now: Date): string[] {
  const list: string[] = []
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    list.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return list
}

function reviewText(state: ReviewState): string {
  switch (state.kind) {
    case 'WAITING':
      return `Ждут решения партнёра · возражения — до ${formatDate(state.deadline.toISOString())}`
    case 'ACCEPTED':
      return `Приняты партнёром ${formatDate(state.at)}`
    case 'OBJECTED':
      return `Возражения от ${formatDate(state.at)}`
    case 'DEEMED_ACCEPTED':
      return `Считаются принятыми: возражений до ${formatDate(state.deadline.toISOString())} не поступило`
  }
}

const reviewColor: Record<ReviewState['kind'], string> = {
  WAITING: 'text-amber-700',
  ACCEPTED: 'text-emerald-700',
  OBJECTED: 'text-red-700',
  DEEMED_ACCEPTED: 'text-emerald-700',
}

const nameOf = (u?: User) => u?.companyName || u?.email || '—'

/** Отчёт и акт за период: ссылки на документы, решение партнёра, возражения, отзыв */
function PairStatus({
  pair,
  onOpen,
  onRevoke,
}: {
  pair: AgentPair
  onOpen: (d: Document) => void
  onRevoke: (p: AgentPair) => void
}) {
  const state = pairReviewState(pair)
  return (
    <div className="text-sm min-w-0">
      <div className="flex flex-col gap-0.5">
        {pair.docs.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => onOpen(d)}
            className="text-primary font-medium bg-transparent border-none cursor-pointer p-0 hover:underline text-left"
          >
            {d.title}
          </button>
        ))}
      </div>
      <p className={`text-xs mt-1 ${reviewColor[state.kind]}`}>{reviewText(state)}</p>
      {state.kind === 'OBJECTED' && (
        <p className="text-xs text-text-secondary mt-1 whitespace-pre-wrap [overflow-wrap:anywhere] border-l-2 border-red-200 pl-2 text-left">
          {state.text}
        </p>
      )}
      {canRevoke(pair) && (
        <button
          type="button"
          onClick={() => onRevoke(pair)}
          className="mt-2 text-xs bg-red-50 text-red-700 px-2 py-1 rounded font-medium hover:bg-red-100 transition-colors border-none cursor-pointer"
        >
          Отозвать отчёт и акт
        </button>
      )}
    </div>
  )
}

export default function AdminReportsPage() {
  useDataRevision()
  const now = new Date()
  const currentPeriod = periodOf(now.toISOString())
  const months = monthOptions(now)
  const [period, setPeriod] = useState(months[1])
  const [openDoc, setOpenDoc] = useState<Document | null>(null)
  const [message, setMessage] = useState('')

  /* Окно документа закрывается по Esc */
  useEffect(() => {
    if (!openDoc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDoc(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openDoc])

  // Месяц должен закончиться (п. 7.4). В демо-режиме можно сформировать и за текущий — чтобы пройти сценарий целиком
  const monthOpen = period === currentPeriod
  const canGenerateNow = !monthOpen || DEMO_MODE

  const allPairs = agentPairs()

  const partners = mockUsers
    .filter((u) => u.role === 'CLIENT')
    .map((u) => {
      const orders = reportableOrders(mockOrders, u.id, period)
      const pair = allPairs.find((p) => p.userId === u.id && p.period === period)
      return { u, orders, pair, debt: deductions(mockOrders, u.id).debt }
    })
    .filter(({ u, orders, pair }) => u.partnerStatus === 'VERIFIED' || orders.length > 0 || pair !== undefined)
    .sort((a, b) => b.orders.length - a.orders.length)

  const generate = (userId: string) => {
    const partner = mockUsers.find((u) => u.id === userId)
    if (!partner) return
    const res = generateAgentDocuments(partner, period, mockOrders)
    const name = nameOf(partner)
    if (res.status === 'created') setMessage(`Отчёт агента и акт за ${periodLabel(period)} сформированы: ${name}.`)
    else if (res.status === 'exists') setMessage(`За ${periodLabel(period)} документы ${name} уже сформированы.`)
    else setMessage(`За ${periodLabel(period)} у ${name} нет выданных заказов с загруженным актом.`)
  }

  const revoke = (pair: AgentPair) => {
    const name = nameOf(mockUsers.find((u) => u.id === pair.userId))
    const what = pairTitle(pair)
    if (
      !confirm(
        `Отозвать ${what.charAt(0).toLowerCase()}${what.slice(1)} (${name})? Документы пропадут из кабинета партнёра; ` +
          'после исправления данных их можно сформировать заново.',
      )
    )
      return
    if (revokePair(pair)) setMessage(`${what} отозваны: ${name}. За этот месяц документы можно сформировать заново.`)
    else alert('Партнёр уже принял эти документы — отозвать их нельзя. Данные на странице обновлены.')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Отчёты агентов</h1>
      <p className="text-sm text-text-secondary mb-6">
        В отчёт агента и акт входят заказы, выданные покупателям в выбранном месяце, по которым загружен подписанный акт
        приёма-передачи, а также удержания по заказам, возвращённым после выдачи (п. 7.3).
      </p>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <label htmlFor="period" className="text-sm font-medium text-text-secondary">Месяц</label>
        <select
          id="period"
          value={period}
          onChange={(e) => { setPeriod(e.target.value); setMessage('') }}
          className="px-3 py-2 rounded-lg border border-border bg-white text-text-primary text-sm"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {periodLabel(m)}{m === currentPeriod ? ' (текущий)' : ''}
            </option>
          ))}
        </select>
      </div>
      {monthOpen && (
        <p className="text-xs text-text-muted mb-4">
          {DEMO_MODE
            ? 'Месяц ещё не закончился. В демо-режиме документы можно сформировать и за него.'
            : 'Месяц ещё не закончился — отчёт и акт формируются по его окончании.'}
        </p>
      )}
      {message && (
        <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">{message}</p>
      )}

      {partners.length === 0 ? (
        <div className="card p-8 text-center text-text-muted mb-8">Подтверждённых партнёров пока нет</div>
      ) : (
        <div className="card divide-y divide-border mb-8">
          {partners.map(({ u, orders, pair, debt }) => {
            const goods = orders.reduce((s, o) => s + o.price, 0)
            const reward = orders.reduce((s, o) => s + (o.partnerReward ?? 0), 0)
            return (
              <div key={u.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-text-primary">{nameOf(u)}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {orders.length > 0
                      ? `Выдано с актом: ${orders.length} · товары ${formatPrice(goods)} · вознаграждение ${formatPrice(reward)}`
                      : 'Выданных заказов с актом нет'}
                  </p>
                  {debt > 0 && !pair && (
                    <p className="text-xs text-amber-700 mt-0.5">
                      К удержанию по возвратам: {'\u2212'}{formatPrice(debt)}
                      {orders.length === 0 ? ' — удержится в отчёте за месяц с выданными заказами' : ''}
                    </p>
                  )}
                </div>
                <div className="sm:max-w-[55%] space-y-2">
                  {pair ? (
                    <PairStatus pair={pair} onOpen={setOpenDoc} onRevoke={revoke} />
                  ) : orders.length > 0 ? (
                    <button
                      onClick={() => generate(u.id)}
                      disabled={!canGenerateNow}
                      className="text-sm bg-primary/10 text-primary px-3 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Сформировать отчёт и акт за {periodLabel(period)}
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <h2 className="font-bold text-lg text-text-primary mb-4">Сформированные документы</h2>
      {allPairs.length === 0 ? (
        <div className="card p-8 text-center text-text-muted">Документов пока нет</div>
      ) : (
        <div className="card divide-y divide-border">
          {allPairs.map((p) => (
            <div key={p.key} className="px-5 py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
              <PairStatus pair={p} onOpen={setOpenDoc} onRevoke={revoke} />
              <p className="text-xs text-text-muted sm:text-right shrink-0">
                {nameOf(mockUsers.find((u) => u.id === p.userId))} · {formatDate(p.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}

      {openDoc && openDoc.content && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-start justify-center pt-12 px-4"
          onClick={() => setOpenDoc(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-doc-title"
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 p-5 border-b border-gray-100">
              <h3 id="admin-doc-title" className="font-bold text-lg text-text-primary break-words min-w-0">{openDoc.title}</h3>
              <button
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200 transition-colors shrink-0"
                onClick={() => setOpenDoc(null)}
                aria-label="Закрыть"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <pre className="whitespace-pre-wrap break-words font-sans text-sm text-text-secondary leading-relaxed">{openDoc.content}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
