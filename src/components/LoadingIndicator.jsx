import '../styles/LoadingIndicator.css'

function LoadingIndicator({ message = 'Bezig met laden...' }) {
  return (
    <div className="loading-indicator" role="status">
      <span className="loading-indicator__spinner" aria-hidden="true"></span>
      <p>{message}</p>
    </div>
  )
}

export default LoadingIndicator
