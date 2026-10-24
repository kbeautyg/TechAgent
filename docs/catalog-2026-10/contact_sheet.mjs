import sharp from 'sharp'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
const base = '/Users/berryberry.ru/TechAgent/public/images/p'
const all = readdirSync(base).flatMap((d) => readdirSync(join(base, d)).map((f) => join(base, d, f)))
const start = Number(process.argv[2] || 0), n = 48, cell = 180, cols = 8
const pick = all.slice(start, start + n)
const comps = await Promise.all(pick.map(async (f, i) => ({ input: await sharp(f).resize(cell - 8, cell - 8).toBuffer(), left: (i % cols) * cell + 4, top: Math.floor(i / cols) * cell + 4 })))
await sharp({ create: { width: cols * cell, height: Math.ceil(pick.length / cols) * cell, channels: 3, background: '#d9dde6' } }).composite(comps).png().toFile(process.argv[3])
console.log(all.length, pick.length)
