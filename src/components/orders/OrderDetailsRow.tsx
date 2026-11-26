import type { Detail } from '../../types/order'

export default function OrderDetailsRow({ label, value, valueColor }: Detail) {
  return (
    <div className="flex justify-between gap-2 text-xs">
      <span className="flex-shrink-0 text-muted">{label}</span>
      <span className="tabular text-right font-medium text-ink" style={valueColor ? { color: valueColor } : {}}>
        {value}
      </span>
    </div>
  )
}