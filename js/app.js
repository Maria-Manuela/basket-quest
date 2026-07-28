/* Basket Quest — app logic */

const PRODUCTS = [
  { id: "bq-oat-001", name: "Økologisk Havregryn", price: 39, category: "Food", description: "Creamy organic oats from Jutland farms.", emoji: "🥣", tags: ["organic", "local", "sustainable"] },
  { id: "bq-salm-002", name: "Smoked Salmon Snack Pack", price: 79, category: "Food", description: "Ready-to-serve Nordic salmon bites.", emoji: "🐟", tags: ["local", "gift-friendly"] },
  { id: "bq-rye-003", name: "Rye Crispbread Duo", price: 45, category: "Food", description: "Crunchy wholegrain crispbread pair.", emoji: "🍞", tags: ["local", "vegan"] },
  { id: "bq-berry-004", name: "Berry Compote Jar", price: 55, category: "Food", description: "Forest berries, lightly sweetened.", emoji: "🫙", tags: ["organic", "gift-friendly"] },
  { id: "bq-linen-005", name: "Linen Tea Towel Set", price: 149, category: "Home", description: "Soft stone-washed linen in moss green.", emoji: "🧺", tags: ["Danish design", "sustainable", "gift-friendly"] },
  { id: "bq-board-006", name: "Beechwood Cutting Board", price: 229, category: "Home", description: "Hand-finished board for everyday prep.", emoji: "🪵", tags: ["Danish design", "local", "gift-friendly"] },
  { id: "bq-candle-007", name: "Soy Candle — Pine Coast", price: 129, category: "Home", description: "Slow-burn candle with coastal pine notes.", emoji: "🕯️", tags: ["sustainable", "vegan", "gift-friendly"] },
  { id: "bq-mug-008", name: "Ceramic Mug — Fjord Blue", price: 119, category: "Home", description: "Wheel-thrown mug with matte glaze.", emoji: "☕", tags: ["Danish design", "gift-friendly"] },
  { id: "bq-mist-009", name: "Seaweed Face Mist", price: 169, category: "Self-care", description: "Hydrating mist with Nordic seaweed.", emoji: "💧", tags: ["organic", "vegan", "sustainable"] },
  { id: "bq-soap-010", name: "Birch Bath Soap Trio", price: 99, category: "Self-care", description: "Gentle soaps wrapped in recycled paper.", emoji: "🧼", tags: ["organic", "local", "gift-friendly"] },
  { id: "bq-socks-011", name: "Wool Slipper Socks", price: 159, category: "Self-care", description: "Cosy merino blend for cold evenings.", emoji: "🧦", tags: ["local", "gift-friendly"] },
  { id: "bq-gift-012", name: "Mini Gift Box — Hygge", price: 189, category: "Gifts", description: "Tea, honey sticks, and a linen napkin.", emoji: "🎁", tags: ["gift-friendly", "local"] },
  { id: "bq-tote-013", name: "Reusable Market Tote", price: 89, category: "Everyday", description: "Sturdy organic cotton tote for errands.", emoji: "🛍️", tags: ["sustainable", "vegan", "organic"] },
  { id: "bq-soapref-014", name: "Dish Soap Refill Pouch", price: 69, category: "Everyday", description: "Plant-based cleaner in a refill pouch.", emoji: "🧴", tags: ["sustainable", "vegan"] },
];

const CHALLENGES = [
  {
    id: "c1",
    title: "Sustainable home gift",
    short: "Gift under DKK 500",
    brief: "Build a sustainable home gift basket under DKK 500. Add at least 3 products and unlock free parcel-shop delivery.",
    budget: 500,
    minItems: 3,
    requiredTags: ["sustainable", "gift-friendly"],
    requireFreeParcel: true,
  },
  {
    id: "c2",
    title: "Organic breakfast kit",
    short: "Breakfast under DKK 250",
    brief: "Assemble an organic breakfast under DKK 250 with at least 3 products tagged organic.",
    budget: 250,
    minItems: 3,
    requiredTags: ["organic"],
    requireFreeParcel: false,
  },
  {
    id: "c3",
    title: "Self-care Sunday",
    short: "Self-care under DKK 450",
    brief: "Create a calming self-care basket under DKK 450 with at least 3 products including one vegan item.",
    budget: 450,
    minItems: 3,
    requiredTags: ["vegan"],
    requireFreeParcel: false,
  },
  {
    id: "c4",
    title: "Danish design host gift",
    short: "Design gift under DKK 600",
    brief: "Pick a Danish design host gift under DKK 600. Include Danish design + gift-friendly products and unlock free parcel-shop delivery.",
    budget: 600,
    minItems: 2,
    requiredTags: ["Danish design", "gift-friendly"],
    requireFreeParcel: true,
  },
  {
    id: "c5",
    title: "Everyday green restock",
    short: "Restock under DKK 300",
    brief: "Restock everyday essentials under DKK 300 with at least 2 sustainable products.",
    budget: 300,
    minItems: 2,
    requiredTags: ["sustainable"],
    requireFreeParcel: false,
  },
];

