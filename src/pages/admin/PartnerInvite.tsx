import { useState } from 'react'
import { UserPlus, X } from 'lucide-react'
import { createPartner, type PartnerData } from '../../data/mock'
import { applications, updateApplication, type PartnerApplication } from '../../data/applications'
import { formatDate, formatPercent } from '../../utils/calculate'
import { onlyDigits, formatPhone, partnerErrors, type PartnerErrors } from '../../utils/validate'
import { copyText } from '../../utils/clipboard'
import { useDataRevision } from '../../utils/store'

/*
 * Партнёры появляются только по приглашению: заявка с сайта → ТехЭйджент проверяет → «Завести партнёра».
 * Учётка создаётся сразу проверенной, с размером вознаграждения и временным паролем. Пароль показывается
 * один раз — его нужно передать партнёру вместе с адресом входа. При первом входе партнёр задаёт свой пароль
 * и принимает агентский договор-оферту (п. 2.1).
 */

const MIN_PERCENT = 0.1
const MAX_PERCENT = 99

const emptyData: PartnerData = {
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
}

type Key = keyof PartnerData

const fieldCls =
  'w-full px-3 py-2 rounded-lg border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm'

const FIELDS: { key: Key; label: string; digits?: number }[] = [
  { key: 'companyName', label: 'Наименование' },
  { key: 'inn', label: 'ИНН', digits: 12 },
  { key: 'ogrn', label: 'ОГРН / ОГРНИП', digits: 15 },
  { key: 'pointAddress', label: 'Адрес пункта выдачи' },
  { key: 'contactName', label: 'Контактное лицо' },
  { key: 'phone', label: 'Телефон' },
  { key: 'email', label: 'Email для входа' },
  { key: 'bankName', label: 'Банк' },
  { key: 'bik', label: 'БИК', digits: 9 },
  { key: 'account', label: 'Расчётный счёт', digits: 20 },
]

interface Created {
  name: string
  email: string
  password: string
}

/** Форма «Завести партнёра»: из заявки (поля заполнены) или вручную */
function InviteForm({ app, onDone, onCancel }: { app?: PartnerApplication; onDone: (c: Created) => void; onCancel: () => void }) {
  const [data, setData] = useState<PartnerData>(() =>
    app ? (Object.fromEntries(FIELDS.map((f) => [f.key, app[f.key]])) as PartnerData) : emptyData,
  )
  const [percent, setPercent] = useState('')
  const [errors, setErrors] = useState<PartnerErrors & { percent?: string }>({})
  const [saving, setSaving] = useState(false)

  const set = (k: Key, v: string) => {
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: PartnerErrors & { percent?: string } = partnerErrors(data)
    const p = Number(percent.trim().replace(',', '.'))
    if (!Number.isFinite(p) || p < MIN_PERCENT || p > MAX_PERCENT) errs.percent = 'Укажите вознаграждение от 0,1 до 99 % цены товара'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    const rounded = Math.round(p * 100) / 100
    const name = data.companyName.trim() || data.email
    if (!confirm(`Завести партнёра «${name}» с вознаграждением ${formatPercent(rounded)} от цены товара?`)) return
    setSaving(true)
    const result = await createPartner({ ...data, phone: formatPhone(data.phone) }, rounded)
    setSaving(false)
    if (result === 'email_taken') {
      setErrors({ email: 'С этим email уже есть учётка' })
      return
    }
    if (app) updateApplication(app.id, { status: 'DONE', userId: result.user.id })
    onDone({ name, email: result.user.email, password: result.password })
  }

  return (
    <form onSubmit={submit} className="card p-4 sm:p-5 mb-6" noValidate>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-text-primary">{app ? 'Завести партнёра по заявке' : 'Завести партнёра'}</h2>
        <button type="button" onClick={onCancel} aria-label="Закрыть" className="p-1 rounded hover:bg-bg-light border-none bg-transparent cursor-pointer">
          <X size={18} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <div key={f.key} className={f.key === 'companyName' || f.key === 'pointAddress' ? 'sm:col-span-2' : ''}>
            <label htmlFor={`inv-${f.key}`} className="block text-xs font-medium text-text-secondary mb-1">{f.label}</label>
            <input
              id={`inv-${f.key}`}
              type={f.key === 'email' ? 'email' : 'text'}
              inputMode={f.digits ? 'numeric' : undefined}
              value={data[f.key]}
              onChange={(e) => set(f.key, f.digits ? onlyDigits(e.target.value, f.digits) : e.target.value)}
              className={`${fieldCls} ${errors[f.key] ? 'border-red-500/50' : 'border-border'}`}
              aria-invalid={errors[f.key] ? true : undefined}
            />
            {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]}</p>}
          </div>
        ))}
        <div>
          <label htmlFor="inv-percent" className="block text-xs font-medium text-text-secondary mb-1">Вознаграждение, % от цены товара</label>
          <input
            id="inv-percent"
            type="text"
            inputMode="decimal"
            value={percent}
            onChange={(e) => { setPercent(e.target.value); setErrors((er) => ({ ...er, percent: undefined })) }}
            className={`${fieldCls} ${errors.percent ? 'border-red-500/50' : 'border-border'}`}
            placeholder="Например, 5"
          />
          {errors.percent && <p className="text-red-500 text-xs mt-1">{errors.percent}</p>}
          <p className="text-xs text-text-muted mt-1">Размер видит только сам партнёр в кабинете</p>
        </div>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="mt-4 inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer disabled:opacity-50"
      >
        <UserPlus size={16} /> {saving ? 'Создаём…' : 'Открыть доступ'}
      </button>
    </form>
  )
}

