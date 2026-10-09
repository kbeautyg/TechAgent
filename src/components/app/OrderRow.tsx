import { Link } from 'react-router-dom'
import ProductIcon from './ProductIcon'
import { formatPrice, formatDate, storageNote } from '../../utils/calculate'
import { orderStatusBar, orderStatusShort } from '../../utils/status'
import StatusMark from './StatusMark'
import type { Order } from '../../types'

/**
 * Строка заказа в ленте, как операция в банковском приложении:
 * слева иконка товара в цвете статуса, по центру товар и номер, справа цена и статус.
 */
export default function OrderRow({ order, sub }: { order: Order; sub?: string }) {
  const note = storageNote(order)
  return (
    <Link to={`/dashboard/orders/${order.id}`} className="app-row">
      <span className="app-row-tile text-text-secondary">
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
        <span className="app-row-status"><StatusMark size="sm" color={orderStatusBar(order)}>{orderStatusShort(order)}</StatusMark></span>
      </span>
    </Link>
  )
}
