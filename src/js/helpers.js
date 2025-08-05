import { getCart, getWishlist } from './storage.js';
import { THEME_KEY } from './constants.js';
// src/js/helpers.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function toggleTheme() {
  const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
  let newTheme;
  if (currentTheme === 'light') {
    newTheme = 'dark';
  } else {
    newTheme = 'light';
  }

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);

  // Оновлення вигляду кнопки
  const themeBtn = document.querySelector('.theme-toggle-btn');

  if (themeBtn) {
    themeBtn.innerHTML = newTheme === 'light' ? '☀️' : '🌙';
  }
}

// Ініціалізація теми при завантаженні
export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggleTheme(); // Встановлює правильну іконку кнопки
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('loader--visible');
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('loader--visible');
  }
}

export function showSuccessToast(message) {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
  });
}

export function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

export function updateCartCount() {
  const removeFromCartPage = productId => {
    // Видаляємо елемент з DOM
    const productElement = document.querySelector(
      `.cart-page ul.products li[data-id="${productId}"]`
    );
    if (productElement) {
      productElement.remove();
    }

    // Оновлюємо підсумки
    updateCartTotals();
  };

  // Функція для оновлення підсумків кошика
  const updateCartTotals = async () => {
    const cart = getCart();
    const productsList = document.querySelector('.cart-page ul.products');

    if (!productsList) return;

    try {
      const requests = cart.map(id =>
        fetch(`https://api.example.com/products/${id}`).then(res => res.json())
      );
      const products = await Promise.all(requests);

      const totalItems = cart.length;
      const totalPrice = products.reduce(
        (sum, product) => sum + product.price,
        0
      );

      document.querySelector('.sidebar .items').textContent = totalItems;
      document.querySelector(
        '.sidebar .total'
      ).textContent = `$${totalPrice.toFixed(2)}`;
    } catch (error) {
      console.error('Error updating cart totals:', error);
    }
  };
  try {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('[data-cart-count]');
    cartCountElements.forEach(el => {
      el.textContent = cart.length;
    });
  } catch (error) {
    console.error('Error updating cart count:', error);
  }
}

export function updateWishlistCount() {
  try {
    const wishlist = getWishlist();
    const wishlistCountElements = document.querySelectorAll(
      '[data-wishlist-count]'
    );
    wishlistCountElements.forEach(el => {
      el.textContent = wishlist.length;
    });
  } catch (error) {
    console.error('Error updating wishlist count:', error);
  }
}
