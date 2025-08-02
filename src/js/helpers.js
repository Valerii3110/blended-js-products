import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const showLoader = () => {
  const loader = document.createElement('div');
  loader.className = 'loader';
  document.body.appendChild(loader);
};

export const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
};

export const showError = message => {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
};

export const showSuccess = message => {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
  });
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
