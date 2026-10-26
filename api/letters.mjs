/*
 * Тексты писем. Каждая функция возвращает [тема, текст].
 * Сроки и условия — те же, что в оферте купли-продажи (techagent.pro/legal/sale-offer), других не обещаем.
 */

const rub = (n) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
const SIGN = '\n\n—\nTechAgent · продавец ООО «ТехЭйджент»\nВопросы по заказу: help@techagent.pro'

/** Пункт выдачи одной строкой: у заказа партнёра без точки на карте города нет — только адрес пункта */
const where = (o) => [o.city, o.sdekPoint].filter(Boolean).join(', ')

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

Пункт выдачи: ${where(o)}

Что дальше: проверим наличие и пришлём ссылку на оплату через СБП. После оплаты отправим заказ в пункт выдачи — не позднее 14 дней с даты оплаты.

Ваш кабинет покупателя уже создан — там видно, на каком этапе заказ, ссылка на оплату и трек-номер.
Открыть заказ в кабинете (вход без пароля): ${cabinetLink}

На другом устройстве войдите на ${site}/login/buyer с этим email — пришлём код.${SIGN}`,
  ]
}

export function staffNewOrder(o, site) {
  return [
    `Новый заказ ${o.number} — ${rub(o.total)}`,
    `${o.source === 'PARTNER' ? 'Заказ партнёра' : 'Заказ с сайта'} ${o.number}

${itemsBlock(o)}

${o.partner ? `Оформил партнёр: ${o.partner.companyName} (${o.partner.email}, ${o.partner.phone})\n` : ''}Получатель: ${o.buyerName}
Телефон: ${o.phone}
Email: ${o.email || 'не указан'}
Пункт выдачи: ${where(o)}${o.comment ? `\nКомментарий: ${o.comment}` : ''}

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

После оплаты отправим заказ в пункт выдачи не позднее 14 дней.${link}${SIGN}`,
      ]
    case 'PAID':
      return [
        `Заказ ${o.number}: оплата получена`,
        `Оплата по заказу ${o.number} получена — ${rub(o.total)}. Готовим отправку в пункт выдачи: ${where(o)}.${link}${SIGN}`,
      ]
    case 'SHIPPED':
      return [
        `Заказ ${o.number} отправлен`,
        o.pickupType === 'PARTNER'
          ? `Заказ ${o.number} отправлен в пункт выдачи партнёра TechAgent: ${where(o)}.
${o.trackNumber ? `\nТрек-номер: ${o.trackNumber}\n` : ''}
Когда заказ прибудет, мы напишем вам.${link}${SIGN}`
          : `Заказ ${o.number} передан в СДЭК.

Трек-номер: ${o.trackNumber}
Отследить: https://www.cdek.ru/ru/tracking?order_id=${encodeURIComponent(o.trackNumber)}
Пункт СДЭК: ${where(o)}

Когда заказ прибудет, СДЭК пришлёт уведомление.${link}${SIGN}`,
      ]
    case 'READY':
      return [
        `Заказ ${o.number} можно забирать`,
        o.pickupType === 'PARTNER'
          ? `Заказ ${o.number} ждёт вас в пункте выдачи партнёра TechAgent: ${where(o)}.

Назовите номер заказа и возьмите документ, удостоверяющий личность. При получении проверьте товар и подпишите акт приёма-передачи. Заказ хранится 5 дней.${link}${SIGN}`
          : `Заказ ${o.number} ждёт вас в пункте СДЭК: ${where(o)}.

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

/* ── Партнёры: заявка, доступ в кабинет, отказ ── */

const PSIGN = '\n\n—\nTechAgent · ООО «ТехЭйджент»\nВопросы партнёров: partners@techagent.pro'

/** Заявка партнёра — сотрудникам ТехЭйджент */
export function staffNewApplication(a, site) {
  return [
    `Заявка партнёра: ${a.companyName}`,
    `Новая заявка партнёра с сайта techagent.pro

Наименование: ${a.companyName}
ИНН: ${a.inn}
ОГРН / ОГРНИП: ${a.ogrn}
Адрес пункта выдачи: ${a.pointAddress}
Контактное лицо: ${a.contactName}
Телефон: ${a.phone}
Email: ${a.email}
Банк: ${a.bankName}
БИК: ${a.bik}
Расчётный счёт: ${a.account}${a.comment ? `\nКомментарий: ${a.comment}` : ''}

Что дальше: проверить данные, при необходимости запросить документы (оферта, п. 4.2), затем одобрить или отклонить заявку: ${site}/staff/partners
После одобрения партнёру автоматически уйдёт письмо с адресом входа и временным паролем.`,
  ]
}

