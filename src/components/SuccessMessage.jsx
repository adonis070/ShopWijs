import '../styles/SuccessMessage.css'

function SuccessMessage({ message }) {
  return (
    <div className="success-message" role="status">
      {message}
    </div>
  )
}

export default SuccessMessage
