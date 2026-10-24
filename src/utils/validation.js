const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MIN_PASSWORD_LENGTH = 6

// Controleert de invoer voordat er een request naar de API gaat.
// Geeft een foutmelding terug, of een lege tekst als alles klopt.
export function validateCredentials(email, password) {
  if (!email.trim() || !password) {
    return 'Vul je e-mailadres en wachtwoord in.'
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.'
  }

  return ''
}
