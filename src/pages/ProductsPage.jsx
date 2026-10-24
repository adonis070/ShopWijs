import { useEffect, useState } from 'react'
import ProductList from '../components/ProductList.jsx'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { getProducts } from '../services/productService.js'
import { filterProducts } from '../utils/productFilters.js'
import '../styles/ProductsPage.css'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getProducts(controller.signal)
        setProducts(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [reloadCount])

  const visibleProducts = filterProducts(products, { searchTerm })
  const resultLabel = visibleProducts.length === 1 ? 'product' : 'producten'

  return (
    <section className="page container">
      <div className="products-page">
        <div className="products-page__results">
          <h1 className="products-page__title">Producten</h1>

          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          {isLoading && (
            <LoadingIndicator message="Producten worden geladen..." />
          )}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => setReloadCount((count) => count + 1)}
            />
          )}

          {!isLoading && !error && (
            <>
              <p className="products-page__count" aria-live="polite">
                {visibleProducts.length} {resultLabel} gevonden
              </p>
              <ProductList
                products={visibleProducts}
                columns={3}
                emptyMessage="Geen producten gevonden. Pas je zoekterm aan."
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
