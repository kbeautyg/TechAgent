import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockOrders } from '../../data/mock'
import { formatDate, formatPrice } from '../../utils/calculate'
import { useDataRevision } from '../../utils/store'
import type { Order, User } from '../../types'

/*
 * Акт приёма-передачи товара, который формирует Платформа по заказу (агентский договор-оферта, п. 1, 5.1).
 * Партнёр печатает его из кабинета в двух экземплярах: экземпляр Покупателя и экземпляр Продавца.
 * Простая форма для покупателя — физического лица. Страница открывается без меню сайта.
 */

const SELLER = 'ООО\u00A0«ТехЭйджент», ИНН 00403202610304, рег. № 326302-3301-ООО (Кыргызская Республика), ИНН 9909766511, КПП 771387001 (Российская Федерация), адрес: Кыргызская Республика, г. Бишкек, Октябрьский район, 8 мкр, д. 33, кв. 8'

const COPIES = ['Экземпляр Покупателя', 'Экземпляр Продавца']

const css = `
.act-root { min-height: 100vh; background: #eef0f3; padding: 16px 12px 40px; }
.act-toolbar { max-width: 210mm; margin: 0 auto 16px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.act-sheet { background: #fff; color: #111; max-width: 210mm; margin: 0 auto 20px; padding: 18mm 16mm;
  font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.45; box-shadow: 0 1px 4px rgba(0,0,0,.12); }
.act-copy { text-align: right; font-size: 10pt; color: #444; margin-bottom: 10px; }
.act-title { text-align: center; font-weight: 700; font-size: 13pt; margin: 0 0 18px; font-family: inherit; letter-spacing: normal; }
.act-sheet p { margin: 0 0 9px; }
.act-table { width: 100%; border-collapse: collapse; margin: 6px 0 12px; font-size: 11pt; }
.act-table th, .act-table td { border: 1px solid #222; padding: 5px 7px; vertical-align: top; text-align: left; }
.act-table th { font-weight: 700; }
.act-table td.num, .act-table th.num { white-space: nowrap; text-align: right; }
.act-blank { display: inline-block; min-width: 46mm; border-bottom: 1px solid #222; }
.act-signs { display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; margin-top: 16mm; }
.act-sign-role { font-weight: 700; margin-bottom: 12mm; min-height: 2.9em; }
.act-sign-line { display: flex; gap: 6px; align-items: flex-end; }
.act-sign-line span { flex: 1; border-bottom: 1px solid #222; height: 1.2em; }
.act-sign-line b { font-weight: 400; white-space: nowrap; }
.act-sign-caption { font-size: 9pt; color: #555; display: flex; justify-content: space-between; margin-top: 2px; }
@media (max-width: 640px) {
  .act-sheet { padding: 20px 16px; font-size: 11pt; }
  .act-signs { grid-template-columns: 1fr; gap: 24px; margin-top: 24px; }
  .act-sign-role { margin-bottom: 20px; min-height: 0; }
}
@media print {
  @page { size: A4; margin: 15mm; }
  html, body { background: #fff !important; padding: 0 !important; }
  .act-root { background: none; padding: 0; min-height: 0; }
  .act-toolbar { display: none !important; }
  .act-sheet { box-shadow: none; margin: 0; padding: 0; max-width: none; font-size: 12pt; }
  .act-sheet + .act-sheet { break-before: page; page-break-before: always; }
  .act-signs { grid-template-columns: 1fr 1fr; gap: 10mm; margin-top: 16mm; }
}
`

