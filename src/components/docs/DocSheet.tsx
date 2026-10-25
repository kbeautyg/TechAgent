import { Fragment, type ReactNode } from 'react'
import type { AcceptanceForm, AgentDocForm, DocParty, Document } from '../../types'
import { formatDate, formatPercent, periodLabel } from '../../utils/calculate'
import { formatMoney, rublesInWords } from '../../utils/money'

/*
 * Документы кабинета в принятой в РФ форме: шапка с номером и датой, стороны, таблица, итог прописью,
 * подписи и место печати. Один и тот же бланк показывается в окне документа и печатается (сохраняется в PDF).
 * Стили — .paper в index.css. Публичные оферты и условия — текст с разбором на заголовки и пункты.
 */

const MINUS = '−'

function Head({ title, sub, date }: { title: string; sub?: ReactNode[]; date?: string }) {
  return (
    <>
      <h1 className="paper-title">{title}</h1>
      {sub?.map((s, i) => (
        <p key={i} className="paper-sub">{s}</p>
      ))}
      {date && <p className="paper-date">{date}</p>}
    </>
  )
}

/** Подпись стороны: роль, наименование, реквизиты, строка подписи и место печати */
function SignBlock({ role, party, note }: { role: string; party: DocParty; note?: string }) {
  return (
    <div className="paper-sign">
      <div className="paper-sign-role">{role}</div>
      <div className="paper-sign-name">{party.name}</div>
      <div className="paper-sign-details">
        {party.details.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {note && <div className="paper-sign-note">{note}</div>}
      <div className="paper-sign-line">
        {party.signerTitle && <b>{party.signerTitle}</b>}
        <span />
        <b>/</b>
        {party.signerName ? <b>{party.signerName}</b> : <span className="paper-sign-fio" />}
      </div>
      <div className="paper-sign-caption">
        <i>подпись</i>
        <i>расшифровка подписи</i>
      </div>
      <div className="paper-sign-mp">М.П.</div>
    </div>
  )
}

const acceptedLine = (f: { acceptedAt?: string }) =>
  f.acceptedAt ? `к агентскому договору (публичной оферте), акцептованному ${formatDate(f.acceptedAt)}` : 'к агентскому договору (публичной оферте)'

const orderNo = (n: string) => n.replace(/^#/, '')

/* ── Отчёт агента ── */

export function ReportSheet({ form }: { form: AgentDocForm }) {
  const hasDeductions = form.returns.length > 0 || form.carried > 0
  let n = 1
  return (
    <section className="paper">
      <Head
        title={`Отчёт агента № ${form.number}`}
        sub={[`за период с ${form.periodFrom} по ${form.periodTo}`, acceptedLine(form)]}
        date={formatDate(form.date)}
      />

      <p>
        <b>{form.agent.name}</b> (далее — «Агент») представляет <b>{form.principal.name}</b> (далее — «Принципал») отчёт
        об исполнении поручения за период с {form.periodFrom} по {form.periodTo}.
      </p>

      <p>{n++}. В отчётном периоде Агент от имени и за счёт Принципала выдал Покупателям Товар по следующим Заказам:</p>
      <div className="paper-table-wrap">
        <table className="paper-table">
          <thead>
            <tr>
              <th className="c">№</th>
              <th>Заказ</th>
              <th>Товар</th>
              <th className="c nw">Оплачен</th>
              <th className="c">Выдан</th>
              <th>Покупатель</th>
              <th className="r">Цена товара, руб.</th>
              <th className="c">Ставка</th>
              <th className="r">Вознаграж&shy;дение, руб.</th>
            </tr>
          </thead>
          <tbody>
            {form.rows.map((r, i) => (
              <tr key={r.orderNumber}>
                <td className="c">{i + 1}</td>
                <td className="nw">{orderNo(r.orderNumber)}</td>
                <td>{r.product}</td>
                <td className="c nw">{r.paidAt ? formatDate(r.paidAt) : '—'}</td>
                <td className="c nw">{r.issuedAt ? formatDate(r.issuedAt) : '—'}</td>
                <td>{r.buyer}</td>
                <td className="r nw">{formatMoney(r.price)}</td>
                <td className="c nw">{r.percent !== null ? formatPercent(r.percent) : '—'}</td>
                <td className="r nw">{r.reward !== null ? formatMoney(r.reward) : 'не назначено'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} className="r">Итого</td>
              <td className="r nw">{formatMoney(form.goodsTotal)}</td>
              <td />
              <td className="r nw">{formatMoney(form.accruedTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {hasDeductions && (
        <>
          <p>{n++}. Удержания по Заказам, возвращённым Покупателями после выдачи (п. 7.3 договора):</p>
          <div className="paper-table-wrap">
            <table className="paper-table">
              <thead>
                <tr>
                  <th className="c">№</th>
                  <th>Заказ</th>
                  <th className="c">Дата возврата</th>
                  <th>Вознаграждение начислено в отчёте</th>
                  <th className="r">Сумма, руб.</th>
                </tr>
              </thead>
              <tbody>
                {form.returns.map((r, i) => (
                  <tr key={r.orderNumber}>
                    <td className="c">{i + 1}</td>
                    <td className="nw">{orderNo(r.orderNumber)}</td>
                    <td className="c nw">{r.returnedAt ? formatDate(r.returnedAt) : '—'}</td>
                    <td>{r.period ? `за ${periodLabel(r.period)}` : '—'}</td>
                    <td className="r nw">{formatMoney(r.amount)}</td>
                  </tr>
                ))}
                {form.carried > 0 && (
                  <tr>
                    <td className="c">{form.returns.length + 1}</td>
                    <td colSpan={3}>Остаток удержания с прошлых периодов</td>
                    <td className="r nw">{formatMoney(form.carried)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p>
            Удержано в отчётном периоде: {formatMoney(form.deducted)} руб.
            {form.carryForward > 0 && <> Переносится на следующие периоды: {formatMoney(form.carryForward)} руб.</>}
          </p>
        </>
      )}

      <p>
        {n++}. Вознаграждение Агента за отчётный период: {formatMoney(form.accruedTotal)} руб.
        {form.deducted > 0 && <>, удержано: {MINUS}{formatMoney(form.deducted)} руб.</>}
        {' '}К выплате: <b>{formatMoney(form.payable)} руб. ({rublesInWords(form.payable)})</b>.
      </p>
      <p>
        {n++}. Денежные средства Покупателей Агентом не принимались: оплата Товара поступила Принципалу по ссылкам
        Платформы (п. 5.2 договора).
      </p>
      <p>
        {n++}. Вознаграждение выплачивается на банковский счёт Агента в течение 7 (семи) дней с даты принятия отчёта и акта
        (п. 7.6 договора). Отчёт считается принятым, если в течение 10 (десяти) рабочих дней с даты его формирования не
        направлены мотивированные возражения (п. 7.5 договора).
      </p>

      <div className="paper-signs">
        <SignBlock role="Отчёт представил — Агент" party={form.agent} />
        <SignBlock role="Отчёт принял — Принципал" party={form.principal} />
      </div>
    </section>
  )
}

/* ── Акт об оказании услуг ── */

export function ActSheet({ form }: { form: AgentDocForm }) {
  const numbers = form.rows.map((r) => orderNo(r.orderNumber)).join(', ')
  const partyLine = (p: DocParty) => [p.name, ...p.details].join(', ')
  return (
    <section className="paper">
      <Head
        title={`Акт № ${form.number} от ${formatDate(form.date)}`}
        sub={['об оказании услуг', acceptedLine(form)]}
      />

      <table className="paper-parties">
        <tbody>
          <tr>
            <th>Исполнитель (Агент):</th>
            <td>{partyLine(form.agent)}</td>
          </tr>
          <tr>
            <th>Заказчик (Принципал):</th>
            <td>{partyLine(form.principal)}</td>
          </tr>
          <tr>
            <th>Основание:</th>
            <td>
              Агентский договор (публичная оферта), techagent.pro/legal/offer; отчёт агента № {form.number} за период с{' '}
              {form.periodFrom} по {form.periodTo}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="paper-table-wrap">
        <table className="paper-table">
          <thead>
            <tr>
              <th className="c">№</th>
              <th>Наименование работ, услуг</th>
              <th className="c nw">Кол-во</th>
              <th className="c">Ед.</th>
              <th className="r">Цена, руб.</th>
              <th className="r">Сумма, руб.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="c">1</td>
              <td>
                Агентское вознаграждение за период с {form.periodFrom} по {form.periodTo}: привлечение Покупателей,
                оформление Заказов, приём, хранение и выдача Товара Покупателям от имени Принципала. Выдано Заказов:{' '}
                {form.rows.length} (№ {numbers}) на сумму {formatMoney(form.goodsTotal)} руб.
              </td>
              <td className="c">1</td>
              <td className="c">усл.</td>
              <td className="r nw">{formatMoney(form.accruedTotal)}</td>
              <td className="r nw">{formatMoney(form.accruedTotal)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="r">Итого:</td>
              <td className="r nw">{formatMoney(form.accruedTotal)}</td>
            </tr>
            {form.deducted > 0 && (
              <>
                <tr>
                  <td colSpan={5} className="r">Удержано по возвратам (п. 7.3 договора):</td>
                  <td className="r nw">{MINUS}{formatMoney(form.deducted)}</td>
                </tr>
                <tr>
                  <td colSpan={5} className="r">К выплате:</td>
                  <td className="r nw">{formatMoney(form.payable)}</td>
                </tr>
              </>
            )}
          </tfoot>
        </table>
      </div>

      <p>Всего оказано услуг 1, на сумму {formatMoney(form.accruedTotal)} руб.</p>
      <p><b>{rublesInWords(form.accruedTotal)}</b></p>
      <p>
        Вышеперечисленные услуги выполнены полностью и в срок. Заказчик претензий по объёму, качеству и срокам оказания
        услуг не имеет.
      </p>
      <p className="paper-small">
        Вознаграждение выплачивается в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6 договора). Акт
        считается принятым, если в течение 10 (десяти) рабочих дней с даты его формирования не направлены мотивированные
        возражения (п. 7.5 договора).
      </p>

      <div className="paper-signs">
        <SignBlock role="Исполнитель" party={form.agent} />
        <SignBlock role="Заказчик" party={form.principal} />
      </div>
    </section>
  )
}

/* ── Подтверждение акцепта оферты ── */

export function AcceptanceSheet({ form }: { form: AcceptanceForm }) {
  const rows: [string, ReactNode][] = [
    ['Договор', 'Агентский договор-оферта ООО «ТехЭйджент» для Партнёров, techagent.pro/legal/offer'],
    ['Принципал', [form.principal.name, ...form.principal.details].join(', ')],
    ['Партнёр (Агент)', [form.partner.name, ...form.partner.details].join(', ')],
    ['Доступ в личный кабинет открыт', formatDate(form.openedAt)],
    ['Дата акцепта', formatDate(form.acceptedAt)],
    ['Способ акцепта', 'Отметка Партнёра о согласии с условиями оферты при первом входе в личный кабинет (п. 2.1)'],
    ['Договор заключён', `${formatDate(form.acceptedAt)}, с даты акцепта (п. 2.2)`],
    ...(form.percent
      ? ([['Вознаграждение Партнёра', `${formatPercent(form.percent)} от цены Товара по выданным Заказам (п. 7.1)`]] as [string, ReactNode][])
      : []),
  ]
  return (
    <section className="paper">
      <Head title="Подтверждение акцепта агентского договора-оферты" date={formatDate(form.acceptedAt)} />
      <table className="paper-table paper-kv">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th>{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        ТехЭйджент — продавец Товара: приобретает Товар у поставщика в собственность, доставляет его в Пункт выдачи за свой
        счёт и продаёт Покупателям по оферте купли-продажи. Партнёр — агент ТехЭйджент: привлекает Покупателей, оформляет
        Заказы и выдаёт Товар в Пункте выдачи от имени ТехЭйджент. Денежные средства Покупателей Партнёр не принимает
        (п. 5.2).
      </p>
      <div className="paper-signs paper-signs-one">
        <SignBlock role="Принципал" party={form.principal} />
      </div>
    </section>
  )
}

/* ── Оферты и условия: текст с заголовками и пунктами ── */

const isCaps = (s: string) => /[А-ЯЁA-Z]/.test(s) && s === s.toUpperCase()

/** Номер пункта «2.1.» — жирным */
function Clause({ text }: { text: string }) {
  const m = text.match(/^(\d+(?:\.\d+)+\.)\s(.*)$/s)
  return m ? (
    <>
      <b>{m[1]}</b> {m[2]}
    </>
  ) : (
    <>{text}</>
  )
}

export function LegalText({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.split('\n').filter((l) => l.trim() !== ''))
  const [head, ...rest] = blocks
  return (
    <div className="legal-text">
      {head && (
        <div className="legal-head">
          <h1 className="legal-title">{head[0]}</h1>
          {head.slice(1).map((l) => (
            <p key={l} className="legal-sub">{l}</p>
          ))}
        </div>
      )}
      {rest.map((lines, i) => {
        const first = lines[0]
        if (lines.length === 1 && first.startsWith('Редакция от')) return <p key={i} className="legal-edition">{first}</p>
        if (lines.length === 1 && isCaps(first)) return <h2 key={i} className="legal-h">{first}</h2>
        const items = lines.filter((l) => /^\s+—\s/.test(l))
        const plain = lines.filter((l) => !/^\s+—\s/.test(l))
        return (
          <Fragment key={i}>
            {plain.length > 0 && (
              <p className="legal-p">
                {plain.map((l, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br />}
                    <Clause text={l} />
                  </Fragment>
                ))}
              </p>
            )}
            {items.length > 0 && (
              <ul className="legal-list">
                {items.map((l) => (
                  <li key={l}>{l.replace(/^\s+—\s/, '')}</li>
                ))}
              </ul>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

/** Документ целиком: бланк отчёта, акта или акцепта, а для оферт и условий — размеченный текст */
export function DocSheet({ doc }: { doc: Document }) {
  if (doc.agentForm) return doc.type === 'ACT' ? <ActSheet form={doc.agentForm} /> : <ReportSheet form={doc.agentForm} />
  if (doc.acceptanceForm) return <AcceptanceSheet form={doc.acceptanceForm} />
  return doc.content ? <LegalText text={doc.content} /> : null
}
