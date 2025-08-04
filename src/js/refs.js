export const refs = {
  // Common elements
  loader: document.querySelector('.loader'),
  scrollTopBtn: document.querySelector('.scroll-top-btn'),
  themeToggleBtn: document.querySelector('.theme-toggle-btn'),

  // For home page
  categories: document.querySelector('.categories'),
  products: document.querySelector('.products'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  notFound: document.querySelector('.not-found'),

  // For modal
  modal: document.querySelector('.modal'),
  modalProduct: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),

  // For header
  searchForm: document.querySelector('.search-form'),
  searchFormInput: document.querySelector('.search-form__input'),
  searchFormClearBtn: document.querySelector('.search-form__btn-clear'),
  searchFormBtn: document.querySelector('.search-form__btn'),
  cartCount: document.querySelector('[data-cart-count]'),
  wishlistCount: document.querySelector('[data-wishlist-count]'),

  // For cart page
  cartProducts: document.querySelector('.products'),
  cartSummaryItems: document.querySelector('[data-count]'),
  cartSummaryTotal: document.querySelector('[data-price]'),
  cartSummaryBtn: document.querySelector('.cart-summary__btn'),

  // For wishlist page
  wishlistProducts: document.querySelector('.products'),
};
