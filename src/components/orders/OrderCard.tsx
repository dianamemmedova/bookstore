import { useState } from 'react'
import { useOrders } from '../../context/OrderContext'
import OrderHeader from './OrderHeader'
import OrderThumbnails from './OrderThumbnails'
import OrderDetails from './OrderDetails'
import type { Order } from '../../types/order'

function canCancel(order: Order): boolean {
  if (order.status !== 'confirmed' && order.status !== 'pending') return false
  if (!order.deliveryDate) return true
  
  const delivery = new Date(order.deliveryDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  delivery.setHours(0, 0, 0, 0)
  
  const diffDays = Math.ceil((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays > 2
}

interface Props {
  order: Order
}

export default function OrderCard({ order }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const { cancelOrder } = useOrders()

  const cancellable = canCancel(order)
  const active = order.status === 'confirmed' || order.status === 'pending'

  const handleCancel = async () => {
    setBusy(true)
    setError('')
    const err = await cancelOrder(order.id)
    if (err) setError(err)
    setBusy(false)
  }

  return (
    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
      <OrderHeader order={order} expanded={expanded} onToggle={() => setExpanded(e => !e)} />
      <OrderThumbnails items={order.items} />
      {expanded && <OrderDetails order={order} />}

      {(cancellable || (active && !cancellable)) && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
          
          <div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {active && !cancellable && (
              <p className="text-xs text-amber-600">
                ⚠️ Çatdırılmaya 2 gün və ya az qaldığı üçün ləğv edilə bilməz
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {cancellable && (
              <button onClick={handleCancel} disabled={busy}
                className="text-sm font-medium text-amber-600 hover:text-amber-800 border border-amber-200 hover:border-amber-400 px-4 py-1.5 rounded transition-colors disabled:opacity-60">
                {busy ? 'Ləğv edilir...' : 'Ləğv et'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}