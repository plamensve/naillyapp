const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('mobile-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-open');
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const featureLines = Array.from(document.querySelectorAll('.feature-line'));
const editorialCards = Array.from(document.querySelectorAll('.editorial-card'));

if ('IntersectionObserver' in window && featureLines.length && editorialCards.length) {
  const featureObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = editorialCards.indexOf(entry.target);
      featureLines.forEach((line, lineIndex) => line.classList.toggle('active', lineIndex === index));
    });
  }, { threshold: 0.58 });

  editorialCards.forEach(card => featureObserver.observe(card));
}