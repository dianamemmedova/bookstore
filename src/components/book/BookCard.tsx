import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/AuthModalContext'
import { useCart } from '../../context/CartContext'
import { LIGHT_GREY, PRIMARY, RED, WHITE } from '../../constants/theme'
import { COVER_FALLBACK } from '../../constants/theme'
import { getBookPrice } from '../../utils/bookPrice'

interface BookCardProps {
  book: Book
  onWishlist?: (book: Book) => void
  genreLabel?: string
}

export default function BookCard({ book, onWishlist, genreLabel }: BookCardProps) {
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const { addToCart, isInCart } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)

  const bookId = String(book.id)
  const inCart = isInCart(bookId)

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) { openLogin(); return }
    setWishlisted((prev) => !prev)
    onWishlist?.(book)
  }, [user, openLogin, onWishlist, book])

  const handleCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) { openLogin(); return }

    addToCart({
      id: bookId,
      title: book.title,
      author: book.authors[0] ?? 'Naməlum müəllif',
      cover: book.coverUrl ?? COVER_FALLBACK,
      genre: book.subjects[0] ?? '',
      rating: book.ratingsAverage ?? 0,
      description: book.description ?? '',
      year: book.firstPublishYear ?? 0,
      pages: book.pages ?? 0,
      price: book.price ?? getBookPrice(String(book.id)),
    })

    setCartAdded(true)
    setTimeout(() => setCartAdded(false), 2000)
  }, [user, openLogin, addToCart, bookId, book])

  const isAdded = cartAdded || inCart
  const btnBg = isAdded ? '#245840' : PRIMARY

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">


     <Link
        to={`/books/${bookId}`}
        className="relative block overflow-hidden flex-shrink-0 aspect-[2/3]"
      >
        <img
          src={book.coverUrl ?? COVER_FALLBACK}
          alt={book.title}
          className="w-full h-full object-cover bg-gray-50 group-hover:scale-105 transition-transform duration-300"  
          onError={(e) => {
            e.currentTarget.src = COVER_FALLBACK
            e.currentTarget.onerror = null
          }}
        />

        <button
          onClick={handleWishlist}
          title="İstək siyahısına əlavə et"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow transition-all"
        >
          <svg
            className="w-4 h-4 transition-colors"
            style={{ color: wishlisted ? RED : LIGHT_GREY }}
            fill={wishlisted ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {book.ebookAccess === 'public_domain' && (
          <span className="absolute top-2 left-2 text-xs font-semibold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
            Pulsuz
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/books/${bookId}`}>
          <h3  className="text-sm font-semibold text-gray-900 hover:text-[#3d5a6b] transition-colors line-clamp-2 mb-1 leading-snug" >
            {book.title}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 mb-1 line-clamp-1">
          {book.authors[0] ?? 'Naməlum müəllif'}
        </p>

        {genreLabel && (
          <span
            className="self-start text-xs px-2 py-0.5 rounded-full font-medium mb-1"
            style={{ background: WHITE, color: PRIMARY }}
          >
            {genreLabel}
          </span>
        )}

        {book.firstPublishYear != null && (
          <p className="text-xs text-gray-400 mb-1">{book.firstPublishYear}</p>
        )}

        {book.ratingsAverage != null && book.ratingsAverage > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs text-gray-600">
              {book.ratingsAverage.toFixed(1)}
              {book.ratingsCount != null
                ? ` (${book.ratingsCount.toLocaleString()})`
                : ''}
            </span>
          </div>
        )}

        <button
          onClick={handleCart}
          className="mt-auto w-full py-2 text-xs font-bold tracking-wider text-white transition-colors"
          style={{ background: btnBg }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#2e4455')}
          onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
        >
          {isAdded ? '✓ SƏBƏTDƏ' : 'SƏBƏTƏ ƏLAVƏ ET'}
        </button>
      </div>
    </div>
  )
}