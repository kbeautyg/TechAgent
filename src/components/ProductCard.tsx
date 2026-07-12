import { useState } from 'react'
import type { DecoratedProduct } from '../lib/techagent'

export default function ProductCard({ p, onClick }: { p: DecoratedProduct; onClick: () => void }) {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <button onClick={onClick} className="ta-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: p.tint, display: 'grid', placeItems: 'center' }}>
        <span style={{ position: 'absolute', top: 12, left: 12, font: "600 10.5px/1 'JetBrains Mono',monospace", color: p.accent, background: '#fff', border: '1px solid #EEF0F6', padding: '5px 8px', borderRadius: 999, zIndex: 1 }}>{p.catLabel}</span>
        {!p.inStock && <span style={{ position: 'absolute', top: 12, right: 12, font: "700 10.5px/1 'JetBrains Mono',monospace", color: '#fff', background: '#8891A5', padding: '5px 8px', borderRadius: 999, zIndex: 1 }}>ПОД ЗАКАЗ</span>}
        {imgFailed ? p.icon : (
          <img src={p.img} alt={p.name} loading="lazy" onError={() => setImgFailed(true)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>
      <div style={{ padding: '15px 16px 17px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div>
          <div style={{ font: "600 11.5px/1 'JetBrains Mono',monospace", color: '#8891A5' }}>{p.brand}</div>
          <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-.01em', marginTop: 5, lineHeight: 1.3 }}>{p.name}</div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, paddingTop: 4 }}>
          <div><div style={{ fontSize: 11, color: '#8891A5', marginBottom: 2 }}>под ключ</div><div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>{p.totalStr}</div></div>
          <span style={{ font: "600 11.5px/1 'JetBrains Mono',monospace", color: '#1B44F5', background: '#EDF0FF', padding: '6px 9px', borderRadius: 999 }}>{p.rateStr}</span>
        </div>
      </div>
    </button>
  )
}
