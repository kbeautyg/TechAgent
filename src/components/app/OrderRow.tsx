import { Link } from 'react-router-dom'
import ProductIcon from './ProductIcon'
import { formatPrice, formatDate, storageNote } from '../../utils/calculate'
import { orderStatusColor, orderStatusShort, orderStatusText } from '../../utils/status'
import type { Order } from '../../types'

/**
 * Строка заказа в ленте, как операция в банковском приложении:
 * слева иконка товара в цвете статуса, по центру товар и номер, справа цена и статус.
 */
export default function OrderRow({ order, sub }: { order: Order; sub?: string }) {
  const note = storageNote(order)
  const tile = orderStatusColor(order)
  return (
    <Link to={`/dashboard/orders/${order.id}`} className="app-row">
      <span className={`app-row-tile ${tile}`}>
        <ProductIcon productId={order.productId} size={22} />
      </span>
      <span className="app-row-mid">
        <span className="app-row-title">{order.productName}</span>
        <span className={`app-row-sub ${note?.expired ? 'text-red-600 font-medium' : ''}`}>
          {order.orderNumber} · {note ? note.text : sub ?? `${order.buyerName} · ${formatDate(order.createdAt)}`}
        </span>
      </span>
      <span className="app-row-right">
        <span className="app-row-sum">{formatPrice(order.price)}</span>
        <span className={`app-row-status ${orderStatusText(order)}`}>{orderStatusShort(order)}</span>
      </span>
    </Link>
  )
}
