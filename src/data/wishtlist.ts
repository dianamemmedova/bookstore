export const SORT_OPTIONS = [
  { value: 'newest', label: 'Ən Yenidən Köhnəyə' },
  { value: 'oldest', label: 'Ən Köhnədən Yeniyə' },
  { value: 'az', label: 'Ada görə A-Z' },
  { value: 'za', label: 'Ada görə Z-A' },
]

export const RESULT_OPTIONS = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
]

import type { WishlistItem } from '../types/wishlistPage'

export const initialItems: WishlistItem[] = [
  { id: 84, title: 'Frankenstein', author: 'Mary Wollstonecraft Shelley', cover: 'https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg', price: '$14.99', format: 'Paperback', rating: 4.5, reviewCount: 312, available: true, addedDate: '05/20/2026' },
  { id: 1342, title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg', price: '$12.99', format: 'Paperback', rating: 4.8, reviewCount: 892, available: true, addedDate: '05/18/2026' },
  { id: 11, title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', cover: 'https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg', price: '$9.99', format: 'Hardcover', rating: 4.6, reviewCount: 541, available: true, addedDate: '05/15/2026' },
  { id: 1661, title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', cover: 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg', price: '$11.99', format: 'Paperback', rating: 4.7, reviewCount: 233, available: false, addedDate: '05/22/2026' },
]
