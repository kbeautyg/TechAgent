import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react'

const navLinks = [
  { label: 'Главная', path: '/' },
  { label: 'Каталог', path: '/catalog' },
  { label: 'О платформе', path: '/about' },
  { label: 'Как работает', path: '/how-it-works' },
]

/* Кастомная SVG-иконка логотипа */
function LogoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
    </svg>
  )
}

export default function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] sm:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <LogoIcon size={16} />
            </div>
            <span className="text-lg font-bold">
              <span className="text-red-600">Tech</span><span className="text-primary">Agent</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 no-underline ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/[0.07] font-semibold'
                    : 'text-text-muted hover:text-primary hover:bg-primary/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.role === 'ADMIN' && !isDashboard && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/[0.04] transition-all no-underline"
                  >
                    <ShieldCheck size={15} />
                    Админ
                  </Link>
                )}
                {user.role === 'CLIENT' && !isDashboard && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/[0.04] transition-all no-underline"
                  >
                    <LayoutDashboard size={15} />
                    Кабинет
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer bg-transparent border-none"
                >
                  <LogOut size={15} />
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-primary transition-all no-underline"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="btn-blue px-5 py-2.5 rounded-xl text-sm no-underline inline-flex items-center"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-primary/[0.04] transition-colors cursor-pointer bg-transparent border-none text-text-primary"
            aria-label="Меню"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-[500px] opacity-100 pb-4 border-t border-border' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white pt-2">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-all no-underline ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/[0.07] font-semibold'
                      : 'text-text-secondary hover:text-primary hover:bg-primary/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border my-1.5 mx-4" />
              {user ? (
                <>
                  {user.role === 'CLIENT' && (
                    <Link to="/dashboard" className="px-4 py-3 rounded-xl text-[15px] font-medium text-text-secondary no-underline flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Личный кабинет
                    </Link>
                  )}
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" className="px-4 py-3 rounded-xl text-[15px] font-medium text-text-secondary no-underline flex items-center gap-2">
                      <ShieldCheck size={16} />
                      Админ-панель
                    </Link>
                  )}
                  <button onClick={logout} className="px-4 py-3 rounded-xl text-[15px] font-medium text-red-500 text-left cursor-pointer bg-transparent border-none flex items-center gap-2">
                    <LogOut size={16} />
                    Выйти
                  </button>
                </>
              ) : (
                <div className="flex gap-2 mx-4 mt-1">
                  <Link to="/login" className="flex-1 px-4 py-3 rounded-xl text-[15px] font-semibold text-center no-underline bg-text-primary text-white">Войти</Link>
                  <Link to="/register" className="flex-1 btn-blue px-4 py-3 rounded-xl text-[15px] text-center no-underline">Регистрация</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
