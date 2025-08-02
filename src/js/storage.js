import { STORAGE_KEYS } from './constants';
import { updateCartCount, updateWishlistCount } from './handlers';
import { showSuccess } from './helpers';

// Оголошення функцій з одноразовим експортом
export const getFromStorage = key => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addToCart = productId => {
  const cart = getFromStorage(STORAGE_KEYS.CART);
  if (!cart.includes(productId)) {
    cart.push(productId);
    saveToStorage(STORAGE_KEYS.CART, cart);
    updateCartCount();
    showSuccess('Product added to cart');
  }
};

export const removeFromCart = productId => {
  const cart = getFromStorage(STORAGE_KEYS.CART);
  const updatedCart = cart.filter(id => id !== productId);
  saveToStorage(STORAGE_KEYS.CART, updatedCart);
  updateCartCount();
  showSuccess('Product removed from cart');
};

export const addToWishlist = productId => {
  const wishlist = getFromStorage(STORAGE_KEYS.WISHLIST);
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveToStorage(STORAGE_KEYS.WISHLIST, wishlist);
    updateWishlistCount();
    showSuccess('Product added to wishlist');
  }
};

export const removeFromWishlist = productId => {
  const wishlist = getFromStorage(STORAGE_KEYS.WISHLIST);
  const updatedWishlist = wishlist.filter(id => id !== productId);
  saveToStorage(STORAGE_KEYS.WISHLIST, updatedWishlist);
  updateWishlistCount();
  showSuccess('Product removed from wishlist');
};

export const toggleTheme = () => {
  const currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  return newTheme;
};

export const initTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  return savedTheme;
};

// Видалено дублюючий блок експортів, оскільки всі функції вже експортуються при оголошенні
