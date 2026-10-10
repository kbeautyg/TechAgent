import { Link, Navigate } from 'react-router-dom'
import { ChevronRight, ShoppingBag, Store } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAccount } from '../utils/account'

/** Две двери входа: у покупателей и партнёров разные кабинеты */
export function LoginDoors({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'login-doors login-doors-compact' : 'login-doors'}>
      <Link to="/login/buyer" className="login-door">
        <ShoppingBag size={30} strokeWidth={1.7} className="text-primary flex-none" />
        <span className="login-door-tx">
          <b>Я покупатель</b>
          <span>Мои заказы, оплата, доставка СДЭК, возврат</span>
        </span>
        <ChevronRight size={20} className="text-text-muted flex-none" />
      </Link>
      <Link to="/login/partner" className="login-door login-door-partner">
        <Store size={30} strokeWidth={1.7} className="text-text-secondary flex-none" />
        <span className="login-door-tx">
          <b>Я партнёр</b>
          <span>{compact ? 'Кабинет пункта выдачи' : 'Кабинет пункта выдачи: заказы покупателей, выдача, документы'}</span>
        </span>
        <ChevronRight size={20} className="text-text-muted flex-none" />
      </Link>
      <p className="login-doors-foot">
        Хотите стать партнёром? <Link to="/register">Оставить заявку</Link>
      </p>
    </div>
  )
}

export default function LoginChooserPage() {
  const { user } = useAuth()
  const account = useAccount()
  if (user) return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />
  if (account.role === 'buyer') return <Navigate to="/account" replace />
  if (account.role === 'staff') return <Navigate to="/staff" replace />
  return (
    <div className="acc-narrow">
      <h1 className="acc-h1">Вход</h1>
      <p className="acc-lead">Выберите, кто вы — у покупателей и партнёров разные кабинеты.</p>
      <LoginDoors />
    </div>
  )
}
