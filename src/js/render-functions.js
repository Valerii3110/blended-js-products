import { refs } from './../js/refs';
import { toggleTheme } from './helpers';
export function renderCategories(categories) {
  return categories
    .map(
      category => `
      <li class="categories__item">
        <button class="categories__btn" type="button">
          ${
            typeof category === 'object'
              ? category.name || category.title
              : category
          }
        </button>
      </li>
    `
    )
    .join('');
}

export function renderProducts(products) {
  return products
    .map(
      product => `
      <li class="products__item" data-id="${product.id}">
        <img class="products__image" src="${product.thumbnail}" alt="${product.title}"/>
        <p class="products__title">${product.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
        <p class="products__category">Category: ${product.category}</p>
        <p class="products__price">Price: $${product.price}</p>
      </li>
    `
    )
    .join('');
}

export function renderModalProduct(product) {
  return `
    <img class="modal-product__img" src="${product.thumbnail}" alt="${product.title}">
    <div class="modal-product__content">
      <h3 class="modal-product__title">${product.title}</h3>
      <p class="modal-product__price">$${product.price}</p>
      <p class="modal-product__description">${product.description}</p>
    </div>
  `;
}
export function initPageTheme(params) {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  refs.themeToggleBtn.addEventListener('click', toggleTheme);

  document.querySelector('.theme-toggle-btn').innerHTML =
    savedTheme === 'light' ? '☀️' : '🌙';
}
