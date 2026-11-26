import { useState } from 'react'
import { useOrders } from '../../context/OrderContext'
import OrderHeader from './OrderHeader'
import OrderThumbnails from './OrderThumbnails'
import OrderDetails from './OrderDetails'
import Icon from '../ui/Icon'
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
    <article className="overflow-hidden rounded-md border border-line bg-white">
      <OrderHeader order={order} expanded={expanded} onToggle={() => setExpanded(e => !e)} />
      <OrderThumbnails items={order.items} />
      {expanded && <OrderDetails order={order} />}

      {active && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-panel px-4 py-2.5">
          <div>
            {error && <p className="text-xs text-sale">{error}</p>}
            {!cancellable && (
              <p className="flex items-center gap-1 text-xs text-muted-gold-text">
                <Icon name="info" size={14} /> Çatdırılmaya 2 gün və ya az qaldığı üçün ləğv edilə bilməz
              </p>
            )}
          </div>
          {cancellable && (
            <button
              onClick={handleCancel}
              disabled={busy}
              className="rounded-sm border border-line-strong bg-white px-3 py-1.5 text-xs font-medium text-sale transition-colors hover:bg-sale-soft disabled:opacity-60"
            >
              {busy ? 'Ləğv edilir...' : 'Ləğv et'}
            </button>
          )}
        </div>
      )}
    </article>
  )
}