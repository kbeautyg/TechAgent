import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { getProductImage } from '../../utils/productImages'
import { formatPrice } from '../../utils/calculate'

interface ChatContact { id: string; name: string; initials: string; role: string; gradient: string; online: boolean; lastMsg: string; time: string; unread: number; productId?: string }
interface Message { id: string; from: 'me' | 'them'; text: string; time: string; productId?: string }

const contacts: ChatContact[] = [
  { id: '1', name: 'Алексей Петров', initials: 'АП', role: 'Менеджер', gradient: 'linear-gradient(135deg,#1B44F5,#6D4BF5)', online: true, lastMsg: 'Наличие подтверждаю — 42 шт. на складе', time: '14:32', unread: 2, productId: 'iph15pm256w' },
  { id: '2', name: 'Мария Соколова', initials: 'МС', role: 'Менеджер', gradient: 'linear-gradient(135deg,#0B7A55,#12B981)', online: true, lastMsg: 'Прайс на Galaxy S25 Ultra обновлён', time: '13:15', unread: 1, productId: 'sgts25u256b' },
  { id: '3', name: 'Игорь Волков', initials: 'ИВ', role: 'Логист', gradient: 'linear-gradient(135deg,#6D4BF5,#A78BFA)', online: false, lastMsg: 'Доставка MacBook Pro оформлена', time: '12:40', unread: 0 },
  { id: '4', name: 'Елена Новикова', initials: 'ЕН', role: 'Менеджер', gradient: 'linear-gradient(135deg,#E38A00,#FB923C)', online: true, lastMsg: 'Sony WH-1000XM5 — партия 50 шт., скидка 12%', time: 'Вчера', unread: 0 },
]
const initialMessages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', from: 'them', text: 'Добрый день! Чем могу помочь?', time: '14:20' },
    { id: 'm2', from: 'me', text: 'Здравствуйте! Интересует iPhone 15 Pro Max. Есть в наличии? Нужно 25 штук.', time: '14:22' },
    { id: 'm3', from: 'them', text: 'Наличие подтверждаю — 42 шт. на складе. Для партии 25 шт. могу предложить специальную цену.', time: '14:28', productId: 'iph15pm256w' },
  ],
  '2': [{ id: 'm1', from: 'them', text: 'Добрый день! Обновили прайс на Samsung Galaxy S25 Ultra — действует до конца месяца.', time: '13:15', productId: 'sgts25u256b' }],
  '3': [
    { id: 'm1', from: 'them', text: 'Доставка MacBook Pro 14" оформлена, трек отправлю завтра утром.', time: '12:40' },
    { id: 'm2', from: 'me', text: 'Отлично, спасибо! Жду трек.', time: '12:42' },
  ],
  '4': [{ id: 'm1', from: 'them', text: 'Sony WH-1000XM5 — поступила партия 50 шт. Скидка 12% при заказе от 20 шт.', time: 'Вчера' }],
}

