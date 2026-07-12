import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../lib/techagent'

const stats = [
  { value: '200+', label: 'Товаров в каталоге' },
  { value: '3%', label: 'Комиссия агента' },
  { value: '5–7', label: 'Дней доставка' },
  { value: '24/7', label: 'Поддержка' },
]

const advantages = [
  { glyph: 'coins', title: 'Прозрачная комиссия', desc: 'Единые 3% от стоимости товара. Никаких скрытых сборов, минимальных сумм или доплат.' },
  { glyph: 'truck', title: 'Быстрая логистика', desc: 'Доставка 5–7 рабочих дней через проверенных карго-партнёров. Отслеживание на каждом этапе.' },
  { glyph: 'doc', title: 'Полный документооборот', desc: 'Автоматическое формирование всех документов. Инвойсы, акты, чеки — всё в личном кабинете.' },
  { glyph: 'grid', title: 'Удобный личный кабинет', desc: 'Создание заказов, генерация платёжных ссылок, отслеживание статусов — всё в одном месте.' },
  { glyph: 'globe', title: 'Широкий каталог', desc: 'Apple, Samsung, Sony, DJI и другие топовые бренды. Всё, что нужно вашим клиентам.' },
  { glyph: 'bolt', title: 'Мгновенная оплата', desc: 'Генерация QR-кодов и ссылок для оплаты через СБП. Клиент оплачивает за минуту.' },
]

const roles = [
  { title: 'TechAgent', role: 'Агент по закупке', desc: 'Выкупаем товар у зарубежного поставщика по поручению партнёра. Мы НЕ продавец, НЕ импортёр, НЕ перевозчик.', items: ['Находим поставщика', 'Выкупаем товар', 'Передаём карго-компании партнёра'] },
  { title: 'Партнёр', role: 'Импортёр товара', desc: 'Является импортёром по закону. Создаёт заказы, отправляет ссылку на оплату клиенту, получает товар.', items: ['Создаёт заказ в ЛК', 'Передаёт ссылку клиенту', 'Получает и отдаёт товар'] },
  { title: 'Покупатель', role: 'Конечный клиент', desc: 'Приходит в магазин партнёра, выбирает устройство, оплачивает по ссылке и получает товар через 5–7 дней.', items: ['Выбирает товар', 'Оплачивает по ссылке', 'Получает от партнёра'] },
]

const importantNotice = [
  { label: 'Роль TechAgent', value: 'Агент по закупке, НЕ продавец и НЕ импортёр' },
  { label: 'Роль партнёра', value: 'Выступает принципалом и импортёром товара' },
  { label: 'Таможенное оформление', value: 'Карго-компанией от имени партнёра' },
  { label: 'Юридическая основа', value: 'Агентский договор (глава 52 ГК РФ)' },
]
const legalData = [
  { label: 'Тип договора', value: 'Агентский договор (глава 52 ГК РФ)' },
  { label: 'Комиссия агента', value: '3% от стоимости товара' },
  { label: 'Роль партнёра', value: 'Принципал и импортёр товара' },
  { label: 'Таможня', value: 'Оформляется карго от имени партнёра' },
]

