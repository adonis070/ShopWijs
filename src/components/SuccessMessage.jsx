import '../styles/SuccessMessage.css'

function SuccessMessage({ message, children }) {
  return (
    <div className="success-message" role="status">
      {message} {children}
    </div>
  )
}

export default SuccessMessage
