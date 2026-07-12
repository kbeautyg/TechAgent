import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { mockOrders, mockUsers, saveOrders } from '../data/mock'
import { formatPrice, formatDateTime } from '../utils/calculate'
import { Icon } from '../lib/techagent'

// Условия приёма оплаты (уведомление для клиента)
const paymentNoticePoints = [
  'Продавцом товара, который вы приобретаете, является партнёр платформы TechAgent (далее — «Партнёр»), у которого вы делаете покупку. Именно Партнёр является стороной сделки купли-продажи товара с вами.',
  'TechAgent выступает техническим агентом Партнёра: принимает оплату по поручению Партнёра и организует закупку товара за рубежом в интересах Партнёра.',
  'TechAgent не является продавцом товара, не устанавливает его цену и не несёт ответственности за качество, комплектность, соответствие заявленным характеристикам, сроки и условия доставки товара.',
  'По всем вопросам, связанным с товаром — гарантией, обменом, возвратом, качеством, комплектацией, кассовым чеком, — вы обращаетесь непосредственно к Партнёру, у которого приобрели товар.',
  'Оплата, произведённая вами через данную страницу, засчитывается в счёт расчётов по вашей сделке с Партнёром.',
  'Обработка ваших персональных данных, указанных при оплате, осуществляется в соответствии с Политикой обработки персональных данных, размещённой на сайте techagent.pro.',
]

