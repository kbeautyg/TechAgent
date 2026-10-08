import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/* Кастомная SVG-иконка логотипа */
function LogoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
    </svg>
  )
}

export default function Footer() {
  const { user } = useAuth()
  return (
    <footer className="bg-bg-dark text-text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-x-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 no-underline mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <LogoIcon size={14} />
              </div>
              <span className="font-display text-base font-bold">
                <span className="text-red-400">Tech</span><span className="text-primary-light">Agent</span>
              </span>
            </Link>
            <p className="text-text-dark-secondary text-sm leading-relaxed mb-4">
              Электроника с получением в пунктах выдачи партнёров. Продавец — ОсОО&nbsp;«ТехЭйджент».
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Навигация</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Главная</Link>
              <Link to="/about" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">О платформе</Link>
              <Link to="/how-it-works" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Как это работает</Link>
              <Link to="/legal/sale-offer" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Оферта купли-продажи</Link>
              <Link to="/legal/payment" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Оплата и возврат</Link>
            </div>
          </div>

          {/* Catalog categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Каталог</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/catalog/smartfony" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Смартфоны</Link>
              <Link to="/catalog/noutbuki" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Ноутбуки</Link>
              <Link to="/catalog/planshety" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Планшеты</Link>
              <Link to="/catalog/naushniki" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Наушники</Link>
              <Link to="/catalog/chasy" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Умные часы</Link>
              <Link to="/catalog" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Все товары →</Link>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Партнёрам</h4>
            <div className="flex flex-col gap-2.5">
              {user ? (
                <Link to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Личный кабинет</Link>
              ) : (
                <>
                  <Link to="/register" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Стать партнёром</Link>
                  <Link to="/login" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Личный кабинет</Link>
                </>
              )}
              <Link to="/legal" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Документы</Link>
              <Link to="/legal/offer" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Агентский договор-оферта</Link>
              <Link to="/legal/privacy" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Конфиденциальность</Link>
              <Link to="/legal/terms" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Пользовательское соглашение</Link>
            </div>
          </div>

          {/* Contacts: адрес почты отдельной строкой — на телефоне не рвётся посреди слова */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4">Контакты</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3 text-sm">
              {[
                { href: 'mailto:info@techagent.pro', value: 'info@techagent.pro', note: 'общие вопросы' },
                { href: 'mailto:partners@techagent.pro', value: 'partners@techagent.pro', note: 'партнёрам' },
                { href: 'mailto:help@techagent.pro', value: 'help@techagent.pro', note: 'покупателям' },
                { href: 'mailto:compliance@techagent.pro', value: 'compliance@techagent.pro', note: 'юридические вопросы' },
                { href: 'https://t.me/techagent_support_bot', value: '@techagent_support_bot', note: 'поддержка в Telegram' },
              ].map((c) => (
                <a
                  key={c.value}
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group no-underline"
                >
                  <span className="block text-text-dark-secondary group-hover:text-white transition-colors">{c.value}</span>
                  <span className="block text-xs text-text-dark-secondary/70">{c.note}</span>
                </a>
              ))}
              <p className="text-text-dark-secondary text-xs leading-relaxed sm:col-span-2 lg:col-span-1">
                Кыргызская Республика, г.&nbsp;Бишкек, Октябрьский район, 8&nbsp;мкр, д.&nbsp;33, кв.&nbsp;8
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-dark mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-dark-secondary text-xs">
            &copy; {new Date().getFullYear()} TechAgent. Все права защищены.
          </p>
          <p className="text-text-dark-secondary text-xs font-mono flex flex-wrap justify-center sm:justify-end gap-x-3 gap-y-1">
            <span>ОсОО&nbsp;«ТехЭйджент»</span>
            <span>ИНН&nbsp;9909766511</span>
            <span>КПП&nbsp;771387001</span>
            <span>Рег.&nbsp;№&nbsp;326302-3301-ООО</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
