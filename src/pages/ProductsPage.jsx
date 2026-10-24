import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from '../components/ProductList.jsx'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterGroup from '../components/FilterGroup.jsx'
import { getCategories, getProducts } from '../services/productService.js'
import { formatCategory } from '../utils/formatters.js'
import { filterProducts } from '../utils/productFilters.js'
import '../styles/ProductsPage.css'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  // De categorie staat in de URL, zodat de categorieknoppen op de homepage hiernaar linken
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('categorie') || ''

  useEffect(() => {
    const controller = new AbortController()

    async function loadProductsAndCategories() {
      setIsLoading(true)
      setError('')

      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(controller.signal),
          getCategories(controller.signal),
        ])
        setProducts(productData)
        setCategories(categoryData)
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

    loadProductsAndCategories()

    return () => controller.abort()
  }, [reloadCount])

  function handleCategoryChange(category) {
    setSearchParams(category ? { categorie: category } : {})
  }

  const categoryOptions = [
    { value: '', label: 'Alle producten' },
    ...categories.map((category) => ({
      value: category,
      label: formatCategory(category),
    })),
  ]

  const visibleProducts = filterProducts(products, {
    searchTerm,
    category: selectedCategory,
  })
  const resultLabel = visibleProducts.length === 1 ? 'product' : 'producten'

  return (
    <section className="page container">
      <div className="products-page">
        <aside className="products-page__filters">
          <h2 className="products-page__filters-title">Filters</h2>
          <FilterGroup
            title="Categorie"
            options={categoryOptions}
            selectedValue={selectedCategory}
            onChange={handleCategoryChange}
          />
        </aside>

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
                emptyMessage="Geen producten gevonden. Pas je zoekterm of categorie aan."
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
