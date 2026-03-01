import { useState } from 'react'
import { FileText, Download, X, Shield, BookOpen, ScrollText, FileCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockDocuments } from '../../data/mock'
import { formatDate } from '../../utils/calculate'
import type { DocumentType } from '../../types'

const typeLabels: Record<DocumentType, string> = {
  CONTRACT: 'Договор',
  ACT: 'Акт',
  REPORT: 'Отчёт',
  OFFER: 'Оферта',
  PRIVACY: 'Конфиденциальность',
  TERMS: 'Соглашение',
}

const typeColors: Record<DocumentType, string> = {
  CONTRACT: 'bg-blue-500/10 text-blue-600',
  ACT: 'bg-green-500/10 text-green-600',
  REPORT: 'bg-purple-500/10 text-purple-600',
  OFFER: 'bg-orange-500/10 text-orange-600',
  PRIVACY: 'bg-emerald-500/10 text-emerald-600',
  TERMS: 'bg-indigo-500/10 text-indigo-600',
}

const typeIcons: Record<DocumentType, React.ComponentType<{ size: number; className: string }>> = {
  CONTRACT: FileCheck,
  ACT: FileText,
  REPORT: BookOpen,
  OFFER: ScrollText,
  PRIVACY: Shield,
  TERMS: BookOpen,
}

export default function DocumentsPage() {
  const { user } = useAuth()
  const [openDoc, setOpenDoc] = useState<string | null>(null)

  const userDocs = mockDocuments.filter((d) => d.userId === user?.id)
  const publicDocs = mockDocuments.filter((d) => d.userId === 'public')
  const activeDoc = mockDocuments.find((d) => d.id === openDoc)

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
                onClick={() => doc.content && setOpenDoc(doc.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-text-primary">{doc.title}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[doc.type]}`}
                      >
                        {typeLabels[doc.type]}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs mt-0.5">{formatDate(doc.createdAt)}</p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1.5 text-primary text-sm font-medium bg-transparent border-none cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation()
                    doc.content && setOpenDoc(doc.id)
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
            Документов пока нет. Они появятся после оформления первого заказа.
          </div>
        ) : (
          <div className="space-y-2">
            {userDocs.map((doc) => {
              const Icon = typeIcons[doc.type]
              return (
                <div
                  key={doc.id}
                  className="card p-4 flex items-center justify-between hover:bg-bg-light transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-text-primary">{doc.title}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[doc.type]}`}
                        >
                          {typeLabels[doc.type]}
                        </span>
                      </div>
                      <p className="text-text-muted text-xs mt-0.5">{formatDate(doc.createdAt)}</p>
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-1.5 text-primary text-sm font-medium bg-transparent border-none cursor-pointer hover:underline"
                    onClick={() => {
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
              )
            })}
          </div>
        )}
      </div>

      {/* Document viewer modal */}
      {activeDoc && activeDoc.content && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-12 px-4"
          onClick={() => setOpenDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-lg text-text-primary">{activeDoc.title}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[activeDoc.type]}`}
                >
                  {typeLabels[activeDoc.type]}
                </span>
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200 transition-colors"
                onClick={() => setOpenDoc(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <pre className="whitespace-pre-wrap font-sans text-sm text-text-secondary leading-relaxed">
                {activeDoc.content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
