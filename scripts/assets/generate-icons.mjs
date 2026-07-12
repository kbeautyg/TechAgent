/**
 * Одноразовая генерация брендовых фавиконок из SVG-логотипа (молния TechAgent).
 * Результат кладётся в public/ и коммитится — при сборке скрипт не нужен.
 *
 * Запуск: node scripts/assets/generate-icons.mjs
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const publicDir = join(root, 'public')
const iconsDir = join(publicDir, 'icons')
mkdirSync(iconsDir, { recursive: true })

/* Логотип: молния из Header.tsx (viewBox 24), масштаб ×2.667 в поле 64 */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#1B44F5"/>
  <path d="M34.67 5.33 8 37.33h24l-2.67 21.34L56 26.67H32l2.67-21.34z" fill="#fff"/>
</svg>`

writeFileSync(join(publicDir, 'favicon.svg'), faviconSvg)

async function renderPng(size) {
  return sharp(Buffer.from(faviconSvg), { density: 300 }).resize(size, size).png().toBuffer()
}

/** ICO-контейнер с PNG-вложениями (валиден для всех современных браузеров и Windows) */
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(pngs.length, 4)

  const entries = []
  const blobs = []
  let offset = 6 + pngs.length * 16
  for (const { size, buf } of pngs) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // palette
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // planes
    entry.writeUInt16LE(32, 6) // bpp
    entry.writeUInt32LE(buf.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    blobs.push(buf)
    offset += buf.length
  }
  return Buffer.concat([header, ...entries, ...blobs])
}

const sizes = [16, 32, 48, 180, 192, 512]
const rendered = {}
for (const size of sizes) {
  rendered[size] = await renderPng(size)
}

writeFileSync(join(publicDir, 'favicon.ico'), buildIco([
  { size: 16, buf: rendered[16] },
  { size: 32, buf: rendered[32] },
  { size: 48, buf: rendered[48] },
]))
writeFileSync(join(publicDir, 'apple-touch-icon.png'), rendered[180])
writeFileSync(join(iconsDir, 'icon-192.png'), rendered[192])
writeFileSync(join(iconsDir, 'icon-512.png'), rendered[512])

console.log('✓ favicon.svg, favicon.ico, apple-touch-icon.png, icons/icon-192.png, icons/icon-512.png')
