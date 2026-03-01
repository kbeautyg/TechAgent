import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const { register, user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    companyName: '',
    inn: '',
    ogrnip: '',
    email: '',
    phone: '',
    password: '',
    agree: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.companyName.trim()) errs.companyName = 'Введите название компании'
    if (!/^\d{12}$/.test(form.inn)) errs.inn = 'ИНН должен содержать 12 цифр'
    if (!/^\d{15}$/.test(form.ogrnip)) errs.ogrnip = 'ОГРНИП должен содержать 15 цифр'
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
    const success = await register({
      companyName: form.companyName,
      inn: form.inn,
      ogrnip: form.ogrnip,
      email: form.email,
      phone: form.phone,
      password: form.password,
    })
    if (success) {
      navigate('/dashboard')
    }
    setLoading(false)
  }

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-red-500/50' : 'border-border'
    } bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm`

  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-center justify-center py-12 px-4 bg-white">
      <div className="absolute bottom-[-80px] left-[30%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="w-full max-w-lg relative">
        <div className="card-glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="icon-box mx-auto mb-4">
              <UserPlus size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Регистрация партнёра</h1>
            <p className="text-text-muted text-sm mt-1">Создайте аккаунт для работы с платформой</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Название компании</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update('companyName', e.target.value)}
                className={inputCls('companyName')}
                placeholder="Партнёр Иванов Иван Иванович"
                autoComplete="organization"
              />
              {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">ИНН</label>
                <input
                  type="text"
                  value={form.inn}
                  onChange={(e) => update('inn', e.target.value.replace(/\D/g, '').slice(0, 12))}
                  className={inputCls('inn')}
                  placeholder="123456789012"
                  maxLength={12}
                />
                {errors.inn && <p className="text-red-400 text-xs mt-1">{errors.inn}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">ОГРНИП</label>
                <input
                  type="text"
                  value={form.ogrnip}
                  onChange={(e) => update('ogrnip', e.target.value.replace(/\D/g, '').slice(0, 15))}
                  className={inputCls('ogrnip')}
                  placeholder="123456789012345"
                  maxLength={15}
                />
                {errors.ogrnip && <p className="text-red-400 text-xs mt-1">{errors.ogrnip}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputCls('email')}
                placeholder="email@example.com"
                autoComplete="email"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Телефон</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={inputCls('phone')}
                placeholder="+7 999 123-45-67"
                autoComplete="tel"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                className={inputCls('password')}
                placeholder="Минимум 8 символов"
                autoComplete="new-password"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              {form.password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                        form.password.length >= i * 3
                          ? form.password.length >= 12 ? 'bg-green-500' : form.password.length >= 9 ? 'bg-yellow-500' : 'bg-red-400'
                          : 'bg-gray-200'
                      }`} />
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">
                    {form.password.length < 8 ? 'Слишком короткий' : form.password.length < 10 ? 'Нормальный' : 'Надёжный'}
                  </span>
                </div>
              )}
            </div>

            {/* Legal documents */}
            <div className="bg-bg-light rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-text-secondary mb-2">Ознакомьтесь перед регистрацией:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/legal/offer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/8 px-3 py-1.5 rounded-lg no-underline hover:bg-primary/15 transition-colors">
                  📄 Публичная оферта
                </Link>
                <Link to="/legal/privacy" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/8 px-3 py-1.5 rounded-lg no-underline hover:bg-primary/15 transition-colors">
                  🔒 Политика конфиденциальности
                </Link>
                <Link to="/legal/terms" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/8 px-3 py-1.5 rounded-lg no-underline hover:bg-primary/15 transition-colors">
                  📋 Пользовательское соглашение
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => update('agree', e.target.checked)}
                className="mt-1 accent-primary"
                id="agree"
              />
              <label htmlFor="agree" className="text-sm text-text-muted">
                Я подтверждаю, что являюсь импортёром и принимаю условия{' '}
                <Link to="/legal/offer" className="text-primary no-underline hover:underline">публичной оферты</Link>,{' '}
                <Link to="/legal/privacy" className="text-primary no-underline hover:underline">политики конфиденциальности</Link>{' '}
                и <Link to="/legal/terms" className="text-primary no-underline hover:underline">пользовательского соглашения</Link>
              </label>
            </div>
            {errors.agree && <p className="text-red-400 text-xs">{errors.agree}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          <p className="text-center text-text-muted text-sm mt-6">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-primary font-semibold no-underline hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
