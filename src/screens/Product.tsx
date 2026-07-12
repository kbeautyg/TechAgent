import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { decorateProduct, Icon } from '../lib/techagent'
import { translateSpecKey, translateSpecValue } from '../utils/translate'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [imgFailed, setImgFailed] = useState(false)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <section>
        <div style={{ maxWidth: 520, margin: '0 auto', padding: 'clamp(60px,10vw,120px) clamp(16px,4vw,40px)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 10 }}>Товар не найден</div>
          <div style={{ fontSize: 14.5, color: '#8891A5', marginBottom: 22 }}>Возможно, он был снят с продажи или ссылка устарела.</div>
          <Link to="/catalog" className="ta-btn-primary" style={{ display: 'inline-flex', background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: '13px 22px', fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}>Вернуться в каталог</Link>
        </div>
      </section>
    )
  }

  const p = decorateProduct(product)
  const specs = Object.entries(product.specs)
  const related = products.filter((x) => x.category === product.category && x.id !== product.id).slice(0, 4).map(decorateProduct)
  const askHref = user ? '/dashboard/chat' : '/login'
  const orderHref = user ? '/dashboard/orders/new' : '/login'

  return (
    <section>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(20px,3vw,34px) clamp(16px,4vw,40px) clamp(30px,4vw,54px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8891A5', marginBottom: 22, flexWrap: 'wrap' }}>
          <Link to="/catalog" style={{ color: '#8891A5', textDecoration: 'none' }}>Каталог</Link>
          <span>/</span><span style={{ color: '#3A4256' }}>{p.catLabel}</span><span>/</span><span style={{ color: '#0B1020', fontWeight: 500 }}>{product.name}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,48px)' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <div style={{ position: 'relative', background: p.tint, border: '1px solid #E7E9F2', borderRadius: 24, aspectRatio: '1/1', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 16, left: 16, font: "600 11px/1 'JetBrains Mono',monospace", color: p.accent, background: '#fff', border: '1px solid #EEF0F6', padding: '6px 10px', borderRadius: 999, zIndex: 1 }}>{p.catLabel}</span>
              {!product.inStock && <span style={{ position: 'absolute', top: 16, right: 16, font: "600 11px/1 'JetBrains Mono',monospace", color: '#fff', background: '#8891A5', padding: '6px 10px', borderRadius: 999, zIndex: 1 }}>ПОД ЗАКАЗ</span>}
              {imgFailed ? <div style={{ transform: 'scale(1.9)' }}>{p.icon}</div> : (
                <img src={p.img} alt={product.name} onError={() => setImgFailed(true)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              <span style={{ position: 'absolute', bottom: 16, left: 16, display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 600, fontSize: 12.5, color: '#0B7A55', background: '#E4F8F0', padding: '8px 12px', borderRadius: 999 }}><Icon name="shield" size={14} color="#12B981" />Оригинал · запечатан</span>
            </div>
          </div>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <div style={{ font: "600 12.5px/1 'JetBrains Mono',monospace", color: '#8891A5', marginBottom: 10 }}>{product.brand}</div>
            <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem,3.2vw,2.3rem)', letterSpacing: '-.02em', lineHeight: 1.08, margin: '0 0 14px' }}>{product.name}</h1>
            <p style={{ fontSize: 14.5, color: '#5B647A', lineHeight: 1.55, marginBottom: 22 }}>{product.description}</p>

            <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 22, marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}><span style={{ fontSize: 14, color: '#5B647A' }}>Стоимость товара</span><span style={{ fontWeight: 600, fontSize: 15 }}>{p.priceStr}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 16, borderBottom: '1px dashed #E0E3EE' }}><span style={{ fontSize: 14, color: '#5B647A', display: 'inline-flex', alignItems: 'center', gap: 7 }}>Комиссия агента <span style={{ font: "600 11px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '3px 6px', borderRadius: 6 }}>{p.rateStr}</span></span><span style={{ fontWeight: 600, fontSize: 15, color: '#1B44F5' }}>+{p.commStr}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}><div><div style={{ fontSize: 12.5, color: '#8891A5', marginBottom: 2 }}>Итого «под ключ»</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(25px,4vw,33px)', letterSpacing: '-.02em' }}>{p.totalStr}</div></div><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: '#5B647A', background: '#F5F6FB', border: '1px solid #EEF0F6', padding: '8px 11px', borderRadius: 10, whiteSpace: 'nowrap' }}><Icon name="box" size={15} color="#5B647A" />5–7 дней</span></div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
              <button onClick={() => navigate(orderHref)} className="ta-btn-primary" style={{ flex: '1 1 210px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 16, fontWeight: 600, fontSize: 15.5, boxShadow: '0 10px 24px rgba(27,68,245,.28)' }}>Создать заказ</button>
              <button onClick={() => navigate(askHref)} className="ta-outline" style={{ flex: '0 1 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#0B1020', border: '1px solid #E7E9F2', borderRadius: 13, padding: '16px 20px', fontWeight: 600, fontSize: 15 }}><Icon name="chat" size={18} />Спросить агента</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#3A4256' }}><Icon name="shield" size={16} color="#12B981" />Белая схема</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#3A4256' }}><Icon name="doc" size={16} color="#1B44F5" />Чек и документы</span>
            </div>
          </div>
        </div>

        {specs.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, padding: 24, marginTop: 'clamp(24px,4vw,40px)' }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Характеристики</div>
            {specs.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F0F1F6', fontSize: 14 }}><span style={{ color: '#8891A5' }}>{translateSpecKey(k)}</span><span style={{ fontWeight: 500 }}>{translateSpecValue(k, v)}</span></div>
            ))}
          </div>
        )}

        {related.length > 0 && (
          <div style={{ marginTop: 'clamp(30px,4vw,48px)' }}>
            <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 18 }}>Похожие товары</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
              {related.map((rp) => <ProductCard key={rp.id} p={rp} onClick={() => navigate(`/catalog/${rp.id}`)} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
