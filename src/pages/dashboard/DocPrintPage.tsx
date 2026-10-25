import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { findDocument } from '../../data/partnerDocuments'
import { DocSheet } from '../../components/docs/DocSheet'
import { useDataRevision } from '../../utils/store'

/*
 * Документ на листе A4 — для печати и сохранения в PDF («Скачать» в документах кабинета и в админке).
 * Отчёт агента, акт и подтверждение акцепта — бланком, оферты и условия — размеченным текстом.
 * С ?print=1 сразу открывается окно печати. Страница открывается без меню сайта.
 */

export default function DocPrintPage() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const { pathname, search } = useLocation()
  const { user, loading } = useAuth()
  useDataRevision()

  const admin = pathname.startsWith('/admin/')
  const doc = findDocument(id, user)
  const autoPrint = params.get('print') === '1'

  /* Заголовок вкладки — это имя PDF при сохранении */
  const title = doc?.title
  useEffect(() => {
    if (title) document.title = title.replace(/\//g, '-')
  }, [title])

  useEffect(() => {
    if (!title || !autoPrint) return
    const t = window.setTimeout(() => window.print(), 400)
    return () => window.clearTimeout(t)
  }, [title, autoPrint])

  // Сервер ещё не ответил, кто вошёл
  if (loading) return <div className="paper-root" aria-busy="true" />

  // Документ Партнёра без входа не открываем: после входа вернём сюда же
  if (!doc && !user) {
    return <Navigate to="/login/partner" replace state={{ from: pathname + search }} />
  }

  const back = admin ? '/admin/reports' : '/dashboard/documents'

  return (
    <div className="paper-root">
      <div className="paper-toolbar">
        {doc && (
          <button type="button" onClick={() => window.print()} className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold">
            Сохранить PDF или распечатать
          </button>
        )}
        <Link to={back} className="text-sm text-text-secondary no-underline hover:text-primary">
          Вернуться к документам
        </Link>
      </div>
      {doc ? (
        <div className="paper-page">
          <DocSheet doc={doc} />
        </div>
      ) : (
        <div className="paper-page paper-missing">Документ не найден или недоступен.</div>
      )}
    </div>
  )
}
