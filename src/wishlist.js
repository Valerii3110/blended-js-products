import { fetchProductById } from './js/products-api.js';
import {
  renderProducts,
  showLoader,
  hideLoader,
  showToast,
  renderModalProduct,
} from './js/render-functions.js';
import { openModal, closeModal, updateModalButtons } from './js/modal.js';
import {
  getFromStorage,
  removeFromStorage,
  updateNavCounts,
} from './js/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  showLoader();
  try {
    const wishlistIds = getFromStorage('wishlist');
    if (wishlistIds.length === 0) {
      document.querySelector('.not-found').classList.add('not-found--visible');
      return;
    }

    const products = await Promise.all(
      wishlistIds.map(id => fetchProductById(id))
    );

    renderProducts(products);
  } catch (error) {
    showToast('Failed to load wishlist', 'error');
  } finally {
    hideLoader();
  }

  // Event listeners
  document.querySelector('.products').addEventListener('click', async e => {
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
  });
});
