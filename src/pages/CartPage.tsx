import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAuthModal } from '../context/AuthModalContext'
import { useCart } from '../context/CartContext'
import { usePromo } from '../hooks/usePromo'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/ToastContainer'
import { calcFinalTotal } from '../utils/cartCalc'
import { CheckoutModal } from '../components/checkout/CheckoutModal'
import EmptyCart from '../components/cart/EmptyCart'
import CartItem from '../components/cart/CartItem'
import OrderSummary from '../components/cart/OrderSummary'

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, total, count, loading } = useCart()
  const { toasts, error: showError } = useToast()
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const [showCheckout, setShowCheckout] = useState(false)

  const {
    promoInput, setPromoInput,
    appliedPromo,
    promoError, setPromoError,
    suggestionDismissed, setSuggestionDismissed, suggestionAvailable,
    applying, applyPromo, removePromo,
    confirmPromoUsed,
  } = usePromo()

  const { discountAmount, deliveryFee, finalTotal } = calcFinalTotal(total, appliedPromo?.discount ?? 0)

  // Xəta olsa (məs. stok çatmır) mesaj göstərilir
  const run = async (action: Promise<string | null>) => {
    const err = await action
    if (err) showError(err)
  }

  if (loading && items.length === 0) {
    return <div className="min-h-[50vh] flex items-center justify-center text-sm text-gray-400">Səbət yüklənir...</div>
  }

  if (items.length === 0) return <EmptyCart />

  return (
    <>
      <ToastContainer toasts={toasts} />
      {showCheckout && (
        <CheckoutModal
          subtotal={total}
          discountAmount={discountAmount}
          deliveryFee={deliveryFee}
          finalTotal={finalTotal}
          appliedPromo={appliedPromo}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false)
            void clearCart()
          }}
          confirmPromoUsed={confirmPromoUsed}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Səbət <span className="text-base sm:text-lg font-normal text-gray-400 ml-2 sm:ml-3">({count} kitab)</span>
            </h1>
            <button onClick={() => run(clearCart())}
              className="self-start sm:self-auto text-sm text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-4 py-1.5 transition-colors"
              style={{ borderRadius: 2 }}>
              Səbəti təmizlə
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-400">
                <div className="col-span-6">Kitab</div>
                <div className="col-span-3 text-center">Miqdar</div>
                <div className="col-span-2 text-right">Qiymət</div>
                <div className="col-span-1" />
              </div>

              {items.map((item, idx) => (
                <div key={item.id} style={{ borderBottom: idx < items.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <CartItem
                    id={item.id}
                    title={item.title}
                    author={item.author}
                    cover={item.cover}
                    price={item.price}
                    quantity={item.quantity}
                    available={item.available}
                    onInc={() => run(updateQty(item.id, item.quantity + 1))}
                    onDec={() => run(item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeFromCart(item.id))}
                    onRemove={() => run(removeFromCart(item.id))}
                  />
                </div>
              ))}

              <div className="pt-6">
                <Link to="/books" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Alışverişə davam et
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                items={items}
                total={total}
                discountAmount={discountAmount}
                deliveryFee={deliveryFee}
                finalTotal={finalTotal}
                appliedPromo={appliedPromo}
                promoInput={promoInput}         setPromoInput={setPromoInput}
                promoError={promoError}         setPromoError={setPromoError}
                suggestionDismissed={suggestionDismissed} setSuggestionDismissed={setSuggestionDismissed} suggestionAvailable={suggestionAvailable}
                applyPromo={applyPromo}         applying={applying}  removePromo={removePromo}
                user={user}
                onCheckout={() => setShowCheckout(true)}
                onLogin={openLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}