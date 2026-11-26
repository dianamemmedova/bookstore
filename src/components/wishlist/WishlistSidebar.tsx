import { Link } from 'react-router-dom'
import type { WishtListSidebar } from '../../types/wishlistPage'
import Icon from '../ui/Icon'

export default function WishlistSidebar({ lists, activeListId, onSelect, onCreateClick }: WishtListSidebar) {
  return (
    <aside className="w-full flex-shrink-0 lg:w-64">
      <div className="rounded-md border border-line bg-white p-4 lg:sticky lg:top-36">
        <h3 className="mb-3 border-b border-line pb-2 font-display text-[17px] font-bold text-ink">Siyahılarım</h3>

        <ul className="flex flex-col gap-1">
          {lists.map(list => {
            const active = activeListId === list.id
            return (
              <li key={list.id}>
                <button
                  onClick={() => onSelect(list.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-sm px-3 py-2 text-left text-[13px] transition-colors ${
                    active ? 'bg-primary font-semibold text-white' : 'text-ink hover:bg-panel'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon name={list.privacy === 'private' ? 'lock' : 'public'} size={15} className={active ? 'text-white/80' : 'text-muted'} />
                    <span className="truncate">{list.name}</span>
                  </span>
                  <span className={`tabular rounded-full px-1.5 text-[11px] ${active ? 'bg-white/20' : 'bg-sunken text-muted'}`}>
                    {list.items.length}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <button
          onClick={onCreateClick}
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-sm border border-dashed border-line-strong px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:border-primary hover:text-primary"
        >
          <Icon name="add" size={16} />
          Yeni siyahı yarat
        </button>

        <Link
          to="/books"
          className="mt-2 flex items-center justify-center gap-1 px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink"
        >
          Kitablara bax <Icon name="arrow_forward" size={14} />
        </Link>
      </div>
    </aside>
  )
}