import FilterChip from './FilterChip'
import type { EventFilters, EventFilterSetters } from '../../types/store'

interface Props {
  filters: EventFilters
  setters: EventFilterSetters
  onReset: () => void
}

export default function EventFilterPanel({ filters, setters, onReset }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl border border-gray-200 bg-white">

      <div className="flex items-center gap-1.5 border-r border-gray-200 pr-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-1">Tarix</span>
        {[
          { label: 'Bu gün',   val: filters.filterToday,    set: setters.setFilterToday    },
          { label: 'Bu həftə', val: filters.filterThisWeek, set: setters.setFilterThisWeek },
          { label: 'May',      val: filters.filterMay,      set: setters.setFilterMay      },
          { label: 'İyun',     val: filters.filterJune,     set: setters.setFilterJune     },
          { label: 'İyul',     val: filters.filterJuly,     set: setters.setFilterJuly     },
        ].map((f) => <FilterChip key={f.label} label={f.label} checked={f.val} onChange={f.set} />)}
      </div>

      <div className="flex items-center gap-1.5 border-r border-gray-200 pr-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-1">Növ</span>
        {[
          { label: 'Müəllif', val: filters.filterAuthor, set: setters.setFilterAuthor },
          { label: 'Uşaq',    val: filters.filterKids,   set: setters.setFilterKids   },
          { label: 'Digər',   val: filters.filterOther,  set: setters.setFilterOther  },
        ].map((f) => <FilterChip key={f.label} label={f.label} checked={f.val} onChange={f.set} />)}
      </div>

      <div className="flex items-center gap-1.5 border-r border-gray-200 pr-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-1">Yer</span>
        {[
          { label: 'Mağazada', val: filters.filterInStore, set: setters.setFilterInStore },
          { label: 'Virtual',  val: filters.filterVirtual, set: setters.setFilterVirtual },
        ].map((f) => <FilterChip key={f.label} label={f.label} checked={f.val} onChange={f.set} />)}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <select
          value={filters.sortBy}
          onChange={(e) => setters.setSortBy(e.target.value as 'Tarix' | 'Mağaza')}
          className="border border-gray-200 text-xs px-3 py-1.5 rounded-lg outline-none bg-white text-gray-700"
        >
          <option value="Tarix">Tarixə görə</option>
          <option value="Mağaza">Mağazaya görə</option>
        </select>
        <button onClick={onReset} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
          Sıfırla
        </button>
      </div>

    </div>
  )
}