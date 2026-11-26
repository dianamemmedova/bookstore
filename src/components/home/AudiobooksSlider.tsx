import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAudiobooks } from '../../hooks/useAudiobooks'
import { MiniBookCard } from './MiniBookCard'
import Icon from '../ui/Icon'

export default function AudiobooksSlider() {
  const { books, loading } = useAudiobooks(12)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }

  // Admin hələ audio kitab əlavə etməyibsə, bölmə göstərilmir
  if (!loading && books.length === 0) return null

  const arrow = 'absolute top-1/3 z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-muted shadow-sm transition-colors hover:text-ink sm:flex'

  return (
    <section className="mx-auto max-w-[1480px] px-4 py-6 lg:px-6">
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-2">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <span className="h-4 w-1 rounded-full bg-audio" />
          Səsli Kitablar
        </h2>
        <Link to="/audiobooks" className="inline-flex items-center gap-0.5 whitespace-nowrap text-xs font-semibold text-primary hover:underline">
          Hamısına bax <Icon name="arrow_forward" size={14} />
        </Link>
      </div>

      <div className="relative">
        <button onClick={() => scroll('left')} aria-label="Geri" className={`${arrow} left-0 -translate-x-3`}>
          <Icon name="chevron_left" size={20} />
        </button>

        <div ref={sliderRef} className="flex gap-3 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: 'none' }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-[160px] flex-shrink-0 sm:w-[180px]">
                  <div className="mb-2 aspect-[3/4] animate-pulse rounded-md bg-sunken" />
                  <div className="mb-1.5 h-3 w-3/4 animate-pulse rounded bg-sunken" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-sunken" />
                </div>
              ))
            : books.map((book) => <MiniBookCard key={book.id} book={book} />)}
        </div>

        <button onClick={() => scroll('right')} aria-label="İrəli" className={`${arrow} right-0 translate-x-3`}>
          <Icon name="chevron_right" size={20} />
        </button>
      </div>
    </section>
  )
}