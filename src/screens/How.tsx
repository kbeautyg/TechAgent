import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOW_STEPS, FAQ_ITEMS } from '../lib/techagent'

export default function How() {
  const navigate = useNavigate()
  const [faqOpen, setFaqOpen] = useState(0)

  return (
    <section>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(30px,5vw,64px) clamp(16px,4vw,40px) clamp(20px,3vw,30px)', textAlign: 'center' }}>
        <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.1em', marginBottom: 16 }}>/ КАК ЭТО РАБОТАЕТ</div>
        <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(2.1rem,5vw,3.6rem)', letterSpacing: '-.03em', lineHeight: 1.02, margin: '0 auto 18px', maxWidth: '14ch' }}>От ссылки до техники в руках</h1>
        <p style={{ fontSize: 'clamp(15.5px,1.6vw,18px)', lineHeight: 1.55, color: '#5B647A', maxWidth: 560, margin: '0 auto' }}>Пять шагов, полностью «белая» схема и честная комиссия 3%. Никаких серых платежей и скрытых наценок.</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(10px,2vw,20px) clamp(16px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {HOW_STEPS.map((s) => (
          <div key={s.n} style={{ display: 'flex', gap: 'clamp(16px,3vw,32px)', alignItems: 'center', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 'clamp(20px,3vw,30px)' }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(34px,6vw,58px)', color: '#1B44F5', opacity: .16, letterSpacing: '-.03em', lineHeight: 1, flex: 'none', minWidth: '1.6em' }}>{s.n}</div>
            <div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(17px,2.2vw,21px)', letterSpacing: '-.01em', marginBottom: 6 }}>{s.t}</div><div style={{ fontSize: 14.5, lineHeight: 1.55, color: '#5B647A' }}>{s.d}</div></div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1000, margin: 'clamp(20px,3vw,30px) auto 0', padding: '0 clamp(16px,4vw,40px)' }}>
        <div style={{ background: '#0B1020', color: '#fff', borderRadius: 24, padding: 'clamp(28px,4vw,44px)' }}>
          <h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2.1rem)', letterSpacing: '-.02em', margin: '0 0 8px' }}>Честная комиссия 3%</h2>
          <p style={{ fontSize: 15, color: '#AEB6C9', margin: '0 0 24px', maxWidth: 560 }}>Единая комиссия агента, без скрытых наценок. Вы платите ровно стоимость товара плюс 3% за выкуп и оформление.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            <div style={{ background: 'linear-gradient(135deg,#1B44F5,#0E2FCC)', border: '1px solid #1B44F5', borderRadius: 16, padding: 20 }}><div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#C7D2FF', marginBottom: 12 }}>ЛЮБАЯ СУММА ЗАКАЗА</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: '-.02em' }}>3%</div></div>
            <div style={{ background: '#151B33', border: '1px solid #232B47', borderRadius: 16, padding: 20 }}><div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#8FA9FF', marginBottom: 12 }}>ОПЛАТА</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-.02em' }}>По СБП</div></div>
            <div style={{ background: '#151B33', border: '1px solid #232B47', borderRadius: 16, padding: 20 }}><div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#8FA9FF', marginBottom: 12 }}>ДОСТАВКА</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-.02em' }}>5–7 дней</div></div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(30px,5vw,60px) clamp(16px,4vw,40px)' }}>
        <h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-.02em', margin: '0 0 22px', textAlign: 'center' }}>Частые вопросы</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQ_ITEMS.map((f, i) => {
            const open = i === faqOpen
            return (
              <div key={i} style={{ border: `1px solid ${open ? '#D6DEFF' : '#E7E9F2'}`, borderRadius: 16, background: '#fff', overflow: 'hidden', transition: '.16s' }}>
                <button onClick={() => setFaqOpen((cur) => (cur === i ? -1 : i))} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 22px', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: 'clamp(15px,1.7vw,16.5px)', color: '#0B1020', cursor: 'pointer' }}>
                  {f.q}
                  <span style={{ flex: 'none', width: 28, height: 28, borderRadius: 8, background: '#EDF0FF', display: 'grid', placeItems: 'center', transition: '.2s', transform: `rotate(${open ? 45 : 0}deg)` }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B44F5" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></span>
                </button>
                {open && <div style={{ padding: '0 22px 22px', fontSize: 14.5, lineHeight: 1.6, color: '#5B647A' }}>{f.a}</div>}
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button onClick={() => navigate('/catalog')} className="ta-btn-primary ta-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: '16px 26px', fontWeight: 600, fontSize: 16, boxShadow: '0 10px 24px rgba(27,68,245,.28)' }}>Открыть каталог <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </div>
      </div>
    </section>
  )
}
