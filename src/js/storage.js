export function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function addToStorage(key, item) {
  const data = getFromStorage(key);
  if (!data.includes(item)) {
    data.push(item);
    saveToStorage(key, data);
  }
  return data;
}

export function removeFromStorage(key, item) {
  const data = getFromStorage(key);
  const index = data.indexOf(item);
  if (index !== -1) {
    data.splice(index, 1);
    saveToStorage(key, data);
  }
  return data;
}

export function updateNavCounts() {
  const wishlistCount = getFromStorage('wishlist').length;
  const cartCount = getFromStorage('cart').length;

  document.querySelectorAll('.nav__count').forEach(el => {
    el.textContent = cartCount + wishlistCount;
  });
}
