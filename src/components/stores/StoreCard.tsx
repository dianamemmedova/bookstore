import type { Store } from '../../types/store'
import { BEIGE_BG, BORDER_DEFAULT, PRIMARY, WHITE } from '../../constants/theme'

export function StoreCard({ store , selected , onClick }: {
  store: Store
  selected: boolean
  onClick: () => void
}) {
  return (
    <div onClick={onClick}
      className="flex flex-col cursor-pointer rounded-2xl border overflow-hidden transition-all h-full"
      style={{
        borderColor: selected ? PRIMARY : BORDER_DEFAULT,
        background: WHITE,
        boxShadow: selected
          ? `0 4px 16px ${PRIMARY}30`
          : '0 1px 4px rgba(0,0,0,0.07)',
      }}
    >
      <div className="relative w-full overflow-hidden h-[200px]" style={{  background: selected ? `${PRIMARY}18` : BEIGE_BG }}>
        <img
          src={`/stores/store-${store.id}.jpg`}
          alt={store.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        <div className="absolute inset-0 items-center justify-center hidden">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow" style={{ background: selected ? PRIMARY : '#94a3b8' }} >
            {store.id}
          </div>
        </div>

        {selected && (
          <div className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: PRIMARY }} >
            SEÇİLDİ
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <p className="font-bold text-gray-900 text-sm mb-0.5 truncate" >
          {store.name}
        </p>
        <p className="text-xs text-gray-500 truncate mb-3">{store.address}</p>

        <div className="flex flex-col gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: PRIMARY }} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {store.phone}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: PRIMARY }} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {store.hours}
          </span>
        </div>

        <div className="mt-auto">
          <button  className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50"
            onClick={(e) => e.stopPropagation()}>
            Ətraflı bax
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}