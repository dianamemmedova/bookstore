import { PRIMARY, GREEN, GREEN_DARK, PRIMARY_DARK } from '../../constants/theme'
import { FREE_DELIVERY_THRESHOLD } from '../../data/promoCodes'
import PromoSection from './PromoSection'
import type { OrderSummaryProps } from '../../types/cart'
import { ShieldIcon, CardIcon } from '../../icons/cart'


export default function OrderSummary({
  items, total, discountAmount, deliveryFee, finalTotal, appliedPromo,
  promoInput, setPromoInput, promoError, setPromoError,
  suggestionDismissed, setSuggestionDismissed, suggestionAvailable, applyPromo, applying, removePromo,
  user, onCheckout, onLogin,
}: OrderSummaryProps) {
  return (
    <div className="bg-white border border-gray-200 p-5 sm:p-6 lg:sticky lg:top-24 rounded-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-4 border-b border-gray-100">Sifariş xülasəsi</h2>

      <div className="space-y-3 mb-5">
        {items.map(item => (
          <div key={item.id} className="flex items-start justify-between gap-2">
            <span className="text-xs text-gray-600 line-clamp-2 flex-1 leading-snug">
              {item.title}{item.quantity > 1 && <span className="text-gray-400"> ×{item.quantity}</span>}
            </span>
            <span className="text-xs font-medium text-gray-900 flex-shrink-0 text-right">
              {item.originalPrice != null && (
                <span className="mr-1.5 text-gray-400 line-through">₼{(item.originalPrice * item.quantity).toFixed(2)}</span>
              )}
              <span className={item.originalPrice != null ? 'text-red-600' : ''}>₼{(item.price * item.quantity).toFixed(2)}</span>
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

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Aralıq cəm</span><span>₼{total.toFixed(2)}</span>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-xs text-green-600">
            <span>Endirim ({Math.round(appliedPromo.discount * 100)}%)</span>
            <span>−₼{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-xs text-gray-500">
          <span>Çatdırılma</span>
          <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
            {deliveryFee === 0 ? 'Pulsuz 🎉' : `₼${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        {deliveryFee > 0 && (
          <p className="text-xs text-gray-400 italic">₼{FREE_DELIVERY_THRESHOLD}+ sifarişdə pulsuz çatdırılma</p>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Cəmi</span>
          <span className="text-xl font-bold text-gray-900">₼{finalTotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Vergilər daxildir</p>
      </div>

      {user ? (
        <button onClick={onCheckout} className="w-full py-3.5 text-sm font-bold tracking-widest text-white transition-colors"
          style={{ background: PRIMARY, borderRadius: 2 }}
          onMouseEnter={e => (e.currentTarget.style.background = PRIMARY_DARK )}
          onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}>
          SİFARİŞİ TAMAMLA
        </button>
      ) : (
        <div className="space-y-3">
          <button onClick={onLogin} className="w-full py-3.5 text-sm font-bold tracking-widest text-white transition-colors"
            style={{ background: GREEN, borderRadius: 2 }}
            onMouseEnter={e => (e.currentTarget.style.background = GREEN_DARK )}
            onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
            DAXİL OL VƏ DAVAM ET
          </button>
          <p className="text-xs text-center text-gray-400">Sifarişi tamamlamaq üçün giriş tələb olunur</p>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ShieldIcon />
          Təhlükəsiz ödəniş
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
            <CardIcon />
          Pulsuz çatdırılma (₼{FREE_DELIVERY_THRESHOLD}+)
        </div>
      </div>
    </div>
  )
}