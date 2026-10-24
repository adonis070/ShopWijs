import { useEffect, useState } from 'react'
import ProductSelect from '../components/ProductSelect.jsx'
import ComparisonTable from '../components/ComparisonTable.jsx'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getProducts } from '../services/productService.js'
import { formatPrice } from '../utils/formatters.js'
import '../styles/ComparePage.css'

// Klein voorbeeld van het gekozen product in een keuzepaneel
function SelectedProductPreview({ product }) {
  if (!product) {
    return <p className="compare-panel__empty">Nog geen product gekozen</p>
  }

  return (
    <div className="compare-panel__preview">
      <img src={product.image} alt="" className="compare-panel__image" />
      <p className="compare-panel__title">{product.title}</p>
      <p className="compare-panel__price">{formatPrice(product.price)}</p>
    </div>
  )
}

function ComparePage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [firstId, setFirstId] = useState('')
  const [secondId, setSecondId] = useState('')
  const [showComparison, setShowComparison] = useState(false)

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

  const firstProduct = products.find((product) => String(product.id) === firstId)
  const secondProduct = products.find((product) => String(product.id) === secondId)
  const bothSelected = Boolean(firstProduct && secondProduct)

  return (
    <section className="page container">
      <h1 className="page-title">Producten vergelijken</h1>
      <p className="compare-page__intro">
        Kies twee producten en klik op Vergelijken om afbeelding, titel, prijs,
        categorie, beoordeling en beschrijving naast elkaar te zien.
      </p>

      {isLoading && <LoadingIndicator message="Producten worden geladen..." />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => setReloadCount((count) => count + 1)}
        />
      )}

      {!isLoading && !error && (
        <>
          <div className="compare-page__panels">
            <div className="compare-panel">
              <ProductSelect
                label="Product 1"
                products={products}
                value={firstId}
                onChange={setFirstId}
                unavailableId={secondId}
              />
              <SelectedProductPreview product={firstProduct} />
            </div>

            <div className="compare-panel">
              <ProductSelect
                label="Product 2"
                products={products}
                value={secondId}
                onChange={setSecondId}
                unavailableId={firstId}
              />
              <SelectedProductPreview product={secondProduct} />
            </div>
          </div>

          <div className="compare-page__actions">
            <button
              type="button"
              className="button"
              onClick={() => setShowComparison(true)}
            >
              Vergelijken
            </button>
          </div>

          {/* Na een klik op Vergelijken blijft de vergelijking meelopen met de keuzes (F21) */}
          {showComparison && !bothSelected && (
            <p className="compare-page__notice" role="status">
              Selecteer twee producten om ze te vergelijken.
            </p>
          )}

          {showComparison && bothSelected && (
            <ComparisonTable products={[firstProduct, secondProduct]} />
          )}
        </>
      )}
    </section>
  )
}

export default ComparePage
