import Icon from '../ui/Icon'
import type { Order } from '../../types/order'

const STEPS = [
  { key: 'pending', label: 'Sifariş verildi', icon: 'receipt_long' },
  { key: 'confirmed', label: 'Təsdiqləndi', icon: 'inventory_2' },
  { key: 'delivered', label: 'Çatdırıldı', icon: 'home' },
] as const

// Sifarişin vəziyyətini göstərən addım xətti; ləğv olunubsa ayrıca xəbərdarlıq
export default function OrderProgress({ status }: { status: Order['status'] }) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 rounded-sm bg-sale-soft px-3 py-2 text-xs font-medium text-on-sale-soft">
        <Icon name="cancel" size={16} /> Bu sifariş ləğv edilib
      </div>
    )
  }

  const current = STEPS.findIndex((s) => s.key === status)

  return (
    <ol className="flex items-start">
      {STEPS.map((step, i) => {
        const done = i < current || status === 'delivered'
        const active = i === current && status !== 'delivered'
        return (
          <li key={step.key} className="relative flex flex-1 flex-col items-center gap-1.5 text-center">
            {i > 0 && (
              <span className={`absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2 ${i <= current || status === 'delivered' ? 'bg-primary' : 'bg-line-strong'}`} />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                done ? 'border-primary bg-primary text-white'
                  : active ? 'border-gold bg-gold-container text-muted-gold-text'
                  : 'border-line-strong bg-white text-muted'
              }`}
            >
              <Icon name={done ? 'check' : step.icon} size={16} />
            </span>
            <span className={`text-[11px] ${done || active ? 'font-semibold text-ink' : 'text-muted'}`}>{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}