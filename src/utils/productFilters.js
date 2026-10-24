export function filterProducts(products, { searchTerm, category }) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(normalizedSearch)
    const matchesCategory = !category || product.category === category

    return matchesSearch && matchesCategory
  })
}

// sort() past de array zelf aan, daarom sorteren we een kopie
export function sortProducts(products, sortOrder) {
  if (sortOrder === 'prijs-oplopend') {
    return [...products].sort((a, b) => a.price - b.price)
  }

  if (sortOrder === 'prijs-aflopend') {
    return [...products].sort((a, b) => b.price - a.price)
  }

  return products
}
