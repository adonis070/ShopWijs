import { useAuth } from '../context/useAuth.js'

function FavoritesPage() {
  const { user } = useAuth()

  return (
    <section className="page container">
      <h1 className="page-title">Mijn favorieten</h1>
      <p>
        Je bent ingelogd als <strong>{user.email}</strong>. Hier zie je straks
        de producten die je als favoriet hebt bewaard. Deze functionaliteit
        volgt in een volgende fase.
      </p>
    </section>
  )
}

export default FavoritesPage
