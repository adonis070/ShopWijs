import { useId } from 'react'
import '../styles/SearchBar.css'

function SearchBar({ value, onChange, label = 'Zoek op productnaam' }) {
  const inputId = useId()

  return (
    <div className="search-bar">
      <label htmlFor={inputId} className="search-bar__label">
        {label}
      </label>
      <div className="search-bar__field">
        <svg
          className="search-bar__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <input
          id={inputId}
          type="search"
          className="search-bar__input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Bijvoorbeeld: jacket"
          autoComplete="off"
        />
      </div>
    </div>
  )
}

export default SearchBar
