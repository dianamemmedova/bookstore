import { formatDateAz } from '../../utils/date'
import { getOrderAddress } from '../../utils/orderUtils'
import OrderDetailsRow from './OrderDetailsRow'
import Icon from '../ui/Icon'
import type { Delivery } from '../../types/order'

export default function OrderDeliveryInfo({ delivery, deliveryDate }: Delivery) {
  const address = getOrderAddress(delivery)
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <h4 className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">
        <Icon name="location_on" size={15} className="text-muted-gold-text" /> Çatdırılma ünvanı
      </h4>
      <div className="space-y-1.5">
        <OrderDetailsRow label="Ad Soyad" value={delivery.fullName} />
        <OrderDetailsRow label="Telefon" value={delivery.phone} />
        <OrderDetailsRow label="Şəhər" value={delivery.city} />
        <OrderDetailsRow label="Ünvan" value={address} />
        {deliveryDate && <OrderDetailsRow label="Çatdırılma tarixi" value={formatDateAz(deliveryDate)} />}
      </div>
    </div>
  )
}