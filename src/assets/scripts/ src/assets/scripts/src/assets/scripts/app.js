/**
 * Atelier Noir — Global App Script
 * يشتغل بكل صفحات المتجر: reveal animations, mobile menu, quantity inputs
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initMobileMenu();
  initQuantityInputs();
});

/* -------------------------------------------------
   Scroll reveal — يفعّل كلاس is-visible عند الظهور
------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------
   Mobile menu toggle
------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
  });
}

/* -------------------------------------------------
   Quantity inputs (cart + product page)
------------------------------------------------- */
function initQuantityInputs() {
  document.querySelectorAll('.quantity-input').forEach((wrapper) => {
    const field = wrapper.querySelector('.quantity-input__field');
    const decreaseBtn = wrapper.querySelector('[data-action="decrease"]');
    const increaseBtn = wrapper.querySelector('[data-action="increase"]');

    if (!field) return;

    decreaseBtn?.addEventListener('click', () => {
      const current = parseInt(field.value, 10) || 1;
      if (current > 1) {
        field.value = current - 1;
        field.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    increaseBtn?.addEventListener('click', () => {
      const current = parseInt(field.value, 10) || 1;
      field.value = current + 1;
      field.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
}
