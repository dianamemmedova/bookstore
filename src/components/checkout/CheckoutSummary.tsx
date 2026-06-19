import { PRIMARY } from '../../constants/theme'
import { formatDateAz } from '../../utils/date'

interface AppliedPromo { code: string; discount: number }

interface Props {
  subtotal: number
  discountAmount: number
  deliveryFee: number
  finalTotal: number
  appliedPromo: AppliedPromo | null
  deliveryDate: string
}

export default function CheckoutSummary({
  subtotal, discountAmount, deliveryFee, finalTotal, appliedPromo, deliveryDate,
}: Props) {
  return (
    <div className="rounded-sm border border-gray-200 bg-gray-50 p-4 space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Ödəniş Xülasəsi</h3>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Aralıq cəm</span>
        <span>₼{subtotal.toFixed(2)}</span>
      </div>

      {appliedPromo && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Endirim ({Math.round(appliedPromo.discount * 100)}%)</span>
          <span>−₼{discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-600">
        <span>Çatdırılma</span>
        <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
          {deliveryFee === 0 ? 'Pulsuz' : `₼${deliveryFee.toFixed(2)}`}
        </span>
      </div>

      {deliveryDate && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>Çatdırılma tarixi</span>
          <span className="font-medium" style={{ color: PRIMARY }}>{formatDateAz(deliveryDate)}</span>
        </div>
      )}

      <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-900">Ödəniləcək məbləğ</span>
        <span className="text-xl font-bold text-gray-900">₼{finalTotal.toFixed(2)}</span>
      </div>
    </div>
  )
}