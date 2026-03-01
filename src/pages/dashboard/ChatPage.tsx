import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { products } from '../../data/products'
import { getProductImage } from '../../utils/productImages'

/* ── Types ── */
interface ChatContact {
  id: string
  name: string
  initials: string
  role: string
  gradient: string
  online: boolean
  lastMsg: string
  time: string
  unread: number
  productId?: string
}

interface Message {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
  read?: boolean
  productId?: string
}

/* ── Mock Data ── */
const contacts: ChatContact[] = [
  { id: '1', name: 'Алексей Петров', initials: 'АП', role: 'Менеджер', gradient: 'linear-gradient(135deg,#0061FF,#3D8BFF)', online: true, lastMsg: 'Наличие подтверждаю — 42 шт. на складе', time: '14:32', unread: 2, productId: 'iph15pm256b' },
  { id: '2', name: 'Мария Соколова', initials: 'МС', role: 'Менеджер', gradient: 'linear-gradient(135deg,#059669,#34D399)', online: true, lastMsg: 'Прайс на Galaxy S25 Ultra обновлён', time: '13:15', unread: 1, productId: 'sgts25u256b' },
  { id: '3', name: 'Игорь Волков', initials: 'ИВ', role: 'Логист', gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)', online: false, lastMsg: 'Доставка MacBook Pro оформлена', time: '12:40', unread: 0, productId: 'mbp14-m3p-18-512' },
  { id: '4', name: 'Елена Новикова', initials: 'ЕН', role: 'Менеджер', gradient: 'linear-gradient(135deg,#EA580C,#FB923C)', online: true, lastMsg: 'Sony WH-1000XM5 — партия 50 шт., скидка 12%', time: 'Вчера', unread: 0 },
  { id: '5', name: 'Дмитрий Морозов', initials: 'ДМ', role: 'Менеджер', gradient: 'linear-gradient(135deg,#DB2777,#F472B6)', online: false, lastMsg: 'Заказ #4821 — отгружен', time: 'Вчера', unread: 0 },
]

const chatMessages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', from: 'them', text: 'Добрый день! Чем могу помочь?', time: '14:20' },
    { id: 'm2', from: 'me', text: 'Здравствуйте! Интересует iPhone 15 Pro Max 256GB. Есть в наличии? Нужно 25 штук.', time: '14:22', read: true },
    { id: 'm3', from: 'them', text: 'Отличный выбор! Сейчас проверю наличие на складе.', time: '14:23' },
    { id: 'm4', from: 'them', text: 'Наличие подтверждаю — 42 шт. на московском складе. Для партии 25 шт. могу предложить специальную цену: 149 990 ₽ за единицу вместо 159 900 ₽.', time: '14:28', productId: 'iph15pm256b' },
    { id: 'm5', from: 'me', text: 'Отличная цена! А какие цвета доступны в этом количестве?', time: '14:30', read: true },
    { id: 'm6', from: 'them', text: 'Natural Titanium — 18 шт., Black — 14 шт., White Titanium — 10 шт. Можем скомплектовать микс под ваши нужды. Доставка 1–2 дня по Москве.', time: '14:32' },
  ],
  '2': [
    { id: 'm1', from: 'them', text: 'Добрый день! Обновили прайс на Samsung Galaxy S25 Ultra.', time: '13:00' },
    { id: 'm2', from: 'them', text: 'Новая цена на 256GB — 139 900 ₽ при партии от 10 шт. Действует до конца месяца.', time: '13:15', productId: 'sgts25u256b' },
  ],
  '3': [
    { id: 'm1', from: 'them', text: 'Доставка MacBook Pro 14" M3 Pro оформлена, трек отправлю завтра утром.', time: '12:40' },
    { id: 'm2', from: 'me', text: 'Отлично, спасибо! Жду трек.', time: '12:42', read: true },
  ],
  '4': [
    { id: 'm1', from: 'them', text: 'Sony WH-1000XM5 — поступила партия 50 шт. Могу предложить скидку 12% при заказе от 20 шт.', time: 'Вчера' },
  ],
  '5': [
    { id: 'm1', from: 'them', text: 'Заказ #4821 — Nintendo Switch, 20 шт. — отгружен. Доставка 2-3 дня.', time: 'Вчера' },
    { id: 'm2', from: 'me', text: 'Принято, ждём!', time: 'Вчера', read: true },
  ],
}

/* ── Icons (inline SVG) ── */
const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
const SendIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
const InfoIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
const ArrowIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
const CloseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const MailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
const BackIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>

