import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import ComparePage from './pages/ComparePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producten" element={<ProductsPage />} />
          <Route path="/producten/:id" element={<ProductDetailPage />} />
          <Route path="/favorieten" element={<FavoritesPage />} />
          <Route path="/vergelijken" element={<ComparePage />} />
          <Route path="/inloggen" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
