// Leest de vervaltijd (claim "exp") uit een JWT-token, in milliseconden.
// Geeft null terug als de token geen leesbare vervaltijd bevat.
export function getTokenExpiry(token) {
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    const { exp } = JSON.parse(json)

    return typeof exp === 'number' ? exp * 1000 : null
  } catch {
    return null
  }
}

export function isTokenExpired(token) {
  const expiry = getTokenExpiry(token)
  return expiry !== null && expiry <= Date.now()
}
