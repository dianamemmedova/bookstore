import { useState } from 'react'
import { useOrders } from '../../context/OrderContext'
import OrderHeader from './OrderHeader'
import OrderThumbnails from './OrderThumbnails'
import OrderDetails from './OrderDetails'
import type { Order } from '../../types/order'

function canCancel(order: Order): boolean {
  if (order.status !== 'confirmed') return false
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
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { cancelOrder, deleteOrder } = useOrders()

  const cancellable = canCancel(order)
  const deletable = order.status === 'cancelled'


  return (
    <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
      <OrderHeader order={order} expanded={expanded} onToggle={() => setExpanded(e => !e)} />
      <OrderThumbnails items={order.items} />
      {expanded && <OrderDetails order={order} />}

      {(cancellable || deletable || (order.status === 'confirmed' && !cancellable)) && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
          
          <div>
            {order.status === 'confirmed' && !cancellable && (
              <p className="text-xs text-amber-600">
                ⚠️ Çatdırılmaya 2 gün və ya az qaldığı üçün ləğv edilə bilməz
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {cancellable && (
              <button  onClick={() => cancelOrder(order.id)}
                className="text-sm font-medium text-amber-600 hover:text-amber-800 border border-amber-200 hover:border-amber-400 px-4 py-1.5 rounded transition-colors" >
                  Ləğv et
              </button>
            )}

            {deletable && (
              !confirmDelete ? (
                <button onClick={() => setConfirmDelete(true)}
                  className="text-sm font-medium text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-4 py-1.5 rounded transition-colors"  >
                    Sil
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    Əminsiniz?
                  </span>
                  <button  onClick={() => deleteOrder(order.id)}
                    className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded transition-colors" >
                      Bəli, sil
                  </button>
                  <button  onClick={() => setConfirmDelete(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 border border-gray-200 rounded transition-colors" >
                      Xeyr
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}