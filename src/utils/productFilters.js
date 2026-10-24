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
