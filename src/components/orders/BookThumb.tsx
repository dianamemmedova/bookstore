import { Link } from 'react-router-dom'
import { COVER_FALLBACK } from '../../constants/theme'
import type { BookThumb } from '../../types/order'

export default function BookThumb({ id, title, cover, quantity, size = 'md' }: BookThumb) {
  const cls = size === 'sm' ? 'h-14 w-10' : 'h-16 w-12'

  return (
    <Link to={`/books/${id}`} title={title} className="group relative flex-shrink-0 rounded-sm bg-panel p-1">
      <img
        src={cover || COVER_FALLBACK}
        alt={title}
        className={`${cls} rounded-[2px] object-cover shadow-sm transition-opacity group-hover:opacity-80`}
        onError={e => { e.currentTarget.src = COVER_FALLBACK; e.currentTarget.onerror = null }}
      />
      {quantity != null && quantity > 1 && (
        <span className="tabular absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
          {quantity}
        </span>
      )}
    </Link>
  )
}