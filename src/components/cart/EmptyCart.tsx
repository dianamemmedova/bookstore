import { Link } from 'react-router-dom'
import { PRIMARY } from '../../constants/theme'
import { CartIcon } from '../../icons/cart'

export default function EmptyCart() {
  return (
    <div className="min-h-[515px] bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#eef2f5]">
         <CartIcon color={PRIMARY} />
        </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Səbətiniz boşdur
            </h1>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Bəyəndiyiniz kitabları səbətə əlavə edin.
            </p>
        <Link to="/books" className="inline-block px-8 py-3 text-sm font-bold tracking-wider text-white" style={{ background: PRIMARY }}>
          KİTABLARA BAX
        </Link>
      </div>
    </div>
  )
}