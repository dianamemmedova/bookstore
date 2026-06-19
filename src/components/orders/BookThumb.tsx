import { Link } from 'react-router-dom'
import { COVER_FALLBACK, PRIMARY } from '../../constants/theme'
import type{ BookThumb } from '../../types/order'


export default function BookThumb({ id, title, cover, quantity, size = 'md' }: BookThumb) {
  const cls = size === 'sm' ? 'w-10 h-14' : 'w-12 h-16'

  return (
    <Link to={`/books/${id}`} className="flex-shrink-0 relative group">
      <img
        src={cover || COVER_FALLBACK}
        alt={title}
        className={`${cls} object-cover bg-gray-100 rounded shadow-sm group-hover:opacity-80 transition-opacity`}
        onError={e => { e.currentTarget.src = COVER_FALLBACK; e.currentTarget.onerror = null }}
      />
      {quantity && quantity > 1 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
          style={{ background: PRIMARY }}>
          {quantity}
        </span>
      )}
    </Link>
  )
}