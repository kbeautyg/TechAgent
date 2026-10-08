import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  IconFileCheck, IconCoins, IconTruck,
  IconSmartphone, IconGlobe, IconBolt,
} from '../components/icons'

const advantages = [
  { icon: <IconFileCheck size={24} />, title: 'Продавец с реквизитами', desc: 'ОсОО «ТехЭйджент» продаёт товар по публичной оферте купли-продажи. Реквизиты продавца — на странице оплаты и в документах.' },
  { icon: <IconBolt size={24} />, title: 'Оплата через СБП', desc: 'Покупатель платит продавцу напрямую по ссылке или QR-коду. Партнёр деньги покупателя не принимает.' },
  { icon: <IconTruck size={24} />, title: 'Доставка в пункт выдачи', desc: 'ТехЭйджент выкупает товар у поставщика и доставляет его в точку партнёра за свой счёт — ориентировочно 5–7 рабочих дней с момента выкупа.' },
  { icon: <IconCoins size={24} />, title: 'Документы по каждому заказу', desc: 'Акт приёма-передачи при выдаче товара, отчёт агента и акт по итогам месяца — в личном кабинете партнёра.' },
  { icon: <IconSmartphone size={24} />, title: 'Личный кабинет партнёра', desc: 'Оформление заказов, ссылки на оплату, статусы доставки, отметка о выдаче товара.' },
  { icon: <IconGlobe size={24} />, title: 'Каталог с ценами', desc: 'Apple, Samsung, Xiaomi, Dyson, Sony, DJI и другие бренды. Цены в каталоге — итоговые для покупателя.' },
]

const roles = [
  {
    title: 'ТехЭйджент',
    role: 'Продавец',
    desc: 'Покупает товар у поставщика в собственность, доставляет его в пункт выдачи за свой счёт и продаёт покупателю по оферте купли-продажи.',
    color: 'bg-primary',
    items: ['Контракт поставки и инвойс', 'Доставка до пункта выдачи', 'Договор купли-продажи с покупателем'],
  },
  {
    title: 'Партнёр',
    role: 'Агент и пункт выдачи',
    desc: 'Привлекает покупателей, оформляет заказы и выдаёт товар в своей точке от имени ТехЭйджент. Денег покупателя не принимает.',
    color: 'bg-accent',
    items: ['Оформляет заказ в кабинете', 'Принимает товар в точке', 'Выдаёт товар под акт'],
  },
  {
    title: 'Покупатель',
    role: 'Физическое лицо',
    desc: 'Выбирает товар в точке партнёра, оплачивает его ТехЭйджент через СБП и получает в том же пункте выдачи.',
    color: 'bg-primary',
    items: ['Принимает оферту купли-продажи', 'Платит продавцу через СБП', 'Получает товар под подпись'],
  },
]

