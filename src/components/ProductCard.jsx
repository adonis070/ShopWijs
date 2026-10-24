import { Link } from 'react-router-dom'
import { formatCategory, formatPrice } from '../utils/formatters.js'
import '../styles/ProductCard.css'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/producten/${product.id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
          />
        </div>

        <div className="product-card__body">
          <p className="product-card__category">
            {formatCategory(product.category)}
          </p>
          <h3 className="product-card__title">{product.title}</h3>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