const DELIVERY = {
  parcel: { id: "parcel", label: "Parcel shop", price: 39 },
  home: { id: "home", label: "Home delivery", price: 59 },
  collect: { id: "collect", label: "Click & collect", price: 0 },
};

const FREE_PARCEL_THRESHOLD = 399;
const STORAGE = {
  cart: "basketQuest.cart",
  best: "basketQuest.bestScore.v2", // v2: ignore old buggy auto-+15 scores
  delivery: "basketQuest.delivery",
  challenge: "basketQuest.challengeId",
  contact: "basketQuest.contactMessages",
  phone: "basketQuest.mpPhone",
  users: "basketQuest.users",
  session: "basketQuest.sessionEmail",
};

let cart = {};
let activeChallenge = CHALLENGES[0];
let deliveryMethod = "parcel";
let bestScore = 0;
let activeCategory = "All";
let orderPlaced = false;
let lastOrderMeta = null;
let toastTimer = null;
let currentUser = null; // { email, name, points, bestScore, orders: [], passwordHash }

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

function getDeliveryCost(subtotal = getSubtotal()) {
  if (deliveryMethod === "parcel") {
    return subtotal >= FREE_PARCEL_THRESHOLD ? 0 : DELIVERY.parcel.price;
  }
  if (deliveryMethod === "home") return DELIVERY.home.price;
  return DELIVERY.collect.price;
}

