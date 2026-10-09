import { useEffect, useState } from 'react'
import { PageBar, Sheet } from '../../components/app/ui'
import { useIsDesktop } from '../../components/app/useIsDesktop'
import { FileText, Download, X, Shield, BookOpen, ScrollText, FileCheck, CreditCard, ShoppingBag } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockDocuments } from '../../data/documents'
import {
  userDocuments,
  isAgentDocument,
  agentPairs,
  pairReviewState,
  pairTitle,
  acceptPair,
  objectPair,
  type AgentPair,
} from '../../data/partnerDocuments'
import { formatDate } from '../../utils/calculate'
import { useDataRevision } from '../../utils/store'
import type { Document, DocumentType } from '../../types'

const typeLabels: Record<DocumentType, string> = {
  CONTRACT: 'Подтверждение акцепта оферты',
  REPORT: 'Отчёт агента',
  ACT: 'Акт об оказании услуг',
  OFFER: 'Агентский договор-оферта',
  SALE_OFFER: 'Оферта купли-продажи',
  PAYMENT: 'Условия оплаты и возврата',
  PRIVACY: 'Политика конфиденциальности',
  TERMS: 'Пользовательское соглашение',
}

/** Тип документа показываем, только если название его не повторяет */
function typeHint(doc: Document): string | null {
  const label = typeLabels[doc.type].toLowerCase()
  const title = doc.title.toLowerCase()
  const firstWord = label.split(' ')[0]
  return title.includes(label) || title.startsWith(firstWord) ? null : typeLabels[doc.type]
}

const typeIcons: Record<DocumentType, React.ComponentType<{ size: number; className: string }>> = {
  CONTRACT: FileCheck,
  ACT: FileText,
  REPORT: BookOpen,
  OFFER: ScrollText,
  SALE_OFFER: ShoppingBag,
  PRIVACY: Shield,
  TERMS: BookOpen,
  PAYMENT: CreditCard,
}

/** Имя файла — название документа как есть, только «/» (в номере акта) заменён на «-» */
const fileName = (title: string) => `${title.replace(/\//g, '-')}.txt`

