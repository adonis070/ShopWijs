// Houdt alleen producten over waarvan de naam de zoekterm bevat (hoofdletterongevoelig)
export function filterProducts(products, { searchTerm }) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return products.filter((product) =>
    product.title.toLowerCase().includes(normalizedSearch),
  )
}
