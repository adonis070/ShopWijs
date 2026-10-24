import { Link } from 'react-router-dom'
import { formatCategory, formatPrice } from '../utils/formatters.js'
import '../styles/FavoriteCard.css'

function FavoriteCard({ product, onRemove, isRemoving }) {
  const productUrl = `/producten/${product.id}`

  return (
    <article className="favorite-card">
      <Link to={productUrl} className="favorite-card__image-link">
        <img
          src={product.image}
          alt={product.title}
          className="favorite-card__image"
          loading="lazy"
        />
      </Link>

      <div className="favorite-card__info">
        <p className="favorite-card__category">
          {formatCategory(product.category)}
        </p>
        <h2 className="favorite-card__title">
          <Link to={productUrl}>{product.title}</Link>
        </h2>
        <p className="favorite-card__price">{formatPrice(product.price)}</p>

        <button
          type="button"
          className="button favorite-card__remove"
          onClick={onRemove}
          disabled={isRemoving}
        >
          {isRemoving ? 'Bezig met verwijderen...' : 'Verwijderen'}
        </button>
      </div>
    </article>
  )
}

export default FavoriteCard
