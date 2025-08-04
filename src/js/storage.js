import { CART_KEY, WISHLIST_KEY } from './constants.js';

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}

export function setCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

export function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
}

export function setWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
}
