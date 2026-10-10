/*
 * Пароль для входа сотрудников ТехЭйджент в раздел заказов (techagent.pro/staff).
 * Запускает владелец на сервере: ввод скрыт, в настройки пишется только хэш (scrypt), сервер перезапускается.
 *   ssh -t srv91 /opt/techagent-api/bin/node /opt/techagent-api/set-staff-password.mjs
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import { execSync } from 'node:child_process'

const ENV_FILE = process.env.ENV_FILE || '/etc/techagent-api.env'

function ask(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt)
    const stdin = process.stdin
    stdin.setRawMode?.(true)
    stdin.resume()
    let s = ''
    const onData = (buf) => {
      for (const ch of buf.toString('utf8')) {
        if (ch === '\r' || ch === '\n') {
          stdin.setRawMode?.(false)
          stdin.pause()
          stdin.off('data', onData)
          process.stdout.write('\n')
          return resolve(s)
        }
        if (ch === '\u0003') process.exit(1)
        if (ch === '\u007f') s = s.slice(0, -1)
        else s += ch
      }
    }
    stdin.on('data', onData)
  })
}

const p1 = await ask('Новый пароль сотрудников (не меньше 10 символов): ')
if (p1.length < 10) {
  console.log('Слишком короткий — ничего не изменено.')
  process.exit(1)
}
const p2 = await ask('Ещё раз: ')
if (p1 !== p2) {
  console.log('Пароли не совпали — ничего не изменено.')
  process.exit(1)
}
const salt = crypto.randomBytes(16)
const hash = crypto.scryptSync(p1, salt, 64)
const line = `STAFF_PASSWORD_HASH=scrypt$${salt.toString('base64')}$${hash.toString('base64')}`
const old = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : ''
const next = old.match(/^STAFF_PASSWORD_HASH=.*$/m) ? old.replace(/^STAFF_PASSWORD_HASH=.*$/m, line) : old.replace(/\n?$/, '\n') + line + '\n'
fs.writeFileSync(ENV_FILE, next, { mode: 0o640 })
try {
  execSync('systemctl restart techagent-api', { stdio: 'ignore' })
} catch { /* локально systemd нет */ }
console.log('Готово: пароль задан, сервер заказов перезапущен.')
