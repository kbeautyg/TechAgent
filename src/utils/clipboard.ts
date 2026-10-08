/** Скопировать текст в буфер. false — буфера нет (не https, старый браузер) или браузер не дал доступ */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) return false
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Выделить текст элемента — чтобы скопировать вручную, если буфер недоступен */
export function selectText(el: HTMLElement | null): void {
  const sel = typeof window !== 'undefined' ? window.getSelection() : null
  if (!el || !sel) return
  const range = document.createRange()
  range.selectNodeContents(el)
  sel.removeAllRanges()
  sel.addRange(range)
}
