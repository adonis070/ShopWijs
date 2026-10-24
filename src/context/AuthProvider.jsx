import { useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { loginUser } from '../services/authService.js'
import { isTokenExpired } from '../utils/jwt.js'

const STORAGE_KEY = 'shopwijs-auth'

// De sessie (token en gebruiker) wordt bewaard in localStorage, zodat de gebruiker
// ingelogd blijft na het herladen van de pagina. Alleen een geldige token telt.
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

  async function login(email, password) {
    const newSession = await loginUser(email, password)
    storeSession(newSession)
    setSession(newSession)
  }

  // Uitloggen vraagt geen API-aanroep: de token wordt alleen verwijderd
  function logout() {
    clearStoredSession()
    setSession(null)
  }

  const value = {
    user: session?.user ?? null,
    token: session?.token ?? null,
    isAuthenticated: session !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
