import { useSyncExternalStore } from 'react'

/*
 * Хранилище кабинета. Бэкенда нет: заказы, партнёры, отчёты и решения по ним лежат в localStorage
 * этого браузера. Кабинет может быть открыт в нескольких вкладках сразу, поэтому:
 *  — перед каждой записью данные перечитываются и сливаются по id: побеждает запись, изменённая позже;
 *  — массивы в памяти обновляются на месте (на них ссылаются страницы);
 *  — изменения из другой вкладки приходят событием `storage`, и интерфейс перерисовывается.
 */

/** localStorage недоступен при пререндере (Node) — безопасный шим */
export const storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> =
  typeof localStorage !== 'undefined'
    ? localStorage
    : { getItem: () => null, setItem: () => undefined, removeItem: () => undefined }

export function readJson<T>(key: string): T | null {
  try {
    const raw = storage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch { /* повреждённые данные */ }
  return null
}

export function writeJson(key: string, value: unknown): void {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch { /* хранилище переполнено или запрещено */ }
}

const time = (iso?: string): number => {
  const t = iso ? Date.parse(iso) : NaN
  return Number.isNaN(t) ? 0 : t
}

/** Слить записи по id: остаётся изменённая позже, при равном времени — своя */
export function mergeById<T extends { id: string }>(own: T[], other: T[], stamp: (x: T) => string | undefined): T[] {
  const byId = new Map<string, T>()
  for (const x of other) byId.set(x.id, x)
  for (const x of own) {
    const o = byId.get(x.id)
    if (!o || time(stamp(x)) >= time(stamp(o))) byId.set(x.id, x)
  }
  return [...byId.values()]
}

/** То же для словаря «ключ → запись со временем» */
export function mergeRecords<V>(
  own: Record<string, V>,
  other: Record<string, V>,
  stamp: (v: V) => string | undefined,
): Record<string, V> {
  const out: Record<string, V> = { ...other }
  for (const [k, v] of Object.entries(own)) {
    const o = out[k]
    if (o === undefined || time(stamp(v)) >= time(stamp(o))) out[k] = v
  }
  return out
}

/** Заменить содержимое массива, не меняя сам массив */
export function replaceArray<T>(target: T[], items: T[]): void {
  target.splice(0, target.length, ...items)
}

/** Заменить содержимое словаря, не меняя сам объект */
export function replaceRecord<V>(target: Record<string, V>, items: Record<string, V>): void {
  for (const k of Object.keys(target)) delete target[k]
  Object.assign(target, items)
}

/* ── Сигнал интерфейсу: данные изменились ── */

export const DATA_EVENT = 'techagent:data'

let revision = 0

export function notifyDataChanged(): void {
  revision++
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(DATA_EVENT))
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(DATA_EVENT, onChange)
  return () => window.removeEventListener(DATA_EVENT, onChange)
}

/** Номер версии данных: компонент, который его читает, перерисовывается при любом изменении — в этой вкладке или в другой */
export function useDataRevision(): number {
  return useSyncExternalStore(subscribe, () => revision, () => 0)
}

/** Перечитать данные, когда их изменили в другой вкладке */
export function onOtherTabChange(keys: string[], reload: () => void): void {
  if (typeof window === 'undefined') return
  window.addEventListener('storage', (e) => {
    if (e.storageArea && e.storageArea !== localStorage) return
    // key === null — хранилище очистили целиком
    if (e.key !== null && !keys.includes(e.key)) return
    reload()
    notifyDataChanged()
  })
}
