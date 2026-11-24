import { PRIMARY, PRIMARY_DARK } from '../../constants/theme'
import { useCheckoutForm } from '../../hooks/useCheckoutForm'
import CheckoutSuccess  from './CheckoutSuccess'
import DeliveryForm     from './DeliveryForm'
import PaymentForm      from './PaymentForm'
import CheckoutSummary  from './CheckoutSummary'
import type { CheckoutModal as CheckoutModalProps } from '../../types/checkout'

export function CheckoutModal({
  subtotal, discountAmount, deliveryFee, finalTotal,
  appliedPromo, onClose, onSuccess,
}: CheckoutModalProps) {
  const {
    step, form, errors, payMethod, minDate, submitting, serverError, orderId,
    setPayMethod, inp, clearErr, inputClass,
    formatCard, formatExpiry,
    handleSubmit, handleSuccessNavigate,
  } = useCheckoutForm({
    subtotal, discountAmount, deliveryFee, finalTotal,
    appliedPromo, onSuccess,
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm"
        onClick={e => e.stopPropagation()}>

        {step === 'success' ? (
          <CheckoutSuccess
            deliveryDate={form.deliveryDate}
            orderId={orderId}
            onOrders={() => handleSuccessNavigate('/orders')}
            onBooks={() => handleSuccessNavigate('/books')}
          />
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Sifarişi Tamamla</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">
              <DeliveryForm
                form={form} errors={errors} minDate={minDate}
                inp={inp} clearErr={clearErr} inputClass={inputClass}
              />
              <PaymentForm
                payMethod={payMethod} setPayMethod={setPayMethod}
                form={form} errors={errors}
                inp={inp} clearErr={clearErr} inputClass={inputClass}
                formatCard={formatCard} formatExpiry={formatExpiry}
              />
              <CheckoutSummary
                subtotal={subtotal} discountAmount={discountAmount}
                deliveryFee={deliveryFee} finalTotal={finalTotal}
                appliedPromo={appliedPromo} deliveryDate={form.deliveryDate}
              />

              {serverError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-sm">{serverError}</p>
              )}

              <div className="flex gap-3 pb-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors rounded-sm"
                >
                  ← Səbətə Qayıt
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 py-3 text-sm font-bold tracking-wider text-white transition-colors rounded-sm disabled:opacity-60"
                  style={{ background: PRIMARY }}
                  onMouseEnter={e => (e.currentTarget.style.background = PRIMARY_DARK)}
                  onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}
                >
                  {submitting ? 'GÖNDƏRİLİR...' : 'TƏSDİQLƏ'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}