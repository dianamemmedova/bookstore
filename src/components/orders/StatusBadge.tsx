import { STATUS_MAP , type Status } from '../../types/order'

export default function StatusBadge({ status }: Status) {
  const s = STATUS_MAP[status]
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}