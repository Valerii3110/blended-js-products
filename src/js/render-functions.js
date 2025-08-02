import { SELECTORS } from './constants.js';
import { refs } from './refs.js';

export const renderProducts = products => {
  if (!products || products.length === 0) {
    refs.productsList.innerHTML = '';
    refs.notFound.classList.add('not-found--visible');
    refs.loadMoreBtn.style.display = 'none';
    return;
  }

  refs.notFound.classList.remove('not-found--visible');

  const markup = products
    .map(
      product => `
    <li class="products__item" data-id="${product.id}">
      <img class="products__image" src="${product.thumbnail}" alt="${product.title}" loading="lazy"/>
      <p class="products__title">${product.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
      <p class="products__category">Category: ${product.category}</p>
      <p class="products__price">Price: $${product.price}</p>
    </li>
  `
    )
    .join('');

  refs.productsList.innerHTML = markup;
};

export const appendProducts = products => {
  const markup = products
    .map(
      product => `
    <li class="products__item" data-id="${product.id}">
      <img class="products__image" src="${product.thumbnail}" alt="${product.title}" loading="lazy"/>
      <p class="products__title">${product.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
      <p class="products__category">Category: ${product.category}</p>
      <p class="products__price">Price: $${product.price}</p>
    </li>
  `
    )
    .join('');

  refs.productsList.insertAdjacentHTML('beforeend', markup);
};

export const renderCategories = categories => {
  const markup = categories
    .map(
      category => `
    <li class="categories__item">
      <button class="categories__btn" type="button" data-category="${category}">${category}</button>
    </li>
  `
    )
    .join('');

  refs.categoriesList.innerHTML = markup;
};

export const renderModalProduct = product => {
  const isInCart = getFromStorage(STORAGE_KEYS.CART).includes(product.id);
  const isInWishlist = getFromStorage(STORAGE_KEYS.WISHLIST).includes(
    product.id
  );

  const markup = `
    <img class="modal-product__img" src="${product.thumbnail}" alt="${
    product.title
  }" />
    <div class="modal-product__content">
      <p class="modal-product__title">${product.title}</p>
      <ul class="modal-product__tags">
        ${product.tags?.map(tag => `<li>${tag}</li>`).join('') || ''}
      </ul>
      <p class="modal-product__description">${product.description}</p>
      <p class="modal-product__price">Price: $${product.price}</p>
      <div class="modal-product__buttons">
        <button class="modal-product__wishlist-btn" type="button" data-id="${
          product.id
        }">
          ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
        <button class="modal-product__cart-btn" type="button" data-id="${
          product.id
        }">
          ${isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  `;

  refs.modalProduct.innerHTML = markup;
};
