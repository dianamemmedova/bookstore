// src/components/stores/FeaturedEventCard.tsx
import { PRIMARY, ACCENT } from '../../constants/theme'
import { formatDate } from '../../utils/date'
import type { events } from '../../data/stores'

type Event = typeof events[0]

export default function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white">
      <div className="relative overflow-hidden h-[]250px" >
        <img
          src={`/events/event-${event.id}.jpg`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
          style={{ background: ACCENT }}>
          Önə Çıxan
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
            style={{ background: PRIMARY }}>
            {event.locationType === 'Virtual' ? 'Virtual' : 'Mağazada'}
          </span>
          <span className="text-xs text-gray-400">{event.type}</span>
        </div>
        <p className="font-bold text-gray-900 text-sm leading-snug mb-1">{event.title}</p>
        <p className="text-xs text-gray-400 mb-4">
          {formatDate(event.date)} · {event.time} · {event.storeName}
        </p>
        <div className="flex gap-2">
          <button className="flex-1 text-xs font-semibold py-2 border rounded-xl hover:bg-gray-50 transition-colors" style={{ borderColor: '#e5e7eb', color: '#374151' }}>
            Ətraflı bax
          </button>
          <button className="flex-1 text-xs font-semibold py-2 rounded-xl text-white transition-colors hover:opacity-90" style={{ background: PRIMARY }}>
            Bilet al
          </button>
        </div>
      </div>
    </div>
  )
}