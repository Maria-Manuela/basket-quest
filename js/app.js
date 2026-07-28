/* Basket Quest — shared app logic (shop, about, contact) */

const PRODUCTS = [
  { id: "bq-oat-001", name: "Økologisk Havregryn", price: 39, category: "Food", description: "Creamy organic oats from Jutland farms.", emoji: "🥣", tags: ["organic", "local", "sustainable"], vendorId: "nordisk-korn" },
  { id: "bq-salm-002", name: "Smoked Salmon Snack Pack", price: 79, category: "Food", description: "Ready-to-serve Nordic salmon bites.", emoji: "🐟", tags: ["local", "gift-friendly"], vendorId: "fjord-deli" },
  { id: "bq-rye-003", name: "Rye Crispbread Duo", price: 45, category: "Food", description: "Crunchy wholegrain crispbread pair.", emoji: "🍞", tags: ["local", "vegan"], vendorId: "nordisk-korn" },
  { id: "bq-berry-004", name: "Berry Compote Jar", price: 55, category: "Food", description: "Forest berries, lightly sweetened.", emoji: "🫙", tags: ["organic", "gift-friendly"], vendorId: "haven-preserve" },
  { id: "bq-linen-005", name: "Linen Tea Towel Set", price: 149, category: "Home", description: "Soft stone-washed linen in moss green.", emoji: "🧺", tags: ["Danish design", "sustainable", "gift-friendly"], vendorId: "atelier-lyse" },
  { id: "bq-board-006", name: "Beechwood Cutting Board", price: 229, category: "Home", description: "Hand-finished board for everyday prep.", emoji: "🪵", tags: ["Danish design", "local", "gift-friendly"], vendorId: "trae-vaerk" },
  { id: "bq-candle-007", name: "Soy Candle — Pine Coast", price: 129, category: "Home", description: "Slow-burn candle with coastal pine notes.", emoji: "🕯️", tags: ["sustainable", "vegan", "gift-friendly"], vendorId: "atelier-lyse" },
  { id: "bq-mug-008", name: "Ceramic Mug — Fjord Blue", price: 119, category: "Home", description: "Wheel-thrown mug with matte glaze.", emoji: "☕", tags: ["Danish design", "gift-friendly"], vendorId: "lera-studio" },
  { id: "bq-mist-009", name: "Seaweed Face Mist", price: 169, category: "Self-care", description: "Hydrating mist with Nordic seaweed.", emoji: "💧", tags: ["organic", "vegan", "sustainable"], vendorId: "nordic-skin" },
  { id: "bq-soap-010", name: "Birch Bath Soap Trio", price: 99, category: "Self-care", description: "Gentle soaps wrapped in recycled paper.", emoji: "🧼", tags: ["organic", "local", "gift-friendly"], vendorId: "nordic-skin" },
  { id: "bq-socks-011", name: "Wool Slipper Socks", price: 159, category: "Self-care", description: "Cosy merino blend for cold evenings.", emoji: "🧦", tags: ["local", "gift-friendly"], vendorId: "uld-co" },
  { id: "bq-gift-012", name: "Mini Gift Box — Hygge", price: 189, category: "Gifts", description: "Tea, honey sticks, and a linen napkin.", emoji: "🎁", tags: ["gift-friendly", "local"], vendorId: "haven-preserve" },
  { id: "bq-tote-013", name: "Reusable Market Tote", price: 89, category: "Everyday", description: "Sturdy organic cotton tote for errands.", emoji: "🛍️", tags: ["sustainable", "vegan", "organic"], vendorId: "groen-goods" },
  { id: "bq-soapref-014", name: "Dish Soap Refill Pouch", price: 69, category: "Everyday", description: "Plant-based cleaner in a refill pouch.", emoji: "🧴", tags: ["sustainable", "vegan"], vendorId: "groen-goods" },
];

const VENDORS = [
  { id: "nordisk-korn", name: "Nordisk Korn", category: "Food", emoji: "🌾", blurb: "Organic grains and bakery staples from Jutland farms.", specialties: ["organic oats", "rye crispbread", "local milling"] },
  { id: "fjord-deli", name: "Fjord Deli", category: "Food", emoji: "🌊", blurb: "Coastal Nordic snacks curated for everyday entertaining.", specialties: ["smoked salmon", "ready-to-serve bites"] },
  { id: "haven-preserve", name: "Haven Preserve", category: "Food", emoji: "🫐", blurb: "Small-batch jams, compotes, and gift-ready pantry jars.", specialties: ["berry compote", "hygge gift boxes"] },
  { id: "atelier-lyse", name: "Atelier Lyse", category: "Home", emoji: "🏠", blurb: "Soft home textiles and calm atmosphere pieces.", specialties: ["linen", "soy candles", "Danish design"] },
  { id: "trae-vaerk", name: "Træ Værk", category: "Home", emoji: "🪵", blurb: "Hand-finished woodware made for daily kitchen rituals.", specialties: ["cutting boards", "local craft"] },
  { id: "lera-studio", name: "Lera Studio", category: "Home", emoji: "🏺", blurb: "Wheel-thrown ceramics with quiet Scandinavian colour.", specialties: ["mugs", "tableware"] },
  { id: "nordic-skin", name: "Nordic Skin Co.", category: "Self-care", emoji: "🌿", blurb: "Plant-based care with seaweed, birch, and soft scents.", specialties: ["face mist", "soap trios", "organic"] },
  { id: "uld-co", name: "Uld & Co", category: "Self-care", emoji: "🧶", blurb: "Warm wool accessories for cold Danish evenings.", specialties: ["slipper socks", "local wool"] },
  { id: "groen-goods", name: "Grøn Goods", category: "Everyday", emoji: "♻️", blurb: "Refills and reusable essentials for greener routines.", specialties: ["totes", "refill pouches", "sustainable"] },
];

const POINTS_FOR_FREE_PARCEL = 100;

const CHALLENGES = [
  { id: "free", title: "Free-style favorites", short: "Shop your way", brief: "Stay on budget with your favorites — no challenge rules. Build any basket you like and keep an eye on a soft DKK 500 guide.", budget: 500, minItems: 1, requiredTags: [], requireFreeParcel: false, freeStyle: true },
  { id: "c1", title: "Sustainable home gift", short: "Gift under DKK 500", brief: "Build a sustainable home gift basket under DKK 500. Add at least 3 products and unlock free parcel-shop delivery.", budget: 500, minItems: 3, requiredTags: ["sustainable", "gift-friendly"], requireFreeParcel: true },
  { id: "c2", title: "Organic breakfast kit", short: "Breakfast under DKK 250", brief: "Assemble an organic breakfast under DKK 250 with at least 3 products tagged organic.", budget: 250, minItems: 3, requiredTags: ["organic"], requireFreeParcel: false },
  { id: "c3", title: "Self-care Sunday", short: "Self-care under DKK 450", brief: "Create a calming self-care basket under DKK 450 with at least 3 products including one vegan item.", budget: 450, minItems: 3, requiredTags: ["vegan"], requireFreeParcel: false },
  { id: "c4", title: "Danish design host gift", short: "Design gift under DKK 600", brief: "Pick a Danish design host gift under DKK 600. Include Danish design + gift-friendly products and unlock free parcel-shop delivery.", budget: 600, minItems: 2, requiredTags: ["Danish design", "gift-friendly"], requireFreeParcel: true },
  { id: "c5", title: "Everyday green restock", short: "Restock under DKK 300", brief: "Restock everyday essentials under DKK 300 with at least 2 sustainable products.", budget: 300, minItems: 2, requiredTags: ["sustainable"], requireFreeParcel: false },
];

const DELIVERY = {
  parcel: { id: "parcel", label: "Parcel shop", price: 39 },
  home: { id: "home", label: "Home delivery", price: 59 },
  collect: { id: "collect", label: "Click & collect", price: 0 },
};

