/**
 * Пререндер публичных маршрутов в статический HTML (после vite build + vite build --ssr).
 * Каждый маршрут получает готовую разметку и полный SEO-head — Яндекс и Google
 * видят текст и ссылки без исполнения JS; превью в Telegram/WhatsApp работают.
 *
 * Порядок в npm run build:
 *   1) vite build                      → dist/ (клиент)
 *   2) vite build --ssr ... dist-ssr/  → рендер-функция
 *   3) node scripts/prerender.mjs      → dist/<route>/index.html + dist/spa.html
 *   4) node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href

const { render, resolveMeta, metaToHeadTags, getPublicRoutes } = await import(ssrEntry)

const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

/** Вырезает дефолтные title/description шаблона (страница получает свои из SEO-реестра) */
function stripDefaultMeta(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*>\s*/, '')
}

function renderPage(path) {
  const meta = resolveMeta(path)
  const head = metaToHeadTags(meta)
  const appHtml = render(path)
  return stripDefaultMeta(template)
    .replace('<!--seo-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root">${appHtml}</div>`)
}

/* 1. SPA-фолбэк для закрытых зон (login/register/pay/dashboard/admin) — noindex, без пререндера */
const spaHtml = template
  .replace('<!--seo-head-->', '<meta name="robots" content="noindex" />')
  .replace('<!--app-html-->', '')
writeFileSync(join(distDir, 'spa.html'), spaHtml)

/* 2. Публичные маршруты */
const routes = getPublicRoutes()
let done = 0
for (const { path } of routes) {
  const html = renderPage(path)
  const outFile = path === '/' ? join(distDir, 'index.html') : join(distDir, path.slice(1), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  done += 1
}

console.log(`✓ prerender: ${done} страниц + spa.html`)
