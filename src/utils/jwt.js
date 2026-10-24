// Leest de gegevens (claims) uit het middelste deel van een JWT-token.
// Geeft null terug als de token niet leesbaar is.
export function getTokenPayload(token) {
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))

    return JSON.parse(json)
  } catch {
    return null
  }
}

// Leest de vervaltijd (claim "exp") uit een JWT-token, in milliseconden.
// Geeft null terug als de token geen leesbare vervaltijd bevat.
export function getTokenExpiry(token) {
  const exp = getTokenPayload(token)?.exp
  return typeof exp === 'number' ? exp * 1000 : null
}

export function isTokenExpired(token) {
  const expiry = getTokenExpiry(token)
  return expiry !== null && expiry <= Date.now()
}