/** Блок над таблицей партнёров: заявки, ручное заведение, данные для входа нового партнёра */
export default function PartnerInvite() {
  useDataRevision()
  const [form, setForm] = useState<{ app?: PartnerApplication } | null>(null)
  const [created, setCreated] = useState<Created | null>(null)
  const [copied, setCopied] = useState(false)
  const newApps = applications.filter((a) => a.status === 'NEW')

  const decline = (a: PartnerApplication) => {
    if (!confirm(`Отказать в заявке «${a.companyName}»? Сообщите заявителю на ${a.email}.`)) return
    updateApplication(a.id, { status: 'DECLINED' })
  }

  const loginText = created
    ? `Доступ в кабинет партнёра TechAgent\nАдрес входа: https://techagent.pro/login\nEmail: ${created.email}\nВременный пароль: ${created.password}\nПри первом входе задайте свой пароль и примите агентский договор-оферту.`
    : ''

  return (
    <div className="mb-6">
      {created && (
        <div className="card p-4 sm:p-5 mb-6 border-emerald-300 bg-emerald-50">
          <p className="font-semibold text-emerald-900 mb-2">Доступ для «{created.name}» открыт</p>
          <pre className="text-sm text-emerald-900 whitespace-pre-wrap font-sans mb-3">{loginText}</pre>
          <p className="text-xs text-emerald-800 mb-3">Пароль показывается один раз — отправьте этот текст партнёру на его email.</p>
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={async () => { setCopied(await copyText(loginText)) }}
              className="text-sm bg-white border border-emerald-300 text-emerald-900 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              {copied ? 'Скопировано' : 'Скопировать текст'}
            </button>
            <button
              type="button"
              onClick={() => { setCreated(null); setCopied(false) }}
              className="text-sm bg-transparent border-none text-emerald-900 underline cursor-pointer"
            >
              Готово
            </button>
          </div>
        </div>
      )}

      {form && (
        <InviteForm
          key={form.app?.id ?? 'manual'}
          app={form.app}
          onCancel={() => setForm(null)}
          onDone={(c) => { setForm(null); setCreated(c); window.scrollTo(0, 0) }}
        />
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h2 className="text-lg font-bold text-text-primary">Заявки{newApps.length > 0 && ` · ${newApps.length}`}</h2>
        {!form && (
          <button
            type="button"
            onClick={() => setForm({})}
            className="inline-flex items-center gap-1.5 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium border-none cursor-pointer hover:bg-primary/20"
          >
            <UserPlus size={16} /> Завести партнёра вручную
          </button>
        )}
      </div>
      <p className="text-xs text-text-muted mb-3">
        Заявки с сайта приходят на partners@techagent.pro. Самостоятельной регистрации нет: доступ в кабинет открывает ТехЭйджент.
      </p>

      {newApps.length === 0 ? (
        <div className="card p-5 text-sm text-text-muted">Новых заявок нет</div>
      ) : (
        <div className="space-y-3">
          {newApps.map((a) => (
            <div key={a.id} className="card p-4 text-sm">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="font-semibold text-text-primary [overflow-wrap:anywhere]">{a.companyName}</p>
                  <p className="text-xs text-text-muted">заявка от {formatDate(a.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setForm({ app: a }); window.scrollTo(0, 0) }}
                    className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded font-medium border-none cursor-pointer hover:bg-emerald-100"
                  >
                    Завести партнёра
                  </button>
                  <button
                    type="button"
                    onClick={() => decline(a)}
                    className="text-xs bg-red-50 text-red-700 px-2.5 py-1.5 rounded font-medium border-none cursor-pointer hover:bg-red-100"
                  >
                    Отказать
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 text-xs text-text-secondary">
                <p>ИНН {a.inn}<br />ОГРН {a.ogrn}</p>
                <p className="[overflow-wrap:anywhere]">{a.pointAddress}</p>
                <p className="[overflow-wrap:anywhere]">{a.contactName}<br />{a.phone}<br />{a.email}</p>
              </div>
              {a.comment && <p className="mt-2 text-xs text-text-secondary [overflow-wrap:anywhere]">«{a.comment}»</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
