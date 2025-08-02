import { fetchProductById } from './js/products-api.js';
import {
  renderProducts,
  showLoader,
  hideLoader,
  showToast,
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
    const cartIds = getFromStorage('cart');
    console.log(0);
    if (cartIds.length === 0) {
      document.querySelector('.not-found').classList.add('not-found--visible');
      console.log(1);
      document.querySelector('.cart-summary').style.display = 'none';
      console.log(2);
      return;
    }
    console.log(3);
    const products = await Promise.all(cartIds.map(id => fetchProductById(id)));
    console.log(4);
    renderProducts(products);
    console.log(5);
    updateCartSummary(products);
    console.log(6);
  } catch (error) {
    showToast('Failed to load cart', 'error');
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

  document.querySelector('.cart-summary__btn').addEventListener('click', () => {
    showToast('Your purchase was successful!', 'success');
    localStorage.removeItem('cart');
    updateNavCounts();
    document.querySelector('.cart-summary').style.display = 'none';
    document.querySelector('.not-found').classList.add('not-found--visible');
    document.querySelector('.products').innerHTML = '';
  });
});

function updateCartSummary(products) {
  const totalItems = products.length;
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  document.querySelector('.cart-summary__items').textContent = totalItems;
  document.querySelector(
    '.cart-summary__total'
  ).textContent = `$${totalPrice.toFixed(2)}`;
}
