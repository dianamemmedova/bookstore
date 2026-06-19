import { GREEN_ACCENT } from "../../constants/theme"
import type { StarRatingProps , PostCardData } from "../../types/shared"

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl mb-5"
      style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700 }}
    >
      {children}
    </h2>
  )
}

export function CategoryLabel({ label }: { label: string }) {
  if (!label) return null
  return (
    <p className="text-xs font-bold tracking-widest text-gray-500 mb-1 uppercase">
      {label}
    </p>
  )
}

export function Divider() {
  return <hr className="border-t border-gray-200 my-10" />
}



export function StarRating({ rating, size = 'sm', showCount, count }: StarRatingProps) {
  const sz = size === 'lg' ? 'text-2xl' : 'text-sm'
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`${sz} ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
          >
            ★
          </span>
        ))}
      </span>
      {showCount && count != null && (
        <span className="text-xs text-gray-500">({count.toLocaleString()})</span>
      )}
    </span>
  )
}


export function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-6 text-right">{star}★</span>
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: GREEN_ACCENT}} />
      </div>
      <span className="text-sm text-gray-500 w-6">{count}</span>
    </div>
  )
}



export function PostCard({ post }: { post: PostCardData }) {
  const FALLBACK = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=320&fit=crop'

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-hidden mb-3" style={{ aspectRatio: '16/10' }}>
        <img
          src={post.image || FALLBACK}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.currentTarget.src = FALLBACK; e.currentTarget.onerror = null }}
        />
      </div>
      <CategoryLabel label={post.category} />
      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug hover:underline cursor-pointer">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
        {post.excerpt}
      </p>
      <a href="#" className="text-sm font-bold text-gray-900 hover:underline">
        Oxumağa davam et
      </a>
    </div>
  )
}

export function LoadingGrid({ cols = 5, count = 10 }: { cols?: number; count?: number }) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }[cols] ?? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'

  return (
    <div className={`grid ${gridClass} gap-5`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
          <div className="w-full h-56 bg-gray-100 animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}


export function EmptyBooks({ message = 'Kitab tapılmadı.' }: { message?: string }) {
  return (
    <div className="text-center py-20 text-gray-400">
      <p className="text-lg mb-2">🔍 {message}</p>
      <p className="text-sm">Axtarış meyarlarınıza uyğun kitab yoxdur.</p>
    </div>
  )
}