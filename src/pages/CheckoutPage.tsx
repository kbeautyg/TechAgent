import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CircleCheck, ShieldCheck } from 'lucide-react'
import { useCart, cartTotal, cartDelivery, clearCart, type CartItem } from '../utils/cart'
import { formatPrice } from '../utils/calculate'
import { formatPhone, phoneError, emailError } from '../utils/validate'
import { translateProductName } from '../utils/translate'
import { submitSiteOrder, type SiteOrderContacts } from '../data/siteOrders'
import ProductThumb from '../components/catalog/ProductThumb'
import CartSummary from '../components/catalog/CartSummary'
import { PageBar, StickyBar } from '../components/app/ui'
import { DELIVERY_TERM, SUPPORT_EMAIL, LEGAL_NAME } from '../seo/site'
import SdekPicker, { type SdekChoice } from '../components/catalog/SdekPicker'
import { useSdekConfig } from '../utils/sdek'
import { reachGoal } from '../lib/metrika'
import type { BuyerProfile } from '../lib/api'
import { useAccount } from '../utils/account'

const fieldCls =
  'w-full h-[52px] px-4 rounded-2xl border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none text-base lg:h-12 lg:rounded-xl'
const labelCls = 'block text-sm font-semibold mb-2 ml-1 text-text-secondary'
const errCls = 'text-red-600 text-[13px] mt-1.5 ml-1'
const hintCls = 'text-[13px] leading-snug text-text-muted mt-1.5 ml-1'

type Field = 'buyerName' | 'buyerPhone' | 'buyerEmail' | 'city' | 'sdekPoint' | 'offer' | 'pd'
type Errors = Partial<Record<Field, string>>

function validate(c: SiteOrderContacts, offer: boolean, pd: boolean, mapMode: boolean): Errors {
  const e: Errors = {}
  if (c.buyerName.trim().split(/\s+/).filter(Boolean).length < 2) e.buyerName = 'Укажите фамилию и имя получателя'
  const ph = phoneError(c.buyerPhone)
  if (ph) e.buyerPhone = ph
  const em = emailError(c.buyerEmail)
  if (em) e.buyerEmail = em
  if (!c.city.trim() && !mapMode) e.city = 'Укажите город'
  if (mapMode ? !c.sdekPointCode && !c.partnerPointCode : c.sdekPoint.trim().length < 5) e.sdekPoint = mapMode ? 'Выберите пункт СДЭК' : 'Укажите адрес пункта СДЭК или постамата'
  if (!offer) e.offer = 'Нужно принять условия оферты'
  if (!pd) e.pd = 'Нужно согласие на обработку персональных данных'
  return e
}

/** Оформление заказа с сайта: получатель, пункт СДЭК, согласия. Пока банк не подключён — заявка с последующей ссылкой на оплату */
export default function CheckoutPage() {
  const account = useAccount()
  // Вошедшему покупателю форма заполняется из профиля — ждём ответа сервера, чтобы не мигать пустыми полями
  if (!account.loaded) return <div className="min-h-[50vh]" aria-busy="true" />
  return <CheckoutForm buyer={account.role === 'buyer' && !account.buyer?.demo ? account.buyer : null} />
}

