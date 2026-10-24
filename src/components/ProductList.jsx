import ProductCard from './ProductCard.jsx'
import '../styles/ProductList.css'

function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="product-list__empty">Geen producten gevonden.</p>
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-list__item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductList
