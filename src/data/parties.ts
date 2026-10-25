import type { DocParty, User } from '../types'

/* Стороны в документах кабинета: реквизиты ТехЭйджент и Партнёра на дату формирования документа */

export const PRINCIPAL_PARTY: DocParty = {
  name: 'ООО «ТехЭйджент»',
  details: [
    'ИНН 9909766511, КПП 771387001 (Российская Федерация)',
    'ИНН 00403202610304, рег. № 326302-3301-ООО (Кыргызская Республика)',
    'Адрес: Кыргызская Республика, г. Бишкек, Октябрьский район, 8 мкр, д. 33, кв. 8',
    'Р/с 40807810900000001482 в АО «ТБанк»',
    'БИК 044525974, к/с 30101810145250000974',
  ],
  signerTitle: 'Директор',
  signerName: 'Аширбеков Н.М.Т.',
}

const ogrnLabel = (ogrn?: string) => (ogrn && ogrn.length === 15 ? 'ОГРНИП' : 'ОГРН')

/** Реквизиты Партнёра из анкеты. Пустые поля в документ не попадают */
export function partnerParty(p: User): DocParty {
  return {
    name: p.companyName || p.email,
    details: [
      p.inn ? `ИНН ${p.inn}` : '',
      p.ogrn ? `${ogrnLabel(p.ogrn)} ${p.ogrn}` : '',
      p.pointAddress ? `Пункт выдачи: ${p.pointAddress}` : '',
      p.account ? `Р/с ${p.account}${p.bankName ? ` в ${p.bankName}` : ''}` : '',
      p.bik ? `БИК ${p.bik}` : '',
    ].filter(Boolean),
  }
}
