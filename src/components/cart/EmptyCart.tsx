import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

export default function EmptyCart() {
  return (
    <div className="flex min-h-[460px] items-center justify-center bg-surface px-4">
      <div className="max-w-sm rounded-md border border-line bg-white px-8 py-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-panel text-primary">
          <Icon name="shopping_cart" size={32} />
        </div>
        <h1 className="mb-1.5 font-display text-xl font-bold text-ink">Səbətiniz boşdur</h1>
        <p className="mb-6 text-sm leading-relaxed text-muted">Bəyəndiyiniz kitabları səbətə əlavə edin.</p>
        <Link
          to="/books"
          className="inline-block rounded-sm bg-primary px-6 py-2.5 text-xs font-bold tracking-widest text-white transition-colors hover:bg-primary-dark"
        >
          KİTABLARA BAX
        </Link>
      </div>
    </div>
  )
}