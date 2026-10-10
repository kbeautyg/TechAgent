/*
 * Тексты писем. Каждая функция возвращает [тема, текст].
 * Сроки и условия — те же, что в оферте купли-продажи (techagent.pro/legal/sale-offer), других не обещаем.
 */

const rub = (n) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
const SIGN = '\n\n—\nTechAgent · продавец ООО «ТехЭйджент»\nВопросы по заказу: help@techagent.pro'

function itemsBlock(o) {
  const lines = o.items.map((i) => `— ${i.name}${i.qty > 1 ? ` × ${i.qty}` : ''}: ${rub(i.price * i.qty)}`)
  const deliv = o.pickupType === 'PARTNER' ? '— Доставка в пункт выдачи партнёра: входит в цену' : `— Доставка в пункт СДЭК: ${rub(o.delivery)}`
  return [...lines, deliv, `Итого: ${rub(o.total)}`].join('\n')
}

export function orderCreated(o, site, cabinetLink) {
  return [
    `Заказ ${o.number} принят`,
    `Здравствуйте, ${o.buyerName.split(/\s+/)[1] || o.buyerName}!

Мы получили ваш заказ ${o.number}:

${itemsBlock(o)}

Пункт выдачи: ${o.city}, ${o.sdekPoint}

Что дальше: проверим наличие и пришлём ссылку на оплату через СБП. После оплаты отправим заказ в пункт выдачи — не позднее 14 дней с даты оплаты.

Ваш кабинет покупателя уже создан — там видно, на каком этапе заказ, ссылка на оплату и трек-номер.
Открыть заказ в кабинете (вход без пароля): ${cabinetLink}

На другом устройстве войдите на ${site}/login/buyer с этим email — пришлём код.${SIGN}`,
  ]
}

export function staffNewOrder(o, site) {
  return [
    `Новый заказ ${o.number} — ${rub(o.total)}`,
    `Заказ с сайта ${o.number}

${itemsBlock(o)}

Получатель: ${o.buyerName}
Телефон: ${o.phone}
Email: ${o.email}
Пункт выдачи: ${o.city}, ${o.sdekPoint}${o.comment ? `\nКомментарий: ${o.comment}` : ''}

Проверить наличие и отправить ссылку на оплату: ${site}/staff/orders/${o.number}`,
  ]
}

export function loginCode(code) {
  return [
    "Код для входа в кабинет TechAgent",
    `Ваш код для входа в кабинет покупателя TechAgent: ${code}

Код действует 15 минут. Если вы не запрашивали код, просто проигнорируйте это письмо.${SIGN}`,
  ]
}

/** Письмо покупателю о новом этапе заказа. null — об этом этапе не пишем */
export function statusChanged(o, site, cabinetLink) {
  const link = `\n\nОткрыть заказ в кабинете (вход без пароля): ${cabinetLink || `${site}/account/orders/${o.number}`}`
  switch (o.status) {
    case 'AWAITING_PAYMENT':
      return [
        `Заказ ${o.number}: можно оплатить`,
        `Товар в наличии — заказ ${o.number} можно оплатить.

${itemsBlock(o)}

Оплатить через СБП: ${o.paymentUrl}

Деньги поступают напрямую продавцу — ООО «ТехЭйджент». После оплаты отправим заказ в пункт выдачи не позднее 14 дней.${link}${SIGN}`,
      ]
    case 'PAID':
      return [
        `Заказ ${o.number}: оплата получена`,
        `Оплата по заказу ${o.number} получена — ${rub(o.total)}. Готовим отправку в пункт выдачи: ${o.city}, ${o.sdekPoint}.${link}${SIGN}`,
      ]
    case 'SHIPPED':
      return [
        `Заказ ${o.number} отправлен`,
        o.pickupType === 'PARTNER'
          ? `Заказ ${o.number} отправлен в пункт выдачи партнёра TechAgent: ${o.city}, ${o.sdekPoint}.

Трек-номер: ${o.trackNumber}

Когда заказ прибудет, мы напишем вам.${link}${SIGN}`
          : `Заказ ${o.number} передан в СДЭК.

Трек-номер: ${o.trackNumber}
Отследить: https://www.cdek.ru/ru/tracking?order_id=${encodeURIComponent(o.trackNumber)}
Пункт СДЭК: ${o.city}, ${o.sdekPoint}

Когда заказ прибудет, СДЭК пришлёт уведомление.${link}${SIGN}`,
      ]
    case 'READY':
      return [
        `Заказ ${o.number} можно забирать`,
        o.pickupType === 'PARTNER'
          ? `Заказ ${o.number} ждёт вас в пункте выдачи партнёра TechAgent: ${o.city}, ${o.sdekPoint}.

Назовите номер заказа и возьмите документ, удостоверяющий личность. При получении проверьте товар и подпишите акт приёма-передачи. Заказ хранится 5 дней.${link}${SIGN}`
          : `Заказ ${o.number} ждёт вас в пункте СДЭК: ${o.city}, ${o.sdekPoint}.

Возьмите документ, удостоверяющий личность, или код из СМС от СДЭК. Срок хранения — по правилам СДЭК.${link}${SIGN}`,
      ]
    case 'RECEIVED':
      return [
        `Заказ ${o.number} получен`,
        `Спасибо за покупку! Заказ ${o.number} получен.

Гарантия — 14 дней. Исправный товар можно вернуть в течение 7 дней, если нет следов использования и сохранена комплектация; при недостатке — по статье 18 Закона «О защите прав потребителей». Для возврата напишите на help@techagent.pro.${link}${SIGN}`,
      ]
    case 'CANCELLED':
      return [
        `Заказ ${o.number} отменён`,
        `Заказ ${o.number} отменён.${o.cancelReason ? `\nПричина: ${o.cancelReason}` : ''}

Если вы уже оплатили заказ, деньги вернутся тем же способом в течение 10 дней.${link}${SIGN}`,
      ]
    default:
      return null
  }
}
