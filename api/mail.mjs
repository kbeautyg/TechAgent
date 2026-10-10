/*
 * Письма покупателям и сотрудникам — через msmtp на сервере (тот же способ, что у заявок с сайта).
 * MAIL_CONFIG — свой файл msmtp, MAIL_ACCOUNT — аккаунт в нём, MAIL_FROM — ящик на techagent.pro, с которого уходят письма.
 * Пока ящик не заведён, письма не уходят: в журнал пишется только кому и о чём (без кода входа).
 */
import { spawn } from 'node:child_process'

/** Свой файл настроек msmtp (общий /etc/msmtprc серверу заказов не читается — он для других сайтов) */
const CONFIG = process.env.MAIL_CONFIG || ''
const ACCOUNT = process.env.MAIL_ACCOUNT || ''
const FROM = process.env.MAIL_FROM || ''
const FROM_NAME = 'TechAgent'
const DEV = process.env.DEV === '1'

export const mailReady = () => Boolean(ACCOUNT && FROM)

const b64 = (s) => Buffer.from(s, 'utf8').toString('base64')
const word = (s) => `=?UTF-8?B?${b64(s)}?=`

/** Отправить письмо. Ошибки не роняют сервер: заказ и статус уже записаны в базу */
export function sendMail(to, subject, text, replyTo) {
  if (!mailReady()) {
    console.log(`mail off → ${to}: ${subject}`)
    if (DEV) console.log(text)
    return
  }
  const headers = [
    `From: ${word(FROM_NAME)} <${FROM}>`,
    `To: ${to}`,
    `Subject: ${word(subject)}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
  ]
  const body = b64(text).replace(/.{76}/g, '$&\r\n')
  const args = [...(CONFIG ? ['-C', CONFIG] : []), '-a', ACCOUNT, '-f', FROM, '--', to]
  const p = spawn('msmtp', args, { stdio: ['pipe', 'ignore', 'pipe'] })
  let err = ''
  p.stderr.on('data', (d) => { err += d })
  p.on('error', (e) => console.error('msmtp не запустился:', e.message))
  p.on('close', (code) => {
    if (code === 0) console.log(`mail → ${to}: ${subject}`)
    else console.error(`mail FAILED (${code}) → ${to}: ${subject} ${err.trim()}`)
  })
  p.stdin.end(headers.join('\r\n') + '\r\n\r\n' + body + '\r\n')
}