/** Заявителю — заявка получена */
export function applicationReceived(a) {
  return [
    'Заявка партнёра TechAgent получена',
    `Здравствуйте!

Мы получили заявку «${a.companyName}» на подключение пункта выдачи TechAgent. Проверим данные и ответим на этот адрес. Если понадобятся документы (оферта, п. 4.2), напишем отдельно.

Условия работы — в агентском договоре-оферте: techagent.pro/legal/offer${PSIGN}`,
  ]
}

/** Партнёру — доступ в кабинет. Договор он заключает сам: отметкой о согласии с офертой при первом входе (п. 2.1) */
export function partnerAccess(p, password, site, again = false) {
  return [
    again ? 'Новый временный пароль от кабинета TechAgent' : 'Доступ в кабинет партнёра TechAgent',
    `Здравствуйте${p.contactName ? `, ${p.contactName.split(/\s+/)[1] || p.contactName}` : ''}!

${again
    ? 'По вашей просьбе мы выдали новый временный пароль от кабинета партнёра TechAgent.'
    : `ТехЭйджент проверил заявку «${p.companyName}» и открыл вам доступ в кабинет партнёра TechAgent.`}

Вход: ${site}/login/partner
Email: ${p.email}
Временный пароль: ${password}

При входе задайте свой пароль.${again ? '' : ` Затем ознакомьтесь с агентским договором-офертой (${site}/legal/offer) и отметьте согласие с ним — с этой отметки договор считается заключённым (оферта, п. 2.1, 2.2). Без неё кабинет не откроется.`}

Войти можно с любого устройства — компьютера или телефона.${PSIGN}`,
  ]
}

/** Заявителю — заявка отклонена */
export function applicationDeclined(a, reason) {
  return [
    'Заявка партнёра TechAgent не одобрена',
    `Здравствуйте!

Мы рассмотрели заявку «${a.companyName}» и пока не можем подключить пункт выдачи.${reason ? `\nПричина: ${reason}` : ''}

Если данные изменились или есть вопросы, ответьте на это письмо.${PSIGN}`,
  ]
}

/* ── Заказы в пунктах партнёров ── */

/** Покупателю — заказ оформил партнёр. Ссылка ведёт на страницу оплаты: там согласия и переход к оплате СБП */
export function partnerOrderCreated(o, site, payLink, cabinetLink) {
  return [
    `Заказ ${o.number} оформлен`,
    `Здравствуйте, ${o.buyerName.split(/\s+/)[1] || o.buyerName}!

По вашей просьбе партнёр TechAgent оформил заказ ${o.number}. Продавец — ООО «ТехЭйджент».

${itemsBlock(o)}

Пункт выдачи: ${where(o)}

Оплата — только ТехЭйджент через СБП, по ссылке: ${payLink}
На странице оплаты отметьте согласие с офертой купли-продажи (${site}/legal/sale-offer). Когда ТехЭйджент подтвердит наличие товара, там же появится кнопка оплаты. Не передавайте деньги за товар в пункте выдачи.

После оплаты доставим заказ в пункт выдачи не позднее 14 дней. Когда он прибудет, мы напишем вам.

Заказ в кабинете покупателя (вход без пароля): ${cabinetLink}${SIGN}`,
  ]
}

/** Партнёру — покупатель выбрал его пункт, оформляя заказ на сайте. Принять и выдать — в кабинете */
export function partnerSiteOrder(o, site) {
  return [
    `Заказ ${o.number} в ваш пункт выдачи`,
    `Покупатель оформил на сайте заказ ${o.number} с получением в вашем пункте выдачи.

${itemsBlock(o)}

Покупатель: ${o.buyerName}, ${o.phone}

Сейчас от вас ничего не нужно: ТехЭйджент подтвердит наличие, покупатель оплатит, и товар приедет к вам. Когда он прибудет, примите его в кабинете: ${site}/dashboard/orders/${o.number}
Заказ оформлен покупателем на сайте, поэтому вознаграждение по нему не начисляется (агентский договор-оферта, «Заказ»).${PSIGN}`,
  ]
}

