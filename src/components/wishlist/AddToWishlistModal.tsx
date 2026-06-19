import { useState } from 'react'
import { BORDER_DEFAULT, GOLD, PRIMARY } from '../../constants/theme'
import { PlusIcon } from '../../icons/bookspage'
import { toNumId } from '../../utils/idUtils'
import type { Props } from '../../types/book'

export default function AddToWishlistModal({ book, lists, onClose, onAdd, onCreateAndAdd }: Props) {
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const bookNumId = toNumId(book.id)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
         onClick={onClose}>
      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl relative"
           onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-lg">
          ✕
        </button>

        <h2 className="text-lg font-bold text-gray-900 mb-1">
          İstək Siyahısına Əlavə Et
        </h2>
        <p className="text-xs text-gray-400 mb-4 line-clamp-1">
          {book.title}
        </p>

        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {lists.map(list => {
            const alreadyIn = list.items.some(i => i.id === bookNumId)
            return (
              <button
                key={list.id}
                onClick={() => !alreadyIn && onAdd(list.id)}
                disabled={alreadyIn}
                className="w-full flex items-center justify-between px-3 py-2.5 border rounded-lg transition-colors text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: alreadyIn ? GOLD : BORDER_DEFAULT }}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#3d5a6b]">
                    {list.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {list.items.length} kitab · {list.privacy === 'private' ? 'Şəxsi' : 'İctimai'}
                    {alreadyIn ? ' · ✓ Artıq əlavədir' : ''}
                  </p>
                </div>
                {!alreadyIn && (
                  <PlusIcon className="w-4 h-4 text-gray-300 group-hover:text-[#3d5a6b]" />
                )}
              </button>
            )
          })}
        </div>

        {!creating ? (
          <button onClick={() => setCreating(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 border border-dashed border-gray-300 rounded-lg hover:border-[#3d5a6b] text-sm text-gray-500 hover:text-[#3d5a6b] transition-colors" >
              <PlusIcon className="w-4 h-4" />
                 Yeni Siyahı Yarat və Əlavə Et
         </button>
        ) : (
          <div className="flex gap-2">
            <input autoFocus
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Siyahının adı..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#3d5a6b]"
              onKeyDown={e => { if (e.key === 'Enter' && newName.trim()) onCreateAndAdd(newName.trim()) }}
            />
            <button onClick={() => { if (newName.trim()) onCreateAndAdd(newName.trim()) }}
              className="px-3 py-2 text-sm font-medium text-white rounded-lg" style={{ background: PRIMARY }}>
              Yarat
            </button>
          </div>
        )}
      </div>
    </div>
  )
}