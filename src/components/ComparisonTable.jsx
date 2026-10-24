import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'
import { formatCategory, formatPrice } from '../utils/formatters.js'
import '../styles/ComparisonTable.css'

// Geen markering als alle producten dezelfde waarde hebben
function isBestValue(value, values, best) {
  return new Set(values).size > 1 && value === best
}

function ComparisonTable({ products }) {
  const prices = products.map((product) => product.price)
  const rates = products.map((product) => product.rating.rate)
  const lowestPrice = Math.min(...prices)
  const highestRate = Math.max(...rates)

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
              {isBestValue(product.price, prices, lowestPrice) && (
                <span className="comparison-table__badge">Laagste prijs</span>
              )}
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
              {isBestValue(product.rating.rate, rates, highestRate) && (
                <span className="comparison-table__badge">Hoogste beoordeling</span>
              )}
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
