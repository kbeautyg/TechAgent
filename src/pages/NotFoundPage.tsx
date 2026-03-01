import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-white">
      <div className="text-center max-w-md">
        <div className="text-[80px] sm:text-[120px] font-extrabold text-primary/10 leading-none mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">Страница не найдена</h1>
        <p className="text-text-muted mb-8">Возможно, она была перемещена или удалена. Попробуйте начать с главной страницы.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold no-underline rounded-xl">
            На главную
          </Link>
          <Link to="/catalog" className="btn-outline inline-flex items-center justify-center px-6 py-3 text-sm font-semibold no-underline rounded-xl">
            Каталог
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center text-sm text-text-muted">
          <Link to="/about" className="hover:text-primary transition-colors no-underline text-text-muted">О платформе</Link>
          <span>·</span>
          <Link to="/how-it-works" className="hover:text-primary transition-colors no-underline text-text-muted">Как работает</Link>
          <span>·</span>
          <Link to="/login" className="hover:text-primary transition-colors no-underline text-text-muted">Войти</Link>
        </div>
      </div>
    </div>
  )
}
