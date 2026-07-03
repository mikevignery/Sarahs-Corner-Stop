const products = [
  { name: 'Custom Gift Basket', category: 'gifts', price: '$45+', image: 'https://raw.githubusercontent.com/mikevignery/Sarahs-Corner-Stop/refs/heads/main/beddfe05-9326-4649-9762-3c3064261721.png', description: 'Personalized basket for birthdays, holidays, or celebrations.' },
  { name: 'Personalized Home Sign', category: 'decor', price: '$65+', icon: '🏠', description: 'Custom sign with family name, quote, or seasonal design.' },
  { name: 'Party Favor Set', category: 'events', price: '$30+', icon: '🎉', description: 'Custom favors for showers, birthdays, and gatherings.' },
  { name: 'Custom Tumbler', category: 'gifts', price: '$25+', icon: '🥤', description: 'Personalized tumbler with name, phrase, or themed design.' },
  { name: 'Seasonal Decor Piece', category: 'decor', price: '$40+', icon: '🍂', description: 'Handmade decor for holidays and seasonal displays.' },
  { name: 'Event Welcome Sign', category: 'events', price: '$75+', icon: '✨', description: 'Custom sign for weddings, showers, parties, and special events.' },
  { name: 'Seasonal Decor Piece 2', category: 'decor', price: '$40+', icon: '🍂', description: 'Handmade decor 2 for holidays and seasonal displays.' },
  { name: 'Father Mows Best!', category: 'stickers', price: '$10+', image: 'https://raw.githubusercontent.com/mikevignery/Sarahs-Corner-Stop/refs/heads/main/Father%20mowes%20best.jpg', description: 'Let everyone in the neighborhood know your Father Mows Best!' },
  { name: 'Event Welcome Sign 2', category: 'events', price: '$75+', icon: '✨', description: 'Custom sign 2 for weddings, showers, parties, and special events.' }
];

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const search = document.getElementById('productSearch')?.value.toLowerCase() || '';
  const category = document.getElementById('categoryFilter')?.value || 'all';

  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
          <div class="product-image">
      ${product.image
        ? `<img src="${product.image}" alt="${product.name}" loading="lazy" />`
        : product.icon}
    </div>
      <span class="category-pill">${product.category}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price}</p>
      <a class="btn secondary" href="contact.html?product=${encodeURIComponent(product.name)}">Request Item</a>
    </article>
  `).join('');
}

document.getElementById('productSearch')?.addEventListener('input', renderProducts);
document.getElementById('categoryFilter')?.addEventListener('change', renderProducts);
renderProducts();

const loginForm = document.getElementById('loginForm');
const accountPanel = document.getElementById('accountPanel');
const logoutBtn = document.getElementById('logoutBtn');

function showAccount() {
  if (loginForm) loginForm.parentElement.classList.add('hidden');
  if (accountPanel) accountPanel.classList.remove('hidden');
}

function showLogin() {
  if (loginForm) loginForm.parentElement.classList.remove('hidden');
  if (accountPanel) accountPanel.classList.add('hidden');
}

if (localStorage.getItem('sarahsCornerLoggedIn') === 'true') showAccount();

loginForm?.addEventListener('submit', event => {
  event.preventDefault();
  localStorage.setItem('sarahsCornerLoggedIn', 'true');
  showAccount();
});

logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem('sarahsCornerLoggedIn');
  showLogin();
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");

  const productField = document.getElementById("product");

  if (product && productField) {
    productField.value = product;
  }
});
