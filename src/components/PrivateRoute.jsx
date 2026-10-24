import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

// Toont de pagina alleen aan ingelogde gebruikers. Anderen gaan naar het
// inlogformulier; de opgevraagde pagina wordt onthouden voor na het inloggen.
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/inloggen" replace state={{ from: location }} />
  }

  return children
}

export default PrivateRoute