const PAYMENT_METHODS = [
  { id: "card", label: "Card", note: "Visa, Mastercard, Dankort" },
  { id: "mobilepay", label: "MobilePay", note: "Pay with your phone" },
  { id: "applepay", label: "Apple Pay", note: "Fast checkout on Apple devices" },
  { id: "googlepay", label: "Google Pay", note: "Pay with your Google account" },
];

const FREE_PARCEL_THRESHOLD = 399;
const STORAGE = {
  cart: "basketQuest.cart",
  best: "basketQuest.bestScore.v2",
  delivery: "basketQuest.delivery",
  challenge: "basketQuest.challengeId",
  contact: "basketQuest.contactMessages",
  phone: "basketQuest.mpPhone",
  payment: "basketQuest.paymentMethod",
  users: "basketQuest.users",
  session: "basketQuest.sessionEmail",
};

const PAGE = document.body.dataset.page || "shop";

let cart = {};
let activeChallenge = CHALLENGES[0];
let deliveryMethod = "parcel";
let paymentMethod = "card";
let bestScore = 0;
let activeCategory = "All";
let orderPlaced = false;
let lastOrderMeta = null;
let toastTimer = null;
let currentUser = null;
let vendorFilter = "All";
let selectedVendorId = null;
let redeemPointsForDelivery = false;

