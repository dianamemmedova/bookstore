import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import OrderCard from '../components/orders/OrderCard'
import EmptyOrdersState from '../components/orders/EmptyOrdersState'

export default function OrdersPage() {
  const { orders } = useOrders()
  const { user } = useAuth()

  if (!user) return <EmptyOrdersState variant="no-auth" />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Sifarişlərim</h1>
            <p className="text-sm text-gray-400 mt-1">
              {orders.length > 0 ? `${orders.length} sifariş tapıldı` : 'Hələ sifariş yoxdur'}
            </p>
          </div>
          <Link to="/books"
            className="text-sm font-medium px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors rounded-md">
            Kitablara bax
          </Link>
        </div>

        {orders.length === 0 ? (
          <EmptyOrdersState variant="no-orders" />
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}