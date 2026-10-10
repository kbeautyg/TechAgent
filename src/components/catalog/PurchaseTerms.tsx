import { Link } from 'react-router-dom'
import { LEGAL_NAME, SALE_OFFER_PATH, DELIVERY_TERM, PICKUP_POINTS, SDEK_DELIVERY_PRICE } from '../../seo/site'
import { formatPrice } from '../../utils/calculate'

/**
 * Условия покупки — один источник для каталога, посадочных категорий и карточек товара.
 * Формулировки совпадают с офертой купли-продажи: продавец ТехЭйджент; купить можно на сайте (доставка СДЭК)
 * или через партнёра — агента и пункт выдачи.
 */
const sdekDelivery =
  SDEK_DELIVERY_PRICE === null
    ? 'стоимость доставки сообщаем при подтверждении заказа'
    : SDEK_DELIVERY_PRICE === 0
      ? 'доставка бесплатная'
      : `доставка — ${formatPrice(SDEK_DELIVERY_PRICE)} на заказ`

const PURCHASE_TERMS: string[] = [
  `Продавец — ${LEGAL_NAME}.`,
  `На сайте: положите товар в корзину и оформите заказ с доставкой в пункт СДЭК или постамат — ${sdekDelivery}. После проверки наличия пришлём ссылку на оплату.`,
  `У партнёра: заказ оформляет партнёр TechAgent в своём пункте выдачи — там же вы получаете товар, доставка до пункта входит в цену. ${PICKUP_POINTS[0].toUpperCase()}${PICKUP_POINTS.slice(1)}.`,
  'Оплата через СБП по ссылке или QR-коду, деньги поступают напрямую продавцу. Цена товара окончательная.',
  `Срок доставки — ${DELIVERY_TERM}. В пункте партнёра товар хранится 5 дней с даты, когда партнёр сообщил о поступлении; в пункте СДЭК — по правилам СДЭК.`,
  'Возврат — по Закону РФ «О защите прав потребителей». До получения от заказа можно отказаться — деньги возвращаются полностью. Гарантия — 14 дней; технически сложную технику с недостатком можно вернуть или заменить в течение 15 дней после получения. Исправный товар можно вернуть в течение 7 дней, только если нет следов использования и сохранены комплектация и акт приёма-передачи; из суммы вычитаются расходы на доставку возвращённого товара. Деньги возвращаются тем же способом в течение 10 дней.',
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
