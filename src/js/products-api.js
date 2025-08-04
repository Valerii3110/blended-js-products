const BASE_URL = 'https://dummyjson.com/products';

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
}

export async function fetchProducts(limit = 12, skip = 0) {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
}

export async function fetchProductById(id) {
  // Додано цю функцію
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return await response.json();
}

export async function fetchProductsByCategory(category, limit = 12, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) throw new Error('Failed to fetch products by category');
  return await response.json();
}

export async function searchProducts(query) {
  const response = await fetch(`${BASE_URL}/search?q=${query}`);
  if (!response.ok) throw new Error('Failed to search products');
  return await response.json();
}
