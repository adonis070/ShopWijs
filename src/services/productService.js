const API_URL =
  import.meta.env.VITE_FAKESTORE_API_URL || 'https://fakestoreapi.com'

// Haalt data op bij de Fake Store API en vertaalt fouten naar duidelijke meldingen
async function fetchFromApi(path, signal) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    throw new Error(
      'Er kan geen verbinding worden gemaakt met de server. Controleer je internetverbinding.',
      { cause: error },
    )
  }

  if (!response.ok) {
    throw new Error(
      `De server gaf een fout terug (status ${response.status}). Probeer het later opnieuw.`,
    )
  }

  // Bij een onbekend product geeft de Fake Store API een lege response terug
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export function getProducts(signal) {
  return fetchFromApi('/products', signal)
}

export function getCategories(signal) {
  return fetchFromApi('/products/categories', signal)
}

export async function getProductById(id, signal) {
  const product = await fetchFromApi(`/products/${id}`, signal)

  if (!product) {
    throw new Error('Dit product bestaat niet of is niet meer beschikbaar.')
  }

  return product
}
