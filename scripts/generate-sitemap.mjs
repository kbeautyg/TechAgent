/**
 * Генерация dist/sitemap.xml из SEO-реестра (тот же список маршрутов, что и у пререндера):
 * статические страницы + категорийные посадочные + все карточки товаров + блог.
 * Запускается последним шагом npm run build; адрес прописан в public/robots.txt.
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href

const { getPublicRoutes } = await import(ssrEntry)

const SITE_URL = 'https://techagent.pro'
const lastmod = new Date().toISOString().slice(0, 10)

const routes = getPublicRoutes()

const urls = routes
  .map(({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(join(root, 'dist', 'sitemap.xml'), xml)
console.log(`✓ sitemap.xml: ${routes.length} URL`)
