import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { api, apiErrorText } from '../../lib/api'
import { logoutAccount, refreshAccount, useAccount } from '../../utils/account'
import { formatPhone, phoneError } from '../../utils/validate'
import { PageBar } from '../../components/app/ui'
import { RequireBuyer, DemoBanner } from './AccountPage'

const fieldCls =
  'w-full h-[52px] px-4 rounded-2xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none text-base'
const labelCls = 'block text-sm font-semibold mb-2 ml-1 text-text-secondary'

export default function AccountProfilePage() {
  return (
    <RequireBuyer>
      <Profile />
    </RequireBuyer>
  )
}

/** Данные для следующих заказов: форма оформления заполнится сама */
function Profile() {
  const { buyer } = useAccount()
  const navigate = useNavigate()
  const [f, setF] = useState({
    name: buyer?.name ?? '', phone: buyer?.phone ?? '', city: buyer?.city ?? '', sdekPoint: buyer?.sdekPoint ?? '',
  })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const save = async (e: FormEvent) => {
    e.preventDefault()
    const pe = f.phone.trim() ? phoneError(f.phone) : null
    if (pe) return setError(pe)
    setBusy(true)
    setError('')
    setMsg('')
    try {
      await api('/my/profile', { ...f, phone: f.phone.trim() ? formatPhone(f.phone) : '' })
      await refreshAccount()
      setMsg('Сохранено')
    } catch (x) {
      setError(apiErrorText(x))
    }
    setBusy(false)
  }

  const field = (k: keyof typeof f, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={`pf-${k}`} className={labelCls}>{label}</label>
      <input id={`pf-${k}`} value={f[k]} onChange={(e) => { setF({ ...f, [k]: e.target.value }); setMsg('') }} className={fieldCls} {...props} />
    </div>
  )

  return (
    <div className="acc-narrow">
      <DemoBanner />
      <PageBar back="/account" backLabel="Мои заказы" title="Профиль" />
      <form onSubmit={save} className="acc-card space-y-4" noValidate>
        <div>
          <span className={labelCls}>Email</span>
          <p className="text-[15px] font-semibold text-text-primary ml-1 my-0">{buyer?.email}</p>
          <p className="text-[13px] text-text-muted ml-1 mt-1 mb-0">По нему вы входите и получаете письма о заказах.</p>
        </div>
        {field('name', 'Фамилия и имя', { type: 'text', autoComplete: 'name' })}
        {field('phone', 'Телефон', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', onBlur: () => setF((x) => ({ ...x, phone: formatPhone(x.phone) })) })}
        {field('city', 'Город', { type: 'text', autoComplete: 'address-level2' })}
        {field('sdekPoint', 'Пункт СДЭК по умолчанию', { type: 'text', placeholder: 'ул. Ленина, 10 — или код пункта' })}
        {error && <p className="text-red-600 text-[13.5px] m-0 ml-1">{error}</p>}
        <button type="submit" disabled={busy} className="app-btn app-btn-primary">
          {busy ? 'Сохраняем…' : msg || 'Сохранить'}
        </button>
      </form>
      <button
        type="button"
        onClick={async () => { await logoutAccount(); navigate('/', { replace: true }) }}
        className="app-btn mt-4 bg-transparent text-red-600 hover:bg-red-50"
      >
        <LogOut size={19} /> Выйти
      </button>
    </div>
  )
}
