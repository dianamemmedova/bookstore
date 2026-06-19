import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIMARY } from '../../constants/theme';
import { useAudiobooks } from '../../hooks/useAudiobooks';
import type { Audiobook } from '../../types/audioBooks';
import { FALLBACK_COVER } from '../../constants/link';


function getCoverUrl(coverId: number | undefined): string {
  if (!coverId) return FALLBACK_COVER;
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

export default function AudiobooksSlider() {
  const { books, loading } = useAudiobooks(10);
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🎧 Səsli Kitablar</h2>
            <p className="text-sm text-gray-500 mt-1">Ən populyar audiokitablar</p>
          </div>
          <button onClick={() => navigate('/audiobooks')}
            className="text-sm font-semibold hover:underline" style={{ color: PRIMARY }}>
            Hamısına bax →
          </button>
        </div>

        {/* Slider */}
        <div className="relative">
          <button onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow">
            ‹
          </button>

          <div ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: 'none' }}>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
              : books.map((book) => <SliderCard key={book.id} book={book} />) }
          </div>

          <button onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow">
            ›
          </button>
        </div>

      </div>
    </section>
  );
}

function SliderCard({ book }: { book: Audiobook }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/audiobooks')}
      className="flex-shrink-0 w-40 cursor-pointer group" >
      <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-100 group-hover:shadow-md transition-shadow" style={{ aspectRatio: '3/4' }}>
        <img src={getCoverUrl(book.coverId)} alt={book.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_COVER; }}/>
      </div>
      <p className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{book.title}</p>
      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{book.author}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-40 animate-pulse">
      <div className="rounded-xl bg-gray-200  aspect-[3/4]"  />
      <div className="mt-2 h-3 bg-gray-200 rounded w-3/4" />
      <div className="mt-1 h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}