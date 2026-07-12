/**
 * Яндекс.Метрика для SPA.
 *
 * Счётчик подключается ТОЛЬКО если задан VITE_METRIKA_ID (номер счётчика)
 * в переменных окружения при сборке (Railway → Variables → VITE_METRIKA_ID).
 * Без него сайт работает как раньше — никакого лишнего кода в проде.
 *
 * Цели, которые нужно создать в интерфейсе Метрики (тип «JavaScript-событие»):
 *   register_submit — отправка формы регистрации
 *   login_submit    — вход в кабинет
 *   order_created   — создание заказа в ЛК
 *   calc_used       — расчёт в калькуляторе
 *   support_click   — клик по контакту поддержки
 */

const METRIKA_ID = Number(import.meta.env.VITE_METRIKA_ID) || 0

type MetrikaFn = (id: number, method: string, ...args: unknown[]) => void

declare global {
  interface Window {
    ym?: MetrikaFn
  }
}

function isEnabled(): boolean {
  return METRIKA_ID > 0 && typeof window !== 'undefined'
}

/** Вставляет тег Метрики. Вызывается один раз из main.tsx */
export function initMetrika(): void {
  if (!isEnabled() || window.ym) return

  const stub = function (this: unknown, ...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    w.ym.a = w.ym.a || []
    w.ym.a.push([...args, Date.now()])
  } as unknown as MetrikaFn
  window.ym = window.ym || stub

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  document.head.appendChild(script)

  window.ym(METRIKA_ID, 'init', {
    defer: true, // хиты шлём вручную из SeoManager при каждой смене маршрута
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  })
}

/** SPA-хит: вызывается при каждой смене маршрута */
export function trackPageView(pathname: string): void {
  if (!isEnabled() || !window.ym) return
  window.ym(METRIKA_ID, 'hit', pathname, { title: document.title })
}

/** Достижение цели */
export function reachGoal(goal: string, params?: Record<string, unknown>): void {
  if (!isEnabled() || !window.ym) return
  window.ym(METRIKA_ID, 'reachGoal', goal, params)
}
