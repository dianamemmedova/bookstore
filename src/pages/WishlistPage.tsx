import { useAuth } from '../context/AuthContext'
import { useWishlistPage } from '../hooks/useWishlistPage'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/ToastContainer'
import { EmptyState, WishlistFormModal, WishlistSidebar, WishlistItemList } from '../components/wishlist'

const CART_KEY = 'bookstore_cart'

export default function WishlistPage() {
  const { user } = useAuth()
  const toast = useToast()
  const {
    lists, activeListId, setActiveListId, activeList,
    sortBy, setSortBy, results, setResults,
    showCreateModal, setShowCreateModal,
    showEditModal, setShowEditModal,
    removeItem, createList, editList,
    sortedItems,
  } = useWishlistPage()

  const handleAddToCart = (itemId: number, title: string) => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      const cart: { id: number; title: string; qty: number }[] = raw ? JSON.parse(raw) : []
      const existing = cart.find(c => c.id === itemId)
      if (existing) existing.qty += 1
      else cart.push({ id: itemId, title, qty: 1 })
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch { /* silent */ }
    toast.success(`"${title.slice(0, 24)}..." səbətə əlavə edildi`)
  }

  if (!user) return <EmptyState />

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
          initialDesc={activeList.description}
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