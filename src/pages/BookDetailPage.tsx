import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchBookDetail, fetchBySubject } from '../services/bookService'
import type { Book } from '../types/book'
import { genres } from '../data/genres'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../hooks/useWishlist'
import { useToast } from '../hooks/useToast'
import { useBookReviews } from '../hooks/useBookReviews'
import { useAuth } from '../context/AuthContext'
import { useAuthModal } from '../context/AuthModalContext'
import ReviewFormModal from '../components/book/ReviewFormModal'
import { ApiError } from '../lib/api'
import type { BookReview } from '../types/review'
import AddToWishlistModal from '../components/wishlist/AddToWishlistModal'
import { ToastContainer } from '../components/ui/ToastContainer'
import BookCover from '../components/book/BookCover'
import BookInfo from '../components/book/BookInfo'
import SimilarBooks from '../components/book/SimilarBooks'
import BookTabs from '../components/book/BookTabs'
import BookReviews from '../components/book/BookReviews'
import Icon from '../components/ui/Icon'

function subjectToSlug(subject: string): string {
  const s = subject.toLowerCase()
  for (const g of genres) {
    if (g.slug === 'all') continue
    const queryWords = g.query.toLowerCase().split(' ')
    if (queryWords.some((w) => s.includes(w)) || s.includes(g.slug)) return g.slug
  }
  return 'fiction'
}

