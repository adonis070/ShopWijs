import { Link, NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

const navLinks = [
  { to: '/producten', label: 'Producten' },
  { to: '/favorieten', label: 'Favorieten' },
  { to: '/vergelijken', label: 'Vergelijken' },
  { to: '/inloggen', label: 'Inloggen' },
]

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner container" aria-label="Hoofdnavigatie">
        <Link to="/" className="navbar__logo">
          Shop<span>Wijs</span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className="navbar__link">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