function formatDKK(amount) {
  return `DKK ${Math.round(amount)}`;
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getCartLines() {
  return Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter((line) => line.product);
}

function getItemCount() {
  return getCartLines().reduce((sum, line) => sum + line.qty, 0);
}

function getSubtotal() {
  return getCartLines().reduce((sum, line) => sum + line.product.price * line.qty, 0);
}

function canRedeemFreeParcel() {
  return Boolean(currentUser && (currentUser.points || 0) >= POINTS_FOR_FREE_PARCEL);
}

function getDeliveryCost(subtotal = getSubtotal()) {
  if (deliveryMethod === "parcel") {
    if (redeemPointsForDelivery && canRedeemFreeParcel()) return 0;
    return subtotal >= FREE_PARCEL_THRESHOLD ? 0 : DELIVERY.parcel.price;
  }
  if (deliveryMethod === "home") return DELIVERY.home.price;
  return DELIVERY.collect.price;
}

function getTotal() {
  return getSubtotal() + getDeliveryCost();
}

function getBudgetRemaining() {
  return activeChallenge.budget - getSubtotal();
}

function cartHasTag(tag) {
  return getCartLines().some(({ product }) => product.tags.includes(tag));
}

function countTagMatches(tag) {
  return getCartLines().reduce((sum, { product, qty }) => (
    product.tags.includes(tag) ? sum + qty : sum
  ), 0);
}

function initials(name) {
  return String(name || "BQ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "BQ";
}

function shopHref(hash = "shop") {
  return PAGE === "shop" ? `#${hash}` : `index.html#${hash}`;
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(`basket-quest::${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function loadUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(STORAGE.users) || "{}");
    return users && typeof users === "object" ? users : {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE.users, JSON.stringify(users));
}

function persistCurrentUser() {
  if (!currentUser) return;
  const users = loadUsers();
  users[currentUser.email] = currentUser;
  saveUsers(users);
  localStorage.setItem(STORAGE.session, currentUser.email);
}

function loadSession() {
  const email = localStorage.getItem(STORAGE.session);
  if (!email) {
    currentUser = null;
    return;
  }
  currentUser = loadUsers()[email] || null;
  if (!currentUser) localStorage.removeItem(STORAGE.session);
  if (currentUser && currentUser.bestScore === 15 && (!currentUser.orders || !currentUser.orders.length)) {
    currentUser.bestScore = 0;
    persistCurrentUser();
  }
}

async function signup(name, email, password) {
  const normalized = email.trim().toLowerCase();
  const users = loadUsers();
  if (users[normalized]) throw new Error("An account with this email already exists.");
  currentUser = {
    email: normalized,
    name: name.trim(),
    passwordHash: await hashPassword(password),
    points: 0,
    bestScore: 0,
    underBudgetOrders: 0,
    challengesCleared: 0,
    orders: [],
    createdAt: new Date().toISOString(),
  };
  persistCurrentUser();
}

async function login(email, password) {
  const normalized = email.trim().toLowerCase();
  const user = loadUsers()[normalized];
  if (!user) throw new Error("No account found with that email.");
  if (user.passwordHash !== await hashPassword(password)) throw new Error("Incorrect password.");
  currentUser = user;
  localStorage.setItem(STORAGE.session, normalized);
}

function logout() {
  currentUser = null;
  localStorage.removeItem(STORAGE.session);
  showToast("Logged out");
  if (PAGE === "shop") {
    location.hash = "shop";
    renderShop();
  } else {
    renderChrome();
  }
}

function evaluateChallenge() {
  const challenge = activeChallenge;
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const freeParcelUnlocked = subtotal >= FREE_PARCEL_THRESHOLD;
  const withinBudget = itemCount > 0 && subtotal <= challenge.budget;
  const enoughItems = itemCount >= challenge.minItems;
  const tagResults = challenge.requiredTags.map((tag) => ({
    tag,
    ok: cartHasTag(tag),
    count: countTagMatches(tag),
  }));
  const tagsOk = tagResults.every((t) => t.ok);
  const deliveryOk = !challenge.requireFreeParcel || freeParcelUnlocked;
  const remaining = challenge.budget - subtotal;
  const overBy = Math.max(subtotal - challenge.budget, 0);

  if (itemCount === 0) {
    return {
      score: 0, complete: false, withinBudget: false, enoughItems: false, tagsOk: false,
      tagResults, deliveryOk: !challenge.requireFreeParcel, freeParcelUnlocked: false,
      subtotal: 0, itemCount: 0, remaining: challenge.budget, overBy: 0,
      feedback: [challenge.freeStyle ? "Add favorites to start your free-style basket." : "Add products to begin the challenge."],
    };
  }

  // Free-style: soft budget guide only (stay on budget with your favorites)
  if (challenge.freeStyle) {
    let score = 40; // base for building a basket
    if (withinBudget) score += 60;
    else if (subtotal <= challenge.budget * 1.15) score += 25;
    score = Math.min(100, score);
    const feedback = [];
    if (!withinBudget) feedback.push(`Over your soft budget by ${formatDKK(overBy)}.`);
    else feedback.push(`${formatDKK(remaining)} left on your soft budget guide.`);
    if (freeParcelUnlocked && deliveryMethod === "parcel") feedback.push("Free delivery unlocked");
    feedback.push("Free-style basket ready — checkout whenever you like.");
    return {
      score, complete: true, withinBudget, enoughItems: true, tagsOk: true, tagResults,
      deliveryOk: true, freeParcelUnlocked, subtotal, itemCount, remaining, overBy, feedback,
    };
  }

  const weights = challenge.requireFreeParcel
    ? { budget: 30, items: 25, tags: 30, delivery: 15 }
    : { budget: 35, items: 30, tags: 35, delivery: 0 };

  let score = 0;
  if (withinBudget) score += weights.budget;
  else if (subtotal <= challenge.budget * 1.15) score += Math.round(weights.budget * 0.4);

  if (enoughItems) score += weights.items;
  else score += Math.round((itemCount / challenge.minItems) * weights.items);

  const tagSlice = weights.tags / Math.max(challenge.requiredTags.length, 1);
  tagResults.forEach((t) => { if (t.ok) score += tagSlice; });

  if (weights.delivery > 0) {
    if (freeParcelUnlocked) score += weights.delivery;
    else score += Math.round((subtotal / FREE_PARCEL_THRESHOLD) * weights.delivery);
  }

  score = Math.min(100, Math.round(score));
  const complete = withinBudget && enoughItems && tagsOk && deliveryOk;

  const feedback = [];
  if (!withinBudget) feedback.push(`Over budget by ${formatDKK(overBy)}.`);
  else feedback.push(`${formatDKK(remaining)} left in your budget.`);
  if (!enoughItems) {
    const need = challenge.minItems - itemCount;
    if (need > 0) feedback.push(`Add ${need} more product${need === 1 ? "" : "s"}.`);
  }
  tagResults.forEach((t) => { if (!t.ok) feedback.push(`Add one ${t.tag} product.`); });
  if (challenge.requireFreeParcel && !freeParcelUnlocked) {
    feedback.push(`Spend ${formatDKK(Math.max(FREE_PARCEL_THRESHOLD - subtotal, 0))} more for free parcel-shop delivery.`);
  }
  if (freeParcelUnlocked && deliveryMethod === "parcel") feedback.push("Free delivery unlocked");
  if (complete) feedback.push("All challenge goals met — nice basket!");

  return {
    score, complete, withinBudget, enoughItems, tagsOk, tagResults,
    deliveryOk, freeParcelUnlocked, subtotal, itemCount, remaining, overBy, feedback,
  };
}

/** Budget-aware offers that help complete the challenge */
function getRecommendations(limit = 3) {
  const result = evaluateChallenge();
  const inCart = new Set(Object.keys(cart));
  const missingTags = result.tagResults.filter((t) => !t.ok).map((t) => t.tag);
  const needItems = Math.max(activeChallenge.minItems - result.itemCount, 0);
  const overBudget = result.itemCount > 0 && !result.withinBudget;
  const remaining = Math.max(result.remaining, 0);

  const candidates = PRODUCTS.filter((p) => !inCart.has(p.id));

  const rank = (p) => {
    let score = 0;
    const fillsMissing = missingTags.some((t) => p.tags.includes(t));
    if (fillsMissing) score += 8;
    if (needItems > 0) score += 2;
    if (activeChallenge.requiredTags.some((t) => p.tags.includes(t))) score += 2;
    if (activeChallenge.requireFreeParcel && result.subtotal < FREE_PARCEL_THRESHOLD) {
      const after = result.subtotal + p.price;
      if (after >= FREE_PARCEL_THRESHOLD && after <= activeChallenge.budget) score += 4;
    }
    if (overBudget) {
      // Prefer cheaper challenge-fit products as swap ideas
      score += Math.max(0, 6 - Math.floor(p.price / 40));
      if (p.price <= remaining + activeChallenge.budget * 0.25) score += 2;
    } else if (result.itemCount === 0) {
      score += fillsMissing ? 3 : 1;
      score += Math.max(0, 3 - Math.floor(p.price / 80));
    } else {
      if (p.price <= remaining) score += 6;
      else score -= 4;
      // Prefer filling leftover budget usefully
      if (remaining > 0 && p.price >= Math.min(30, remaining * 0.25) && p.price <= remaining) score += 2;
    }
    return score;
  };

  let pool = candidates;
  if (!overBudget && result.itemCount > 0) {
    const fitting = candidates.filter((p) => p.price <= remaining);
    if (fitting.length) pool = fitting;
  }
  if (overBudget) {
    const affordable = candidates.filter((p) => p.price <= activeChallenge.budget);
    if (affordable.length) pool = affordable;
  }

  const ranked = pool
    .map((p) => ({ product: p, score: rank(p) }))
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price);

  const picks = ranked.slice(0, limit).map((r) => r.product);
  while (picks.length < limit && candidates.length) {
    const next = candidates.find((p) => !picks.includes(p));
    if (!next) break;
    picks.push(next);
  }

  let mode = "start";
  let title = "Recommended for you";
  let subtitle = "Suggestions to start your challenge.";
  if (overBudget) {
    mode = "over";
    title = "Over budget — try these offers";
    subtitle = `You’re ${formatDKK(result.overBy)} over. Pick lower-priced options that still fit the challenge.`;
  } else if (result.itemCount > 0) {
    mode = "fill";
    title = "Offers that fit your remaining budget";
    subtitle = remaining > 0
      ? `You have ${formatDKK(remaining)} left — products that help complete the challenge.`
      : "You’re on budget. Fine-tune tags and delivery goals.";
  }

  return { products: picks, mode, title, subtitle, remaining, overBy: result.overBy };
}

function saveState() {
  localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  localStorage.setItem(STORAGE.best, String(bestScore));
  localStorage.setItem(STORAGE.delivery, deliveryMethod);
  localStorage.setItem(STORAGE.challenge, activeChallenge.id);
  localStorage.setItem(STORAGE.payment, paymentMethod);
  const phone = document.getElementById("mp-phone");
  if (phone) localStorage.setItem(STORAGE.phone, phone.value);
}

function loadState() {
  localStorage.removeItem("basketQuest.bestScore");
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE.cart) || "{}");
    cart = savedCart && typeof savedCart === "object" ? savedCart : {};
  } catch {
    cart = {};
  }
  bestScore = Number(localStorage.getItem(STORAGE.best) || 0) || 0;
  const savedDelivery = localStorage.getItem(STORAGE.delivery);
  deliveryMethod = DELIVERY[savedDelivery] ? savedDelivery : "parcel";
  const savedPay = localStorage.getItem(STORAGE.payment);
  paymentMethod = PAYMENT_METHODS.some((p) => p.id === savedPay) ? savedPay : "card";
  const challengeId = localStorage.getItem(STORAGE.challenge);
  activeChallenge = CHALLENGES.find((c) => c.id === challengeId) || CHALLENGES[0];
  loadSession();
}

function showToast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add("hidden"), 2200);
}

function isValidDkMobile(value) {
  return String(value || "").replace(/\D/g, "").length === 8;
}

function isCardValid() {
  const number = (document.getElementById("card-number")?.value || "").replace(/\s/g, "");
  const expiry = document.getElementById("card-expiry")?.value || "";
  const cvc = document.getElementById("card-cvc")?.value || "";
  return /^\d{12,19}$/.test(number) && /^\d{2}\/\d{2}$/.test(expiry) && /^\d{3,4}$/.test(cvc);
}

function paymentReady() {
  if (paymentMethod === "mobilepay") return isValidDkMobile(document.getElementById("mp-phone")?.value);
  if (paymentMethod === "card") return isCardValid();
  return true; // apple / google simulated
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  orderPlaced = false;
  persistAndRender();
  const p = getProduct(productId);
  if (p) showToast(`Added ${p.name}`);
}

function removeFromCart(productId) {
  if (!cart[productId]) return;
  cart[productId] -= 1;
  if (cart[productId] <= 0) delete cart[productId];
  orderPlaced = false;
  persistAndRender();
}

function setQty(productId, qty) {
  const n = Math.max(0, Math.min(99, Number(qty) || 0));
  if (n === 0) delete cart[productId];
  else cart[productId] = n;
  orderPlaced = false;
  persistAndRender();
}

function clearBasket() {
  cart = {};
  orderPlaced = false;
  lastOrderMeta = null;
  persistAndRender();
  showToast("Basket cleared");
}

function selectChallenge(challengeId) {
  const next = CHALLENGES.find((c) => c.id === challengeId);
  if (!next || next.id === activeChallenge.id) return;
  activeChallenge = next;
  orderPlaced = false;
  saveState();
  renderShop();
  showToast(`Challenge: ${activeChallenge.title}`);
}

function setDelivery(method) {
  deliveryMethod = method;
  orderPlaced = false;
  persistAndRender();
}

function setPaymentMethod(method) {
  paymentMethod = method;
  saveState();
  renderCheckout(evaluateChallenge());
}

function persistAndRender() {
  const result = evaluateChallenge();
  if (result.itemCount > 0 && result.score > bestScore) bestScore = result.score;
  if (currentUser && result.itemCount > 0 && result.score > (currentUser.bestScore || 0)) {
    currentUser.bestScore = result.score;
    persistCurrentUser();
  }
  saveState();
  if (PAGE === "shop") renderShop();
  else renderChrome();
}

/* ---------- Chrome (header/footer) ---------- */
function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const count = getItemCount();
  const checkoutVisible = count > 0;
  const profileVisible = Boolean(currentUser);
  const activeAbout = PAGE === "about" ? "is-active" : "";
  const activeContact = PAGE === "contact" ? "is-active" : "";
  const activeShop = PAGE === "shop" ? "is-active" : "";

  mount.innerHTML = `
    <header class="border-b border-mist bg-cream/95 backdrop-blur sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <a href="${shopHref("shop")}" class="group">
            <p class="font-display text-2xl sm:text-3xl text-forest tracking-tight group-hover:opacity-90">Basket Quest</p>
            <p class="text-sm text-ink/70 mt-0.5 hidden sm:block">Stay on budget with your favorites</p>
          </a>
          <nav class="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Main">
            <a href="${shopHref("shop")}" data-nav="shop" class="nav-link ${activeShop} rounded-xl px-3 py-2 text-sm font-medium text-ink/70 hover:text-forest transition">Shop</a>
            <a href="about.html" data-nav="about" class="nav-link ${activeAbout} rounded-xl px-3 py-2 text-sm font-medium text-ink/70 hover:text-forest transition">About</a>
            <a href="contact.html" data-nav="contact" class="nav-link ${activeContact} rounded-xl px-3 py-2 text-sm font-medium text-ink/70 hover:text-forest transition">Contact</a>
            <a href="${shopHref("checkout")}" id="nav-checkout" data-nav="checkout"
              class="nav-link ml-1 ${checkoutVisible ? "inline-flex" : "hidden"} items-center gap-2 rounded-xl bg-forest text-cream px-3 py-2 text-sm font-medium hover:bg-forestSoft transition">
              Checkout
              <span id="nav-cart-count" class="rounded-full bg-cream/20 px-2 py-0.5 text-xs">${count}</span>
            </a>
          </nav>
          <div class="flex items-center gap-2 sm:gap-3">
            ${PAGE === "shop" ? `
              <div class="rounded-2xl bg-white border border-mist px-3 py-2 shadow-soft hidden sm:block">
                <p class="text-[10px] uppercase tracking-wide text-ink/50">Quest Points</p>
                <p id="best-score" class="font-display text-lg leading-none text-forest">${currentUser ? (currentUser.points || 0) : 0}</p>
              </div>` : ""}
            ${profileVisible ? `
              <a href="${shopHref("profile")}" class="flex items-center gap-2 rounded-2xl border border-mist bg-white px-2.5 py-1.5 shadow-soft hover:border-forest/30 transition">
                <span class="h-8 w-8 rounded-full bg-forest text-cream text-xs font-bold flex items-center justify-center">${initials(currentUser.name)}</span>
                <span class="hidden sm:block text-left">
                  <span class="block text-sm font-medium leading-tight">${currentUser.name}</span>
                  <span class="block text-[11px] text-ink/50">${currentUser.points || 0} pts</span>
                </span>
              </a>
              <button id="btn-logout" type="button" class="rounded-xl px-2.5 py-2 text-xs font-medium text-ink/55 hover:text-coral transition">Log out</button>
            ` : `
              <a href="${shopHref("login")}" class="rounded-xl border border-forest/20 bg-white px-3 py-2 text-sm font-medium text-forest hover:bg-forest/5 transition">Log in</a>
            `}
          </div>
        </div>
      </div>
    </header>`;

  document.getElementById("btn-logout")?.addEventListener("click", logout);
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <footer class="border-t border-mist mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/45">
        <p>© Basket Quest · Everyday shopping, made clearer</p>
        <div class="flex gap-4">
          <a href="about.html" class="hover:text-forest">About</a>
          <a href="contact.html" class="hover:text-forest">Contact</a>
          <a href="${shopHref("shop")}" class="hover:text-forest">Shop</a>
        </div>
      </div>
    </footer>`;
}

function renderChrome() {
  renderHeader();
  renderFooter();
}

/* ---------- Shop UI ---------- */
function productCard(p, compact = false) {
  const inCart = cart[p.id] || 0;
  const remaining = getBudgetRemaining();
  const fits = remaining <= 0 ? false : p.price <= remaining;
  const badge = compact
    ? (getItemCount() > 0
      ? (fits
        ? `<span class="text-[10px] rounded-full bg-forest/10 text-forest px-2 py-0.5">Fits budget</span>`
        : `<span class="text-[10px] rounded-full bg-coral/15 text-coral px-2 py-0.5">Over remaining</span>`)
      : "")
    : "";

  if (compact) {
    return `
      <article class="rounded-2xl border border-mist bg-cream/50 p-3 flex flex-col" data-product-id="${p.id}">
        <div class="flex items-center gap-2">
          <span class="text-2xl" aria-hidden="true">${p.emoji}</span>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-sm truncate">${p.name}</p>
            <p class="text-xs text-forest font-semibold">${formatDKK(p.price)}</p>
            <div class="mt-1">${badge}</div>
          </div>
        </div>
        <button type="button" data-add="${p.id}" class="mt-3 rounded-lg bg-forest text-cream text-xs font-medium py-2 hover:bg-forestSoft transition">Quick add</button>
      </article>`;
  }

  return `
    <article class="card-hover rounded-3xl bg-white border border-mist p-4 shadow-soft flex flex-col" data-product-id="${p.id}">
      <div class="flex items-start justify-between gap-2">
        <div class="h-14 w-14 rounded-2xl bg-mist/70 flex items-center justify-center text-3xl" aria-hidden="true">${p.emoji}</div>
        <p class="font-semibold text-forest">${formatDKK(p.price)}</p>
      </div>
      <h3 class="mt-3 font-display text-lg leading-snug">${p.name}</h3>
      <p class="mt-1 text-sm text-ink/60 flex-1">${p.description}</p>
      <p class="mt-2 text-xs text-ink/45">${p.category}</p>
      <div class="mt-2 flex flex-wrap gap-1.5">
        ${p.tags.map((t) => `<span class="text-[11px] rounded-full bg-forest/8 text-forestSoft px-2 py-0.5">${t}</span>`).join("")}
      </div>
      <button type="button" data-add="${p.id}" class="mt-4 rounded-xl bg-forest hover:bg-forestSoft text-cream text-sm font-medium py-2.5 transition">
        ${inCart ? `Add another (${inCart})` : "Add to basket"}
      </button>
    </article>`;
}

function renderBudgetBanners(result) {
  const nodes = [
    document.getElementById("budget-banner"),
    document.getElementById("side-budget"),
    document.getElementById("checkout-budget"),
  ].filter(Boolean);

  nodes.forEach((el) => {
    if (result.itemCount === 0) {
      el.classList.add("hidden");
      el.textContent = "";
      return;
    }
    el.classList.remove("hidden");
    if (result.withinBudget) {
      el.className = el.id === "budget-banner"
        ? "mt-4 rounded-2xl px-3 py-2 text-sm font-medium bg-white/15 text-cream"
        : "mt-3 rounded-xl px-3 py-2 text-sm font-medium budget-ok";
      el.textContent = `On budget · ${formatDKK(result.remaining)} remaining of ${formatDKK(activeChallenge.budget)}`;
    } else {
      el.className = el.id === "budget-banner"
        ? "mt-4 rounded-2xl px-3 py-2 text-sm font-medium bg-coral/90 text-white"
        : "mt-3 rounded-xl px-3 py-2 text-sm font-medium budget-over";
      el.textContent = `Over budget by ${formatDKK(result.overBy)} · challenge limit ${formatDKK(activeChallenge.budget)}`;
    }
  });
}

function renderCartLines(targetId, withControls) {
  const wrap = document.getElementById(targetId);
  if (!wrap) return;
  const lines = getCartLines();
  if (!lines.length) {
    wrap.innerHTML = `<p class="text-sm text-ink/50">Your basket is empty.</p>`;
    return;
  }
  wrap.innerHTML = lines.map(({ product, qty }) => `
    <div class="rounded-2xl border border-mist p-3 flex gap-3 items-center">
      <div class="text-2xl w-10 text-center" aria-hidden="true">${product.emoji}</div>
      <div class="flex-1 min-w-0">
        <p class="font-medium truncate">${product.name}</p>
        <p class="text-xs text-ink/50">${formatDKK(product.price)} each</p>
        ${withControls ? `
          <div class="mt-2 flex items-center gap-2">
            <button type="button" data-dec="${product.id}" class="h-8 w-8 rounded-lg border border-mist hover:bg-mist/60" aria-label="Decrease">−</button>
            <input type="number" min="0" max="99" value="${qty}" data-qty="${product.id}" class="w-12 text-center rounded-lg border border-mist py-1 text-sm" />
            <button type="button" data-inc="${product.id}" class="h-8 w-8 rounded-lg border border-mist hover:bg-mist/60" aria-label="Increase">+</button>
            <button type="button" data-remove="${product.id}" class="ml-auto text-xs text-coral hover:underline">Remove</button>
          </div>` : `<p class="text-xs text-ink/55 mt-1">Qty ${qty}</p>`}
      </div>
      <p class="font-medium whitespace-nowrap">${formatDKK(product.price * qty)}</p>
    </div>`).join("");
}

function renderPaymentUI() {
  const list = document.getElementById("payment-methods");
  const panels = document.getElementById("payment-panels");
  const btn = document.getElementById("btn-place-order");
  if (!list || !panels) return;

  list.innerHTML = PAYMENT_METHODS.map((method) => `
    <label class="pay-method flex items-center gap-3 px-3 py-3 cursor-pointer ${paymentMethod === method.id ? "is-selected" : ""}" data-method="${method.id}">
      <input type="radio" name="payment" value="${method.id}" class="accent-[#1F4D3A]" ${paymentMethod === method.id ? "checked" : ""} />
      <span class="flex-1">
        <span class="block text-sm font-semibold">${method.label}</span>
        <span class="block text-xs text-ink/50">${method.note}</span>
      </span>
    </label>`).join("");

  if (paymentMethod === "mobilepay") {
    panels.innerHTML = `
      <div class="rounded-2xl border-2 border-mobilepay bg-[#F4F6FF] overflow-hidden">
        <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#DCE3FF]">
          <div class="mp-mark h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-xs">MP</div>
          <div>
            <p class="font-semibold text-[#1B2A4A]">MobilePay</p>
            <p class="text-xs text-[#5A6A8A]">Approve the payment in your app</p>
          </div>
          <p class="ml-auto font-semibold text-[#1B2A4A]">${formatDKK(getTotal())}</p>
        </div>
        <div class="px-4 py-4">
          <label class="block text-xs font-medium text-[#5A6A8A]">MobilePay phone number</label>
          <div class="mt-1 flex rounded-xl overflow-hidden border border-[#C9D3F5] bg-white">
            <span class="px-3 py-2.5 text-sm text-[#5A6A8A] bg-[#EEF2FF] border-r border-[#C9D3F5]">+45</span>
            <input id="mp-phone" type="tel" inputmode="numeric" placeholder="12 34 56 78" maxlength="11" class="flex-1 px-3 py-2.5 text-sm outline-none" />
          </div>
        </div>
      </div>`;
    const savedPhone = localStorage.getItem(STORAGE.phone);
    if (savedPhone) document.getElementById("mp-phone").value = savedPhone;
  } else if (paymentMethod === "card") {
    panels.innerHTML = `
      <div class="rounded-2xl border border-mist p-4 space-y-3 bg-cream/40">
        <div class="form-field">
          <label for="card-number" class="block text-xs font-medium mb-1">Card number</label>
          <input id="card-number" inputmode="numeric" autocomplete="cc-number" placeholder="ACCT-000015" maxlength="23" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="form-field">
            <label for="card-expiry" class="block text-xs font-medium mb-1">Expiry</label>
            <input id="card-expiry" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" maxlength="5" />
          </div>
          <div class="form-field">
            <label for="card-cvc" class="block text-xs font-medium mb-1">CVC</label>
            <input id="card-cvc" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4" />
          </div>
        </div>
      </div>`;
  } else if (paymentMethod === "applepay") {
    panels.innerHTML = `
      <div class="rounded-2xl bg-black text-white p-4 text-center">
        <p class="font-semibold">Pay with Apple Pay</p>
        <p class="text-sm text-white/70 mt-1">Confirm ${formatDKK(getTotal())} with Face ID / Touch ID on your device.</p>
      </div>`;
  } else {
    panels.innerHTML = `
      <div class="rounded-2xl border border-mist bg-white p-4 text-center">
        <p class="font-semibold text-ink">Google Pay</p>
        <p class="text-sm text-ink/60 mt-1">Confirm ${formatDKK(getTotal())} with your Google account.</p>
      </div>`;
  }

  if (btn) {
    const labels = {
      card: "Pay by card",
      mobilepay: "Pay with MobilePay",
      applepay: "Pay with Apple Pay",
      googlepay: "Pay with Google Pay",
    };
    btn.textContent = labels[paymentMethod] || "Pay now";
    btn.className = paymentMethod === "mobilepay"
      ? "mt-5 w-full rounded-xl bg-mobilepay hover:bg-mobilepayDark text-white font-semibold py-3.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
      : "mt-5 w-full rounded-xl bg-forest hover:bg-forestSoft text-white font-semibold py-3.5 transition disabled:opacity-40 disabled:cursor-not-allowed";
  }
}

function renderDelivery() {
  const el = document.getElementById("delivery-options");
  if (!el) return;
  const subtotal = getSubtotal();
  const options = [
    { ...DELIVERY.parcel, note: subtotal >= FREE_PARCEL_THRESHOLD ? "Free unlocked" : `${formatDKK(FREE_PARCEL_THRESHOLD - subtotal)} to free` },
    { ...DELIVERY.home, note: "Next-day window" },
    { ...DELIVERY.collect, note: "Ready in store" },
  ];
  el.innerHTML = options.map((opt) => {
    const checked = deliveryMethod === opt.id;
    const priceLabel = opt.id === "parcel" && subtotal >= FREE_PARCEL_THRESHOLD ? "Free" : formatDKK(opt.price);
    return `
      <label class="flex items-center gap-3 rounded-2xl border px-3 py-2.5 cursor-pointer transition ${checked ? "border-forest bg-forest/5" : "border-mist hover:border-forest/30"}">
        <input type="radio" name="delivery" value="${opt.id}" class="accent-[#1F4D3A]" ${checked ? "checked" : ""} />
        <span class="flex-1">
          <span class="block text-sm font-medium">${opt.label}</span>
          <span class="block text-xs text-ink/50">${opt.note}</span>
        </span>
        <span class="text-sm font-medium">${priceLabel}</span>
      </label>`;
  }).join("");
  document.getElementById("free-shipping-note").textContent =
    Math.max(FREE_PARCEL_THRESHOLD - subtotal, 0) > 0
      ? `Add ${formatDKK(Math.max(FREE_PARCEL_THRESHOLD - subtotal, 0))} more for free parcel-shop delivery.`
      : "Free parcel-shop delivery unlocked.";
}

function getShopRoute() {
  const hash = (location.hash || "#shop").replace("#", "");
  return ["shop", "checkout", "login", "profile"].includes(hash) ? hash : "shop";
}

function navigateShop() {
  let route = getShopRoute();
  if (route === "profile" && !currentUser) route = "login";
  if (route === "checkout" && getItemCount() === 0 && !orderPlaced) {
    // allow empty checkout page messaging
  }
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("is-active"));
  document.getElementById(`page-${route}`)?.classList.add("is-active");
  document.title = {
    shop: "Basket Quest — Shop",
    checkout: "Basket Quest — Checkout",
    login: "Basket Quest — Account",
    profile: "Basket Quest — Profile",
  }[route] || "Basket Quest";
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderShop();
}

function renderCheckout(result) {
  const loggedIn = Boolean(currentUser);
  const empty = getItemCount() === 0 && !orderPlaced;
  document.getElementById("checkout-empty")?.classList.toggle("hidden", !empty);
  document.getElementById("checkout-flow")?.classList.toggle("hidden", empty || orderPlaced);
  document.getElementById("checkout-success")?.classList.toggle("hidden", !orderPlaced);

  const s1 = document.getElementById("step-1-dot");
  const s2 = document.getElementById("step-2-dot");
  const s3 = document.getElementById("step-3-dot");
  if (s1 && s2 && s3) {
    [s1, s2, s3].forEach((el) => el.classList.remove("is-done", "is-current"));
    if (orderPlaced) { s1.classList.add("is-done"); s2.classList.add("is-done"); s3.classList.add("is-current"); }
    else if (getItemCount() > 0) { s1.classList.add("is-done"); s2.classList.add("is-current"); }
    else s1.classList.add("is-current");
  }

  if (orderPlaced && lastOrderMeta) {
    document.getElementById("success-order-id").textContent =
      `Order ${lastOrderMeta.id} · ${lastOrderMeta.deliveryLabel} · ${lastOrderMeta.paymentLabel}`;
    document.getElementById("success-score").textContent = `${lastOrderMeta.score}/100`;
    document.getElementById("success-points").textContent = lastOrderMeta.pointsEarned > 0
      ? `+${lastOrderMeta.pointsEarned} Quest Points earned`
      : "Guest order — create an account next time to earn Quest Points";
    document.getElementById("success-summary").textContent = lastOrderMeta.summary;
    return;
  }
  if (empty) return;

  renderCartLines("checkout-lines", true);
  renderDelivery();
  renderPaymentUI();
  renderBudgetBanners(result);

  // Guest vs account upsell
  const upsell = document.getElementById("checkout-account-upsell");
  if (upsell) {
    const previewPoints = result.score + (result.complete ? 25 : 0);
    if (loggedIn) {
      upsell.innerHTML = `
        <p class="text-sm text-forest font-medium">Signed in as ${currentUser.name}</p>
        <p class="text-xs text-ink/60 mt-1">This order can earn about <strong>${previewPoints} Quest Points</strong>. ${POINTS_FOR_FREE_PARCEL} pts = free parcel-shop delivery.</p>
        ${canRedeemFreeParcel() ? `
          <label class="mt-3 flex items-start gap-2 text-sm">
            <input id="redeem-points" type="checkbox" class="mt-1 accent-[#1F4D3A]" ${redeemPointsForDelivery ? "checked" : ""} />
            <span>Use ${POINTS_FOR_FREE_PARCEL} points for free parcel-shop delivery on this order</span>
          </label>` : `
          <p class="text-xs text-ink/50 mt-2">${POINTS_FOR_FREE_PARCEL - (currentUser.points || 0)} points to go until a free parcel delivery reward.</p>`}
      `;
    } else {
      upsell.innerHTML = `
        <p class="font-display text-lg text-forest">Checkout as guest — or earn points</p>
        <p class="text-sm text-ink/65 mt-1">You can finish now as a guest. <strong>Create a free account</strong> to earn about <strong>${previewPoints} Quest Points</strong> on this order and unlock rewards like free parcel-shop delivery at ${POINTS_FOR_FREE_PARCEL} pts.</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <a href="#login" class="rounded-xl bg-forest text-cream px-4 py-2 text-sm font-medium hover:bg-forestSoft transition">Create account & earn points</a>
          <span class="rounded-xl border border-mist px-4 py-2 text-sm text-ink/55">Or continue below as guest</span>
        </div>`;
    }
  }

  document.getElementById("subtotal").textContent = formatDKK(getSubtotal());
  document.getElementById("delivery-cost").textContent = formatDKK(getDeliveryCost());
  document.getElementById("total").textContent = formatDKK(getTotal());
  document.getElementById("checkout-score").textContent = `${result.score}/100`;
  const scoreHint = document.getElementById("checkout-score-hint");
  if (scoreHint) {
    scoreHint.textContent = loggedIn
      ? "Members earn these as Quest Points (plus a bonus when the basket goal is met)."
      : "Create an account before paying to turn this into Quest Points.";
  }
  document.getElementById("feedback-list").innerHTML = [...new Set(result.feedback)].map((msg) => {
    const good = /unlocked|met|nice basket|left in your budget|soft budget|ready/i.test(msg);
    const warn = /over budget|over your soft budget/i.test(msg);
    return `<p class="text-sm rounded-xl px-3 py-2 border ${
      warn ? "bg-coral/10 border-coral/30 text-[#a84a35]"
        : good ? "bg-forest/8 border-forest/20 text-forest"
        : "bg-mist/50 border-mist text-ink/75"
    }">${msg}</p>`;
  }).join("");

  const agree = document.getElementById("checkout-agree");
  const btn = document.getElementById("btn-place-order");
  if (btn) btn.disabled = !agree?.checked || getItemCount() === 0 || !paymentReady();
}

function renderProfile() {
  const guest = document.getElementById("profile-guest");
  const content = document.getElementById("profile-content");
  if (!guest || !content) return;
  if (!currentUser) {
    guest.classList.remove("hidden");
    content.classList.add("hidden");
    return;
  }
  guest.classList.add("hidden");
  content.classList.remove("hidden");
  document.getElementById("profile-avatar").textContent = initials(currentUser.name);
  document.getElementById("profile-name").textContent = currentUser.name;
  document.getElementById("profile-email").textContent = currentUser.email;
  document.getElementById("profile-points").textContent = String(currentUser.points || 0);
  document.getElementById("profile-best").textContent = String(currentUser.underBudgetOrders || 0);
  document.getElementById("profile-orders").textContent = String((currentUser.orders || []).length);
  document.getElementById("profile-cleared").textContent = String(currentUser.challengesCleared || 0);
  const perks = document.getElementById("profile-perks");
  if (perks) {
    const pts = currentUser.points || 0;
    perks.innerHTML = pts >= POINTS_FOR_FREE_PARCEL
      ? `<p class="text-sm text-forest">You can redeem <strong>${POINTS_FOR_FREE_PARCEL} points</strong> for free parcel-shop delivery at checkout.</p>`
      : `<p class="text-sm text-ink/65"><strong>${POINTS_FOR_FREE_PARCEL} Quest Points</strong> unlock free parcel-shop delivery. You have ${pts} — ${POINTS_FOR_FREE_PARCEL - pts} to go.</p>`;
  }
  const history = document.getElementById("profile-history");
  const orders = [...(currentUser.orders || [])].reverse().slice(0, 8);
  history.innerHTML = orders.length
    ? orders.map((order) => `
      <div class="rounded-2xl border border-mist p-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p class="font-medium">${order.id} · ${order.challengeTitle}</p>
          <p class="text-xs text-ink/50">${new Date(order.at).toLocaleString()} · ${order.deliveryLabel}</p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-forest">+${order.pointsEarned} pts</p>
          <p class="text-xs text-ink/50">Score ${order.score}/100 · ${formatDKK(order.total)}</p>
        </div>
      </div>`).join("")
    : `<p class="text-sm text-ink/50">No orders yet — complete a challenge and checkout to earn points.</p>`;
}

function renderShop() {
  renderChrome();
  const result = evaluateChallenge();
  const route = getShopRoute();

  if (document.getElementById("challenge-picker")) {
    document.getElementById("challenge-title").textContent = activeChallenge.title;
    document.getElementById("challenge-brief").textContent = activeChallenge.brief;
    const liveScore = result.itemCount === 0 ? 0 : result.score;
    document.getElementById("live-score").innerHTML = `${liveScore}<span class="text-lg text-cream/70">/100</span>`;
    document.getElementById("score-bar").style.width = `${liveScore}%`;
    document.getElementById("score-hint").textContent = result.itemCount === 0
      ? (activeChallenge.freeStyle ? "Add favorites to build your basket." : "Add products to start scoring.")
      : activeChallenge.freeStyle
        ? (result.withinBudget ? "On your soft budget — checkout whenever you’re ready." : "Over your soft budget — try a cheaper favorite offer below.")
        : result.complete ? "Challenge complete — continue to checkout when ready."
        : "Score updates as your basket changes.";

    document.getElementById("challenge-picker").innerHTML = CHALLENGES.map((c) => `
      <button type="button" data-challenge="${c.id}"
        class="challenge-option text-left rounded-2xl border border-white/20 px-3 py-2.5 transition hover:bg-white/10 ${c.id === activeChallenge.id ? "is-selected" : ""}">
        <span class="block text-sm font-semibold leading-snug">${c.title}</span>
        <span class="block text-xs text-cream/70 mt-0.5">${c.short}</span>
      </button>`).join("");

    const checks = activeChallenge.freeStyle
      ? [
          { ok: result.itemCount > 0, label: "Favorites in your basket" },
          { ok: result.withinBudget && result.itemCount > 0, label: `Soft budget under ${formatDKK(activeChallenge.budget)}` },
        ]
      : [
          { ok: result.withinBudget && result.itemCount > 0, label: `Budget under ${formatDKK(activeChallenge.budget)}` },
          { ok: result.enoughItems, label: `At least ${activeChallenge.minItems} products` },
          ...result.tagResults.map((t) => ({ ok: t.ok, label: `Includes ${t.tag}` })),
        ];
    if (!activeChallenge.freeStyle && activeChallenge.requireFreeParcel) {
      checks.push({ ok: result.freeParcelUnlocked, label: "Free parcel-shop delivery" });
    }
    document.getElementById("challenge-checks").innerHTML = checks.map((c) => `
      <li class="flex items-center gap-2">
        <span class="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${c.ok ? "bg-cream text-forest" : "bg-white/15 text-cream/70"}">${c.ok ? "✓" : "·"}</span>
        <span class="${c.ok ? "text-cream" : "text-cream/75"}">${c.label}</span>
      </li>`).join("");

    const cats = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
    document.getElementById("category-filters").innerHTML = cats.map((c) => `
      <button type="button" data-category="${c}" class="rounded-full px-3 py-1.5 text-sm border transition ${
        c === activeCategory ? "bg-forest text-cream border-forest" : "bg-white text-ink/70 border-mist hover:border-forest/40"
      }">${c}</button>`).join("");

    const list = PRODUCTS.filter((p) => activeCategory === "All" || p.category === activeCategory);
    document.getElementById("product-grid").innerHTML = list.map((p) => productCard(p)).join("");

    const reco = getRecommendations(3);
    document.getElementById("reco-title").textContent = reco.title;
    document.getElementById("reco-subtitle").textContent = reco.subtitle;
    document.getElementById("reco-eyebrow").textContent = reco.mode === "over" ? "Budget offers" : "Based on your basket";
    document.getElementById("reco-grid").innerHTML = reco.products.map((p) => productCard(p, true)).join("");

    document.getElementById("item-count").textContent = `${getItemCount()} item${getItemCount() === 1 ? "" : "s"}`;
    renderCartLines("cart-items", true);
    document.getElementById("side-subtotal").textContent = formatDKK(getSubtotal());
    document.getElementById("side-delivery").textContent = formatDKK(getDeliveryCost());
    document.getElementById("side-total").textContent = formatDKK(getTotal());
    document.getElementById("side-feedback").textContent = result.feedback.find((f) => /over budget|left in your budget|Add /i.test(f)) || result.feedback[0] || "";
    renderBudgetBanners(result);

    const sideBtn = document.getElementById("side-checkout-btn");
    if (sideBtn) sideBtn.classList.toggle("opacity-40", getItemCount() === 0);
  }

  if (route === "checkout") renderCheckout(result);
  if (route === "profile") renderProfile();
}

function placeOrder() {
  if (!document.getElementById("checkout-agree")?.checked || getItemCount() === 0 || !paymentReady()) {
    showToast("Complete your payment details to continue");
    return;
  }

  const result = evaluateChallenge();
  const paymentLabel = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label || "Payment";
  let pointsEarned = 0;
  let usedRedeem = false;

  if (currentUser) {
    pointsEarned = result.score + (result.complete ? 25 : 0);
    if (redeemPointsForDelivery && canRedeemFreeParcel() && deliveryMethod === "parcel") {
      currentUser.points = Math.max(0, (currentUser.points || 0) - POINTS_FOR_FREE_PARCEL);
      usedRedeem = true;
    }
    currentUser.points = (currentUser.points || 0) + pointsEarned;
    currentUser.bestScore = Math.max(currentUser.bestScore || 0, result.score);
    if (result.complete && !activeChallenge.freeStyle) {
      currentUser.challengesCleared = (currentUser.challengesCleared || 0) + 1;
    }
    if (result.withinBudget) {
      currentUser.underBudgetOrders = (currentUser.underBudgetOrders || 0) + 1;
    }
    currentUser.orders = currentUser.orders || [];
    currentUser.orders.push({
      id: `BQ-${Date.now().toString().slice(-6)}`,
      at: new Date().toISOString(),
      challengeTitle: activeChallenge.title,
      score: result.score,
      pointsEarned,
      total: getTotal(),
      deliveryLabel: DELIVERY[deliveryMethod].label + (usedRedeem ? " (points)" : ""),
      paymentLabel,
      complete: result.complete,
      withinBudget: result.withinBudget,
    });
    persistCurrentUser();
  }

  if (result.score > bestScore) bestScore = result.score;

  lastOrderMeta = {
    id: currentUser?.orders?.slice(-1)[0]?.id || `BQ-${Date.now().toString().slice(-6)}`,
    score: result.score,
    pointsEarned,
    deliveryLabel: DELIVERY[deliveryMethod].label + (usedRedeem ? " (points)" : ""),
    paymentLabel,
    summary: currentUser
      ? `You ordered ${getItemCount()} products for ${formatDKK(getTotal())}. ${
          result.withinBudget ? "You stayed on budget — nice work." : "Tip: try free-style or a challenge to practice staying on budget."
        }`
      : `Guest order of ${getItemCount()} products for ${formatDKK(getTotal())}. Create an account next time to earn Quest Points and unlock free delivery rewards.`,
  };

  orderPlaced = true;
  cart = {};
  redeemPointsForDelivery = false;
  saveState();
  document.getElementById("checkout-agree").checked = false;
  showToast(pointsEarned > 0 ? `+${pointsEarned} Quest Points` : "Order confirmed");
  renderShop();
}

/* ---------- About vendors ---------- */
function renderVendors() {
  const filters = document.getElementById("vendor-filters");
  const grid = document.getElementById("vendor-grid");
  const detail = document.getElementById("vendor-detail");
  const count = document.getElementById("vendor-count");
  if (!filters || !grid || !detail) return;

  const cats = ["All", ...new Set(VENDORS.map((v) => v.category))];
  filters.innerHTML = cats.map((c) => `
    <button type="button" data-vendor-filter="${c}" class="vendor-filter rounded-full px-3 py-1.5 text-sm border border-mist bg-white text-ink/70 ${c === vendorFilter ? "is-active" : ""}">${c}</button>
  `).join("");

  const list = VENDORS.filter((v) => vendorFilter === "All" || v.category === vendorFilter);
  if (count) count.textContent = `${list.length} vendor${list.length === 1 ? "" : "s"}`;
  if (!selectedVendorId || !list.some((v) => v.id === selectedVendorId)) {
    selectedVendorId = list[0]?.id || null;
  }

  grid.innerHTML = list.map((v) => `
    <button type="button" data-vendor="${v.id}" class="vendor-card text-left rounded-2xl border border-mist bg-white p-4 ${v.id === selectedVendorId ? "is-active" : ""}">
      <div class="flex items-center gap-3">
        <span class="text-2xl" aria-hidden="true">${v.emoji}</span>
        <div>
          <p class="font-semibold text-forest">${v.name}</p>
          <p class="text-xs text-ink/50">${v.category}</p>
        </div>
      </div>
      <p class="mt-2 text-sm text-ink/65 line-clamp-2">${v.blurb}</p>
    </button>`).join("");

  const selected = VENDORS.find((v) => v.id === selectedVendorId);
  if (!selected) {
    detail.innerHTML = `<p class="text-sm text-ink/50">Select a vendor to see their story and specialties.</p>`;
    return;
  }
  const sampleProducts = PRODUCTS.filter((p) => p.vendorId === selected.id).slice(0, 3);
  detail.innerHTML = `
    <div class="fade-in">
      <p class="text-3xl" aria-hidden="true">${selected.emoji}</p>
      <h3 class="font-display text-2xl text-forest mt-2">${selected.name}</h3>
      <p class="text-xs uppercase tracking-wide text-ink/45 mt-1">${selected.category} partner</p>
      <p class="mt-3 text-sm text-ink/70 leading-relaxed">${selected.blurb}</p>
      <p class="mt-4 text-xs font-semibold uppercase tracking-wide text-forest/70">Specialties</p>
      <div class="mt-2 flex flex-wrap gap-1.5">
        ${selected.specialties.map((s) => `<span class="text-xs rounded-full bg-forest/10 text-forest px-2.5 py-1">${s}</span>`).join("")}
      </div>
      ${sampleProducts.length ? `
        <p class="mt-4 text-xs font-semibold uppercase tracking-wide text-forest/70">In our shop</p>
        <ul class="mt-2 space-y-1.5 text-sm text-ink/70">
          ${sampleProducts.map((p) => `<li>${p.emoji} ${p.name} · ${formatDKK(p.price)}</li>`).join("")}
        </ul>
        <a href="index.html#shop" class="inline-flex mt-4 rounded-xl bg-forest text-cream px-4 py-2 text-sm font-medium hover:bg-forestSoft transition">Shop products</a>
      ` : ""}
    </div>`;
}

/* ---------- Bindings ---------- */
function bindShopEvents() {
  document.getElementById("btn-clear-basket")?.addEventListener("click", clearBasket);
  document.getElementById("btn-place-order")?.addEventListener("click", placeOrder);
  document.getElementById("checkout-agree")?.addEventListener("change", () => renderCheckout(evaluateChallenge()));
  document.body.addEventListener("change", (e) => {
    if (e.target.id === "redeem-points") {
      redeemPointsForDelivery = e.target.checked;
      renderCheckout(evaluateChallenge());
    }
  });
  document.getElementById("btn-shop-again")?.addEventListener("click", () => {
    orderPlaced = false;
    lastOrderMeta = null;
    location.hash = "shop";
  });

  document.getElementById("tab-login")?.addEventListener("click", () => {
    document.getElementById("tab-login").classList.add("is-active");
    document.getElementById("tab-signup").classList.remove("is-active");
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("signup-form").classList.add("hidden");
  });
  document.getElementById("tab-signup")?.addEventListener("click", () => {
    document.getElementById("tab-signup").classList.add("is-active");
    document.getElementById("tab-login").classList.remove("is-active");
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
  });

  document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("login-status");
    try {
      await login(document.getElementById("login-email").value, document.getElementById("login-password").value);
      status.textContent = "";
      showToast(`Welcome, ${currentUser.name}`);
      location.hash = "profile";
      renderShop();
    } catch (err) {
      status.textContent = err.message;
      status.className = "text-sm text-center text-coral";
    }
  });

  document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("signup-status");
    try {
      await signup(
        document.getElementById("signup-name").value,
        document.getElementById("signup-email").value,
        document.getElementById("signup-password").value
      );
      status.textContent = "";
      showToast(`Welcome, ${currentUser.name}`);
      location.hash = "profile";
      renderShop();
    } catch (err) {
      status.textContent = err.message;
      status.className = "text-sm text-center text-coral";
    }
  });

  document.body.addEventListener("click", (e) => {
    const challenge = e.target.closest("[data-challenge]");
    const category = e.target.closest("[data-category]");
    const add = e.target.closest("[data-add]");
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const remove = e.target.closest("[data-remove]");
    if (challenge) selectChallenge(challenge.dataset.challenge);
    if (category) {
      activeCategory = category.dataset.category;
      renderShop();
    }
    if (add) addToCart(add.dataset.add);
    if (inc) addToCart(inc.dataset.inc);
    if (dec) removeFromCart(dec.dataset.dec);
    if (remove) {
      delete cart[remove.dataset.remove];
      orderPlaced = false;
      persistAndRender();
    }
  });

  document.body.addEventListener("change", (e) => {
    const qty = e.target.closest("[data-qty]");
    if (qty) setQty(qty.dataset.qty, qty.value);
    if (e.target.name === "delivery") setDelivery(e.target.value);
    if (e.target.name === "payment") setPaymentMethod(e.target.value);
  });

  document.body.addEventListener("input", (e) => {
    if (["mp-phone", "card-number", "card-expiry", "card-cvc"].includes(e.target.id)) {
      if (e.target.id === "mp-phone") localStorage.setItem(STORAGE.phone, e.target.value);
      renderCheckout(evaluateChallenge());
    }
  });

  window.addEventListener("hashchange", navigateShop);
}

