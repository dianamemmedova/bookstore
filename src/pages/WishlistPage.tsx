import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlistPage } from '../hooks/useWishlistPage'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/ToastContainer'
import { EmptyState, WishlistFormModal, WishlistSidebar, WishlistItemList } from '../components/wishlist'

export default function WishlistPage() {
  const { user } = useAuth()
  const toast = useToast()
  const { addToCart } = useCart()
  const {
    lists, loading, activeListId, setActiveListId, activeList,
    sortBy, setSortBy, results, setResults,
    showCreateModal, setShowCreateModal,
    showEditModal, setShowEditModal,
    removeItem, createList, editList,
    sortedItems,
  } = useWishlistPage(toast.error)

  const handleAddToCart = async (itemId: number, title: string) => {
    const item = activeList?.items.find((i) => i.id === itemId)
    if (!item) return
    const err = await addToCart({
      id: String(itemId), title, author: item.author, cover: item.cover, price: 0,
      genre: '', rating: item.rating, description: '', year: 0, pages: 0,
    })
    if (err) toast.error(err)
    else toast.success(`"${title.slice(0, 24)}..." səbətə əlavə edildi`)
  }

  if (!user) return <EmptyState />
  if (!activeList) {
    return <div className="min-h-[50vh] flex items-center justify-center text-sm text-gray-400">{loading ? 'Yüklənir...' : 'Siyahı tapılmadı'}</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer toasts={toast.toasts} />

      {showCreateModal && (
        <WishlistFormModal mode="create" onClose={() => setShowCreateModal(false)} onSave={createList} />
      )}
      {showEditModal && (
        <WishlistFormModal
          mode="edit"
          initialName={activeList.name}
          initialPrivacy={activeList.privacy}
          onClose={() => setShowEditModal(false)}
          onSave={editList}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-center mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl text-gray-900" >Sevimlilərim</h1>
        </div>

        <div className="flex gap-10">
          <WishlistSidebar
            lists={lists}
            activeListId={activeListId}
            onSelect={setActiveListId}
            onCreateClick={() => setShowCreateModal(true)}
          />
          <WishlistItemList
            activeList={activeList}
            sortedItems={sortedItems}
            sortBy={sortBy}
            results={results}
            onSortChange={setSortBy}
            onResultsChange={setResults}
            onEditClick={() => setShowEditModal(true)}
            onRemove={removeItem}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}