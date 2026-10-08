import { useState } from 'react'
import { Save, Check, User, Building2, Landmark, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { PARTNER_STATUS_LABELS, PARTNER_STATUS_COLORS } from '../../utils/status'
import { formatDate, rewardPercentAt, pendingRewardChange } from '../../utils/calculate'
import type { User as UserT } from '../../types'

const fieldCls =
  'w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm disabled:text-text-muted disabled:cursor-not-allowed'

type FormKey = 'companyName' | 'inn' | 'ogrn' | 'pointAddress' | 'contactName' | 'phone' | 'bankName' | 'bik' | 'account'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [saved, setSaved] = useState(false)
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

  const set = (k: FormKey, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSave = () => {
    const contacts: Partial<UserT> = { contactName: form.contactName.trim(), phone: form.phone.trim() }
    updateProfile(
      anketaLocked
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
          },
    )
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const field = (k: FormKey, label: string, locked: boolean, opts: { placeholder?: string; digitsMax?: number } = {}) => (
    <div>
      <label htmlFor={`pf-${k}`} className="block text-sm font-medium mb-1.5 text-text-secondary">{label}</label>
      <input
        id={`pf-${k}`}
        type="text"
        value={form[k]}
        disabled={locked}
        inputMode={opts.digitsMax ? 'numeric' : undefined}
        maxLength={opts.digitsMax}
        onChange={(e) => set(k, opts.digitsMax ? e.target.value.replace(/\D/g, '').slice(0, opts.digitsMax) : e.target.value)}
        className={fieldCls}
        placeholder={opts.placeholder}
      />
    </div>
  )

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Профиль</h1>

      {/* Статус проверки */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-3 text-text-primary flex items-center gap-2">
          <ShieldCheck size={18} className="text-primary" />
          Проверка анкеты
        </h2>
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${PARTNER_STATUS_COLORS[status]}`}>
            {PARTNER_STATUS_LABELS[status]}
          </span>
          <span className="text-text-muted">Анкета от {formatDate(user.createdAt)}</span>
        </div>
        {verified && percent ? (
          <div className="text-sm text-text-secondary mt-3 space-y-1">
            <p>Ваше вознаграждение — {percent}% от цены товара.</p>
            {pending && (
              <p className="text-amber-700">
                С {formatDate(pending.from)} — {pending.percent}% для заказов, оформленных с этой даты.
              </p>
            )}
            <p>Вознаграждение начисляется после выдачи товара и загрузки подписанного акта приёма-передачи.</p>
            <p>По итогам месяца в кабинете — отчёт агента и акт; выплата на счёт из анкеты.</p>
          </div>
        ) : null}
        {verified && (
          <p className="text-sm text-text-secondary mt-3">
            Чтобы изменить наименование, адрес пункта выдачи или реквизиты, напишите на{' '}
            <a href="mailto:partners@techagent.pro" className="text-primary no-underline hover:underline">partners@techagent.pro</a>.
          </p>
        )}
        {status === 'REJECTED' && (
          <p className="text-sm text-text-secondary mt-3">
            Исправьте данные ниже и сохраните — анкета снова уйдёт на проверку.
          </p>
        )}
      </div>

      {/* Партнёр и пункт выдачи */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4 text-text-primary flex items-center gap-2">
          <Building2 size={18} className="text-primary" />
          Партнёр и пункт выдачи
        </h2>
        <div className="space-y-4">
          {field('companyName', 'Наименование', anketaLocked)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('inn', 'ИНН', anketaLocked, { digitsMax: 12 })}
            {field('ogrn', 'ОГРН / ОГРНИП', anketaLocked, { digitsMax: 15 })}
          </div>
          {field('pointAddress', 'Адрес пункта выдачи', anketaLocked)}
        </div>
      </div>

      {/* Контакты */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4 text-text-primary flex items-center gap-2">
          <User size={18} className="text-primary" />
          Контакты
        </h2>
        <div className="space-y-4">
          {field('contactName', 'Контактное лицо', false)}
          {field('phone', 'Телефон', false, { placeholder: '+7' })}
          <div>
            <label htmlFor="pf-email" className="block text-sm font-medium mb-1.5 text-text-secondary">Email</label>
            <input id="pf-email" type="email" value={user.email} disabled className={fieldCls} />
            <p className="text-xs text-text-muted mt-1">Email — логин в кабинет, изменить его нельзя</p>
          </div>
        </div>
      </div>

      {/* Реквизиты */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4 text-text-primary flex items-center gap-2">
          <Landmark size={18} className="text-primary" />
          Реквизиты для выплаты вознаграждения
        </h2>
        <div className="space-y-4">
          {field('bankName', 'Банк', anketaLocked)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('bik', 'БИК', anketaLocked, { digitsMax: 9 })}
            {field('account', 'Расчётный счёт', anketaLocked, { digitsMax: 20 })}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 border-none cursor-pointer"
      >
        {saved ? <Check size={16} /> : <Save size={16} />}
        {saved ? 'Сохранено' : anketaLocked ? 'Сохранить контакты' : 'Сохранить анкету'}
      </button>
    </div>
  )
}
