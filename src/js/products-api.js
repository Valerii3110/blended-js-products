const BASE_URL = 'https://dummyjson.com';

export async function fetchProducts(limit = 12, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );
  return await response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return await response.json();
}

export async function fetchProductsByCategory(category, limit = 12, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  return await response.json();
}

export async function searchProducts(query, limit = 12, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`
  );
  return await response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return await response.json();
}
