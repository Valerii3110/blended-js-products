import {
  getFromStorage,
  addToStorage,
  removeFromStorage,
  updateNavCounts,
} from './storage.js';

export function openModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleKeyDown);
}

export function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

export function setupModalListeners() {
  const modal = document.querySelector('.modal');

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.closest('.modal__close-btn')) {
      closeModal();
    }
  });
}

export function updateModalButtons(productId) {
  const wishlistBtn = document.querySelector('.modal-product__btn--wishlist');
  const cartBtn = document.querySelector('.modal-product__btn--cart');

  const wishlist = getFromStorage('wishlist');
  const cart = getFromStorage('cart');

  if (wishlist.includes(productId)) {
    wishlistBtn.textContent = 'Remove from Wishlist';
    wishlistBtn.classList.add('modal-product__btn--active');
  } else {
    wishlistBtn.textContent = 'Add to Wishlist';
    wishlistBtn.classList.remove('modal-product__btn--active');
  }

  if (cart.includes(productId)) {
    cartBtn.textContent = 'Remove from Cart';
    cartBtn.classList.add('modal-product__btn--active');
  } else {
    cartBtn.textContent = 'Add to Cart';
    cartBtn.classList.remove('modal-product__btn--active');
  }

  wishlistBtn.addEventListener('click', () => {
    console.log(wishlist);
    if (wishlist.includes(productId)) {
      removeFromStorage('wishlist', productId);
      wishlistBtn.textContent = 'Add to Wishlist';
      wishlistBtn.classList.remove('modal-product__btn--active');
    } else {
      addToStorage('wishlist', productId);
      wishlistBtn.textContent = 'Remove from Wishlist';
      wishlistBtn.classList.add('modal-product__btn--active');
    }
    updateNavCounts();
  });

  cartBtn.addEventListener('click', () => {
    if (cart.includes(productId)) {
      removeFromStorage('cart', productId);
      cartBtn.textContent = 'Add to Cart';
      cartBtn.classList.remove('modal-product__btn--active');
    } else {
      addToStorage('cart', productId);
      cartBtn.textContent = 'Remove from Cart';
      cartBtn.classList.add('modal-product__btn--active');
    }
    updateNavCounts();
  });
}
