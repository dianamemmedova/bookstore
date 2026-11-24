export interface Store {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  hours: string
  num: number    // siyahıdakı sıra (1, 2, 3...), kartda nömrə kimi görünür
  image: string  // /stores/store-N.jpg
}

export type EventType = 'Müəllif Tədbiri' | 'Uşaq Tədbiri' | 'Digər'
export type LocationType = 'Mağazada' | 'Virtual'

export interface StoreEvent {
  id: number
  storeId: number
  storeName: string
  locationType: LocationType
  date: string
  time: string
  title: string
  type: EventType
  image: string  // /events/event-N.jpg
}

export interface EventFilters {
  filterToday: boolean
  filterThisWeek: boolean
  filterThisMonth: boolean
  filterNextMonth: boolean
  filterLater: boolean
  filterAuthor: boolean
  filterKids: boolean
  filterOther: boolean
  filterVirtual: boolean
  filterInStore: boolean
  sortBy: 'Tarix' | 'Mağaza'
}

export interface EventFilterSetters {
  setFilterToday: (v: boolean) => void
  setFilterThisWeek: (v: boolean) => void
  setFilterThisMonth: (v: boolean) => void
  setFilterNextMonth: (v: boolean) => void
  setFilterLater: (v: boolean) => void
  setFilterAuthor: (v: boolean) => void
  setFilterKids: (v: boolean) => void
  setFilterOther: (v: boolean) => void
  setFilterVirtual: (v: boolean) => void
  setFilterInStore: (v: boolean) => void
  setSortBy: (v: 'Tarix' | 'Mağaza') => void
}