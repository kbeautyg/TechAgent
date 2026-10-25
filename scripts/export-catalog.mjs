/*
 * Каталог для сервера заказов: id → название, цена, доступность, цвета и цены цветов, которые дороже цены карточки.
 * Сервер не верит ценам из браузера — сверяет корзину с этим файлом (api/catalog.json).
 * Запуск: node scripts/export-catalog.mjs (делается перед выкладкой сервера заказов).
 */
import { build } from 'esbuild'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = await build({
  stdin: {
    contents: "export { products } from './src/data/products.ts'; export { translateProductName } from './src/utils/translate.ts'",
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
})
const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'))
const catalog = {}
// Название — по-русски, как на сайте: оно попадает в письма и в кабинет покупателя
for (const p of mod.products) {
  const colors = p.colors || []
  const prices = Object.fromEntries(colors.filter((c) => c.name && c.price !== undefined && c.price !== p.price).map((c) => [c.name, c.price]))
  catalog[p.id] = { name: mod.translateProductName(p.name), price: p.price, inStock: p.inStock, colors: colors.map((c) => c.name).filter(Boolean),
    ...(Object.keys(prices).length ? { prices } : {}) }
}
writeFileSync(join(root, 'api/catalog.json'), JSON.stringify(catalog))
console.log(`✓ api/catalog.json: ${Object.keys(catalog).length} товаров`)
