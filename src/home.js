import { refs } from './js/refs.js';
import { fetchProducts, fetchCategories } from './js/products-api.js';
import { renderProducts, renderCategories } from './js/render-functions.js';
import {
  handleCategoryClick,
  handleProductClick,
  handleLoadMore,
  handleSearch,
  handleSearchClear,
  updateCartCount,
  updateWishlistCount,
  handleThemeToggle,
  handleScrollUp,
} from './js/handlers.js';
import { initTheme } from './js/storage.js';

const initApp = async () => {
  // Ініціалізація теми
  initTheme();

  // Ініціалізація лічильників
  updateCartCount();
  updateWishlistCount();

  try {
    // Завантаження категорій
    const categories = await fetchCategories();
    if (refs.categoriesList) {
      renderCategories(categories);
    }

    // Завантаження продуктів
    const { products } = await fetchProducts();
    if (refs.productsList) {
      renderProducts(products);
    }

    // Додавання обробників подій з перевіркою на null
    if (refs.categoriesList) {
      refs.categoriesList.addEventListener('click', handleCategoryClick);
    }

    if (refs.productsList) {
      refs.productsList.addEventListener('click', handleProductClick);
    }

    if (refs.loadMoreBtn) {
      refs.loadMoreBtn.addEventListener('click', handleLoadMore);
    }

    if (refs.searchForm) {
      refs.searchForm.addEventListener('submit', handleSearch);
    }

    if (refs.searchClearBtn) {
      refs.searchClearBtn.addEventListener('click', handleSearchClear);
    }

    if (refs.themeToggle) {
      refs.themeToggle.addEventListener('click', handleThemeToggle);
    }

    // Ініціалізація кнопки scrollUp
    const scrollUpBtn = document.createElement('button');
    scrollUpBtn.className = 'scroll-up';
    scrollUpBtn.innerHTML = '↑';
    scrollUpBtn.addEventListener('click', handleScrollUp);
    document.body.appendChild(scrollUpBtn);

    window.addEventListener('scroll', () => {
      scrollUpBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
  } catch (error) {
    console.error('Помилка ініціалізації додатка:', error);
  }
};

// Запускаємо додаток після повного завантаження DOM
document.addEventListener('DOMContentLoaded', initApp);
