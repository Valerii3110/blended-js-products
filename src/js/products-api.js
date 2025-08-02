import { API_ENDPOINTS, PAGINATION } from './constants';
import { showLoader, hideLoader, showError } from './helpers';

export const fetchProducts = async (page = PAGINATION.INITIAL_PAGE, limit = PAGINATION.LIMIT) => {
  try {
    showLoader();
    const skip = (page - 1) * limit;
    const response = await fetch(`${API_ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return { products: [], total: 0 };
  } finally {
    hideLoader();
  }
};

export const fetchProductById = async (id) => {
  try {
    showLoader();
    const response = await fetch(`${API_ENDPOINTS.PRODUCT_BY_ID}${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  } finally {
    hideLoader();
  }
};

export const fetchProductsByCategory = async (category, page = PAGINATION.INITIAL_PAGE, limit = PAGINATION.LIMIT) => {
  try {
    showLoader();
    const skip = (page - 1) * limit;
    const url = category === 'All'
      ? `${API_ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`
      : `${API_ENDPOINTS.CATEGORY}${category}?limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return { products: [], total: 0 };
  } finally {
    hideLoader();
  }
};

export const fetchCategories = async () => {
  try {
    showLoader();
    const response = await fetch(API_ENDPOINTS.CATEGORIES);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const categories = await response.json();
    return ['All', ...categories];
  } catch (error) {
    showError(error.message);
    return ['All'];
  } finally {
    hideLoader();
  }
};

export const searchProducts = async (query, page = PAGINATION.INITIAL_PAGE, limit = PAGINATION.LIMIT) => {
  try {
    if (!query.trim()) return { products: [], total: 0 };

    showLoader();
    const skip = (page - 1) * limit;
    const response = await fetch(`${API_ENDPOINTS.SEARCH}?q=${query}&limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error('Failed to search products');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return { products: [], total: 0 };
  } finally {
    hideLoader();
  }
};