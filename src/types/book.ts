import type { WishlistList } from './wishlistPage'


export interface OLAuthor {
  key: string
  name: string
}

export interface OLDescription {
  type: string
  value: string
}

export interface OLWorkAuthorEntry {
  author: { key: string }
  type: { key: string }
}

export interface OLBook {
  key: string                
  title: string
  authors?: OLAuthor[]
  cover_i?: number           
  first_publish_year?: number
  subject?: string[]
  edition_count?: number
  ia?: string     
  ebook_access?: 'public_domain' | 'borrowable' | 'no_ebook'
  ratings_average?: number
  ratings_count?: number
  want_to_read_count?: number
  already_read_count?: number
  currently_reading_count?: number
  description?: string | OLDescription
  number_of_pages_median?: number
  author_name?: string[]
}

export interface Book {
  externalId?: string // Open Library work id (varsa)
  id: string                 
  title: string
  authors: string[]
  coverUrl: string | null
  firstPublishYear?: number
  subjects: string[]
  editionCount?: number
  ebookAccess: 'public_domain' | 'borrowable' | 'no_ebook' | 'unknown'
  ratingsAverage?: number
  ratingsCount?: number
  description?: string
  pages?: number
  price?: number 
  inStock?: boolean // backend: stokda var (limitsiz və ya > 0)
}

export interface OLSearchResponse {
  numFound: number
  start: number
  docs: OLBook[]
}
export interface OLSubjectResponse {
  name: string
  work_count: number
  works: OLBook[]
}

export interface CartBook extends Book {
  price: number
}

export interface WishlistItem extends Book {
  addedDate: string
  available: boolean
}

export interface DiscountedBook extends Book {
  discountedPrice: number
  discountPercent: number
}

export interface StatItem {
  value: string
  label: string
}



export type BooksSortOption = 'default' | 'title' | 'rating-desc' | 'year-desc'

export interface BookSectionProps {
  title: string
  books: Book[]
  loading: boolean
  cols?: 2 | 3 | 4
  label?: string
}

export interface HeartIconProps {
  filled?: boolean
  fillColor?: string
  strokeColor?: string
}

export interface Props {
  book: Book
  lists: WishlistList[]
  onClose: () => void
  onAdd: (listId: number) => void
  onCreateAndAdd: (name: string) => void
}

export interface BookInfo {
  book: Book
  author: string
  genreLabel: string
  booksUrl: string
  avgRating: number
  totalReviews: number
  readerUrl: string
  reading: boolean
  onScrollToReviews: () => void
  onRead: () => void
  onAddToCart: () => void
  onAddToWishlist: () => void
}

export interface SimilarBook {
  books: Book[]
  subjectToSlug: (subject: string) => string
}

export interface BookTab {
  book: Book
  author: string
  genreLabel: string
  activeTab: 'details' | 'author'
  onTabChange: (tab: 'details' | 'author') => void
}


export interface OLWorkEntry {
  key: string
  title: string
  covers?: number[]
  subjects?: string[]
}


export interface UseBooksOptions {
  immediate?: boolean
}

export interface UseBooksResult {
  books: Book[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export interface UseBookResult<T> {
  book: T | null
  loading: boolean
  error: string | null
}