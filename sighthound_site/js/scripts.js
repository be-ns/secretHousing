// Shared JavaScript for Sighthound site
// Persist cart count using localStorage
function updateCartCount() {
  const count = parseInt(localStorage.getItem('cartCount') || '0', 10);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function incrementCartCount() {
  let count = parseInt(localStorage.getItem('cartCount') || '0', 10);
  count += 1;
  localStorage.setItem('cartCount', count);
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  // Update cart count on load
  updateCartCount();

  // Attach click handlers to add-to-cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (btn.dataset.loading === 'true') return;
      btn.dataset.loading = 'true';
      const originalLabel = btn.textContent;
      btn.textContent = 'Adding…';
      // Simulate async request
      setTimeout(() => {
        btn.dataset.loading = 'false';
        btn.textContent = originalLabel;
        incrementCartCount();
      }, 800);
    });
  });
});
