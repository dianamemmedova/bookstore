import { Link } from 'react-router-dom'
import OrderDeliveryInfo from './OrderDeliveryInfo'
import OrderPaymentSummary from './OrderPaymentSummary'
import OrderProgress from './OrderProgress'
import BookThumb from './BookThumb'
import { COVER_FALLBACK } from '../../constants/theme'
import type { Order } from '../../types/order'

export default function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="space-y-4 border-t border-line bg-surface px-4 py-4">
      <OrderProgress status={order.status} />

      <div className="rounded-md border border-line bg-white p-4">
        <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted">Kitablar</h4>
        <div className="divide-y divide-line">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
              <BookThumb id={item.id} title={item.title} cover={item.cover || COVER_FALLBACK} size="sm" />
              <div className="min-w-0 flex-1">
                <Link to={`/books/${item.id}`} className="line-clamp-1 text-[13px] font-semibold text-ink hover:underline">{item.title}</Link>
                <p className="text-xs text-muted">{item.author}</p>
              </div>
              <div className="tabular flex-shrink-0 text-right">
                <p className="text-sm font-semibold text-ink">₼{(item.price * item.quantity).toFixed(2)}</p>
                {item.quantity > 1 && <p className="text-xs text-muted">₼{item.price} × {item.quantity}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <OrderDeliveryInfo delivery={order.delivery} deliveryDate={order.deliveryDate} />
        <OrderPaymentSummary order={order} />
      </div>
    </div>
  )
}