import { Store, ShieldCheck } from 'lucide-react'
import { DEMO_SESSION, endDemo, startDemo } from '../utils/demo'

/*
 * Тестовый вход в оба кабинета на демо-данных. Ссылок на эту страницу на сайте нет — адрес знает команда.
 * Демо-данные появляются только в этом браузере; «Выйти из теста» их стирает.
 */
export default function DemoPage() {
  const btn =
    'w-full flex items-start gap-3 text-left px-4 py-4 rounded-xl border border-border bg-white hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer'
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-white">
      <div className="w-full max-w-md card-glass rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Тестовый доступ</h1>
        <p className="text-sm text-text-secondary mb-6">
          Кабинеты на демо-данных: заказы, оплаты, выдача, отчёты. Всё, что вы делаете, остаётся только в этом браузере.
        </p>
        <div className="space-y-3">
          <button type="button" onClick={() => startDemo('partner')} className={btn}>
            <Store size={22} className="text-primary shrink-0 mt-0.5" />
            <span>
              <span className="block font-semibold text-text-primary">Кабинет партнёра</span>
              <span className="block text-sm text-text-muted">Пункт выдачи: заказы, выдача, документы</span>
            </span>
          </button>
          <button type="button" onClick={() => startDemo('admin')} className={btn}>
            <ShieldCheck size={22} className="text-primary shrink-0 mt-0.5" />
            <span>
              <span className="block font-semibold text-text-primary">Кабинет ТехЭйджент</span>
              <span className="block text-sm text-text-muted">Заявки и партнёры, заказы, отчёты агента</span>
            </span>
          </button>
        </div>
        {DEMO_SESSION && (
          <button type="button" onClick={endDemo} className="mt-6 text-sm text-text-muted underline cursor-pointer bg-transparent border-none">
            Выйти из теста и стереть демо-данные
          </button>
        )}
      </div>
    </div>
  )
}
