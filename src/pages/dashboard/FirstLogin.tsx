import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

/*
 * Первый вход партнёра, которого завёл ТехЭйджент по заявке: свой пароль вместо временного
 * и согласие с агентским договором-офертой — это и есть акцепт (оферта, п. 2.1). До этого кабинет закрыт.
 */

const fieldCls =
  'w-full px-4 py-3 rounded-lg border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm'

export default function FirstLogin() {
  const { user, setPassword, updateProfile } = useAuth()
  const [password, setPw] = useState('')
  const [repeat, setRepeat] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (!user) return null
  const needPassword = !!user.mustChangePassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (needPassword && password.length < 8) return setError('Пароль — минимум 8 символов')
    if (needPassword && password !== repeat) return setError('Пароли не совпадают')
    if (!agree) return setError('Без согласия с агентским договором-офертой работа в кабинете невозможна')
    setError('')
    setSaving(true)
    if (needPassword) await setPassword(password)
    updateProfile((fresh) => (fresh.offerAcceptedAt ? null : { offerAcceptedAt: new Date().toISOString() }))
    setSaving(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="max-w-xl">
      <div className="card p-6 sm:p-8">
        <div className="icon-box mb-4">
          <KeyRound size={24} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Добро пожаловать в TechAgent</h1>
        <p className="text-sm text-text-secondary mb-6">
          ТехЭйджент проверил вашу заявку и открыл доступ в кабинет.
          {needPassword ? ' Задайте свой пароль вместо временного и примите условия работы.' : ' Примите условия работы.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {needPassword && (
            <>
              <div>
                <label htmlFor="fl-password" className="block text-sm font-medium mb-1.5 text-text-secondary">Новый пароль</label>
                <input
                  id="fl-password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPw(e.target.value); setError('') }}
                  className={`${fieldCls} border-border`}
                  placeholder="Минимум 8 символов"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="fl-repeat" className="block text-sm font-medium mb-1.5 text-text-secondary">Пароль ещё раз</label>
                <input
                  id="fl-repeat"
                  type="password"
                  value={repeat}
                  onChange={(e) => { setRepeat(e.target.value); setError('') }}
                  className={`${fieldCls} border-border`}
                  autoComplete="new-password"
                />
              </div>
            </>
          )}

          <div className="flex items-start gap-2">
            <input
              id="fl-agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => { setAgree(e.target.checked); setError('') }}
              className="mt-1 accent-primary"
            />
            <label htmlFor="fl-agree" className="text-sm text-text-secondary">
              Принимаю условия{' '}
              <Link to="/legal/offer" target="_blank" className="text-primary no-underline hover:underline">агентского договора-оферты</Link>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
          >
            {saving ? 'Сохраняем…' : 'Начать работу'}
          </button>
        </form>
      </div>
    </div>
  )
}
