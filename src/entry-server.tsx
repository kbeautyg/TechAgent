/**
 * SSR-входная точка для пререндера (scripts/prerender.mjs).
 * Собирается отдельно: vite build --ssr src/entry-server.tsx --outDir dist-ssr
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { resolveMeta, metaToHeadTags, getPublicRoutes } from './seo/meta'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
