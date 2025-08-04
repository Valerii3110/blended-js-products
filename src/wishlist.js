import { refs } from './js/refs.js';
import { fetchProductById } from './js/products-api.js';
import { initPageTheme, renderProducts } from './js/render-functions.js';
import { getWishlist } from './js/storage.js';
import { showLoader, hideLoader, updateWishlistCount } from './js/helpers.js';
import { openModal } from './js/modal.js';

document.addEventListener('DOMContentLoaded', initWishlistPage);

async function initWishlistPage() {
  try {
    initPageTheme();
    showLoader();

    const wishlist = getWishlist();
    updateWishlistCount();

    if (wishlist.length === 0) {
      showEmptyWishlist();
      return;
    }

    const products = await Promise.all(
      wishlist.map(id => fetchProductById(id))
    );
    renderWishlistProducts(products);
    setupWishlistPageEventListeners();
  } catch (error) {
    console.error('Error initializing wishlist page:', error);
    showErrorToast('Не вдалося завантажити список бажань');
  } finally {
    hideLoader();
  }
}

function renderWishlistProducts(products) {
  refs.wishlistProducts.innerHTML = renderProducts(products);
}

function showEmptyWishlist() {
  refs.notFound.classList.add('not-found--visible');
}

function setupWishlistPageEventListeners() {
  // Відкриття модального вікна
  refs.wishlistProducts.addEventListener('click', e => {
    const productItem = e.target.closest('.products__item');
    if (productItem) {
      const productId = productItem.dataset.id;
      openModal(productId);
    }
  });
}

// Оновлення списку при змінах
export function updateWishlistDisplay() {
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    showEmptyWishlist();
    refs.wishlistProducts.innerHTML = '';
  } else {
    refs.notFound.classList.remove('not-found--visible');
    // Можна додати перезавантаження списку
  }

  updateWishlistCount();
}
