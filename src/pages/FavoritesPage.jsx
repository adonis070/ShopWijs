import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteCard from '../components/FavoriteCard.jsx'
import LoadingIndicator from '../components/LoadingIndicator.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import SuccessMessage from '../components/SuccessMessage.jsx'
import { useAuth } from '../context/useAuth.js'
import { useFavorites } from '../context/useFavorites.js'
import { getProducts } from '../services/productService.js'
import '../styles/FavoritesPage.css'

function FavoritesPage() {
  const { user } = useAuth()
  const {
    favorites,
    isLoading: favoritesLoading,
    error: favoritesError,
    isPending,
    removeFavorite,
    reload: reloadFavorites,
  } = useFavorites()

  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [productsReloadCount, setProductsReloadCount] = useState(0)
  const [message, setMessage] = useState('')
  const [actionError, setActionError] = useState('')

  // Afbeelding, titel en prijs van de producten komen uit de Fake Store API
  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setProductsLoading(true)
      setProductsError('')

      try {
        const data = await getProducts(controller.signal)
        setProducts(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setProductsError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setProductsLoading(false)
        }
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [productsReloadCount])

  // Elk bewaard product één keer tonen, in de volgorde waarin het is toegevoegd
  const favoriteProductIds = [
    ...new Set(favorites.map((favorite) => favorite.productId)),
  ]
  const favoriteProducts = favoriteProductIds
    .map((productId) => products.find((product) => product.id === productId))
    .filter(Boolean)

  async function handleRemove(product) {
    setMessage('')
    setActionError('')

    try {
      await removeFavorite(product.id)
      setMessage(`"${product.title}" is verwijderd uit je favorieten.`)
    } catch (err) {
      setActionError(err.message)
    }
  }

  function handleRetry() {
    reloadFavorites()
    setProductsReloadCount((count) => count + 1)
  }

  const isLoading = favoritesLoading || productsLoading
  const error = favoritesError || productsError

  return (
    <section className="page container favorites-page">
      <h1 className="page-title">Mijn favorieten</h1>
      <p className="favorites-page__user">
        Ingelogd als <strong>{user.email}</strong>
      </p>

      {message && <SuccessMessage message={message} />}
      {actionError && <ErrorMessage message={actionError} />}

      {isLoading && <LoadingIndicator message="Je favorieten worden geladen..." />}

      {!isLoading && error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {!isLoading && !error && favoriteProducts.length === 0 && (
        <div className="favorites-page__empty">
          <p>Je hebt nog geen favorieten.</p>
          <p>
            Open een product en kies &apos;Toevoegen aan favorieten&apos; om
            het hier te bewaren.
          </p>
          <Link to="/producten" className="button">
            Bekijk producten
          </Link>
        </div>
      )}

      {!isLoading && !error && favoriteProducts.length > 0 && (
        <ul className="favorites-page__list">
          {favoriteProducts.map((product) => (
            <li key={product.id} className="favorites-page__item">
              <FavoriteCard
                product={product}
                onRemove={() => handleRemove(product)}
                isRemoving={isPending(product.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default FavoritesPage
