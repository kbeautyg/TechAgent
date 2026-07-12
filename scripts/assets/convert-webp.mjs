/**
 * Одноразовая конвертация карточных PNG → WebP (даунскейл до 800px по большей стороне).
 * PNG-оригиналы удаляются: ссылки в коде переведены на .webp (utils/productImages.ts).
 *
 * Запуск: node scripts/assets/convert-webp.mjs
 */
import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const imagesDir = join(root, 'public', 'images')
const MAX_SIDE = 800
const QUALITY = 82

let totalBefore = 0
let totalAfter = 0
let count = 0

const folders = readdirSync(imagesDir).filter((f) => statSync(join(imagesDir, f)).isDirectory())

for (const folder of folders) {
  const dir = join(imagesDir, folder)
  const pngs = readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.png'))
  for (const file of pngs) {
    const src = join(dir, file)
    const dest = join(dir, file.replace(/\.png$/i, '.webp'))
    const before = statSync(src).size
    await sharp(src)
      .resize(MAX_SIDE, MAX_SIDE, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest)
    const after = statSync(dest).size
    totalBefore += before
    totalAfter += after
    count += 1
    unlinkSync(src)
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`✓ ${count} изображений: ${mb(totalBefore)} МБ → ${mb(totalAfter)} МБ (-${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`)
