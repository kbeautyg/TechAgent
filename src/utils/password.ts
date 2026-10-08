/** SHA-256 от id учётки и пароля: пароль в открытом виде не хранится */
export async function hashPassword(userId: string, password: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${userId}:${password}`))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

/** Временный пароль для приглашения: 10 знаков без похожих букв и цифр (0/O, 1/l/I) */
export function tempPassword(): string {
  const abc = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(10))
  return Array.from(bytes, (b) => abc.charAt(b % abc.length)).join('')
}
