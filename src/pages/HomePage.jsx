import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList.jsx'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getProducts } from '../services/productService.js'
import { formatCategory } from '../utils/formatters.js'
import '../styles/HomePage.css'

const FEATURED_PRODUCT_COUNT = 4

// Kiest het eerste product uit elke categorie, zodat de selectie gevarieerd is
function getFeaturedProducts(products) {
  const featured = []

  for (const product of products) {
    const categoryIsNew = !featured.some(
      (item) => item.category === product.category,
    )
    if (categoryIsNew) {
      featured.push(product)
    }
  }

  return featured.slice(0, FEATURED_PRODUCT_COUNT)
}

function HomePage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

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

    // Breekt de aanroep af als de gebruiker de pagina verlaat
    return () => controller.abort()
  }, [reloadCount])

  const categories = [...new Set(products.map((product) => product.category))]
  const featuredProducts = getFeaturedProducts(products)

  return (
    <>
      <section className="hero">
        <div className="hero__content container">
          <h1 className="hero__title">Vind slim wat bij je past</h1>
          <p className="hero__text">
            Doorzoek producten, filter op categorie en bewaar je favorieten.
          </p>
          <Link to="/producten" className="button">
            Bekijk alle producten
          </Link>
        </div>
      </section>

      <section className="page container">
        <h2 className="home__heading">Shop per categorie</h2>

        {isLoading && <LoadingIndicator message="Producten worden geladen..." />}

        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => setReloadCount((count) => count + 1)}
          />
        )}

        {!isLoading && !error && (
          <>
            <ul className="category-buttons">
              <li>
                <Link to="/producten" className="category-buttons__link">
                  Alle
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/producten?categorie=${encodeURIComponent(category)}`}
                    className="category-buttons__link"
                  >
                    {formatCategory(category)}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="home__heading">Uitgelichte producten</h2>
            <ProductList products={featuredProducts} />
          </>
        )}
      </section>
    </>
  )
}

export default HomePage
