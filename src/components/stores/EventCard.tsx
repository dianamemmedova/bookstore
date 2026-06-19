import { BEIGE_BG, GRAY_TEXT, PRIMARY, PURPLE, TEXT_DARK } from '../../constants/theme'
import { MONTHS_SHORT } from '../../utils/date'
import { EVENT_COLORS } from '../../constants/theme'
import type { events } from '../../data/stores'


export function EventCard({ event }: { event: typeof events[0] }) {
  const colors = EVENT_COLORS[event.type] ?? { bg: BEIGE_BG, text: TEXT_DARK    , dot: GRAY_TEXT }
  const d = new Date(event.date)
  const dateStr = `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`

  return (
    <div className="flex flex-row bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md">
      <div className="relative flex-shrink-0 bg-gray-100 overflow-hidden w-[230px] min-h-[130px]">
        <img src={`/events/event-${event.id}.jpg`} alt={event.title}
         className="w-full h-full object-cover absolute inset-0" />
        <div className="absolute bottom-2 left-2 rounded-lg px-1.5 py-0.5 text-center"
          style={{ background: PRIMARY }}>
          <div className="text-[8px] font-bold uppercase text-white opacity-80">
            {['YAN','FEV','MAR','APR','MAY','İYN','İYL','AVQ','SEN','OKT','NOY','DEK'][d.getMonth()]}
          </div>
          <div className="text-sm font-bold leading-none text-white">{d.getDate()}</div>
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: colors.bg, color: colors.text }} >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors.dot }} />
              {event.type}
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: event.locationType === 'Virtual' ? PURPLE : PRIMARY }} >
              {event.locationType === 'Virtual' ? 'Virtual' : 'Mağazada'}
            </span>
          </div>
          <p className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-1">
            {event.title}
          </p>
          <p className="text-xs text-gray-400 truncate">{dateStr} · {event.time} · {event.storeName}</p>
        </div>

        <button className="mt-3 inline-flex items-center border-gray-200 text-[#282828] gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors self-start"   >
          Ətraflı bax
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}