/*
 * Sighthound Design Studios client‑side logic
 *
 * This script powers the static version of the marketplace. It stores
 * cart information in localStorage and provides a simple carousel for
 * browsing items. Plant data is hardcoded for demonstration; in a real
 * implementation you could generate this data from a CMS or JSON file.
 */

// Sample plant data
const PLANTS = [
  {
    id: 'fiddle_fig',
    name: 'Fiddle Leaf Fig',
    species: 'Ficus lyrata',
    price: 120.00,
    description: 'A large fiddle leaf fig with glossy green leaves.',
    image: 'assets/images/fiddle_fig.png'
  },
  {
    id: 'snake_plant',
    name: 'Snake Plant',
    species: 'Sansevieria trifasciata',
    price: 45.00,
    description: 'A hardy snake plant that thrives on neglect.',
    image: 'assets/images/snake_plant.png'
  },
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    species: 'Monstera deliciosa',
    price: 95.00,
    description: 'A dramatic monstera with distinctive split leaves.',
    image: 'assets/images/monstera.png'
  }
];

/* Utility: retrieve cart from localStorage */
function getCart() {
  const cart = localStorage.getItem('sighthound_cart');
  return cart ? JSON.parse(cart) : [];
}

/* Utility: save cart to localStorage */
function saveCart(cart) {
  localStorage.setItem('sighthound_cart', JSON.stringify(cart));
}

/* Update the cart count badge in the header */
function updateCartCount() {
  const cart = getCart();
  const countEl = document.querySelector('.cart-count');
  if (countEl) {
    countEl.textContent = cart.length;
  }
}

/* Render plant cards into the carousel track */
function renderPlants() {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  track.innerHTML = '';
  PLANTS.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}">
      <div class="plant-info">
        <h3>${plant.name}</h3>
        <p><em>${plant.species}</em></p>
        <p class="price">$${plant.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${plant.id}">Add to Cart</button>
      </div>
    `;
    track.appendChild(card);
  });
}

/* Setup event listeners for adding to cart */
function setupAddToCartButtons() {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  track.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
      const plantId = event.target.getAttribute('data-id');
      addToCart(plantId);
    }
  });
}

/* Add a plant to the cart */
function addToCart(plantId) {
  const plant = PLANTS.find(p => p.id === plantId);
  if (!plant) return;
  const cart = getCart();
  cart.push(plant);
  saveCart(cart);
  updateCartCount();
  alert(`${plant.name} added to cart!`);
}

/* Render the cart page */
function renderCart() {
  const tbody = document.getElementById('cart-table-body');
  const totalEl = document.getElementById('cart-total');
  if (!tbody || !totalEl) return;
  const cart = getCart();
  tbody.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><button class="remove-item" data-index="${index}">Remove</button></td>
    `;
    tbody.appendChild(row);
    total += item.price;
  });
  totalEl.textContent = `$${total.toFixed(2)}`;
  tbody.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
      const idx = parseInt(event.target.getAttribute('data-index'), 10);
      removeFromCart(idx);
    }
  });
}

/* Remove item from cart */
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

/* Simple carousel functionality */
function setupCarousel() {
  const track = document.getElementById('carousel-track');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  if (!track || !prevButton || !nextButton) return;
  let index = 0;
  const cardWidth = 300 + 2 * 1 * 16; // width + margin*2 (assumes 1rem = 16px)
  const visibleCards = Math.floor((document.querySelector('.carousel').offsetWidth) / cardWidth) || 1;
  const maxIndex = Math.max(0, PLANTS.length - visibleCards);

  function updateTransform() {
    const translateX = -index * (cardWidth);
    track.style.transform = `translateX(${translateX}px)`;
  }

  prevButton.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    updateTransform();
  });
  nextButton.addEventListener('click', () => {
    index = Math.min(maxIndex, index + 1);
    updateTransform();
  });
}

// Initialise on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (document.getElementById('carousel-track')) {
    renderPlants();
    setupCarousel();
    setupAddToCartButtons();
  }
  if (document.getElementById('cart-table-body')) {
    renderCart();
  }
});