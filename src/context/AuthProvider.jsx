import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { loginUser } from '../services/authService.js'
import { getTokenExpiry, getTokenPayload, isTokenExpired } from '../utils/jwt.js'

const STORAGE_KEY = 'shopwijs-auth'

function readStoredSession() {
  try {
    const session = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (session?.token && !isTokenExpired(session.token)) {
      return session
    }
  } catch {
    // Onleesbare of geblokkeerde opslag: start zonder sessie
  }

  clearStoredSession()
  return null
}

function storeSession(session) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Zonder opslag blijft de gebruiker alleen ingelogd tot de pagina herlaadt
  }
}

function clearStoredSession() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Niets te verwijderen als de opslag geblokkeerd is
  }
}

function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)
  const [sessionExpired, setSessionExpired] = useState(false)

  // Automatisch uitloggen op het moment dat de token verloopt
  useEffect(() => {
    const expiry = session ? getTokenExpiry(session.token) : null
    if (expiry === null) {
      return
    }

    const timeoutId = setTimeout(() => {
      clearStoredSession()
      setSession(null)
      setSessionExpired(true)
    }, expiry - Date.now())

    return () => clearTimeout(timeoutId)
  }, [session])

  async function login(email, password) {
    const newSession = await loginUser(email, password)
    storeSession(newSession)
    setSession(newSession)
    setSessionExpired(false)
  }

  function logout() {
    clearStoredSession()
    setSession(null)
  }

  // Het login-antwoord van de NOVI API bevat geen id; de token wel (claim "userId")
  const user = session
    ? { ...session.user, id: getTokenPayload(session.token)?.userId ?? null }
    : null

  const value = {
    user,
    token: session?.token ?? null,
    isAuthenticated: session !== null,
    sessionExpired,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
