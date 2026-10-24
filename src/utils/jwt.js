export function getTokenPayload(token) {
  try {
    const payload = token.split('.')[1]
    // JWT gebruikt base64url; atob() verwacht gewone base64
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))

    return JSON.parse(json)
  } catch {
    return null
  }
}

export function getTokenExpiry(token) {
  const exp = getTokenPayload(token)?.exp
  // exp staat in seconden, Date.now() in milliseconden
  return typeof exp === 'number' ? exp * 1000 : null
}

export function isTokenExpired(token) {
  const expiry = getTokenExpiry(token)
  return expiry !== null && expiry <= Date.now()
}
