import type { AppCtx } from '../lib/techagent'

export default function Catalog({ app }: { app: AppCtx }) {
  return (
    <section>
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(24px,4vw,44px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.08em', marginBottom: 12 }}>/ КАТАЛОГ</div>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-.025em', margin: '0 0 6px' }}>Каталог техники</h1>
            <div style={{ fontSize: 14.5, color: '#8891A5' }}>{app.filteredCount} · цена «под ключ» с комиссией и доставкой</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8891A5" strokeWidth="1.9" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" /></svg>
              <input value={app.search} onChange={app.onSearch} placeholder="Поиск: iPhone, RTX, PS5…" className="ta-input" style={{ width: 'min(280px,60vw)', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '12px 14px 12px 38px', fontSize: 14.5, outline: 'none' }} />
            </div>
            <select value={app.sort} onChange={app.onSortSel} style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '12px 14px', fontSize: 14.5, fontWeight: 500, outline: 'none', cursor: 'pointer' }}>
              <option value="popular">Сначала популярные</option>
              <option value="priceAsc">Сначала дешевле</option>
              <option value="priceDesc">Сначала дороже</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {app.chips.map((c) => (
            <button key={c.key} data-cat={c.key} onClick={app.onCatClick} style={{ borderRadius: 999, padding: '9px 16px', fontWeight: 600, fontSize: 13.5, transition: '.14s', background: c.bg, color: c.fg, border: '1px solid ' + c.bd }}>{c.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, justifyContent: 'space-between', background: 'linear-gradient(120deg,#0B1020,#1B2A6B)', color: '#fff', borderRadius: 20, padding: '20px 24px', marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 44, height: 44, flex: 'none', borderRadius: 12, background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg></span>
            <div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>Не нашли нужное?</div><div style={{ fontSize: 13.5, color: '#B9C1DC' }}>Пришлите ссылку на любой зарубежный магазин — рассчитаем и выкупим.</div></div>
          </div>
          <button data-route="new" onClick={app.onNav} className="ta-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#0B1020', border: 'none', borderRadius: 11, padding: '12px 18px', fontWeight: 600, fontSize: 14.5, whiteSpace: 'nowrap' }}>Заявка на товар <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(238px,1fr))', gap: 16 }}>
          {app.filtered.map((p) => (
            <button key={p.id} data-id={p.id} onClick={app.onProductClick} className="ta-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', background: p.tint, display: 'grid', placeItems: 'center' }}>
                <span style={{ position: 'absolute', top: 12, left: 12, font: "600 10.5px/1 'JetBrains Mono',monospace", color: p.accent, background: '#fff', border: '1px solid #EEF0F6', padding: '5px 8px', borderRadius: 999 }}>{p.catLabel}</span>
                {p.hot && <span style={{ position: 'absolute', top: 12, right: 12, font: "700 10.5px/1 'JetBrains Mono',monospace", color: '#fff', background: '#FB2C36', padding: '5px 8px', borderRadius: 999 }}>ХИТ</span>}
                {p.icon}
              </div>
              <div style={{ padding: '15px 16px 17px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <div><div style={{ font: "600 11.5px/1 'JetBrains Mono',monospace", color: '#8891A5' }}>{p.brand}</div><div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-.01em', marginTop: 5 }}>{p.name}</div></div>
                <div style={{ fontSize: 12.5, color: '#8891A5', display: 'flex', alignItems: 'center', gap: 6 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#AEB4C4" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" strokeLinecap="round" /></svg>{p.origin}</div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, paddingTop: 4 }}>
                  <div><div style={{ fontSize: 11, color: '#8891A5', marginBottom: 2 }}>под ключ</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>{p.totalStr}</div></div>
                  <span style={{ font: "600 11.5px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '6px 9px', borderRadius: 999 }}>{p.rateStr}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {app.noResults && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20 }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Ничего не найдено</div>
            <div style={{ fontSize: 14.5, color: '#8891A5', marginBottom: 20 }}>Попробуйте изменить запрос или сбросить фильтры.</div>
            <button onClick={app.resetFilters} style={{ background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '12px 20px', fontWeight: 600, fontSize: 14.5 }}>Показать все товары</button>
          </div>
        )}
      </div>
    </section>
  )
}
