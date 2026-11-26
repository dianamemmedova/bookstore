import { SUGGESTED_CODE } from '../../data/promoCodes'
import Icon from '../ui/Icon'
import type { PromoSectionProps } from '../../types/cart'

export default function PromoSection({
  promoInput, setPromoInput, promoError, setPromoError,
  appliedPromo, suggestionDismissed, setSuggestionDismissed, suggestionAvailable,
  applyPromo, applying, removePromo,
}: PromoSectionProps) {
  return (
    <div className="mb-3 border-t border-line pt-3">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">Promo kod</p>

      {appliedPromo ? (
        <div className="flex items-center justify-between rounded-sm border border-free/30 bg-free-soft px-3 py-2">
          <div className="text-xs">
            <span className="font-bold text-on-free-soft">{appliedPromo.code}</span>
            <span className="ml-2 text-on-free-soft">−{Math.round(appliedPromo.discount * 100)}% tətbiq edildi</span>
          </div>
          <button onClick={removePromo} aria-label="Sil" className="text-on-free-soft transition-colors hover:text-sale">
            <Icon name="close" size={16} />
          </button>
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
              className="min-w-0 flex-1 rounded-sm border border-line-strong bg-white px-3 py-1.5 text-xs tracking-widest outline-none transition-colors focus:border-primary"
            />
            <button
              onClick={() => applyPromo()}
              disabled={applying}
              className="flex-shrink-0 rounded-sm bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {applying ? '...' : 'Tətbiq et'}
            </button>
          </div>
          {promoError && <p className="mt-1.5 text-xs text-sale">{promoError}</p>}

          {!suggestionDismissed && suggestionAvailable && (
            <div className="relative mt-3 rounded-sm border border-dashed border-gold bg-gold-container p-3">
              <button
                onClick={() => setSuggestionDismissed(true)}
                aria-label="Bağla"
                className="absolute right-1.5 top-1.5 text-muted-gold-text hover:text-ink"
              >
                <Icon name="close" size={14} />
              </button>
              <p className="mb-0.5 flex items-center gap-1 text-xs font-bold text-on-gold-container">
                <Icon name="redeem" size={15} /> İlk alışa özəl!
              </p>
              <p className="mb-2 text-xs text-on-gold-container">{SUGGESTED_CODE} kodu ilə 20% endirim qazanın</p>
              <button
                onClick={() => { applyPromo(SUGGESTED_CODE); setSuggestionDismissed(true) }}
                disabled={applying}
                className="w-full rounded-sm bg-muted-gold-text py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              >
                Tətbiq et: {SUGGESTED_CODE}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}