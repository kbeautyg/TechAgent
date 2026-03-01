import { mockUsers, mockOrders } from '../../data/mock'
import { formatDate, formatPrice } from '../../utils/calculate'

export default function AdminUsersPage() {
  const clients = mockUsers.filter((u) => u.role === 'CLIENT')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Партнёры</h1>
        <span className="text-text-muted text-sm">{clients.length} партнеров</span>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-light">
                <th className="text-left px-4 py-3 font-medium text-text-muted">Название</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">ИНН</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Email</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Телефон</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Заказы</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Сумма</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">Дата рег.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((user) => {
                const userOrders = mockOrders.filter((o) => o.userId === user.id)
                const totalSum = userOrders.reduce((s, o) => s + o.totalCost, 0)
                return (
                  <tr key={user.id} className="hover:bg-bg-light transition-colors">
                    <td className="px-4 py-3 font-medium text-text-primary">{user.companyName || '—'}</td>
                    <td className="px-4 py-3 text-text-secondary font-mono text-xs">{user.inn || '—'}</td>
                    <td className="px-4 py-3 text-text-secondary">{user.email}</td>
                    <td className="px-4 py-3 text-text-secondary">{user.phone || '—'}</td>
                    <td className="px-4 py-3 text-center text-text-primary">{userOrders.length}</td>
                    <td className="px-4 py-3 font-medium text-text-primary">{formatPrice(totalSum)}</td>
                    <td className="px-4 py-3 text-text-muted">{formatDate(user.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
