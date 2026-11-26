import { formatShortDate, formatTime } from '../../utils/date'
import { getPayMethodLabel } from '../../utils/orderUtils'
import StatusBadge from './StatusBadge'
import Icon from '../ui/Icon'
import type { OrderHeader } from '../../types/order'

export default function OrderHeader({ order, expanded, onToggle }: OrderHeader) {
  const count = order.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted">Sifariş</p>
          <p className="tabular font-display text-[15px] font-bold text-ink">№{order.id.slice(-6).toUpperCase()}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted">Tarix</p>
          <p className="tabular text-[13px] font-medium text-ink">{formatShortDate(order.createdAt)} · {formatTime(order.createdAt)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted">Kitab</p>
          <p className="tabular text-[13px] font-medium text-ink">{count} ədəd</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted">Ödəniş</p>
          <p className="text-[13px] font-medium text-ink">{getPayMethodLabel(order.payMethod)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted">Məbləğ</p>
          <p className="tabular text-[15px] font-bold text-ink">₼{order.finalTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={order.status} />
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-0.5 rounded-sm border border-line-strong bg-white px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:bg-panel"
        >
          {expanded ? 'Bağla' : 'Detallar'}
          <Icon name="expand_more" size={16} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  )
}