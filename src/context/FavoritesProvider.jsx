import { useEffect, useRef, useState } from 'react'
import { FavoritesContext } from './FavoritesContext.js'
import { useAuth } from './useAuth.js'
import {
  addFavorite as addFavoriteRequest,
  deleteFavorite,
  getFavorites,
} from '../services/favoritesService.js'

function FavoritesProvider({ children }) {
  const { user, token } = useAuth()
  const userId = user?.id ?? null

  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [pendingProductIds, setPendingProductIds] = useState([])

  // Synchrone vergrendeling per product, zodat een dubbele klik geen dubbele request geeft
  const pendingRef = useRef(new Set())

  useEffect(() => {
    const controller = new AbortController()

    async function loadFavorites() {
      if (!userId || !token) {
        setFavorites([])
        setError('')
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const data = await getFavorites(userId, token, controller.signal)
        setFavorites(data)
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

    loadFavorites()

    return () => controller.abort()
  }, [userId, token, reloadCount])

  function isFavorite(productId) {
    return favorites.some((favorite) => favorite.productId === productId)
  }

  function isPending(productId) {
    return pendingProductIds.includes(productId)
  }

  async function runForProduct(productId, action) {
    pendingRef.current.add(productId)
    setPendingProductIds((ids) => [...ids, productId])

    try {
      await action()
    } finally {
      pendingRef.current.delete(productId)
      setPendingProductIds((ids) => ids.filter((id) => id !== productId))
    }
  }

  async function addFavorite(productId) {
    if (!userId || isFavorite(productId) || pendingRef.current.has(productId)) {
      return
    }

    await runForProduct(productId, async () => {
      await addFavoriteRequest(userId, productId, token)
      // Opnieuw ophalen, zodat de lijst het id bevat dat de server heeft aangemaakt
      setFavorites(await getFavorites(userId, token))
    })
  }

  async function removeFavorite(productId) {
    const savedFavorites = favorites.filter(
      (favorite) => favorite.productId === productId,
    )

    if (savedFavorites.length === 0 || pendingRef.current.has(productId)) {
      return
    }

    await runForProduct(productId, async () => {
      try {
        // Verwijder elke opgeslagen koppeling voor dit product, ook eventuele dubbele
        for (const favorite of savedFavorites) {
          await deleteFavorite(favorite.id, token)
        }
        setFavorites((current) =>
          current.filter((favorite) => favorite.productId !== productId),
        )
      } catch (err) {
        // Bij een fout de lijst opnieuw ophalen, zodat die klopt met de server
        setReloadCount((count) => count + 1)
        throw err
      }
    })
  }

  const value = {
    favorites,
    isLoading,
    error,
    isFavorite,
    isPending,
    addFavorite,
    removeFavorite,
    reload: () => setReloadCount((count) => count + 1),
  }

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  )
}

export default FavoritesProvider
