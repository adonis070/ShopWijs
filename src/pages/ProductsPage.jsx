import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from '../components/ProductList.jsx'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterGroup from '../components/FilterGroup.jsx'
import { getCategories, getProducts } from '../services/productService.js'
import { formatCategory } from '../utils/formatters.js'
import { filterProducts, sortProducts } from '../utils/productFilters.js'
import '../styles/ProductsPage.css'

const sortOptions = [
  { value: '', label: 'Standaard' },
  { value: 'prijs-oplopend', label: 'Prijs: laag naar hoog' },
  { value: 'prijs-aflopend', label: 'Prijs: hoog naar laag' },
]

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('categorie') || ''
  const sortOrder = searchParams.get('sortering') || ''

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

  function updateSearchParam(key, value) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)

      if (value) {
        nextParams.set(key, value)
      } else {
        nextParams.delete(key)
      }

      return nextParams
    })
  }

  const categoryOptions = [
    { value: '', label: 'Alle producten' },
    ...categories.map((category) => ({
      value: category,
      label: formatCategory(category),
    })),
  ]

  const hasActiveChoices =
    searchTerm.trim() !== '' || selectedCategory !== '' || sortOrder !== ''

  function resetAllChoices() {
    setSearchTerm('')
    setSearchParams({})
  }

  const filteredProducts = filterProducts(products, {
    searchTerm,
    category: selectedCategory,
  })
  const visibleProducts = sortProducts(filteredProducts, sortOrder)
  const resultLabel = visibleProducts.length === 1 ? 'product' : 'producten'

  const sortLabel = sortOptions.find((option) => option.value === sortOrder)?.label
  const activeChoices = [
    searchTerm.trim() && `zoekterm "${searchTerm.trim()}"`,
    selectedCategory && formatCategory(selectedCategory),
    sortOrder && sortLabel,
  ].filter(Boolean)

  return (
    <section className="page container">
      <div className="products-page">
        <aside className="products-page__filters">
          <h2 className="products-page__filters-title">Filters</h2>
          <FilterGroup
            title="Categorie"
            options={categoryOptions}
            selectedValue={selectedCategory}
            onChange={(category) => updateSearchParam('categorie', category)}
          />
          <FilterGroup
            title="Sorteren op prijs"
            options={sortOptions}
            selectedValue={sortOrder}
            onChange={(order) => updateSearchParam('sortering', order)}
          />
          <button
            type="button"
            className="products-page__reset"
            onClick={resetAllChoices}
            disabled={!hasActiveChoices}
          >
            Alles wissen
          </button>
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
                {activeChoices.length > 0 && (
                  <span className="products-page__choices">
                    {' · '}
                    {activeChoices.join(' · ')}
                  </span>
                )}
              </p>
              <ProductList
                products={visibleProducts}
                columns={3}
                emptyMessage="Geen producten gevonden. Pas je zoekterm of categorie aan, of kies 'Alles wissen'."
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
