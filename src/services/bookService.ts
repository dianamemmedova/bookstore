import axios from 'axios'
import type { Book, OLBook, OLSearchResponse, OLSubjectResponse, OLWorkAuthorEntry ,OLWorkEntry } from '../types/book'
import { getBookPrice } from '../utils/bookPrice'

const BASE = 'https://openlibrary.org'
const COVERS_BASE = 'https://covers.openlibrary.org/b'

export function getCoverUrl(coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M'): string | null {
  if (!coverId) return null
  return `${COVERS_BASE}/id/${coverId}-${size}.jpg`
}

export function mapBook(doc: OLBook & { author_name?: string[] }): Book {
  const rawKey = doc.key ?? ''
  const id = rawKey.replace('/works/', '')

  let authorNames: string[] = []
  if (doc.author_name && doc.author_name.length) {
    authorNames = doc.author_name
  } else if (doc.authors && doc.authors.length) {
    authorNames = doc.authors.map(a => a.name).filter(Boolean)
  }

  return {
    id,
    title: doc.title ?? 'Başlıqsız',
    authors: authorNames,
    coverUrl: getCoverUrl(doc.cover_i),
    firstPublishYear: doc.first_publish_year,
    subjects: doc.subject?.slice(0, 5) ?? [],
    editionCount: doc.edition_count,
    ebookAccess: doc.ebook_access ?? 'unknown',
    ratingsAverage: doc.ratings_average,
    ratingsCount: doc.ratings_count,
    pages: doc.number_of_pages_median,
    description:
      typeof doc.description === 'string'
        ? doc.description
        : (doc.description as { value?: string } | undefined)?.value,
    price: getBookPrice(id),
  }
}

export async function searchBooks(
  query: string,
  limit = 20,
  page = 1
): Promise<Book[]> {
  const response = await axios.get<OLSearchResponse>(`${BASE}/search.json`, {
    params: {
      q: query,
      limit,
      page,
      fields: 'key,title,author_name,cover_i,first_publish_year,subject,edition_count,ebook_access,ratings_average,ratings_count'
    }
  })

  const mapped = response.data.docs.map((doc) => 
    mapBook(doc as OLBook & { author_name?: string[] })
  )

  const seen = new Set<string>()
  return mapped.filter(book => {
    if (seen.has(book.id)) return false
    seen.add(book.id)
    return true
  })
}

export async function fetchBySubject(subject: string, limit = 20): Promise<Book[]> {
  const slug = subject.toLowerCase().replace(/\s+/g, '_')
  const response = await axios.get<OLSubjectResponse>(`${BASE}/subjects/${slug}.json`, {
    params: { limit }
  })

  return response.data.works.map((work) => {
    const book = mapBook(work)
    if (!book.coverUrl) {
      const w = work as OLBook & { cover_id?: number; covers?: number[] }
      const fallbackId = w.cover_id ?? w.covers?.[0]
      if (fallbackId) {
        return { ...book, coverUrl: getCoverUrl(fallbackId) }
      }
    }
    return book
  })
}

export async function fetchTrending(limit = 20): Promise<Book[]> {
  return searchBooks('bestseller fiction nonfiction', limit)
}
export async function fetchBookDetail(workId: string): Promise<Book | null> {
  try {
    const response = await axios.get(`${BASE}/works/${workId}.json`)
    const data = response.data

    const authorNames: string[] = []
    if (Array.isArray(data.authors)) {
      await Promise.all(
        (data.authors as OLWorkAuthorEntry[]).slice(0, 3).map(async (a) => {
          const authorKey = a.author?.key ?? ''
          if (!authorKey) return
          try {
            const aRes = await axios.get(`${BASE}${authorKey}.json`)
            const aData = aRes.data as { name?: string }
            if (aData.name) authorNames.push(aData.name)
          } catch {
            // ignore
          }
        })
      )
    }

    return mapBook({
      key: `/works/${workId}`,
      title: data.title,
      cover_i: data.covers?.[0],
      subject: data.subjects,
      description: typeof data.description === 'string' ? data.description : data.description?.value,
      number_of_pages_median: data.number_of_pages_median,
      authors: authorNames.map(name => ({ key: '', name })),
    } as OLBook & { author_name?: string[] })
  } catch {
    return null
  }
}

export async function fetchEditions(workId: string, limit = 5) {
  const response = await axios.get(`${BASE}/works/${workId}/editions.json`, {
    params: { limit }
  })
  return response.data.entries ?? []
}



export async function fetchAuthorBooks(authorKey: string, limit = 10): Promise<Book[]> {
  const response = await axios.get(`${BASE}/authors/${authorKey}/works.json`, {
    params: { limit }
  })
  const data = response.data as { entries?: OLWorkEntry[] }
  return (data.entries ?? []).map((entry) =>
    mapBook({
      key: entry.key,
      title: entry.title,
      cover_i: entry.covers?.[0],
      subject: entry.subjects,
    } as OLBook)
  )
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