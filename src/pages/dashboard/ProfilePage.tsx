import { useState } from 'react'
import { Save, Check, User, Building2, Truck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [saved, setSaved] = useState(false)
  const [phone, setPhone] = useState(user?.phone || '')
  const [cargoName, setCargoName] = useState(user?.cargoName || '')
  const [cargoContact, setCargoContact] = useState(user?.cargoContact || '')

  const handleSave = () => {
    updateProfile({ phone, cargoName, cargoContact })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Мой профиль</h1>

      {/* IP data */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4 text-text-primary flex items-center gap-2">
          <Building2 size={18} className="text-primary" />
          Данные партнёра
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-text-secondary min-w-32">Название:</span>
            <span className="font-medium text-text-primary">{user?.companyName || '\u2014'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-text-secondary min-w-32">ИНН:</span>
            <span className="font-medium text-text-primary font-mono">{user?.inn || '\u2014'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-text-secondary min-w-32">ОГРНИП:</span>
            <span className="font-medium text-text-primary font-mono">{user?.ogrnip || '\u2014'}</span>
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4 text-text-primary flex items-center gap-2">
          <User size={18} className="text-primary" />
          Контакты
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-text-secondary">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-muted cursor-not-allowed text-sm"
            />
            <p className="text-xs text-text-muted mt-1">Email нельзя изменить</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-text-secondary">Телефон</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              placeholder="+7 999 123-45-67"
            />
          </div>
        </div>
      </div>

      {/* Cargo */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4 text-text-primary flex items-center gap-2">
          <Truck size={18} className="text-primary" />
          Карго-компания
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-text-secondary">Название карго</label>
            <input
              type="text"
              value={cargoName}
              onChange={(e) => setCargoName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              placeholder="Cargo Express"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-text-secondary">Контакт карго</label>
            <input
              type="text"
              value={cargoContact}
              onChange={(e) => setCargoContact(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-bg-light text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              placeholder="+7 800 555-00-01"
            />
          </div>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 border-none cursor-pointer"
      >
        {saved ? <Check size={16} /> : <Save size={16} />}
        {saved ? 'Сохранено!' : 'Сохранить изменения'}
      </button>
    </div>
  )
}
