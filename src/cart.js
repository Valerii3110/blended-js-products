import { refs } from './js/refs.js';
import { fetchProductById } from './js/products-api.js';
import { getCart, setCart } from './js/storage.js';
import { showLoader, hideLoader, showSuccessToast } from './js/helpers.js';
import { renderProducts } from './js/render-functions.js';

// Ініціалізація сторінки кошика
document.addEventListener('DOMContentLoaded', initCartPage);

async function initCartPage() {
  try {
    showLoader();
    const cart = getCart();
    updateCartSummary(cart);

    if (cart.length === 0) {
      showEmptyCart();
      return;
    }

    const products = await loadCartProducts(cart);
    renderCartProducts(products);
    updateTotalPrice(products);

    setupEventListeners();
  } catch (error) {
    console.error('Error initializing cart page:', error);
    showEmptyCart();
  } finally {
    hideLoader();
  }
}

// Допоміжні функції
async function loadCartProducts(cart) {
  try {
    return await Promise.all(cart.map(id => fetchProductById(id)));
  } catch (error) {
    console.error('Error loading cart products:', error);
    return [];
  }
}

function renderCartProducts(products) {
  if (products.length > 0) {
    refs.products.innerHTML = renderProducts(products);
    document
      .querySelector('.not-found')
      ?.classList.remove('not-found--visible');
  } else {
    showEmptyCart();
  }
}

function updateCartSummary(cart) {
  if (refs.cartSummaryItems) {
    refs.cartSummaryItems.textContent = cart.length;
  }
}

function updateTotalPrice(products) {
  if (refs.cartSummaryTotal) {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    refs.cartSummaryTotal.textContent = `$${total.toFixed(2)}`;
  }
}

function showEmptyCart() {
  document.querySelector('.not-found')?.classList.add('not-found--visible');
  updateCartSummary([]);
  updateTotalPrice([]);
}

function setupEventListeners() {
  // Обробник кнопки покупки
  const buyBtn = document.querySelector('.cart-summary__btn');
  if (buyBtn) {
    buyBtn.addEventListener('click', handlePurchase);
  }

  // Додаткові обробники...
}

async function handlePurchase() {
  try {
    showLoader();
    setCart([]);
    showSuccessToast('Thank you for your purchase!');
    initCartPage(); // Оновлюємо сторінку
  } catch (error) {
    console.error('Error processing purchase:', error);
  } finally {
    hideLoader();
  }
}

// Експортовані функції для роботи з кошиком
export async function addToCart(productId) {
  const cart = getCart();
  if (!cart.includes(productId)) {
    cart.push(productId);
    setCart(cart);
    await updateCartUI();
    showSuccessToast('Product added to cart');
    return true;
  }
  return false;
}

export async function removeFromCart(productId) {
  const cart = getCart().filter(id => id !== productId);
  setCart(cart);
  await updateCartUI();
  showSuccessToast('Product removed from cart');
  return true;
}

async function updateCartUI() {
  const cart = getCart();
  updateCartSummary(cart);

  if (window.location.pathname.includes('cart.html')) {
    if (cart.length === 0) {
      showEmptyCart();
    } else {
      const products = await loadCartProducts(cart);
      renderCartProducts(products);
      updateTotalPrice(products);
    }
  }
}