const flows = [
  {
    title: 'Деньги',
    rows: [
      { label: 'Покупатель → ТехЭйджент', value: 'Цена товара, через СБП' },
      { label: 'ТехЭйджент → поставщик', value: 'Оплата по контракту поставки' },
      { label: 'ТехЭйджент → партнёр', value: 'Агентское вознаграждение' },
    ],
  },
  {
    title: 'Товар',
    rows: [
      { label: 'Поставщик → ТехЭйджент', value: 'Право собственности по инвойсу' },
      { label: 'ТехЭйджент → пункт выдачи', value: 'Доставка за счёт ТехЭйджент' },
      { label: 'Пункт выдачи → покупатель', value: 'Передача по акту приёма-передачи' },
    ],
  },
  {
    title: 'Основания',
    rows: [
      { label: 'ТехЭйджент и поставщик', value: 'Контракт поставки, инвойс' },
      { label: 'ТехЭйджент и покупатель', value: 'Публичная оферта купли-продажи' },
      { label: 'ТехЭйджент и партнёр', value: 'Агентский договор-оферта, отчёт агента, акт' },
      { label: 'ТехЭйджент и перевозчик', value: 'Договор перевозки' },
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute top-[-100px] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[40px] sm:text-[48px] font-extrabold mb-5 text-text-primary tracking-tight leading-[1.08]">
            TechAgent — электроника с&nbsp;получением в&nbsp;пунктах выдачи партнёров
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Продавец — ОсОО «ТехЭйджент». Партнёры TechAgent оформляют заказы покупателей и&nbsp;выдают товар в&nbsp;своих точках, покупатели платят продавцу напрямую через СБП.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== WHAT IS TECHAGENT ===== */}
        <div className="mb-20">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Что такое TechAgent?
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-16 text-[16px] leading-relaxed">
            Платформа, через которую ОсОО «ТехЭйджент» продаёт электронику покупателям в&nbsp;пунктах выдачи партнёров.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((a, i) => (
              <div key={i} className="bg-bg-section rounded-3xl p-7 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-4">
                  {a.icon}
                </div>
                <h3 className="text-[15px] font-bold text-text-primary mb-2 tracking-tight">{a.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== HOW THE MODEL WORKS ===== */}
        <div className="mb-20">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Как устроена модель
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Поставщик продаёт товар ТехЭйджент по&nbsp;контракту поставки. Дальше работают три участника
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {roles.map((r, i) => (
              <div key={i} className="bg-bg-section rounded-3xl p-8 relative overflow-hidden">
                <div className={`w-10 h-10 ${r.color} rounded-xl flex items-center justify-center text-white text-sm font-extrabold mb-5`}>
                  {i + 1}
                </div>
                <h3 className="text-xl font-extrabold text-text-primary tracking-tight mb-1">{r.title}</h3>
                <div className="text-[13px] text-primary font-semibold mb-3 font-mono">{r.role}</div>
                <p className="text-[13px] text-text-muted leading-relaxed mb-5">{r.desc}</p>
                <div className="flex flex-col gap-2">
                  {r.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-border">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-[13px] text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MONEY, GOODS, DOCUMENTS ===== */}
        <div className="mb-20">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-16">
            Деньги, товар и документы
          </h2>

          <div className="bg-bg-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {flows.map((f) => (
                <div key={f.title}>
                  <h3 className="text-lg font-extrabold tracking-tight mb-3">{f.title}</h3>
                  {f.rows.map((r) => (
                    <div key={r.label} className="py-3 border-b border-white/[0.06] last:border-0">
                      <div className="text-[13px] font-semibold text-white/80 mb-0.5">{r.label}</div>
                      <div className="text-[13px] text-white/50">{r.value}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== COMPANY / REQUISITES ===== */}
        <div className="mb-20" id="company">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-16">
            Кто мы юридически
          </h2>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-bg-section rounded-3xl p-8">
              <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-4">
                Почему компания зарегистрирована в Бишкеке
              </h3>
              <div className="flex flex-col gap-3 text-[14px] text-text-secondary leading-relaxed">
                <p>
                  ОсОО «ТехЭйджент» покупает товар у зарубежных поставщиков и рассчитывается с ними,
                  поэтому компания зарегистрирована в Кыргызстане — стране-участнице ЕАЭС.
                </p>
                <p>
                  Покупатель заключает договор купли-продажи с ОсОО «ТехЭйджент» и платит ему напрямую.
                  Партнёр работает по агентскому договору: оформляет заказы и выдаёт товар, а вознаграждение
                  получает от ТехЭйджент.
                </p>
                <p>
                  Условия — в документах:{' '}
                  <Link to="/legal/sale-offer" className="text-primary font-semibold">оферта купли-продажи</Link> для покупателей и{' '}
                  <Link to="/legal/offer" className="text-primary font-semibold">агентский договор-оферта</Link> для партнёров.
                </p>
              </div>
            </div>

            <div className="bg-bg-section rounded-3xl p-8">
              <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-4">
                Реквизиты и контакты
              </h3>
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Продавец', value: 'ОсОО «ТехЭйджент», ИНН 00403202610304, рег. № 326302-3301-ООО' },
                  { label: 'Адрес', value: 'Кыргызская Республика, г. Бишкек, Октябрьский район, 8 мкр, д. 33, оф. 8' },
                  { label: 'Директор', value: 'Аширбеков Н.М.Т.' },
                  { label: 'Общие вопросы', value: 'info@techagent.pro', href: 'mailto:info@techagent.pro' },
                  { label: 'Партнёрам', value: 'partners@techagent.pro', href: 'mailto:partners@techagent.pro' },
                  { label: 'Покупателям', value: 'help@techagent.pro', href: 'mailto:help@techagent.pro' },
                  { label: 'Документы', value: 'Оферты, политика, соглашение', href: '/legal' },
                ].map((item, i) => (
                  <div key={i} className="py-3 border-b border-black/[0.05] last:border-0">
                    <div className="text-[11px] uppercase tracking-wider font-medium mb-1 font-mono text-text-muted">{item.label}</div>
                    {item.href ? (
                      item.href.startsWith('/') ? (
                        <Link to={item.href} className="text-[14px] font-medium text-primary no-underline">{item.value}</Link>
                      ) : (
                        <a href={item.href} className="text-[14px] font-medium text-primary no-underline">{item.value}</a>
                      )
                    ) : (
                      <div className="text-[14px] font-medium text-text-primary">{item.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="mb-20">
          <div className="bg-primary rounded-3xl py-16 px-8 text-center text-white">
            <h2 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight mb-3">Станьте партнёром TechAgent</h2>
            <p className="text-white/60 text-[15px] mb-8 max-w-xl mx-auto">Заполните анкету — после проверки ТехЭйджент вы&nbsp;сможете оформлять заказы покупателей</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-primary rounded-2xl text-[15px] font-semibold no-underline hover:bg-white/90 transition-colors">
                Стать партнёром <ArrowRight size={16} />
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-[15px] font-semibold no-underline transition-all duration-300 hover:opacity-90 hover:shadow-lg bg-bg-dark text-white">
                Как это работает
              </Link>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
