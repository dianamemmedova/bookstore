import { FREE_DELIVERY_THRESHOLD } from '../../data/promoCodes'
import Icon from '../ui/Icon'

// Pulsuz çatdırılmaya nə qədər qaldığını göstərən qızılı irəliləyiş çubuğu
export default function FreeShippingBar({ amount }: { amount: number }) {
  const left = Math.max(0, FREE_DELIVERY_THRESHOLD - amount)
  const percent = Math.min(100, (amount / FREE_DELIVERY_THRESHOLD) * 100)

  return (
    <div className="rounded-md border border-line bg-white p-3">
      <div className="mb-2 flex items-center gap-2 text-[13px] text-ink">
        <Icon name="local_shipping" size={20} className={left === 0 ? 'text-free' : 'text-muted-gold-text'} />
        {left === 0 ? (
          <span className="font-semibold text-free">Təbriklər! Çatdırılma pulsuzdur.</span>
        ) : (
          <span>
            Pulsuz çatdırılma üçün daha <strong className="tabular text-muted-gold-text">₼{left.toFixed(2)}</strong> əlavə edin
          </span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-sunken">
        <div
          className={`h-full rounded-full transition-all duration-500 ${left === 0 ? 'bg-free' : 'bg-gold'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}