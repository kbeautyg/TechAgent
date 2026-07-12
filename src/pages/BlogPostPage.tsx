import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogPosts, getPostBySlug } from '../data/blog'
import { formatPostDate } from './BlogPage'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-2xl font-extrabold mb-3 text-text-primary">Статья не найдена</h1>
        <p className="text-text-muted text-[15px] mb-6">Возможно, она была перемещена или удалена</p>
        <Link to="/blog" className="btn-primary inline-flex px-8 py-3.5 no-underline">Все статьи</Link>
      </div>
    )
  }

  const others = blogPosts.filter(p => p.slug !== post.slug)

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav className="pp-breadcrumb" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          <Link to="/blog">Блог</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          <span className="pp-bc-current">{post.h1}</span>
        </nav>

        <header className="mt-8 mb-10">
          <div className="flex items-center gap-3 text-[13px] text-text-muted font-medium mb-4">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="w-1 h-1 rounded-full bg-text-light" />
            <span>{post.readingMinutes} мин чтения</span>
          </div>
          <h1 className="text-[30px] sm:text-[38px] font-extrabold tracking-tight text-text-primary leading-[1.15]">
            {post.h1}
          </h1>
        </header>

        <div className="flex flex-col gap-6">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.h2 && (
                <h2 className="text-[21px] sm:text-[24px] font-extrabold tracking-tight text-text-primary mb-3">
                  {section.h2}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-[15.5px] text-text-secondary leading-relaxed mb-3">{p}</p>
              ))}
              {section.list && (
                <ul className="flex flex-col gap-2.5 mt-2 pl-0 list-none">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 px-4 py-3 bg-bg-section rounded-xl">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                      <span className="text-[14.5px] text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary rounded-3xl p-8 sm:p-10 text-center text-white">
          <h2 className="text-[22px] sm:text-[24px] font-extrabold tracking-tight mb-3">
            Попробуйте агентскую закупку в деле
          </h2>
          <p className="text-white/60 text-[14px] mb-6 max-w-md mx-auto">
            Комиссия 3%, доставка 5–7 дней, документы по каждой поставке
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-text-primary rounded-2xl text-[14px] font-semibold no-underline hover:bg-white/90 transition-colors">
              Стать партнёром <ArrowRight size={15} />
            </Link>
            <Link to="/calculator" className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-[14px] font-semibold no-underline bg-bg-dark text-white hover:opacity-90 transition-opacity">
              Посчитать в калькуляторе
            </Link>
          </div>
        </div>

        {/* Other posts */}
        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[18px] font-extrabold tracking-tight text-text-primary mb-4">Ещё по теме</h2>
            <div className="flex flex-col gap-3">
              {others.map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group flex items-center justify-between gap-4 bg-bg-section rounded-2xl px-5 py-4 no-underline">
                  <span className="text-[14.5px] font-semibold text-text-primary group-hover:text-primary transition-colors">{p.title}</span>
                  <ArrowRight size={15} className="text-text-light group-hover:text-primary shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
