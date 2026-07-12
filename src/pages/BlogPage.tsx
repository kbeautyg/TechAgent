import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '../data/blog'

const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${monthsRu[m - 1]} ${y}`
}

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden pt-24 pb-10">
        <div className="absolute top-[-100px] left-[25%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[13px] font-semibold mb-6 font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            БЛОГ
          </div>
          <h1 className="text-[34px] sm:text-[44px] font-extrabold mb-4 text-text-primary tracking-tight leading-[1.1]">
            Про агентскую закупку — по делу
          </h1>
          <p className="text-[16px] text-text-secondary max-w-xl mx-auto leading-relaxed">
            Как устроена схема, какие документы нужны ИП и когда агент выгоднее самостоятельного ввоза
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col gap-4">
          {blogPosts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-bg-section rounded-3xl p-7 sm:p-8 no-underline hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center gap-3 text-[12px] text-text-muted font-medium mb-3">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span className="w-1 h-1 rounded-full bg-text-light" />
                <span>{post.readingMinutes} мин чтения</span>
              </div>
              <h2 className="text-[19px] sm:text-[21px] font-extrabold text-text-primary tracking-tight leading-snug mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-4">{post.description}</p>
              <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary">
                Читать статью <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-bg-dark rounded-3xl p-8 sm:p-10 text-center text-white">
          <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight mb-3">Готовы попробовать на практике?</h2>
          <p className="text-white/50 text-[14px] mb-6 max-w-md mx-auto">
            Регистрация за 2 минуты, комиссия 3%, первый заказ — уже сегодня
          </p>
          <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-text-primary rounded-2xl text-[14px] font-semibold no-underline hover:bg-white/90 transition-colors">
            Стать партнёром <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
