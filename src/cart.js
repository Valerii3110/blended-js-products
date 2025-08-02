import { refs } from './js/refs.js';
import { fetchProductById } from './js/products-api.js';
import { renderProducts } from './js/render-functions.js';
import { openModal } from './js/modal.js';
import { getFromStorage, removeFromCart } from './js/storage.js';
import { updateCartCount, handleProductClick } from './js/handlers.js';
import { showSuccess } from './js/helpers.js';

document.addEventListener('DOMContentLoaded', async () => {
  const cartIds = getFromStorage(STORAGE_KEYS.CART);
  const cartCountElement = document.querySelector(SELECTORS.CART_COUNT);
  const summaryCountElement = document.querySelector('.cart-summary__items');
  const summaryPriceElement = document.querySelector('.cart-summary__total');

  // Оновлюємо лічильник у header
  if (cartCountElement) {
    cartCountElement.textContent = cartIds.length;
  }

  if (cartIds.length === 0) {
    document.querySelector('.not-found').classList.add('not-found--visible');
    document.querySelector('.cart-summary').style.display = 'none';
    return;
  }

  try {
    const products = await Promise.all(cartIds.map(id => fetchProductById(id)));

    const validProducts = products.filter(Boolean);
    renderProducts(validProducts);

    // Оновлюємо підсумок
    if (summaryCountElement) {
      summaryCountElement.textContent = validProducts.length;
    }

    if (summaryPriceElement) {
      const totalPrice = validProducts.reduce(
        (sum, product) => sum + product.price,
        0
      );
      summaryPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
  } catch (error) {
    document.querySelector('.not-found').classList.add('not-found--visible');
    document.querySelector('.cart-summary').style.display = 'none';
  }
});
