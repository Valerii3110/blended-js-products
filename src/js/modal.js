import { refs } from './refs.js';
import { fetchProductById } from './products-api.js';
import { renderModalProduct } from './render-functions.js';
import { showErrorToast } from './helpers.js';

import {
  handleCartAction,
  handleWishlistAction,
  updateButtonStates,
} from './handlers.js';

// Основні функції модального вікна
export function openModal(productId) {
  fetchProductById(productId)
    .then(product => {
      refs.modalProduct.innerHTML = renderModalProduct(product);
      refs.modal.classList.add('modal--is-open');
      setupModalHandlers(productId);
      updateButtonStates(productId); // Оновлюємо стан кнопок
    })
    .catch(error => {
      console.error('Error opening modal:', error);
      showErrorToast('Failed to load product details');
    });
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
}

// Допоміжні функції
function setupModalHandlers(productId) {
  const cartBtn = refs.modal.querySelector('.modal-product__btn--cart');
  const wishlistBtn = refs.modal.querySelector('.modal-product__btn--wishlist');

  if (cartBtn) {
    cartBtn.addEventListener('click', () => handleCartAction(productId));
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () =>
      handleWishlistAction(productId)
    );
  }
}

updateButtonStates();

// Обробник закриття модального вікна
document.addEventListener('DOMContentLoaded', () => {
  refs.modal.addEventListener('click', e => {
    if (
      e.target === refs.modal ||
      e.target.classList.contains('modal__close-btn')
    ) {
      closeModal();
    }
  });
});
