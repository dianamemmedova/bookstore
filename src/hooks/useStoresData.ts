import { useCallback, useEffect, useState } from 'react'
import { fetchEvents, fetchStores } from '../services/storeService'
import { todayIso } from '../utils/date'
import type { Store, StoreEvent } from '../types/store'

// Mağazalar və gələcək tədbirlər serverdən gəlir (admin paneldən idarə olunur)
export function useStoresData() {
  const [stores, setStores] = useState<Store[]>([])
  const [events, setEvents] = useState<StoreEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setError(false)
    Promise.all([fetchStores(ctrl.signal), fetchEvents(todayIso(), ctrl.signal)])
      .then(([s, e]) => { setStores(s); setEvents(e); setLoading(false) })
      .catch((err) => {
        if (ctrl.signal.aborted) return
        console.error(err)
        setError(true)
        setLoading(false)
      })
    return () => ctrl.abort()
  }, [reloadKey])

  const reload = useCallback(() => setReloadKey((k) => k + 1), [])
  return { stores, events, loading, error, reload }
}