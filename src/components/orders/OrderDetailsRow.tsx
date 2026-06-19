import type{ Detail } from "../../types/order"

export default function OrderDetailsRow({ label, value, valueColor }: Detail) {
  return (
    <div className="flex justify-between gap-2 text-xs">
      <span className="text-gray-400 flex-shrink-0">{label}</span>
      <span className="text-gray-800 font-medium text-right" style={valueColor ? { color: valueColor } : {}}>
        {value}
      </span>
    </div>
  )
}