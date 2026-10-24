// Houdt alleen producten over waarvan de naam de zoekterm bevat (hoofdletterongevoelig)
// en die in de gekozen categorie vallen. Een lege categorie betekent: alle categorieën.
export function filterProducts(products, { searchTerm, category }) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(normalizedSearch)
    const matchesCategory = !category || product.category === category

    return matchesSearch && matchesCategory
  })
}

// Sorteert op prijs zonder de oorspronkelijke lijst aan te passen.
// Zonder sorteervolgorde blijft de volgorde van de API behouden.
export function sortProducts(products, sortOrder) {
  if (sortOrder === 'prijs-oplopend') {
    return [...products].sort((a, b) => a.price - b.price)
  }

  if (sortOrder === 'prijs-aflopend') {
    return [...products].sort((a, b) => b.price - a.price)
  }

  return products
}
