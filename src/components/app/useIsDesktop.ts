import { useSyncExternalStore } from 'react'

const DESKTOP = '(min-width: 1024px)'

function subscribeDesktop(cb: () => void) {
  const mq = window.matchMedia(DESKTOP)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/** Ширина компьютера (lg и шире) — там панели не выезжают, а стоят на странице карточками */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  )
}
