import { PRIMARY } from '../../constants/theme'
import { formatShortDate, formatTime, formatDateAz } from '../../utils/date'
import { getPayMethodLabel } from '../../utils/orderUtils'
import StatusBadge from './StatusBadge'
import type{ OrderHeader } from '../../types/order'



export default function OrderHeader({ order, expanded, onToggle }: OrderHeader) {
  return (
    <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Sifariş tarixi</p>
          <p className="text-sm font-medium text-gray-900">
            {formatShortDate(order.createdAt)} · {formatTime(order.createdAt)}
          </p>
        </div>
        <div className="w-px h-8 bg-gray-100 hidden sm:block" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Məbləğ</p>
          <p className="text-sm font-bold text-gray-900">₼{order.finalTotal.toFixed(2)}</p>
        </div>
        <div className="w-px h-8 bg-gray-100 hidden sm:block" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Kitab sayı</p>
          <p className="text-sm font-medium text-gray-900">
            {order.items.reduce((s, i) => s + i.quantity, 0)} ədəd
          </p>
        </div>
        <div className="w-px h-8 bg-gray-100 hidden sm:block" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Ödəniş</p>
          <p className="text-sm font-medium text-gray-900">{getPayMethodLabel(order.payMethod)}</p>
        </div>
        {order.deliveryDate && (
          <>
            <div className="w-px h-8 bg-gray-100 hidden sm:block" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Çatdırılma tarixi</p>
              <p className="text-sm font-medium text-gray-900">{formatDateAz(order.deliveryDate)}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={order.status} />
        <button onClick={onToggle}
          className="text-xs font-medium transition-colors flex items-center gap-1"
          style={{ color: PRIMARY }}>
          {expanded ? 'Bağla' : 'Ətraflı'}
          <svg className="w-3.5 h-3.5 transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}