function getTotal() {
  return getSubtotal() + getDeliveryCost();
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

async function hashPassword(password) {
  const data = new TextEncoder().encode(`basket-quest::${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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

function getUsersMap() {
  return loadUsers();
}

function persistCurrentUser() {
  if (!currentUser) return;
  const users = getUsersMap();
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
  const users = getUsersMap();
  currentUser = users[email] || null;
  if (!currentUser) {
    localStorage.removeItem(STORAGE.session);
    return;
  }

  // Clear profile best scores that were only the old empty-basket +15 bug
  if (
    (currentUser.bestScore === 15) &&
    (!currentUser.orders || currentUser.orders.length === 0)
  ) {
    currentUser.bestScore = 0;
    persistCurrentUser();
  }
}

async function signup(name, email, password) {
  const normalized = email.trim().toLowerCase();
  const users = getUsersMap();
  if (users[normalized]) throw new Error("An account with this email already exists.");
  const passwordHash = await hashPassword(password);
  currentUser = {
    email: normalized,
    name: name.trim(),
    passwordHash,
    points: 0,
    bestScore: 0,
    challengesCleared: 0,
    orders: [],
    createdAt: new Date().toISOString(),
  };
  persistCurrentUser();
}

async function login(email, password) {
  const normalized = email.trim().toLowerCase();
  const users = getUsersMap();
  const user = users[normalized];
  if (!user) throw new Error("No account found with that email.");
  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) throw new Error("Incorrect password.");
  currentUser = user;
  localStorage.setItem(STORAGE.session, normalized);
}

function logout() {
  currentUser = null;
  localStorage.removeItem(STORAGE.session);
  showToast("Logged out");
  location.hash = "shop";
  render(evaluateChallenge());
}

/** Suggestions based on basket tags + active challenge needs */
async function getRecommendations(limit = 3) {
  const inCart = new Set(Object.keys(cart));
  const tagWeights = {};
  getCartLines().forEach(({ product }) => {
    product.tags.forEach((tag) => {
      tagWeights[tag] = (tagWeights[tag] || 0) + 1;
    });
  });

  const ranked = PRODUCTS
    .filter((p) => !inCart.has(p.id))
    .map((p) => {
      const score = p.tags.reduce((s, t) => s + (tagWeights[t] || 0), 0)
        + (activeChallenge.requiredTags.some((t) => p.tags.includes(t) && !cartHasTag(t)) ? 3 : 0)
        + (activeChallenge.requiredTags.some((t) => p.tags.includes(t)) ? 1 : 0);
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price);

  const picks = ranked.filter((r) => r.score > 0).slice(0, limit).map((r) => r.product);
  if (picks.length < limit) {
    const fillers = PRODUCTS.filter((p) => !inCart.has(p.id) && !picks.includes(p));
    while (picks.length < limit && fillers.length) picks.push(fillers.shift());
  }
  return picks;
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

  // Empty basket always scores 0 — switching challenges must not invent points
  if (itemCount === 0) {
    return {
      score: 0,
      complete: false,
      withinBudget: false,
      enoughItems: false,
      tagsOk: false,
      tagResults,
      deliveryOk: !challenge.requireFreeParcel,
      freeParcelUnlocked: false,
      subtotal: 0,
      itemCount: 0,
      feedback: ["Add products to begin the challenge."],
    };
  }

  // Weighted score — delivery points only when the challenge asks for free parcel
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
  if (!withinBudget) feedback.push(`Over budget by ${formatDKK(subtotal - challenge.budget)}.`);
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
    deliveryOk, freeParcelUnlocked, subtotal, itemCount, feedback,
  };
}

function saveState() {
  localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  localStorage.setItem(STORAGE.best, String(bestScore));
  localStorage.setItem(STORAGE.delivery, deliveryMethod);
  localStorage.setItem(STORAGE.challenge, activeChallenge.id);
  const phone = document.getElementById("mp-phone");
  if (phone) localStorage.setItem(STORAGE.phone, phone.value);
}

function loadState() {
  // Drop the old best-score key that could be stuck at 15 from the delivery bug
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
  const challengeId = localStorage.getItem(STORAGE.challenge);
  activeChallenge = CHALLENGES.find((c) => c.id === challengeId) || CHALLENGES[0];
  loadSession();
}

function showToast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add("hidden"), 2200);
}

function isValidDkMobile(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 8;
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
  // Recalculate only — do not treat empty-basket score as a new best
  saveState();
  render(evaluateChallenge());
  showToast(`Challenge: ${activeChallenge.title}`);
}

function setDelivery(method) {
  deliveryMethod = method;
  orderPlaced = false;
  persistAndRender();
}

function persistAndRender() {
  const result = evaluateChallenge();
  // Only update best score when the basket actually has items
  if (result.itemCount > 0 && result.score > bestScore) {
    bestScore = result.score;
  }
  if (currentUser && result.itemCount > 0 && result.score > (currentUser.bestScore || 0)) {
    currentUser.bestScore = result.score;
    persistCurrentUser();
  }
  saveState();
  render(result);
}

function getRoute() {
  const hash = (location.hash || "#shop").replace("#", "");
  return ["shop", "checkout", "about", "contact", "login", "profile"].includes(hash) ? hash : "shop";
}

function navigate() {
  const route = getRoute();
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("is-active"));
  const page = document.getElementById(`page-${route}`);
  if (page) page.classList.add("is-active");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === route);
  });

  document.title = {
    shop: "Basket Quest — Shop",
    checkout: "Basket Quest — Checkout",
    about: "Basket Quest — About",
    contact: "Basket Quest — Contact",
    login: "Basket Quest — Log in",
    profile: "Basket Quest — Profile",
  }[route] || "Basket Quest";

  window.scrollTo({ top: 0, behavior: "smooth" });
  render(evaluateChallenge());
}

function productCard(p, compact = false) {
  const inCart = cart[p.id] || 0;
  if (compact) {
    return `
      <article class="rounded-2xl border border-mist bg-cream/50 p-3 flex flex-col" data-product-id="${p.id}">
        <div class="flex items-center gap-2">
          <span class="text-2xl" aria-hidden="true">${p.emoji}</span>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-sm truncate">${p.name}</p>
            <p class="text-xs text-forest font-semibold">${formatDKK(p.price)}</p>
          </div>
        </div>
        <button type="button" data-add="${p.id}" class="mt-3 rounded-lg bg-forest text-cream text-xs font-medium py-2 hover:bg-forestSoft transition">
          Quick add
        </button>
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
      <button type="button" data-add="${p.id}"
        class="mt-4 rounded-xl bg-forest hover:bg-forestSoft text-cream text-sm font-medium py-2.5 transition">
        ${inCart ? `Add another (${inCart})` : "Add to basket"}
      </button>
    </article>`;
}

function renderAuthChrome() {
  const guest = document.getElementById("auth-guest");
  const user = document.getElementById("auth-user");
  if (currentUser) {
    guest.classList.add("hidden");
    guest.classList.remove("flex");
    user.classList.remove("hidden");
    user.classList.add("flex");
    document.getElementById("nav-user-name").textContent = currentUser.name;
    document.getElementById("nav-user-points").textContent = String(currentUser.points || 0);
    document.getElementById("nav-avatar").textContent = initials(currentUser.name);
  } else {
    guest.classList.remove("hidden");
    guest.classList.add("flex");
    user.classList.add("hidden");
    user.classList.remove("flex");
  }
}

function renderChallengePicker() {
  const el = document.getElementById("challenge-picker");
  el.innerHTML = CHALLENGES.map((c) => {
    const selected = c.id === activeChallenge.id;
    return `
      <button type="button" data-challenge="${c.id}"
        class="challenge-option text-left rounded-2xl border border-white/20 px-3 py-2.5 transition hover:bg-white/10 ${selected ? "is-selected" : ""}">
        <span class="block text-sm font-semibold leading-snug">${c.title}</span>
        <span class="block text-xs text-cream/70 mt-0.5">${c.short}</span>
      </button>`;
  }).join("");
}

function renderProducts() {
  const list = PRODUCTS.filter((p) => activeCategory === "All" || p.category === activeCategory);
  document.getElementById("product-grid").innerHTML = list.map((p) => productCard(p)).join("");
}

async function renderRecommendations() {
  const picks = await getRecommendations(3);
  const grid = document.getElementById("reco-grid");
  if (!picks.length) {
    grid.innerHTML = `<p class="text-sm text-ink/50 col-span-3">Add an item to unlock suggestions.</p>`;
    return;
  }
  grid.innerHTML = picks.map((p) => productCard(p, true)).join("");
}

function renderCategoryFilters() {
  const cats = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  document.getElementById("category-filters").innerHTML = cats.map((c) => {
    const active = c === activeCategory;
    return `<button type="button" data-category="${c}"
      class="rounded-full px-3 py-1.5 text-sm border transition ${
        active ? "bg-forest text-cream border-forest" : "bg-white text-ink/70 border-mist hover:border-forest/40"
      }">${c}</button>`;
  }).join("");
}

