import { refs } from './refs.js';
import { renderModalProduct } from './render-functions.js';
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
} from './storage';
import { showSuccess } from './helpers.js';

const handleEscape = e => {
  if (e.code === 'Escape') closeModal();
};

const handleBackdropClick = e => {
  if (e.target === refs.modal) closeModal();
};

export const openModal = product => {
  renderModalProduct(product);
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', handleEscape);
  refs.modal.addEventListener('click', handleBackdropClick);

  // Додаємо обробники для кнопок у модальному вікні
  const wishlistBtn = refs.modal.querySelector('.modal-product__wishlist-btn');
  const cartBtn = refs.modal.querySelector('.modal-product__cart-btn');

  wishlistBtn.addEventListener('click', () => {
    const productId = wishlistBtn.dataset.id;
    if (wishlistBtn.textContent.includes('Remove')) {
      removeFromWishlist(productId);
      wishlistBtn.textContent = 'Add to Wishlist';
      showSuccess('Removed from wishlist');
    } else {
      addToWishlist(productId);
      wishlistBtn.textContent = 'Remove from Wishlist';
      showSuccess('Added to wishlist');
    }
  });

  cartBtn.addEventListener('click', () => {
    const productId = cartBtn.dataset.id;
    if (cartBtn.textContent.includes('Remove')) {
      removeFromCart(productId);
      cartBtn.textContent = 'Add to Cart';
      showSuccess('Removed from cart');
    } else {
      addToCart(productId);
      cartBtn.textContent = 'Remove from Cart';
      showSuccess('Added to cart');
    }
  });
};

export const closeModal = () => {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';

  document.removeEventListener('keydown', handleEscape);
  refs.modal.removeEventListener('click', handleBackdropClick);
};