const card: React.CSSProperties = { background: '#fff', border: '1px solid #E7E9F2', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 50px rgba(11,16,32,.08)' }

export default function PaymentPage() {
  const { paymentId } = useParams()
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const order = mockOrders.find((o) => o.paymentId === paymentId)

  if (!order) {
    return (
      <section>
        <div style={{ maxWidth: 440, margin: '0 auto', padding: 'clamp(60px,10vw,120px) clamp(16px,4vw,40px)', textAlign: 'center' }}>
          <div style={card as object}>
            <div style={{ padding: '40px 24px' }}>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Заказ не найден</div>
              <div style={{ fontSize: 14, color: '#8891A5' }}>Ссылка на оплату устарела или введена неверно.</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const seller = mockUsers.find((u) => u.id === order.userId)
  const amountToPay = order.isTradeIn ? (order.clientPayment || 0) : order.totalCost
  const alreadyPaid = order.paymentStatus === 'PAID'

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      order.paymentStatus = 'PAID'
      order.paidAt = new Date().toISOString()
      order.status = 'PAID'
      saveOrders()
      setPaying(false)
      setPaid(true)
    }, 1800)
  }

  if (alreadyPaid || paid) {
    return (
      <section>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: 'clamp(24px,4vw,52px) clamp(16px,4vw,40px)' }}>
          <div style={card as object}>
            <div style={{ textAlign: 'center', padding: '40px 30px 28px', background: 'linear-gradient(135deg,#0B7A55,#12B981)', color: '#fff' }}>
              <div style={{ width: 66, height: 66, margin: '0 auto 18px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'grid', placeItems: 'center' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5 11-11" /></svg>
              </div>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,28px)', letterSpacing: '-.02em', marginBottom: 6 }}>Оплачено</div>
              <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,.9)' }}>{formatPrice(amountToPay)} · {order.orderNumber}</div>
            </div>
            <div style={{ padding: '26px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14 }}><span style={{ color: '#8891A5' }}>Дата оплаты</span><span style={{ fontWeight: 500 }}>{formatDateTime(order.paidAt || new Date().toISOString())}</span></div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '13px 15px', background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 13, marginTop: 14 }}>
                <Icon name="box" size={19} color="#1B44F5" />
                <div style={{ fontSize: 13.5, color: '#3A4256', lineHeight: 1.5 }}>
                  Товар будет готов к выдаче через 5–7 дней. Забрать можно в магазине: <b>{seller?.companyName}</b>
                  {seller?.phone && <><br />{seller.phone}</>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: 'clamp(24px,4vw,52px) clamp(16px,4vw,40px)' }}>
        <div style={card as object}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '20px 24px', background: '#0B1020', color: '#fff' }}>
            <div>
              <div style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 16 }}>Оплата заказа</div>
              <div style={{ font: "500 12px/1 'JetBrains Mono',monospace", color: '#8FA9FF', marginTop: 5 }}>{order.orderNumber}</div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#5B34E8,#E8348C)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '8px 12px', borderRadius: 10 }}>СБП</span>
          </div>

          <div style={{ padding: 24 }}>
            <div style={{ fontSize: 13, color: '#8891A5', marginBottom: 4 }}>Товар</div>
            <div style={{ fontWeight: 600, fontSize: 15.5, marginBottom: 18 }}>{order.productName}</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14 }}><span style={{ color: '#5B647A' }}>Стоимость товара</span><span style={{ fontWeight: 500 }}>{formatPrice(order.productCost)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14 }}><span style={{ color: '#5B647A' }}>Услуга выкупа</span><span style={{ fontWeight: 500 }}>{formatPrice(order.commission)}</span></div>
            {order.isTradeIn && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14 }}><span style={{ color: '#5B647A' }}>Trade-in ({order.oldProduct})</span><span style={{ fontWeight: 500, color: '#0B7A55' }}>−{formatPrice(order.oldValue || 0)}</span></div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: '1px dashed #E0E3EE', marginTop: 6, paddingTop: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 14, color: '#5B647A' }}>К оплате</span>
              <span style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,30px)', letterSpacing: '-.02em' }}>{formatPrice(amountToPay)}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', padding: 18, background: '#F7F8FC', border: '1px solid #EEF0F6', borderRadius: 16, marginBottom: 18 }}>
              <div style={{ width: 104, height: 104, flex: 'none', background: '#fff', border: '1px solid #E7E9F2', borderRadius: 14, padding: 8, display: 'grid', placeItems: 'center' }}><QRCodeSVG value={typeof window !== 'undefined' ? `${window.location.origin}/pay/${order.paymentId}` : order.paymentId} size={88} /></div>
              <div style={{ flex: '1 1 180px', minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 5 }}>Отсканируйте QR</div>
                <div style={{ fontSize: 13, color: '#8891A5', lineHeight: 1.5, marginBottom: 8 }}>Камерой или в приложении банка — оплата по СБП за пару секунд.</div>
                <div style={{ fontSize: 12.5 }}>Магазин: <b>{seller?.companyName}</b>{seller?.phone && ` · ${seller.phone}`}</div>
              </div>
            </div>

            <div style={{ border: '1px solid #E7E9F2', borderRadius: 14, padding: 16, marginBottom: 16, background: '#F7F8FC' }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 5 }}>Уведомление об условиях приёма оплаты</div>
              <p style={{ fontSize: 12, color: '#8891A5', margin: '0 0 10px', lineHeight: 1.5 }}>Оплачивая заказ через данную страницу, вы подтверждаете, что ознакомлены и согласны со следующим:</p>
              <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#5B647A', lineHeight: 1.6, maxHeight: 160, overflowY: 'auto' }}>
                {paymentNoticePoints.map((point, i) => (<li key={i} style={{ marginBottom: 6 }}>{point}</li>))}
              </ol>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 18, cursor: 'pointer' }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: 3, accentColor: '#1B44F5', flex: 'none' }} />
              <span style={{ fontSize: 13.5, color: '#3A4256' }}>Я ознакомлен(а) и согласен(на) с условиями приёма платежа</span>
            </label>

            <button onClick={handlePay} disabled={paying || !agreed} className="ta-btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#1B44F5', color: '#fff', border: 'none', borderRadius: 13, padding: 16, fontWeight: 600, fontSize: 16, boxShadow: '0 10px 24px rgba(27,68,245,.28)', opacity: (paying || !agreed) ? 0.55 : 1, cursor: (paying || !agreed) ? 'not-allowed' : 'pointer' }}>
              {paying ? 'Проводим платёж…' : `Оплатить ${formatPrice(amountToPay)}`}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 14, fontSize: 12.5, color: '#8891A5' }}>
              <Icon name="shield" size={14} color="#12B981" />Платёж защищён · чек придёт автоматически
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
