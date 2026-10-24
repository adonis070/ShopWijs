import '../styles/ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message__title">Er ging iets mis</p>
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          className="button error-message__button"
          onClick={onRetry}
        >
          Opnieuw proberen
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
