/*
 * Ежедневная копия базы заказов: /var/backups/techagent-api/techagent-ГГГГ-ММ-ДД.db, хранится 30 последних.
 * Копия снимается на ходу (VACUUM INTO) — сервер не останавливается. Запуск — таймер systemd techagent-api-backup.
 * Фото из пунктов выдачи и подписанные акты (FILES_DIR) копируются в /var/backups/techagent-api/files:
 * файлы не меняются после загрузки, поэтому докопируются только новые, удалённых в копии нет.
 */
import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'
import path from 'node:path'

const DB = process.env.DB_PATH || '/var/lib/techagent-api/techagent.db'
const DIR = process.env.BACKUP_DIR || '/var/backups/techagent-api'
const FILES = process.env.FILES_DIR || path.join(path.dirname(DB), 'files')
const KEEP = 30

fs.mkdirSync(DIR, { recursive: true, mode: 0o750 })
const file = path.join(DIR, `techagent-${new Date().toISOString().slice(0, 10)}.db`)
fs.rmSync(file, { force: true })
const db = new DatabaseSync(DB, { readOnly: true })
db.exec(`VACUUM INTO '${file.replace(/'/g, "''")}'`)
db.close()
const old = fs.readdirSync(DIR).filter((f) => /^techagent-\d{4}-\d{2}-\d{2}\.db$/.test(f)).sort().slice(0, -KEEP)
for (const f of old) fs.rmSync(path.join(DIR, f))
console.log(`backup ${file}`)

let copied = 0
if (fs.existsSync(FILES)) {
  for (const order of fs.readdirSync(FILES)) {
    const from = path.join(FILES, order)
    if (!fs.statSync(from).isDirectory()) continue
    const to = path.join(DIR, 'files', order)
    fs.mkdirSync(to, { recursive: true })
    for (const f of fs.readdirSync(from)) {
      if (fs.existsSync(path.join(to, f))) continue
      fs.copyFileSync(path.join(from, f), path.join(to, f))
      copied++
    }
  }
}
console.log(`files +${copied}`)
