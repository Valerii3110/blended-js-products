import { refs } from './js/refs.js';
import { fetchProductById } from './js/products-api.js';
import { initPageTheme, renderProducts } from './js/render-functions.js';
import { getCart, setCart } from './js/storage.js';
import {
  showLoader,
  hideLoader,
  showSuccessToast,
  updateCartCount,
} from './js/helpers.js';
import { openModal } from './js/modal.js';

document.addEventListener('DOMContentLoaded', initCartPage);

async function initCartPage() {
  try {
    showLoader();
    initPageTheme();
    const cart = getCart();
    updateCartSummary(cart);

    if (cart.length === 0) {
      showEmptyCart();
      return;
    }

    const products = await Promise.all(cart.map(id => fetchProductById(id)));
    renderCartProducts(products);
    updateTotalPrice(products);

    setupCartPageEventListeners();
  } catch (error) {
    console.error('Error initializing cart page:', error);
    showErrorToast('Не вдалося завантажити товари в кошику');
  } finally {
    hideLoader();
  }
}

function renderCartProducts(products) {
  refs.cartProducts.innerHTML = renderProducts(products);
}

function updateCartSummary(cart) {
  refs.cartSummaryItems.textContent = cart.length;
}

function updateTotalPrice(products) {
  const total = products.reduce((sum, product) => sum + product.price, 0);
  refs.cartSummaryTotal.textContent = `$${total.toFixed(2)}`;
}

function showEmptyCart() {
  refs.notFound.classList.add('not-found--visible');
  refs.cartSummaryItems.textContent = '0';
  refs.cartSummaryTotal.textContent = '$0';
}

function setupCartPageEventListeners() {
  // Відкриття модального вікна
  refs.cartProducts.addEventListener('click', e => {
    const productItem = e.target.closest('.products__item');
    if (productItem) {
      const productId = productItem.dataset.id;
      openModal(productId);
    }
  });

  // Кнопка покупки
  refs.cartSummaryBtn.addEventListener('click', () => {
    showSuccessToast('Дякуємо за покупку! Ваше замовлення оформлено.');
    setCart([]);
    updateCartCount();
    showEmptyCart();
  });
}
