import { refs } from './js/refs.js';
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
} from './js/products-api.js';
import {
  initPageTheme,
  renderCategories,
  renderProducts,
} from './js/render-functions.js';
import { openModal } from './js/modal.js';
import iziToast from 'izitoast';
import { addToCart, removeFromCart } from './cart.js';

import 'izitoast/dist/css/iziToast.min.css';
import { updateCartCount, updateWishlistCount } from './js/helpers.js';

let currentPage = 1;
let currentCategory = 'All';
let currentSearchQuery = '';
const productsPerPage = 12;

// Функції для роботи з loader
const showLoader = () => refs.loader?.classList.add('loader--visible');
const hideLoader = () => refs.loader?.classList.remove('loader--visible');

// Функції для сповіщень
const showErrorToast = message => {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
};

const showNotFound = () => {
  refs.products.innerHTML = '';
  refs.notFound.classList.add('not-found--visible');
  refs.loadMoreBtn.classList.add('is-hidden');
};

async function loadProducts() {
  try {
    showLoader();
    refs.products.innerHTML = '';
    refs.notFound.classList.remove('not-found--visible');

    let result;
    if (currentSearchQuery) {
      result = await searchProducts(currentSearchQuery);
    } else if (currentCategory === 'All') {
      result = await fetchProducts(
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
    } else {
      result = await fetchProductsByCategory(
        currentCategory,
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
    }

    if (result.products.length === 0) {
      showNotFound();
    } else {
      refs.products.innerHTML = renderProducts(result.products);
      refs.loadMoreBtn.classList.toggle(
        'is-hidden',
        result.products.length < productsPerPage
      );
    }
  } catch (error) {
    console.error('Error loading products:', error);
    showErrorToast('Failed to load products');
    showNotFound();
  } finally {
    hideLoader();
  }
}

async function loadMoreProducts() {
  try {
    showLoader();
    let result;
    if (currentSearchQuery) {
      result = await searchProducts(currentSearchQuery);
    } else if (currentCategory === 'All') {
      result = await fetchProducts(
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
    } else {
      result = await fetchProductsByCategory(
        currentCategory,
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
    }

    const newProducts = result.products;
    if (newProducts.length > 0) {
      refs.products.insertAdjacentHTML(
        'beforeend',
        renderProducts(newProducts)
      );
      if (newProducts.length < productsPerPage) {
        refs.loadMoreBtn.classList.add('is-hidden');
      }
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
      showErrorToast('No more products to load');
    }
  } catch (error) {
    console.error('Error loading more products:', error);
    showErrorToast('Failed to load more products');
  } finally {
    hideLoader();
  }
}

function setupEventListeners() {
  // Category click
  refs.categories.addEventListener('click', e => {
    if (e.target.classList.contains('categories__btn')) {
      const category = e.target.textContent.trim();
      if (category !== currentCategory) {
        currentCategory = category;
        currentPage = 1;
        currentSearchQuery = '';
        refs.searchFormInput.value = '';
        loadProducts();

        // Update active category
        document.querySelectorAll('.categories__btn').forEach(btn => {
          btn.classList.remove('categories__btn--active');
        });
        e.target.classList.add('categories__btn--active');
      }
    }
  });

  // Product click
  refs.products.addEventListener('click', e => {
    const productItem = e.target.closest('.products__item');
    if (productItem) {
      const productId = productItem.dataset.id;
      openModal(productId);
    }
  });

  // Search form submit
  refs.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchValue = refs.searchFormInput.value.trim();
    if (searchValue) {
      currentSearchQuery = searchValue;
      currentPage = 1;
      loadProducts();
    }
  });

  // Clear search button
  refs.searchFormClearBtn.addEventListener('click', () => {
    refs.searchFormInput.value = '';
    currentSearchQuery = '';
    currentPage = 1;
    loadProducts();
  });

  // Load more button
  refs.loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    try {
      showLoader();
      let result;

      if (currentSearchQuery) {
        result = await searchProducts(currentSearchQuery);
      } else if (currentCategory === 'All') {
        result = await fetchProducts(
          productsPerPage,
          (currentPage - 1) * productsPerPage
        );
      } else {
        result = await fetchProductsByCategory(
          currentCategory,
          productsPerPage,
          (currentPage - 1) * productsPerPage
        );
      }

      const newProducts = result.products;
      if (newProducts.length > 0) {
        refs.products.insertAdjacentHTML(
          'beforeend',
          renderProducts(newProducts)
        );
        if (newProducts.length < productsPerPage) {
          refs.loadMoreBtn.classList.add('is-hidden');
        }
      } else {
        refs.loadMoreBtn.classList.add('is-hidden');
        showErrorToast('No more products to load');
      }
    } catch (error) {
      console.error('Error loading more products:', error);
      showErrorToast('Failed to load more products');
    } finally {
      hideLoader();
    }
  });

  // Scroll to top button
  refs.scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    initPageTheme();
    showLoader();
    updateCartCount();
    updateWishlistCount();
    const categories = await fetchCategories();
    refs.categories.innerHTML = renderCategories(['All', ...categories]);
    await loadProducts();
    setupEventListeners(); // Додаємо виклик функції
  } catch (error) {
    console.error('Initialization error:', error);
    showErrorToast('Failed to initialize');
  } finally {
    hideLoader();
  }
});
