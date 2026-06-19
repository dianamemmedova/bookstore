export interface StarRatingProps {
  rating: number
  size?: 'sm' | 'lg'
  showCount?: boolean
  count?: number
}

export interface PostCardData {
  id: string
  category: string
  title: string
  excerpt: string
  image: string
  author?: string
}