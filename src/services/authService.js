import { noviRequest } from './noviApi.js'

// Nieuwe accounts krijgen de rol uit de NOVI-configuratie (ShopWijs.json)
const DEFAULT_ROLE = 'user'

export async function registerUser(email, password) {
  const response = await noviRequest('/api/users', {
    method: 'POST',
    body: { email, password, roles: [DEFAULT_ROLE] },
  })

  if (response.status === 409) {
    throw new Error(
      'Er bestaat al een account met dit e-mailadres. Log in via het tabblad Inloggen.',
    )
  }

  if (response.status >= 400 && response.status < 500) {
    throw new Error(
      'Registreren is niet gelukt. Controleer je gegevens. Heb je al een account? Log dan in via het tabblad Inloggen.',
    )
  }

  if (!response.ok) {
    throw new Error('Registreren is niet gelukt. Probeer het later opnieuw.')
  }
}

// Geeft bij succes { token, user } terug, zoals beschreven in de NOVI-documentatie
export async function loginUser(email, password) {
  const response = await noviRequest('/api/login', {
    method: 'POST',
    body: { email, password },
  })

  if (response.status >= 400 && response.status < 500) {
    throw new Error('Inloggen is niet gelukt: onjuist e-mailadres of wachtwoord.')
  }

  if (!response.ok) {
    throw new Error('Inloggen is niet gelukt. Probeer het later opnieuw.')
  }

  const data = await response.json()

  if (!data.token) {
    throw new Error('Inloggen is niet gelukt. Probeer het later opnieuw.')
  }

  return {
    token: data.token,
    user: { email, ...data.user },
  }
}
