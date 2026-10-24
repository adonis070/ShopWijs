import { useId } from 'react'
import '../styles/FormField.css'

function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  const inputId = useId()

  return (
    <div className="form-field">
      <label htmlFor={inputId} className="form-field__label">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className="form-field__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  )
}

export default FormField