function renderCartLines(targetId, withControls) {
  const wrap = document.getElementById(targetId);
  const lines = getCartLines();
  if (!lines.length) {
    wrap.innerHTML = `<p class="text-sm text-ink/50">Your basket is empty.</p>`;
    return;
  }
  wrap.innerHTML = lines.map(({ product, qty }) => `
    <div class="rounded-2xl border border-mist p-3 flex gap-3 items-center" data-product-id="${product.id}">
      <div class="text-2xl w-10 text-center" aria-hidden="true">${product.emoji}</div>
      <div class="flex-1 min-w-0">
        <p class="font-medium truncate">${product.name}</p>
        <p class="text-xs text-ink/50">${formatDKK(product.price)} each</p>
        ${withControls ? `
          <div class="mt-2 flex items-center gap-2">
            <button type="button" data-dec="${product.id}" class="h-8 w-8 rounded-lg border border-mist hover:bg-mist/60" aria-label="Decrease">−</button>
            <input type="number" min="0" max="99" value="${qty}" data-qty="${product.id}"
              class="w-12 text-center rounded-lg border border-mist py-1 text-sm" aria-label="Quantity for ${product.name}" />
            <button type="button" data-inc="${product.id}" class="h-8 w-8 rounded-lg border border-mist hover:bg-mist/60" aria-label="Increase">+</button>
            <button type="button" data-remove="${product.id}" class="ml-auto text-xs text-coral hover:underline">Remove</button>
          </div>` : `<p class="text-xs text-ink/55 mt-1">Qty ${qty}</p>`}
      </div>
      <p class="font-medium whitespace-nowrap">${formatDKK(product.price * qty)}</p>
    </div>
  `).join("");
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
      <label class="flex items-center gap-3 rounded-2xl border px-3 py-2.5 cursor-pointer transition ${
        checked ? "border-forest bg-forest/5" : "border-mist hover:border-forest/30"
      }">
        <input type="radio" name="delivery" value="${opt.id}" class="accent-[#1F4D3A]" ${checked ? "checked" : ""} />
        <span class="flex-1">
          <span class="block text-sm font-medium">${opt.label}</span>
          <span class="block text-xs text-ink/50">${opt.note}</span>
        </span>
        <span class="text-sm font-medium">${priceLabel}</span>
      </label>`;
  }).join("");

  const remaining = Math.max(FREE_PARCEL_THRESHOLD - subtotal, 0);
  document.getElementById("free-shipping-note").textContent =
    remaining > 0
      ? `Add ${formatDKK(remaining)} more for free parcel-shop delivery.`
      : "Free parcel-shop delivery unlocked.";
}

function renderChallenge(result) {
  document.getElementById("challenge-title").textContent = activeChallenge.title;
  document.getElementById("challenge-brief").textContent = activeChallenge.brief;

  // Always bind live score from the current evaluation (empty basket => 0)
  const liveScore = result.itemCount === 0 ? 0 : result.score;
  document.getElementById("live-score").innerHTML = `${liveScore}<span class="text-lg text-cream/70">/100</span>`;
  document.getElementById("score-bar").style.width = `${liveScore}%`;

  const displayBest = currentUser
    ? Math.max(bestScore, currentUser.bestScore || 0)
    : bestScore;
  document.getElementById("best-score").textContent = String(displayBest);
  document.getElementById("score-hint").textContent = result.itemCount === 0
    ? "Add products to start scoring."
    : result.complete
      ? "Challenge complete — continue to checkout when ready."
      : "Score updates as your basket changes.";

  const checks = [
    { ok: result.withinBudget && result.itemCount > 0, label: `Budget under ${formatDKK(activeChallenge.budget)}` },
    { ok: result.enoughItems, label: `At least ${activeChallenge.minItems} products` },
    ...result.tagResults.map((t) => ({ ok: t.ok, label: `Includes ${t.tag}` })),
  ];
  if (activeChallenge.requireFreeParcel) {
    checks.push({ ok: result.freeParcelUnlocked, label: "Free parcel-shop delivery" });
  }
  document.getElementById("challenge-checks").innerHTML = checks.map((c) => `
    <li class="flex items-center gap-2">
      <span class="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
        c.ok ? "bg-cream text-forest" : "bg-white/15 text-cream/70"
      }">${c.ok ? "✓" : "·"}</span>
      <span class="${c.ok ? "text-cream" : "text-cream/75"}">${c.label}</span>
    </li>`).join("");

  renderChallengePicker();
}

function renderFeedback(result, targetId) {
  const list = document.getElementById(targetId);
  if (!list) return;
  const unique = [...new Set(result.feedback)];
  list.innerHTML = unique.map((msg) => {
    const good = /unlocked|met|nice basket/i.test(msg);
    return `<p class="text-sm rounded-xl px-3 py-2 border ${
      good ? "bg-forest/8 border-forest/20 text-forest" : "bg-mist/50 border-mist text-ink/75"
    }">${msg}</p>`;
  }).join("");
}

