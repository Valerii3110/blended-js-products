import { refs } from './js/refs.js';
import { fetchProductById } from './js/products-api.js';
import { renderProducts } from './js/render-functions.js';
import { openModal } from './js/modal.js';
import { getFromStorage, removeFromWishlist } from './js/storage.js';
import { updateWishlistCount, handleProductClick } from './js/handlers.js';
import { showSuccess } from './js/helpers.js';

document.addEventListener('DOMContentLoaded', async () => {
  const wishlistIds = getFromStorage(STORAGE_KEYS.WISHLIST);
  const wishlistCountElement = document.querySelector(SELECTORS.WISHLIST_COUNT);

  // Оновлюємо лічильник у header
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlistIds.length;
  }

  if (wishlistIds.length === 0) {
    document.querySelector('.not-found').classList.add('not-found--visible');
    return;
  }

  try {
    const products = await Promise.all(
      wishlistIds.map(id => fetchProductById(id))
    );

    renderProducts(products.filter(Boolean));
  } catch (error) {
    document.querySelector('.not-found').classList.add('not-found--visible');
  }
});
