import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: 'clamp(60px,10vw,120px) clamp(16px,4vw,40px)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(64px,14vw,120px)', color: '#EDF0FF', lineHeight: 1, marginBottom: 10 }}>404</div>
        <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,3vw,1.9rem)', letterSpacing: '-.02em', margin: '0 0 10px' }}>Страница не найдена</h1>
        <p style={{ fontSize: 14.5, color: '#8891A5', margin: '0 0 28px', lineHeight: 1.5 }}>Возможно, она была перемещена или удалена. Попробуйте начать с главной страницы.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 26 }}>
          <Link to="/" className="ta-btn-primary" style={{ background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: '13px 22px', fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}>На главную</Link>
          <Link to="/catalog" className="ta-outline" style={{ background: '#fff', color: '#0B1020', border: '1px solid #E7E9F2', borderRadius: 13, padding: '13px 22px', fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}>Каталог</Link>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', fontSize: 13.5, color: '#8891A5' }}>
          <Link to="/about" className="ta-ghost" style={{ color: '#8891A5', textDecoration: 'none' }}>О платформе</Link><span>·</span>
          <Link to="/how-it-works" className="ta-ghost" style={{ color: '#8891A5', textDecoration: 'none' }}>Как работает</Link><span>·</span>
          <Link to="/login" className="ta-ghost" style={{ color: '#8891A5', textDecoration: 'none' }}>Войти</Link>
        </div>
      </div>
    </section>
  )
}
