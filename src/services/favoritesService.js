import { noviRequest } from './noviApi.js'

// Zet een foutstatus van de NOVI API om naar een begrijpelijke melding
function createError(status, fallbackMessage) {
  if (status === 401) {
    return new Error('Je sessie is verlopen. Log opnieuw in om je favorieten te beheren.')
  }

  if (status === 403) {
    return new Error('Je hebt geen toegang tot deze favorieten.')
  }

  return new Error(fallbackMessage)
}

// Haalt alleen de favorieten van deze gebruiker op: [{ id, userId, productId }]
export async function getFavorites(userId, token, signal) {
  const response = await noviRequest(`/api/users/${userId}/favorites`, {
    token,
    signal,
  })

  if (!response.ok) {
    throw createError(
      response.status,
      'Het ophalen van je favorieten is niet gelukt. Probeer het later opnieuw.',
    )
  }

  return response.json()
}

export async function addFavorite(userId, productId, token) {
  const response = await noviRequest('/api/favorites', {
    method: 'POST',
    token,
    body: { userId, productId },
  })

  if (!response.ok) {
    throw createError(
      response.status,
      'Het product kon niet aan je favorieten worden toegevoegd. Probeer het later opnieuw.',
    )
  }
}

export async function deleteFavorite(favoriteId, token) {
  const response = await noviRequest(`/api/favorites/${favoriteId}`, {
    method: 'DELETE',
    token,
  })

  if (!response.ok) {
    throw createError(
      response.status,
      'Het product kon niet uit je favorieten worden verwijderd. Probeer het later opnieuw.',
    )
  }
}
