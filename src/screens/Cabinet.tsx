import type { AppCtx } from '../lib/techagent'

export default function Cabinet({ app }: { app: AppCtx }) {
  return (
    <section>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(22px,4vw,40px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.08em', marginBottom: 11 }}>/ КАБИНЕТ ПАРТНЁРА</div>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem,3.4vw,2.5rem)', letterSpacing: '-.025em', margin: 0 }}>Здравствуйте, Иван</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E4F8F0', color: '#0B7A55', borderRadius: 11, padding: '10px 14px', fontWeight: 600, fontSize: 13 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#12B981" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>Верифицирован</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '8px 12px 8px 8px', fontWeight: 600, fontSize: 13.5 }}><span style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#1B44F5,#6D4BF5)', color: '#fff', display: 'grid', placeItems: 'center', font: "700 12px/1 'JetBrains Mono',monospace" }}>ИП</span>Иванов И. И.</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26, borderBottom: '1px solid #E7E9F2', paddingBottom: 0 }}>
          {app.cabTabs.map((t) => (
            <button key={t.key} data-route={t.key} onClick={app.onNav} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.bg, color: t.fg, border: `1px solid ${t.bd}`, borderRadius: '12px 12px 0 0', padding: '12px 18px', fontWeight: 600, fontSize: 14, marginBottom: -1, transition: '.15s' }}>{t.icon}{t.label}</button>
          ))}
        </div>

        {app.isOrders && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.2rem,2.4vw,1.6rem)', letterSpacing: '-.01em' }}>Ваши заказы</div>
              <button data-route="new" onClick={app.onNav} className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 14px rgba(27,68,245,.24)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>Новый заказ</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {app.orders.map((o) => (
                <div key={o.id} style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 'clamp(18px,3vw,26px)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                      <span style={{ width: 52, height: 52, flex: 'none', borderRadius: 14, background: o.tint, display: 'grid', placeItems: 'center' }}>{o.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}><span style={{ fontWeight: 600, fontSize: 15.5, letterSpacing: '-.01em' }}>{o.title}</span><span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#8891A5', background: '#F2F4FB', padding: '4px 7px', borderRadius: 6 }}>{o.id}</span></div>
                        <div style={{ fontSize: 13, color: '#8891A5', marginTop: 4 }}>{o.note}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: '-.02em' }}>{o.totalStr}</div>
                      <span style={{ display: 'inline-block', marginTop: 5, font: "600 11.5px/1 'JetBrains Mono',monospace", padding: '5px 9px', borderRadius: 999, color: o.statusColor, background: o.statusBg }}>{o.statusLabel}</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ height: 6, background: '#EEF0F6', borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}><div style={{ height: '100%', width: o.progressPct, background: 'linear-gradient(90deg,#1B44F5,#4E74FF)', borderRadius: 999, transition: 'width .5s ease' }} /></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                      {o.tracker.map((t, i) => (
                        <span key={i} style={{ fontSize: 12, color: t.color, fontWeight: t.weight }}>{t.label}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {o.awaiting && (
                      <button data-oid={o.id} onClick={app.onPayOrder} className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 18px', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 14px rgba(27,68,245,.24)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2.4" /><path d="M3 10h18" /></svg>Оплатить по СБП</button>
                    )}
                    <button data-route="chat" onClick={app.onNav} className="ta-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#0B1020', border: '1px solid #E7E9F2', borderRadius: 11, padding: '11px 18px', fontWeight: 600, fontSize: 14 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5h16v11H8l-4 3.5z" /><path d="M8 10h8M8 13h5" /></svg>Чат с агентом</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {app.isNew && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(18px,3vw,28px)', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 380px', minWidth: 0, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 'clamp(20px,3vw,30px)' }}>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.3rem,2.6vw,1.7rem)', letterSpacing: '-.01em', marginBottom: 6 }}>Новый заказ</div>
              <p style={{ fontSize: 14, color: '#8891A5', margin: '0 0 24px' }}>Вставьте ссылку на товар из любого зарубежного магазина — мы рассчитаем комиссию и выкупим.</p>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }}>Ссылка на товар за рубежом</label>
              <input value={app.noForm.link} onChange={app.onNoLink} placeholder="https://www.apple.com/… или amazon, bestbuy…" className="ta-input" style={{ width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '13px 15px', fontSize: 14.5, outline: 'none', marginBottom: 18 }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
                <div style={{ flex: '1 1 160px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }}>Категория</label>
                  <select value={app.noForm.category} onChange={app.onNoCat} style={{ width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '13px 15px', fontSize: 14.5, outline: 'none', cursor: 'pointer' }}>
                    <option>Смартфоны</option><option>Планшеты</option><option>Ноутбуки</option><option>Видеокарты</option><option>Консоли</option><option>Аудио</option><option>Сеть</option><option>Другое</option>
                  </select>
                </div>
                <div style={{ flex: '1 1 160px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }}>Цена за рубежом, ₽</label>
                  <input type="number" value={app.noForm.price} onChange={app.onNoPrice} min="5000" step="1000" className="ta-input" style={{ width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '13px 15px', fontSize: 14.5, outline: 'none' }} />
                </div>
              </div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }}>Комментарий агенту</label>
              <textarea value={app.noForm.note} onChange={app.onNoNote} placeholder="Цвет, объём памяти, срочность…" rows={3} className="ta-input" style={{ width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '13px 15px', fontSize: 14.5, outline: 'none', resize: 'vertical', fontFamily: 'inherit', marginBottom: 22 }} />
              <button onClick={app.submitOrder} className="ta-btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 15, fontWeight: 600, fontSize: 15.5, boxShadow: '0 8px 20px rgba(27,68,245,.26)', transition: '.15s' }}>Создать заказ <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
            </div>
            <div style={{ flex: '1 1 280px', minWidth: 0, background: '#0B1020', color: '#fff', borderRadius: 20, padding: 'clamp(20px,3vw,28px)' }}>
              <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#8FA9FF', letterSpacing: '.06em', marginBottom: 18 }}>ПРЕДВАРИТЕЛЬНЫЙ РАСЧЁТ</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #1C2440', fontSize: 14 }}><span style={{ color: '#AEB6C9' }}>Категория</span><span style={{ fontWeight: 500 }}>{app.noForm.category}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #1C2440', fontSize: 14 }}><span style={{ color: '#AEB6C9' }}>Стоимость товара</span><span style={{ fontWeight: 600 }}>{app.noForm.priceStr}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #1C2440', fontSize: 14 }}><span style={{ color: '#AEB6C9' }}>Комиссия {app.noForm.rateStr}</span><span style={{ fontWeight: 600, color: '#8FA9FF' }}>+{app.noForm.commStr}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 16 }}><span style={{ fontSize: 13.5, color: '#AEB6C9' }}>Итого к оплате</span><span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: '-.02em' }}>{app.noForm.totalStr}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginTop: 22, padding: 14, background: '#151B33', border: '1px solid #232B47', borderRadius: 14 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5EE3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg><span style={{ fontSize: 12.5, color: '#AEB6C9', lineHeight: 1.5 }}>Оплата по СБП, агентский договор и чек — по «белой» схеме.</span></div>
            </div>
          </div>
        )}

        {app.isChat && (
          <div style={{ maxWidth: 860, margin: '0 auto', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 'clamp(440px,64vh,640px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '16px 20px', borderBottom: '1px solid #E7E9F2', background: '#fff' }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#1B44F5,#6D4BF5)', color: '#fff', display: 'grid', placeItems: 'center', font: "700 15px/1 'Unbounded',sans-serif" }}>М</span>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 15 }}>Мария · ваш агент</div><div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#0B7A55' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#12B981' }} />онлайн · заказ TA-2041</div></div>
              <span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#8891A5', background: '#F2F4FB', padding: '6px 9px', borderRadius: 8 }}>MacBook Pro 14"</span>
            </div>
            <div id="ta-chatlog" style={{ flex: 1, overflowY: 'auto', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 14, background: '#F7F8FC' }}>
              {app.chatMsgs.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.align, gap: 4 }}>
                  {m.agent && (<span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#8891A5', padding: '0 4px' }}>{m.name}</span>)}
                  <div style={{ maxWidth: '74%', background: m.bg, color: m.fg, border: `1px solid ${m.bd}`, borderRadius: 16, padding: '11px 15px', fontSize: 14.5, lineHeight: 1.45 }}>{m.text}</div>
                  <span style={{ font: "500 10.5px/1 'JetBrains Mono',monospace", color: '#AEB4C4', padding: '0 4px' }}>{m.time}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '14px 16px', borderTop: '1px solid #E7E9F2', background: '#fff' }}>
              <input value={app.chatDraft} onChange={app.onChat} onKeyDown={app.onChatKey} placeholder="Написать агенту…" className="ta-input" style={{ flex: 1, background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '13px 16px', fontSize: 14.5, outline: 'none' }} />
              <button onClick={app.sendChat} className="ta-btn-primary" style={{ flex: 'none', width: 48, height: 48, borderRadius: 12, background: '#1B44F5', color: '#fff', border: 'none', display: 'grid', placeItems: 'center', boxShadow: '0 6px 14px rgba(27,68,245,.26)' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l16-8-6 16-3-6z" /></svg></button>
            </div>
          </div>
        )}

        {app.isProfile && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(18px,3vw,24px)', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 360px', minWidth: 0, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 'clamp(20px,3vw,30px)' }}>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.2rem,2.4vw,1.5rem)', letterSpacing: '-.01em', marginBottom: 20 }}>Реквизиты ИП</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Наименование</span><span style={{ fontWeight: 500, textAlign: 'right' }}>{app.profile.ip}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>ИНН</span><span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono',monospace" }}>{app.profile.inn}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>ОГРНИП</span><span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono',monospace" }}>{app.profile.ogrnip}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Расчётный счёт</span><span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5 }}>{app.profile.account}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Банк · БИК</span><span style={{ fontWeight: 500, textAlign: 'right' }}>{app.profile.bank} · {app.profile.bik}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Email</span><span style={{ fontWeight: 500 }}>{app.profile.email}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Телефон</span><span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono',monospace" }}>{app.profile.phone}</span></div>
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'linear-gradient(135deg,#0B7A55,#12B981)', color: '#fff', borderRadius: 20, padding: 24 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14 }}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
                <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Верифицирован</div>
                <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.85)', lineHeight: 1.5 }}>Работаете по «белой» схеме. {app.profile.since}.</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 22 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Настройки</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}><span style={{ color: '#3A4256' }}>Уведомления о заказах</span><span style={{ width: 42, height: 24, borderRadius: 999, background: '#1B44F5', position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', top: 3, right: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff' }} /></span></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}><span style={{ color: '#3A4256' }}>Автосоздание чеков</span><span style={{ width: 42, height: 24, borderRadius: 999, background: '#1B44F5', position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', top: 3, right: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff' }} /></span></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}><span style={{ color: '#3A4256' }}>Рассылка о новинках</span><span style={{ width: 42, height: 24, borderRadius: 999, background: '#D3D8E8', position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', top: 3, left: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff' }} /></span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
