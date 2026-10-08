import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  IconUserPlus, IconClipboardEdit, IconCreditCard, IconPackageCheck,
  IconSmartphone, IconFileCheck, IconTruck, IconCoins,
} from '../components/icons'

const steps = [
  {
    icon: <IconUserPlus size={22} />,
    title: 'Партнёр заполняет анкету',
    desc: 'Указываете наименование, ИНН, ОГРН или ОГРНИП, адрес пункта выдачи, контакты и банковские реквизиты для выплаты вознаграждения, принимаете агентский договор-оферту и даёте согласие на обработку персональных данных.',
  },
  {
    icon: <IconFileCheck size={22} />,
    title: 'ТехЭйджент проверяет данные',
    desc: 'До первого заказа ТехЭйджент проверяет анкету и при необходимости запрашивает документы. После подтверждения в кабинете открывается оформление заказов и виден размер вашего вознаграждения.',
  },
  {
    icon: <IconSmartphone size={22} />,
    title: 'Покупатель выбирает товар',
    desc: 'Покупатель приходит в вашу точку и выбирает товар из каталога TechAgent. Вы объясняете условия: продавец — ОсОО\u00A0«ТехЭйджент», цена — из каталога, оплата — через СБП продавцу.',
  },
  {
    icon: <IconClipboardEdit size={22} />,
    title: 'Партнёр оформляет заказ',
    desc: 'Выбираете товар в каталоге кабинета и вносите данные покупателя. Платформа формирует ссылку и QR-код на оплату — вы передаёте их покупателю.',
  },
  {
    icon: <IconCreditCard size={22} />,
    title: 'Покупатель платит продавцу',
    desc: 'Покупатель открывает страницу оплаты, отмечает согласие с офертой купли-продажи и на обработку персональных данных и платит через СБП напрямую ОсОО\u00A0«ТехЭйджент». После оплаты он видит подтверждение. Партнёр деньги не принимает.',
  },
  {
    icon: <IconCoins size={22} />,
    title: 'ТехЭйджент выкупает товар',
    desc: 'ТехЭйджент покупает товар у поставщика по контракту поставки и инвойсу и становится его собственником.',
  },
  {
    icon: <IconTruck size={22} />,
    title: 'Товар приходит в вашу точку',
    desc: 'ТехЭйджент доставляет товар в пункт выдачи за свой счёт — ориентировочно 5–7\u00A0рабочих дней с момента выкупа у поставщика. Вы проверяете упаковку и количество мест, отмечаете приёмку в кабинете и сообщаете покупателю о поступлении. Товар хранится в пункте 5 дней; до выдачи за его сохранность отвечаете вы.',
  },
  {
    icon: <IconPackageCheck size={22} />,
    title: 'Партнёр выдаёт товар',
    desc: 'Проверяете в кабинете, что оплата получена, сверяете данные покупателя с заказом и печатаете акт приёма-передачи в двух экземплярах. Покупатель проверяет товар и подписывает акт, вы подписываете его от имени ТехЭйджент, отдаёте покупателю его экземпляр, загружаете фото или скан в кабинет и отмечаете заказ выданным.',
  },
]

const documents = [
  { doc: 'Агентский договор-оферта', who: 'партнёр и ТехЭйджент' },
  { doc: 'Оферта купли-продажи', who: 'покупатель и ТехЭйджент' },
  { doc: 'Контракт поставки и инвойс', who: 'ТехЭйджент и поставщик' },
  { doc: 'Акт приёма-передачи', who: 'покупатель и партнёр от имени ТехЭйджент' },
  { doc: 'Отчёт агента и акт', who: 'раз в месяц, партнёр и ТехЭйджент' },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden pt-28 pb-12">
        <div className="absolute top-[-80px] right-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[40px] sm:text-[48px] font-extrabold mb-4 text-text-primary tracking-tight leading-[1.08]">
            Как это работает
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            От анкеты партнёра до выдачи товара покупателю
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <ol className="lg:col-span-2 flex flex-col gap-3 list-none m-0 p-0">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-bg-section rounded-2xl p-5 sm:p-6 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-extrabold shrink-0">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <h2 className="text-[17px] font-extrabold text-text-primary tracking-tight mb-1.5 flex items-center gap-2">
                    <span className="text-primary shrink-0">{s.icon}</span>
                    {s.title}
                  </h2>
                  <p className="text-[14.5px] text-text-secondary leading-relaxed m-0">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="bg-bg-section rounded-3xl p-6 border border-border">
              <h2 className="text-[16px] font-bold text-text-primary mb-3">Документы</h2>
              <div className="flex flex-col gap-3 text-[13px]">
                {documents.map((d) => (
                  <div key={d.doc}>
                    <div className="font-semibold text-text-primary">{d.doc}</div>
                    <div className="text-text-muted">{d.who}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bg-dark rounded-3xl p-6 text-white">
              <h2 className="text-[16px] font-bold mb-2">Вознаграждение партнёра</h2>
              <p className="text-[13.5px] text-white/60 leading-relaxed m-0">
                За каждый выданный заказ ТехЭйджент начисляет вознаграждение — процент от цены товара. Размер сообщаем
                после проверки анкеты. Начисляется после выдачи товара и загрузки подписанного акта. По итогам месяца
                в кабинете формируются отчёт агента и акт; выплата — на счёт из анкеты в течение 7 дней после их принятия.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-[16px] font-bold no-underline">
            Стать партнёром <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
