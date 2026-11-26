import type { Book, BooksSortOption } from '../types/book'

// Kitabın faktiki satış qiyməti (endirim varsa, artıq endirimli qiymətdir); qiyməti olmayanlar siyahının sonuna düşür
const priceOf = (b: Book, fallback: number) => b.price ?? fallback

// Kitab siyahısını seçilmiş meyara görə sıralayır (orijinal massivi dəyişmir)
export function applySort(books: Book[], sort: BooksSortOption): Book[] {
  const arr = [...books]
  switch (sort) {
    case 'title':       return arr.sort((a, b) => a.title.localeCompare(b.title))
    case 'rating-desc': return arr.sort((a, b) => (b.ratingsAverage ?? 0) - (a.ratingsAverage ?? 0))
    case 'year-desc':   return arr.sort((a, b) => (b.firstPublishYear ?? 0) - (a.firstPublishYear ?? 0))
    case 'price-asc':   return arr.sort((a, b) => priceOf(a, Infinity) - priceOf(b, Infinity))
    case 'price-desc':  return arr.sort((a, b) => priceOf(b, -Infinity) - priceOf(a, -Infinity))
    default:            return arr
  }
}