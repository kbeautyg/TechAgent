import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const roles = [
  {
    title: 'ТехЭйджент',
    role: 'Продавец',
    desc: 'Продаёт товар покупателю по оферте купли-продажи, принимает оплату, доставляет товар в пункт выдачи за свой счёт и отвечает за гарантию, обмен и возврат.',
    color: 'bg-primary',
  },
  {
    title: 'Партнёр',
    role: 'Агент и пункт выдачи',
    desc: 'Привлекает покупателей, оформляет заказы и выдаёт товар в своей точке от имени ТехЭйджент. Денег покупателя не принимает.',
    color: 'bg-accent',
  },
  {
    title: 'Покупатель',
    role: 'Физическое лицо',
    desc: 'Выбирает товар в точке партнёра, оплачивает его ТехЭйджент через СБП и получает в том же пункте выдачи.',
    color: 'bg-primary',
  },
]

const flows = [
  {
    title: 'Деньги',
    rows: [
      { label: 'Покупатель → ТехЭйджент', value: 'Цена товара, через СБП' },
      { label: 'ТехЭйджент → партнёр', value: 'Агентское вознаграждение' },
      { label: 'ТехЭйджент → покупатель', value: 'Возврат денег тем же способом, если покупатель отказался от товара' },
    ],
  },
  {
    title: 'Товар',
    rows: [
      { label: 'ТехЭйджент → пункт выдачи', value: 'Доставка за счёт ТехЭйджент, не позднее 14 дней с даты оплаты' },
      { label: 'Пункт выдачи → покупатель', value: 'Передача по акту приёма-передачи' },
      { label: 'Покупатель → пункт выдачи', value: 'Обмен и возврат — в тот же пункт' },
    ],
  },
  {
    title: 'Основания',
    rows: [
      { label: 'ТехЭйджент и покупатель', value: 'Публичная оферта купли-продажи, акт приёма-передачи' },
      { label: 'ТехЭйджент и партнёр', value: 'Агентский договор-оферта, отчёт агента, акт' },
    ],
  },
]

interface InfoRow {
  label: string
  value: string
  href?: string
}

const requisites: InfoRow[] = [
  { label: 'Продавец', value: 'ОсОО\u00A0«ТехЭйджент», директор Аширбеков Н.М.Т.' },
  { label: 'Регистрация в Кыргызской Республике', value: 'рег. № 326302-3301-ООО, ИНН 00403202610304' },
  { label: 'ИНН / КПП в РФ', value: '9909766511 / 771387001' },
  { label: 'Банк', value: 'АО «ТБанк», БИК 044525974' },
  { label: 'Расчётный счёт', value: '40807810900000001482' },
  { label: 'Адрес', value: 'Кыргызская Республика, г. Бишкек, Октябрьский район, 8 мкр, д. 33, кв. 8' },
]

const contacts: InfoRow[] = [
  { label: 'Общие вопросы', value: 'info@techagent.pro', href: 'mailto:info@techagent.pro' },
  { label: 'Партнёрам', value: 'partners@techagent.pro', href: 'mailto:partners@techagent.pro' },
  { label: 'Покупателям', value: 'help@techagent.pro', href: 'mailto:help@techagent.pro' },
  { label: 'Юридические вопросы', value: 'compliance@techagent.pro', href: 'mailto:compliance@techagent.pro' },
  { label: 'Поддержка в Telegram', value: '@techagent_support', href: 'https://t.me/techagent_support' },
  { label: 'Документы', value: 'Оферты, политика, соглашение', href: '/legal' },
]

function InfoCard({ title, rows }: { title: string; rows: InfoRow[] }) {
  return (
    <div className="bg-bg-section rounded-3xl p-8">
      <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-4">{title}</h3>
      <div className="flex flex-col gap-0">
        {rows.map((item) => (
          <div key={item.label} className="py-3 border-b border-black/[0.05] last:border-0">
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
  )
}

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
            Продавец — ОсОО&nbsp;«ТехЭйджент». Партнёры TechAgent оформляют заказы покупателей и&nbsp;выдают товар в&nbsp;своих точках, покупатели платят продавцу напрямую через СБП. В&nbsp;каталоге — Apple, Samsung, Xiaomi, Dyson, Sony, DJI и&nbsp;другие бренды.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== HOW THE MODEL WORKS ===== */}
        <div className="mb-20">
          <h2 className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-center text-text-primary mb-3">
            Как устроена модель
          </h2>
          <p className="text-text-muted text-center max-w-xl mx-auto mb-16 text-[16px]">
            Три участника: продавец, его партнёр с пунктом выдачи и покупатель
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {roles.map((r, i) => (
              <div key={i} className="bg-bg-section rounded-3xl p-8 relative overflow-hidden">
                <div className={`w-10 h-10 ${r.color} rounded-xl flex items-center justify-center text-white text-sm font-extrabold mb-5`}>
                  {i + 1}
                </div>
                <h3 className="text-xl font-extrabold text-text-primary tracking-tight mb-1">{r.title}</h3>
                <div className="text-[13px] text-primary font-semibold mb-3 font-mono">{r.role}</div>
                <p className="text-[13px] text-text-muted leading-relaxed">{r.desc}</p>
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


          {/* Реквизиты и контакты — две колонки с одинаковым числом строк, договоры — строкой под ними */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InfoCard title="Реквизиты" rows={requisites} />
            <InfoCard title="Контакты" rows={contacts} />
          </div>

          <div className="bg-bg-section rounded-3xl p-8 mt-4">
            <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-3">Договоры</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed max-w-3xl">
              Покупатель заключает договор купли-продажи с ОсОО&nbsp;«ТехЭйджент» и платит ему напрямую — условия в{' '}
              <Link to="/legal/sale-offer" className="text-primary font-semibold">оферте купли-продажи</Link>. Партнёр работает
              по <Link to="/legal/offer" className="text-primary font-semibold">агентскому договору-оферте</Link>: оформляет заказы и
              выдаёт товар, а вознаграждение получает от ТехЭйджент.{' '}
              <Link to="/legal" className="text-primary font-semibold">Все документы</Link>
            </p>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="mb-20">
          <div className="bg-primary rounded-3xl py-16 px-8 text-center text-white">
            <h2 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight mb-3">Станьте партнёром TechAgent</h2>
            <p className="text-white/60 text-[15px] mb-8 max-w-xl mx-auto">Оставьте заявку — после проверки ТехЭйджент откроет вам доступ в&nbsp;кабинет для заказов покупателей</p>
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
