import { Link } from 'react-router-dom'
import type { ItemCart } from '../../types/wishlistPage'
import { LIGHT_GREY, PRIMARY, PRIMARY_DARK } from '../../constants/theme';
import { StarRating } from '../ui/SharedUI'



export default function WishlistItemCard({ item, index, onRemove, onAddToCart }: ItemCart) {
   console.log('item rating:', item.rating, item.title)
  return (
    <div className="flex gap-5 py-6" style={{ borderTop: index === 0 ? 'none' : '1px solid #f3f4f6' }}>
      <Link to={`/books/${item.originalId ?? item.id}`} className="flex-shrink-0">
        <img src={item.cover || `https://covers.openlibrary.org/b/id/${item.id}-M.jpg`} alt={item.title}
          className="w-20 h-28 object-cover bg-gray-100 shadow-sm"
          onError={e => { e.currentTarget.src = `https://www.gutenberg.org/cache/epub/${item.id}/pg${item.id}.cover.medium.jpg`; e.currentTarget.onerror = null }} />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/books/${item.originalId ?? item.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:underline underline-offset-2 mb-0.5" >
            {item.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">
          müəllif: <Link to={`/books?author=${item.author}`} className="underline hover:text-gray-900">{item.author}</Link>
        </p>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={item.rating} />
          <span className="text-sm text-gray-600">{item.rating}</span>
          <span className="text-sm text-gray-400">({item.reviewCount})</span>
          <button className="text-sm text-green-700 hover:underline ml-1">Rəy Yaz</button>
        </div>
        <p className="text-sm text-gray-700 mb-1 font-medium">{item.format}</p>
        <p className="text-lg font-semibold text-gray-900 mb-3">{item.price}</p>

        <button
          onClick={() => item.available && onAddToCart(item.id, item.title)}
          disabled={!item.available}
          className="px-6 py-2.5 text-sm font-bold tracking-wider text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          style={{ background: item.available ? PRIMARY : LIGHT_GREY, letterSpacing: '0.05em' }}
          onMouseEnter={e => { if (item.available) e.currentTarget.style.background = PRIMARY_DARK }}
          onMouseLeave={e => { if (item.available) e.currentTarget.style.background = PRIMARY }}
        >
          SƏBƏTƏ ƏLAVƏ ET
        </button>
        {item.available && <p className="text-xs text-gray-400 mt-2">Hədiyyə qablaşdırması üçün uyğundur</p>}
      </div>

      <div className="flex-shrink-0 text-right flex flex-col items-end justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-2">Əlavə edilib: {item.addedDate}</p>
          <button onClick={() => onRemove(item.id)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors ml-auto">
            Sil
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}