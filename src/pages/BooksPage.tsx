import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchBySubject, fetchTrending } from '../services/bookService'
import { filterGenres, genreQuery } from '../data/genres'
import type { Book, BooksSortOption } from '../types/book'
import { useBooks } from '../hooks/useBooks'
import { useWishlist } from '../hooks/useWishlist'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/ToastContainer'
import AddToWishlistModal from '../components/wishlist/AddToWishlistModal'
import BookCard from '../components/book/BookCard'
import { LoadingGrid, EmptyBooks } from '../components/ui/SharedUI'
import Icon from '../components/ui/Icon'
import { applySort } from '../utils/bookSort'
import PageHero from '../components/shared/PageHero'

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlGenre = searchParams.get('genre') ?? 'all'
  const urlQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(urlQuery)
  const [sort, setSort] = useState<BooksSortOption>('default')

  const activeGenre = filterGenres.find(g => g.slug === urlGenre) ? urlGenre : 'all'
  const activeGenreLabel = filterGenres.find(g => g.slug === activeGenre)?.label ?? 'Hamısı'

  const { toasts, success } = useToast()

  const { wishlists, savedIds, wishlistModal, setWishlistModal, handleAddToList, handleCreateAndAdd } = useWishlist()

  const fetchFn = useRef(() => Promise.resolve<Book[]>([]))

  useEffect(() => {
    fetchFn.current = () => {
      if (query.trim()) {
        return import('../services/bookService').then(m => m.searchBooks(query.trim(), 40))
      } else if (activeGenre !== 'all') {
        return fetchBySubject(genreQuery(activeGenre), 40)
      } else {
        return fetchTrending(40)
      }
    }
  }, [query, activeGenre])

  const { books, loading, error, refetch } = useBooks(
    () => fetchFn.current(),
    [query, activeGenre]
  )

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
  }, [searchParams])

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [onlyAudio, setOnlyAudio] = useState(false)
  const [onlyDiscount, setOnlyDiscount] = useState(false)

  const min = minPrice === '' ? null : Number(minPrice)
  const max = maxPrice === '' ? null : Number(maxPrice)

  const displayed = applySort(books, sort).filter((b) => {
    if (onlyAudio && !b.isAudiobook) return false
    if (onlyDiscount && b.originalPrice == null) return false
    if (min != null && (b.price ?? 0) < min) return false
    if (max != null && (b.price ?? 0) > max) return false
    return true
  })
  const hasFilter = query || activeGenre !== 'all' || sort !== 'default' ||
    minPrice !== '' || maxPrice !== '' || onlyAudio || onlyDiscount

  const handleGenre = (slug: string) => {
    setQuery('')
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ genre: slug })
  }

  const handleReset = () => {
    setQuery('')
    setSort('default')
    setMinPrice('')
    setMaxPrice('')
    setOnlyAudio(false)
    setOnlyDiscount(false)
    setSearchParams({})
  }

  const audioCount = books.filter((b) => b.isAudiobook).length
  const saleCount = books.filter((b) => b.originalPrice != null).length

  const selectCls = 'w-full rounded-sm border border-line bg-panel px-2 py-1.5 text-[13px] text-ink outline-none focus:border-primary'
  const sectionTitle = 'mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted'

  return (
    <div className="min-h-screen bg-surface">
      <ToastContainer toasts={toasts} />

      {wishlistModal && (
        <AddToWishlistModal
          book={wishlistModal}
          lists={wishlists}
          onClose={() => setWishlistModal(null)}
          onAdd={(listId) => handleAddToList(listId, wishlistModal, success)}
          onCreateAndAdd={(name) => handleCreateAndAdd(name, wishlistModal, success)}
        />
      )}

      <PageHero
        eyebrow="Kataloq"
        title={activeGenre === 'all' ? 'Kitablar' : activeGenreLabel}
        subtitle={query ? `“${query}” üçün axtarış nəticələri` : 'Bütün janrlarda seçilmiş çap, elektron və səsli kitab nəşrləri.'}
        covers={books.map((b) => b.coverUrl ?? '')}
        stats={loading ? [] : [
          { value: books.length, label: 'kitab' },
          { value: audioCount, label: 'səsli kitab' },
          { value: saleCount, label: 'endirimli', tone: 'sale' },
        ]}
      />

      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-start gap-6 px-4 py-6 lg:grid-cols-12 lg:px-6">
        <aside className="flex flex-col gap-4 rounded-md border border-line bg-white p-4 lg:sticky lg:top-36 lg:col-span-3 xl:col-span-2">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <h2 className="font-display text-[17px] font-bold text-ink">Filtrlər</h2>
            {hasFilter && (
              <button onClick={handleReset} className="text-[11px] font-semibold text-primary hover:underline">
                Sıfırla
              </button>
            )}
          </div>

          <div>
            <h3 className={sectionTitle}>Janr</h3>
            <ul className="flex flex-col">
              {filterGenres.map((g) => (
                <li key={g.slug}>
                  <label className="flex cursor-pointer items-center gap-2 py-1 text-[13px] text-ink">
                    <input
                      type="radio"
                      name="genre"
                      checked={activeGenre === g.slug}
                      onChange={() => handleGenre(g.slug)}
                      className="h-3.5 w-3.5 accent-[#3d5a6b]"
                    />
                    <span className={activeGenre === g.slug ? 'font-semibold' : ''}>{g.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-line pt-3">
            <h3 className={sectionTitle}>Qiymət aralığı (₼)</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number" min={0} inputMode="decimal" placeholder="Min"
                value={minPrice} onChange={e => setMinPrice(e.target.value)}
                className={`${selectCls} tabular`}
              />
              <input
                type="number" min={0} inputMode="decimal" placeholder="Maks"
                value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                className={`${selectCls} tabular`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-line pt-3">
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink">
              <input type="checkbox" checked={onlyAudio} onChange={e => setOnlyAudio(e.target.checked)} className="h-3.5 w-3.5 accent-[#4338ca]" />
              <span className="inline-flex items-center gap-1"><Icon name="headphones" size={16} className="text-audio" /> Yalnız audio</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink">
              <input type="checkbox" checked={onlyDiscount} onChange={e => setOnlyDiscount(e.target.checked)} className="h-3.5 w-3.5 accent-[#dc2626]" />
              Yalnız endirimli
            </label>
          </div>

          <div className="border-t border-line pt-3">
            <label htmlFor="sort-select" className={sectionTitle + ' block'}>Sıralama</label>
            <select
              id="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value as BooksSortOption)}
              className={selectCls}
            >
              <option value="default">Ən populyar</option>
              <option value="rating-desc">Ən yüksək reytinq</option>
              <option value="year-desc">Ən yeni nəşr</option>
              <option value="price-asc">Qiymət: ucuzdan bahaya</option>
              <option value="price-desc">Qiymət: bahadan ucuza</option>
              <option value="title">Ada görə (A-Z)</option>
            </select>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-3 lg:col-span-9 xl:col-span-10">
          {!loading && !error && (
            <p className="tabular text-[13px] text-muted">
              {books.length} kitabdan {displayed.length}-i göstərilir
            </p>
          )}

          {loading ? (
            <LoadingGrid cols={5} count={10} />
          ) : error ? (
            <div className="px-4 py-20 text-center text-muted">
              <p className="mb-2 text-lg">Xəta baş verdi</p>
              <p className="text-sm">Kitablar yüklənə bilmədi. Bir az sonra yenidən cəhd edin.</p>
              <button onClick={refetch} className="mt-4 text-sm text-primary underline">
                Yenidən cəhd et
              </button>
            </div>
          ) : displayed.length === 0 ? (
            <EmptyBooks />
          ) : (
            <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5">
              {displayed.map((book, index) => (
                <div key={`${book.id}-${index}`} className="group relative">
                  <BookCard book={book} showWishlist={false} genreLabel={activeGenre !== 'all' ? activeGenreLabel : undefined} />
                  <button
                    onClick={() => setWishlistModal(book)}
                    title={savedIds.has(book.id) ? 'İstək siyahısında var' : 'İstək siyahısına əlavə et'}
                    className={`absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-muted transition-opacity hover:text-sale ${
                      savedIds.has(book.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Icon name="favorite" size={16} filled={savedIds.has(book.id)} className={savedIds.has(book.id) ? 'text-sale' : ''} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}