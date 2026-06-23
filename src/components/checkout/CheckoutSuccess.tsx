import { BACKGROUND_SOFT, PRIMARY, PRIMARY_DARK } from '../../constants/theme'
import { formatDateAz } from '../../utils/date'
import type { Succes } from '../../types/checkout'



export default function CheckoutSuccess({ deliveryDate, onOrders, onBooks }: Succes) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: BACKGROUND_SOFT }}>
        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Sifarişiniz Təsdiqləndi!</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-1">
        Sifarişiniz uğurla qəbul edildi. Tezliklə sizinlə əlaqə saxlanılacaq.
      </p>
      {deliveryDate && (
        <p className="text-sm font-medium mt-2 mb-1" style={{ color: PRIMARY }}>
          Təxmini çatdırılma: {formatDateAz(deliveryDate)}
        </p>
      )}
      <p className="text-xs text-gray-400 mb-8">
        Sifariş təfərrüatları telefon nömrənizə SMS vasitəsilə göndəriləcək.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={onOrders}
          className="w-full py-3 text-sm font-bold tracking-wider text-white transition-colors rounded-md"
          style={{ background: PRIMARY }}
          onMouseEnter={e => (e.currentTarget.style.background = PRIMARY_DARK)}
          onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}>
          SİFARİŞLƏRİMƏ BAX
        </button>
        <button onClick={onBooks}
          className="w-full py-3 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors rounded-md">
          Kitablara qayıt
        </button>
      </div>
    </div>
  )
}