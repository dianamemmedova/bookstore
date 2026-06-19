import { PRIMARY } from '../../constants/theme'
import { getPayMethodLabel } from '../../utils/orderUtils'
import OrderDetailsRow from './OrderDetailsRow'
import type { Order } from '../../types/order'

interface Props {
  order: Order
}

export default function OrderPaymentSummary({ order }: Props) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Ödəniş xülasəsi</h4>
      <div className="space-y-1.5">
        <OrderDetailsRow label="Aralıq cəm" value={`₼${order.subtotal.toFixed(2)}`} />
        {order.discountAmount > 0 && (
          <OrderDetailsRow label="Endirim" value={`−₼${order.discountAmount.toFixed(2)}`} valueColor="#16a34a" />
        )}
        {order.promoCode && (
          <OrderDetailsRow label="Promo kod" value={order.promoCode} />
        )}
        <OrderDetailsRow
          label="Çatdırılma"
          value={order.deliveryFee === 0 ? 'Pulsuz' : `₼${order.deliveryFee.toFixed(2)}`}
        />
        <OrderDetailsRow label="Ödəniş üsulu" value={getPayMethodLabel(order.payMethod)} />
      </div>
      <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Cəmi</span>
        <span className="text-base font-bold" style={{ color: PRIMARY }}>
          ₼{order.finalTotal.toFixed(2)}
        </span>
      </div>
    </div>
  )
}