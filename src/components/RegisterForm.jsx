import { useState } from 'react'
import FormField from './FormField.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import { registerUser } from '../services/authService.js'
import { MIN_PASSWORD_LENGTH, validateCredentials } from '../utils/validation.js'

function RegisterForm({ onRegistered, onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    const credentialsError = validateCredentials(email, password)
    if (credentialsError) {
      return credentialsError
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return `Kies een wachtwoord van minimaal ${MIN_PASSWORD_LENGTH} tekens.`
    }

    if (password !== passwordRepeat) {
      return 'De wachtwoorden komen niet overeen.'
    }

    return ''
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      await registerUser(email.trim(), password)
      onRegistered(email.trim())
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
        label={`Wachtwoord (minimaal ${MIN_PASSWORD_LENGTH} tekens)`}
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Wachtwoord"
        autoComplete="new-password"
      />
      <FormField
        label="Herhaal wachtwoord"
        type="password"
        value={passwordRepeat}
        onChange={setPasswordRepeat}
        placeholder="Herhaal je wachtwoord"
        autoComplete="new-password"
      />

      <button
        type="submit"
        className="button auth-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Bezig met registreren...' : 'Registreren'}
      </button>

      <p className="auth-form__switch">
        Heb je al een account?{' '}
        <button type="button" onClick={onSwitchToLogin}>
          Log hier in
        </button>
      </p>
    </form>
  )
}

export default RegisterForm
