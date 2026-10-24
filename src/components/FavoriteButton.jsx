import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage.jsx'
import SuccessMessage from './SuccessMessage.jsx'
import { useAuth } from '../context/useAuth.js'
import { useFavorites } from '../context/useFavorites.js'
import '../styles/FavoriteButton.css'

function FavoriteButton({ productId }) {
  const { isAuthenticated } = useAuth()
  const { isFavorite, isPending, isLoading, addFavorite, removeFavorite } =
    useFavorites()
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const isSaved = isAuthenticated && isFavorite(productId)
  const isBusy = isPending(productId) || (isAuthenticated && isLoading)

  async function handleClick() {
    // Niet ingelogd: eerst naar het inlogformulier, daarna terug naar dit product
    if (!isAuthenticated) {
      navigate('/inloggen', {
        state: {
          from: location,
          message: 'Log in om producten aan je favorieten toe te voegen.',
        },
      })
      return
    }

    setMessage('')
    setError('')

    try {
      if (isSaved) {
        await removeFavorite(productId)
        setMessage('Het product is verwijderd uit je favorieten.')
      } else {
        await addFavorite(productId)
        setMessage('Het product is toegevoegd aan je favorieten.')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  let label = 'Toevoegen aan favorieten'
  if (isPending(productId)) {
    label = 'Bezig met opslaan...'
  } else if (isSaved) {
    label = 'Verwijderen uit favorieten'
  }

  return (
    <div className="favorite-button">
      <button
        type="button"
        className={`button favorite-button__button${isSaved ? ' favorite-button__button--saved' : ''}`}
        onClick={handleClick}
        disabled={isBusy}
      >
        <span className="favorite-button__heart" aria-hidden="true">
          {isSaved ? '♥' : '♡'}
        </span>
        {label}
      </button>

      {message && (
        <SuccessMessage message={message}>
          <Link to="/favorieten">Bekijk je favorieten</Link>
        </SuccessMessage>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default FavoriteButton
