import { useParams, Link, useNavigate } from 'react-router-dom'
import { X, Shield, ScrollText, BookOpen, FileCheck, CreditCard, ShoppingBag, ChevronRight } from 'lucide-react'
import { mockDocuments } from '../data/documents'

const typeLabels: Record<string, string> = {
  OFFER: 'Для партнёров',
  SALE_OFFER: 'Для покупателей',
  PRIVACY: 'Для всех',
  TERMS: 'Для всех',
  CONTRACT: 'Типовой договор',
  PAYMENT: 'Для покупателей',
}

const typeIcons: Record<string, typeof Shield> = {
  OFFER: ScrollText,
  SALE_OFFER: ShoppingBag,
  PRIVACY: Shield,
  TERMS: BookOpen,
  CONTRACT: FileCheck,
  PAYMENT: CreditCard,
}

const typeColors: Record<string, string> = {
  OFFER: 'bg-orange-500/10 text-orange-600',
  SALE_OFFER: 'bg-sky-500/10 text-sky-600',
  PRIVACY: 'bg-emerald-500/10 text-emerald-600',
  TERMS: 'bg-indigo-500/10 text-indigo-600',
  CONTRACT: 'bg-blue-500/10 text-blue-600',
  PAYMENT: 'bg-sky-500/10 text-sky-600',
}

const docTypeMap: Record<string, string> = {
  offer: 'OFFER',
  'sale-offer': 'SALE_OFFER',
  privacy: 'PRIVACY',
  terms: 'TERMS',
  payment: 'PAYMENT',
}

/** Адрес документа: /legal/<slug> */
const slugByType: Record<string, string> = Object.fromEntries(Object.entries(docTypeMap).map(([slug, type]) => [type, slug]))

function docIdFromParam(docType: string | undefined): string | null {
  if (!docType) return null
  const targetType = docTypeMap[docType.toLowerCase()]
  if (!targetType) return null
  const doc = mockDocuments.find(d => d.userId === 'public' && d.type === targetType)
  return doc ? doc.id : null
}

export default function LegalPage() {
  const { docType } = useParams<{ docType?: string }>()
  const navigate = useNavigate()
  const publicDocs = mockDocuments.filter(d => d.userId === 'public')
  /* Открытый документ определяется адресом: текст попадает в пререндеренный HTML, у каждого документа своя ссылка */
  const openDoc = docIdFromParam(docType)
  const activeDoc = mockDocuments.find(d => d.id === openDoc)
  const closeDoc = () => navigate('/legal')

  return (
    <div className="min-h-[80vh] pt-6 pb-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-left sm:text-center mb-6 sm:mb-10">
          <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-primary" />
          </div>
          <h1 className="text-[28px] sm:text-3xl font-bold leading-tight text-text-primary mb-2">{activeDoc ? activeDoc.title : 'Правовая информация'}</h1>
          <p className="text-text-secondary text-base leading-relaxed">Продавец товаров на techagent.pro — ООО&nbsp;«ТехЭйджент»</p>
        </div>

        <div className="space-y-3">
          {publicDocs.map(doc => {
            const Icon = typeIcons[doc.type] || Shield
            return (
              <Link
                key={doc.id}
                to={`/legal/${slugByType[doc.type]}`}
                className="card-glass rounded-[20px] sm:rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all no-underline"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-base leading-snug text-text-primary">{doc.title}</div>
                    <div className="text-sm text-text-muted mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[doc.type] || ''}`}>
                        {typeLabels[doc.type] || doc.type}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline text-primary text-sm font-semibold whitespace-nowrap">Читать →</span>
                <ChevronRight size={22} className="sm:hidden text-text-muted shrink-0" />
              </Link>
            )
          })}
        </div>

        <div className="sm:text-center mt-8 sm:mt-10">
          <Link to="/register" className="btn-primary flex sm:inline-flex items-center justify-center gap-2 px-8 min-h-[54px] rounded-xl font-semibold">
            Стать партнёром
          </Link>
        </div>
      </div>

      {/* Document viewer modal */}
      {activeDoc && activeDoc.content && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] flex items-stretch sm:items-center justify-center sm:p-4"
          onClick={closeDoc}
        >
          <div
            className="legal-viewer bg-white sm:rounded-2xl max-w-2xl w-full shadow-2xl sm:mx-2 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 p-4 sm:p-5 pt-[max(16px,env(safe-area-inset-top))] sm:pt-5 border-b border-gray-100 flex-shrink-0">
              <div className="min-w-0">
                <h3 className="h-sans font-bold text-lg leading-snug text-text-primary mb-1">{activeDoc.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[activeDoc.type] || ''}`}>
                  {typeLabels[activeDoc.type] || activeDoc.type}
                </span>
              </div>
              <button
                className="w-11 h-11 sm:w-8 sm:h-8 rounded-full sm:rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200 transition-colors shrink-0"
                onClick={closeDoc}
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 sm:p-6 pb-[max(20px,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain flex-1 min-h-0">
              <pre className="whitespace-pre-wrap font-sans text-[15px] sm:text-sm text-text-secondary leading-relaxed break-words overflow-wrap-anywhere">
                {activeDoc.content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
