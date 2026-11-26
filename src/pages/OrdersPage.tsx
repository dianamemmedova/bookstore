import { useEffect } from 'react'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import OrderCard from '../components/orders/OrderCard'
import EmptyOrdersState from '../components/orders/EmptyOrdersState'
import PageHero from '../components/shared/PageHero'

export default function OrdersPage() {
  const { orders, loading, reloadOrders } = useOrders()
  const { user } = useAuth()

  // Səhifə açılanda yenilənir: admin statusu dəyişmiş ola bilər
  useEffect(() => { void reloadOrders() }, [reloadOrders])

  if (!user) return <EmptyOrdersState variant="no-auth" />

  const active = orders.filter((o) => o.status === 'pending' || o.status === 'confirmed').length
  const delivered = orders.filter((o) => o.status === 'delivered').length
  const covers = orders.flatMap((o) => o.items.map((i) => i.cover))

  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Hesabım"
        title="Sifarişlərim"
        subtitle="Sifarişlərinizin vəziyyətini izləyin və detallara baxın."
        covers={covers}
        stats={orders.length > 0 ? [
          { value: orders.length, label: 'sifariş' },
          { value: active, label: 'aktiv' },
          { value: delivered, label: 'çatdırılıb' },
        ] : []}
      />

      <div className="mx-auto max-w-[1100px] px-4 py-6 lg:px-6">
        {orders.length === 0 && loading ? (
          <p className="py-16 text-center text-sm text-muted">Yüklənir...</p>
        ) : orders.length === 0 ? (
          <EmptyOrdersState variant="no-orders" />
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        )}
      </div>
    </div>
  )
}