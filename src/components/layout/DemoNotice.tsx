import { useSyncExternalStore } from 'react'
import { DEMO_SESSION, endDemo } from '../../utils/demo'

/** Плашка тестового входа на боевом сайте: видна только в браузере, вошедшем через /demo.
 *  Показывается после загрузки — в заранее собранных страницах её нет */
const noop = () => () => {}

export default function DemoNotice() {
  // В заранее собранной странице (пререндер) плашки нет, в браузере — по флагу
  const shown = useSyncExternalStore(noop, () => DEMO_SESSION, () => false)
  if (!shown) return null
  return (
    <div className="bg-amber-100 border-b border-amber-300 text-amber-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <p>Тестовый доступ: демо-данные, видны только в этом браузере.</p>
        <button
          type="button"
          onClick={endDemo}
          className="px-3 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 font-medium cursor-pointer hover:bg-amber-50"
        >
          Выйти из теста
        </button>
      </div>
    </div>
  )
}
