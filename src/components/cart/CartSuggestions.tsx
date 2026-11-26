import { Link } from 'react-router-dom'
import { fetchTrending } from '../../services/bookService'
import { useBooks } from '../../hooks/useBooks'
import { useCart } from '../../context/CartContext'
import { COVER_FALLBACK } from '../../constants/theme'
import Icon from '../ui/Icon'

// "Bunu da əlavə edin": səbətdə olmayan populyar kitablardan 4-ü
export default function CartSuggestions({ onError }: { onError: (msg: string) => void }) {
  const { items, addToCart } = useCart()
  const { books } = useBooks(() => fetchTrending(12), [])

  const inCart = new Set(items.map((i) => i.id))
  const list = books.filter((b) => !inCart.has(String(b.id)) && b.price != null).slice(0, 4)
  if (list.length === 0) return null

  const add = async (b: (typeof list)[number]) => {
    const err = await addToCart({
      id: String(b.id),
      title: b.title,
      author: b.authors[0] ?? 'Naməlum müəllif',
      cover: b.coverUrl ?? COVER_FALLBACK,
      genre: b.subjects[0] ?? '',
      rating: b.ratingsAverage ?? 0,
      description: b.description ?? '',
      year: b.firstPublishYear ?? 0,
      pages: b.pages ?? 0,
      price: b.price ?? 0,
    })
    if (err) onError(err)
  }

  return (
    <section className="rounded-md border border-line bg-white p-4">
      <h2 className="mb-3 font-display text-base font-bold text-ink">Bunu da əlavə edin</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {list.map((b) => (
          <div key={b.id} className="flex flex-col gap-1.5">
            <Link to={`/books/${b.id}`} className="flex aspect-[3/4] items-center justify-center rounded-sm bg-panel p-3">
              <img
                src={b.coverUrl ?? COVER_FALLBACK}
                alt={b.title}
                className="h-full w-full rounded-[2px] object-cover shadow-md"
                onError={e => { e.currentTarget.src = COVER_FALLBACK; e.currentTarget.onerror = null }}
              />
            </Link>
            <Link to={`/books/${b.id}`} className="line-clamp-2 min-h-[2.25rem] text-[13px] font-semibold leading-[18px] text-ink hover:underline">
              {b.title}
            </Link>
            <div className="tabular flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">₼{b.price}</span>
              <button
                onClick={() => add(b)}
                title="Səbətə əlavə et"
                aria-label="Səbətə əlavə et"
                className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-white transition-colors hover:bg-primary-dark"
              >
                <Icon name="add_shopping_cart" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}