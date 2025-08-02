import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  searchProducts,
  fetchCategories,
} from './products-api.js';
import {
  renderProducts,
  renderCategories,
  renderModalProduct,
  showLoader,
  hideLoader,
  showToast,
} from './render-functions.js';
import { openModal, closeModal, updateModalButtons } from './modal.js';
import { addToStorage, removeFromStorage, updateNavCounts } from './storage.js';

let currentPage = 1;
let currentCategory = 'All';
let currentSearchQuery = '';
const productsPerPage = 12;

export async function handleCategoryClick(e) {
  if (!e.target.classList.contains('categories__btn')) return;

  const category = e.target.textContent;
  if (category === currentCategory) return;

  currentCategory = category;
  currentPage = 1;
  currentSearchQuery = '';

  document.querySelectorAll('.categories__btn').forEach(btn => {
    btn.classList.remove('categories__btn--active');
  });
  e.target.classList.add('categories__btn--active');

  document.querySelector('.search-form__input').value = '';

  showLoader();
  try {
    let products;
    if (category === 'All') {
      products = await fetchProducts(productsPerPage, 0);
    } else {
      products = await fetchProductsByCategory(category, productsPerPage, 0);
    }
    renderProducts(products.products);
    document.querySelector('.load-more').style.display =
      products.products.length === productsPerPage ? 'block' : 'none';
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

export async function handleProductClick(e) {
  const productItem = e.target.closest('.products__item');
  if (!productItem) return;

  const productId = productItem.dataset.id;

  showLoader();
  try {
    const product = await fetchProductById(productId);
    renderModalProduct(product);
    updateModalButtons(productId);
    openModal();
  } catch (error) {
    showToast('Failed to load product details', 'error');
  } finally {
    hideLoader();
  }
}

export async function handleSearchSubmit(e) {
  e.preventDefault();
  const query = e.target.querySelector('input').value.trim();
  if (!query) return;

  currentSearchQuery = query;
  currentPage = 1;
  currentCategory = 'All';

  document.querySelectorAll('.categories__btn').forEach(btn => {
    btn.classList.remove('categories__btn--active');
  });

  showLoader();
  try {
    const products = await searchProducts(query, productsPerPage, 0);
    renderProducts(products.products);
    document.querySelector('.load-more-btn').style.display =
      products.products.length === productsPerPage ? 'block' : 'none';
  } catch (error) {
    showToast('Failed to search products', 'error');
  } finally {
    hideLoader();
  }
}

export function handleClearSearch() {
  const searchInput = document.querySelector('.search-form__input');
  searchInput.value = '';
  currentSearchQuery = '';

  if (currentCategory === 'All') {
    loadInitialProducts();
  }
}

export async function handleLoadMore() {
  currentPage++;

  showLoader();
  try {
    let products;
    if (currentSearchQuery) {
      products = await searchProducts(
        currentSearchQuery,
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
    } else if (currentCategory === 'All') {
      products = await fetchProducts(
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
    } else {
      products = await fetchProductsByCategory(
        currentCategory,
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
    }

    const productsList = document.querySelector('.products');
    const newProducts = products.products
      .map(
        product => `
      <li class="products__item" data-id="${product.id}">
        <img class="products__image" src="${product.thumbnail}" alt="${product.title}"/>
        <p class="products__title">${product.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
        <p class="products__category">Category: ${product.category}</p>
        <p class="products__price">Price: $${product.price}</p>
      </li>
    `
      )
      .join('');

    productsList.insertAdjacentHTML('beforeend', newProducts);
    document.querySelector('.load-more').style.display =
      products.products.length === productsPerPage ? 'block' : 'none';
  } catch (error) {
    showToast('Failed to load more products', 'error');
  } finally {
    hideLoader();
  }
}

export async function loadInitialProducts() {
  showLoader();
  try {
    const [categories, products] = await Promise.all([
      fetchCategories(),
      fetchProducts(productsPerPage, 0),
    ]);

    renderCategories(categories);
    renderProducts(products.products);
    document.querySelector('.load-more-btn').style.display =
      products.products.length === productsPerPage ? 'block' : 'none';
    updateNavCounts();
  } catch (error) {
    showToast('Failed to load initial data', 'error');
  } finally {
    hideLoader();
  }
}
