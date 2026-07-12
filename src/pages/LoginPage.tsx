import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from '../lib/techagent'

const field: React.CSSProperties = { width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '13px 15px', fontSize: 14.5, outline: 'none' }
const label: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const success = await login(email, password)
    if (success) navigate('/dashboard')
    else setError('Неверный email или пароль')
    setLoading(false)
  }

  return (
    <section>
      <div style={{ maxWidth: 440, margin: '0 auto', padding: 'clamp(28px,5vw,60px) clamp(16px,4vw,40px)' }}>
        <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, boxShadow: '0 20px 50px rgba(11,16,32,.08)', padding: 'clamp(24px,4vw,34px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 26 }}>
            <span style={{ width: 48, height: 48, borderRadius: 14, background: '#EDF0FF', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}><Icon name="user" size={22} color="#1B44F5" /></span>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: '-.02em', margin: '0 0 6px' }}>Вход</h1>
            <div style={{ fontSize: 14, color: '#8891A5' }}>Войдите в личный кабинет партнёра</div>
          </div>

          {error && (
            <div style={{ background: '#FFECEC', border: '1px solid #FFD3D6', color: '#C81E2C', fontSize: 13.5, borderRadius: 12, padding: '11px 14px', marginBottom: 18 }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={label}>Email</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} className="ta-input" style={field} placeholder="email@example.com" autoComplete="email" required />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={label}>Пароль</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError('') }} className="ta-input" style={field} placeholder="Введите пароль" autoComplete="current-password" required />
            </div>
            <button type="submit" disabled={loading} className="ta-btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 15, fontWeight: 600, fontSize: 15.5, boxShadow: '0 8px 20px rgba(27,68,245,.26)', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Вход…' : 'Войти'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 14 }}>
            <button type="button" onClick={() => alert('Для восстановления пароля обратитесь в поддержку: info@techagent.pro')} className="ta-ghost" style={{ background: 'none', border: 'none', color: '#8891A5', fontSize: 13.5, cursor: 'pointer' }}>Забыли пароль?</button>
          </p>
          <p style={{ textAlign: 'center', color: '#8891A5', fontSize: 14, marginTop: 20 }}>
            Нет аккаунта? <Link to="/register" style={{ color: '#1B44F5', fontWeight: 600, textDecoration: 'none' }}>Регистрация</Link>
          </p>

          <div style={{ marginTop: 22, borderTop: '1px solid #EEF0F6', paddingTop: 18 }}>
            <div style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#8891A5', letterSpacing: '.06em', marginBottom: 12 }}>ДЕМО-ДОСТУП</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button type="button" onClick={() => { setEmail('demo@techagent.pro'); setPassword('demo') }} className="ta-tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 12, padding: '11px 14px', textAlign: 'left' }}>
                <span><span style={{ display: 'block', fontWeight: 600, fontSize: 13.5 }}>Кабинет партнёра</span><span style={{ display: 'block', fontSize: 12, color: '#8891A5' }}>demo@techagent.pro</span></span>
                <span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '5px 8px', borderRadius: 999 }}>Партнёр</span>
              </button>
              <button type="button" onClick={() => { setEmail('admin@techagent.pro'); setPassword('admin') }} className="ta-tile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 12, padding: '11px 14px', textAlign: 'left' }}>
                <span><span style={{ display: 'block', fontWeight: 600, fontSize: 13.5 }}>Панель администратора</span><span style={{ display: 'block', fontSize: 12, color: '#8891A5' }}>admin@techagent.pro</span></span>
                <span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '5px 8px', borderRadius: 999 }}>Админ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