function ProductMiniCard({ productId }: { productId: string }) {
  const p = products.find((x) => x.id === productId)
  if (!p) return null
  return (
    <Link to={`/catalog/${p.id}`} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #E7E9F2', borderRadius: 12, padding: 10, marginTop: 8, textDecoration: 'none', color: 'inherit' }}>
      <img src={getProductImage(p.id, p.name, p.category)} alt={p.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8, flex: 'none' }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ font: "600 10.5px/1 'JetBrains Mono',monospace", color: '#8891A5' }}>{p.brand}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
      </div>
      <div style={{ fontWeight: 700, fontSize: 12.5, flex: 'none' }}>{formatPrice(p.price)}</div>
    </Link>
  )
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string>('1')
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const scrollRef = useRef<HTMLDivElement>(null)

  const activeContact = contacts.find((c) => c.id === activeChat) || null
  const activeMessages = messages[activeChat] || []
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts
    const q = search.toLowerCase()
    return contacts.filter((c) => c.name.toLowerCase().includes(q) || c.lastMsg.toLowerCase().includes(q))
  }, [search])

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight }, [activeMessages.length, activeChat])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    const time = new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), { id: 'm' + Date.now(), from: 'me', text, time }] }))
    setInput('')
  }

  const linkedProduct = activeContact?.productId

  return (
    <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden', display: 'flex', height: 'clamp(460px,68vh,660px)' }}>
      <div className="ta-chat-list" style={{ width: 280, flex: 'none', borderRight: '1px solid #EEF0F6', display: mobileView === 'chat' ? 'none' : 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #EEF0F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 15.5 }}>Чаты</div>
            <span style={{ font: "600 11px/1 sans-serif", color: '#1B44F5', background: '#EDF0FF', padding: '4px 8px', borderRadius: 999 }}>{contacts.filter((c) => c.unread > 0).length} новых</span>
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Найти диалог…" className="ta-input" style={{ width: '100%', background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 10, padding: '9px 12px', fontSize: 13.5, outline: 'none' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredContacts.map((c) => (
            <button key={c.id} onClick={() => { setActiveChat(c.id); setMobileView('chat') }} className="ta-tile" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px', background: c.id === activeChat ? '#F5F6FB' : 'transparent', border: 'none', borderBottom: '1px solid #F5F6FA' }}>
              <span style={{ width: 38, height: 38, flex: 'none', borderRadius: '50%', background: c.gradient, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12.5, position: 'relative' }}>
                {c.initials}
                {c.online && <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: '#12B981', border: '2px solid #fff' }} />}
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}><span style={{ fontWeight: 600, fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span><span style={{ fontSize: 11, color: '#8891A5', flex: 'none' }}>{c.time}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}><span style={{ fontSize: 12, color: '#8891A5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMsg}</span>{c.unread > 0 && <span style={{ flex: 'none', minWidth: 17, height: 17, borderRadius: 999, background: '#1B44F5', color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{c.unread}</span>}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0, display: mobileView === 'list' ? 'none' : 'flex', flexDirection: 'column' }} className="ta-chat-window">
        {activeContact && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 18px', borderBottom: '1px solid #EEF0F6' }}>
              <button onClick={() => setMobileView('list')} className="ta-chat-back" style={{ display: 'none', background: 'none', border: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3A4256" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </button>
              <span style={{ width: 38, height: 38, flex: 'none', borderRadius: '50%', background: activeContact.gradient, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12.5 }}>{activeContact.initials}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{activeContact.name}</div>
                <div style={{ fontSize: 12, color: activeContact.online ? '#0B7A55' : '#8891A5' }}>{activeContact.online ? 'Онлайн' : 'Был(а) недавно'}</div>
              </div>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '18px 18px', display: 'flex', flexDirection: 'column', gap: 12, background: '#F7F8FC' }}>
              {activeMessages.map((m) => (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '78%', background: m.from === 'me' ? '#1B44F5' : '#fff', color: m.from === 'me' ? '#fff' : '#0B1020', border: m.from === 'me' ? 'none' : '1px solid #EAECF4', borderRadius: 15, padding: '10px 14px', fontSize: 14 }}>
                    {m.text}
                    {m.productId && <ProductMiniCard productId={m.productId} />}
                  </div>
                  <span style={{ font: "500 10.5px/1 sans-serif", color: '#AEB4C4', padding: '4px 4px 0' }}>{m.time}</span>
                </div>
              ))}
            </div>

            {linkedProduct && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, padding: '10px 18px', borderTop: '1px solid #EEF0F6' }}>
                {['Оформить заказ', 'Запросить прайс', 'Узнать доставку'].map((q) => (
                  <button key={q} onClick={() => setInput(q)} style={{ background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 999, padding: '7px 12px', fontSize: 12.5, fontWeight: 500 }}>{q}</button>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, padding: '14px 16px', borderTop: '1px solid #EEF0F6' }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage() } }} placeholder="Написать сообщение…" className="ta-input" style={{ flex: 1, background: '#F5F6FB', border: '1px solid #E7E9F2', borderRadius: 12, padding: '12px 15px', fontSize: 14, outline: 'none' }} />
              <button onClick={sendMessage} disabled={!input.trim()} className="ta-btn-primary" style={{ flex: 'none', width: 44, height: 44, borderRadius: 12, background: '#1B44F5', color: '#fff', border: 'none', display: 'grid', placeItems: 'center', opacity: input.trim() ? 1 : 0.5 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l16-8-6 16-3-6z" /></svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