function bindAboutEvents() {
  document.body.addEventListener("click", (e) => {
    const filter = e.target.closest("[data-vendor-filter]");
    const vendor = e.target.closest("[data-vendor]");
    if (filter) {
      vendorFilter = filter.dataset.vendorFilter;
      renderVendors();
    }
    if (vendor) {
      selectedVendorId = vendor.dataset.vendor;
      renderVendors();
    }
  });
}

function bindContactEvents() {
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const topic = document.getElementById("contact-topic").value;
    const message = document.getElementById("contact-message").value.trim();
    const status = document.getElementById("contact-status");
    if (!name || !email || !message) {
      status.textContent = "Please fill in name, email, and message.";
      status.className = "text-sm text-center text-coral";
      return;
    }
    const prev = JSON.parse(localStorage.getItem(STORAGE.contact) || "[]");
    prev.push({ name, email, topic, message, at: new Date().toISOString() });
    localStorage.setItem(STORAGE.contact, JSON.stringify(prev));
    e.target.reset();
    status.textContent = "Thanks — we’ve received your message and will get back to you soon.";
    status.className = "text-sm text-center text-forest";
    showToast("Message sent");
  });
}

function boot() {
  loadState();
  renderChrome();

  if (PAGE === "shop") {
    bindShopEvents();
    if (!location.hash) location.hash = "shop";
    navigateShop();
  } else if (PAGE === "about") {
    bindAboutEvents();
    renderVendors();
  } else if (PAGE === "contact") {
    bindContactEvents();
  }
}

boot();
