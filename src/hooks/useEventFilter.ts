import { useState, useCallback, useMemo } from 'react';
import { isAfterNextMonth, isInMonth, isSameWeek, todayIso } from '../utils/date';
import type { EventFilters, EventFilterSetters, StoreEvent } from '../types/store';

// events serverdən gəlir; selectedStoreId seçilibsə yalnız o mağazanın tədbirləri qalır
export function useEventFilters(events: StoreEvent[], selectedStoreId: number | null = null) {
  const [filterToday,    setFilterToday]    = useState(true);
  const [filterThisWeek, setFilterThisWeek] = useState(true);
  const [filterThisMonth, setFilterThisMonth] = useState(true);
  const [filterNextMonth, setFilterNextMonth] = useState(true);
  const [filterLater,    setFilterLater]    = useState(true);
  const [filterAuthor,   setFilterAuthor]   = useState(true);
  const [filterKids,     setFilterKids]     = useState(true);
  const [filterOther,    setFilterOther]    = useState(true);
  const [filterVirtual,  setFilterVirtual]  = useState(true);
  const [filterInStore,  setFilterInStore]  = useState(true);
  const [sortBy,         setSortBy]         = useState<'Tarix' | 'Mağaza'>('Tarix');

  const today = todayIso();

  const filteredEvents = useMemo(() => {
    const result = events.filter((e) => {
      const dateOk =
        (filterToday    && e.date === today) ||
        (filterThisWeek && isSameWeek(e.date)) ||
        (filterThisMonth && isInMonth(e.date, 0)) ||
        (filterNextMonth && isInMonth(e.date, 1)) ||
        (filterLater    && isAfterNextMonth(e.date));
      if (!dateOk) return false;

      const typeOk =
        (filterAuthor && e.type === 'Müəllif Tədbiri') ||
        (filterKids   && e.type === 'Uşaq Tədbiri')    ||
        (filterOther  && e.type === 'Digər');
      if (!typeOk) return false;

      const locOk =
        (filterVirtual && e.locationType === 'Virtual') ||
        (filterInStore && e.locationType === 'Mağazada');
      if (!locOk) return false;

      if (selectedStoreId && e.storeId !== selectedStoreId) return false;
      return true;
    });

    result.sort((a, b) =>
      sortBy === 'Tarix'
        ? (a.date + a.time).localeCompare(b.date + b.time)
        : a.storeName.localeCompare(b.storeName)
    );
    return result;
  }, [events, filterToday, filterThisWeek, filterThisMonth, filterNextMonth, filterLater,
      filterAuthor, filterKids, filterOther, filterVirtual, filterInStore,
      selectedStoreId, sortBy, today]);

  const resetAllFilters = useCallback(() => {
    setFilterToday(true); setFilterThisWeek(true); setFilterThisMonth(true);
    setFilterNextMonth(true); setFilterLater(true); setFilterAuthor(true);
    setFilterKids(true); setFilterOther(true); setFilterVirtual(true);
    setFilterInStore(true); setSortBy('Tarix');
  }, []);

  const filters: EventFilters = { filterToday, filterThisWeek, filterThisMonth, filterNextMonth, filterLater, filterAuthor, filterKids, filterOther, filterVirtual, filterInStore, sortBy };
  const setters: EventFilterSetters = { setFilterToday, setFilterThisWeek, setFilterThisMonth, setFilterNextMonth, setFilterLater, setFilterAuthor, setFilterKids, setFilterOther, setFilterVirtual, setFilterInStore, setSortBy };

  return { filters, setters, filteredEvents, resetAllFilters };
}