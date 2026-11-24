// src/pages/StoresPage.tsx
import { useState, useMemo } from 'react'
import { useEventFilters } from '../hooks/useEventFilter.ts'
import { PRIMARY, BACKGROUND_LIGHT, BACKGROUND_SOFT } from '../constants/theme'
import { useStoresData } from '../hooks/useStoresData'
import type { Store } from '../types/store'
import { StoreMap }        from '../components/stores/StoreMap'
import { StoreCard }       from '../components/stores/StoreCard'
import FeaturedEventCard   from '../components/stores/FeaturedEventCard'
import { EventCard }       from '../components/stores/EventCard'
import EventFilterPanel    from '../components/stores/EventFilterPanel'



export default function StoresPage() {
  const [search,        setSearch]        = useState('')
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  const { stores, events, loading, error, reload } = useStoresData()
  const { filters, setters, filteredEvents, resetAllFilters } = useEventFilters(events, selectedStore?.id ?? null)

  // Önə çıxan tədbir: ən yaxın müəllif tədbiri (yoxdursa ən yaxın tədbir). Siyahı tarixə görə gəlir
  const featuredEvent = events.find((e) => e.type === 'Müəllif Tədbiri') ?? events[0] ?? null


  const filteredStores = useMemo(() =>
    stores.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
    ), [stores, search])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3" style={{ background: BACKGROUND_LIGHT }}>
        <p className="text-gray-500">Mağazalar yüklənmədi</p>
        <button onClick={reload} className="text-sm underline" style={{ color: PRIMARY }}>Yenidən cəhd et</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: BACKGROUND_LIGHT }}>

      <section className="relative text-white overflow-hidden bg-gradient-to-br from-[#3d5a6b] via-[#2e4455] to-[#1a2e3d] min-h-[300px]">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#c9a454]/10" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#c9a454]/10" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-widest mb-3 text-[#c9a454]/80 font-semibold">
            Book &amp; Store
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mağazalar &amp; Tədbirlər
          </h1>
          <p className="text-lg opacity-80 max-w-xl mx-auto">
            Ən yaxın mağazanı tapın, gələcək müəllif tədbirlərini və uşaq hekayə saatlarını kəşf edin.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StoreMap selectedStore={selectedStore} />
          </div>
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Önə Çıxan Tədbir</h2>
            {featuredEvent
              ? <FeaturedEventCard event={featuredEvent} />
              : <p className="text-sm text-gray-400">{loading ? 'Yüklənir...' : 'Hələlik tədbir yoxdur.'}</p>}
            {selectedStore && (
              <div className="rounded-2xl p-5 border" style={{ background: BACKGROUND_SOFT, borderColor: `${PRIMARY}33` }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: PRIMARY }}>
                    {selectedStore.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{selectedStore.name}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{selectedStore.address}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedStore.phone}</p>
                    <p className="text-xs text-gray-500">{selectedStore.hours}</p>
                  </div>
                </div>
                <button className="mt-3 w-full text-xs font-semibold py-2 rounded-xl text-white" style={{ background: PRIMARY }}>
                  Bu mağazada tədbirləri gör
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <p className="text-sm font-semibold text-gray-700">{filteredStores.length} mağaza tapıldı</p>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mağaza adı və ya ünvan axtar..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none border border-gray-200 bg-white w-64 focus:border-gray-400 transition-all" />
            </div>
            {selectedStore && (
              <button onClick={() => setSelectedStore(null)} className="text-xs underline text-gray-400 hover:text-gray-700">
                Seçimi ləğv et
              </button>
            )}
          </div>

          {filteredStores.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Mağaza tapılmadı.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  selected={selectedStore?.id === store.id}
                  onClick={() => setSelectedStore(selectedStore?.id === store.id ? null : store)} />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Gələcək tədbirlər</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedStore
                ? `${selectedStore.name} — ${filteredEvents.length} Tədbir`
                : `${filteredEvents.length} Gələcək Tədbir`}
            </h2>
          </div>

          
          <EventFilterPanel filters={filters} setters={setters} onReset={resetAllFilters} />

          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-gray-200">
              <p className="text-4xl mb-3">📅</p>
              <p className="text-gray-500 font-medium">Seçilmiş filtrlərə uyğun tədbir tapılmadı.</p>
              <p className="text-gray-400 text-sm mt-1">Filtrləri dəyişdirməyə cəhd edin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors" >
              ↑ Yuxarıya qayıt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}