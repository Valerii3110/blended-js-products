export const API_ENDPOINTS = {
  PRODUCTS: 'https://dummyjson.com/products',
  PRODUCT_BY_ID: 'https://dummyjson.com/products/',
  SEARCH: 'https://dummyjson.com/products/search',
  CATEGORIES: 'https://dummyjson.com/products/categories',
  CATEGORY: 'https://dummyjson.com/products/category/',
};

export const STORAGE_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
};

export const PAGINATION = {
  LIMIT: 12,
  INITIAL_PAGE: 1,
};

export const SELECTORS = {
  PRODUCTS_LIST: '.products',
  CATEGORIES_LIST: '.categories',
  MODAL: '.modal',
  MODAL_PRODUCT: '.modal-product',
  NOT_FOUND: '.not-found',
  LOAD_MORE: '.load-more',
  SEARCH_FORM: '.search-form',
  SEARCH_INPUT: '.search-form__input',
  SEARCH_CLEAR: '.search-form__btn-clear',
  CART_COUNT: '[data-cart-count]',
  WISHLIST_COUNT: '[data-wishlist-count]',
  THEME_TOGGLE: '.theme-toggle-btn',
};