export default function AboutPage() {
  const navigate = useNavigate()
  return (
    <section>
      {/* hero */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(30px,5vw,64px) clamp(16px,4vw,40px) clamp(10px,2vw,20px)', textAlign: 'center' }}>
        <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.1em', marginBottom: 16 }}>/ О ПЛАТФОРМЕ</div>
        <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4.6vw,3.2rem)', letterSpacing: '-.03em', lineHeight: 1.05, margin: '0 0 18px' }}>TechAgent — агентская закупка электроники</h1>
        <p style={{ fontSize: 'clamp(15.5px,1.6vw,18px)', lineHeight: 1.55, color: '#5B647A', maxWidth: 620, margin: '0 auto' }}>B2B-платформа, которая помогает ИП-партнёрам закупать электронику за рубежом по выгодным ценам. Прозрачно, легально и быстро.</p>
      </div>

      {/* stats */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(20px,3vw,34px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 1, background: '#E7E9F2', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#fff', padding: '22px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(24px,3.4vw,32px)', letterSpacing: '-.02em', color: '#1B44F5' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#8891A5', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* advantages */}
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(30px,4vw,54px) clamp(16px,4vw,40px)' }}>
        <h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem,3.4vw,2.4rem)', letterSpacing: '-.02em', margin: '0 0 12px', textAlign: 'center' }}>Что такое TechAgent?</h2>
        <p style={{ fontSize: 15.5, color: '#8891A5', textAlign: 'center', maxWidth: 620, margin: '0 auto 34px', lineHeight: 1.55 }}>Платформа для партнёров с розничными точками электроники. Мы берём на себя закупку за рубежом — вы получаете товар по лучшей цене с минимальной комиссией.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {advantages.map((a) => (
            <div key={a.title} className="ta-tile" style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 24 }}>
              <span style={{ width: 46, height: 46, borderRadius: 13, background: '#EDF0FF', display: 'grid', placeItems: 'center', marginBottom: 16 }}><Icon name={a.glyph} size={21} color="#1B44F5" /></span>
              <div style={{ fontWeight: 700, fontSize: 15.5, letterSpacing: '-.01em', marginBottom: 8 }}>{a.title}</div>
              <div style={{ fontSize: 13.5, color: '#8891A5', lineHeight: 1.55 }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* roles */}
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(10px,2vw,20px) clamp(16px,4vw,40px) clamp(30px,4vw,54px)' }}>
        <h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem,3.4vw,2.4rem)', letterSpacing: '-.02em', margin: '0 0 12px', textAlign: 'center' }}>Как устроена модель</h2>
        <p style={{ fontSize: 15.5, color: '#8891A5', textAlign: 'center', margin: '0 0 34px' }}>Три участника — каждый со своей ролью</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {roles.map((r, i) => (
            <div key={r.title} style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 24 }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, background: '#0B1020', color: '#fff', display: 'grid', placeItems: 'center', font: "800 14px/1 'Unbounded',sans-serif", marginBottom: 18 }}>{i + 1}</span>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-.01em' }}>{r.title}</div>
              <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', margin: '6px 0 12px' }}>{r.role}</div>
              <p style={{ fontSize: 13.5, color: '#8891A5', lineHeight: 1.55, margin: '0 0 16px' }}>{r.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {r.items.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 11, padding: '9px 12px' }}>
                    <span style={{ width: 18, height: 18, flex: 'none', borderRadius: '50%', background: '#EDF0FF', color: '#1B44F5', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13, color: '#3A4256' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* legal */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(16px,4vw,40px) clamp(40px,5vw,64px)' }}>
        <h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem,3.4vw,2.4rem)', letterSpacing: '-.02em', margin: '0 0 12px', textAlign: 'center' }}>Юридическая основа</h2>
        <p style={{ fontSize: 15.5, color: '#8891A5', textAlign: 'center', margin: '0 0 30px' }}>Полностью белая схема по законодательству РФ</p>
        <div style={{ background: '#0B1020', color: '#fff', borderRadius: 24, padding: 'clamp(24px,4vw,40px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 40, height: 40, flex: 'none', borderRadius: 12, background: 'rgba(18,185,129,.18)', display: 'grid', placeItems: 'center' }}><Icon name="shield" size={19} color="#5EE3B4" /></span>
            <div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 17 }}>Важно знать</div><div style={{ fontSize: 12.5, color: '#7C86A3' }}>О юридической модели и ответственности</div></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '4px 28px', marginBottom: 8, borderBottom: '1px solid #1C2440', paddingBottom: 18 }}>
            {importantNotice.map((item) => (
              <div key={item.label} style={{ padding: '9px 0' }}>
                <div style={{ font: "600 10.5px/1 'JetBrains Mono',monospace", color: '#7C86A3', letterSpacing: '.05em', marginBottom: 6, textTransform: 'uppercase' }}>{item.label}</div>
                <div style={{ fontSize: 13.5, color: '#D5DDFF' }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '4px 28px', paddingTop: 10 }}>
            {legalData.map((item) => (
              <div key={item.label} style={{ padding: '9px 0' }}>
                <div style={{ font: "600 10.5px/1 'JetBrains Mono',monospace", color: '#7C86A3', letterSpacing: '.05em', marginBottom: 6, textTransform: 'uppercase' }}>{item.label}</div>
                <div style={{ fontSize: 13.5, color: '#D5DDFF' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(16px,4vw,40px) clamp(40px,6vw,72px)' }}>
        <div style={{ background: 'linear-gradient(120deg,#1B44F5,#0E2FCC)', borderRadius: 28, padding: 'clamp(34px,5vw,56px)', color: '#fff', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem,3.2vw,2.2rem)', letterSpacing: '-.02em', margin: '0 0 10px' }}>Начните зарабатывать с TechAgent</h2>
          <p style={{ fontSize: 15.5, color: '#D5DDFF', margin: '0 auto 26px', maxWidth: 480, lineHeight: 1.55 }}>Зарегистрируйтесь за 2 минуты, создайте первый заказ и предложите клиентам лучшие цены на электронику.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link to="/register" className="ta-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', color: '#0B1020', border: 'none', borderRadius: 13, padding: '15px 24px', fontWeight: 600, fontSize: 15.5, textDecoration: 'none' }}>Стать партнёром</Link>
            <button onClick={() => navigate('/how-it-works')} style={{ background: 'rgba(255,255,255,.14)', color: '#fff', border: '1px solid rgba(255,255,255,.35)', borderRadius: 13, padding: '15px 24px', fontWeight: 600, fontSize: 15.5 }}>Как это работает</button>
          </div>
        </div>
      </div>
    </section>
  )
}
