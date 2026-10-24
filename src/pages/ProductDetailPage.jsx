import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Rating from '../components/Rating.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import { getProductById } from '../services/productService.js'
import { formatCategory, formatPrice } from '../utils/formatters.js'
import '../styles/ProductDetailPage.css'

function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getProductById(id, controller.signal)
        setProduct(data)
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

    loadProduct()

    return () => controller.abort()
  }, [id, reloadCount])

  if (isLoading) {
    return (
      <section className="page container">
        <LoadingIndicator message="Product wordt geladen..." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="page container">
        <ErrorMessage
          message={error}
          onRetry={() => setReloadCount((count) => count + 1)}
        />
        <div className="page-actions">
          <Link to="/" className="button">
            Terug naar home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page container">
      <article className="product-detail">
        <div className="product-detail__image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail__image"
          />
        </div>

        <div className="product-detail__info">
          <p className="product-detail__category">
            {formatCategory(product.category)}
          </p>
          <h1 className="product-detail__title">{product.title}</h1>
          <Rating rate={product.rating.rate} count={product.rating.count} />
          <p className="product-detail__price">{formatPrice(product.price)}</p>

          <div className="product-detail__description">
            <h2>Beschrijving</h2>
            <p>{product.description}</p>
          </div>

          <FavoriteButton productId={product.id} />
        </div>
      </article>
    </section>
  )
}

export default ProductDetailPage
