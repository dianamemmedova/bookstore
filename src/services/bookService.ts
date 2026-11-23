import { api, API_URL } from '../lib/api'
import type { Book } from '../types/book'

// Backend-in kitab formatı (GET /books, GET /books/:id)
interface ApiBook {
  id: number
  externalId: string | null
  title: string
  author: string
  description: string | null
  coverUrl: string | null
  year: number | null
  pages: number | null
  subjects: string[]
  priceCents: number
  price: number
  inStock: boolean
}

interface ApiBookList {
  items: ApiBook[]
  page: number
  limit: number
  total: number
  totalPages: number
}

// Admin-in yüklədiyi cover nisbi gəlir (/uploads/covers/...), onu backend ünvanı ilə tamamlayırıq
function coverOf(url: string | null): string | null {
  if (!url) return null
  return url.startsWith('/') ? `${API_URL}${url}` : url
}

// Backend kitabını front-un Book tipinə çevirir. id mətn kimi saxlanır (route/səbət kodu string gözləyir).
export function mapBook(b: ApiBook): Book {
  return {
    id: String(b.id),
    externalId: b.externalId ?? undefined,
    title: b.title,
    authors: b.author ? [b.author] : [],
    coverUrl: coverOf(b.coverUrl),
    firstPublishYear: b.year ?? undefined,
    subjects: b.subjects,
    ebookAccess: 'unknown',
    description: b.description ?? undefined,
    pages: b.pages ?? undefined,
    price: b.price,
    inStock: b.inStock,
  }
}

async function list(query: Record<string, string | number | undefined>): Promise<Book[]> {
  const data = await api<ApiBookList>('/books', { query, auth: false })
  return data.items.map(mapBook)
}

// Backend limit ən çox 100 qəbul edir
const clamp = (limit: number) => Math.min(Math.max(limit, 1), 100)

export async function searchBooks(query: string, limit = 20, page = 1): Promise<Book[]> {
  return list({ q: query, limit: clamp(limit), page })
}

export async function fetchBySubject(subject: string, limit = 20): Promise<Book[]> {
  const books = await list({ subject: subject.toLowerCase(), limit: clamp(limit) })
  // Bu mövzu teqi ilə kitab yoxdursa, söz kimi axtarırıq (başlıq/müəllif/teq)
  return books.length > 0 ? books : searchBooks(subject, limit)
}

export async function fetchTrending(limit = 20): Promise<Book[]> {
  return list({ sort: 'newest', limit: clamp(limit) })
}

export async function fetchBookDetail(id: string): Promise<Book | null> {
  try {
    return mapBook(await api<ApiBook>(`/books/${encodeURIComponent(id)}`, { auth: false }))
  } catch {
    return null
  }
}

export async function fetchAuthorBooks(author: string, limit = 10): Promise<Book[]> {
  return searchBooks(author, limit)
}

export const FEATURED_QUERIES = {
  trending:    () => fetchTrending(20),
  fiction:     () => fetchBySubject('fiction', 20),
  adventure:   () => fetchBySubject('adventure', 20),
  love:        () => searchBooks('love stories', 20),
  children:    () => fetchBySubject('children', 20),
  shakespeare: () => searchBooks('william shakespeare', 20),
} as const

export type SectionKey = keyof typeof FEATURED_QUERIES
export type SearchFn = typeof searchBooks