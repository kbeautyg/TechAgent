import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mockDocuments } from '../data/mock'
import { Icon } from '../lib/techagent'

const typeMeta: Record<string, { label: string; glyph: string }> = {
  OFFER: { label: 'Публичная оферта', glyph: 'doc' },
  PRIVACY: { label: 'Политика конфиденциальности', glyph: 'shield' },
  TERMS: { label: 'Пользовательское соглашение', glyph: 'doc' },
  CONTRACT: { label: 'Типовой договор', glyph: 'doc' },
}

export default function LegalPage() {
  const { docType } = useParams<{ docType?: string }>()
  const publicDocs = mockDocuments.filter((d) => d.userId === 'public')
  const [openDoc, setOpenDoc] = useState<string | null>(null)

  useEffect(() => {
    if (docType) {
      const typeMap: Record<string, string> = { offer: 'OFFER', privacy: 'PRIVACY', terms: 'TERMS', contract: 'CONTRACT' }
      const targetType = typeMap[docType.toLowerCase()]
      const doc = targetType ? publicDocs.find((d) => d.type === targetType) : undefined
      if (doc) setOpenDoc(doc.id)
    }
    // publicDocs is derived fresh each render from the module-level mockDocuments constant —
    // its identity changes every render, so including it would re-run this on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docType])

  const activeDoc = mockDocuments.find((d) => d.id === openDoc)

  return (
    <section>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(28px,5vw,56px) clamp(16px,4vw,40px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 34 }}>
          <span style={{ width: 52, height: 52, borderRadius: 15, background: '#EDF0FF', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}><Icon name="shield" size={24} color="#1B44F5" /></span>
          <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.08em', marginBottom: 12 }}>/ ПРАВОВАЯ ИНФОРМАЦИЯ</div>
          <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem,3.4vw,2.4rem)', letterSpacing: '-.02em', margin: '0 0 8px' }}>Документы платформы</h1>
          <div style={{ fontSize: 14.5, color: '#8891A5' }}>Публичная оферта, политика конфиденциальности и пользовательское соглашение TechAgent</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {publicDocs.map((doc) => {
            const meta = typeMeta[doc.type] || { label: doc.type, glyph: 'doc' }
            return (
              <button
                key={doc.id}
                onClick={() => doc.content && setOpenDoc(doc.id)}
                className="ta-card"
                style={{ textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 18, padding: '18px 20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                  <span style={{ width: 46, height: 46, flex: 'none', borderRadius: 13, background: '#EDF0FF', display: 'grid', placeItems: 'center' }}><Icon name={meta.glyph} size={21} color="#1B44F5" /></span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15.5, letterSpacing: '-.01em' }}>{doc.title}</div>
                    <div style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#8891A5', marginTop: 6 }}>{meta.label}</div>
                  </div>
                </div>
                <span style={{ font: "600 13px/1 sans-serif", color: '#1B44F5', flex: 'none' }}>Читать →</span>
              </button>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 34 }}>
          <Link to="/register" className="ta-btn-primary ta-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: '15px 26px', fontWeight: 600, fontSize: 15.5, boxShadow: '0 10px 24px rgba(27,68,245,.28)', textDecoration: 'none' }}>Зарегистрироваться</Link>
        </div>
      </div>

      {activeDoc && activeDoc.content && (
        <div onClick={() => setOpenDoc(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(11,16,32,.5)', backdropFilter: 'blur(3px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, maxWidth: 680, width: '100%', maxHeight: 'calc(100vh - 32px)', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 70px rgba(11,16,32,.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '18px 22px', borderBottom: '1px solid #EEF0F6', flex: 'none' }}>
              <div>
                <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16.5 }}>{activeDoc.title}</div>
                <div style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', display: 'inline-block', marginTop: 8, padding: '4px 8px', borderRadius: 999 }}>{typeMeta[activeDoc.type]?.label || activeDoc.type}</div>
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
    </section>
  )
}
