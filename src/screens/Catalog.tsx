import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { CATEGORY_LIST, categoryMeta, decorateProduct, pluralizeItems } from '../lib/techagent'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get('cat')
  const [category, setCategory] = useState(initialCat && CATEGORY_LIST.includes(initialCat) ? initialCat : 'all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('popular')

  const filtered = useMemo(() => {
    let list = products.filter((p) => category === 'all' || p.category === category)
    const s = search.trim().toLowerCase()
    if (s) list = list.filter((p) => (p.brand + ' ' + p.name + ' ' + p.category).toLowerCase().includes(s))
    if (sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price)
    else list = [...list].sort((a, b) => Number(b.inStock) - Number(a.inStock))
    return list.map(decorateProduct)
  }, [category, search, sort])

  const chips = [{ key: 'all', label: 'Все' }, ...CATEGORY_LIST.map((c) => ({ key: c, label: categoryMeta(c).label }))]

  return (
    <section>
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: 'clamp(24px,4vw,44px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ font: "600 12px/1 'JetBrains Mono',monospace", color: '#1B44F5', letterSpacing: '.08em', marginBottom: 12 }}>/ КАТАЛОГ</div>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-.025em', margin: '0 0 6px' }}>Каталог техники</h1>
            <div style={{ fontSize: 14.5, color: '#8891A5' }}>{pluralizeItems(filtered.length)} · цена «под ключ» с комиссией</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8891A5" strokeWidth="1.9" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск: iPhone, MacBook…" className="ta-input" style={{ width: 'min(280px,60vw)', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '12px 14px 12px 38px', fontSize: 14.5, outline: 'none' }} />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 11, padding: '12px 14px', fontSize: 14.5, fontWeight: 500, outline: 'none', cursor: 'pointer' }}>
              <option value="popular">Сначала в наличии</option>
              <option value="priceAsc">Сначала дешевле</option>
              <option value="priceDesc">Сначала дороже</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {chips.map((c) => {
            const active = c.key === category
            return (
              <button key={c.key} onClick={() => setCategory(c.key)} style={{ borderRadius: 999, padding: '9px 16px', fontWeight: 600, fontSize: 13.5, transition: '.14s', background: active ? '#1B44F5' : '#fff', color: active ? '#fff' : '#3A4256', border: `1px solid ${active ? '#1B44F5' : '#E7E9F2'}` }}>{c.label}</button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, justifyContent: 'space-between', background: 'linear-gradient(120deg,#0B1020,#1B2A6B)', color: '#fff', borderRadius: 20, padding: '20px 24px', marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 44, height: 44, flex: 'none', borderRadius: 12, background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg></span>
            <div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>Не нашли нужное?</div><div style={{ fontSize: 13.5, color: '#B9C1DC' }}>Пришлите ссылку на любой зарубежный магазин — рассчитаем и выкупим.</div></div>
          </div>
          <button onClick={() => navigate('/dashboard/orders/new')} className="ta-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#0B1020', border: 'none', borderRadius: 11, padding: '12px 18px', fontWeight: 600, fontSize: 14.5, whiteSpace: 'nowrap' }}>Заявка на товар <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} onClick={() => navigate(`/catalog/${p.id}`)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20 }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Ничего не найдено</div>
            <div style={{ fontSize: 14.5, color: '#8891A5', marginBottom: 20 }}>Попробуйте изменить запрос или сбросить фильтры.</div>
            <button onClick={() => { setCategory('all'); setSearch('') }} style={{ background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 11, padding: '12px 20px', fontWeight: 600, fontSize: 14.5 }}>Показать все товары</button>
          </div>
        )}
      </div>
    </section>
  )
}
