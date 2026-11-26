import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PRIMARY, COVER_FALLBACK } from '../../constants/theme'
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
    <div className="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
      <Link to={`/books/${book.id}`} className="relative flex h-44 items-center justify-center bg-gray-50 px-5 py-4">
        <img
          src={coverUrl}
          alt={book.title}
          className="h-full w-auto max-w-full object-contain shadow-sm"
          onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_COVER)}
        />
        <span className="absolute left-1.5 top-1.5 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          -{book.discountPercent ?? 0}%
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link to={`/books/${book.id}`}>
          <h3 className="line-clamp-2 min-h-[2.1rem] text-[13px] font-semibold leading-snug text-[#1f2a33] hover:underline">{book.title}</h3>
        </Link>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-gray-500">{formatAuthors(book.authors)}</p>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-red-600">₼{book.price}</span>
          {book.originalPrice != null && (
            <span className="text-xs text-gray-400 line-through">₼{book.originalPrice}</span>
          )}
        </div>

        <button
          onClick={handleCart}
          className="mt-2 w-full rounded py-1.5 text-[11px] font-bold tracking-wide text-white transition-colors"
          style={{ background: btnBg }}
          onMouseEnter={(e) => (e.currentTarget.style.background = cartError || isAdded ? btnBg : '#2e4455')}
          onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
        >
          {cartError || (isAdded ? '✓ Səbətdə' : 'Səbətə əlavə et')}
        </button>
      </div>
    </div>
  )
}