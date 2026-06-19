import { formatDateAz } from '../../utils/date'
import { getOrderAddress } from '../../utils/orderUtils'
import OrderDetailsRow from './OrderDetailsRow'
import type{ Delivery } from '../../types/order'



export default function OrderDeliveryInfo({ delivery, deliveryDate }: Delivery) {
  const address = getOrderAddress(delivery)
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Çatdırılma ünvanı</h4>
      <div className="space-y-1.5">
        <OrderDetailsRow label="Ad Soyad" value={delivery.fullName} />
        <OrderDetailsRow label="Telefon"  value={delivery.phone} />
        <OrderDetailsRow label="Şəhər"    value={delivery.city} />
        <OrderDetailsRow label="Ünvan"    value={address} />
        {deliveryDate && (
          <OrderDetailsRow label="Çatdırılma tarixi" value={formatDateAz(deliveryDate)} />
        )}
      </div>
    </div>
  )
}