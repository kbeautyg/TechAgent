import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn } from 'lucide-react'

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
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Неверный email или пароль')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-center justify-center py-12 px-4 bg-white">
      <div className="absolute top-[-80px] right-[20%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="w-full max-w-md relative">
        <div className="card-glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="icon-box mx-auto mb-4">
              <LogIn size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Вход</h1>
            <p className="text-text-muted text-sm mt-1">Войдите в личный кабинет</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm"
                placeholder="email@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm"
                placeholder="Введите пароль"
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <p className="text-center mt-3">
            <button type="button" onClick={() => alert('Для восстановления пароля обратитесь в поддержку: info@techagent.ru')} className="text-text-muted text-sm bg-transparent border-none cursor-pointer hover:text-primary transition-colors">
              Забыли пароль?
            </button>
          </p>

          <p className="text-center text-text-muted text-sm mt-6">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-primary font-semibold no-underline hover:underline">
              Регистрация
            </Link>
          </p>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Демо-доступ</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => { setEmail('demo@techagent.ru'); setPassword('demo') }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-bg-light hover:bg-primary/10 transition-colors cursor-pointer border border-border text-left"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">Личный кабинет партнёра</p>
                  <p className="text-xs text-text-muted">demo@techagent.ru</p>
                </div>
                <span className="text-xs text-primary font-medium">Партнёр</span>
              </button>
              <button
                type="button"
                onClick={() => { setEmail('admin@techagent.ru'); setPassword('admin') }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-bg-light hover:bg-primary/10 transition-colors cursor-pointer border border-border text-left"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">Панель администратора</p>
                  <p className="text-xs text-text-muted">admin@techagent.ru</p>
                </div>
                <span className="text-xs text-primary font-medium">Админ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
