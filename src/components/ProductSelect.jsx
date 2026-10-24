import { useId } from 'react'
import '../styles/ProductSelect.css'

// Keuzelijst met producten. Het product met unavailableId (gekozen in een andere
// keuzelijst) kan niet gekozen worden, zodat hetzelfde product niet twee keer voorkomt.
function ProductSelect({ label, products, value, onChange, unavailableId }) {
  const selectId = useId()

  return (
    <div className="product-select">
      <label htmlFor={selectId} className="product-select__label">
        {label}
      </label>
      <select
        id={selectId}
        className="product-select__select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Selecteer een product</option>
        {products.map((product) => {
          const isUnavailable = String(product.id) === unavailableId

          return (
            <option
              key={product.id}
              value={String(product.id)}
              disabled={isUnavailable}
            >
              {product.title}
              {isUnavailable ? ' (al gekozen)' : ''}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default ProductSelect
