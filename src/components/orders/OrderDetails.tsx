import BookThumb from './BookThumb'
import OrderDeliveryInfo from './OrderDeliveryInfo'
import OrderPaymentSummary from './OrderPaymentSummary'
import { COVER_FALLBACK } from '../../constants/theme'
import type { Order } from '../../types/order'

interface Props {
  order: Order
}

export default function OrderDetails({ order }: Props) {
  return (
    <div className="border-t border-gray-100 px-5 py-5 space-y-5 bg-gray-50">
      {/* Kitablar siyahısı */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Kitablar</h4>
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <BookThumb
                id={item.id}
                title={item.title}
                cover={item.cover || COVER_FALLBACK}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                <p className="text-xs text-gray-400">{item.author}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-gray-900">₼{(item.price * item.quantity).toFixed(2)}</p>
                {item.quantity > 1 && (
                  <p className="text-xs text-gray-400">₼{item.price} × {item.quantity}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <OrderDeliveryInfo delivery={order.delivery} deliveryDate={order.deliveryDate} />
        <OrderPaymentSummary order={order} />
      </div>
    </div>
  )
}