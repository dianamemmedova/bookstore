// Backend-in təqdim etdiyi rəy (GET /books/:id/reviews → items[])
export interface BookReview {
  id: number
  bookId: number
  user: string // "Əli M."
  rating: number
  title: string
  body: string
  recommended: boolean
  helpful: { yes: number; no: number }
  myVote: 'yes' | 'no' | null
  isMine: boolean
  createdAt: string
  updatedAt: string
}

export interface ReviewSummary {
  totalReviews: number
  avgRating: number
  recommendedPercent: number
  ratingCounts: { star: number; count: number }[] // 5★ → 1★
}

export interface ReviewList {
  summary: ReviewSummary
  items: BookReview[]
  page: number
  limit: number
  total: number // filtrə uyğun rəylərin sayı
  totalPages: number
}

export interface ReviewInput {
  rating: number
  title: string
  body: string
  recommended: boolean
}

export const REVIEW_SORTS = ['Önə çıxan', 'Ən yeni', 'Ən yüksək reytinq', 'Ən aşağı reytinq'] as const
export type ReviewSortLabel = typeof REVIEW_SORTS[number]

export const SORT_PARAM: Record<ReviewSortLabel, string> = {
  'Önə çıxan': 'featured',
  'Ən yeni': 'newest',
  'Ən yüksək reytinq': 'highest',
  'Ən aşağı reytinq': 'lowest',
}