import { Link } from 'react-router-dom'

/* Кастомная SVG-иконка логотипа */
function LogoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 no-underline mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <LogoIcon size={14} />
              </div>
              <span className="text-base font-bold">
                <span className="text-red-400">Tech</span><span className="text-primary-light">Agent</span>
              </span>
            </Link>
            <p className="text-text-dark-secondary text-sm leading-relaxed">
              Агентская закупка электроники для бизнеса. Комиссия от 2 до 3%.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Навигация</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Главная</Link>
              <Link to="/about" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">О платформе</Link>
              <Link to="/how-it-works" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Как работает</Link>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Партнёрам</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/register" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Регистрация</Link>
              <Link to="/login" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Личный кабинет</Link>
              <Link to="/legal" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Документы</Link>
              <Link to="/legal/offer" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Оферта</Link>
              <Link to="/legal/privacy" className="text-text-dark-secondary hover:text-white text-sm transition-colors no-underline">Конфиденциальность</Link>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Контакты</h4>
            <div className="flex flex-col gap-2.5 text-text-dark-secondary text-sm">
              <a href="mailto:info@techagent.ru" className="text-text-dark-secondary hover:text-white transition-colors no-underline">info@techagent.ru</a>
              <a href="tel:+78005553535" className="text-text-dark-secondary hover:text-white transition-colors no-underline">+7 (800) 555-35-35</a>
              <span>Москва, Россия</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-dark mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-dark-secondary text-xs">
            &copy; {new Date().getFullYear()} TechAgent. Все права защищены.
          </p>
          <p className="text-text-dark-secondary text-xs">
            Агентский договор &middot; Глава 52 ГК РФ
          </p>
        </div>
      </div>
    </footer>
  )
}
