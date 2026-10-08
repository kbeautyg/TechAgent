import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    title: 'Партнёр оставляет заявку',
    desc: 'Указываете наименование, ИНН, ОГРН или ОГРНИП, адрес пункта выдачи, контакты и банковские реквизиты для выплаты вознаграждения и даёте согласие на обработку персональных данных.',
  },
  {
    title: 'ТехЭйджент открывает доступ',
    desc: 'ТехЭйджент проверяет заявку, при необходимости запрашивает документы и присылает на ваш email данные для входа в кабинет. При первом входе вы задаёте свой пароль и принимаете агентский договор-оферту — в кабинете виден размер вашего вознаграждения.',
  },
  {
    title: 'Покупатель выбирает товар',
    desc: 'Покупатель приходит в вашу точку и выбирает товар из каталога TechAgent. Вы объясняете условия: продавец — ОсОО\u00A0«ТехЭйджент», цена — из каталога, оплата — через СБП продавцу.',
  },
  {
    title: 'Партнёр оформляет заказ',
    desc: 'Выбираете товар в каталоге кабинета и вносите данные покупателя. Платформа формирует ссылку и QR-код на оплату — вы передаёте их покупателю.',
  },
  {
    title: 'Покупатель платит продавцу',
    desc: 'Покупатель открывает страницу оплаты, отмечает согласие с офертой купли-продажи и на обработку персональных данных и платит через СБП напрямую ОсОО\u00A0«ТехЭйджент». После оплаты он видит подтверждение. Партнёр деньги не принимает.',
  },
  {
    title: 'Товар приходит в вашу точку',
    desc: 'ТехЭйджент доставляет товар в пункт выдачи за свой счёт — не позднее 14\u00A0дней с даты оплаты. Вы проверяете упаковку и количество мест, отмечаете приёмку в кабинете и сообщаете покупателю о поступлении. Товар хранится в пункте 5 дней; до выдачи за его сохранность отвечаете вы.',
  },
  {
    title: 'Партнёр выдаёт товар',
    desc: 'Проверяете в кабинете, что оплата получена, сверяете данные покупателя с заказом и печатаете акт приёма-передачи в двух экземплярах. Покупатель проверяет товар и подписывает акт, вы подписываете его от имени ТехЭйджент, отдаёте покупателю его экземпляр, загружаете фото или скан в кабинет и отмечаете заказ выданным.',
  },
]

const documents = [
  { doc: 'Агентский договор-оферта', who: 'партнёр и ТехЭйджент' },
  { doc: 'Оферта купли-продажи', who: 'покупатель и ТехЭйджент' },
  { doc: 'Акт приёма-передачи', who: 'покупатель и партнёр от имени ТехЭйджент' },
  { doc: 'Отчёт агента и акт', who: 'раз в месяц, партнёр и ТехЭйджент' },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden pt-8 sm:pt-28 pb-8 sm:pb-12">
        <div className="absolute top-[-80px] right-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left sm:text-center">
          <h1 className="text-[28px] sm:text-[48px] [text-wrap:balance] font-extrabold mb-3 sm:mb-4 text-text-primary tracking-tight leading-[1.1]">
            Как это работает
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl sm:mx-auto">
            От заявки партнёра до выдачи товара покупателю
          </p>
        </div>
      </section>

      <section className="pt-4 sm:pt-0 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Шаги: крупный приглушённый номер сбоку, заголовок и текст рядом — как на главной */}
          <ol className="lg:col-span-2 flex flex-col gap-7 sm:gap-9 list-none m-0 p-0">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 sm:gap-6">
                <span className="font-display text-[40px] sm:text-[52px] font-extrabold leading-none text-primary/25 w-9 sm:w-12 shrink-0 text-center">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h2 className="h-sans text-[18px] sm:text-[20px] font-bold text-text-primary tracking-tight leading-snug mb-1">
                    {s.title}
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed m-0">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="bg-bg-section rounded-[24px] sm:rounded-3xl p-5 sm:p-6 border border-border">
              <h2 className="h-sans text-lg font-bold text-text-primary mb-3">Документы</h2>
              <div className="flex flex-col gap-3 text-[15px] leading-snug">
                {documents.map((d) => (
                  <div key={d.doc}>
                    <div className="font-semibold text-text-primary">{d.doc}</div>
                    <div className="text-text-muted">{d.who}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bg-dark rounded-[24px] sm:rounded-3xl p-5 sm:p-6 text-white">
              <h2 className="h-sans text-lg font-bold mb-2">Вознаграждение партнёра</h2>
              <p className="text-[15px] text-white/80 leading-relaxed m-0">
                За каждый выданный заказ ТехЭйджент начисляет вознаграждение — процент от цены товара. Размер сообщаем
                после проверки заявки. Начисляется после выдачи товара и загрузки подписанного акта. По итогам месяца
                в кабинете формируются отчёт агента и акт; выплата — на счёт из анкеты в течение 7 дней после их принятия.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 px-4 sm:text-center">
          <Link to="/register" className="btn-primary flex sm:inline-flex items-center justify-center gap-2 px-10 min-h-[54px] text-[16px] font-bold no-underline">
            Стать партнёром <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