function ActCopy({ copy, order, partner, date }: { copy: string; order: Order; partner: User; date: string }) {
  const number = order.orderNumber.replace(/^#/, '')
  return (
    <section className="act-sheet">
      <div className="act-copy">{copy}</div>
      <h1 className="act-title">
        Акт приёма-передачи товара № {number} от {date}
      </h1>

      <p><b>Продавец:</b> {SELLER}.</p>
      <p>
        <b>От имени Продавца передаёт Партнёр (агент):</b> {partner.companyName || '—'}, ИНН {partner.inn || '—'}; пункт
        выдачи: {partner.pointAddress || '—'}.
      </p>
      <p><b>Покупатель:</b> {order.buyerName}</p>

      <p><b>Товар:</b></p>
      <table className="act-table">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Серийный номер / IMEI</th>
            <th className="num">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.productName}</td>
            <td>&nbsp;</td>
            <td className="num">{formatPrice(order.price)}</td>
          </tr>
        </tbody>
      </table>

      <p>Оплата получена Продавцом через СБП {order.paidAt ? formatDate(order.paidAt) : '—'}.</p>
      <p>
        Покупатель проверил внешний вид, комплектность и работоспособность Товара. Претензий нет / есть:{' '}
        <span className="act-blank">&nbsp;</span>
      </p>
      <p>
        <span className="act-blank" style={{ width: '100%' }}>&nbsp;</span>
      </p>
      <p>
        Право собственности на Товар и риск его случайной гибели или случайного повреждения перешли к Покупателю в момент
        передачи Товара по настоящему акту (п. 5.3 оферты купли-продажи).
      </p>
      <p>
        Гарантийный срок — 14 (четырнадцать) дней с момента передачи Товара; требования о недостатках — по статье 18 Закона
        РФ «О защите прав потребителей». Товар куплен дистанционным способом: Товар надлежащего качества Покупатель вправе
        вернуть в течение 7 (семи) дней после передачи, если нет следов использования, сохранены комплектация,
        потребительские свойства и настоящий акт (п. 4 ст. 26.1 Закона); деньги возвращаются тем же способом в течение
        10 (десяти) дней с даты требования за вычетом расходов на доставку возвращённого Товара. Товар для обмена или возврата передаётся в этот пункт выдачи. Претензии — help@techagent.pro,
        ответ в течение 10 (десяти) дней. Полные условия — в оферте купли-продажи: techagent.pro/legal/sale-offer.
      </p>

      <div className="act-signs">
        <div>
          <div className="act-sign-role">Покупатель</div>
          <div className="act-sign-line"><span /><b>/ {order.buyerName}</b></div>
          <div className="act-sign-caption"><i>подпись</i><i>ФИО</i></div>
        </div>
        <div>
          <div className="act-sign-role">Партнёр от имени ООО&nbsp;«ТехЭйджент»</div>
          <div className="act-sign-line"><span /><b>/</b><span /></div>
          <div className="act-sign-caption"><i>подпись</i><i>ФИО</i></div>
        </div>
      </div>
    </section>
  )
}

export default function ActPrintPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { pathname, search } = useLocation()
  const { user } = useAuth()
  useDataRevision()

  const order = user ? mockOrders.find((o) => o.id === id && o.userId === user.id) : undefined
  const printable =
    !!order && order.paymentStatus === 'PAID' && (order.status === 'AT_POINT' || order.status === 'ISSUED')
  const autoPrint = params.get('print') === '1'
  const number = printable ? order.orderNumber.replace(/^#/, '') : null

  /* Заголовок вкладки — это имя PDF при печати */
  useEffect(() => {
    if (number) document.title = `Акт приёма-передачи № ${number} | TechAgent`
  }, [number])

  useEffect(() => {
    if (!printable || !autoPrint) return
    const t = window.setTimeout(() => window.print(), 300)
    return () => window.clearTimeout(t)
  }, [printable, autoPrint])

  // После входа вернём сюда же
  if (!user || user.role !== 'CLIENT') return <Navigate to="/login" replace state={{ from: pathname + search }} />

  const back = order ? `/dashboard/orders/${order.id}` : '/dashboard/orders'

  if (!order || !printable) {
    return (
      <div className="act-root">
        <style>{css}</style>
        <div className="act-sheet" style={{ fontFamily: 'inherit' }}>
          <p>
            {!order
              ? 'Заказ не найден.'
              : 'Акт формируется по оплаченному заказу, когда товар принят в пункте выдачи.'}
          </p>
          <Link to={back} className="text-primary">Вернуться к заказу</Link>
        </div>
      </div>
    )
  }

  const date = formatDate(order.issuedAt ?? new Date().toISOString())

  return (
    <div className="act-root">
      <style>{css}</style>
      <div className="act-toolbar">
        <button
          type="button"
          onClick={() => window.print()}
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer"
        >
          Печать
        </button>
        <Link to={back} className="text-sm text-text-secondary no-underline hover:text-primary">
          Вернуться к заказу
        </Link>
      </div>
      {COPIES.map((copy) => (
        <ActCopy key={copy} copy={copy} order={order} partner={user} date={date} />
      ))}
    </div>
  )
}
