document.addEventListener('DOMContentLoaded', () => {
  let lazyImages = Array.from(document.querySelectorAll('img.lazy'));
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

function isElementInViewport (el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
