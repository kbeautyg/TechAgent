import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Truck, CreditCard, Clock, RotateCcw, type LucideIcon } from 'lucide-react'
import { LEGAL_NAME, SALE_OFFER_PATH, DELIVERY_TERM, PICKUP_POINTS, SDEK_DELIVERY_PRICE } from '../../seo/site'
import { formatPrice } from '../../utils/calculate'

/**
 * Условия покупки — один источник для каталога, посадочных категорий и карточек товара.
 * Формулировки совпадают с офертой купли-продажи: продавец ТехЭйджент; купить можно на сайте (доставка СДЭК)
 * или через партнёра — агента и пункт выдачи. Разложены по темам короткими пунктами, чтобы читалось с телефона.
 * Одна панель на всю ширину: четыре темы колонками на компьютере, по две на планшете, списком на телефоне.
 */
const sdekDelivery =
  SDEK_DELIVERY_PRICE === null
    ? 'стоимость доставки сообщаем при подтверждении заказа'
    : SDEK_DELIVERY_PRICE === 0
      ? 'доставка бесплатная'
      : `${formatPrice(SDEK_DELIVERY_PRICE)} на заказ`

const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

const GROUPS: { icon: LucideIcon; title: string; items: string[]; note?: string }[] = [
  {
    icon: Truck,
    title: 'Как получить',
    items: [
      `На сайте — доставка в пункт СДЭК или постамат, ${sdekDelivery}.`,
      `У партнёра TechAgent — заказ оформляют в его пункте выдачи, там же вы получаете товар. Доставка до пункта входит в цену. ${cap(PICKUP_POINTS)}.`,
    ],
  },
  {
    icon: CreditCard,
    title: 'Оплата',
    items: [
      'Через СБП по ссылке или QR-коду.',
      'Заказ на сайте: сначала проверяем наличие, затем присылаем ссылку на оплату.',
      'Цена товара окончательная.',
      'Отказаться от заказа можно до получения — деньги вернём полностью.',
    ],
  },
  {
    icon: Clock,
    title: 'Сроки',
    items: [
      `Доставка — ${DELIVERY_TERM}.`,
      'В пункте партнёра товар хранится 5 дней с даты, когда партнёр сообщил о поступлении.',
      'В пункте СДЭК — по правилам СДЭК.',
    ],
  },
  {
    icon: RotateCcw,
    title: 'Возврат и гарантия',
    items: [
      'Гарантия — 14 дней.',
      'Технически сложный товар с недостатком — возврат или замена в течение 15 дней.',
      'Исправный товар — возврат в течение 7 дней: без следов использования, с комплектацией и актом. Вычитается стоимость обратной доставки.',
      'Деньги возвращаем тем же способом в течение 10 дней.',
    ],
    note: 'По Закону РФ «О защите прав потребителей».',
  },
]

/** foot — строка для конкретной страницы под условиями: куда идти дальше */
export default function PurchaseTerms({ className = '', foot }: { className?: string; foot?: ReactNode }) {
  return (
    <div className={`terms-panel ${className}`}>
      <div className="terms-grid">
        {GROUPS.map(({ icon: Icon, title, items, note }) => (
          <section key={title} className="terms-group">
            <h3 className="terms-title">
              <span className="terms-icon"><Icon size={18} strokeWidth={2} /></span>
              {title}
            </h3>
            <ul className="terms-list">
              {items.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {note && <p className="terms-note">{note}</p>}
          </section>
        ))}
      </div>
      <div className="terms-foot">
        <p>
          Продавец — {LEGAL_NAME}. Полные условия — в{' '}
          <Link to={SALE_OFFER_PATH} className="text-primary font-semibold">публичной оферте купли-продажи</Link>.
        </p>
        {foot && <p>{foot}</p>}
      </div>
    </div>
  )
}
