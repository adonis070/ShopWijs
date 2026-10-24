// Nederlandse namen voor de categorieën uit de Fake Store API
const categoryLabels = {
  electronics: 'Elektronica',
  jewelery: 'Sieraden',
  "men's clothing": 'Herenkleding',
  "women's clothing": 'Dameskleding',
}

const priceFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
})

export function formatCategory(category) {
  return categoryLabels[category] || category
}

export function formatPrice(price) {
  return priceFormatter.format(price)
}
