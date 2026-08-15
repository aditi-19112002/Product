// ========== DATA ==========
const product = {
  id: 'haridra-aloe-gel',
  name: 'Haridra Healing Aloe Vera Gel',
  price: 649,
  mrp: 899,
  image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80'
};

const relatedProducts = [
  {
    id: 'nava-rose-gel',
    name: 'Nava Hydrating Aloe + Rose Gel',
    price: 599,
    image: 'https://images.unsplash.com/photo-1571781926291-c77df43ee5c0?w=400&q=80'
  },
  {
    id: 'turmeric-face-wash',
    name: 'Haridra Turmeric Face Wash',
    price: 349,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80'
  },
  {
    id: 'aloe-moisturizer',
    name: 'Pure Aloe Daily Moisturizer',
    price: 449,
    image: 'https://images.unsplash.com/photo-1608248543800-ba0e0f1e0e0e?w=400&q=80'
  },
  {
    id: 'vetiver-serum',
    name: 'Vetiver + Saffron Night Serum',
    price: 799,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80'
  }
];

const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Jaipur', 'Chennai', 'Kolkata', 'Ahmedabad', 'Lucknow'];
const actions = [
  'just ordered this product',
  'is viewing this right now',
  'added this to cart',
  'bought 2 units'
];

// ========== STATE ==========
let cart = JSON.parse(localStorage.getItem('pbs_cart') || '[]');
let qty = 1;

// ========== ELEMENTS ==========
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');
const qtyInput = document.getElementById('qty');
const cartCount = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const liveToast = document.getElementById('liveToast');
const liveText = document.getElementById('liveText');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const payModal = document.getElementById('payModal');

// ========== GALLERY ==========
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    mainImage.src = thumb.dataset.full;
  });
});

const zoomWrap = document.getElementById('zoomWrap');
zoomWrap.addEventListener('click', () => {
  zoomWrap.classList.toggle('zoomed');
});

// ========== QTY ==========
document.getElementById('qtyMinus').addEventListener('click', () => {
  if (qty > 1) {
    qty--;
    qtyInput.value = qty;
  }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  if (qty < 10) {
    qty++;
    qtyInput.value = qty;
  }
});

// ========== CART ==========
function saveCart() {
  localStorage.setItem('pbs_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty">Cart is empty</p>';
    cartTotalEl.textContent = '₹0';
    return;
  }

  let total = 0;
  cartItemsEl.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="details">
          <div class="name">${item.name}</div>
          <div class="price">₹${item.price} × ${item.qty}</div>
          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  // Buy 2 → 15% OFF
  const mainQty = cart.find(i => i.id === product.id)?.qty || 0;
  if (mainQty >= 2) {
    total = Math.round(total * 0.85);
  }

  cartTotalEl.textContent = `₹${total}`;

  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart = cart.filter(i => i.id !== btn.dataset.id);
      saveCart();
    });
  });
}

function addToCart(productData, quantity = 1) {
  const existing = cart.find(i => i.id === productData.id);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ ...productData, qty: quantity });
  }
  saveCart();
  showToast(`Added ${quantity} item(s) to cart`);
}

document.getElementById('addToCart').addEventListener('click', () => addToCart(product, qty));
document.getElementById('buyNow').addEventListener('click', () => {
  addToCart(product, qty);
  openCart();
});
document.getElementById('stickyBuy').addEventListener('click', () => {
  addToCart(product, qty);
  openCart();
});

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
}

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) return;
  closeCart();
  payModal.classList.add('open');
});

document.getElementById('closePay').addEventListener('click', () => {
  payModal.classList.remove('open');
});

document.querySelectorAll('.pay-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    const method = btn.dataset.method;
    alert(`Demo: You selected ${method.toUpperCase()}.\nIn real store this would redirect to payment gateway or create COD order.`);
    payModal.classList.remove('open');
    cart = [];
    saveCart();
  });
});

// ========== LIVE ACTIVITY ==========
function showLiveActivity() {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  liveText.textContent = `Someone in ${city} ${action}`;
  liveToast.classList.add('show');
  setTimeout(() => liveToast.classList.remove('show'), 4000);
}

setTimeout(showLiveActivity, 3000);
setInterval(showLiveActivity, 12000 + Math.random() * 6000);

function showToast(msg) {
  liveText.textContent = msg;
  liveToast.classList.add('show');
  setTimeout(() => liveToast.classList.remove('show'), 2500);
}

// ========== RELATED ==========
const relatedGrid = document.getElementById('relatedGrid');
relatedGrid.innerHTML = relatedProducts.map(p => `
  <div class="related-card" data-id="${p.id}">
    <img src="${p.image}" alt="${p.name}" loading="lazy" />
    <div class="meta">
      <div class="name">${p.name}</div>
      <div class="price">₹${p.price}</div>
    </div>
  </div>
`).join('');

relatedGrid.querySelectorAll('.related-card').forEach(card => {
  card.addEventListener('click', () => {
    const p = relatedProducts.find(r => r.id === card.dataset.id);
    if (p) {
      addToCart(p, 1);
      openCart();
    }
  });
});

// ========== INIT ==========
updateCartUI();

const viewersEl = document.querySelector('.badge-viewers');
setInterval(() => {
  const n = 8 + Math.floor(Math.random() * 15);
  viewersEl.innerHTML = `<span class="pulse"></span> ${n} people viewing`;
}, 8000);