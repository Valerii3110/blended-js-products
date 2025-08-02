import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderCategories(categories) {
  const categoriesList = document.querySelector('.categories');
  if (!categoriesList) return;
  const allCategories = [{ name: 'All' }, ...categories];

  const markup = allCategories
    .map(
      category => `
    <li class="categories__item">
      <button class="categories__btn" type="button">${category.name}</button>
    </li>
  `
    )
    .join('');

  categoriesList.innerHTML = markup;
}

export function renderProducts(products) {
  const productsList = document.querySelector('.products');

  if (!products || products.length === 0) {
    document.querySelector('.not-found').classList.add('not-found--visible');
    productsList.innerHTML = '';
    return;
  }

  document.querySelector('.not-found').classList.remove('not-found--visible');

  const markup = products
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

  productsList.innerHTML = markup;
}

export function renderModalProduct(product) {
  const modalContent = document.querySelector('.modal-product');

  const tagsMarkup = product.tags
    .map(tag => `<li class="modal-product__tag">${tag}</li>`)
    .join('');

  modalContent.innerHTML = `
    <img class="modal-product__img" src="${product.thumbnail}" alt="${product.title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${product.title}</p>
      <ul class="modal-product__tags">${tagsMarkup}</ul>
      <p class="modal-product__description">${product.description}</p>
      <p class="modal-product__shipping-information">Shipping: Free shipping for orders over $50</p>
      <p class="modal-product__return-policy">Return Policy: 30-day return policy</p>
      <p class="modal-product__price">Price: $${product.price}</p>
    </div>
  `;
}

export function showLoader() {
  document.querySelector('.loader').classList.add('loader--visible');
}

export function hideLoader() {
  document.querySelector('.loader').classList.remove('loader--visible');
}

export function showToast(message, type = 'success') {
  iziToast[type]({
    title: type === 'success' ? 'Success' : 'Error',
    message: message,
    position: 'topRight',
  });
}
