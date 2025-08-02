import { SELECTORS } from './constants.js';

export const refs = {
  productsList: document.querySelector(SELECTORS.PRODUCTS_LIST),
  categoriesList: document.querySelector(SELECTORS.CATEGORIES_LIST),
  modal: document.querySelector(SELECTORS.MODAL),
  modalProduct: document.querySelector(SELECTORS.MODAL_PRODUCT),
  notFound: document.querySelector(SELECTORS.NOT_FOUND),
  loadMoreBtn: document.querySelector(SELECTORS.LOAD_MORE),
  searchForm: document.querySelector(SELECTORS.SEARCH_FORM),
  searchInput: document.querySelector(SELECTORS.SEARCH_INPUT),
  searchClearBtn: document.querySelector(SELECTORS.SEARCH_CLEAR),
  cartCount: document.querySelector(SELECTORS.CART_COUNT),
  wishlistCount: document.querySelector(SELECTORS.WISHLIST_COUNT),
  themeToggle: document.querySelector(SELECTORS.THEME_TOGGLE),
};
console.log('Refs:', refs); // Додати після оголошення refs
