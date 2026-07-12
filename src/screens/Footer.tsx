import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

const link: CSSProperties = { color: '#8790A6', fontSize: 14, textDecoration: 'none' }
const head: CSSProperties = { fontWeight: 600, color: '#fff', fontSize: 14, marginBottom: 15 }

export default function Footer() {
  return (
    <footer style={{ background: '#0B1020', color: '#C4CBDA', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(44px,5vw,68px) clamp(16px,4vw,40px) 0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', paddingBottom: 44 }}>
          <div style={{ flex: '1 1 260px', maxWidth: 340 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-.03em' }}><span style={{ color: '#FF6B6B' }}>Tech</span><span style={{ color: '#8FA9FF' }}>Agent</span></span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#8790A6', margin: '0 0 18px' }}>Агентские закупки электроники за рубежом по «белой» схеме. Комиссия 3%, оплата по СБП, документы для ИП.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#151B33', border: '1px solid #232B47', borderRadius: 10, padding: '9px 13px', font: "600 12px/1 'JetBrains Mono',monospace", color: '#5EE3B4' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#12B981' }} />ОПЛАТА ПО СБП</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 44 }}>
            <div>
              <div style={head}>Продукт</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <Link to="/catalog" className="ta-footlink" style={link}>Каталог</Link>
                <Link to="/how-it-works" className="ta-footlink" style={link}>Как это работает</Link>
                <Link to="/dashboard" className="ta-footlink" style={link}>Кабинет партнёра</Link>
                <Link to="/dashboard/orders/new" className="ta-footlink" style={link}>Новый заказ</Link>
              </div>
            </div>
            <div>
              <div style={head}>Правовое</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <Link to="/legal/offer" className="ta-footlink" style={link}>Публичная оферта</Link>
                <Link to="/legal/privacy" className="ta-footlink" style={link}>Политика конфиденциальности</Link>
                <Link to="/legal/terms" className="ta-footlink" style={link}>Пользовательское соглашение</Link>
              </div>
            </div>
            <div>
              <div style={head}>Контакты</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14, color: '#8790A6' }}>
                <a href="mailto:info@techagent.pro" className="ta-footlink" style={{ color: '#fff' }}>info@techagent.pro</a>
                <span>Telegram @techagent</span>
                <span>Пн–Пт · 10:00–20:00 МСК</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1C2440', padding: '22px 0 26px', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, color: '#6E7691' }}>
          <span>© 2026 TechAgent · techagent.pro</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>Легально · Белая схема · Комиссия 3%</span>
        </div>
      </div>
      <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(60px,17vw,220px)', lineHeight: .8, letterSpacing: '-.04em', color: '#121A33', textAlign: 'center', padding: '0 10px', userSelect: 'none', marginBottom: '-.16em' }}>TechAgent</div>
    </footer>
  )
}
