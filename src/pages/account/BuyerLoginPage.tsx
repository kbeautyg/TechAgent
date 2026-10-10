import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { api, apiErrorText } from '../../lib/api'
import { refreshAccount, useAccount } from '../../utils/account'
import { emailError } from '../../utils/validate'
import { PageBar } from '../../components/app/ui'
import { SUPPORT_EMAIL } from '../../seo/site'

const fieldCls =
  'w-full h-[54px] px-4 rounded-2xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none text-base'
const RESEND_SEC = 60

/** Тестовый вход: кабинет покупателя с примерами заказов на разных этапах — как демо-доступ у партнёра */
function DemoEntry() {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  return (
    <div className="mt-8 border-t border-border pt-5 text-center">
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true)
          try {
            await api('/auth/demo', {})
            await refreshAccount()
            navigate('/account', { replace: true })
          } catch {
            setBusy(false)
          }
        }}
        className="w-full px-4 py-3 rounded-xl bg-bg-light hover:bg-primary/10 transition-colors cursor-pointer border border-border text-[15px] font-medium text-text-primary"
      >
        {busy ? 'Открываем…' : 'Тестовый демо-доступ'}
      </button>
      <p className="text-xs text-text-muted mt-2">Кабинет покупателя с примерами заказов — без регистрации</p>
    </div>
  )
}

/** Вход покупателя по коду на email: пароль не нужен. Кабинет есть у того, кто уже оформлял заказ */
export default function BuyerLoginPage() {
  const account = useAccount()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [email, setEmail] = useState(params.get('email') ?? '')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [mailOff, setMailOff] = useState(false)
  const [devCode, setDevCode] = useState('')
  const [left, setLeft] = useState(0)
  const codeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => clearTimeout(t)
  }, [left])

  if (account.role === 'buyer') return <Navigate to="/account" replace />

  const requestCode = async (e?: FormEvent) => {
    e?.preventDefault()
    const err = emailError(email)
    if (err) return setError(err)
    setBusy(true)
    setError('')
    try {
      const r = await api<{ mail: boolean; devCode?: string }>('/auth/code', { email: email.trim() })
      setMailOff(!r.mail && !r.devCode)
      setDevCode(r.devCode ?? '')
      setStep('code')
      setCode('')
      setLeft(RESEND_SEC)
      setTimeout(() => codeRef.current?.focus(), 50)
    } catch (x) {
      setError(apiErrorText(x))
    }
    setBusy(false)
  }

  const verify = async (value = code) => {
    if (value.length !== 6 || busy) return
    setBusy(true)
    setError('')
    try {
      await api('/auth/verify', { email: email.trim(), code: value })
      await refreshAccount()
      navigate('/account', { replace: true })
    } catch (x) {
      setError(apiErrorText(x))
      setBusy(false)
    }
  }

  return (
    <div className="acc-narrow">
      <PageBar back={step === 'code' ? undefined : '/login'} onBack={step === 'code' ? () => setStep('email') : undefined} backLabel="Назад" title="Вход для покупателя" />

      {step === 'email' ? (
        <form onSubmit={requestCode} noValidate>
          <h2 className="acc-h1">Код на почту</h2>
          <p className="acc-lead">Пароль не нужен: пришлём код на email, который вы указали в заказе.</p>
          <label htmlFor="bl-email" className="block text-sm font-semibold mb-2 ml-1 text-text-secondary">Email</label>
          <input
            id="bl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            className={fieldCls}
            placeholder="name@mail.ru"
            autoFocus
          />
          {error && <p className="text-red-600 text-[13.5px] mt-2 ml-1">{error}</p>}
          <button type="submit" disabled={busy} className="app-btn app-btn-primary mt-5">
            {busy ? 'Отправляем…' : 'Получить код'}
          </button>
          <p className="acc-note">Кабинет появляется после первого заказа на сайте.</p>
          <DemoEntry />
        </form>
      ) : (
        <div>
          <h2 className="acc-h1">Введите код</h2>
          <p className="acc-lead">
            Если адрес <b className="text-text-primary">{email.trim()}</b> есть в заказах, на него пришло письмо с кодом. Код действует 15 минут.
          </p>
          <input
            ref={codeRef}
            id="bl-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 6)
              setCode(v)
              setError('')
              if (v.length === 6) void verify(v)
            }}
            className="acc-code"
            placeholder="••••••"
            aria-label="Код из письма"
          />
          {devCode && <p className="acc-note">Разработка: код {devCode}</p>}
          {mailOff && (
            <p className="acc-warn">
              Письма с сайта пока не отправляются — почта подключается. Если код не пришёл, напишите нам:{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
          )}
          {error && <p className="text-red-600 text-[13.5px] mt-2 text-center">{error}</p>}
          <button type="button" onClick={() => verify()} disabled={busy || code.length !== 6} className="app-btn app-btn-primary mt-5">
            {busy ? 'Проверяем…' : 'Войти'}
          </button>
          <button type="button" onClick={() => requestCode()} disabled={left > 0 || busy} className="acc-link-btn">
            {left > 0 ? `Отправить снова — через ${left} с` : 'Отправить код снова'}
          </button>
        </div>
      )}
    </div>
  )
}
