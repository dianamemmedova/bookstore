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
import PageHero from '../components/shared/PageHero'
import FreeShippingBar from '../components/cart/FreeShippingBar'
import CartSuggestions from '../components/cart/CartSuggestions'
import Icon from '../components/ui/Icon'

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, total, count, loading, reloadCart } = useCart()
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
  } = usePromo()

  const { discountAmount, deliveryFee, finalTotal } = calcFinalTotal(total, appliedPromo?.discount ?? 0)

  // Xəta olsa (məs. stok çatmır) mesaj göstərilir
  const run = async (action: Promise<string | null>) => {
    const err = await action
    if (err) showError(err)
  }

  // Sifariş verilən kimi server səbəti boşaldır; modal açıq qalmalıdır ki, istifadəçi "Sifarişi qəbul edildi" ekranını görsün
  const closeCheckout = () => {
    setShowCheckout(false)
    void reloadCart()
  }

  const checkoutModal = showCheckout && (
    <CheckoutModal
      subtotal={total}
      discountAmount={discountAmount}
      deliveryFee={deliveryFee}
      finalTotal={finalTotal}
      appliedPromo={appliedPromo}
      onClose={closeCheckout}
      onSuccess={closeCheckout}
    />
  )

  // Modal həmişə eyni yerdə render olunur: səbət boşalanda (sifariş verilən an) modal sıfırlanmasın
  const content = items.length === 0
    ? (loading && !showCheckout
        ? <div className="min-h-[50vh] flex items-center justify-center text-sm text-muted">Səbət yüklənir...</div>
        : <EmptyCart />)
    : (
      <div className="min-h-screen bg-surface">
        <PageHero
          eyebrow="Alış-veriş"
          title="Səbət"
          subtitle="Seçdiyiniz kitabları yoxlayın və sifarişi tamamlayın."
          covers={items.map((i) => i.cover)}
          stats={[
            { value: count, label: 'kitab' },
            { value: `₼${total.toFixed(2)}`, label: 'aralıq cəm' },
          ]}
        />

        <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-start gap-6 px-4 py-6 lg:grid-cols-[1fr_360px] lg:px-6">
          <div className="flex min-w-0 flex-col gap-3">
            <FreeShippingBar amount={total - discountAmount} />

            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                author={item.author}
                cover={item.cover}
                price={item.price}
                originalPrice={item.originalPrice}
                discountPercent={item.discountPercent}
                quantity={item.quantity}
                available={item.available}
                onInc={() => run(updateQty(item.id, item.quantity + 1))}
                onDec={() => run(item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeFromCart(item.id))}
                onRemove={() => run(removeFromCart(item.id))}
              />
            ))}

            <div className="flex items-center justify-between">
              <Link to="/books" className="inline-flex items-center gap-1 text-[13px] font-medium text-muted transition-colors hover:text-ink">
                <Icon name="arrow_back" size={16} />
                Alışverişə davam et
              </Link>
              <button
                onClick={() => run(clearCart())}
                className="rounded-sm border border-line-strong bg-white px-3 py-1.5 text-xs text-sale transition-colors hover:bg-sale-soft"
              >
                Səbəti təmizlə
              </button>
            </div>

            <CartSuggestions onError={showError} />
          </div>

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
    )

  return (
    <>
      <ToastContainer toasts={toasts} />
      {checkoutModal}
      {content}
    </>
  )
}