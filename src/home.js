import { loadInitialProducts } from './js/handlers.js';
import { setupModalListeners } from './js/modal.js';
import {
  handleCategoryClick,
  handleProductClick,
  handleSearchSubmit,
  handleClearSearch,
  handleLoadMore,
} from './js/handlers.js';

document.addEventListener('DOMContentLoaded', () => {
  setupModalListeners();
  loadInitialProducts();

  // Event listeners
  document
    .querySelector('.categories')
    .addEventListener('click', handleCategoryClick);
  document
    .querySelector('.products')
    .addEventListener('click', handleProductClick);
  document
    .querySelector('.search-form')
    .addEventListener('submit', handleSearchSubmit);
  document
    .querySelector('.search-form__btn-clear')
    .addEventListener('click', handleClearSearch);
  document
    .querySelector('.load-more-btn')
    .addEventListener('click', handleLoadMore);
});
