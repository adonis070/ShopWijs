import { useId } from 'react'
import '../styles/ProductSelect.css'

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
