import type { Store } from '../../types/store'

export function StoreMap({ selectedStore }: { selectedStore: Store | null }) {
  const BAKU = { lat: 40.4093, lng: 49.8671 }
  const center = selectedStore ?? BAKU
  const bbox = {
    minLng: center.lng - 0.22,
    minLat: center.lat - 0.14,
    maxLng: center.lng + 0.22,
    maxLat: center.lat + 0.14,
  }
  const marker = selectedStore ? `&mlat=${selectedStore.lat}&mlon=${selectedStore.lng}` : ''
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox.minLng}%2C${bbox.minLat}%2C${bbox.maxLng}%2C${bbox.maxLat}&layer=mapnik${marker}`

  return (
    <div  className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-md h-[520px]" >
      <iframe
        title="Mağazalar xəritəsi"
        src={src}
        width="100%"
        height="520"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}