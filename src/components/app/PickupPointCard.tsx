import { MapPin, ExternalLink } from 'lucide-react'
import type { User } from '../../types'
import StatusMark from './StatusMark'

const PARTNERS_EMAIL = 'partners@techagent.pro'

/**
 * «Ваш пункт выдачи» в кабинете партнёра: адрес, как точка выглядит у покупателя на карте магазина и видна ли она.
 * Пункт меняет ТехЭйджент (раздел сотрудников, /staff/partners) — партнёр пишет на partners@techagent.pro
 */
export default function PickupPointCard({ user, className = '' }: { user: User; className?: string }) {
  const p = user.mapPoint
  const mail = `mailto:${PARTNERS_EMAIL}?subject=${encodeURIComponent(`Пункт выдачи: ${user.companyName ?? ''}`)}`
  return (
    <section className={`app-group p-4 lg:p-5 ${className}`} aria-label="Ваш пункт выдачи">
      <div className="flex items-start gap-3 mb-3">
        <h2 className="flex-1 font-bold text-base text-text-primary flex items-center gap-2 m-0">
          <MapPin size={18} className="text-primary" />
          Ваш пункт выдачи
        </h2>
        {user.pointVisible
          ? <StatusMark size="sm" color="#12B981">Виден покупателям</StatusMark>
          : <StatusMark size="sm" color="#F59E0B">{p ? 'Появится после оферты' : 'Пока не на карте'}</StatusMark>}
      </div>

      {p ? (
        <>
          <p className="text-[13px] text-text-muted mb-2">Так его видят покупатели на карте при оформлении заказа на сайте:</p>
          {/* Та же карточка, что в выборе пункта при оформлении (SdekPicker) */}
          <div className="rounded-xl border border-border bg-bg-light px-3.5 py-3 text-[14px] leading-snug">
            <span className="flex items-center gap-2 text-[12.5px] text-text-muted">
              <i className="sdek-dot sdek-dot-partner" aria-hidden="true" />
              Пункт партнёра TechAgent · доставка входит в цену{p.workTime ? ` · ${p.workTime}` : ''}
            </span>
            <b className="block mt-1 text-text-primary">{p.name}, {p.address}</b>
            <span className="block text-text-secondary">{p.city}</span>
          </div>
          <a
            href={`https://yandex.ru/maps/?pt=${p.lon},${p.lat}&z=17&l=map`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] text-primary font-medium no-underline hover:underline mt-2.5"
          >
            Открыть на Яндекс Картах <ExternalLink size={14} />
          </a>
          {!user.pointVisible && (
            <p className="text-[13px] leading-snug text-text-muted mt-2 mb-0">Точка откроется покупателям, когда вы примете агентский договор-оферту.</p>
          )}
        </>
      ) : (
        <p className="text-[14px] leading-relaxed text-text-secondary m-0">
          {user.pointAddress ? <><span className="text-text-primary font-medium">{user.pointAddress}</span> — адрес из анкеты. </> : null}
          На карте магазина вашего пункта пока нет: ТехЭйджент добавит его, и покупатели смогут выбрать его при оформлении заказа на
          сайте. Заказы, которые оформляете вы, приходят в этот пункт уже сейчас.
        </p>
      )}

      <p className="text-[13px] leading-snug text-text-muted mt-3 mb-0">
        Адрес и часы работы меняет ТехЭйджент — напишите на{' '}
        <a href={mail} className="text-primary no-underline hover:underline">{PARTNERS_EMAIL}</a>.
      </p>
    </section>
  )
}
