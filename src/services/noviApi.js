const NOVI_API_URL =
  import.meta.env.VITE_NOVI_API_URL ||
  'https://novi-backend-api-wgsgz.ondigitalocean.app'
const NOVI_PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID

// Stuurt een request naar de NOVI Dynamic API met de verplichte project-header.
// Met een token wordt ook de Authorization-header (Bearer) meegestuurd.
export async function noviRequest(path, { method = 'GET', body, token, signal } = {}) {
  if (!NOVI_PROJECT_ID) {
    throw new Error(
      'De verbinding met de NOVI API is niet ingesteld: het project-ID ontbreekt in het .env-bestand.',
    )
  }

  const headers = { 'novi-education-project-id': NOVI_PROJECT_ID }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    return await fetch(`${NOVI_API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    throw new Error(
      'Er kan geen verbinding worden gemaakt met de server. Controleer je internetverbinding.',
      { cause: error },
    )
  }
}
