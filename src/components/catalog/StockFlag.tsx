/**
 * Фирменный флажок «Доступен к заказу»: закладка с молнией из логотипа свисает с верхнего края карточки.
 * В плитках подпись выезжает при наведении, в карточке товара (page) видна всегда. Стили — .stock-flag в index.css.
 */
export default function StockFlag({ variant = 'card' }: { variant?: 'card' | 'page' }) {
  return (
    <span className={`stock-flag stock-flag-${variant}`} title="Доступен к заказу">
      <span className="stock-flag-ribbon" aria-hidden="true">
        <span className="stock-flag-shape">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
          </svg>
        </span>
      </span>
      <span className="stock-flag-label">Доступен к заказу</span>
    </span>
  )
}
