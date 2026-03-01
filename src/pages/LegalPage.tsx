import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { X, Shield, ScrollText, BookOpen, FileCheck } from 'lucide-react'
import { mockDocuments } from '../data/mock'

const typeLabels: Record<string, string> = {
  OFFER: 'Публичная оферта',
  PRIVACY: 'Политика конфиденциальности',
  TERMS: 'Пользовательское соглашение',
  CONTRACT: 'Типовой договор',
}

const typeIcons: Record<string, typeof Shield> = {
  OFFER: ScrollText,
  PRIVACY: Shield,
  TERMS: BookOpen,
  CONTRACT: FileCheck,
}

const typeColors: Record<string, string> = {
  OFFER: 'bg-orange-500/10 text-orange-600',
  PRIVACY: 'bg-emerald-500/10 text-emerald-600',
  TERMS: 'bg-indigo-500/10 text-indigo-600',
  CONTRACT: 'bg-blue-500/10 text-blue-600',
}

export default function LegalPage() {
  const { docType } = useParams<{ docType?: string }>()
  const publicDocs = mockDocuments.filter(d => d.userId === 'public')
  const [openDoc, setOpenDoc] = useState<string | null>(null)

  // Auto-open document if docType is in URL
  useEffect(() => {
    if (docType) {
      const typeMap: Record<string, string> = { offer: 'OFFER', privacy: 'PRIVACY', terms: 'TERMS', contract: 'CONTRACT' }
      const targetType = typeMap[docType.toLowerCase()]
      if (targetType) {
        const doc = publicDocs.find(d => d.type === targetType)
        if (doc) setOpenDoc(doc.id)
      }
    }
  }, [docType])

  const activeDoc = mockDocuments.find(d => d.id === openDoc)

  return (
    <div className="min-h-[80vh] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Правовая информация</h1>
          <p className="text-text-muted">Документы платформы TechAgent</p>
        </div>

        <div className="space-y-3">
          {publicDocs.map(doc => {
            const Icon = typeIcons[doc.type] || Shield
            return (
              <div
                key={doc.id}
                className="card-glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
                onClick={() => doc.content && setOpenDoc(doc.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{doc.title}</div>
                    <div className="text-sm text-text-muted mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[doc.type] || ''}`}>
                        {typeLabels[doc.type] || doc.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-primary text-sm font-semibold bg-transparent border-none cursor-pointer hover:underline">
                  Читать →
                </button>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold">
            Зарегистрироваться
          </Link>
        </div>
      </div>

      {/* Document viewer modal */}
      {activeDoc && activeDoc.content && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-4 sm:pt-12 px-2 sm:px-4"
          onClick={() => setOpenDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-hidden shadow-2xl mx-2"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-lg text-text-primary">{activeDoc.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[activeDoc.type] || ''}`}>
                  {typeLabels[activeDoc.type] || activeDoc.type}
                </span>
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200 transition-colors"
                onClick={() => setOpenDoc(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              <pre className="whitespace-pre-wrap font-sans text-sm text-text-secondary leading-relaxed break-words overflow-wrap-anywhere">
                {activeDoc.content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
