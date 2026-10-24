import ProductCard from './ProductCard.jsx'
import '../styles/ProductList.css'

function ProductList({
  products,
  columns = 4,
  emptyMessage = 'Geen producten gevonden.',
}) {
  if (products.length === 0) {
    return <p className="product-list__empty">{emptyMessage}</p>
  }

  return (
    <ul className={`product-list product-list--${columns}-columns`}>
      {products.map((product) => (
        <li key={product.id} className="product-list__item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductList
