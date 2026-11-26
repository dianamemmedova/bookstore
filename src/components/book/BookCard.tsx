import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/AuthModalContext'
import { useCart } from '../../context/CartContext'
import { COVER_FALLBACK } from '../../constants/theme'
import Icon from '../ui/Icon'

interface BookCardProps {
  book: Book
  onWishlist?: (book: Book) => void
  genreLabel?: string
  showWishlist?: boolean // false: ürək düyməsini səhifənin özü idarə edir
}

export default function BookCard({ book, onWishlist, genreLabel, showWishlist = true }: BookCardProps) {
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const { addToCart, isInCart } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)
  const [cartError, setCartError] = useState('')

  const bookId = String(book.id)
  const inCart = isInCart(bookId)

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) { openLogin(); return }
    setWishlisted((prev) => !prev)
    onWishlist?.(book)
  }, [user, openLogin, onWishlist, book])

  const handleCart = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) { openLogin(); return }

    const err = await addToCart({
      id: bookId,
      title: book.title,
      author: book.authors[0] ?? 'Naməlum müəllif',
      cover: book.coverUrl ?? COVER_FALLBACK,
      genre: book.subjects[0] ?? '',
      rating: book.ratingsAverage ?? 0,
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
  }, [user, openLogin, addToCart, bookId, book])

  const isAdded = cartAdded || inCart
  const btnCls = cartError
    ? 'bg-red-700'
    : isAdded
      ? 'bg-free hover:bg-free'
      : 'bg-primary hover:bg-primary-dark'

  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-white p-2 transition-colors duration-200 hover:border-line-strong">
      <Link
        to={`/books/${bookId}`}
        className="relative mb-2 flex aspect-[3/4] items-center justify-center rounded-sm bg-panel p-3"
      >
        <img
          src={book.coverUrl ?? COVER_FALLBACK}
          alt={book.title}
          className="h-full w-full rounded-[2px] object-cover shadow-md"
          onError={(e) => {
            e.currentTarget.src = COVER_FALLBACK
            e.currentTarget.onerror = null
          }}
        />

        {book.discountPercent != null && (
          <span className="tabular absolute left-1 top-1 z-10 rounded-full bg-sale px-1.5 py-0.5 text-[11px] font-semibold text-white">
            -{book.discountPercent}%
          </span>
        )}
        {book.ebookAccess === 'public_domain' && (
          <span className="absolute bottom-1 left-1 z-10 rounded-full bg-free-soft px-1.5 py-0.5 text-[11px] font-semibold text-on-free-soft">
            Pulsuz
          </span>
        )}
        {book.isAudiobook && (
          <span className="absolute bottom-1 right-1 z-10 inline-flex items-center gap-0.5 rounded-full bg-audio-soft px-1.5 py-0.5 text-[11px] font-semibold text-on-audio-soft">
            <Icon name="headphones" size={13} />Audio
          </span>
        )}

        {showWishlist && (
          <button
            onClick={handleWishlist}
            title="İstək siyahısına əlavə et"
            className="absolute right-1 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-muted transition-colors hover:text-sale"
          >
            <Icon name="favorite" size={16} filled={wishlisted} className={wishlisted ? 'text-sale' : ''} />
          </button>
        )}
      </Link>

      <div className="mb-2 flex flex-1 flex-col gap-1">
        <Link to={`/books/${bookId}`}>
          <h3 className="line-clamp-2 min-h-[2.25rem] text-[13px] font-semibold leading-[18px] text-ink hover:underline">
            {book.title}
          </h3>
        </Link>
        <p className="line-clamp-1 text-xs text-muted">{book.authors[0] ?? 'Naməlum müəllif'}</p>

        {(genreLabel || book.firstPublishYear != null) && (
          <p className="line-clamp-1 text-[11px] text-muted/80">
            {[genreLabel, book.firstPublishYear].filter(Boolean).join(' · ')}
          </p>
        )}

        {book.ratingsAverage != null && book.ratingsAverage > 0 && (
          <p className="tabular flex items-center gap-1 text-xs text-ink">
            <Icon name="star" size={14} filled className="text-muted-gold-text" />
            {book.ratingsAverage.toFixed(1)}
            {book.ratingsCount != null && <span className="text-muted">({book.ratingsCount.toLocaleString()})</span>}
          </p>
        )}

        {book.price != null && (
          <p className="tabular mt-auto flex items-baseline gap-1.5 pt-1">
            <span className={`text-[15px] font-semibold ${book.originalPrice != null ? 'text-sale' : 'text-ink'}`}>₼{book.price}</span>
            {book.originalPrice != null && <span className="text-xs text-muted line-through">₼{book.originalPrice}</span>}
          </p>
        )}
      </div>

      <button
        onClick={handleCart}
        className={`w-full rounded-sm px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors ${btnCls}`}
      >
        {cartError || (isAdded ? '✓ Səbətdə' : 'Səbətə əlavə et')}
      </button>
    </article>
  )
}