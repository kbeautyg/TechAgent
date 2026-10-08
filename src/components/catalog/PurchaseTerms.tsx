import { Link } from 'react-router-dom'
import { LEGAL_NAME, SALE_OFFER_PATH, DELIVERY_TERM, PICKUP_POINTS } from '../../seo/site'

/**
 * Условия покупки — один источник для каталога, посадочных категорий и карточек товара.
 * Формулировки совпадают с офертой купли-продажи: продавец ТехЭйджент, партнёр — агент и пункт выдачи.
 */
const PURCHASE_TERMS: string[] = [
  `Продавец — ${LEGAL_NAME}.`,
  `Заказ оформляет партнёр TechAgent в своём пункте выдачи — там же вы получаете товар. ${PICKUP_POINTS[0].toUpperCase()}${PICKUP_POINTS.slice(1)}.`,
  'Оплата через СБП по ссылке или QR-коду, деньги поступают напрямую продавцу. Цена окончательная, доставка до пункта выдачи входит в цену.',
  `Срок доставки — ${DELIVERY_TERM}. Товар хранится в пункте выдачи 5 дней с даты, когда партнёр сообщил о поступлении.`,
  'Гарантия — 14 дней. Товар надлежащего качества можно вернуть в течение 7 дней после получения; деньги возвращаются в течение 10 дней.',
]

export default function PurchaseTerms({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="space-y-2 m-0 p-0 list-none">
        {PURCHASE_TERMS.map((t) => (
          <li
            key={t}
            className={`relative pl-5 text-[14px] leading-relaxed text-text-secondary before:content-['—'] before:absolute before:left-0 before:text-text-muted`}
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[14px] leading-relaxed text-text-secondary">
        Полные условия — в{' '}
        <Link to={SALE_OFFER_PATH} className="text-primary font-semibold">
          публичной оферте купли-продажи
        </Link>
        .
      </p>
    </div>
  )
}
