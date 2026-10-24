import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'
import RegisterForm from '../components/RegisterForm.jsx'
import SuccessMessage from '../components/SuccessMessage.jsx'
import { useAuth } from '../context/useAuth.js'
import '../styles/LoginPage.css'

const tabs = [
  { id: 'inloggen', label: 'Inloggen' },
  { id: 'registreren', label: 'Registreren' },
]

function LoginPage() {
  const { isAuthenticated, user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('inloggen')
  const [registeredEmail, setRegisteredEmail] = useState('')

  function handleRegistered(email) {
    setRegisteredEmail(email)
    setActiveTab('inloggen')
  }

  if (isAuthenticated) {
    return (
      <section className="page container">
        <div className="auth-status">
          <h1 className="page-title">Je bent ingelogd</h1>
          <p>
            Ingelogd als <strong>{user.email}</strong>
          </p>
          <div className="auth-status__actions">
            <Link to="/favorieten" className="button">
              Naar mijn favorieten
            </Link>
            <button
              type="button"
              className="button button--secondary"
              onClick={logout}
            >
              Uitloggen
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page container">
      <div className="auth-page">
        <div className="auth-page__intro">
          <p className="auth-page__brand">
            Shop<span>Wijs</span>
          </p>
          <h1 className="auth-page__title">
            {activeTab === 'inloggen' ? 'Welkom terug' : 'Word lid van ShopWijs'}
          </h1>
          <p>
            Log in om je favorieten te bekijken en nieuwe producten te
            ontdekken.
          </p>
          <ul className="auth-page__benefits">
            <li>Persoonlijke favorietenlijst</li>
            <li>Snel producten terugvinden</li>
          </ul>
        </div>

        <div className="auth-page__form-panel">
          <div className="auth-tabs" role="tablist" aria-label="Inloggen of registreren">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`paneel-${tab.id}`}
                className="auth-tabs__tab"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`paneel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="auth-page__panel"
          >
            {activeTab === 'inloggen' ? (
              <>
                {registeredEmail && (
                  <SuccessMessage message="Je account is aangemaakt. Log nu in met je e-mailadres en wachtwoord." />
                )}
                <LoginForm
                  key={registeredEmail}
                  initialEmail={registeredEmail}
                  onSwitchToRegister={() => setActiveTab('registreren')}
                />
              </>
            ) : (
              <RegisterForm
                onRegistered={handleRegistered}
                onSwitchToLogin={() => setActiveTab('inloggen')}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
