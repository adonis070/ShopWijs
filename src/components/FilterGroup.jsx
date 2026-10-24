import '../styles/FilterGroup.css'

function FilterGroup({ title, options, selectedValue, onChange }) {
  return (
    <fieldset className="filter-group">
      <legend className="filter-group__title">{title}</legend>

      <ul className="filter-group__options">
        {options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              className="filter-group__option"
              aria-pressed={option.value === selectedValue}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

export default FilterGroup
