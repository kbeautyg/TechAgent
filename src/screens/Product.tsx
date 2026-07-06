import type { AppCtx } from '../lib/techagent'

export default function Product({ app }: { app: AppCtx }) {
  return (
    <section>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(20px,3vw,34px) clamp(16px,4vw,40px) clamp(30px,4vw,54px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8891A5', marginBottom: 22, flexWrap: 'wrap' }}>
          <button data-route="catalog" onClick={app.onNav} className="ta-ghost" style={{ background: 'none', border: 'none', color: '#8891A5', padding: 0, fontSize: 13 }}>Каталог</button>
          <span>/</span><span style={{ color: '#3A4256' }}>{app.selected.catLabel}</span><span>/</span><span style={{ color: '#0B1020', fontWeight: 500 }}>{app.selected.name}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,48px)' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <div style={{ position: 'relative', background: app.selected.tint, border: '1px solid #E7E9F2', borderRadius: 24, aspectRatio: '1/1', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 16, left: 16, font: "600 11px/1 'JetBrains Mono',monospace", color: app.selected.accent, background: '#fff', border: '1px solid #EEF0F6', padding: '6px 10px', borderRadius: 999 }}>{app.selected.catLabel}</span>
              <span style={{ position: 'absolute', top: 16, right: 16, display: 'inline-flex', alignItems: 'center', gap: 6, font: "600 11px/1 'JetBrains Mono',monospace", color: '#3A4256', background: '#fff', border: '1px solid #EEF0F6', padding: '6px 10px', borderRadius: 999 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8891A5" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" strokeLinecap="round" /></svg>{app.selected.origin}</span>
              <div style={{ transform: 'scale(1.9)' }}>{app.selected.icon}</div>
              <span style={{ position: 'absolute', bottom: 16, left: 16, display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 600, fontSize: 12.5, color: '#0B7A55', background: '#E4F8F0', padding: '8px 12px', borderRadius: 999 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#12B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5 11-11" /></svg>Оригинал · запечатан</span>
            </div>
          </div>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <div style={{ font: "600 12.5px/1 'JetBrains Mono',monospace", color: '#8891A5', marginBottom: 10 }}>{app.selected.brand}</div>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem,3.2vw,2.3rem)', letterSpacing: '-.02em', lineHeight: 1.08, margin: '0 0 14px' }}>{app.selected.name}</h1>
            <div style={{ fontSize: 14.5, color: '#5B647A', marginBottom: 22 }}>{app.selected.spec}</div>

            <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 22, marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}><span style={{ fontSize: 14, color: '#5B647A' }}>Стоимость товара</span><span style={{ fontWeight: 600, fontSize: 15 }}>{app.selected.priceStr}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 16, borderBottom: '1px dashed #E0E3EE' }}><span style={{ fontSize: 14, color: '#5B647A', display: 'inline-flex', alignItems: 'center', gap: 7 }}>Комиссия TechAgent <span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '3px 6px', borderRadius: 6 }}>{app.selected.rateStr}</span></span><span style={{ fontWeight: 600, fontSize: 15, color: '#1B44F5' }}>+{app.selected.commStr}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}><div><div style={{ fontSize: 12.5, color: '#8891A5', marginBottom: 2 }}>Итого «под ключ»</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(25px,4vw,33px)', letterSpacing: '-.02em' }}>{app.selected.totalStr}</div></div><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: '#5B647A', background: '#F5F6FB', border: '1px solid #EEF0F6', padding: '8px 11px', borderRadius: 10, whiteSpace: 'nowrap' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B647A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.7" /><circle cx="17" cy="18" r="1.7" /></svg>3–7 дней</span></div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
              <button onClick={app.buy} className="ta-btn-primary" style={{ flex: '1 1 210px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 16, fontWeight: 600, fontSize: 15.5, boxShadow: '0 10px 24px rgba(27,68,245,.28)', transition: '.15s' }}>Купить по СБП · {app.selected.totalStr}</button>
              <button data-route="chat" onClick={app.onNav} className="ta-outline" style={{ flex: '0 1 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#0B1020', border: '1px solid #E7E9F2', borderRadius: 13, padding: '16px 20px', fontWeight: 600, fontSize: 15, transition: '.15s' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5h16v11H8l-4 3.5z" /><path d="M8 10h8M8 13h5" /></svg>Спросить агента</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#3A4256' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12B981" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>Белая схема</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#3A4256' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B44F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></svg>Чек и документы</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#3A4256' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FB2C36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>Гарантия 12 мес</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18, marginTop: 'clamp(24px,4vw,40px)' }}>
          <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 24 }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Характеристики</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Состояние</span><span style={{ fontWeight: 500 }}>Новый, оригинал</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Страна закупки</span><span style={{ fontWeight: 500 }}>{app.selected.origin}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Гарантия</span><span style={{ fontWeight: 500 }}>12 месяцев</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Доставка в РФ</span><span style={{ fontWeight: 500 }}>3–7 дней</span></div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 24 }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Как пройдёт заказ</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}><span style={{ width: 26, height: 26, flex: 'none', borderRadius: 8, background: '#EDF0FF', color: '#1B44F5', font: "700 12px/1 'JetBrains Mono',monospace", display: 'grid', placeItems: 'center' }}>1</span><div style={{ fontSize: 14 }}><b style={{ fontWeight: 600 }}>Оплата по СБП</b><div style={{ color: '#8891A5', fontSize: 13, marginTop: 2 }}>Ссылка и чек — сразу после подтверждения</div></div></div>
              <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}><span style={{ width: 26, height: 26, flex: 'none', borderRadius: 8, background: '#EDF0FF', color: '#1B44F5', font: "700 12px/1 'JetBrains Mono',monospace", display: 'grid', placeItems: 'center' }}>2</span><div style={{ fontSize: 14 }}><b style={{ fontWeight: 600 }}>Выкуп за рубежом</b><div style={{ color: '#8891A5', fontSize: 13, marginTop: 2 }}>Агент покупает оригинал в {app.selected.origin}</div></div></div>
              <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}><span style={{ width: 26, height: 26, flex: 'none', borderRadius: 8, background: '#EDF0FF', color: '#1B44F5', font: "700 12px/1 'JetBrains Mono',monospace", display: 'grid', placeItems: 'center' }}>3</span><div style={{ fontSize: 14 }}><b style={{ fontWeight: 600 }}>Доставка и выдача</b><div style={{ color: '#8891A5', fontSize: 13, marginTop: 2 }}>Привозим в РФ, выдаём с документами</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
