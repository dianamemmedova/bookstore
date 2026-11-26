import { Link } from 'react-router-dom'
import { COVER_FALLBACK } from '../../constants/theme'
import { QtyControl } from './QtyControl'
import Icon from '../ui/Icon'
import type { CartItemProps } from '../../types/cart'

export default function CartItem({ id, title, author, cover, price, originalPrice, discountPercent, quantity, available = true, onInc, onDec, onRemove }: CartItemProps) {
  return (
    <article className="flex gap-4 rounded-md border border-line bg-white p-3 transition-colors hover:border-line-strong">
      <Link to={`/books/${id}`} className="relative flex-shrink-0 rounded-sm bg-panel p-2">
        <img
          src={cover || COVER_FALLBACK}
          alt={title}
          className="aspect-[3/4] w-16 rounded-[2px] object-cover shadow-md sm:w-20"
          onError={e => { e.currentTarget.src = COVER_FALLBACK; e.currentTarget.onerror = null }}
        />
        {discountPercent != null && (
          <span className="tabular absolute left-1 top-1 rounded-full bg-sale px-1.5 py-0.5 text-[10px] font-semibold text-white">
            -{discountPercent}%
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/books/${id}`}>
              <h3 className="line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink hover:underline">{title}</h3>
            </Link>
            <p className="mt-0.5 text-xs text-muted">{author}</p>
            {!available && (
              <p className="mt-1.5 inline-flex items-center gap-1 rounded-sm bg-sale-soft px-1.5 py-0.5 text-[11px] font-medium text-on-sale-soft">
                <Icon name="warning" size={13} /> Stok azalıb: miqdarı azaldın və ya kitabı silin
              </p>
            )}
          </div>
          <button
            onClick={onRemove}
            title="Sil"
            aria-label="Sil"
            className="flex-shrink-0 rounded-sm p-1 text-muted transition-colors hover:bg-sale-soft hover:text-sale"
          >
            <Icon name="delete" size={20} />
          </button>
        </div>

        <div className="flex items-end justify-between gap-3">
          <QtyControl qty={quantity} onDec={onDec} onInc={onInc} />
          <div className="tabular text-right">
            <div className={`text-base font-semibold ${originalPrice != null ? 'text-sale' : 'text-ink'}`}>
              ₼{(price * quantity).toFixed(2)}
            </div>
            {originalPrice != null && (
              <div className="text-xs text-muted line-through">₼{(originalPrice * quantity).toFixed(2)}</div>
            )}
            {quantity > 1 && <div className="text-[11px] text-muted">₼{price.toFixed(2)} / ədəd</div>}
          </div>
        </div>
      </div>
    </article>
  )
}