function download(doc: Document) {
  const content = doc.content || `${doc.title}\n\nДата: ${formatDate(doc.createdAt)}\n\nДля получения оригинала обратитесь к менеджеру в чате.`
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = fileName(doc.title)
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const textBtn = 'text-primary text-sm font-medium bg-transparent border-none cursor-pointer hover:underline p-0'

/** Строка документа: название, тип или дата, «Читать» и «Скачать». На телефоне вся строка открывает документ */
function DocRow({ doc, onOpen, showDate = true }: { doc: Document; onOpen: (id: string) => void; showDate?: boolean }) {
  const Icon = typeIcons[doc.type]
  const meta = [typeHint(doc), showDate ? formatDate(doc.createdAt) : null].filter(Boolean).join(' · ')
  return (
    <div className="flex items-center gap-3 min-h-[56px]">
      <button
        type="button"
        className={`flex items-center gap-3 min-w-0 flex-1 text-left bg-transparent border-none p-0 ${doc.content ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={() => { if (doc.content) onOpen(doc.id) }}
        disabled={!doc.content}
      >
        <span className="w-8 flex items-center justify-center shrink-0">
          <Icon size={24} className="text-primary" />
        </span>
        <span className="min-w-0 flex flex-col gap-0.5">
          <span className="font-semibold text-[15px] lg:text-sm leading-snug text-text-primary break-words">{doc.title}</span>
          {meta && <span className="text-text-muted text-[13px] lg:text-xs leading-snug">{meta}</span>}
        </span>
      </button>
      <div className="flex items-center gap-4 shrink-0">
        {doc.content && (
          <button className={`hidden lg:inline ${textBtn}`} onClick={() => onOpen(doc.id)}>
            Читать
          </button>
        )}
        <button
          className="w-11 h-11 lg:w-auto lg:h-auto grid place-items-center lg:flex lg:items-center lg:gap-1.5 rounded-full bg-bg-light lg:bg-transparent text-primary text-sm font-medium border-none cursor-pointer lg:hover:underline p-0"
          onClick={() => download(doc)}
          aria-label={`Скачать: ${doc.title}`}
        >
          <Download size={18} />
          <span className="hidden lg:inline">Скачать</span>
        </button>
      </div>
    </div>
  )
}

const STALE = 'Решение по этим документам уже есть или ТехЭйджент их отозвал — данные на странице обновлены.'

/** Одно решение на отчёт и акт за период: Партнёр принимает их или направляет возражения (п. 7.5) */
function PairReview({ pair }: { pair: AgentPair }) {
  const [objecting, setObjecting] = useState(false)
  const [text, setText] = useState('')
  const state = pairReviewState(pair)
  const both = pair.docs.length > 1
  const what = pairTitle(pair)

  if (state.kind === 'ACCEPTED') {
    return <p className="text-[13px] lg:text-xs text-emerald-700">{both ? 'Приняты' : 'Принят'} {formatDate(state.at)}</p>
  }
  if (state.kind === 'DEEMED_ACCEPTED') {
    return (
      <p className="text-[13px] lg:text-xs leading-snug text-emerald-700">
        {both ? 'Считаются принятыми' : 'Считается принятым'}: возражений до {formatDate(state.deadline.toISOString())} не поступило
      </p>
    )
  }
  if (state.kind === 'OBJECTED') {
    return (
      <div className="text-[13px] lg:text-xs leading-snug">
        <p className="text-red-700">Возражения направлены {formatDate(state.at)}</p>
        <p className="text-text-secondary mt-1 whitespace-pre-wrap break-words border-l-2 border-red-200 pl-2">{state.text}</p>
      </div>
    )
  }

  const accept = () => {
    if (!confirm(`Принять ${what.charAt(0).toLowerCase()}${what.slice(1)}?`)) return
    if (!acceptPair(pair)) alert(STALE)
  }

  const sendObjection = () => {
    if (!text.trim()) return
    if (!objectPair(pair, text)) alert(STALE)
    setObjecting(false)
    setText('')
  }

  return (
    <div className="text-sm space-y-2">
      <p className="text-[13px] lg:text-xs leading-snug text-amber-700">
        <span className="font-semibold">Ждут вашего решения.</span> Возражения — до {formatDate(state.deadline.toISOString())}
      </p>
      {!objecting ? (
        <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 sm:flex-wrap">
          <button
            onClick={accept}
            className="min-h-[48px] sm:min-h-[36px] text-[15px] sm:text-xs bg-emerald-50 text-emerald-700 px-4 sm:px-3 rounded-xl sm:rounded-lg font-semibold sm:font-medium hover:bg-emerald-100 transition-colors border-none cursor-pointer"
          >
            {both ? 'Принять отчёт и акт' : 'Принять'}
          </button>
          <button
            onClick={() => setObjecting(true)}
            className="min-h-[48px] sm:min-h-[36px] text-[15px] sm:text-xs bg-red-50 text-red-700 px-4 sm:px-3 rounded-xl sm:rounded-lg font-semibold sm:font-medium hover:bg-red-100 transition-colors border-none cursor-pointer"
          >
            Направить возражения
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <label htmlFor={`obj-${pair.key}`} className="block text-xs font-medium text-text-secondary">
            Возражения{both ? ' по отчёту и акту' : ''}
          </label>
          <textarea
            id={`obj-${pair.key}`}
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-border bg-bg-light text-text-primary text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={sendObjection}
              disabled={!text.trim()}
              className="min-h-[44px] sm:min-h-[36px] text-[15px] sm:text-xs bg-primary text-white px-5 sm:px-3 rounded-xl sm:rounded-lg font-semibold sm:font-medium hover:bg-primary-dark transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Отправить
            </button>
            <button
              onClick={() => { setObjecting(false); setText('') }}
              className="min-h-[44px] text-[15px] sm:text-xs text-text-secondary bg-transparent border-none cursor-pointer hover:text-text-primary px-2"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/** Отчёт агента и акт за период — одной карточкой с одним решением */
function PairCard({ pair, onOpen }: { pair: AgentPair; onOpen: (id: string) => void }) {
  return (
    <div className="app-group p-4">
      <p className="font-semibold text-[15px] lg:text-sm leading-snug text-text-primary mb-2">
        {pairTitle(pair)}{' '}
        <span className="block lg:inline font-normal text-[13px] lg:text-sm text-text-muted mt-0.5 lg:mt-0">
          <span className="hidden lg:inline">· </span>{formatDate(pair.createdAt)}
        </span>
      </p>
      <div className="divide-y divide-border">
        {pair.docs.map((d) => (
          <DocRow key={d.id} doc={d} onOpen={onOpen} showDate={false} />
        ))}
      </div>
      <div className="mt-2 pt-3 border-t border-border lg:pl-14">
        <PairReview key={pair.key} pair={pair} />
      </div>
    </div>
  )
}

export default function DocumentsPage() {
  const { user } = useAuth()
  useDataRevision()
  const [openDoc, setOpenDoc] = useState<string | null>(null)
  const desktop = useIsDesktop()

  /* Окно документа закрывается по Esc (на телефоне это делает сама панель) */
  useEffect(() => {
    if (!openDoc || !desktop) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDoc(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openDoc, desktop])

  const pairs = user ? agentPairs(user.id) : []
  const waitingPairs = pairs.filter((p) => pairReviewState(p).kind === 'WAITING')
  const otherDocs = user ? userDocuments(user.id).filter((d) => !isAgentDocument(d)) : []
  const publicDocs = mockDocuments.filter((d) => d.userId === 'public')

  /* «Мои документы»: решённые отчёты с актами и прочие документы, новые сверху */
  const myItems = [
    ...pairs
      .filter((p) => pairReviewState(p).kind !== 'WAITING')
      .map((p) => ({ key: p.key, date: p.createdAt, pair: p as AgentPair | undefined, doc: undefined as Document | undefined })),
    ...otherDocs.map((d) => ({ key: d.id, date: d.createdAt, pair: undefined, doc: d as Document | undefined })),
  ].sort((a, b) => b.date.localeCompare(a.date))

  const activeDoc = [...publicDocs, ...otherDocs, ...pairs.flatMap((p) => p.docs)].find((d) => d.id === openDoc)
  const activePair = activeDoc ? pairs.find((p) => p.docs.some((d) => d.id === activeDoc.id)) : undefined

  return (
    <div className="max-w-3xl">
      <PageBar title="Документы" />

      {/* Ждут решения — сверху */}
      {waitingPairs.length > 0 && (
        <div className="mb-7">
          <h2 className="app-group-title !text-amber-800">Ждут решения: {waitingPairs.length}</h2>
          <div className="space-y-3">
            {waitingPairs.map((p) => (
              <PairCard key={p.key} pair={p} onOpen={setOpenDoc} />
            ))}
          </div>
        </div>
      )}

      {/* Документы партнёра */}
      <div className="mb-7">
        <h2 className="app-group-title">Мои документы</h2>
        {myItems.length === 0 ? (
          <div className="app-group p-8 text-center text-[15px] lg:text-sm text-text-muted">
            {waitingPairs.length > 0 ? 'Других документов пока нет.' : 'Документов пока нет.'}
          </div>
        ) : (
          <div className="space-y-3">
            {myItems.map((it) =>
              it.pair ? (
                <PairCard key={it.key} pair={it.pair} onOpen={setOpenDoc} />
              ) : it.doc ? (
                <div key={it.key} className="app-group px-4 py-2">
                  <DocRow doc={it.doc} onOpen={setOpenDoc} />
                </div>
              ) : null,
            )}
          </div>
        )}
      </div>

      {/* Документы платформы */}
      <div>
        <h2 className="app-group-title">Документы платформы</h2>
        <div className="app-group divide-y divide-border">
          {publicDocs.map((doc) => (
            <div key={doc.id} className="px-4 py-2">
              <DocRow doc={doc} onOpen={setOpenDoc} showDate={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Документ на телефоне — в панели снизу */}
      {!desktop && (
        <Sheet open={Boolean(activeDoc?.content)} onClose={() => setOpenDoc(null)} title={activeDoc?.title ?? ''}>
          {activeDoc && (
            <>
              {typeHint(activeDoc) && <p className="text-[13px] text-text-muted -mt-1 mb-3">{typeHint(activeDoc)}</p>}
              <pre className="whitespace-pre-wrap break-words font-sans text-[15px] text-text-secondary leading-relaxed m-0">
                {activeDoc.content}
              </pre>
              {activePair && activePair.userId === user?.id && (
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-[13px] text-text-muted mb-2">{pairTitle(activePair)}</p>
                  <PairReview key={activePair.key} pair={activePair} />
                </div>
              )}
            </>
          )}
        </Sheet>
      )}

      {/* Окно документа на компьютере */}
      {desktop && activeDoc && activeDoc.content && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-start justify-center pt-12 px-4"
          onClick={() => setOpenDoc(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="doc-dialog-title"
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 p-5 border-b border-gray-100">
              <div className="min-w-0">
                <h3 id="doc-dialog-title" className="font-bold text-lg text-text-primary break-words">{activeDoc.title}</h3>
                {typeHint(activeDoc) && <p className="text-xs text-text-muted mt-0.5">{typeHint(activeDoc)}</p>}
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200 transition-colors shrink-0"
                onClick={() => setOpenDoc(null)}
                aria-label="Закрыть"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <pre className="whitespace-pre-wrap break-words font-sans text-sm text-text-secondary leading-relaxed">
                {activeDoc.content}
              </pre>
              {activePair && activePair.userId === user?.id && (
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-xs text-text-muted mb-2">{pairTitle(activePair)}</p>
                  <PairReview key={activePair.key} pair={activePair} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
