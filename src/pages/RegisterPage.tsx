import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserPlus, CheckCircle2 } from 'lucide-react'
import { reachGoal } from '../lib/metrika'
import { onlyDigits, formatPhone, partnerErrors } from '../utils/validate'
import { submitApplication, type ApplicationData } from '../data/applications'

/*
 * Заявка партнёра. Самостоятельной регистрации нет: ТехЭйджент проверяет заявку и сам открывает доступ
 * в кабинет — присылает email для входа и временный пароль (агентский договор-оферта, п. 2.1).
 */

type Field = keyof ApplicationData | 'agreePrivacy'

const emptyForm: ApplicationData & { agreePrivacy: boolean } = {
  companyName: '',
  inn: '',
  ogrn: '',
  pointAddress: '',
  contactName: '',
  phone: '',
  email: '',
  bankName: '',
  bik: '',
  account: '',
  comment: '',
  agreePrivacy: false,
}

export default function RegisterPage() {
  const { user } = useAuth()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [loading, setLoading] = useState(false)
  /** Куда ТехЭйджент пришлёт данные для входа — показываем после отправки */
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  if (user) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />
  }

  const validate = () => {
    // Те же проверки, что в профиле: ИНН и ОГРН с контрольными суммами, БИК, счёт по ключу БИК, телефон, email
    const errs: Partial<Record<Field, string>> = partnerErrors(form)
    if (!form.agreePrivacy) errs.agreePrivacy = 'Нужно согласие на обработку персональных данных'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setFailed(false)
    const data: ApplicationData = {
      companyName: form.companyName,
      inn: form.inn,
      ogrn: form.ogrn,
      pointAddress: form.pointAddress,
      contactName: form.contactName,
      phone: formatPhone(form.phone),
      email: form.email.trim(),
      bankName: form.bankName.trim(),
      bik: form.bik,
      account: form.account,
      comment: form.comment?.trim() || undefined,
    }
    const ok = await submitApplication(data)
    setLoading(false)
    if (!ok) {
      setFailed(true)
      return
    }
    reachGoal('register_submit')
    setSentTo(data.email)
    window.scrollTo(0, 0)
  }

  const update = (field: Field, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const inputCls = (field: Field) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-red-500/50' : 'border-border'
    } bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm`

  /* У полей с цифрами нет maxLength: при вставке «4070 2810 9000 0000 1234» пробелы отбрасываются, а не обрезают номер */
  const input = (
    field: Exclude<keyof ApplicationData, 'comment'>,
    label: string,
    opts: { type?: string; placeholder?: string; autoComplete?: string; digitsMax?: number; onBlur?: () => void } = {},
  ) => (
    <div>
      <label htmlFor={`reg-${field}`} className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>
      <input
        id={`reg-${field}`}
        type={opts.type ?? 'text'}
        inputMode={opts.digitsMax ? 'numeric' : undefined}
        value={form[field]}
        onChange={(e) => update(field, opts.digitsMax ? onlyDigits(e.target.value, opts.digitsMax) : e.target.value)}
        onBlur={opts.onBlur}
        className={inputCls(field)}
        placeholder={opts.placeholder}
        autoComplete={opts.autoComplete}
        aria-invalid={errors[field] ? true : undefined}
      />
      {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
    </div>
  )

  if (sentTo) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-white">
        <div className="w-full max-w-xl card-glass rounded-2xl p-6 sm:p-8 text-center">
          <div className="icon-box mx-auto mb-4">
            <CheckCircle2 size={24} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">Заявка отправлена</h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            ТехЭйджент проверит данные и при необходимости запросит документы. После проверки на{' '}
            <span className="font-medium text-text-primary break-all">{sentTo}</span> придут адрес входа в кабинет и
            временный пароль.
          </p>
          <p className="text-text-muted text-sm mt-4">
            Вопросы —{' '}
            <a href="mailto:partners@techagent.pro" className="text-primary no-underline hover:underline">partners@techagent.pro</a>
          </p>
          <Link to="/" className="btn-primary inline-flex mt-6 px-6 py-3 rounded-xl font-semibold no-underline">На главную</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-start sm:items-center justify-center pt-4 pb-10 sm:py-12 px-4 bg-white">
      <div className="absolute bottom-[-80px] left-[30%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="w-full max-w-xl relative">
        <div className="form-shell card-glass rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="icon-box mx-auto mb-4">
              <UserPlus size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Заявка партнёра</h1>
            <p className="text-text-muted text-sm mt-1">
              ТехЭйджент проверит данные и пришлёт доступ в кабинет на ваш email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <fieldset className="space-y-4">
              <legend className="font-bold text-text-primary mb-3">Партнёр</legend>
              {input('companyName', 'Наименование', { placeholder: 'Полное наименование', autoComplete: 'organization' })}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {input('inn', 'ИНН', { placeholder: '10 или 12 цифр', digitsMax: 12 })}
                {input('ogrn', 'ОГРН / ОГРНИП', { placeholder: '13 или 15 цифр', digitsMax: 15 })}
              </div>
              {input('pointAddress', 'Адрес пункта выдачи', { placeholder: 'Город, улица, дом, помещение', autoComplete: 'street-address' })}
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-bold text-text-primary mb-3">Контакты</legend>
              {input('contactName', 'Контактное лицо', { placeholder: 'ФИО', autoComplete: 'name' })}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {input('phone', 'Телефон', {
                  type: 'tel',
                  placeholder: '+7 900 000-00-00',
                  autoComplete: 'tel',
                  onBlur: () => setForm((prev) => ({ ...prev, phone: formatPhone(prev.phone) })),
                })}
                {input('email', 'Email', { type: 'email', placeholder: 'email@example.com', autoComplete: 'email' })}
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-bold text-text-primary mb-1">Реквизиты для выплаты вознаграждения</legend>
              <p className="text-xs text-text-muted -mt-1">На этот счёт ТехЭйджент перечисляет вознаграждение партнёра.</p>
              {input('bankName', 'Банк', { placeholder: 'Наименование банка' })}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {input('bik', 'БИК', { placeholder: '9 цифр', digitsMax: 9 })}
                {input('account', 'Расчётный счёт', { placeholder: '20 цифр', digitsMax: 20 })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="reg-comment" className="block text-sm font-medium text-text-secondary mb-1.5">
                Комментарий <span className="text-text-muted font-normal">(необязательно)</span>
              </label>
              <textarea
                id="reg-comment"
                rows={3}
                value={form.comment}
                onChange={(e) => update('comment', e.target.value)}
                maxLength={1000}
                className={`${inputCls('comment')} resize-y`}
                placeholder="Например, часы работы точки или удобное время для звонка"
              />
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={form.agreePrivacy}
                    onChange={(e) => update('agreePrivacy', e.target.checked)}
                    className="mt-1 accent-primary"
                    id="agreePrivacy"
                  />
                  <label htmlFor="agreePrivacy" className="text-sm text-text-secondary">
                    Даю согласие на обработку персональных данных в соответствии с{' '}
                    <Link to="/legal/privacy" target="_blank" className="text-primary no-underline hover:underline">Политикой конфиденциальности</Link>
                  </label>
                </div>
                {errors.agreePrivacy && <p className="text-red-400 text-xs mt-1">{errors.agreePrivacy}</p>}
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="text-red-400 text-sm">Проверьте поля, отмеченные выше.</p>
            )}
            {failed && (
              <p className="text-red-500 text-sm" role="alert">
                Заявка не отправилась. Попробуйте ещё раз или напишите на{' '}
                <a href="mailto:partners@techagent.pro" className="text-primary no-underline hover:underline">partners@techagent.pro</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {loading ? 'Отправка…' : 'Отправить заявку'}
            </button>
          </form>

          <p className="text-center text-text-muted text-sm mt-6">
            ТехЭйджент уже открыл вам доступ?{' '}
            <Link to="/login" className="text-primary font-semibold no-underline hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
