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
import { PRIMARY, DARK_BLUE } from '../constants/theme'

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="w-full bg-gray-100 animate-pulse rounded-lg aspect-[2/3]" />
        </div>
        <div className="lg:col-span-8 space-y-4">
          <div className="h-8 bg-gray-100 animate-pulse rounded w-3/4" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-1/3" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
          <div className="h-24 bg-gray-100 animate-pulse rounded mt-6" />
        </div>
      </div>
    </div>
  )
}

function StickyBar({ book, onRead }: { book: Book; onRead: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const readerUrl = book.externalId ? `https://openlibrary.org/works/${book.externalId}` : '#'

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 sm:gap-4">
        {book.coverUrl && (
          <img src={book.coverUrl} alt={book.title}
            className="w-8 h-12 sm:w-10 sm:h-14 object-cover rounded flex-shrink-0 bg-gray-100" />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs sm:text-sm text-gray-900 truncate">{book.title}</p>
          <p className="text-xs text-gray-500 hidden sm:block">{book.authors[0] ?? ''}</p>
        </div>
        <button onClick={onRead}
          className="px-3 sm:px-5 py-1.5 sm:py-2 text-white text-xs sm:text-sm font-semibold rounded flex-shrink-0"
          style={{ background: PRIMARY }}>
          <span className="hidden sm:inline">OXUMAĞA BAŞ VUR</span>
          <span className="sm:hidden">OXU</span>
        </button>
        <a href={readerUrl} target="_blank" rel="noopener noreferrer"
          className="hidden md:block px-5 py-2 text-white text-sm font-semibold rounded flex-shrink-0"
          style={{ background: DARK_BLUE }}>
          OPEN LIBRARY
        </a>
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
  const [reading, setReading] = useState(false)
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
      <div className="text-center py-20">
        <span className="text-5xl">📭</span>
        <h2 className="text-2xl font-bold text-gray-700 mt-4">Kitab tapılmadı</h2>
        <Link to="/books" className="text-indigo-600 hover:underline mt-2 inline-block">Kitablara qayıt</Link>
      </div>
    )
  }

  const readerUrl  = book.externalId ? `https://openlibrary.org/works/${book.externalId}` : '#'
  const author     = book.authors[0] ?? 'Naməlum müəllif'
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

      <StickyBar book={book} onRead={() => { setReading(true); window.open(readerUrl, '_blank') }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1">
          <Link to="/" className="hover:text-gray-900">Ana səhifə</Link>
          <span>›</span>
          <Link to="/books" className="hover:text-gray-900">Kitablar</Link>
          <span>›</span>
          <Link to={booksUrl} className="hover:text-gray-900" style={{ color: PRIMARY }}>{genreLabel}</Link>
          <span>›</span>
          <span className="text-gray-700 truncate max-w-xs">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <BookCover book={book} rawSubject={rawSubject} />
          <BookInfo
            book={book}
            author={author}
            genreLabel={genreLabel}
            booksUrl={booksUrl}
            avgRating={reviews.summary.avgRating}
            totalReviews={reviews.summary.totalReviews}
            readerUrl={readerUrl}
            reading={reading}
            onScrollToReviews={() => reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            onRead={() => setReading(true)}
            onAddToCart={async () => {
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
            }}
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
          <button onClick={() => navigate(booksUrl)}
            className="text-sm text-gray-500 hover:text-gray-900 underline transition-colors">
            ← {genreLabel} kitablarına qayıt
          </button>
        </div>
      </div>
    </>
  )
}