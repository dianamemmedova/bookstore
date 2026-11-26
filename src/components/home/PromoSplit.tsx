import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

// İki yarımlı kampaniya zolağı: Səsli kitablar və Endirimli kitablar
export function PromoSplit() {
  return (
    <section className="mx-auto max-w-[1480px] px-4 py-4 lg:px-6">
      <div className="grid grid-cols-1 overflow-hidden rounded-md border border-line md:grid-cols-2">
        <div className="flex items-center justify-between gap-4 bg-audio p-6 text-white lg:p-8">
          <div className="flex max-w-xs flex-col items-start gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-audio-soft px-2.5 py-0.5 text-[11px] font-semibold text-on-audio-soft">
              <Icon name="headphones" size={14} /> SƏSLİ KİTABXANA
            </span>
            <h2 className="font-display text-2xl font-bold">Səsli Kitablar</h2>
            <p className="text-sm text-audio-soft">Yolda, idmanda və ya evdə peşəkar diktorların səsi ilə dinləyin.</p>
            <Link to="/audiobooks" className="mt-1 inline-flex items-center gap-1 rounded-sm bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-audio transition-colors hover:bg-audio-soft">
              Dinləməyə başla <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
          <Icon name="headphones" size={88} className="hidden flex-shrink-0 text-white/20 sm:block" />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line bg-sale-soft p-6 text-on-sale-soft md:border-l md:border-t-0 lg:p-8">
          <div className="flex max-w-xs flex-col items-start gap-2">
            <span className="rounded-full bg-sale px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">Məhdud təklif</span>
            <h2 className="font-display text-2xl font-bold">Endirimli Kitablar</h2>
            <p className="text-sm">Seçilmiş bədii və elmi nəşrlərdə mövsümi kampaniya.</p>
            <Link to="/clearance" className="mt-1 inline-flex items-center gap-1 rounded-sm bg-sale px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90">
              Endirimlərə keç <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
          <Icon name="sell" size={88} className="hidden flex-shrink-0 text-sale/25 sm:block" />
        </div>
      </div>
    </section>
  )
}