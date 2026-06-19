import type { Book } from '../../types/book'
import { PRIMARY } from '../../constants/theme'

interface Props {
  book: Book
  readerUrl: string
  reading: boolean
  onRead: () => void
  onAddToCart: () => void
  onAddToWishlist: () => void
}

export default function BookActions({ book, readerUrl, reading, onRead, onAddToCart, onAddToWishlist }: Props) {
  return (
    <div className="space-y-3">
      <a
        href={readerUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onRead}
        className="flex items-center justify-between w-full px-5 py-4 rounded-xl border-2 transition-all hover:shadow-md"
        style={{ borderColor: PRIMARY, background: reading ? `${PRIMARY}10` : 'white' }}
      >
        <div>
          <p className="text-sm font-bold text-gray-900">📖 Onlayn Oxu</p>
          <p className="text-xs text-gray-400 mt-0.5">Open Library-də pulsuz oxu</p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
          style={{ background: PRIMARY }}>
          {reading ? '✓ Oxunur' : 'Pulsuz'}
        </span>
      </a>

      <button
        onClick={onAddToCart}
        className="flex items-center justify-between w-full px-5 py-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white"
      >
        <div>
          <p className="text-sm font-bold text-gray-900">🛒 Səbətə Əlavə Et</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {book.price ? `₼${book.price}` : 'Qiymət yoxdur'}
          </p>
        </div>
        <span className="text-xs font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full">
          Səbət
        </span>
      </button>

      <button
        onClick={onAddToWishlist}
        className="flex items-center justify-between w-full px-5 py-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white"
      >
        <div>
          <p className="text-sm font-bold text-gray-900">❤️ Sevimlilərə Əlavə Et</p>
          <p className="text-xs text-gray-400 mt-0.5">İstək siyahına əlavə et</p>
        </div>
        <span className="text-xs font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full">
          Saxla
        </span>
      </button>
    </div>
  )
}