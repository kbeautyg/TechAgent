/* Суммы в документах — как в бухгалтерских бланках: 89 900,00 и прописью */

/** 89 900,00 — без знака рубля, с копейками */
export function formatMoney(amount: number): string {
  return amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const ONES_M = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять']
const ONES_F = ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять']
const TEENS = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать']
const TENS = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто']
const HUNDREDS = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']

/** Форма слова по числу: 1 рубль, 2 рубля, 5 рублей */
function plural(n: number, [one, few, many]: [string, string, string]): string {
  const n100 = n % 100
  const n10 = n % 10
  if (n100 >= 11 && n100 <= 19) return many
  if (n10 === 1) return one
  if (n10 >= 2 && n10 <= 4) return few
  return many
}

/** Число до 999 словами */
function triad(n: number, feminine: boolean): string[] {
  const words = [HUNDREDS[Math.floor(n / 100)]]
  const rest = n % 100
  if (rest >= 10 && rest <= 19) words.push(TEENS[rest - 10])
  else words.push(TENS[Math.floor(rest / 10)], (feminine ? ONES_F : ONES_M)[rest % 10])
  return words.filter(Boolean)
}

const SCALES: { forms: [string, string, string]; feminine: boolean }[] = [
  { forms: ['', '', ''], feminine: false },
  { forms: ['тысяча', 'тысячи', 'тысяч'], feminine: true },
  { forms: ['миллион', 'миллиона', 'миллионов'], feminine: false },
  { forms: ['миллиард', 'миллиарда', 'миллиардов'], feminine: false },
]

/** «Четыре тысячи четыреста девяносто пять рублей 00 копеек» */
export function rublesInWords(amount: number): string {
  const rub = Math.floor(Math.abs(amount))
  const kop = Math.round((Math.abs(amount) - rub) * 100)
  const words: string[] = []
  if (rub === 0) words.push('ноль')
  for (let i = SCALES.length - 1; i >= 0; i--) {
    const part = Math.floor(rub / 1000 ** i) % 1000
    if (part === 0) continue
    words.push(...triad(part, SCALES[i].feminine))
    if (i > 0) words.push(plural(part, SCALES[i].forms))
  }
  const text = `${words.join(' ')} ${plural(rub, ['рубль', 'рубля', 'рублей'])} ${String(kop).padStart(2, '0')} ${plural(kop, ['копейка', 'копейки', 'копеек'])}`
  return text[0].toUpperCase() + text.slice(1)
}
