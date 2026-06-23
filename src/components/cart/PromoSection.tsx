import { AMBER_DARK, PRIMARY } from '../../constants/theme'
import { SUGGESTED_CODE } from '../../data/promoCodes'
import type { PromoSectionProps } from '../../types/cart';

export default function PromoSection({
  promoInput, setPromoInput, promoError, setPromoError,
  appliedPromo, suggestionDismissed, setSuggestionDismissed,
  applyPromo, removePromo,
}: PromoSectionProps) {
  return (
    <>
      {!appliedPromo && !suggestionDismissed && (
        <div className="mb-4 p-3 rounded-sm border border-dashed border-amber-300 bg-amber-50 relative">
          <button onClick={() => setSuggestionDismissed(true)}
           className="absolute top-2 right-2 text-amber-400 hover:text-amber-600 text-xs leading-none">
            ✕
          </button>
          <p className="text-xs font-bold text-amber-700 mb-0.5">🎁 İlk Alışa Özel!</p>
          <p className="text-xs text-amber-600 mb-2">ILKALIS20 kodu ilə 20% endirim qazanın</p>
          <button
            onClick={() => { applyPromo(SUGGESTED_CODE); setSuggestionDismissed(true) }}
            className="w-full text-xs font-bold py-1.5 text-white rounded-sm"
            style={{ background: AMBER_DARK}}
          >
            TƏTBİQ ET: ILKALIS20
          </button>
        </div>
      )}

      <div className="border-t border-gray-100 pt-4 mb-4">
        <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Promo Kodu</p>
        {appliedPromo ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2 rounded-sm">
            <div>
              <span className="text-xs font-bold text-green-700">{appliedPromo.code}</span>
              <span className="text-xs text-green-600 ml-2">−{Math.round(appliedPromo.discount * 100)}% tətbiq edildi</span>
            </div>
            <button onClick={removePromo} className="text-green-500 hover:text-red-400 transition-colors text-xs">✕</button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError('') }}
                onKeyDown={e => e.key === 'Enter' && applyPromo()}
                placeholder="PROMO KOD"
                className="flex-1 border border-gray-300 px-3 py-2 text-xs outline-none focus:border-gray-500 transition-colors tracking-widest"
                style={{ borderRadius: 2 }}
              />
              <button onClick={() => applyPromo()} className="px-3 py-2 text-xs font-bold text-white flex-shrink-0 rounded-sm" style={{ background: PRIMARY }}>
                TƏTBİQ ET
              </button>
            </div>
            {promoError && <p className="text-xs text-red-500 mt-1.5">{promoError}</p>}
          </>
        )}
      </div>
    </>
  )
}