import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Save, Check, User, Building2, Landmark, ShieldCheck, Globe, LogOut, ChevronRight } from 'lucide-react'
import { PageBar } from '../../components/app/ui'
import { useAuth } from '../../context/AuthContext'
import { PARTNER_STATUS_LABELS, PARTNER_STATUS_COLORS } from '../../utils/status'
import { formatDate, formatPercent, rewardPercentAt, pendingRewardChange } from '../../utils/calculate'
import { onlyDigits, formatPhone, partnerErrors, type PartnerErrors, type PartnerFields } from '../../utils/validate'

const fieldCls =
  'w-full h-[52px] lg:h-12 px-4 rounded-2xl lg:rounded-xl border bg-white lg:bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm disabled:text-text-muted disabled:cursor-not-allowed'

type FormKey = 'companyName' | 'inn' | 'ogrn' | 'pointAddress' | 'contactName' | 'phone' | 'bankName' | 'bik' | 'account'

/** Подтверждённый партнёр меняет только контакты, остальное — через ТехЭйджент */
const CONTACT_KEYS: FormKey[] = ['contactName', 'phone']
const ALL_KEYS: FormKey[] = ['companyName', 'inn', 'ogrn', 'pointAddress', 'contactName', 'phone', 'bankName', 'bik', 'account']

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<PartnerErrors>({})
  const [form, setForm] = useState<Record<FormKey, string>>({
    companyName: user?.companyName ?? '',
    inn: user?.inn ?? '',
    ogrn: user?.ogrn ?? '',
    pointAddress: user?.pointAddress ?? '',
    contactName: user?.contactName ?? '',
    phone: user?.phone ?? '',
    bankName: user?.bankName ?? '',
    bik: user?.bik ?? '',
    account: user?.account ?? '',
  })

  if (!user) return null

  const status = user.partnerStatus ?? 'PENDING'
  const verified = status === 'VERIFIED'
  // После подтверждения данные анкеты и реквизиты меняются только через ТехЭйджент
  const anketaLocked = verified
  const percent = rewardPercentAt(user)
  const pending = pendingRewardChange(user)

  const set = (k: FormKey, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setSaved(false)
    if (errors[k]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[k]
        return next
      })
    }
  }

  const handleSave = () => {
    // Пустые обязательные поля и неверные значения не сохраняются; у подтверждённого партнёра нельзя стереть телефон
    const data: PartnerFields = { ...form, email: user.email }
    const errs = partnerErrors(data, anketaLocked ? CONTACT_KEYS : ALL_KEYS)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      setSaved(false)
      return
    }
    const phone = formatPhone(form.phone)
    const contacts = { contactName: form.contactName.trim(), phone }
    updateProfile((fresh) =>
      // Анкету могли подтвердить в другой вкладке — тогда сохраняются только контакты
      fresh.partnerStatus === 'VERIFIED'
        ? contacts
        : {
            ...contacts,
            companyName: form.companyName.trim(),
            inn: form.inn,
            ogrn: form.ogrn,
            pointAddress: form.pointAddress.trim(),
            bankName: form.bankName.trim(),
            bik: form.bik,
            account: form.account,
            // Исправленная анкета снова уходит на проверку
            partnerStatus: 'PENDING',
            rejectReason: undefined,
          },
    )
    setForm((f) => ({ ...f, phone }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  /* У полей с цифрами нет maxLength: вставка с пробелами не обрезается, лишнее отбрасывает onlyDigits */
  const field = (
    k: FormKey,
    label: string,
    locked: boolean,
    opts: { placeholder?: string; digitsMax?: number; type?: string; onBlur?: () => void } = {},
  ) => locked ? (
    // Подтверждённые данные не редактируются — показываем строкой, а не серым полем
    <div className="flex flex-col gap-0.5 py-1">
      <span className="text-[13px] text-text-muted">{label}</span>
      <span className="text-[15px] lg:text-sm font-semibold text-text-primary break-words">{form[k] || '—'}</span>
    </div>
  ) : (
    <div>
      <label htmlFor={`pf-${k}`} className="block text-sm font-semibold mb-2 ml-1 text-text-secondary">{label}</label>
      <input
        id={`pf-${k}`}
        type={opts.type ?? 'text'}
        value={form[k]}
        disabled={locked}
        inputMode={opts.digitsMax ? 'numeric' : undefined}
        onChange={(e) => set(k, opts.digitsMax ? onlyDigits(e.target.value, opts.digitsMax) : e.target.value)}
        onBlur={opts.onBlur}
        className={`${fieldCls} ${errors[k] ? 'border-red-500/50' : 'border-border'}`}
        placeholder={opts.placeholder}
        aria-invalid={errors[k] ? true : undefined}
      />
      {errors[k] && <p className="text-red-600 text-[13px] mt-1.5 ml-1">{errors[k]}</p>}
    </div>
  )

  return (
    <div className="max-w-2xl">
      <PageBar title="Профиль" />

      {/* Статус проверки */}
      <div className="app-group p-4 lg:p-6 mb-4 lg:mb-6">
        <h2 className="font-bold mb-3 text-text-primary text-base flex items-center gap-2">
          <ShieldCheck size={18} className="text-primary" />
          Проверка анкеты
        </h2>
        <div className="flex items-center gap-x-3 gap-y-2 flex-wrap text-sm">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${PARTNER_STATUS_COLORS[status]}`}>
            {PARTNER_STATUS_LABELS[status]}
          </span>
          <span className="text-text-muted">Анкета от {formatDate(user.createdAt)}</span>
        </div>
        {verified && percent ? (
          <div className="text-[15px] lg:text-sm leading-relaxed text-text-secondary mt-3 space-y-2">
            <p>Ваше вознаграждение — {formatPercent(percent)} от цены товара.</p>
            {pending && (
              <p className="text-amber-700">
                С {formatDate(pending.from)} — {formatPercent(pending.percent)} для заказов, оформленных с этой даты.
              </p>
            )}
            <p>Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.</p>
            <p>
              По итогам месяца в кабинете — отчёт агента и акт, на возражения 10 рабочих дней; выплата на счёт из анкеты в
              течение 7 дней после их принятия.
            </p>
          </div>
        ) : null}
        {verified && (
          <p className="text-[15px] lg:text-sm leading-relaxed text-text-secondary mt-3">
            Чтобы изменить наименование, адрес пункта выдачи или реквизиты, напишите на{' '}
            <a href="mailto:partners@techagent.pro" className="text-primary no-underline hover:underline">partners@techagent.pro</a>.
          </p>
        )}
        {status === 'REJECTED' && (
          <div className="text-sm text-text-secondary mt-3 space-y-1">
            {user.rejectReason && (
              <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-red-900 whitespace-pre-wrap break-words">
                Причина: {user.rejectReason}
              </p>
            )}
            <p>Исправьте данные ниже и сохраните — анкета снова уйдёт на проверку.</p>
          </div>
        )}
      </div>

      {/* Партнёр и пункт выдачи */}
      <div className="app-group p-4 lg:p-6 mb-4 lg:mb-6">
        <h2 className="font-bold mb-4 text-text-primary text-base flex items-center gap-2">
          <Building2 size={18} className="text-primary" />
          Партнёр и пункт выдачи
        </h2>
        <div className="space-y-4">
          {field('companyName', 'Наименование', anketaLocked)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('inn', 'ИНН', anketaLocked, { digitsMax: 12, placeholder: '10 или 12 цифр' })}
            {field('ogrn', 'ОГРН / ОГРНИП', anketaLocked, { digitsMax: 15, placeholder: '13 или 15 цифр' })}
          </div>
          {field('pointAddress', 'Адрес пункта выдачи', anketaLocked)}
        </div>
      </div>

      {/* Контакты */}
      <div className="app-group p-4 lg:p-6 mb-4 lg:mb-6">
        <h2 className="font-bold mb-4 text-text-primary text-base flex items-center gap-2">
          <User size={18} className="text-primary" />
          Контакты
        </h2>
        <div className="space-y-4">
          {field('contactName', 'Контактное лицо', false)}
          {field('phone', 'Телефон', false, {
            type: 'tel',
            placeholder: '+7 900 000-00-00',
            onBlur: () => setForm((f) => ({ ...f, phone: formatPhone(f.phone) })),
          })}
          <div className="flex flex-col gap-0.5 py-1">
            <span className="text-[13px] text-text-muted">Email — логин в кабинет, изменить его нельзя</span>
            <span className="text-[15px] lg:text-sm font-semibold text-text-primary break-all">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Реквизиты */}
      <div className="app-group p-4 lg:p-6 mb-4 lg:mb-6">
        <h2 className="font-bold mb-4 text-text-primary text-base flex items-center gap-2">
          <Landmark size={18} className="text-primary" />
          Реквизиты для выплаты вознаграждения
        </h2>
        <div className="space-y-4">
          {field('bankName', 'Банк', anketaLocked)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('bik', 'БИК', anketaLocked, { digitsMax: 9, placeholder: '9 цифр' })}
            {field('account', 'Расчётный счёт', anketaLocked, { digitsMax: 20, placeholder: '20 цифр' })}
          </div>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <p className="text-red-600 text-sm leading-snug mb-3">Проверьте поля, отмеченные выше, — с ошибками данные не сохраняются.</p>
      )}
      <button
        onClick={handleSave}
        className="app-btn app-btn-primary lg:inline-flex lg:w-auto lg:min-h-[46px] lg:text-sm lg:rounded-xl lg:px-6 lg:gap-1.5"
      >
        {saved ? <Check size={18} /> : <Save size={18} />}
        {saved ? 'Сохранено' : anketaLocked ? 'Сохранить контакты' : 'Сохранить анкету'}
      </button>

      {/* На телефоне шапки сайта в кабинете нет: переход на сайт и выход — здесь */}
      <div className="app-list mt-6 lg:hidden">
        <Link to="/" className="app-row">
          <span className="app-row-tile bg-primary/10 text-primary"><Globe size={22} /></span>
          <span className="app-row-mid"><span className="app-row-title">Сайт и каталог</span></span>
          <ChevronRight size={20} className="text-text-muted shrink-0" />
        </Link>
        <button type="button" onClick={logout} className="app-row w-full bg-transparent border-none cursor-pointer text-left">
          <span className="app-row-tile bg-red-50 text-red-600"><LogOut size={22} /></span>
          <span className="app-row-mid"><span className="app-row-title !text-red-600">Выйти</span></span>
        </button>
      </div>
    </div>
  )
}
