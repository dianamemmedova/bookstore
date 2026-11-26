import { Link } from 'react-router-dom'
import WishlistItemCard from './WishlistItemCard'
import Icon from '../ui/Icon'
import type { WishlistItemLists } from '../../types/wishlistPage'
import { SORT_OPTIONS, RESULT_OPTIONS } from '../../data/wishtlist'

const selectCls = 'rounded-sm border border-line bg-panel px-2 py-1.5 text-xs text-ink outline-none focus:border-primary'

export default function WishlistItemList({
  activeList, sortedItems, sortBy, results,
  onSortChange, onResultsChange, onEditClick, onRemove, onAddToCart,
}: WishlistItemLists) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-xl font-bold text-ink">{activeList.name}</h2>
          <span className="inline-flex items-center gap-1 rounded-full border border-line bg-panel px-2 py-0.5 text-[11px] font-semibold text-muted">
            <Icon name={activeList.privacy === 'private' ? 'lock' : 'public'} size={13} />
            {activeList.privacy === 'private' ? 'Şəxsi' : 'İctimai'}
          </span>
          <span className="tabular text-xs text-muted">{sortedItems.length} / {activeList.items.length} kitab</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={sortBy} onChange={e => onSortChange(e.target.value)} className={selectCls}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={results} onChange={e => onResultsChange(e.target.value)} className={selectCls} title="Səhifədə göstər">
            {RESULT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            onClick={onEditClick}
            className="inline-flex items-center gap-1 rounded-sm border border-line-strong bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-panel"
          >
            <Icon name="edit" size={15} />
            Redaktə et
          </button>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="rounded-md border border-dashed border-line-strong bg-white py-16 text-center text-sm text-muted">
          <Icon name="favorite" size={32} className="mb-2 text-line-strong" />
          <p>Bu siyahı boşdur.</p>
          <Link to="/books" className="mt-1 inline-block font-semibold text-primary hover:underline">Kitablara bax</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {sortedItems.map((item, index) => (
            <WishlistItemCard key={item.id} item={item} index={index} onRemove={onRemove} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  )
}