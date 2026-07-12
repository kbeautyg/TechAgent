import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resolveMeta } from './meta'
import { applyMeta } from './dom'
import { trackPageView } from '../lib/metrika'

/**
 * Следит за сменой маршрута: обновляет title/description/canonical/OG/JSON-LD
 * и отправляет хит в Яндекс.Метрику (SPA-режим).
 */
export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    applyMeta(resolveMeta(pathname))
    trackPageView(pathname)
  }, [pathname])

  return null
}
