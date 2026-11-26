import { Link } from 'react-router-dom'
import type { ItemCart } from '../../types/wishlistPage'
import Icon from '../ui/Icon'

export default function WishlistItemCard({ item, onRemove, onAddToCart }: ItemCart) {
  const bookLink = `/books/${item.originalId ?? item.id}`
  const unavailable = !item.available

  return (
    <article className={`flex h-full flex-col rounded-md border border-line bg-white p-2 transition-colors hover:border-line-strong ${unavailable ? 'opacity-80' : ''}`}>
      <div className="relative mb-2 flex aspect-[3/4] items-center justify-center rounded-sm bg-panel p-3">
        <Link to={bookLink} className="h-full w-full">
          {item.cover
            ? <img src={item.cover} alt={item.title} className={`h-full w-full rounded-[2px] object-cover shadow-md ${unavailable ? 'grayscale' : ''}`} />
            : <div className="h-full w-full rounded-[2px] bg-sunken" />}
        </Link>

        <button
          onClick={() => onRemove(item.id)}
          title="Siyahıdan sil"
          aria-label="Siyahıdan sil"
          className="absolute right-1 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-sale transition-colors hover:bg-sale-soft"
        >
          <Icon name="favorite" size={16} filled />
        </button>

        {unavailable && (
          <span className="absolute bottom-1 left-1 rounded-full bg-sunken px-1.5 py-0.5 text-[11px] font-semibold text-muted">
            Stokda yoxdur
          </span>
        )}
      </div>

      <div className="mb-2 flex flex-1 flex-col gap-1">
        <Link to={bookLink}>
          <h3 className="line-clamp-2 min-h-[2.25rem] text-[13px] font-semibold leading-[18px] text-ink hover:underline">{item.title}</h3>
        </Link>
        <p className="line-clamp-1 text-xs text-muted">{item.author}</p>

        {item.rating > 0 && (
          <p className="tabular flex items-center gap-1 text-xs text-ink">
            <Icon name="star" size={14} filled className="text-muted-gold-text" />
            {item.rating}
            <span className="text-muted">({item.reviewCount})</span>
          </p>
        )}

        <div className="tabular mt-auto flex items-baseline justify-between gap-2 pt-1">
          <span className="text-[15px] font-semibold text-ink">{item.price}</span>
          <span className="text-[11px] text-muted">{item.addedDate}</span>
        </div>
      </div>

      <button
        onClick={() => item.available && onAddToCart(item.id, item.title)}
        disabled={unavailable}
        className="w-full rounded-sm bg-primary px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-sunken disabled:text-muted"
      >
        {unavailable ? 'Mövcud deyil' : 'Səbətə əlavə et'}
      </button>
    </article>
  )
}