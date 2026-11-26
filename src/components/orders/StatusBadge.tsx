import { STATUS_MAP, type Status } from '../../types/order'

export default function StatusBadge({ status }: Status) {
  const s = STATUS_MAP[status]
  return (
    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}