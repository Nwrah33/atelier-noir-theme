/**
 * Atelier Noir — Product Page Script
 * تبديل صور المعرض + الإضافة إلى السلة عبر Salla Cart SDK
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryThumbs();
  initAddToCart();
});

/* -------------------------------------------------
   Gallery thumbnail switching
------------------------------------------------- */
function initGalleryThumbs() {
  const mainImage = document.getElementById('product-main-image');
  const thumbs = document.querySelectorAll('.product-single__thumb');
  if (!mainImage || !thumbs.length) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.image;
      thumbs.forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });
}

/* -------------------------------------------------
   Add to cart — يستخدم Salla Cart API الرسمي
   المرجع: https://docs.salla.dev (Salla.cart.addItem)
------------------------------------------------- */
function initAddToCart() {
  const button = document.querySelector('.product-single__add-to-cart');
  const quantityField = document.getElementById('product-quantity');
  if (!button) return;

  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const quantity = parseInt(quantityField?.value, 10) || 1;

    if (typeof Salla === 'undefined' || !Salla.cart) {
      console.warn('Salla SDK غير محمّل بعد.');
      return;
    }

    button.disabled = true;
    button.textContent = 'جاري الإضافة...';

    Salla.cart
      .addItem({ id: productId, quantity })
      .then(() => {
        button.textContent = 'تمت الإضافة ✓';
        setTimeout(() => {
          button.disabled = false;
          button.textContent = 'أضف إلى السلة';
        }, 1800);
      })
      .catch((error) => {
        console.error(error);
        button.disabled = false;
        button.textContent = 'أضف إلى السلة';
      });
  });
}
