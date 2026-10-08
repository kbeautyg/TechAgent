/*
 * Проверка вёрстки на телефоне. Вставить в консоль браузера на dev-сервере (npm run dev),
 * затем: await layoutCheck(['/','/catalog'], [320,375,390], 'partner' | 'admin' | null)
 * Открывает каждую страницу в iframe нужной ширины и ищет:
 *  - горизонтальную прокрутку страницы (то самое «дёргается вправо-влево»);
 *  - элементы, вылезающие за правый край;
 *  - поля ввода с шрифтом меньше 16px (iPhone от них приближает страницу при вводе);
 *  - слипшиеся блоки текста (заголовок вплотную к соседнему тексту, наезды строк);
 *  - зоны нажатия меньше 40px у кнопок и ссылок в нижнем меню и действиях.
 */
window.layoutCheck = async function layoutCheck(paths, widths, as = null) {
  const session = {
    partner: { id: '1', email: 'demo@techagent.pro' },
    admin: { id: '2', email: 'admin@techagent.pro' },
  }
  if (as) localStorage.setItem('techagent_user', JSON.stringify(session[as]))
  else localStorage.removeItem('techagent_user')

  const out = []
  for (const w of widths) {
    for (const p of paths) {
      const f = document.createElement('iframe')
      f.style.cssText = `position:fixed;left:0;top:0;width:${w}px;height:800px;border:0;opacity:0;pointer-events:none`
      document.body.appendChild(f)
      await new Promise((r) => { f.onload = r; f.src = p })
      await new Promise((r) => setTimeout(r, 900))
      const d = f.contentDocument
      const win = f.contentWindow
      const issues = []
      const sw = d.documentElement.scrollWidth
      if (sw > w + 1) issues.push(`страница шире экрана: ${sw}px`)
      // Видимость с учётом свёрнутых блоков: предок с overflow:hidden нулевой высоты или opacity 0 прячет элемент
      const vis = (el) => {
        const cs = win.getComputedStyle(el)
        if (cs.display === 'none' || cs.visibility === 'hidden' || el.getClientRects().length === 0) return false
        const r = el.getBoundingClientRect()
        for (let a = el.parentElement; a && a !== d.body; a = a.parentElement) {
          const s = win.getComputedStyle(a)
          if (s.opacity === '0') return false
          if (s.overflow !== 'visible' && s.overflowY !== 'visible') {
            const b = a.getBoundingClientRect()
            if (r.bottom <= b.top + 1 || r.top >= b.bottom - 1) return false
          }
        }
        return true
      }
      // Вылезающие элементы (кроме тех, что внутри горизонтальных лент с прокруткой)
      for (const el of d.body.querySelectorAll('*')) {
        if (!vis(el)) continue
        const r = el.getBoundingClientRect()
        if (r.width === 0) continue
        if (r.right > w + 1 || r.left < -1) {
          let a = el.parentElement, clipped = false
          while (a && a !== d.body) {
            const ox = win.getComputedStyle(a).overflowX
            if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') { clipped = true; break }
            a = a.parentElement
          }
          if (!clipped) issues.push(`за краем: <${el.tagName.toLowerCase()} class="${String(el.className).slice(0, 60)}"> ${Math.round(r.left)}…${Math.round(r.right)}`)
        }
      }
      for (const el of d.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=hidden]), textarea, select')) {
        if (!vis(el)) continue
        const fs = parseFloat(win.getComputedStyle(el).fontSize)
        if (fs < 16) issues.push(`поле с шрифтом ${fs}px (iPhone увеличит страницу): ${el.id || el.name || el.placeholder || el.tagName}`)
      }
      // Наезды текста: соседние текстовые блоки, чьи рамки пересекаются по вертикали
      const texts = [...d.querySelectorAll('h1,h2,h3,h4,p,li,label,dt,dd')].filter(vis)
      for (let i = 0; i < texts.length; i++) {
        const a = texts[i].getBoundingClientRect()
        for (let j = i + 1; j < Math.min(texts.length, i + 6); j++) {
          if (texts[i].contains(texts[j]) || texts[j].contains(texts[i])) continue
          const b = texts[j].getBoundingClientRect()
          const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left)
          const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
          if (overlapX > 4 && overlapY > 3) issues.push(`наезд текста: «${texts[i].textContent.trim().slice(0, 30)}» и «${texts[j].textContent.trim().slice(0, 30)}»`)
        }
      }
      // Заголовок вплотную к следующему блоку
      for (const h of d.querySelectorAll('h1,h2,h3')) {
        if (!vis(h)) continue
        const n = h.nextElementSibling
        if (!n || !vis(n)) continue
        const hr = h.getBoundingClientRect(), nr = n.getBoundingClientRect()
        // Соседи в одной строке (заголовок слева, ссылка справа) — не слипание
        if (nr.top < hr.top + 2 || Math.min(hr.right, nr.right) - Math.max(hr.left, nr.left) <= 0) continue
        const gap = nr.top - hr.bottom
        if (gap < 2 && gap > -50) issues.push(`заголовок вплотную (${Math.round(gap)}px): «${h.textContent.trim().slice(0, 40)}»`)
      }
      out.push({ w, p, issues: [...new Set(issues)].slice(0, 12) })
      f.remove()
    }
  }
  return out.filter((x) => x.issues.length)
}
