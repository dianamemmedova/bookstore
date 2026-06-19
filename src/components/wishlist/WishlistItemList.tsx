import { Link } from 'react-router-dom'
import CustomDropdown from '../ui/CustomDropdown'
import WishlistItemCard from './WishlistItemCard'
import type { WishlistItemLists } from '../../types/wishlistPage'
import { SORT_OPTIONS , RESULT_OPTIONS } from '../../data/wishtlist'



export default function WishlistItemList({
  activeList, sortedItems, sortBy, results,
  onSortChange, onResultsChange, onEditClick, onRemove, onAddToCart,
}: WishlistItemLists) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-2xl text-gray-900" >
            {activeList.name}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Bu siyahı: <span className="font-medium text-gray-700">
              {activeList.privacy === 'private' ? 'Şəxsi' : 'İctimai'}
            </span>
          </p>
        </div>
        <button onClick={onEditClick}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Siyahını Redaktə Et
        </button>
      </div>

      <div className="border-t border-gray-200 mt-4 pt-5">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            1 - {sortedItems.length} / {activeList.items.length} məhsul
          </p>
          <div className="flex items-center gap-3">
            <CustomDropdown value={sortBy} options={SORT_OPTIONS} onChange={onSortChange} />
            <CustomDropdown value={results} options={RESULT_OPTIONS} onChange={onResultsChange} />
          </div>
        </div>

        {sortedItems.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Bu siyahı boşdur.{' '}
            <Link to="/books" className="underline text-gray-600 hover:text-gray-900">Kitablara bax</Link>
          </div>
        ) : (
          <div>
            {sortedItems.map((item, index) => (
              <WishlistItemCard key={item.id} item={item} index={index} onRemove={onRemove} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}