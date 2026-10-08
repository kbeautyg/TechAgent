import { useState } from 'react'
import { FileText, Download, X, Shield, BookOpen, ScrollText, FileCheck, CreditCard, ShoppingBag } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockDocuments } from '../../data/documents'
import {
  userDocuments,
  isAgentDocument,
  reviewState,
  acceptDocument,
  objectDocument,
} from '../../data/partnerDocuments'
import { formatDate } from '../../utils/calculate'
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

/** Принятие отчёта агента и акта или возражения (оферта, п. 7.5) */
function ReviewBlock({ doc, onChange }: { doc: Document; onChange: () => void }) {
  const [objecting, setObjecting] = useState(false)
  const [text, setText] = useState('')
  const state = reviewState(doc)
  const what = doc.type === 'REPORT' ? 'отчёт агента' : 'акт'

  if (state.kind === 'ACCEPTED') {
    return <p className="text-xs text-emerald-700">Принят {formatDate(state.at)}</p>
  }
  if (state.kind === 'DEEMED_ACCEPTED') {
    return (
      <p className="text-xs text-emerald-700">
        Считается принятым: возражений до {formatDate(state.deadline.toISOString())} не поступило
      </p>
    )
  }
  if (state.kind === 'OBJECTED') {
    return (
      <div className="text-xs">
        <p className="text-red-700">Возражения направлены {formatDate(state.at)}</p>
        <p className="text-text-secondary mt-1 whitespace-pre-wrap break-words border-l-2 border-red-200 pl-2">{state.text}</p>
      </div>
    )
  }

  const accept = () => {
    if (!confirm(`Принять ${what} «${doc.title}»?`)) return
    acceptDocument(doc.id)
    onChange()
  }

  const sendObjection = () => {
    if (!text.trim()) return
    objectDocument(doc.id, text)
    setObjecting(false)
    setText('')
    onChange()
  }

  return (
    <div className="text-sm space-y-2">
      <p className="text-xs text-amber-700">
        <span className="font-semibold">Ждёт вашего решения.</span> Возражения — до {formatDate(state.deadline.toISOString())}
      </p>
      {!objecting ? (
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={accept}
            className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-100 transition-colors border-none cursor-pointer"
          >
            Принять
          </button>
          <button
            onClick={() => setObjecting(true)}
            className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors border-none cursor-pointer"
          >
            Направить возражения
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <label htmlFor={`obj-${doc.id}`} className="block text-xs font-medium text-text-secondary">Возражения</label>
          <textarea
            id={`obj-${doc.id}`}
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-bg-light text-text-primary text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={sendObjection}
              disabled={!text.trim()}
              className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg font-medium hover:bg-primary-dark transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Отправить
            </button>
            <button
              onClick={() => { setObjecting(false); setText('') }}
              className="text-xs text-text-secondary bg-transparent border-none cursor-pointer hover:text-text-primary"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DocumentsPage() {
  const { user } = useAuth()
  const [openDoc, setOpenDoc] = useState<string | null>(null)
  const [, setRefresh] = useState(0)
  const refresh = () => setRefresh((k) => k + 1)

  const userDocs = user ? userDocuments(user.id) : []
  const publicDocs = mockDocuments.filter((d) => d.userId === 'public')
  const activeDoc = [...publicDocs, ...userDocs].find((d) => d.id === openDoc)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Документы</h1>

      {/* Platform documents */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-text-secondary mb-3 flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          Документы платформы
        </h2>
        <div className="space-y-2">
          {publicDocs.map((doc) => {
            const Icon = typeIcons[doc.type]
            return (
              <div
                key={doc.id}
                className="card p-4 flex items-center justify-between hover:bg-bg-light transition-colors cursor-pointer"
                onClick={() => { if (doc.content) setOpenDoc(doc.id) }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-text-primary">{doc.title}</span>
                    </div>
                    {typeHint(doc) && <p className="text-text-muted text-xs mt-0.5">{typeHint(doc)}</p>}
                  </div>
                </div>
                <button
                  className="flex items-center gap-1.5 text-primary text-sm font-medium bg-transparent border-none cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (doc.content) setOpenDoc(doc.id)
                  }}
                >
                  Читать
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* User documents */}
      <div>
        <h2 className="text-base font-bold text-text-secondary mb-3 flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          Мои документы
        </h2>
        {userDocs.length === 0 ? (
          <div className="card p-8 text-center text-text-muted">
            Документов пока нет.
          </div>
        ) : (
          <div className="space-y-2">
            {userDocs.map((doc) => {
              const Icon = typeIcons[doc.type]
              return (
                <div key={doc.id} className="card p-4">
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${doc.content ? 'cursor-pointer' : ''}`}
                    onClick={() => { if (doc.content) setOpenDoc(doc.id) }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-sm text-text-primary break-words">{doc.title}</span>
                        <p className="text-text-muted text-xs mt-0.5">{[typeHint(doc), formatDate(doc.createdAt)].filter(Boolean).join(' · ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0 pl-13 sm:pl-0">
                      {doc.content && (
                        <button
                          className="text-primary text-sm font-medium bg-transparent border-none cursor-pointer hover:underline p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenDoc(doc.id)
                          }}
                        >
                          Читать
                        </button>
                      )}
                      <button
                        className="flex items-center gap-1.5 text-primary text-sm font-medium bg-transparent border-none cursor-pointer hover:underline p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          const content = doc.content || `${doc.title}\n\nДата: ${formatDate(doc.createdAt)}\n\nДля получения оригинала обратитесь к менеджеру в чате.`
                          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `${doc.title.replace(/[^\w\sа-яА-ЯёЁ-]/g, '')}.txt`
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                      >
                        <Download size={16} />
                        Скачать
                      </button>
                    </div>
                  </div>
                  {isAgentDocument(doc) && (
                    <div className="mt-3 pt-3 border-t border-border sm:pl-13">
                      <ReviewBlock doc={doc} onChange={refresh} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Document viewer modal */}
      {activeDoc && activeDoc.content && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-start justify-center pt-12 px-4"
          onClick={() => setOpenDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-lg text-text-primary">{activeDoc.title}</h3>
                {typeHint(activeDoc) && <p className="text-xs text-text-muted mt-0.5">{typeHint(activeDoc)}</p>}
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200 transition-colors"
                onClick={() => setOpenDoc(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <pre className="whitespace-pre-wrap break-words font-sans text-sm text-text-secondary leading-relaxed">
                {activeDoc.content}
              </pre>
              {isAgentDocument(activeDoc) && activeDoc.userId === user?.id && (
                <div className="mt-5 pt-4 border-t border-border">
                  <ReviewBlock doc={activeDoc} onChange={refresh} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
