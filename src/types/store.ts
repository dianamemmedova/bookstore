export interface Store {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  hours: string
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
}

export interface EventFilters {
  filterToday: boolean
  filterThisWeek: boolean
  filterMay: boolean
  filterJune: boolean
  filterJuly: boolean
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
  setFilterMay: (v: boolean) => void
  setFilterJune: (v: boolean) => void
  setFilterJuly: (v: boolean) => void
  setFilterAuthor: (v: boolean) => void
  setFilterKids: (v: boolean) => void
  setFilterOther: (v: boolean) => void
  setFilterVirtual: (v: boolean) => void
  setFilterInStore: (v: boolean) => void
  setSortBy: (v: 'Tarix' | 'Mağaza') => void
}