import { closeModal } from './modal.js';
import { getCart, setCart, getWishlist, setWishlist } from './storage.js';
import {
  showSuccessToast,
  updateCartCount,
  updateWishlistCount,
} from './helpers.js';

export function setupModalHandlers() {
  refs.modal.addEventListener('click', e => {
    if (
      e.target === refs.modal ||
      e.target.classList.contains('modal__close-btn')
    ) {
      closeModal();
    }
  });
}
export function setupCartHandlers() {
  refs.modal.addEventListener('click', e => {
    if (e.target.classList.contains('modal-product__btn--cart')) {
      const productId = parseInt(
        refs.modalProduct.querySelector('.products__item').dataset.id
      );
      const cart = getCart();

      if (cart.includes(productId)) {
        // Видалити з кошика
        const updatedCart = cart.filter(id => id !== productId);
        setCart(updatedCart);
        e.target.textContent = 'Add to Cart';
        showSuccessToast('Product removed from cart');
      } else {
        // Додати до кошика
        setCart([...cart, productId]);
        e.target.textContent = 'Remove from Cart';
        showSuccessToast('Product added to cart');
      }

      updateCartCount();
    }
  });
}

export function setupWishlistHandlers() {
  refs.modal.addEventListener('click', e => {
    if (e.target.classList.contains('modal-product__btn--wishlist')) {
      const productId = parseInt(
        refs.modalProduct.querySelector('.products__item').dataset.id
      );
      const wishlist = getWishlist();

      if (wishlist.includes(productId)) {
        // Видалити з wishlist
        const updatedWishlist = wishlist.filter(id => id !== productId);
        setWishlist(updatedWishlist);
        e.target.textContent = 'Add to Wishlist';
        showSuccessToast('Product removed from wishlist');
      } else {
        // Додати до wishlist
        setWishlist([...wishlist, productId]);
        e.target.textContent = 'Remove from Wishlist';
        showSuccessToast('Product added to wishlist');
      }

      updateWishlistCount();
    }
  });
}

export function setupScrollTopHandler() {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      refs.scrollTopBtn.classList.add('scroll-top-btn--visible');
    } else {
      refs.scrollTopBtn.classList.remove('scroll-top-btn--visible');
    }
  });

  refs.scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      refs.scrollTopBtn.classList.add('scroll-top-btn--visible');
    } else {
      refs.scrollTopBtn.classList.remove('scroll-top-btn--visible');
    }
  });
}

export function setupSearchHandlers() {
  // Обробник очищення пошуку
  if (refs.searchFormClearBtn) {
    refs.searchFormClearBtn.addEventListener('click', () => {
      refs.searchFormInput.value = '';
      refs.searchFormClearBtn.classList.add('is-hidden');
      // Додаткові дії при очищенні пошуку
      currentSearchQuery = '';
      currentPage = 1;
      loadProducts();
    });
  }

  // Обробник введення тексту
  if (refs.searchFormInput) {
    refs.searchFormInput.addEventListener('input', e => {
      if (e.target.value.trim()) {
        refs.searchFormClearBtn.classList.remove('is-hidden');
      } else {
        refs.searchFormClearBtn.classList.add('is-hidden');
      }
    });
  }

  // Обробник сабміту форми
  if (refs.searchForm) {
    refs.searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const searchValue = refs.searchFormInput.value.trim();
      if (searchValue) {
        currentSearchQuery = searchValue;
        currentPage = 1;
        loadProducts();
      }
    });
  }
}
