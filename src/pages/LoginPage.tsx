import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn } from 'lucide-react'
import { reachGoal } from '../lib/metrika'
import { startDemo } from '../utils/demo'
import { PreviewNotice } from '../components/layout/DashboardLayout'
import type { User } from '../types'

/** Куда вести после входа: на страницу, куда человек шёл, если она из его раздела; иначе — в кабинет или админку */
function afterLogin(user: User, from: unknown): string {
  const home = user.role === 'ADMIN' ? '/admin' : '/dashboard'
  if (typeof from !== 'string' || !from.startsWith('/') || from.startsWith('//')) return home
  return from === home || from.startsWith(`${home}/`) || from.startsWith(`${home}?`) ? from : home
}

export default function LoginPage() {
  const { login, user } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRecovery, setShowRecovery] = useState(false)

  if (user) {
    return <Navigate to={afterLogin(user, (location.state as { from?: unknown } | null)?.from)} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const success = await login(email, password)
    if (success) {
      // Переход в кабинет или админку — редиректом выше, по роли
      reachGoal('login_submit')
    } else {
      setError('Неверный email или пароль')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-center justify-center py-12 px-4 bg-white">
      <div className="absolute top-[-80px] right-[20%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="w-full max-w-md relative">
        <PreviewNotice className="mb-4" />
        <div className="card-glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="icon-box mx-auto mb-4">
              <LogIn size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Вход</h1>
            <p className="text-text-muted text-sm mt-1">Личный кабинет партнёра</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                id="login-email"
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
              <label htmlFor="login-password" className="block text-sm font-medium text-text-secondary mb-1.5">Пароль</label>
              <input
                id="login-password"
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
              {loading ? 'Вход…' : 'Войти'}
            </button>
          </form>

          <p className="text-center mt-3">
            <button
              type="button"
              onClick={() => setShowRecovery((v) => !v)}
              aria-expanded={showRecovery}
              className="text-text-muted text-sm bg-transparent border-none cursor-pointer hover:text-primary transition-colors"
            >
              Забыли пароль?
            </button>
          </p>
          {showRecovery && (
            <p className="text-center text-sm text-text-secondary mt-1">
              Для восстановления пароля напишите на{' '}
              <a href="mailto:partners@techagent.pro" className="text-primary no-underline hover:underline">partners@techagent.pro</a>
            </p>
          )}

          <p className="text-center text-text-muted text-sm mt-6">
            Ещё не партнёр?{' '}
            <Link to="/register" className="text-primary font-semibold no-underline hover:underline">
              Оставить заявку
            </Link>
          </p>

          {/* Тестовый вход: кабинет партнёра на демо-данных, только в этом браузере (utils/demo.ts) */}
          <div className="mt-6 border-t border-border pt-5 text-center">
            <button
              type="button"
              onClick={() => startDemo('partner')}
              className="w-full px-4 py-2.5 rounded-xl bg-bg-light hover:bg-primary/10 transition-colors cursor-pointer border border-border text-sm font-medium text-text-primary"
            >
              Тестовый демо-доступ
            </button>
            <p className="text-xs text-text-muted mt-2">Кабинет партнёра на демо-данных — без регистрации</p>
          </div>
        </div>
      </div>
    </div>
  )
}
