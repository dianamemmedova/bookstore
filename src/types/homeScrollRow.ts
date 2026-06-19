import type { Book } from './book'

export type RowState =
  | { status: 'loading'; books: [] }
  | { status: 'success'; books: Book[] }
  | { status: 'error';   books: [] }

export type RowAction =
  | { type: 'success'; books: Book[] }
  | { type: 'error' }

export function rowReducer(_state: RowState, action: RowAction): RowState {
  if (action.type === 'success') return { status: 'success', books: action.books }
  return { status: 'error', books: [] }
}