function CheckoutForm({ buyer }: { buyer: BuyerProfile | null }) {
  const items = useCart()
  const [form, setForm] = useState<SiteOrderContacts>({
    buyerName: buyer?.name ?? '', buyerPhone: buyer?.phone ?? '', buyerEmail: buyer?.email ?? '',
    city: buyer?.city ?? '', sdekPoint: buyer?.sdekPoint ?? '', comment: '',
  })
  const sdek = useSdekConfig()
  const mapMode = sdek.loaded && sdek.enabled
  const [choice, setChoice] = useState<SdekChoice | null>(null)
  const [offer, setOffer] = useState(false)
  const [pd, setPd] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState<false | 'demo' | true>(false)
  const [done, setDone] = useState<{ number: string; items: CartItem[]; total: number; email: string; phone: string; loggedIn: boolean; partner: boolean } | null>(null)

  if (done) return <Success {...done} />
  if (!items.length) return <Navigate to="/cart" replace />

  const set = (k: Exclude<keyof SiteOrderContacts, 'sdekCityCode' | 'sdekPointCode' | 'partnerPointCode'>) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k as Field]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = async (ev?: FormEvent) => {
    ev?.preventDefault()
    if (sending) return
    const c: SiteOrderContacts = mapMode
      ? {
          ...form, buyerPhone: formatPhone(form.buyerPhone),
          city: choice?.city ?? '', sdekPoint: choice?.point.address ?? '',
          ...(choice?.point.type === 'PARTNER'
            ? { partnerPointCode: choice.point.code }
            : { sdekCityCode: choice?.cityCode, sdekPointCode: choice?.point.code }),
        }
      : { ...form, buyerPhone: formatPhone(form.buyerPhone) }
    const e = validate(c, offer, pd, mapMode)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      const el = document.getElementById(`co-${first}`)
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      el?.focus({ preventScroll: true })
      return
    }
    setSending(true)
    setFailed(false)
    const res = await submitSiteOrder(items, c)
    setSending(false)
    if (!res.ok || !res.orderNumber) {
      setFailed(res.error === 'demo' ? 'demo' : true)
      return
    }
    reachGoal('site_order_submit')
    setDone({
      number: res.orderNumber, items, total: res.total ?? cartTotal(items), email: c.buyerEmail.trim(), phone: c.buyerPhone,
      partner: Boolean(c.partnerPointCode),
      loggedIn: Boolean(buyer && buyer.email === c.buyerEmail.trim().toLowerCase()),
    })
    clearCart()
    window.scrollTo(0, 0)
  }

  const input = (
    k: Exclude<keyof SiteOrderContacts, 'comment' | 'sdekCityCode' | 'sdekPointCode' | 'partnerPointCode'>,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
    hint?: string,
  ) => (
    <div>
      <label htmlFor={`co-${k}`} className={labelCls}>{label}</label>
      <input
        id={`co-${k}`}
        value={form[k]}
        onChange={(e) => set(k)(e.target.value)}
        className={`${fieldCls} ${errors[k] ? 'border-red-500/50' : 'border-border'}`}
        aria-invalid={errors[k] ? true : undefined}
        {...props}
      />
      {errors[k] ? <p className={errCls}>{errors[k]}</p> : hint ? <p className={hintCls}>{hint}</p> : null}
    </div>
  )

  return (
    <div className="cart-root">
      <PageBar back="/cart" backLabel="В корзину" title="Оформление заказа" />

      <form className="cart-layout" onSubmit={submit} noValidate>
        <div className="flex flex-col gap-4 lg:gap-5 min-w-0">
          <section className="co-card" aria-labelledby="co-h-delivery">
            <h2 id="co-h-delivery" className="co-title"><span>1</span>Доставка</h2>
            <p className="text-[14.5px] leading-relaxed text-text-secondary -mt-2 mb-0">
              {mapMode ? 'Выберите пункт выдачи на карте: синие — пункты партнёров TechAgent, зелёные — СДЭК.' : 'В пункт выдачи СДЭК или постамат.'} Срок — {DELIVERY_TERM}.
            </p>
            <div className="space-y-4 mt-4">
              {!sdek.loaded ? (
                <div className="sdek-map sdek-map-loading">Загружаем пункты СДЭК…</div>
              ) : mapMode ? (
                <>
                <SdekPicker
                  ymapsKey={sdek.ymapsKey}
                  value={choice}
                  onChange={(v) => { setChoice(v); if (v) setErrors((x) => ({ ...x, sdekPoint: undefined, city: undefined })) }}
                  invalid={Boolean(errors.sdekPoint)}
                  initialCity={buyer?.city ?? ''}
                />
                </>
              ) : (
                <>
                  {input('city', 'Город', { type: 'text', autoComplete: 'address-level2', placeholder: 'Москва' })}
                  <div>
                    <label htmlFor="co-sdekPoint" className={labelCls}>Адрес пункта СДЭК</label>
                    <input
                      id="co-sdekPoint"
                      value={form.sdekPoint}
                      onChange={(e) => set('sdekPoint')(e.target.value)}
                      className={`${fieldCls} ${errors.sdekPoint ? 'border-red-500/50' : 'border-border'}`}
                      aria-invalid={errors.sdekPoint ? true : undefined}
                      placeholder="ул. Ленина, 10 — или код пункта"
                      type="text"
                    />
                    {errors.sdekPoint && <p className={errCls}>{errors.sdekPoint}</p>}
                  </div>
                </>
              )}
              <div>
                <label htmlFor="co-comment" className={labelCls}>Комментарий <span className="font-normal text-text-muted">— необязательно</span></label>
                <textarea
                  id="co-comment"
                  value={form.comment}
                  onChange={(e) => set('comment')(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-2xl lg:rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none text-base resize-none"
                  placeholder="Например, удобное время для звонка"
                />
              </div>
            </div>
          </section>

          <section className="co-card" aria-labelledby="co-h-buyer">
            <h2 id="co-h-buyer" className="co-title"><span>2</span>Получатель</h2>
            <div className="space-y-4">
              {input('buyerName', 'Фамилия и имя', { type: 'text', autoComplete: 'name', autoCapitalize: 'words', placeholder: 'Иванов Иван' },
                'Как в паспорте — СДЭК выдаёт заказ по документу или коду из СМС.')}
              <div className="grid gap-4 sm:grid-cols-2">
                {input('buyerPhone', 'Телефон', {
                  type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '+7 900 000-00-00',
                  onBlur: () => setForm((f) => ({ ...f, buyerPhone: formatPhone(f.buyerPhone) })),
                })}
                {input('buyerEmail', 'Email', { type: 'email', inputMode: 'email', autoComplete: 'email', placeholder: 'name@mail.ru' },
                  'Сюда придёт ссылка на оплату.')}
              </div>
            </div>
          </section>

          <section className="co-card" aria-labelledby="co-h-pay">
            <h2 id="co-h-pay" className="co-title"><span>3</span>Оплата</h2>
            <div className="co-option" aria-hidden="true">
              <ShieldCheck size={22} className="text-primary flex-none" />
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-text-primary">СБП — Система быстрых платежей</div>
                <div className="text-[13px] text-text-muted">Деньги поступают напрямую продавцу — {LEGAL_NAME}</div>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-text-secondary mt-4 mb-0">
              Мы проверим наличие и пришлём ссылку на оплату на ваш email и телефон. Оплачиваете в приложении своего банка
              по ссылке или QR-коду.
            </p>
          </section>

          <section className="co-card" aria-label="Согласия">
            <label className="co-check">
              <input id="co-offer" type="checkbox" checked={offer} onChange={(e) => { setOffer(e.target.checked); setErrors((x) => ({ ...x, offer: undefined })) }} />
              <span>
                Принимаю условия{' '}
                <Link to="/legal/sale-offer" target="_blank" rel="noopener noreferrer" className="text-primary">публичной оферты купли-продажи</Link>{' '}
                и <Link to="/legal/payment" target="_blank" rel="noopener noreferrer" className="text-primary">условия оплаты и возврата</Link>
              </span>
            </label>
            {errors.offer && <p className={errCls}>{errors.offer}</p>}
            <label className="co-check mt-3">
              <input id="co-pd" type="checkbox" checked={pd} onChange={(e) => { setPd(e.target.checked); setErrors((x) => ({ ...x, pd: undefined })) }} />
              <span>
                Даю согласие на обработку персональных данных на условиях{' '}
                <Link to="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary">Политики конфиденциальности</Link>
              </span>
            </label>
            {errors.pd && <p className={errCls}>{errors.pd}</p>}
          </section>
        </div>

        <aside className="cart-aside">
          <ul className="co-items" aria-label="Состав заказа">
            {items.map(({ product, qty }) => (
              <li key={product.id}>
                <ProductThumb product={product} size={52} />
                <span className="co-items-name">{translateProductName(product.name)}{qty > 1 && <b> × {qty}</b>}</span>
                <span className="co-items-sum">{formatPrice(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <CartSummary items={items} delivery={choice?.point.type === 'PARTNER' ? 0 : undefined}>
            {failed && <SendError demo={failed === 'demo'} />}
            <button type="submit" disabled={sending} className="app-btn app-btn-primary mt-5 max-lg:hidden">
              {sending ? 'Отправляем…' : 'Оформить заказ'}
            </button>
          </CartSummary>
        </aside>
      </form>

      <StickyBar hint={failed ? undefined : 'Ссылку на оплату пришлём после проверки наличия'}>
        {failed && <SendError demo={failed === 'demo'} />}
        <button type="button" onClick={() => submit()} disabled={sending} className="app-btn app-btn-primary">
          {sending ? 'Отправляем…' : `Оформить заказ · ${formatPrice(cartTotal(items))}`}
        </button>
      </StickyBar>
    </div>
  )
}

function SendError({ demo }: { demo?: boolean }) {
  if (demo) {
    return (
      <p className="text-[13.5px] leading-snug text-red-600 mt-4 mb-0 max-lg:mt-0 max-lg:mb-2.5">
        Это демо-кабинет: заказ здесь не оформляется. Выйдите из демо, чтобы оформить настоящий заказ.
      </p>
    )
  }
  return (
    <p className="text-[13.5px] leading-snug text-red-600 mt-4 mb-0 max-lg:mt-0 max-lg:mb-2.5">
      Не удалось отправить заказ. Попробуйте ещё раз или напишите нам:{' '}
      <a href={`mailto:${SUPPORT_EMAIL}`} className="text-red-600 underline">{SUPPORT_EMAIL}</a>
    </p>
  )
}

function Success({ number, items, total, email, phone, loggedIn, partner }: { number: string; items: CartItem[]; total: number; email: string; phone: string; loggedIn: boolean; partner: boolean }) {
  const deliveryKnown = cartDelivery(items) !== null
  return (
    <div className="cart-root">
      <div className="co-success">
        <CircleCheck size={56} strokeWidth={1.5} className="text-success" />
        <h1 className="h-sans text-[26px] lg:text-[30px] font-extrabold tracking-tight text-text-primary m-0">Заказ оформлен</h1>
        <p className="text-text-muted text-[15px] m-0">Номер заказа — <b className="text-text-primary whitespace-nowrap">{number}</b></p>

        <ol className="co-next">
          <li><b>Проверим наличие</b> и подтвердим заказ.</li>
          <li><b>Пришлём ссылку на оплату</b> через СБП на {email} и {phone}.</li>
          <li><b>{partner ? 'Отправим в пункт выдачи' : 'Отправим в пункт СДЭК'}</b> — {DELIVERY_TERM}. {partner ? 'Напишем, когда заказ можно забрать.' : 'СДЭК сообщит, когда заказ можно забрать.'}</li>
        </ol>

        <div className="co-success-sum">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex justify-between gap-4">
              <span className="text-text-secondary">{translateProductName(product.name)}{qty > 1 ? ` × ${qty}` : ''}</span>
              <span className="text-text-primary font-semibold whitespace-nowrap">{formatPrice(product.price * qty)}</span>
            </div>
          ))}
          {deliveryKnown && (
            <div className="flex justify-between gap-4">
              <span className="text-text-secondary">{partner ? 'Доставка в пункт партнёра' : 'Доставка в пункт СДЭК'}</span>
              <span className="text-text-primary font-semibold whitespace-nowrap">{partner ? 'входит в цену' : cartDelivery(items) ? formatPrice(cartDelivery(items) ?? 0) : 'бесплатно'}</span>
            </div>
          )}
          <div className="flex justify-between gap-4 pt-2 mt-1 border-t border-border font-bold text-text-primary">
            <span>{deliveryKnown ? 'Итого' : 'Итого без доставки'}</span>
            <span className="whitespace-nowrap">{formatPrice(total)}</span>
          </div>
        </div>

        <p className="text-text-muted text-sm m-0">
          Вопросы по заказу — <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary no-underline hover:underline">{SUPPORT_EMAIL}</a>
        </p>
        <Link
          to={loggedIn ? `/account/orders/${number}` : `/login/buyer?email=${encodeURIComponent(email)}`}
          className="app-btn app-btn-primary max-w-[320px]"
        >
          Следить за заказом
        </Link>
        <Link to="/catalog" className="acc-link-btn">Вернуться в каталог</Link>
      </div>
    </div>
  )
}
