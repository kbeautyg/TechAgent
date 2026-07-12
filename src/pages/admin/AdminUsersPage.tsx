import { mockUsers, mockOrders } from '../../data/mock'
import { formatDate, formatPrice } from '../../utils/calculate'

const th: React.CSSProperties = { textAlign: 'left', padding: '12px 16px', color: '#8891A5', fontWeight: 600 }
const td: React.CSSProperties = { padding: '12px 16px' }

export default function AdminUsersPage() {
  const clients = mockUsers.filter((u) => u.role === 'CLIENT')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'Unbounded',sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,1.8rem)', letterSpacing: '-.02em', margin: 0 }}>Партнёры</h1>
        <span style={{ fontSize: 13.5, color: '#8891A5' }}>{clients.length} партнёров</span>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E7E9F2', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
              <tr style={{ background: '#F7F8FC', borderBottom: '1px solid #EEF0F6' }}>
                {['Название', 'ИНН', 'Email', 'Телефон', 'Заказы', 'Сумма', 'Дата рег.'].map((h) => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {clients.map((user) => {
                const userOrders = mockOrders.filter((o) => o.userId === user.id)
                const totalSum = userOrders.reduce((s, o) => s + o.totalCost, 0)
                return (
                  <tr key={user.id} style={{ borderTop: '1px solid #F0F1F6' }}>
                    <td style={{ ...td, fontWeight: 600 }}>{user.companyName || '—'}</td>
                    <td style={{ ...td, color: '#5B647A', fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>{user.inn || '—'}</td>
                    <td style={{ ...td, color: '#5B647A' }}>{user.email}</td>
                    <td style={{ ...td, color: '#5B647A' }}>{user.phone || '—'}</td>
                    <td style={{ ...td, textAlign: 'center' }}>{userOrders.length}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{formatPrice(totalSum)}</td>
                    <td style={{ ...td, color: '#8891A5' }}>{formatDate(user.createdAt)}</td>
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
