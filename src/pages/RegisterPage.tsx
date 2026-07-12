import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from '../lib/techagent'

const label: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }
const fieldBase = (hasError: boolean): React.CSSProperties => ({ width: '100%', background: '#F5F6FB', border: `1px solid ${hasError ? '#FB8790' : '#E7E9F2'}`, borderRadius: 12, padding: '13px 15px', fontSize: 14.5, outline: 'none' })
const errTxt: React.CSSProperties = { color: '#C81E2C', fontSize: 12.5, marginTop: 6 }
const legalChip: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '8px 11px', borderRadius: 999, textDecoration: 'none' }

export default function RegisterPage() {
  const { register, user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ companyName: '', inn: '', ogrnip: '', email: '', phone: '', password: '', agree: false })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.companyName.trim()) errs.companyName = 'Введите название компании'
    if (!/^\d{12}$/.test(form.inn)) errs.inn = 'ИНН должен содержать 12 цифр'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Введите корректный email'
    if (!form.phone.trim()) errs.phone = 'Введите телефон'
    if (form.password.length < 8) errs.password = 'Минимум 8 символов'
    if (!form.agree) errs.agree = 'Необходимо согласие'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    const success = await register({ companyName: form.companyName, inn: form.inn, ogrnip: form.ogrnip, email: form.email, phone: form.phone, password: form.password })
    if (success) navigate('/dashboard')
    setLoading(false)
  }

  const update = (field2: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field2]: value }))
    if (errors[field2]) setErrors((prev) => { const next = { ...prev }; delete next[field2]; return next })
  }

  const pwStrength = form.password.length >= 12 ? 'Надёжный' : form.password.length >= 9 ? 'Нормальный' : form.password.length > 0 ? 'Слишком короткий' : ''
  const pwColor = form.password.length >= 12 ? '#12B981' : form.password.length >= 9 ? '#E38A00' : '#FB2C36'

  return (
    <section>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: 'clamp(28px,5vw,60px) clamp(16px,4vw,40px)' }}>
        <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, boxShadow: '0 20px 50px rgba(11,16,32,.08)', padding: 'clamp(24px,4vw,34px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 26 }}>
            <span style={{ width: 48, height: 48, borderRadius: 14, background: '#EDF0FF', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}><Icon name="plus" size={22} color="#1B44F5" /></span>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: '-.02em', margin: '0 0 6px' }}>Регистрация партнёра</h1>
            <div style={{ fontSize: 14, color: '#8891A5' }}>Создайте аккаунт для работы с платформой</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={label}>Название компании</label>
              <input value={form.companyName} onChange={(e) => update('companyName', e.target.value)} className="ta-input" style={fieldBase(!!errors.companyName)} placeholder="Партнёр Иванов Иван Иванович" autoComplete="organization" />
              {errors.companyName && <div style={errTxt}>{errors.companyName}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={label}>ИНН</label>
              <input value={form.inn} onChange={(e) => update('inn', e.target.value.replace(/\D/g, '').slice(0, 12))} className="ta-input" style={fieldBase(!!errors.inn)} placeholder="123456789012" maxLength={12} />
              {errors.inn && <div style={errTxt}>{errors.inn}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={label}>Email</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="ta-input" style={fieldBase(!!errors.email)} placeholder="email@example.com" autoComplete="email" />
              {errors.email && <div style={errTxt}>{errors.email}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={label}>Телефон</label>
              <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="ta-input" style={fieldBase(!!errors.phone)} placeholder="+7 999 123-45-67" autoComplete="tel" />
              {errors.phone && <div style={errTxt}>{errors.phone}</div>}
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={label}>Пароль</label>
              <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} className="ta-input" style={fieldBase(!!errors.password)} placeholder="Минимум 8 символов" autoComplete="new-password" />
              {errors.password && <div style={errTxt}>{errors.password}</div>}
              {form.password && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 999, background: '#EEF0F6', overflow: 'hidden' }}><div style={{ height: '100%', width: Math.min(100, form.password.length * 8) + '%', background: pwColor, transition: '.2s' }} /></div>
                  <span style={{ fontSize: 12, color: pwColor, fontWeight: 600, whiteSpace: 'nowrap' }}>{pwStrength}</span>
                </div>
              )}
            </div>

            <div style={{ background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 14, padding: 16, marginBottom: 18 }}>
              <div style={{ fontWeight: 600, fontSize: 12.5, color: '#3A4256', marginBottom: 10 }}>Ознакомьтесь перед регистрацией:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <Link to="/legal/offer" style={legalChip}><Icon name="doc" size={13} />Оферта</Link>
                <Link to="/legal/privacy" style={legalChip}><Icon name="shield" size={13} />Конфиденциальность</Link>
                <Link to="/legal/terms" style={legalChip}><Icon name="doc" size={13} />Соглашение</Link>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} style={{ marginTop: 3, accentColor: '#1B44F5', flex: 'none' }} />
              <span style={{ fontSize: 13.5, color: '#5B647A', lineHeight: 1.5 }}>
                Я подтверждаю, что являюсь импортёром и принимаю условия{' '}
                <Link to="/legal/offer" style={{ color: '#1B44F5', textDecoration: 'none' }}>публичной оферты</Link>,{' '}
                <Link to="/legal/privacy" style={{ color: '#1B44F5', textDecoration: 'none' }}>политики конфиденциальности</Link>{' '}
                и <Link to="/legal/terms" style={{ color: '#1B44F5', textDecoration: 'none' }}>пользовательского соглашения</Link>
              </span>
            </label>
            {errors.agree && <div style={{ ...errTxt, marginBottom: 12 }}>{errors.agree}</div>}

            <button type="submit" disabled={loading} className="ta-btn-primary" style={{ width: '100%', marginTop: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 15, fontWeight: 600, fontSize: 15.5, boxShadow: '0 8px 20px rgba(27,68,245,.26)', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Регистрация…' : 'Зарегистрироваться'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#8891A5', fontSize: 14, marginTop: 20 }}>
            Уже есть аккаунт? <Link to="/login" style={{ color: '#1B44F5', fontWeight: 600, textDecoration: 'none' }}>Войти</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
