import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'
import { formatCategory, formatPrice } from '../utils/formatters.js'
import '../styles/ComparisonTable.css'

// Toont producten in kolommen naast elkaar, met per rij één eigenschap (F20)
function ComparisonTable({ products }) {
  return (
    <table className="comparison-table">
      <caption className="visually-hidden">Vergelijking van producten</caption>
      <thead>
        <tr>
          <th scope="col">
            <span className="visually-hidden">Eigenschap</span>
          </th>
          {products.map((product, index) => (
            <th key={product.id} scope="col" className="comparison-table__product">
              Product {index + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Afbeelding</th>
          {products.map((product) => (
            <td key={product.id}>
              <Link
                to={`/producten/${product.id}`}
                className="comparison-table__image-link"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="comparison-table__image"
                />
              </Link>
            </td>
          ))}
        </tr>
        <tr>
          <th scope="row">Titel</th>
          {products.map((product) => (
            <td key={product.id} className="comparison-table__title">
              <Link to={`/producten/${product.id}`}>{product.title}</Link>
            </td>
          ))}
        </tr>
        <tr>
          <th scope="row">Prijs</th>
          {products.map((product) => (
            <td key={product.id} className="comparison-table__price">
              {formatPrice(product.price)}
            </td>
          ))}
        </tr>
        <tr>
          <th scope="row">Categorie</th>
          {products.map((product) => (
            <td key={product.id}>{formatCategory(product.category)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row">Beoordeling</th>
          {products.map((product) => (
            <td key={product.id}>
              <Rating rate={product.rating.rate} count={product.rating.count} />
            </td>
          ))}
        </tr>
        <tr>
          <th scope="row">Beschrijving</th>
          {products.map((product) => (
            <td key={product.id} className="comparison-table__description">
              {product.description}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default ComparisonTable
