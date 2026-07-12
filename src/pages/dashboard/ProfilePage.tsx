import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Icon } from '../../lib/techagent'

const card: React.CSSProperties = { background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 22, marginBottom: 16 }
const sectionTitle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 9, fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 16 }
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8, padding: '10px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }
const label: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 13, color: '#3A4256', marginBottom: 8 }
const field: React.CSSProperties = { width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none' }

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
    <div style={{ maxWidth: 620 }}>
      <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: '0 0 22px' }}>Мой профиль</h1>

      <div style={card}>
        <div style={sectionTitle}><Icon name="box" size={18} color="#1B44F5" />Данные партнёра</div>
        <div style={row}><span style={{ color: '#8891A5', minWidth: 130 }}>Название</span><span style={{ fontWeight: 500 }}>{user?.companyName || '—'}</span></div>
        <div style={row}><span style={{ color: '#8891A5', minWidth: 130 }}>ИНН</span><span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono',monospace" }}>{user?.inn || '—'}</span></div>
        <div style={{ ...row, borderBottom: 'none' }}><span style={{ color: '#8891A5', minWidth: 130 }}>Рег. номер</span><span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono',monospace" }}>{user?.ogrnip || '—'}</span></div>
      </div>

      <div style={card}>
        <div style={sectionTitle}><Icon name="user" size={18} color="#1B44F5" />Контакты</div>
        <div style={{ marginBottom: 16 }}>
          <label style={label}>Email</label>
          <input value={user?.email || ''} disabled style={{ ...field, background: '#F0F1F6', color: '#8891A5', cursor: 'not-allowed' }} />
          <div style={{ fontSize: 11.5, color: '#8891A5', marginTop: 6 }}>Email нельзя изменить</div>
        </div>
        <div>
          <label style={label}>Телефон</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="ta-input" style={field} placeholder="+7 999 123-45-67" />
        </div>
      </div>

      <div style={card}>
        <div style={sectionTitle}><Icon name="box" size={18} color="#1B44F5" />Карго-компания</div>
        <div style={{ marginBottom: 16 }}>
          <label style={label}>Название карго</label>
          <input value={cargoName} onChange={(e) => setCargoName(e.target.value)} className="ta-input" style={field} placeholder="Cargo Express" />
        </div>
        <div>
          <label style={label}>Контакт карго</label>
          <input value={cargoContact} onChange={(e) => setCargoContact(e.target.value)} className="ta-input" style={field} placeholder="+7 999 123-45-67" />
        </div>
      </div>

      <button onClick={handleSave} className="ta-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: '13px 22px', fontWeight: 600, fontSize: 14.5, boxShadow: '0 8px 20px rgba(27,68,245,.24)' }}>
        {saved ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12.5l5 5 11-11" /></svg> : <Icon name="doc" size={16} />}
        {saved ? 'Сохранено!' : 'Сохранить изменения'}
      </button>
    </div>
  )
}
