import { Link } from 'react-router-dom'
import { COVER_FALLBACK } from '../../constants/theme'
import { QtyControl } from './QtyControl'
import type { CartItemProps } from '../../types/cart'


export default function CartItem({ id, title, author, cover, price, quantity, available = true, onInc, onDec, onRemove }: CartItemProps) {
  return (
    <div className="grid grid-cols-12 gap-4 py-6 items-center">
      <div className="col-span-12 md:col-span-6 flex gap-4 items-start">
        <Link to={`/books/${id}`} className="flex-shrink-0">
          <img src={cover || COVER_FALLBACK} alt={title} className="w-16 h-24 object-cover shadow-sm bg-gray-100"
            onError={e => { e.currentTarget.src = COVER_FALLBACK; e.currentTarget.onerror = null }} />
        </Link>
        <div className="min-w-0">
          <Link to={`/books/${id}`}>
            <h3 className="text-sm font-semibold text-gray-900 hover:underline line-clamp-2 mb-1 leading-snug">{title}</h3>
          </Link>
          <p className="text-xs text-gray-500 mb-2">{author}</p>
          {!available && <p className="text-xs font-medium text-red-500">Stok azalıb: miqdarı azaldın və ya kitabı silin</p>}
          <div className="flex items-center gap-4 mt-3 md:hidden">
            <QtyControl qty={quantity} onDec={onDec} onInc={onInc} />
            <span className="text-sm font-semibold text-gray-900">₼{(price * quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="hidden md:flex col-span-3 justify-center">
        <QtyControl qty={quantity} onDec={onDec} onInc={onInc} />
      </div>
      <div className="hidden md:flex col-span-2 justify-end">
        <span className="text-sm font-semibold text-gray-900">₼{(price * quantity).toFixed(2)}</span>
      </div>
      <div className="hidden md:flex col-span-1 justify-end">
        <button onClick={onRemove} className="text-gray-300 hover:text-red-400 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}