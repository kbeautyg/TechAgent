import type { AppCtx } from '../lib/techagent'

const arrow = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
const arrowSm = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>

export default function Landing({ app }: { app: AppCtx }) {
  return (
    <section>
      {/* hero */}
      <div style={{ position: 'relative', maxWidth: 1220, margin: '0 auto', padding: 'clamp(28px,5vw,64px) clamp(16px,4vw,40px) clamp(8px,2vw,20px)', background: 'radial-gradient(820px 420px at 82% -6%,rgba(27,68,245,.10),transparent 65%),radial-gradient(640px 360px at 0% 42%,rgba(251,44,54,.05),transparent 62%)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(30px,5vw,64px)', alignItems: 'center' }}>
          <div style={{ flex: '1 1 440px', minWidth: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 999, padding: '7px 14px 7px 9px', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 24 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E4F8F0', color: '#0B7A55', padding: '4px 9px', borderRadius: 999, font: "600 11.5px/1 'JetBrains Mono',monospace" }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#12B981', boxShadow: '0 0 0 3px rgba(18,185,129,.2)' }} />БЕЛАЯ СХЕМА</span>
              агентские закупки электроники
            </div>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(2.3rem,5.6vw,4.5rem)', lineHeight: 1.01, letterSpacing: '-.03em', margin: '0 0 22px' }}>Закупки техники<br />из‑за рубежа<br />стали <span style={{ color: '#1B44F5', position: 'relative', whiteSpace: 'nowrap' }}>лёгкими<svg viewBox="0 0 220 16" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: -6, width: '100%', height: 12 }}><path d="M3 11C55 4 165 3 217 8" stroke="#FB2C36" strokeWidth="5" strokeLinecap="round" fill="none" /></svg></span>.</h1>
            <p style={{ fontSize: 'clamp(16px,1.6vw,18.5px)', lineHeight: 1.55, color: '#5B647A', maxWidth: 540, margin: '0 0 30px' }}>Выкупаем оригинальную электронику в 9 странах и привозим в Россию по официальной схеме. Ваша цена — стоимость товара плюс честная комиссия <b style={{ color: '#0B1020' }}>2–3%</b>. Оплата по СБП, чек и документы включены.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 26 }}>
              <button data-route="catalog" onClick={app.onNav} className="ta-btn-primary ta-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: '16px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 10px 26px rgba(27,68,245,.3)' }}>Открыть каталог {arrow}</button>
              <button data-route="how" onClick={app.onNav} className="ta-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', color: '#0B1020', border: '1px solid #E7E9F2', borderRadius: 13, padding: '16px 24px', fontWeight: 600, fontSize: 16 }}>Как это работает</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 500, color: '#3A4256' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#12B981" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>Официальный договор</span>
              <span style={{ width: 1, height: 16, background: '#E0E3EE', alignSelf: 'center' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 500, color: '#3A4256' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1B44F5" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M8 20V5h5a4 4 0 0 1 0 8H6M6 16h7" /></svg>Комиссия 2–3%</span>
              <span style={{ width: 1, height: 16, background: '#E0E3EE', alignSelf: 'center' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 500, color: '#3A4256' }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FB2C36" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2.4" /><path d="M3 10h18" /><circle cx="16.5" cy="14" r="1.1" fill="#FB2C36" stroke="none" /></svg>Оплата по СБП</span>
            </div>
          </div>

          {/* calculator */}
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 440, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, boxShadow: '0 30px 70px rgba(11,16,32,.1)', padding: 'clamp(20px,3vw,28px)', position: 'relative', animation: 'ta-fade .5s ease both' }}>
              <div style={{ position: 'absolute', top: -15, right: 20, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0B1020', color: '#fff', borderRadius: 999, padding: '9px 13px', font: "600 10.5px/1 'JetBrains Mono',monospace", letterSpacing: '.05em', boxShadow: '0 10px 24px rgba(11,16,32,.28)', animation: 'ta-float 5s ease-in-out infinite' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FB2C36' }} />ДУБАЙ<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8FA9FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>МОСКВА · 4 ДНЯ</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 36, height: 36, borderRadius: 10, background: '#EDF0FF', display: 'grid', placeItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B44F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h10M18 8h2M4 16h4M12 16h8" /><circle cx="16" cy="8" r="2" /><circle cx="9" cy="16" r="2" /></svg></span><div><div style={{ fontWeight: 700, fontSize: 15.5 }}>Калькулятор стоимости</div><div style={{ fontSize: 12, color: '#8891A5' }}>итог виден сразу</div></div></div>
                <span style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#0B7A55', background: '#E4F8F0', padding: '6px 9px', borderRadius: 8 }}>2–3%</span>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8891A5', marginBottom: 8 }}>Стоимость товара за рубежом</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 14, padding: '10px 12px', marginBottom: 12 }}>
                <button onClick={app.calcDec} className="ta-outline" style={{ width: 38, height: 38, flex: 'none', borderRadius: 10, border: '1px solid #E7E9F2', background: '#fff', fontSize: 22, fontWeight: 600, color: '#3A4256', display: 'grid', placeItems: 'center', lineHeight: 1 }}>−</button>
                <div style={{ flex: 1, textAlign: 'center', fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(22px,4vw,28px)', letterSpacing: '-.02em' }}>{app.calc.priceStr}</div>
                <button onClick={app.calcInc} className="ta-outline" style={{ width: 38, height: 38, flex: 'none', borderRadius: 10, border: '1px solid #E7E9F2', background: '#fff', fontSize: 22, fontWeight: 600, color: '#3A4256', display: 'grid', placeItems: 'center', lineHeight: 1 }}>+</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
                {app.presets.map((pr) => (
                  <button key={pr.v} data-v={pr.v} onClick={app.onPreset} style={{ border: 'none', borderRadius: 999, padding: '8px 12px', fontWeight: 600, fontSize: 12.5, transition: '.14s', background: pr.bg, color: pr.fg }}>{pr.label}</button>
                ))}
              </div>
              <div style={{ borderTop: '1px dashed #E0E3EE', paddingTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}><span style={{ fontSize: 14, color: '#5B647A' }}>Стоимость товара</span><span style={{ fontWeight: 600, fontSize: 14.5 }}>{app.calc.priceStr}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}><span style={{ fontSize: 14, color: '#5B647A', display: 'inline-flex', alignItems: 'center', gap: 6 }}>Комиссия TechAgent <span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '3px 6px', borderRadius: 6 }}>{app.calc.rateStr}</span></span><span style={{ fontWeight: 600, fontSize: 14.5, color: '#1B44F5' }}>+{app.calc.commStr}</span></div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', background: '#0B1020', borderRadius: 14, padding: '15px 17px' }}><span style={{ fontSize: 13.5, color: '#AEB6C9', fontWeight: 500 }}>Итого к оплате</span><span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(20px,3.6vw,25px)', color: '#fff', letterSpacing: '-.02em' }}>{app.calc.totalStr}</span></div>
              </div>
              <p style={{ fontSize: 11.5, color: '#8891A5', margin: '12px 2px 16px', lineHeight: 1.5 }}>Доставка и таможенные платежи уже включены в стоимость товара. Чем крупнее заказ — тем ниже комиссия, до 2%.</p>
              <button data-route="new" onClick={app.onNav} className="ta-btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 15, fontWeight: 600, fontSize: 15.5, boxShadow: '0 8px 20px rgba(27,68,245,.26)' }}>Оформить заказ по СБП</button>
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(20px,3vw,34px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 1, background: '#E7E9F2', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
          {[['₽340 млн', 'выкуплено для партнёров', undefined], ['от 2%', 'комиссия агента', '#1B44F5'], ['9 стран', 'закупки под ключ', undefined], ['3–7 дней', 'доставка в РФ', undefined]].map(([big, small, color], i) => (
            <div key={i} style={{ background: '#fff', padding: '22px 20px' }}><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(22px,3vw,30px)', letterSpacing: '-.02em', color: color as string | undefined }}>{big}</div><div style={{ fontSize: 13, color: '#8891A5', marginTop: 4 }}>{small}</div></div>
          ))}
        </div>
      </div>

      {/* categories */}
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(30px,4vw,54px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 26 }}>
          <div><div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.08em', marginBottom: 12 }}>/ КАТАЛОГ</div><h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem,3.4vw,2.6rem)', letterSpacing: '-.02em', margin: 0 }}>Что закупаем</h2></div>
          <button data-route="catalog" onClick={app.onNav} className="ta-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', color: '#1B44F5', fontWeight: 600, fontSize: 15 }}>Весь каталог {arrowSm}</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(158px,1fr))', gap: 14 }}>
          {app.catTiles.map((c) => (
            <button key={c.key} data-cat={c.key} onClick={app.onCatTile} className="ta-tile" style={{ textAlign: 'left', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 18, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ width: 48, height: 48, borderRadius: 13, display: 'grid', placeItems: 'center', background: c.tint }}>{c.icon}</span>
              <div><div style={{ fontWeight: 600, fontSize: 15.5, letterSpacing: '-.01em' }}>{c.label}</div><div style={{ font: "500 12px/1 'JetBrains Mono',monospace", color: '#8891A5', marginTop: 5 }}>{c.count}</div></div>
            </button>
          ))}
        </div>
      </div>

      {/* how preview */}
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(20px,3vw,34px) clamp(16px,4vw,40px) clamp(30px,4vw,54px)' }}>
        <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, padding: 'clamp(24px,4vw,44px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 30 }}>
            <div><div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.08em', marginBottom: 12 }}>/ ПРОЦЕСС</div><h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem,3.4vw,2.6rem)', letterSpacing: '-.02em', margin: 0 }}>Как это работает</h2></div>
            <button data-route="how" onClick={app.onNav} className="ta-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', color: '#1B44F5', fontWeight: 600, fontSize: 15 }}>Подробнее {arrowSm}</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 18 }}>
            {app.howSteps.map((s) => (
              <div key={s.n} style={{ position: 'relative' }}>
                <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 38, color: '#EDF0FF', letterSpacing: '-.03em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-.01em', margin: '8px 0 7px' }}>{s.t}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#5B647A' }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* white-scheme dark section */}
      <div style={{ background: '#0B1020', color: '#fff' }}>
        <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(44px,6vw,80px) clamp(16px,4vw,40px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px,5vw,60px)', alignItems: 'center' }}>
            <div style={{ flex: '1 1 380px', minWidth: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(18,185,129,.15)', color: '#5EE3B4', borderRadius: 999, padding: '7px 14px', font: "600 12px/1 'JetBrains Mono',monospace", letterSpacing: '.05em', marginBottom: 22 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#12B981' }} />ЛЕГАЛЬНО И ПРОЗРАЧНО</div>
              <h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.9rem,4vw,3.1rem)', letterSpacing: '-.025em', lineHeight: 1.05, margin: '0 0 18px' }}>Полностью<br />«белая» схема</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.55, color: '#AEB6C9', maxWidth: 460, margin: '0 0 26px' }}>Вы работаете как ИП по официальному агентскому договору. На каждый заказ — чек магазина и полный пакет закрывающих документов для бухгалтерии.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {['Агентский отчёт', 'Кассовый чек', 'Гарантийный талон'].map((t) => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#151B33', border: '1px solid #232B47', borderRadius: 12, padding: '11px 15px', fontWeight: 500, fontSize: 13.5 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8FA9FF" strokeWidth="1.8"><path d="M6 3h8l4 4v14H6z" strokeLinejoin="round" /><path d="M14 3v4h4" strokeLinejoin="round" /></svg>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: '1 1 320px', minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14 }}>
              {[['Агентский договор', 'Договор поручения с каждым ИП', 'rgba(143,169,255,.14)', '#8FA9FF'], ['Чек и документы', 'Закрывающие для бухгалтерии', 'rgba(94,227,180,.14)', '#5EE3B4'], ['Оплата по СБП', 'На расчётный счёт, прозрачно', 'rgba(251,44,54,.14)', '#FF7A81'], ['Гарантия и трек', 'Трек-номер на каждый заказ', 'rgba(143,169,255,.14)', '#8FA9FF']].map(([t, d, bg, stroke], i) => (
                <div key={i} style={{ background: '#151B33', border: '1px solid #232B47', borderRadius: 18, padding: 22 }}><span style={{ width: 42, height: 42, borderRadius: 11, background: bg, display: 'grid', placeItems: 'center', marginBottom: 14 }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg></span><div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{t}</div><div style={{ fontSize: 13, color: '#AEB6C9', lineHeight: 1.5 }}>{d}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* popular products */}
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(36px,5vw,64px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 26 }}>
          <div><div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.08em', marginBottom: 12 }}>/ ХИТЫ ЗАКУПОК</div><h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem,3.4vw,2.6rem)', letterSpacing: '-.02em', margin: 0 }}>Популярное сейчас</h2></div>
          <button data-route="catalog" onClick={app.onNav} className="ta-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', color: '#1B44F5', fontWeight: 600, fontSize: 15 }}>Смотреть всё {arrowSm}</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(238px,1fr))', gap: 16 }}>
          {app.popular.map((p) => (
            <button key={p.id} data-id={p.id} onClick={app.onProductClick} className="ta-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', background: p.tint, display: 'grid', placeItems: 'center' }}>
                <span style={{ position: 'absolute', top: 12, left: 12, font: "600 10.5px/1 'JetBrains Mono',monospace", color: p.accent, background: '#fff', border: '1px solid #EEF0F6', padding: '5px 8px', borderRadius: 999 }}>{p.catLabel}</span>
                {p.hot && <span style={{ position: 'absolute', top: 12, right: 12, font: "700 10.5px/1 'JetBrains Mono',monospace", color: '#fff', background: '#FB2C36', padding: '5px 8px', borderRadius: 999 }}>ХИТ</span>}
                {p.icon}
              </div>
              <div style={{ padding: '15px 16px 17px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                <div><div style={{ font: "600 11.5px/1 'JetBrains Mono',monospace", color: '#8891A5' }}>{p.brand}</div><div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-.01em', marginTop: 5 }}>{p.name}</div></div>
                <div style={{ fontSize: 12.5, color: '#8891A5' }}>{p.spec}</div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, paddingTop: 4 }}>
                  <div><div style={{ fontSize: 11, color: '#8891A5', marginBottom: 2 }}>под ключ</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>{p.totalStr}</div></div>
                  <span style={{ font: "600 11.5px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '6px 9px', borderRadius: 999 }}>{p.rateStr}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: '0 clamp(16px,4vw,40px) clamp(40px,6vw,72px)' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(120deg,#1B44F5,#0E2FCC)', borderRadius: 28, padding: 'clamp(34px,5vw,60px)', color: '#fff' }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,.16),transparent 70%)' }} />
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 380px' }}><h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem,3.6vw,2.8rem)', letterSpacing: '-.025em', lineHeight: 1.05, margin: '0 0 12px' }}>Готовы к первой закупке?</h2><p style={{ fontSize: 16.5, color: '#D5DDFF', margin: 0, maxWidth: 440, lineHeight: 1.5 }}>Выберите товар в каталоге или пришлите ссылку — покажем итоговую цену за пару секунд.</p></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button data-route="catalog" onClick={app.onNav} className="ta-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', color: '#0B1020', border: 'none', borderRadius: 13, padding: '16px 24px', fontWeight: 600, fontSize: 16 }}>Открыть каталог {arrow}</button>
              <button data-route="new" onClick={app.onNav} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,.14)', color: '#fff', border: '1px solid rgba(255,255,255,.35)', borderRadius: 13, padding: '16px 24px', fontWeight: 600, fontSize: 16 }}>Прислать ссылку</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
