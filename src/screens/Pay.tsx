import type { AppCtx } from '../lib/techagent'

export default function Pay({ app }: { app: AppCtx }) {
  return (
    <section>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: 'clamp(24px,4vw,52px) clamp(16px,4vw,40px)' }}>

        {app.pay.isSummary && (
          <>
            <button data-route="orders" onClick={app.onNav} className="ta-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', color: '#8891A5', fontSize: 13.5, padding: 0, marginBottom: 18 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Отменить</button>
            <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 50px rgba(11,16,32,.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '20px 24px', background: '#0B1020', color: '#fff' }}>
                <div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16 }}>Оплата заказа</div><div style={{ font: "500 12px/1 'JetBrains Mono',monospace", color: '#8FA9FF', marginTop: 5 }}>{app.pay.orderId}</div></div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#5B34E8,#E8348C)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '8px 12px', borderRadius: 10, letterSpacing: '.02em' }}>СБП</span>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 13, color: '#8891A5', marginBottom: 4 }}>Товар</div>
                <div style={{ fontWeight: 600, fontSize: 15.5, marginBottom: 18 }}>{app.pay.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14 }}><span style={{ color: '#5B647A' }}>Стоимость товара</span><span style={{ fontWeight: 500 }}>{app.pay.priceStr}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px dashed #E0E3EE', marginBottom: 14, fontSize: 14 }}><span style={{ color: '#5B647A' }}>Комиссия {app.pay.rateStr}</span><span style={{ fontWeight: 500, color: '#1B44F5' }}>+{app.pay.commStr}</span></div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}><span style={{ fontSize: 14, color: '#5B647A' }}>К оплате</span><span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,30px)', letterSpacing: '-.02em' }}>{app.pay.totalStr}</span></div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', padding: 18, background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 16, marginBottom: 20 }}>
                  <div style={{ width: 104, height: 104, flex: 'none', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 14, padding: 8 }}>{app.qr}</div>
                  <div style={{ flex: '1 1 180px', minWidth: 0 }}><div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 5 }}>Отсканируйте QR</div><div style={{ fontSize: 13, color: '#8891A5', lineHeight: 1.5, marginBottom: 8 }}>Камерой или в приложении банка — оплата по СБП за пару секунд.</div><div style={{ font: "500 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '7px 10px', borderRadius: 8, wordBreak: 'break-all' }}>pay.techagent.pro/{app.pay.orderId}</div></div>
                </div>

                <div style={{ fontSize: 12.5, color: '#8891A5', marginBottom: 10 }}>Или выберите банк:</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 9, marginBottom: 22 }}>
                  {app.banks.map((b) => (
                    <button key={b.name} data-bank={b.name} onClick={app.onBank} style={{ display: 'flex', alignItems: 'center', gap: 9, background: b.bg, border: '1px solid ' + b.bd, borderRadius: 11, padding: '11px 12px', fontWeight: 600, fontSize: 13, textAlign: 'left', transition: '.14s' }}><span style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid ' + b.ring, background: b.bg, flex: 'none' }} />{b.name}</button>
                  ))}
                </div>

                <button onClick={app.payNow} className="ta-btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 16, fontWeight: 600, fontSize: 16, boxShadow: '0 10px 24px rgba(27,68,245,.28)', transition: '.15s' }}>Оплатить {app.pay.totalStr}</button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 14, fontSize: 12.5, color: '#8891A5' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#12B981" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10" width="14" height="10" rx="2.2" /><path d="M8 10V8a4 4 0 0 1 8 0v2" /></svg>Платёж защищён · чек придёт автоматически</div>
              </div>
            </div>
          </>
        )}

        {app.pay.isProcessing && (
          <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, padding: '64px 30px', textAlign: 'center', boxShadow: '0 20px 50px rgba(11,16,32,.08)' }}>
            <div style={{ width: 64, height: 64, margin: '0 auto 24px', borderRadius: '50%', border: '5px solid #EDF0FF', borderTopColor: '#1B44F5', animation: 'ta-spin .8s linear infinite' }} />
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Проводим платёж…</div>
            <div style={{ fontSize: 14.5, color: '#8891A5' }}>Подтвердите оплату в приложении банка по СБП</div>
          </div>
        )}

        {app.pay.isDone && (
          <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 50px rgba(11,16,32,.08)' }}>
            <div style={{ textAlign: 'center', padding: '40px 30px 28px', background: 'linear-gradient(135deg,#0B7A55,#12B981)', color: '#fff' }}>
              <div style={{ width: 66, height: 66, margin: '0 auto 18px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'grid', placeItems: 'center', animation: 'ta-fade .4s ease' }}><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5 11-11" /></svg></div>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,28px)', letterSpacing: '-.02em', marginBottom: 6 }}>Оплачено</div>
              <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,.9)' }}>{app.pay.totalStr} · заказ {app.pay.orderId}</div>
            </div>
            <div style={{ padding: '26px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 13, marginBottom: 12 }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1B44F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></svg><span style={{ fontSize: 13.5, color: '#3A4256' }}>Кассовый чек и агентский договор отправлены на <b>{app.profile.email}</b></span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 13, marginBottom: 22 }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1B44F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.7" /><circle cx="17" cy="18" r="1.7" /></svg><span style={{ fontSize: 13.5, color: '#3A4256' }}>Агент приступил к выкупу — статус отслеживайте в заказах</span></div>
              <button data-route="orders" onClick={app.onNav} className="ta-btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 15, fontWeight: 600, fontSize: 15.5, boxShadow: '0 8px 20px rgba(27,68,245,.26)', marginBottom: 10 }}>Перейти к заказам <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
              <button data-route="catalog" onClick={app.onNav} className="ta-outline" style={{ width: '100%', background: '#fff', color: '#3A4256', border: '1px solid #E7E9F2', borderRadius: 13, padding: 14, fontWeight: 600, fontSize: 14.5 }}>Вернуться в каталог</button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