function updateCheckoutSteps() {
  const hasItems = getItemCount() > 0;
  const s1 = document.getElementById("step-1-dot");
  const s2 = document.getElementById("step-2-dot");
  const s3 = document.getElementById("step-3-dot");
  [s1, s2, s3].forEach((el) => el.classList.remove("is-done", "is-current"));
  if (orderPlaced) {
    s1.classList.add("is-done");
    s2.classList.add("is-done");
    s3.classList.add("is-current");
  } else if (hasItems) {
    s1.classList.add("is-done");
    s2.classList.add("is-current");
  } else {
    s1.classList.add("is-current");
  }
}

function renderCheckout(result) {
  const loggedIn = Boolean(currentUser);
  const empty = getItemCount() === 0 && !orderPlaced;

  document.getElementById("checkout-login-gate").classList.toggle("hidden", loggedIn || orderPlaced);
  document.getElementById("checkout-empty").classList.toggle("hidden", !loggedIn || !empty);
  document.getElementById("checkout-flow").classList.toggle("hidden", !loggedIn || empty || orderPlaced);
  document.getElementById("checkout-success").classList.toggle("hidden", !orderPlaced);
  updateCheckoutSteps();

  const total = getTotal();
  document.getElementById("mp-amount").textContent = formatDKK(total);

  if (orderPlaced && lastOrderMeta) {
    document.getElementById("success-order-id").textContent =
      `Order ${lastOrderMeta.id} · ${lastOrderMeta.deliveryLabel} · Paid with MobilePay`;
    document.getElementById("success-score").textContent = `${lastOrderMeta.score}/100`;
    document.getElementById("success-points").textContent = `+${lastOrderMeta.pointsEarned} Quest Points earned`;
    document.getElementById("success-summary").textContent = lastOrderMeta.summary;
    return;
  }

  if (!loggedIn || empty) return;

  renderCartLines("checkout-lines", true);
  renderDelivery();
  document.getElementById("subtotal").textContent = formatDKK(getSubtotal());
  document.getElementById("delivery-cost").textContent = formatDKK(getDeliveryCost());
  document.getElementById("total").textContent = formatDKK(total);
  document.getElementById("checkout-score").textContent = `${result.score}/100`;
  renderFeedback(result, "feedback-list");

  const agree = document.getElementById("checkout-agree");
  const phone = document.getElementById("mp-phone").value;
  const btn = document.getElementById("btn-place-order");
  btn.disabled = !agree.checked || getItemCount() === 0 || !isValidDkMobile(phone);
}

