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
import CustomDropdown from '../components/ui/CustomDropdown'
import { BORDER_LIGHT, PRIMARY, RED, TEXT_DARK, WHITE } from '../constants/theme'
import { HeartIcon } from '../icons/bookspage'
import { applySort } from '../utils/bookSort'

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlGenre = searchParams.get('genre') ?? 'all'
  const urlQuery = searchParams.get('q') ?? ''

  const [search, setSearch] = useState(urlQuery)
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
    setSearch(q)
    setQuery(q)
  }, [searchParams])

  const displayed = applySort(books, sort)
  const hasFilter = query || activeGenre !== 'all' || sort !== 'default'

  const handleGenre = (slug: string) => {
    setSearch('')
    setQuery('')
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ genre: slug })
  }

  const handleReset = () => {
    setSearch('')
    setQuery('')
    setSort('default')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl text-gray-900 font-semibold">
              {activeGenre === 'all' ? 'Kitablar' : activeGenreLabel}
            </h1>
            {activeGenre !== 'all' && (
              <p className="text-sm text-gray-400 mt-1">Kitablar › {activeGenreLabel}</p>
            )}
          </div>
          <span className="text-sm text-gray-400">
            {loading ? '...' : `${displayed.length} kitab tapıldı`}
          </span>
        </div>

        <div className="mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const trimmed = search.trim()
                setQuery(trimmed)
                if (trimmed) setSearchParams({ q: trimmed })
                else setSearchParams({})
              }
            }}
            placeholder="Kitab adı, müəllif, mövzu axtar..."
            className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-500 transition-colors rounded"
          />
        </div>

        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2">
            {filterGenres.map(g => (
              <button
                key={g.slug}
                onClick={() => handleGenre(g.slug)}
                className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors border whitespace-nowrap"
                style={{
                  background: activeGenre === g.slug ? PRIMARY : WHITE,
                  color: activeGenre === g.slug ? WHITE : TEXT_DARK,
                  borderColor: activeGenre === g.slug ? PRIMARY : BORDER_LIGHT,
                }}>
                {g.label}
              </button>
            ))}
            {hasFilter && (
              <button onClick={handleReset}
                className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors whitespace-nowrap">
                ✕ Sıfırla
              </button>
            )}
          </div>
          <div className="flex justify-end">
            <CustomDropdown
              value={sort}
              onChange={v => setSort(v as BooksSortOption)}
              options={[
                { value: 'default',     label: 'Standart (Trend)'  },
                { value: 'rating-desc', label: 'Ən yüksək reytinq' },
                { value: 'year-desc',   label: 'Ən yeni nəşr'      },
                { value: 'title',       label: 'Ada görə (A-Z)'    },
              ]}
            />
          </div>
        </div>

        {loading ? (
          <>
            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-200 border-t-[#2e6b4f] rounded-full animate-spin" />
              Kitablar yüklənir...
            </div>
            <LoadingGrid cols={5} count={10} />
          </>
        ) : error ? (
          <div className="text-center py-20 text-gray-400 px-4">
            <p className="text-lg mb-2">⚠️ Xəta baş verdi</p>
            <p className="text-sm">Kitablar yüklənə bilmədi. Bir az sonra yenidən cəhd edin.</p>
            <button onClick={refetch} className="mt-4 text-sm underline text-gray-500 hover:text-gray-700">
              Yenidən cəhd et
            </button>
          </div>
        ) : displayed.length === 0 ? (
          <EmptyBooks />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 items-stretch">
            {displayed.map((book, index) => (
              <div key={`${book.id}-${index}`} className="relative group">
                <BookCard book={book} genreLabel={activeGenre !== 'all' ? activeGenreLabel : undefined} />
                <button
                  onClick={() => setWishlistModal(book)}
                  title={savedIds.has(book.id) ? 'İstək siyahısında var' : 'İstək siyahısına əlavə et'}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center transition-all hover:scale-110 ${
                    savedIds.has(book.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <HeartIcon filled={savedIds.has(book.id)} fillColor={RED} strokeColor={PRIMARY} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}