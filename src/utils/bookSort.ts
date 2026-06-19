import type { Book, BooksSortOption } from '../types/book'

export function applySort(books: Book[], sort: BooksSortOption): Book[] {
  const arr = [...books]
  switch (sort) {
    case 'title':       return arr.sort((a, b) => a.title.localeCompare(b.title))
    case 'rating-desc': return arr.sort((a, b) => (b.ratingsAverage ?? 0) - (a.ratingsAverage ?? 0))
    case 'year-desc':   return arr.sort((a, b) => (b.firstPublishYear ?? 0) - (a.firstPublishYear ?? 0))
    default:            return arr
  }
}