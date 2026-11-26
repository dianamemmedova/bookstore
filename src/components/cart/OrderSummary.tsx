import { FREE_DELIVERY_THRESHOLD } from '../../data/promoCodes'
import PromoSection from './PromoSection'
import Icon from '../ui/Icon'
import type { OrderSummaryProps } from '../../types/cart'

export default function OrderSummary({
  items, total, discountAmount, deliveryFee, finalTotal, appliedPromo,
  promoInput, setPromoInput, promoError, setPromoError,
  suggestionDismissed, setSuggestionDismissed, suggestionAvailable, applyPromo, applying, removePromo,
  user, onCheckout, onLogin,
}: OrderSummaryProps) {
  return (
    <div className="rounded-md border border-line bg-white p-4 lg:sticky lg:top-36">
      <h2 className="mb-3 border-b border-line pb-3 font-display text-[17px] font-bold text-ink">Sifariş xülasəsi</h2>

      <div className="mb-3 max-h-40 space-y-2 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex items-start justify-between gap-2">
            <span className="line-clamp-2 flex-1 text-xs leading-snug text-muted">
              {item.title}{item.quantity > 1 && <span> ×{item.quantity}</span>}
            </span>
            <span className="tabular flex-shrink-0 text-right text-xs font-medium text-ink">
              {item.originalPrice != null && (
                <span className="mr-1.5 text-muted line-through">₼{(item.originalPrice * item.quantity).toFixed(2)}</span>
              )}
              <span className={item.originalPrice != null ? 'text-sale' : ''}>₼{(item.price * item.quantity).toFixed(2)}</span>
            </span>
          </div>
        ))}
      </div>

      <PromoSection
        promoInput={promoInput} setPromoInput={setPromoInput}
        promoError={promoError} setPromoError={setPromoError}
        appliedPromo={appliedPromo}
        suggestionDismissed={suggestionDismissed} setSuggestionDismissed={setSuggestionDismissed}
        suggestionAvailable={suggestionAvailable}
        applyPromo={applyPromo} applying={applying} removePromo={removePromo}
      />

      <div className="tabular mb-3 space-y-1.5">
        <div className="flex justify-between text-[13px] text-muted">
          <span>Aralıq cəm</span><span className="text-ink">₼{total.toFixed(2)}</span>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-[13px] text-free">
            <span>Endirim ({Math.round(appliedPromo.discount * 100)}%)</span>
            <span>−₼{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-[13px] text-muted">
          <span>Çatdırılma</span>
          <span className={deliveryFee === 0 ? 'font-semibold text-free' : 'text-ink'}>
            {deliveryFee === 0 ? 'Pulsuz' : `₼${deliveryFee.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="mb-4 border-t border-line pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-ink">Cəmi</span>
          <span className="tabular font-display text-xl font-bold text-ink">₼{finalTotal.toFixed(2)}</span>
        </div>
        <p className="mt-0.5 text-[11px] text-muted">Vergilər daxildir</p>
      </div>

      {user ? (
        <button
          onClick={onCheckout}
          className="w-full rounded-sm bg-primary py-2.5 text-xs font-bold tracking-widest text-white transition-colors hover:bg-primary-dark"
        >
          SİFARİŞİ TAMAMLA
        </button>
      ) : (
        <div className="space-y-2">
          <button
            onClick={onLogin}
            className="w-full rounded-sm bg-primary py-2.5 text-xs font-bold tracking-widest text-white transition-colors hover:bg-primary-dark"
          >
            DAXİL OL VƏ DAVAM ET
          </button>
          <p className="text-center text-[11px] text-muted">Sifarişi tamamlamaq üçün giriş tələb olunur</p>
        </div>
      )}

      <div className="mt-4 space-y-1.5 border-t border-line pt-3 text-[11px] text-muted">
        <div className="flex items-center gap-2"><Icon name="lock" size={15} className="text-muted-gold-text" /> Təhlükəsiz ödəniş</div>
        <div className="flex items-center gap-2"><Icon name="local_shipping" size={15} className="text-muted-gold-text" /> Pulsuz çatdırılma (₼{FREE_DELIVERY_THRESHOLD}+)</div>
        <div className="flex items-center gap-2"><Icon name="undo" size={15} className="text-muted-gold-text" /> Asan qaytarma</div>
      </div>
    </div>
  )
}