function Skeleton() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="aspect-[3/4] w-full animate-pulse rounded-md bg-sunken" />
          </div>
          <div className="space-y-4 lg:col-span-8 xl:col-span-9">
            <div className="h-8 w-3/4 animate-pulse rounded bg-sunken" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-sunken" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-sunken" />
            <div className="mt-6 h-24 animate-pulse rounded bg-sunken" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StickyBar({ book, onAddToCart }: { book: Book; onAddToCart: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const inStock = book.inStock !== false

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-white shadow-sm transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-4 py-2 lg:px-6">
        {book.coverUrl && (
          <img src={book.coverUrl} alt={book.title} className="h-12 w-9 flex-shrink-0 rounded-[2px] bg-panel object-cover" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-ink">{book.title}</p>
          <p className="hidden text-xs text-muted sm:block">{book.authors[0] ?? ''}</p>
        </div>
        {book.price != null && (
          <p className="tabular flex flex-shrink-0 items-baseline gap-2">
            <span className="text-base font-bold text-ink">₼{book.price}</span>
            {book.originalPrice != null && (
              <span className="hidden text-xs text-muted line-through sm:inline">₼{book.originalPrice}</span>
            )}
          </p>
        )}
        <button
          onClick={onAddToCart}
          disabled={!inStock}
          className="flex-shrink-0 rounded-sm bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          <span className="hidden sm:inline">Səbətə əlavə et</span>
          <span className="sm:hidden">Səbət</span>
        </button>
      </div>
    </div>
  )
}

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [book, setBook] = useState<Book | null>(null)
  const [similar, setSimilar] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'author'>('details')
  const [reviewForm, setReviewForm] = useState<{ review: BookReview | null } | null>(null)

  const { addToCart } = useCart()
  const { wishlists, wishlistModal, setWishlistModal, handleAddToList, handleCreateAndAdd } = useWishlist()
  const { toasts, success, error: showError } = useToast()
  const reviewsRef = useRef<HTMLElement>(null)
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const reviews = useBookReviews(id)

  const errMsg = (e: unknown) => (e instanceof ApiError ? e.message : 'Xəta baş verdi. Yenidən cəhd edin')

  const handleWrite = () => {
    if (!user) { openLogin(); return }
    // Artıq rəyi varsa (yüklənmiş siyahıda), yeni yox, redaktə açılır
    const mine = reviews.items.find((r) => r.isMine) ?? null
    setReviewForm({ review: mine })
  }
  const handleVote = async (review: BookReview, v: 'yes' | 'no') => {
    if (!user) { openLogin(); return }
    try { await reviews.vote(review, v) } catch (e) { showError(errMsg(e)) }
  }
  const handleDelete = async (review: BookReview) => {
    try { await reviews.deleteReview(review.id); success('Rəy silindi') } catch (e) { showError(errMsg(e)) }
  }

  useEffect(() => {
    if (!id) return
    let cancelled = false
    const run = async () => {
      try {
        const data = await fetchBookDetail(id)
        if (!data) throw new Error('not found')
        if (!cancelled) {
          setBook(data)
          setLoading(false)
          const sim = await fetchBySubject(data.subjects[0] ?? 'fiction', 10)
          if (!cancelled) setSimilar(sim.filter((b) => b.id !== id).slice(0, 7))
        }
      } catch {
        if (!cancelled) { setError(true); setLoading(false) }
      }
    }
    run()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <Skeleton />
  if (error || !book) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-surface px-4">
        <div className="rounded-md border border-line bg-white px-8 py-10 text-center">
          <Icon name="search_off" size={40} className="text-muted" />
          <h2 className="mt-2 font-display text-xl font-bold text-ink">Kitab tapılmadı</h2>
          <Link to="/books" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Kitablara qayıt</Link>
        </div>
      </div>
    )
  }

  const author     = book.authors[0] ?? 'Naməlum müəllif'

  const handleAddToCart = async () => {
    const err = await addToCart({
      id: book.id,
      title: book.title,
      author: book.authors[0] ?? '',
      cover: book.coverUrl ?? '',
      price: book.price ?? 0,
      genre: book.subjects[0] ?? '',
      rating: book.ratingsAverage ?? 0,
      description: book.description ?? '',
      year: book.firstPublishYear ?? 0,
      pages: book.pages ?? 0,
    })
    if (err) showError(err)
    else success(`"${book.title.slice(0, 28)}" səbətə əlavə edildi`)
  }
  const rawSubject = book.subjects[0] ?? 'Fiction'
  const genreSlug  = subjectToSlug(rawSubject)
  const genreLabel = genres.find((g) => g.slug === genreSlug)?.label ?? rawSubject
  const booksUrl   = `/books?genre=${genreSlug}`

  return (
    <>
      <ToastContainer toasts={toasts} />

      {reviewForm && (
        <ReviewFormModal
          bookTitle={book.title}
          review={reviewForm.review}
          onClose={() => setReviewForm(null)}
          onSubmit={async (input) => {
            if (reviewForm.review) await reviews.updateReview(reviewForm.review.id, input)
            else await reviews.createReview(input)
            success(reviewForm.review ? 'Rəy yeniləndi' : 'Rəyin əlavə olundu')
          }}
        />
      )}

      {wishlistModal && (
        <AddToWishlistModal
          book={wishlistModal}
          lists={wishlists}
          onClose={() => setWishlistModal(null)}
          onAdd={(listId) => handleAddToList(listId, wishlistModal, success)}
          onCreateAndAdd={(name) => handleCreateAndAdd(name, wishlistModal, success)}
        />
      )}

      <StickyBar book={book} onAddToCart={handleAddToCart} />

      <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-[1480px] px-4 py-5 lg:px-6">

        <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted">
          <Link to="/" className="hover:text-ink">Ana səhifə</Link>
          <Icon name="chevron_right" size={14} />
          <Link to="/books" className="hover:text-ink">Kitablar</Link>
          <Icon name="chevron_right" size={14} />
          <Link to={booksUrl} className="hover:text-ink">{genreLabel}</Link>
          <Icon name="chevron_right" size={14} />
          <span className="max-w-xs truncate text-ink">{book.title}</span>
        </nav>

        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <BookCover book={book} />
          <BookInfo
            book={book}
            author={author}
            genreLabel={genreLabel}
            booksUrl={booksUrl}
            avgRating={reviews.summary.avgRating}
            totalReviews={reviews.summary.totalReviews}
            onScrollToReviews={() => reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            onAddToCart={handleAddToCart}
            onAddToWishlist={() => setWishlistModal(book)}
          />
        </div>

        <SimilarBooks books={similar} subjectToSlug={subjectToSlug} />

        <BookTabs
          book={book}
          author={author}
          genreLabel={genreLabel}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <BookReviews
          ref={reviewsRef}
          reviews={reviews.items}
          summary={reviews.summary}
          total={reviews.total}
          loading={reviews.loading}
          loadingMore={reviews.loadingMore}
          hasMore={reviews.hasMore}
          error={reviews.error}
          starFilter={reviews.star}
          reviewSort={reviews.sort}
          loggedIn={!!user}
          onStarFilter={reviews.changeStar}
          onSortChange={reviews.changeSort}
          onVote={handleVote}
          onWrite={handleWrite}
          onEdit={(review) => setReviewForm({ review })}
          onDelete={handleDelete}
          onLoadMore={reviews.loadMore}
          onRetry={reviews.reload}
        />

        <div className="text-center">
          <button
            onClick={() => navigate(booksUrl)}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-muted transition-colors hover:text-ink"
          >
            <Icon name="arrow_back" size={16} /> {genreLabel} kitablarına qayıt
          </button>
        </div>
      </div>
      </div>
    </>
  )
}