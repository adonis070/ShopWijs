import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormField from './FormField.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import { useAuth } from '../context/useAuth.js'
import { validateCredentials } from '../utils/validation.js'

function LoginForm({ initialEmail = '', onSwitchToRegister }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Na het inloggen terug naar de beveiligde pagina waar de gebruiker vandaan kwam
  const redirectTo = location.state?.from?.pathname || '/favorieten'

  async function handleSubmit(event) {
    event.preventDefault()

    const validationError = validateCredentials(email, password)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      await login(email.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {error && <ErrorMessage message={error} />}

      <FormField
        label="E-mailadres"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="naam@voorbeeld.nl"
        autoComplete="email"
      />
      <FormField
        label="Wachtwoord"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Wachtwoord"
        autoComplete="current-password"
      />

      <button
        type="submit"
        className="button auth-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Bezig met inloggen...' : 'Inloggen'}
      </button>

      <p className="auth-form__switch">
        Nog geen account?{' '}
        <button type="button" onClick={onSwitchToRegister}>
          Registreer je hier
        </button>
      </p>
    </form>
  )
}

export default LoginForm
