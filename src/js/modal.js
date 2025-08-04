import { refs } from './refs.js';
import { fetchProductById } from './products-api.js';
import { renderModalProduct } from './render-functions.js';
import { getCart, setCart, getWishlist, setWishlist } from './storage.js';
import {
  showErrorToast,
  showSuccessToast,
  updateCartCount,
  updateWishlistCount,
} from './helpers.js';

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

function updateButtonStates(productId) {
  const cartBtn = refs.modal.querySelector('.modal-product__btn--cart');
  const wishlistBtn = refs.modal.querySelector('.modal-product__btn--wishlist');

  if (cartBtn) {
    const cart = getCart();
    cartBtn.textContent = cart.includes(productId)
      ? 'Remove from Cart'
      : 'Add to Cart';
    cartBtn.classList.toggle('active', cart.includes(productId));
  }

  if (wishlistBtn) {
    const wishlist = getWishlist();
    wishlistBtn.textContent = wishlist.includes(productId)
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
    wishlistBtn.classList.toggle('active', wishlist.includes(productId));
  }
}

function handleCartAction(productId) {
  let cart = getCart();
  const isInCart = cart.includes(productId);

  if (isInCart) {
    cart = cart.filter(id => id !== productId);
    showSuccessToast('Product removed from cart');
  } else {
    cart.push(productId);
    showSuccessToast('Product added to cart');
  }

  setCart(cart);
  updateButtonStates(productId);
  updateCartCount();
}

function handleWishlistAction(productId) {
  let wishlist = getWishlist();
  const isInWishlist = wishlist.includes(productId);

  if (isInWishlist) {
    wishlist = wishlist.filter(id => id !== productId);
    showSuccessToast('Product removed from wishlist');
  } else {
    wishlist.push(productId);
    showSuccessToast('Product added to wishlist');
  }

  setWishlist(wishlist);
  updateButtonStates(productId);
  updateWishlistCount();
}

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