/* ── Helper ── */
function getProduct(id?: string) {
  if (!id) return null
  return products.find(p => p.id === id) || null
}

function formatPrice(n: number) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

/* ── ProductCard in chat ── */
function ProductMiniCard({ productId }: { productId: string }) {
  const p = getProduct(productId)
  if (!p) return null
  const img = getProductImage(p.id, p.name, p.category)
  return (
    <Link to={`/catalog/${p.id}`} className="ch-product-card">
      <div className="ch-product-thumb">
        {img ? <img src={img} alt={p.name} style={{ width: 40, height: 40, objectFit: 'contain' }} /> : <span>{p.brand[0]}</span>}
      </div>
      <div className="ch-product-info">
        <div className="ch-product-brand">{p.brand}</div>
        <div className="ch-product-name">{p.name}</div>
        <div className="ch-product-price">{formatPrice(p.price)}</div>
      </div>
      <div className="ch-product-arrow"><ArrowIcon /></div>
    </Link>
  )
}

/* ══════════════════════════════════════════════════ */
export default function ChatPage() {
  const { user } = useAuth()
  const [activeChat, setActiveChat] = useState<string | null>('1')
  const [messages, setMessages] = useState<Record<string, Message[]>>(chatMessages)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const activeContact = contacts.find(c => c.id === activeChat) || null
  const activeMessages = activeChat ? (messages[activeChat] || []) : []

  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts
    const q = search.toLowerCase()
    return contacts.filter(c => c.name.toLowerCase().includes(q) || c.lastMsg.toLowerCase().includes(q))
  }, [search])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [activeMessages.length, activeChat])

  const userName = user?.companyName || user?.email?.split('@')[0] || 'Пользователь'
  const userInitials = userName.slice(0, 2).toUpperCase()

  function sendMessage() {
    const text = input.trim()
    if (!text || !activeChat) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    const newMsg: Message = { id: `m${Date.now()}`, from: 'me', text, time: timeStr, read: false }
    setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }))
    setInput('')
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
  }

  function selectChat(id: string) {
    setActiveChat(id)
    setShowInfo(false)
    setMobileView('chat')
  }

  // Active product from chat
  const linkedProduct = activeContact?.productId ? getProduct(activeContact.productId) : null

  return (
    <div className="ch-root">
      {/* ═══ Chat List ═══ */}
      <div className={`ch-list ${mobileView === 'chat' ? 'ch-list-hidden' : ''}`}>
        <div className="ch-list-header">
          <div className="ch-list-title">
            Чаты
            <span className="ch-count">{contacts.filter(c => c.unread > 0).length} новых</span>
          </div>
          <div className="ch-search">
            <span className="ch-search-icon"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Найти диалог..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="ch-items">
          {filteredContacts.map(c => (
            <div
              key={c.id}
              className={`ch-item ${c.id === activeChat ? 'active' : ''} ${c.unread > 0 ? 'unread' : ''}`}
              onClick={() => selectChat(c.id)}
            >
              <div className="ch-avatar" style={{ background: c.gradient }}>
                {c.initials}
                {c.online && <span className="ch-online-dot" />}
              </div>
              <div className="ch-item-body">
                <div className="ch-item-top">
                  <span className="ch-item-name">{c.name}</span>
                  <span className="ch-item-time">{c.time}</span>
                </div>
                <div className="ch-item-bottom">
                  <span className="ch-item-preview">{c.lastMsg}</span>
                  {c.unread > 0 && <span className="ch-unread">{c.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Chat Window ═══ */}
      <div className={`ch-window ${mobileView === 'list' ? 'ch-window-hidden' : ''}`}>
        {activeContact ? (
          <>
            {/* Header */}
            <div className="ch-header">
              <button className="ch-back-btn" onClick={() => setMobileView('list')}>
                <BackIcon />
              </button>
              <div className="ch-header-avatar" style={{ background: activeContact.gradient }}>
                {activeContact.initials}
              </div>
              <div className="ch-header-info">
                <div className="ch-header-name">{activeContact.name}</div>
                <div className={`ch-header-status ${activeContact.online ? 'online' : ''}`}>
                  {activeContact.online && <span className="ch-status-dot" />}
                  {activeContact.online ? 'Онлайн' : 'Был(а) недавно'}
                </div>
              </div>
              <button
                className={`ch-info-btn ${showInfo ? 'active' : ''}`}
                onClick={() => setShowInfo(!showInfo)}
                title="Информация"
              >
                <InfoIcon />
              </button>
            </div>

            {/* Product bar */}
            {linkedProduct && (
              <div className="ch-product-bar">
                <div className="ch-cpb-info">
                  <span className="ch-cpb-label">Обсуждаемый товар</span>
                  <span className="ch-cpb-name">{linkedProduct.name}</span>
                </div>
                <span className="ch-cpb-price">{formatPrice(linkedProduct.price)}</span>
                <Link to={`/catalog/${linkedProduct.id}`} className="ch-cpb-link">Открыть</Link>
              </div>
            )}

            {/* Messages */}
            <div className="ch-messages" ref={messagesRef}>
              <div className="ch-date-divider"><span>Сегодня</span></div>
              {activeMessages.map(msg => (
                <div key={msg.id} className={`ch-msg ${msg.from === 'me' ? 'mine' : ''}`}>
                  {msg.from !== 'me' && (
                    <div className="ch-msg-avatar" style={{ background: activeContact.gradient }}>
                      {activeContact.initials}
                    </div>
                  )}
                  <div className="ch-msg-content">
                    <div className="ch-msg-bubble">{msg.text}</div>
                    {msg.productId && <ProductMiniCard productId={msg.productId} />}
                    <div className="ch-msg-meta">
                      <span className="ch-msg-time">{msg.time}</span>
                      {msg.from === 'me' && msg.read && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity=".5"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="ch-input-area">
              <div className="ch-quick-replies">
                {['Оформить заказ', 'Запросить прайс', 'Узнать доставку'].map(q => (
                  <button key={q} className="ch-quick" onClick={() => { setInput(q); inputRef.current?.focus() }}>{q}</button>
                ))}
              </div>
              <div className="ch-input-row">
                <textarea
                  ref={inputRef}
                  rows={1}
                  placeholder="Написать сообщение..."
                  value={input}
                  onChange={e => {
                    setInput(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                  }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                />
                <button className="ch-send" onClick={sendMessage} disabled={!input.trim()}>
                  <SendIcon />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="ch-empty">
            <div className="ch-empty-icon">💬</div>
            <h3>Выберите диалог</h3>
            <p>Выберите чат слева для начала общения</p>
          </div>
        )}
      </div>

      {/* ═══ Info Panel (slide-in) ═══ */}
      {showInfo && activeContact && (
        <div className="ch-info-panel">
          <div className="ch-info-header">
            <button className="ch-info-close" onClick={() => setShowInfo(false)}><CloseIcon /></button>
            <div className="ch-info-avatar" style={{ background: activeContact.gradient }}>{activeContact.initials}</div>
            <div className="ch-info-name">{activeContact.name}</div>
            <div className="ch-info-role">{activeContact.role}</div>
            {activeContact.online && (
              <div className="ch-info-online"><span className="ch-status-dot" /> Онлайн</div>
            )}
          </div>

          <div className="ch-info-section">
            <div className="ch-info-section-title">Контакты</div>
            <div className="ch-info-row">
              <span className="ch-info-row-icon"><MailIcon /></span>
              <div>
                <div className="ch-info-row-label">Email</div>
                <div className="ch-info-row-value">{activeContact.name.split(' ')[0].toLowerCase()[0]}.{activeContact.name.split(' ')[1]?.toLowerCase() || ''}@techagent.ru</div>
              </div>
            </div>
            <div className="ch-info-row">
              <span className="ch-info-row-icon"><PhoneIcon /></span>
              <div>
                <div className="ch-info-row-label">Телефон</div>
                <div className="ch-info-row-value">+7 (495) 123-45-67</div>
              </div>
            </div>
          </div>

          {linkedProduct && (
            <div className="ch-info-section">
              <div className="ch-info-section-title">Обсуждаемый товар</div>
              <Link to={`/catalog/${linkedProduct.id}`} className="ch-info-product">
                <div className="ch-info-product-img">
                  {(() => {
                    const img = getProductImage(linkedProduct.id, linkedProduct.name, linkedProduct.category)
                    return img ? <img src={img} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} /> : <span>{linkedProduct.brand[0]}</span>
                  })()}
                </div>
                <div>
                  <div className="ch-info-product-name">{linkedProduct.name}</div>
                  <div className="ch-info-product-price">{formatPrice(linkedProduct.price)}</div>
                </div>
              </Link>
            </div>
          )}

          <div className="ch-info-section">
            <div className="ch-info-section-title">О вас</div>
            <div className="ch-info-row">
              <span className="ch-info-row-icon" style={{ background: 'linear-gradient(135deg,#0061FF,#3D8BFF)', color: 'white', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                {userInitials}
              </span>
              <div>
                <div className="ch-info-row-value">{userName}</div>
                <div className="ch-info-row-label">{user?.email || ''}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
