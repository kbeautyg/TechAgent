import type { ReactNode } from 'react'

/** Статус словом: тёмный текст, слева тонкая черта цвета этапа. sm — для строк списков и таблиц */
export default function StatusMark({ color, children, size = 'md' }: { color: string; children: ReactNode; size?: 'md' | 'sm' }) {
  return (
    <span className={`status-mark ${size === 'sm' ? 'status-mark-sm' : ''}`} style={{ borderLeftColor: color }}>
      {children}
    </span>
  )
}
