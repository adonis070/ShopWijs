import { Link } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <p className="footer__logo">
            Shop<span>Wijs</span>
          </p>
          <p>Producten zoeken, vergelijken en bewaren.</p>
        </div>

        <div className="footer__column">
          <h2 className="footer__heading">Winkelen</h2>
          <Link to="/">Home</Link>
          <Link to="/producten">Producten</Link>
          <Link to="/vergelijken">Vergelijken</Link>
        </div>

        <div className="footer__column">
          <h2 className="footer__heading">Account</h2>
          <Link to="/inloggen">Inloggen</Link>
          <Link to="/favorieten">Favorieten</Link>
        </div>
      </div>

      <div className="container">
        <p className="footer__copyright">
          © {currentYear} ShopWijs · Productgegevens via de Fake Store API
        </p>
      </div>
    </footer>
  )
}

export default Footer
