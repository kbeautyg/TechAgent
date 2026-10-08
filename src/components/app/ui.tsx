/*
 * Детали кабинета «как в мобильном банке»: верхняя полоса экрана, выезжающая снизу панель,
 * прилипающая к низу кнопка. На компьютере те же экраны выглядят как раньше — с заголовком и карточками.
 */
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import { useIsDesktop } from './useIsDesktop'

/**
 * Шапка экрана. На телефоне — полоса: круглая «назад», название по центру, справа действие.
 * На компьютере — ссылка «назад» и заголовок h1, как на остальных страницах кабинета.
 */
export function PageBar({
  back,
  onBack,
  backLabel = 'Назад',
  title,
  right,
  extra,
}: {
  back?: string
  /** Вместо перехода по ссылке — свой шаг назад (например, предыдущий шаг формы) */
  onBack?: () => void
  backLabel?: string
  title: string
  right?: ReactNode
  /** Что стоит рядом с заголовком на компьютере (например, статус заказа) */
  extra?: ReactNode
}) {
  return (
    <>
      <div className="app-bar lg:hidden">
        {onBack ? (
          <button type="button" onClick={onBack} className="app-round" aria-label={backLabel}>
            <ChevronLeft size={24} />
          </button>
        ) : back ? (
          <Link to={back} className="app-round" aria-label={backLabel}>
            <ChevronLeft size={24} />
          </Link>
        ) : (
          <span className="app-round-spacer" />
        )}
        <h1 className="app-bar-title">{title}</h1>
        {right ?? <span className="app-round-spacer" />}
      </div>
      <div className="hidden lg:block">
        {back && (
          <Link
            to={back}
            className="inline-flex items-center gap-1 text-text-secondary hover:text-primary text-sm mb-4 no-underline"
          >
            <ChevronLeft size={16} />
            {backLabel}
          </Link>
        )}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
          {extra}
        </div>
      </div>
    </>
  )
}

/** Кнопка, прилипающая к низу экрана на телефоне. На компьютере не показывается — там действия на странице */
export function StickyBar({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <>
      <div className="app-sticky-spacer lg:hidden" aria-hidden="true" />
      <div className="app-sticky lg:hidden">
        {children}
        {hint && <p className="app-sticky-hint">{hint}</p>}
      </div>
    </>
  )
}

/** Панель, выезжающая снизу: закрывается свайпом вниз, касанием по затемнению, крестиком и Esc */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const [drag, setDrag] = useState(0)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const onStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY }
  const onMove = (e: React.TouchEvent) => {
    if (startY.current === null) return
    setDrag(Math.max(0, e.touches[0].clientY - startY.current))
  }
  const onEnd = () => {
    if (drag > 90) onClose()
    setDrag(0)
    startY.current = null
  }

  return createPortal(
    <div className="app-sheet-root" role="dialog" aria-modal="true" aria-label={title}>
      <div className="app-sheet-dim" onClick={onClose} />
      <div className="app-sheet" style={drag ? { transform: `translateY(${drag}px)`, transition: 'none' } : undefined}>
        <div className="app-sheet-head" onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}>
          <div className="app-sheet-grab" />
          <div className="flex items-center gap-3">
            <h2 className="app-sheet-title">{title}</h2>
            <button type="button" onClick={onClose} className="app-sheet-close" aria-label="Закрыть">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="app-sheet-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

/**
 * Блок действия (приёмка, выдача): на компьютере — карточка на странице,
 * на телефоне — выезжающая панель, которую открывает кнопка внизу экрана.
 */
export function ActionPanel({
  title,
  icon,
  open,
  onClose,
  highlight = false,
  children,
}: {
  title: string
  icon?: ReactNode
  open: boolean
  onClose: () => void
  highlight?: boolean
  children: ReactNode
}) {
  const desktop = useIsDesktop()
  if (!desktop) {
    return (
      <Sheet open={open} onClose={onClose} title={title}>
        {children}
      </Sheet>
    )
  }
  return (
    <div className={`app-group p-5 ${highlight ? 'border-2 border-primary/30' : ''}`}>
      <h2 className="font-bold mb-3 flex items-center gap-2 text-text-primary">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  )
}

/** Круглая иконка-кнопка для правой части шапки экрана */
export function RoundLink({ to, label, children }: { to: string; label: string; children: ReactNode }) {
  return (
    <Link to={to} className="app-round" aria-label={label}>
      {children}
    </Link>
  )
}
