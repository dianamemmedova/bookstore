import { getPayMethodLabel } from '../../utils/orderUtils'
import OrderDetailsRow from './OrderDetailsRow'
import Icon from '../ui/Icon'
import type { Order } from '../../types/order'

export default function OrderPaymentSummary({ order }: { order: Order }) {
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <h4 className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">
        <Icon name="payments" size={15} className="text-muted-gold-text" /> Ödəniş xülasəsi
      </h4>
      <div className="space-y-1.5">
        <OrderDetailsRow label="Aralıq cəm" value={`₼${order.subtotal.toFixed(2)}`} />
        {order.discountAmount > 0 && (
          <OrderDetailsRow label="Endirim" value={`−₼${order.discountAmount.toFixed(2)}`} valueColor="#15803d" />
        )}
        {order.promoCode && <OrderDetailsRow label="Promo kod" value={order.promoCode} />}
        <OrderDetailsRow label="Çatdırılma" value={order.deliveryFee === 0 ? 'Pulsuz' : `₼${order.deliveryFee.toFixed(2)}`} />
        <OrderDetailsRow label="Ödəniş üsulu" value={getPayMethodLabel(order.payMethod)} />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-xs font-bold uppercase tracking-wider text-ink">Cəmi</span>
        <span className="tabular font-display text-lg font-bold text-primary">₼{order.finalTotal.toFixed(2)}</span>
      </div>
    </div>
  )
}