/** Партнёру — этап заказа, который двигает ТехЭйджент. null — об этом этапе партнёру не пишем */
export function partnerStatus(o, site) {
  const link = `\n\nЗаказ в кабинете: ${site}/dashboard/orders/${o.number}`
  switch (o.status) {
    case 'AWAITING_PAYMENT':
      return o.source === 'PARTNER' ? [
        `Заказ ${o.number}: покупатель может оплатить`,
        `Товар по заказу ${o.number} в наличии — покупатель ${o.buyerName} может оплатить его по ссылке: ${o.paymentUrl}
Если покупатель не оставлял email, отправьте ему эту ссылку сами.${link}${PSIGN}`,
      ] : null
    case 'PAID':
      return [
        `Заказ ${o.number} оплачен`,
        `Покупатель ${o.buyerName} оплатил заказ ${o.number}. ТехЭйджент доставит товар в ваш пункт выдачи — когда он прибудет, примите его в кабинете.${link}${PSIGN}`,
      ]
    case 'SHIPPED':
      return [
        `Заказ ${o.number} едет в ваш пункт`,
        `Товар по заказу ${o.number} отправлен в ваш пункт выдачи${o.trackNumber ? `, трек-номер ${o.trackNumber}` : ''}. Когда он прибудет, проверьте упаковку и количество мест и примите товар в кабинете.${link}${PSIGN}`,
      ]
    case 'CANCELLED':
      return [
        `Заказ ${o.number} отменён`,
        `ТехЭйджент отменил заказ ${o.number}.${o.cancelReason ? `\nПричина: ${o.cancelReason}` : ''}${o.receivedAt ? '\nЕсли товар уже у вас, храните его до указания ТехЭйджент (оферта, п. 8.3).' : ''}${link}${PSIGN}`,
      ]
    default:
      return null
  }
}

/** Сотрудникам — партнёр принял товар с замечанием */
export function staffAcceptIssue(o, company, site) {
  return [
    `Заказ ${o.number}: замечание при приёмке`,
    `Партнёр ${company} принял товар по заказу ${o.number} с замечанием:
${o.receivedIssue}

Фото — в заказе: ${site}/staff/orders/${o.number}`,
  ]
}

/** Сотрудникам — обращение покупателя, принятое в пункте выдачи */
export function staffClaim(o, company, typeLabel, text, site) {
  return [
    `Заказ ${o.number}: обращение покупателя (${typeLabel.toLowerCase()})`,
    `Партнёр ${company} передал обращение покупателя по заказу ${o.number}.

Тип: ${typeLabel}
${text}

Покупатель: ${o.buyerName}, ${o.phone}${o.email ? `, ${o.email}` : ''}
Заказ: ${site}/staff/orders/${o.number}`,
  ]
}

/* ── Расчёты с партнёром ── */

const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
const periodLabel = (p) => `${MONTHS[Number(p.slice(5, 7)) - 1]} ${p.slice(0, 4)}`
const ruDate = (iso) => new Date(iso).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' })

/** Партнёру — сформированы отчёт агента и акт за месяц: принять или возразить в кабинете (п. 7.5) */
export function partnerReport(r, site) {
  return [
    `Отчёт агента и акт за ${periodLabel(r.period)}`,
    `ТехЭйджент сформировал отчёт агента и акт № ${r.number} за ${periodLabel(r.period)}.

Выдано заказов: ${r.form.rows.length}
Сумма товаров: ${rub(r.form.goodsTotal)}
Вознаграждение к выплате: ${rub(r.payable)}

Проверьте документы и примите их или направьте возражения в кабинете: ${site}/dashboard/documents
Возражения принимаются 10 рабочих дней с даты формирования; без возражений документы считаются принятыми (оферта, п. 7.5). Вознаграждение выплачивается на счёт из анкеты в течение 7 дней после принятия (п. 7.6).${PSIGN}`,
  ]
}

/** Партнёру — вознаграждение выплачено */
export function partnerPaid(r, site) {
  return [
    `Вознаграждение за ${periodLabel(r.period)} выплачено`,
    `ТехЭйджент выплатил вознаграждение по отчёту агента и акту № ${r.number} за ${periodLabel(r.period)}: ${rub(r.paid.amount)}, ${ruDate(r.paid.at)}.${r.paid.note ? `\n${r.paid.note}` : ''}

Документы — в кабинете: ${site}/dashboard/documents${PSIGN}`,
  ]
}

/** Сотрудникам — возражения партнёра по отчёту */
export function staffObjection(r, company, text, site) {
  return [
    `Возражения по отчёту ${r.number}: ${company}`,
    `Партнёр ${company} направил возражения по отчёту агента и акту № ${r.number} за ${periodLabel(r.period)}:

${text}

Разобраться и при необходимости отозвать отчёт и сформировать заново: ${site}/staff/reports`,
  ]
}

/** Партнёру — новый процент вознаграждения: с даты, не раньше чем через 14 дней (оферта, п. 7.1) */
export function partnerPercent(p, site) {
  return [
    'Новый размер вознаграждения TechAgent',
    `ТехЭйджент изменил размер вознаграждения: ${String(p.rewardPercentNext).replace('.', ',')} % от цены товара для заказов, оформленных с ${ruDate(p.rewardPercentNextFrom)}. До этой даты действует прежний размер — ${String(p.rewardPercent).replace('.', ',')} % (оферта, п. 7.1).

Кабинет: ${site}/dashboard${PSIGN}`,
  ]
}