function renderShopSide(result) {
  document.getElementById("item-count").textContent = `${getItemCount()} item${getItemCount() === 1 ? "" : "s"}`;
  document.getElementById("nav-cart-count").textContent = String(getItemCount());
  renderCartLines("cart-items", true);
  document.getElementById("side-subtotal").textContent = formatDKK(getSubtotal());
  document.getElementById("side-delivery").textContent = formatDKK(getDeliveryCost());
  document.getElementById("side-total").textContent = formatDKK(getTotal());
  document.getElementById("side-feedback").textContent = result.feedback[0] || "";
}

function renderProfile() {
  const guest = document.getElementById("profile-guest");
  const content = document.getElementById("profile-content");
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
  document.getElementById("profile-best").textContent = String(currentUser.bestScore || 0);
  document.getElementById("profile-orders").textContent = String((currentUser.orders || []).length);
  document.getElementById("profile-cleared").textContent = String(currentUser.challengesCleared || 0);

  const history = document.getElementById("profile-history");
  const orders = [...(currentUser.orders || [])].reverse().slice(0, 8);
  if (!orders.length) {
    history.innerHTML = `<p class="text-sm text-ink/50">No orders yet — complete a challenge and checkout to earn points.</p>`;
    return;
  }
  history.innerHTML = orders.map((order) => `
    <div class="rounded-2xl border border-mist p-3 flex flex-wrap items-center justify-between gap-2">
      <div>
        <p class="font-medium">${order.id} · ${order.challengeTitle}</p>
        <p class="text-xs text-ink/50">${new Date(order.at).toLocaleString()} · ${order.deliveryLabel}</p>
      </div>
      <div class="text-right">
        <p class="font-semibold text-forest">+${order.pointsEarned} pts</p>
        <p class="text-xs text-ink/50">Score ${order.score}/100 · ${formatDKK(order.total)}</p>
      </div>
    </div>
  `).join("");
}

function render(result = evaluateChallenge()) {
  renderAuthChrome();
  renderCategoryFilters();
  renderProducts();
  renderRecommendations();
  renderChallenge(result);
  renderShopSide(result);

  const route = getRoute();
  if (route === "checkout") renderCheckout(result);
  if (route === "profile") renderProfile();
}

