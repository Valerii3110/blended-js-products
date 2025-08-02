export function setupScrollUpButton() {
  const scrollUpBtn = document.querySelector('.scroll-up');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollUpBtn.classList.add('scroll-up--visible');
    } else {
      scrollUpBtn.classList.remove('scroll-up--visible');
    }
  });

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

export function setupThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.body.classList.toggle('dark-theme', currentTheme === 'dark');
  themeToggle.checked = currentTheme === 'dark';

  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  });
}
