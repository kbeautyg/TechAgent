/**
 * Фото каталога в одном виде: квадрат 900×900, белый фон, товар по центру, занимает 88 % по большей стороне.
 * 1) прозрачность → белый; 2) однотонный цветной/серый фон, касающийся краёв, заливается белым (заливка от краёв);
 * 3) рамка по пикселям, заметно отличающимся от белого; 4) товар вписывается в квадрат.
 * Источник — ~/TechAgent/.img-raw/<sha1>.<ext> (img_download.py), список — images-map.json (emit_products.py).
 *   node docs/catalog-2026-10/process_images.mjs [только-пути-содержащие]
 */
import sharp from 'sharp'
import { readFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const raw = join(root, '.img-raw')
const map = JSON.parse(readFileSync(join(here, 'images-map.json'), 'utf8'))
const files = readdirSync(raw)
const only = process.argv[2] || ''
const SIZE = 900
const INNER = Math.round(SIZE * 0.88)
const MAXW = 2000

async function prepare(file) {
  const img = sharp(file, { failOn: 'none' }).rotate()
  const meta = await img.metadata()
  const scale = Math.min(1, MAXW / Math.max(meta.width, meta.height))
  const { data, info } = await img
    .resize(Math.round(meta.width * scale), Math.round(meta.height * scale))
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const px = Buffer.alloc(w * h * 3)
  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    const a = data[i + 3] / 255
    px[j] = Math.round(data[i] * a + 255 * (1 - a))
    px[j + 1] = Math.round(data[i + 1] * a + 255 * (1 - a))
    px[j + 2] = Math.round(data[i + 2] * a + 255 * (1 - a))
  }
  // Цвет фона — по углам
  const at = (x, y) => { const k = (y * w + x) * 3; return [px[k], px[k + 1], px[k + 2]] }
  const corners = [at(1, 1), at(w - 2, 1), at(1, h - 2), at(w - 2, h - 2)]
  const bg = [0, 1, 2].map((c) => corners.map((p) => p[c]).sort((a, b) => a - b)[1])
  const notWhite = bg.some((v) => v < 250)
  const sameCorners = corners.every((p) => p.every((v, c) => Math.abs(v - bg[c]) < 10))
  if (notWhite && sameCorners) {
    // Заливка от краёв: всё, что похоже на фон и связано с краем, становится белым
    const tol = 14
    const seen = new Uint8Array(w * h)
    const stack = []
    const push = (x, y) => { const i = y * w + x; if (!seen[i]) { seen[i] = 1; stack.push(i) } }
    for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
    for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
    while (stack.length) {
      const i = stack.pop(); const k = i * 3
      if (Math.abs(px[k] - bg[0]) > tol || Math.abs(px[k + 1] - bg[1]) > tol || Math.abs(px[k + 2] - bg[2]) > tol) continue
      px[k] = px[k + 1] = px[k + 2] = 255
      const x = i % w, y = (i / w) | 0
      if (x > 0) push(x - 1, y); if (x < w - 1) push(x + 1, y); if (y > 0) push(x, y - 1); if (y < h - 1) push(x, y + 1)
    }
  }
  // Рамка товара: строки и столбцы, где есть хотя бы несколько заметно не-белых пикселей
  const ink = (k) => px[k] < 238 || px[k + 1] < 238 || px[k + 2] < 238
  let x0 = w, y0 = h, x1 = -1, y1 = -1
  const colCount = new Uint32Array(w), rowCount = new Uint32Array(h)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (ink((y * w + x) * 3)) { colCount[x]++; rowCount[y]++ }
  const minRun = Math.max(2, Math.round(Math.min(w, h) * 0.002))
  for (let x = 0; x < w; x++) if (colCount[x] >= minRun) { x0 = Math.min(x0, x); x1 = Math.max(x1, x) }
  for (let y = 0; y < h; y++) if (rowCount[y] >= minRun) { y0 = Math.min(y0, y); y1 = Math.max(y1, y) }
  if (x1 < 0) { x0 = 0; y0 = 0; x1 = w - 1; y1 = h - 1 }
  const pad = Math.round(Math.max(x1 - x0, y1 - y0) * 0.01)
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad)
  return { buf: await sharp(px, { raw: { width: w, height: h, channels: 3 } })
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).png().toBuffer(), cw: x1 - x0 + 1, ch: y1 - y0 + 1 }
}

let ok = 0, missing = 0, failed = 0
const small = []
for (const [out, sha] of Object.entries(map)) {
  if (only && !out.includes(only)) continue
  const src = files.find((f) => f.startsWith(sha))
  if (!src) { missing++; continue }
  const dest = join(root, 'public', out)
  mkdirSync(dirname(dest), { recursive: true })
  try {
    const { buf, cw, ch } = await prepare(join(raw, src))
    if (Math.max(cw, ch) < 450) small.push(`${out} (${cw}×${ch})`)
    const fitted = await sharp(buf).resize(INNER, INNER, { fit: 'inside', kernel: 'lanczos3' }).toBuffer()
    await sharp({ create: { width: SIZE, height: SIZE, channels: 3, background: '#ffffff' } })
      .composite([{ input: fitted, gravity: 'center' }])
      .webp({ quality: 86, effort: 5 })
      .toFile(dest)
    ok++
  } catch (e) {
    failed++
    console.error('ERR', out, src, e.message)
  }
}
console.log(`готово ${ok}, нет исходника ${missing}, ошибок ${failed}`)
if (small.length) console.log('товар на исходнике меньше 450 px:\n  ' + small.join('\n  '))
