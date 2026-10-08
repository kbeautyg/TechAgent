import { useState } from 'react'
import { X } from 'lucide-react'
import { mockOrders, mockUsers, DEMO_MODE } from '../../data/mock'
import {
  allAgentDocuments,
  agentDocumentsFor,
  generateAgentDocuments,
  reportableOrders,
  reviewState,
  type ReviewState,
} from '../../data/partnerDocuments'
import { formatDate, formatPrice, periodLabel, periodOf } from '../../utils/calculate'
import type { Document } from '../../types'

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
      return `Ждёт решения партнёра · возражения — до ${formatDate(state.deadline.toISOString())}`
    case 'ACCEPTED':
      return `Принят партнёром ${formatDate(state.at)}`
    case 'OBJECTED':
      return `Возражения от ${formatDate(state.at)}`
    case 'DEEMED_ACCEPTED':
      return `Считается принятым: возражений до ${formatDate(state.deadline.toISOString())} не поступило`
  }
}

const reviewColor: Record<ReviewState['kind'], string> = {
  WAITING: 'text-amber-700',
  ACCEPTED: 'text-emerald-700',
  OBJECTED: 'text-red-700',
  DEEMED_ACCEPTED: 'text-emerald-700',
}

function DocStatus({ doc, onOpen }: { doc: Document; onOpen: (d: Document) => void }) {
  const state = reviewState(doc)
  return (
    <div className="text-sm">
      <button
        type="button"
        onClick={() => onOpen(doc)}
        className="text-primary font-medium bg-transparent border-none cursor-pointer p-0 hover:underline text-left"
      >
        {doc.title}
      </button>
      <p className={`text-xs mt-0.5 ${reviewColor[state.kind]}`}>{reviewText(state)}</p>
      {state.kind === 'OBJECTED' && (
        <p className="text-xs text-text-secondary mt-1 whitespace-pre-wrap break-words border-l-2 border-red-200 pl-2">{state.text}</p>
      )}
    </div>
  )
}

export default function AdminReportsPage() {
  const now = new Date()
  const currentPeriod = periodOf(now.toISOString())
  const months = monthOptions(now)
  const [period, setPeriod] = useState(months[1])
  const [, setRefresh] = useState(0)
  const [openDoc, setOpenDoc] = useState<Document | null>(null)
  const [message, setMessage] = useState('')

  // Месяц должен закончиться (п. 7.4). В демо-режиме можно сформировать и за текущий — чтобы пройти сценарий целиком
  const monthOpen = period === currentPeriod
  const canGenerateNow = !monthOpen || DEMO_MODE

  const partners = mockUsers
    .filter((u) => u.role === 'CLIENT')
    .map((u) => {
      const orders = reportableOrders(mockOrders, u.id, period)
      const docs = agentDocumentsFor(u.id, period)
      return { u, orders, docs }
    })
    .filter(({ u, orders, docs }) => u.partnerStatus === 'VERIFIED' || orders.length > 0 || docs.length > 0)
    .sort((a, b) => b.orders.length - a.orders.length)

  const history = allAgentDocuments()

  const generate = (userId: string) => {
    const partner = mockUsers.find((u) => u.id === userId)
    if (!partner) return
    const res = generateAgentDocuments(partner, period, mockOrders)
    const name = partner.companyName || partner.email
    if (res.status === 'created') setMessage(`Отчёт агента и акт за ${periodLabel(period)} сформированы: ${name}.`)
    else if (res.status === 'exists') setMessage(`За ${periodLabel(period)} документы ${name} уже сформированы.`)
    else setMessage(`За ${periodLabel(period)} у ${name} нет выданных заказов с загруженным актом.`)
    setRefresh((k) => k + 1)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Отчёты агентов</h1>
      <p className="text-sm text-text-secondary mb-6">
        В отчёт агента и акт входят заказы, выданные покупателям в выбранном месяце, по которым загружен подписанный акт
        приёма-передачи.
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
          {partners.map(({ u, orders, docs }) => {
            const goods = orders.reduce((s, o) => s + o.price, 0)
            const reward = orders.reduce((s, o) => s + (o.partnerReward ?? 0), 0)
            return (
              <div key={u.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-text-primary">{u.companyName || u.email}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {orders.length > 0
                      ? `Выдано с актом: ${orders.length} · товары ${formatPrice(goods)} · вознаграждение ${formatPrice(reward)}`
                      : 'Выданных заказов с актом нет'}
                  </p>
                </div>
                <div className="sm:text-right sm:max-w-[55%] space-y-2">
                  {docs.length > 0 ? (
                    docs.map((d) => <DocStatus key={d.id} doc={d} onOpen={setOpenDoc} />)
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
      {history.length === 0 ? (
        <div className="card p-8 text-center text-text-muted">Документов пока нет</div>
      ) : (
        <div className="card divide-y divide-border">
          {history.map((d) => {
            const partner = mockUsers.find((u) => u.id === d.userId)
            return (
              <div key={d.id} className="px-5 py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                <DocStatus doc={d} onOpen={setOpenDoc} />
                <p className="text-xs text-text-muted sm:text-right shrink-0">
                  {partner?.companyName || partner?.email || '—'} · {formatDate(d.createdAt)}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {openDoc && openDoc.content && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-start justify-center pt-12 px-4"
          onClick={() => setOpenDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-text-primary">{openDoc.title}</h3>
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
