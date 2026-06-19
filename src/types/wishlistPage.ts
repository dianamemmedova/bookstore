export interface WishlistItem {
  id: number
  originalId?: string
  title: string
  author: string
  cover: string
  price: string
  format: string
  rating: number
  reviewCount: number
  available: boolean
  addedDate: string
}

export interface WishlistList {
  id: number
  name: string
  description: string
  privacy: 'public' | 'private'
  items: WishlistItem[]
}

export interface WishtListSidebar {
  lists: WishlistList[]
  activeListId: number
  onSelect: (id: number) => void
  onCreateClick: () => void
}

export interface WishlistItemLists {
  activeList: WishlistList
  sortedItems: WishlistItem[]
  sortBy: string
  results: string
  onSortChange: (v: string) => void
  onResultsChange: (v: string) => void
  onEditClick: () => void
  onRemove: (id: number) => void
  onAddToCart: (id: number, title: string) => void
}

export interface ItemCart {
  item: WishlistItem
  index: number
  onRemove: (id: number) => void
  onAddToCart: (id: number, title: string) => void
}

export interface FormModal {
  mode: 'create' | 'edit'
  initialName?: string
  initialDesc?: string
  initialPrivacy?: 'public' | 'private'
  onClose: () => void
  onSave: (name: string, desc: string, privacy: 'public' | 'private') => void
}