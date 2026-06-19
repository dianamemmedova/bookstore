import { useState, useCallback, useMemo } from 'react';
import { events } from '../data/stores';
import { isSameWeek, isThisMonth } from '../utils/date';
import type { EventFilters, EventFilterSetters } from '../types/store';

export function useEventFilters(initialStoreId: number | null = null) {
  const [filterToday,    setFilterToday]    = useState(true);
  const [filterThisWeek, setFilterThisWeek] = useState(true);
  const [filterMay,      setFilterMay]      = useState(true);
  const [filterJune,     setFilterJune]     = useState(false);
  const [filterJuly,     setFilterJuly]     = useState(false);
  const [filterAuthor,   setFilterAuthor]   = useState(true);
  const [filterKids,     setFilterKids]     = useState(true);
  const [filterOther,    setFilterOther]    = useState(true);
  const [filterVirtual,  setFilterVirtual]  = useState(true);
  const [filterInStore,  setFilterInStore]  = useState(true);
  const [sortBy,         setSortBy]         = useState<'Tarix' | 'Mağaza'>('Tarix');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(initialStoreId);

  const today = new Date().toISOString().slice(0, 10);

  const filteredEvents = useMemo(() => {
    const result = events.filter((e) => {
      const dateOk =
        (filterToday    && e.date === today) ||
        (filterThisWeek && isSameWeek(e.date)) ||
        (filterMay      && isThisMonth(e.date, 4)) ||
        (filterJune     && isThisMonth(e.date, 5)) ||
        (filterJuly     && isThisMonth(e.date, 6));
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
  }, [filterToday, filterThisWeek, filterMay, filterJune, filterJuly,
      filterAuthor, filterKids, filterOther, filterVirtual, filterInStore,
      selectedStoreId, sortBy, today]);

  const resetAllFilters = useCallback(() => {
    setFilterToday(true); setFilterThisWeek(true); setFilterMay(true);
    setFilterJune(false); setFilterJuly(false); setFilterAuthor(true);
    setFilterKids(true); setFilterOther(true); setFilterVirtual(true);
    setFilterInStore(true); setSortBy('Tarix');
  }, []);

  const filters: EventFilters = { filterToday, filterThisWeek, filterMay, filterJune, filterJuly, filterAuthor, filterKids, filterOther, filterVirtual, filterInStore, sortBy };
  const setters: EventFilterSetters = { setFilterToday, setFilterThisWeek, setFilterMay, setFilterJune, setFilterJuly, setFilterAuthor, setFilterKids, setFilterOther, setFilterVirtual, setFilterInStore, setSortBy };

  return { filters, setters, selectedStoreId, setSelectedStoreId, filteredEvents, resetAllFilters };
}