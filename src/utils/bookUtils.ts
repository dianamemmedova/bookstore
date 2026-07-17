import type { DiscountedBook } from '../types/book'
import { getRandomDiscount, calcDiscountedPrice } from './discountUtils'


export function toDiscountedBooks(books: DiscountedBook[]): DiscountedBook[] {
  return books.map((book) => {
    const discountPercent = getRandomDiscount()
    const discountedPrice = calcDiscountedPrice(book.price ?? 0, discountPercent)
    return { ...book, discountedPrice, discountPercent }
  })
}
// kitab siyahısına saxda endirim əlavə edir 