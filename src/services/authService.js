const NOVI_API_URL =
  import.meta.env.VITE_NOVI_API_URL ||
  'https://novi-backend-api-wgsgz.ondigitalocean.app'
const NOVI_PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID

// Nieuwe accounts krijgen de rol uit de NOVI-configuratie (ShopWijs.json)
const DEFAULT_ROLE = 'user'

// Stuurt een POST-request naar de NOVI Dynamic API met de verplichte project-header
async function postToNovi(path, body) {
  if (!NOVI_PROJECT_ID) {
    throw new Error(
      'De verbinding met de NOVI API is niet ingesteld: het project-ID ontbreekt in het .env-bestand.',
    )
  }

  try {
    return await fetch(`${NOVI_API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'novi-education-project-id': NOVI_PROJECT_ID,
      },
      body: JSON.stringify(body),
    })
  } catch (error) {
    throw new Error(
      'Er kan geen verbinding worden gemaakt met de server. Controleer je internetverbinding.',
      { cause: error },
    )
  }
}

export async function registerUser(email, password) {
  const response = await postToNovi('/api/users', {
    email,
    password,
    roles: [DEFAULT_ROLE],
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
  const response = await postToNovi('/api/login', { email, password })

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
