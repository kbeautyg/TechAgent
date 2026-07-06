import type { AppCtx } from '../lib/techagent'

export default function Header({ app }: { app: AppCtx }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(245,246,251,.82)', backdropFilter: 'saturate(180%) blur(14px)', WebkitBackdropFilter: 'saturate(180%) blur(14px)', borderBottom: '1px solid #E7E9F2' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg,#FB2C36 0%,#FB2C36 28%,#1B44F5 62%,#1B44F5 100%)' }} />
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: '13px clamp(16px,4vw,40px)', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <button data-route="landing" onClick={app.onNav} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0 }}>
          <span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-.03em' }}><span style={{ color: '#FB2C36' }}>Tech</span><span style={{ color: '#1B44F5' }}>Agent</span></span>
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8, flexWrap: 'wrap' }}>
          <button data-route="catalog" onClick={app.onNav} className="ta-nav" style={{ background: 'none', border: 'none', padding: '9px 13px', borderRadius: 9, fontWeight: 500, fontSize: 14.5, color: '#3A4256' }}>Каталог</button>
          <button data-route="how" onClick={app.onNav} className="ta-nav" style={{ background: 'none', border: 'none', padding: '9px 13px', borderRadius: 9, fontWeight: 500, fontSize: 14.5, color: '#3A4256' }}>Как это работает</button>
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button data-route="profile" onClick={app.onNav} className="ta-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '10px 15px', fontWeight: 600, fontSize: 14 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" /></svg>
            Войти
          </button>
          <button data-route="orders" onClick={app.onNav} className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '11px 17px', fontWeight: 600, fontSize: 14, boxShadow: '0 6px 16px rgba(27,68,245,.28)' }}>
            Кабинет партнёра
          </button>
        </div>
      </div>
    </header>
  )
}
