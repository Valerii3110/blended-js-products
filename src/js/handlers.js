import { refs } from './refs.js';
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
  fetchProductById,
} from './products-api.js';
import { renderProducts, appendProducts } from './render-functions.js';
import { openModal } from './modal.js';
import { debounce } from './helpers.js';
import { getFromStorage } from './storage.js';
import { STORAGE_KEYS, SELECTORS } from './constants.js';

let currentPage = 1;
let currentCategory = 'All';
let currentSearchQuery = '';
let isLoading = false;

export const updateCartCount = () => {
  const cart = getFromStorage(STORAGE_KEYS.CART);
  const cartCountElement = document.querySelector(SELECTORS.CART_COUNT);

  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
    // Додаємо клас для анімації при зміні
    cartCountElement.classList.add('nav__count--updated');
    setTimeout(() => {
      cartCountElement.classList.remove('nav__count--updated');
    }, 300);
  }
};

export const updateWishlistCount = () => {
  const wishlist = getFromStorage(STORAGE_KEYS.WISHLIST);
  const wishlistCountElement = document.querySelector(SELECTORS.WISHLIST_COUNT);

  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlist.length;
    // Додаємо клас для анімації при зміні
    wishlistCountElement.classList.add('nav__count--updated');
    setTimeout(() => {
      wishlistCountElement.classList.remove('nav__count--updated');
    }, 300);
  }
};

export const handleCategoryClick = async e => {
  if (!e.target.classList.contains('categories__btn')) return;

  currentCategory = e.target.dataset.category;
  currentPage = 1;
  currentSearchQuery = '';
  refs.searchInput.value = '';

  document.querySelectorAll('.categories__btn').forEach(btn => {
    btn.classList.remove('categories__btn--active');
  });
  e.target.classList.add('categories__btn--active');

  const { products } = await fetchProductsByCategory(
    currentCategory,
    currentPage
  );
  renderProducts(products);
  refs.loadMoreBtn.style.display =
    products.length >= PAGINATION.LIMIT ? 'block' : 'none';
};

export const handleProductClick = async e => {
  const productItem = e.target.closest('.products__item');
  if (!productItem) return;

  const productId = productItem.dataset.id;
  const product = await fetchProductById(productId);
  if (product) openModal(product);
};

export const handleLoadMore = async () => {
  if (isLoading) return;
  isLoading = true;

  currentPage += 1;
  let products = [];

  if (currentSearchQuery) {
    const data = await searchProducts(currentSearchQuery, currentPage);
    products = data.products;
  } else {
    const data = await fetchProductsByCategory(currentCategory, currentPage);
    products = data.products;
  }

  if (products.length > 0) {
    appendProducts(products);
  } else {
    refs.loadMoreBtn.style.display = 'none';
  }

  isLoading = false;
};

export const handleSearch = debounce(async e => {
  e.preventDefault();
  const query = refs.searchInput.value.trim();
  if (!query) return;

  currentSearchQuery = query;
  currentPage = 1;

  const { products } = await searchProducts(query, currentPage);
  renderProducts(products);
  refs.loadMoreBtn.style.display =
    products.length >= PAGINATION.LIMIT ? 'block' : 'none';
}, 500);

export const handleSearchClear = () => {
  refs.searchInput.value = '';
  currentSearchQuery = '';
  currentPage = 1;

  fetchProducts(currentPage).then(({ products }) => {
    renderProducts(products);
    refs.loadMoreBtn.style.display =
      products.length >= PAGINATION.LIMIT ? 'block' : 'none';
  });
};

export const handleScrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const handleThemeToggle = () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
