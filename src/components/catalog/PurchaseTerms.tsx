import { Link } from 'react-router-dom'
import { Truck, CreditCard, Clock, RotateCcw, type LucideIcon } from 'lucide-react'
import { LEGAL_NAME, SALE_OFFER_PATH, DELIVERY_TERM, PICKUP_POINTS, SDEK_DELIVERY_PRICE } from '../../seo/site'
import { formatPrice } from '../../utils/calculate'

/**
 * Условия покупки — один источник для каталога, посадочных категорий и карточек товара.
 * Формулировки совпадают с офертой купли-продажи: продавец ТехЭйджент; купить можно на сайте (доставка СДЭК)
 * или через партнёра — агента и пункт выдачи. Разложены по темам короткими пунктами, чтобы читалось с телефона.
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
      'До получения от заказа можно отказаться — деньги возвращаются полностью.',
      'Гарантия — 14 дней.',
      'Технически сложный товар с недостатком — вернуть или заменить в течение 15 дней после получения.',
      'Исправный товар — вернуть в течение 7 дней, если нет следов использования, сохранены комплектация и акт приёма-передачи. Из суммы вычитаются расходы на доставку возвращённого товара.',
      'Деньги возвращаются тем же способом в течение 10 дней.',
    ],
    note: 'По Закону РФ «О защите прав потребителей».',
  },
]

export default function PurchaseTerms({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
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
      <p className="terms-foot">
        Продавец — {LEGAL_NAME}. Полные условия — в{' '}
        <Link to={SALE_OFFER_PATH} className="text-primary font-semibold">публичной оферте купли-продажи</Link>.
      </p>
    </div>
  )
}
