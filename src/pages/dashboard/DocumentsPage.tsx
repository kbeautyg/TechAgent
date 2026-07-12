import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { mockDocuments } from '../../data/mock'
import { formatDate } from '../../utils/calculate'
import { Icon } from '../../lib/techagent'
import type { DocumentType } from '../../types'

const typeMeta: Record<DocumentType, { label: string; glyph: string }> = {
  CONTRACT: { label: 'Договор', glyph: 'doc' },
  ACT: { label: 'Акт', glyph: 'doc' },
  REPORT: { label: 'Отчёт', glyph: 'doc' },
  OFFER: { label: 'Оферта', glyph: 'doc' },
  PRIVACY: { label: 'Конфиденциальность', glyph: 'shield' },
  TERMS: { label: 'Соглашение', glyph: 'doc' },
}

function downloadDoc(title: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.replace(/[^\w\sа-яА-ЯёЁ-]/g, '')}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

export default function DocumentsPage() {
  const { user } = useAuth()
  const [openDoc, setOpenDoc] = useState<string | null>(null)

  const userDocs = mockDocuments.filter((d) => d.userId === user?.id)
  const publicDocs = mockDocuments.filter((d) => d.userId === 'public')
  const activeDoc = mockDocuments.find((d) => d.id === openDoc)

  const docRow = (doc: (typeof mockDocuments)[number], action: React.ReactNode) => {
    const meta = typeMeta[doc.type]
    return (
      <div key={doc.id} className="ta-tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 16, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <span style={{ width: 40, height: 40, flex: 'none', borderRadius: 11, background: '#EDF0FF', display: 'grid', placeItems: 'center' }}><Icon name={meta.glyph} size={18} color="#1B44F5" /></span>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{doc.title}</span>
              <span style={{ font: "600 10.5px/1 sans-serif", color: '#1B44F5', background: '#EDF0FF', padding: '3px 7px', borderRadius: 999 }}>{meta.label}</span>
            </div>
            <div style={{ fontSize: 12, color: '#8891A5', marginTop: 3 }}>{formatDate(doc.createdAt)}</div>
          </div>
        </div>
        {action}
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: '0 0 22px' }}>Документы</h1>

      <div style={{ marginBottom: 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14, color: '#3A4256', marginBottom: 12 }}><Icon name="shield" size={17} color="#1B44F5" />Документы платформы</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {publicDocs.map((doc) => docRow(doc, (
            <button onClick={() => doc.content && setOpenDoc(doc.id)} style={{ background: 'none', border: 'none', color: '#1B44F5', fontWeight: 600, fontSize: 13, cursor: 'pointer', flex: 'none' }}>Читать</button>
          )))}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14, color: '#3A4256', marginBottom: 12 }}><Icon name="doc" size={17} color="#1B44F5" />Мои документы</div>
        {userDocs.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 16, padding: '32px 20px', textAlign: 'center', color: '#8891A5', fontSize: 14 }}>Документов пока нет. Они появятся после оформления первого заказа.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {userDocs.map((doc) => docRow(doc, (
              <button
                onClick={() => downloadDoc(doc.title, doc.content || `${doc.title}\n\nДата: ${formatDate(doc.createdAt)}\n\nДля получения оригинала обратитесь к менеджеру в чате.`)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#1B44F5', fontWeight: 600, fontSize: 13, cursor: 'pointer', flex: 'none' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B44F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13M6 11l6 6 6-6M5 21h14" /></svg>Скачать
              </button>
            )))}
          </div>
        )}
      </div>

      {activeDoc && activeDoc.content && (
        <div onClick={() => setOpenDoc(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(11,16,32,.5)', backdropFilter: 'blur(3px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, maxWidth: 680, width: '100%', maxHeight: 'calc(100vh - 32px)', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 70px rgba(11,16,32,.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '18px 22px', borderBottom: '1px solid #EEF0F6', flex: 'none' }}>
              <div>
                <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16.5 }}>{activeDoc.title}</div>
                <div style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', display: 'inline-block', marginTop: 8, padding: '4px 8px', borderRadius: 999 }}>{typeMeta[activeDoc.type].label}</div>
              </div>
              <button onClick={() => setOpenDoc(null)} style={{ width: 34, height: 34, flex: 'none', borderRadius: 10, background: '#F2F4FB', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3A4256" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <div style={{ padding: '22px 24px', overflowY: 'auto' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 13.5, color: '#3A4256', lineHeight: 1.65, margin: 0, wordBreak: 'break-word' }}>{activeDoc.content}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
