import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import BooksPage from './pages/BooksPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import BookDetailPage from './pages/BookDetailPage'
import MembershipPage from './pages/MembershipPage'
import StoresPage from './pages/StoresPage'
import GiftCardsPage from './pages/GiftCardsPage'
import BlogPage from './pages/BlogPage'
import WishlistPage from './pages/WishlistPage'
import ComingSoonPage from './pages/ComingSoonPage'
import FictionPage from './pages/FictionPage'
import NonFictionPage from './pages/NonfictionPage'
import OrdersPage from './pages/OrdersPage'
import MobileAppPage from './pages/MobileAppPage'
import AudiobooksPage from './pages/AudiobooksPage'
import DiscountedBooksPage from './pages/DiscountedBooksPage'

function App() {
  const { user } = useAuth()

  return (
    <CartProvider userEmail={user?.email}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/fiction" element={<FictionPage />} />
          <Route path="/nonfiction" element={<NonFictionPage />} />
          <Route path="/ebooks" element={<ComingSoonPage title="E-Kitablar" />} />
          <Route path="/kids" element={<ComingSoonPage title="Uşaqlar" />} />
          <Route path="/toys-games" element={<ComingSoonPage title="Oyuncaqlar & Oyunlar" />} />
          <Route path="/music-movies" element={<ComingSoonPage title="Musiqi & Film" />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/app" element={<MobileAppPage />} />
          <Route path="/audiobooks" element={<AudiobooksPage />} />
          <Route path="/clearance" element={<DiscountedBooksPage />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App