import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { GREEN_ACCENT2, PRIMARY, COVER_FALLBACK } from '../../constants/theme'
import { FALLBACK_COVER } from '../../constants/link'
import { formatAuthors } from '../../utils/discountUtils'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/AuthModalContext'
import { useCart } from '../../context/CartContext'
import type { Book } from '../../types/book'

interface Props {
  book: Book
}

export default function DiscountedCard({ book }: Props) {
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const { addToCart, isInCart } = useCart()
  const [cartAdded, setCartAdded] = useState(false)
  const [cartError, setCartError] = useState('')

  const coverUrl = book.coverUrl ?? FALLBACK_COVER
  const inCart = isInCart(book.id)
  const isAdded = cartAdded || inCart
  const btnBg = cartError ? '#b91c1c' : isAdded ? '#245840' : PRIMARY

  const handleCart = useCallback(async () => {
    if (!user) { openLogin(); return }

    const err = await addToCart({
      id: book.id,
      title: book.title,
      author: book.authors[0] ?? 'Naməlum müəllif',
      cover: book.coverUrl ?? COVER_FALLBACK,
      genre: book.subjects[0] ?? '',
      rating: 0,
      description: book.description ?? '',
      year: book.firstPublishYear ?? 0,
      pages: book.pages ?? 0,
      price: book.price ?? 0,
    })

    // Stok çatmırsa düymədə qısa mesaj göstərilir
    if (err) {
      setCartError(err)
      setTimeout(() => setCartError(''), 2500)
      return
    }
    setCartAdded(true)
    setTimeout(() => setCartAdded(false), 2000)
  }, [user, openLogin, addToCart, book])

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col border border-red-100 relative">
      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
        -{book.discountPercent ?? 0}%
      </div>

      <Link to={`/books/${book.id}`} className="relative block overflow-hidden bg-gray-100 aspect-[3/4]">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-contain transition-transform group-hover:scale-105"
          onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_COVER)}
        />
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link to={`/books/${book.id}`}>
          <h5 className="text-xs sm:text-sm font-bold text-gray-900 hover:underline line-clamp-2 min-h-[32px] sm:min-h-[40px]">{book.title}</h5>
        </Link>
        <p className="text-xs text-gray-600 mt-1 line-clamp-1">{formatAuthors(book.authors)}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-bold text-red-600">{book.price} ₼</span>
          {book.originalPrice != null && (
            <span className="text-xs text-gray-400 line-through">{book.originalPrice} ₼</span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <button
            onClick={handleCart}
            className="text-xs font-medium text-white px-3 py-1.5 rounded-full w-full text-center transition-colors"
            style={{ background: btnBg }}
            onMouseEnter={(e) => (e.currentTarget.style.background = cartError || isAdded ? btnBg : GREEN_ACCENT2)}
            onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
          >
            {cartError || (isAdded ? '✓ Səbətdə' : 'Səbətə əlavə et')}
          </button>
        </div>
      </div>
    </div>
  )
}