import { startTransition } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import '../styles/Navbar.css'

const navLinks = [
  { to: '/producten', label: 'Producten' },
  { to: '/favorieten', label: 'Favorieten' },
  { to: '/vergelijken', label: 'Vergelijken' },
]

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  // Navigeren en uitloggen in één overgang, zodat een beveiligde pagina
  // niet eerst nog doorstuurt naar het inlogformulier
  function handleLogout() {
    startTransition(() => {
      navigate('/')
      logout()
    })
  }

  return (
    <header className="navbar">
      <nav className="navbar__inner container" aria-label="Hoofdnavigatie">
        <Link to="/" className="navbar__logo">
          Shop<span>Wijs</span>
        </Link>

        <div className="navbar__menu">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="navbar__link">
                  {link.label}
                </NavLink>
              </li>
            ))}
            {!isAuthenticated && (
              <li>
                <NavLink to="/inloggen" className="navbar__link">
                  Inloggen
                </NavLink>
              </li>
            )}
          </ul>

          {isAuthenticated && (
            <div className="navbar__user">
              <span className="navbar__email" title={user.email}>
                {user.email}
              </span>
              <button
                type="button"
                className="navbar__logout"
                onClick={handleLogout}
              >
                Uitloggen
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
