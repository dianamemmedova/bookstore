import { Link } from 'react-router-dom'
import type { WishtListSidebar } from '../../types/wishlistPage'

export default function WishlistSidebar({ lists, activeListId, onSelect, onCreateClick }: WishtListSidebar) {
  return (
    <div className="w-48 flex-shrink-0">
      <h3 className="text-[18px] font-semibold uppercase tracking-widest text-gray-900 mb-4">Siyahılarınız</h3>
      <ul className="space-y-1 mb-4">
        {lists.map(list => (
          <li key={list.id}>
            <button onClick={() => onSelect(list.id)}
              className="text-sm w-full text-left py-1 transition-colors"
              style={{ color: activeListId === list.id ? '#1a1a1a' : '#6b7280', fontWeight: activeListId === list.id ? 600 : 400 }}>
              {list.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <button onClick={onCreateClick}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <span className="text-lg leading-none">+</span>
          Yeni Siyahı Yarat
        </button>
        <Link
          to="/books"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-lg leading-none">›</span>
          Kitablara Bax
        </Link>
      </div>
    </div>
  )
}