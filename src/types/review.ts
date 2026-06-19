export interface BookReview {
  id: number
  user: string
  location: string
  reviewCount: number
  voteCount: number
  rating: number
  time: string
  title: string
  body: string
  recommended: boolean
  helpful: { yes: number; no: number }
}
