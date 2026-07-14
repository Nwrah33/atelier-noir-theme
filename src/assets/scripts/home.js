/**
 * Atelier Noir — Home Page Script
 * التحكم بالفيديو الرئيسي وسلايدر البنرات/المنتجات
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroYoutube();
  initFeaturedSlider();
});

/* -------------------------------------------------
   YouTube embed (lazy-loaded only if merchant chose youtube)
------------------------------------------------- */
function initHeroYoutube() {
  const wrapper = document.querySelector('.hero-video__youtube');
  if (!wrapper) return;

  const url = wrapper.dataset.youtubeUrl;
  const videoId = extractYoutubeId(url);
  if (!videoId) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`;
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
  iframe.setAttribute('frameborder', '0');
  iframe.style.cssText = 'width:100%;height:100%;position:absolute;inset:0;pointer-events:none;';
  wrapper.appendChild(iframe);
}

function extractYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&?/]+)/);
  return match ? match[1] : null;
}

/* -------------------------------------------------
   Featured products horizontal slider — drag to scroll
------------------------------------------------- */
function initFeaturedSlider() {
  const slider = document.querySelector('.featured-curated__slider');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  ['mouseleave', 'mouseup'].forEach((evt) =>
    slider.addEventListener(evt, () => (isDown = false))
  );

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.2;
    slider.scrollLeft = scrollLeft - walk;
  });
}