function placeOrder() {
  if (!currentUser) {
    location.hash = "login";
    showToast("Log in to complete checkout");
    return;
  }
  const agree = document.getElementById("checkout-agree");
  const phone = document.getElementById("mp-phone").value;
  if (!agree.checked || getItemCount() === 0 || !isValidDkMobile(phone)) {
    showToast("Enter an 8-digit Danish mobile number");
    return;
  }

  const result = evaluateChallenge();
  const pointsEarned = result.score + (result.complete ? 25 : 0);
  const tagText = activeChallenge.requiredTags.join(" + ");

  lastOrderMeta = {
    id: `BQ-${Date.now().toString().slice(-6)}`,
    score: result.score,
    pointsEarned,
    deliveryLabel: DELIVERY[deliveryMethod].label,
    summary:
      `You ordered ${getItemCount()} products for ${formatDKK(getTotal())}. ` +
      (result.complete
        ? `Challenge “${activeChallenge.title}” completed (${tagText}).`
        : `Challenge score ${result.score}/100 — try another challenge to improve.`),
  };

  currentUser.points = (currentUser.points || 0) + pointsEarned;
  currentUser.bestScore = Math.max(currentUser.bestScore || 0, result.score);
  if (result.complete) currentUser.challengesCleared = (currentUser.challengesCleared || 0) + 1;
  currentUser.orders = currentUser.orders || [];
  currentUser.orders.push({
    id: lastOrderMeta.id,
    at: new Date().toISOString(),
    challengeTitle: activeChallenge.title,
    score: result.score,
    pointsEarned,
    total: getTotal(),
    deliveryLabel: DELIVERY[deliveryMethod].label,
    complete: result.complete,
  });
  persistCurrentUser();

  if (result.score > bestScore) bestScore = result.score;

  orderPlaced = true;
  cart = {};
  saveState();
  document.getElementById("checkout-agree").checked = false;
  showToast(`+${pointsEarned} Quest Points`);
  render(evaluateChallenge());
}

function setAuthTab(mode) {
  const loginTab = document.getElementById("tab-login");
  const signupTab = document.getElementById("tab-signup");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const isLogin = mode === "login";
  loginTab.classList.toggle("is-active", isLogin);
  signupTab.classList.toggle("is-active", !isLogin);
  loginForm.classList.toggle("hidden", !isLogin);
  signupForm.classList.toggle("hidden", isLogin);
}

function bindEvents() {
  document.getElementById("btn-clear-basket").addEventListener("click", clearBasket);
  document.getElementById("btn-place-order").addEventListener("click", placeOrder);
  document.getElementById("btn-logout").addEventListener("click", logout);
  document.getElementById("checkout-agree").addEventListener("change", () => renderCheckout(evaluateChallenge()));
  document.getElementById("mp-phone").addEventListener("input", () => {
    localStorage.setItem(STORAGE.phone, document.getElementById("mp-phone").value);
    renderCheckout(evaluateChallenge());
  });

  document.getElementById("btn-shop-again").addEventListener("click", () => {
    orderPlaced = false;
    lastOrderMeta = null;
    location.hash = "shop";
  });

  document.getElementById("tab-login").addEventListener("click", () => setAuthTab("login"));
  document.getElementById("tab-signup").addEventListener("click", () => setAuthTab("signup"));

  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("login-status");
    try {
      await login(
        document.getElementById("login-email").value,
        document.getElementById("login-password").value
      );
      status.textContent = "";
      showToast(`Welcome back, ${currentUser.name}`);
      location.hash = "profile";
      render(evaluateChallenge());
    } catch (err) {
      status.textContent = err.message;
      status.className = "text-sm text-center text-coral";
    }
  });

  document.getElementById("signup-form").addEventListener("submit", async (e) => {
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
      render(evaluateChallenge());
    } catch (err) {
      status.textContent = err.message;
      status.className = "text-sm text-center text-coral";
    }
  });

  document.getElementById("challenge-picker").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-challenge]");
    if (!btn) return;
    selectChallenge(btn.dataset.challenge);
  });

  document.getElementById("category-filters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    render();
  });

  document.body.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const remove = e.target.closest("[data-remove]");
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
    const input = e.target.closest("[data-qty]");
    if (input) setQty(input.dataset.qty, input.value);
    if (e.target.name === "delivery") setDelivery(e.target.value);
  });

  document.getElementById("contact-form").addEventListener("submit", (e) => {
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

    const payload = { name, email, topic, message, at: new Date().toISOString() };
    const prev = JSON.parse(localStorage.getItem(STORAGE.contact) || "[]");
    prev.push(payload);
    localStorage.setItem(STORAGE.contact, JSON.stringify(prev));

    e.target.reset();
    status.textContent = "Thanks — we’ve received your message and will get back to you soon.";
    status.className = "text-sm text-center text-forest";
    showToast("Message sent");
  });

  window.addEventListener("hashchange", navigate);
}

function boot() {
  loadState();
  bindEvents();
  const savedPhone = localStorage.getItem(STORAGE.phone);
  if (savedPhone) document.getElementById("mp-phone").value = savedPhone;
  if (!location.hash) location.hash = "shop";
  navigate();
}

boot();
