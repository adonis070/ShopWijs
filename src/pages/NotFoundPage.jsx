import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page container">
      <h1 className="page-title">Pagina niet gevonden</h1>
      <p>De pagina die je zoekt bestaat niet.</p>
      <div className="page-actions">
        <Link to="/" className="button">
          Terug naar home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
