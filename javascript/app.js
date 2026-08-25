/* ============================================================
   KISHAN - TECH — Application Logic
   Views: welcome -> recommend -> favorites -> admin -> helpline -> calculator -> india-map -> agri -> season-select -> crops-list -> crop-detail
   ============================================================ */

const SEASON_META = {
  summer: {
    label: "Summer",
    icon: "☀️",
    tagline: "Hot & Sunny Season",
    desc: "Warm-season crops grown during the hot Indian summer (Feb–Jun). These heat-loving fruits and vegetables thrive in bright sunshine and well-drained soils.",
    bg: "assets/images/summer-bg.png",
    month: "February – June",
  },
  winter: {
    label: "Winter",
    icon: "❄️",
    tagline: "Cool Rabi Season",
    desc: "Cool-season (rabi) crops sown in winter (Oct–Mar) and harvested in spring. Cereals, oilseeds, pulses, spices and vegetables that love the chill.",
    bg: "assets/images/winter-bg.png",
    month: "October – March",
  },
  rain: {
    label: "Rain",
    icon: "🌧️",
    tagline: "Monsoon Kharif Season",
    desc: "Kharif crops sown with the southwest monsoon (Jun–Oct) and reliant on rainfall. Rice, millets, pulses, oilseeds, fibres and plantation crops flourish.",
    bg: "assets/images/rain-bg.png",
    month: "June – October",
  },
};

/* State Coordinates on India Map Stage */
const STATE_COORDINATES = {
  "punjab": { top: "24%", left: "30%", name: "Punjab" },
  "haryana": { top: "28%", left: "33%", name: "Haryana" },
  "uttar pradesh": { top: "35%", left: "48%", name: "Uttar Pradesh" },
  "up": { top: "35%", left: "48%", name: "Uttar Pradesh" },
  "bihar": { top: "38%", left: "64%", name: "Bihar" },
  "west bengal": { top: "46%", left: "70%", name: "West Bengal" },
  "bengal": { top: "46%", left: "70%", name: "West Bengal" },
  "rajasthan": { top: "34%", left: "24%", name: "Rajasthan" },
  "gujarat": { top: "46%", left: "20%", name: "Gujarat" },
  "madhya pradesh": { top: "46%", left: "42%", name: "Madhya Pradesh" },
  "mp": { top: "46%", left: "42%", name: "Madhya Pradesh" },
  "maharashtra": { top: "58%", left: "33%", name: "Maharashtra" },
  "karnataka": { top: "74%", left: "33%", name: "Karnataka" },
  "andhra pradesh": { top: "68%", left: "45%", name: "Andhra Pradesh" },
  "andhra": { top: "68%", left: "45%", name: "Andhra Pradesh" },
  "tamil nadu": { top: "82%", left: "42%", name: "Tamil Nadu" },
  "kerala": { top: "84%", left: "35%", name: "Kerala" },
  "odisha": { top: "52%", left: "62%", name: "Odisha" },
  "assam": { top: "36%", left: "84%", name: "Assam" }
};

/* Harvest festivals of India */
const FESTIVALS = [
  { icon: "🪁", name: "Makar Sankranti / Pongal / Lohri / Magh Bihu", month: "January", season: "winter", desc: "Celebrated across India under many names, this marks the end of winter and the start of the harvest season. Pongal in Tamil Nadu thanks the Sun God for a bountiful rice harvest, Lohri in Punjab celebrates the rabi crop, and Magh Bihu in Assam honours the winter harvest with community feasts." },
  { icon: "💐", name: "Basant Panchami / Saraswati Puja", month: "January–February", season: "winter", desc: "Welcoming the arrival of spring, Basant Panchami marks the blooming of mustard fields into golden yellow. Farmers worship the fields and pray for a prosperous harvest. The colour yellow dominates the celebrations." },
  { icon: "🌾", name: "Baisakhi / Vaisakhi", month: "April", season: "rain", desc: "The most important harvest festival of Punjab, Baisakhi celebrates the rabi harvest — especially wheat. Farmers dress in colourful attire, perform the energetic Bhangra and Gidda dances, and thank the land for its abundance." },
  { icon: "🎊", name: "Rongali Bihu (Bohag Bihu)", month: "April", season: "rain", desc: "The Assamese New Year and spring harvest festival, Rongali Bihu marks the beginning of the agricultural season. Young people perform the traditional Bihu dance, and communities feast on rice-based delicacies." },
  { icon: "🌸", name: "Baisakhi / Vishu / Poila Baisakh / Puthandu", month: "April", season: "summer", desc: "The New Year harvest festival across Kerala (Vishu), Bengal (Poila Baisakh) and Tamil Nadu (Puthandu). Vishu features the 'Vishu Kani' — an arrangement of harvest produce, flowers and gold viewed first thing in the morning for prosperity." },
  { icon: "🎭", name: "Onam", month: "August–September", season: "rain", desc: "Kerala's grand harvest festival, Onam celebrates the homecoming of the legendary King Mahabali. It features the magnificent flower carpet (Pookalam), the grand feast Onasadya served on banana leaves, and the snake boat races." },
  { icon: "🎋", name: "Nabanna / Nuakhai", month: "August–September", season: "rain", desc: "Nabanna in Bengal and Nuakhai in Odisha celebrate the new rice harvest of the monsoon season. Farmers offer the first grains of the new crop to the deity before eating — a ritual of gratitude for the kharif harvest." },
  { icon: "🌾", name: "Hareli / Karam", month: "August", season: "rain", desc: "Celebrated in Chhattisgarh and parts of central India, Hareli marks the beginning of the agricultural season. Farmers worship their farm tools and cattle, and sow seeds with prayers for a good monsoon harvest." },
  { icon: "🦚", name: "Pongal (Thai Pongal)", month: "January", season: "winter", desc: "The four-day Tamil harvest festival dedicated to the Sun God and cattle. On Mattu Pongal, decorated cattle are honoured for their role in farming. The sweet Pongal dish is cooked from the newly harvested rice in clay pots." },
  { icon: "🌟", name: "Gudi Padwa / Ugadi", month: "March–April", season: "summer", desc: "The New Year festival of Maharashtra (Gudi Padwa) and Karnataka, Andhra Pradesh and Telangana (Ugadi). It marks the end of the harvest season and the start of spring. A 'Gudi' flag of victory is hoisted, and neem-based dishes are eaten." },
];

let CROPS = null;        // {summer:[], winter:[], rain:[]}
let currentSeason = null;
let currentCrop = null;
let currentView = "welcome";

/* ---------- DOM Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------- Custom Crops Persistence ---------- */
function mergeCustomCrops() {
  const custom = localStorage.getItem('customCrops');
  if (!custom) return;
  try {
    const list = JSON.parse(custom);
    list.forEach(crop => {
      if (CROPS[crop.season] && !CROPS[crop.season].some(c => c.name === crop.name)) {
        CROPS[crop.season].unshift(crop);
      }
    });
  } catch (e) {
    console.error("Error merging custom crops", e);
  }
}

/* ---------- Navigation & Browser Back Logic ---------- */
const VIEW_HISTORY = [];
const NAV_TAB_OF_VIEW = {
  "welcome-view": "welcome",
  "recommend-view": "recommend",
  "favorites-view": "favorites",
  "admin-view": "admin",
  "calculator-view": "calculator",
  "season-view": "season",
  "agri-view": "agri",
  "india-map-view": "india-map",
};

function highlightNavTab(tabKey) {
  document.querySelectorAll(".nav-link").forEach(b => {
    b.classList.toggle("active", b.dataset.nav === tabKey);
  });
}

function currentDescriptor() {
  return { view: currentView, season: currentSeason, crop: currentCrop ? currentCrop.name : null };
}

function showView(id, opts) {
  opts = opts || {};
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const v = document.getElementById(id);
  if (v) v.classList.add("active");
  currentView = id;
  if (!opts.keepScroll) {
    if (id === "welcome-view") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  updateCrumb();
  highlightNavTab(NAV_TAB_OF_VIEW[id] || "welcome");
}

function navigate(id) {
  VIEW_HISTORY.push(currentDescriptor());
  showView(id);
  history.pushState({ view: id }, "", location.pathname + location.search);
}

window.addEventListener("popstate", (e) => {
  const prev = VIEW_HISTORY.pop();
  if (!prev) {
    showView("welcome-view");
    history.pushState({ view: "welcome-view" }, "", location.pathname + location.search);
    return;
  }
  if (prev.view === "crop-detail-view" && prev.season && prev.crop) {
    currentSeason = prev.season;
    const crop = CROPS[prev.season].find(c => c.name === prev.crop);
    if (crop) { currentCrop = crop; renderCropDetail(prev.season, crop); }
    showView("crop-detail-view", { keepScroll: true });
  } else if (prev.view === "crops-view" && prev.season) {
    currentSeason = prev.season; currentCrop = null;
    renderCropsList(prev.season);
    showView("crops-view", { keepScroll: true });
  } else {
    currentSeason = prev.season; currentCrop = null;
    showView(prev.view, { keepScroll: true });
  }
});

function goWelcome() { navigate("welcome-view"); currentSeason = null; currentCrop = null; }
function goRecommend() { navigate("recommend-view"); currentSeason = null; currentCrop = null; }
function goFavorites() { renderFavorites(); navigate("favorites-view"); currentSeason = null; currentCrop = null; }
function goAdmin() {
  const pass = prompt("Enter Admin Password (Default: admin123):");
  if (pass === "admin123") {
    renderAdminCustomCrops();
    navigate("admin-view");
    currentSeason = null;
    currentCrop = null;
  } else if (pass !== null) {
    alert("❌ Incorrect Password!");
  }
}
function goCalculator() { navigate("calculator-view"); currentSeason = null; currentCrop = null; }
function goSeasons() { navigate("season-view"); currentSeason = null; currentCrop = null; }
function goIndiaMap() { 
  initInteractiveMap();
  navigate("india-map-view"); 
  currentSeason = null; 
  currentCrop = null; 
}
function goAgri() { navigate("agri-view"); currentSeason = null; currentCrop = null; }
function goCrops(season) {
  currentSeason = season;
  renderCropsList(season);
  navigate("crops-view");
}
function goCropDetail(season, name) {
  const crop = CROPS[season].find(c => c.name === name);
  if (!crop) return;
  currentSeason = season; currentCrop = crop;
  renderCropDetail(season, crop);
  navigate("crop-detail-view");
}

function updateCrumb() {
  const c = $("#crumb-current");
  if (!c) return;
  let trail = "";
  if (currentCrop) {
    trail = currentCrop.name;
  } else if (currentSeason) {
    trail = SEASON_META[currentSeason].label + " Crops";
  } else {
    const labels = {
      "recommend-view": "Smart Finder",
      "favorites-view": "Favorites",
      "admin-view": "Admin Dashboard",
      "calculator-view": "Fertilizer Calculator",
      "season-view": "Seasons",
      "india-map-view": "India Crop Map",
      "agri-view": "Agriculture & Festivals",
      "crops-view": "Crops",
      "crop-detail-view": "Crop Detail",
    };
    trail = labels[currentView] || "Home";
  }
  c.textContent = trail;
}

/* ---------- FAVORITES LOGIC ---------- */
function getFavorites() {
  const favs = localStorage.getItem('userFavorites');
  return favs ? JSON.parse(favs) : [];
}

function isFavorite(cropName) {
  return getFavorites().some(f => f.name === cropName);
}

function toggleFavorite(cropName, seasonKey, event) {
  if (event) event.stopPropagation();
  let favs = getFavorites();
  const index = favs.findIndex(f => f.name === cropName);

  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push({ name: cropName, season: seasonKey });
  }

  localStorage.setItem('userFavorites', JSON.stringify(favs));

  if (currentView === 'favorites-view') {
    renderFavorites();
  } else if (currentView === 'crops-view' && currentSeason) {
    renderCropCards(currentSeason, $("#crop-search") ? $("#crop-search").value.trim().toLowerCase() : "");
  } else if (currentView === 'recommend-view') {
    const form = $("#recommenderForm");
    if (form) form.dispatchEvent(new Event('submit'));
  }
}

function renderFavorites() {
  const grid = $("#favorites-grid");
  if (!grid) return;

  const favs = getFavorites();
  grid.innerHTML = "";

  if (favs.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 50px 20px; color:#5d716a;">
      <h3>💔 No Favorite Crops Saved Yet</h3>
      <p style="margin-top: 8px;">Explore crops and click the Heart (❤️) icon on any card to save it here!</p>
    </div>`;
    return;
  }

  favs.forEach((fav) => {
    const seasonCrops = CROPS[fav.season] || [];
    const crop = seasonCrops.find(c => c.name === fav.name);
    if (!crop) return;

    const card = el("div", "crop-card");
    card.onclick = () => goCropDetail(fav.season, crop.name);
    card.innerHTML = `
      <div class="thumb" style="position:relative;">
        <img src="${crop.img}" alt="${escapeHtml(crop.name)}" loading="lazy"
             onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23eef3f0\\'/><text x=\\'50%25\\' y=\\'50%25\\' font-family=\\'sans-serif\\' font-size=\\'22\\' fill=\\'%235a8a72\\' text-anchor=\\'middle\\' dy=\\'.35em\\'>${encodeURIComponent(crop.name)}</text></svg>'">
        <button onclick="toggleFavorite('${escapeHtml(crop.name)}', '${fav.season}', event)" 
                title="Remove from favorites"
                style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.6); color:#ff4757; border:none; border-radius:50%; width:36px; height:36px; font-size:1.2rem; cursor:pointer; display:grid; place-items:center;">
          ❤️
        </button>
      </div>
      <div class="body">
        <div class="name">${escapeHtml(crop.name)}</div>
        <div class="hindi-name">${escapeHtml(crop.hindi || "")}</div>
        <div class="sci">${escapeHtml(crop.wiki)}</div>
        <div class="tags">
          <span class="tag rain">🌧️ ${escapeHtml(crop.rain)}</span>
          <span class="tag soil">🪴 ${shortSoil(crop.soil)}</span>
        </div>
        <div class="crop-desc">${escapeHtml(crop.desc)}</div>
        <div class="more">View details →</div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ---------- ADMIN DASHBOARD SYSTEM ---------- */
function getCustomCrops() {
  const custom = localStorage.getItem('customCrops');
  return custom ? JSON.parse(custom) : [];
}

function renderAdminCustomCrops() {
  const tbody = document.getElementById('adminCustomCropsTable');
  if (!tbody) return;

  const custom = getCustomCrops();
  tbody.innerHTML = '';

  if (custom.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No custom crops added by admin yet.</td></tr>`;
    return;
  }

  custom.forEach((crop, index) => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #eef3f0';
    tr.innerHTML = `
      <td style="padding: 10px 14px; font-weight: 600; color: #173a30;">${escapeHtml(crop.name)} (${crop.hindi || ''})</td>
      <td style="padding: 10px 14px; text-transform: capitalize;">${crop.season}</td>
      <td style="padding: 10px 14px; color: #555;">${escapeHtml(crop.soil || 'Loamy')}</td>
      <td style="padding: 10px 14px; text-align: right;">
        <button onclick="deleteCustomCrop(${index})" style="padding: 6px 12px; background: #ff4757; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteCustomCrop(index) {
  if (!confirm("Are you sure you want to delete this crop?")) return;
  let custom = getCustomCrops();
  const deleted = custom.splice(index, 1)[0];

  localStorage.setItem('customCrops', JSON.stringify(custom));

  if (deleted && CROPS[deleted.season]) {
    CROPS[deleted.season] = CROPS[deleted.season].filter(c => c.name !== deleted.name);
  }

  renderAdminCustomCrops();
}

function initAdminPanel() {
  const form = document.getElementById('addCropForm');
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('adminCropName').value.trim();
    const hindi = document.getElementById('adminCropHindi').value.trim();
    const wiki = document.getElementById('adminCropWiki').value.trim() || name;
    const season = document.getElementById('adminCropSeason').value;
    const rain = document.getElementById('adminCropRain').value.trim() || '50-100 cm';
    const soil = document.getElementById('adminCropSoil').value.trim() || 'Loamy soil';
    const img = document.getElementById('adminCropImg').value.trim() || 'assets/images/summer-bg.png';
    const region = document.getElementById('adminCropRegion').value.trim() || 'Across India';
    const desc = document.getElementById('adminCropDesc').value.trim();

    const newCrop = { name, hindi, wiki, season, rain, soil, img, region, desc };

    let custom = getCustomCrops();
    custom.unshift(newCrop);
    localStorage.setItem('customCrops', JSON.stringify(custom));

    if (CROPS[season]) {
      CROPS[season].unshift(newCrop);
    }

    alert(`🎉 Successfully added "${name}" to ${season.toUpperCase()} crops!`);
    form.reset();
    renderAdminCustomCrops();
  };
}

/* ---------- INTERACTIVE INDIA MAP & CROP ASSIGNMENT ---------- */
function initInteractiveMap() {
  const cropBar = document.getElementById("map-crop-bar");
  if (!cropBar || !CROPS) return;

  cropBar.innerHTML = "";

  const allCrops = [];
  Object.keys(CROPS).forEach(season => {
    CROPS[season].forEach(crop => {
      if (!allCrops.some(c => c.name === crop.name)) {
        allCrops.push({ ...crop, seasonKey: season });
      }
    });
  });

  allCrops.forEach((crop, idx) => {
    const btn = document.createElement("button");
    btn.className = `map-crop-btn ${idx === 0 ? "active" : ""}`;
    btn.innerHTML = `
      <img src="${crop.img}" alt="${escapeHtml(crop.name)}" onerror="this.style.display='none'">
      <span>${escapeHtml(crop.name)}</span>
    `;
    btn.onclick = () => {
      document.querySelectorAll(".map-crop-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      highlightCropOnMap(crop);
    };
    cropBar.appendChild(btn);
  });

  if (allCrops.length > 0) {
    highlightCropOnMap(allCrops[0]);
  }
}

function highlightCropOnMap(crop) {
  const container = document.getElementById("state-pins-container");
  if (!container) return;

  container.innerHTML = "";
  const regionText = (crop.region || "").toLowerCase();

  let matchedStates = [];

  Object.keys(STATE_COORDINATES).forEach(stateKey => {
    if (regionText.includes(stateKey)) {
      const stateData = STATE_COORDINATES[stateKey];
      if (!matchedStates.some(s => s.name === stateData.name)) {
        matchedStates.push(stateData);
      }
    }
  });

  if (matchedStates.length === 0) {
    matchedStates = [
      STATE_COORDINATES["punjab"],
      STATE_COORDINATES["uttar pradesh"],
      STATE_COORDINATES["madhya pradesh"]
    ];
  }

  matchedStates.forEach(state => {
    const pin = document.createElement("div");
    pin.className = "state-pin";
    pin.style.top = state.top;
    pin.style.left = state.left;
    pin.innerHTML = `
      <span class="state-pin-marker">📍</span>
      <span class="state-pin-label">${state.name}</span>
    `;
    container.appendChild(pin);
  });

  if (document.getElementById("map-info-title")) {
    document.getElementById("map-info-title").innerHTML = `🌱 ${escapeHtml(crop.name)} (${escapeHtml(crop.hindi || "")})`;
  }
  if (document.getElementById("map-info-text")) {
    document.getElementById("map-info-text").textContent = crop.desc || "Information available.";
  }
  if (document.getElementById("map-info-crops")) {
    document.getElementById("map-info-crops").innerHTML = `
      <div style="margin-bottom: 6px;"><strong>📍 Major Growing States:</strong> ${escapeHtml(crop.region || "Across India")}</div>
      <div style="margin-bottom: 6px;"><strong>🌧️ Rainfall Needed:</strong> ${escapeHtml(crop.rain || "50-100 cm")}</div>
      <div><strong>🪴 Ideal Soil:</strong> ${escapeHtml(crop.soil || "Loamy Soil")}</div>
    `;
  }
}

/* ---------- Render: Festivals ---------- */
function renderFestivals() {
  const grid = $("#festival-grid");
  if (!grid) return;
  grid.innerHTML = "";
  FESTIVALS.forEach(f => {
    const card = el("div", `festival-card season-${f.season}`);
    card.innerHTML = `
      <div class="festival-icon">${f.icon}</div>
      <div class="festival-body">
        <div class="festival-name">${escapeHtml(f.name)}</div>
        <div class="festival-month">📅 ${escapeHtml(f.month)}</div>
        <div class="festival-desc">${escapeHtml(f.desc)}</div>
        <div class="festival-season ${f.season}">${SEASON_META[f.season].icon} ${SEASON_META[f.season].label} Season</div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ---------- Render: Season Select ---------- */
function renderSeasons() {
  const grid = $("#season-grid");
  if (!grid) return;
  grid.innerHTML = "";
  Object.keys(SEASON_META).forEach(key => {
    const m = SEASON_META[key];
    const card = el("div", `season-card ${key}`);
    card.onclick = () => goCrops(key);
    card.innerHTML = `
      <div class="bg" style="background-image:url('${m.bg}')"></div>
      <span class="accent-bar"></span>
      <div class="overlay">
        <div class="icon">${m.icon}</div>
        <h3>${m.label}</h3>
        <div class="meta">${m.tagline} · ${m.month}</div>
        <div class="desc">${m.desc}</div>
        <div class="go">Explore ${CROPS[key].length} crops →</div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ---------- Render: Crops List ---------- */
function renderCropsList(season) {
  const m = SEASON_META[season];
  const hero = $("#crops-hero");
  if (hero) {
    hero.querySelector(".bg").style.backgroundImage = `url('${m.bg}')`;
    hero.querySelector(".icon").textContent = m.icon;
    hero.querySelector("h2").textContent = `${m.label} Season Crops`;
    hero.querySelector("p").textContent = `${m.tagline} · ${m.month} · ${CROPS[season].length} crops`;
  }

  if ($("#crop-search")) $("#crop-search").value = "";
  renderCropCards(season, "");
  if ($("#crop-search")) {
    $("#crop-search").oninput = (e) => renderCropCards(season, e.target.value.trim().toLowerCase());
  }
}

function renderCropCards(season, query) {
  const grid = $("#crop-grid");
  if (!grid) return;
  const list = CROPS[season];
  const filtered = query
    ? list.filter(c =>
        c.name.toLowerCase().includes(query) ||
        (c.hindi || "").toLowerCase().includes(query) ||
        (c.wiki || "").toLowerCase().includes(query) ||
        (c.region || "").toLowerCase().includes(query))
    : list;

  if ($("#crop-count")) $("#crop-count").textContent = `${filtered.length} crop${filtered.length !== 1 ? "s" : ""}`;

  grid.innerHTML = "";
  if (!filtered.length) {
    grid.innerHTML = `<div class="no-results">😣 No crops match “${escapeHtml(query)}”. Try another name.</div>`;
    return;
  }

  filtered.forEach((crop, i) => {
    const favActive = isFavorite(crop.name);
    const card = el("div", "crop-card");
    card.style.animationDelay = `${Math.min(i * 0.03, 0.5)}s`;
    card.onclick = () => goCropDetail(season, crop.name);
    card.innerHTML = `
      <div class="thumb" style="position:relative;">
        <img src="${crop.img}" alt="${escapeHtml(crop.name)}" loading="lazy"
             onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23eef3f0\\'/><text x=\\'50%25\\' y=\\'50%25\\' font-family=\\'sans-serif\\' font-size=\\'22\\' fill=\\'%235a8a72\\' text-anchor=\\'middle\\' dy=\\'.35em\\'>${encodeURIComponent(crop.name)}</text></svg>'">
        <button onclick="toggleFavorite('${escapeHtml(crop.name)}', '${season}', event)" 
                title="${favActive ? 'Remove from favorites' : 'Save to favorites'}"
                style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5); color:${favActive ? '#ff4757' : '#ffffff'}; border:none; border-radius:50%; width:36px; height:36px; font-size:1.1rem; cursor:pointer; display:grid; place-items:center;">
          ${favActive ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="body">
        <div class="name">${escapeHtml(crop.name)}</div>
        <div class="hindi-name">${escapeHtml(crop.hindi || "")}</div>
        <div class="sci">${escapeHtml(crop.wiki)}</div>
        <div class="tags">
          <span class="tag rain">🌧️ ${escapeHtml(crop.rain)}</span>
          <span class="tag soil">🪴 ${shortSoil(crop.soil)}</span>
        </div>
        <div class="crop-desc">${escapeHtml(crop.desc)}</div>
        <div class="region-note">📍 ${shortRegion(crop.region)}</div>
        <div class="more">View details →</div>
      </div>`;
    grid.appendChild(card);
  });
}

function shortRegion(r) {
  const parts = r.split(",").map(s => s.trim());
  if (parts.length <= 2) return r;
  return parts.slice(0, 2).join(", ") + " +more";
}

function shortSoil(s) {
  if (!s) return "Loamy soil";
  const head = s.split(";")[0].trim();
  return head.length > 32 ? head.slice(0, 30) + "…" : head;
}

/* ---------- Render: Crop Detail ---------- */
function renderCropDetail(season, crop) {
  const m = SEASON_META[season];
  const hero = $("#detail-hero");
  if (hero) hero.querySelector(".bg").style.backgroundImage = `url('${crop.img}')`;
  if ($("#detail-back")) $("#detail-back").onclick = () => goCrops(season);
  if ($("#detail-name")) $("#detail-name").textContent = crop.name;
  if ($("#detail-hindi")) $("#detail-hindi").textContent = crop.hindi || "";
  if ($("#detail-sci")) $("#detail-sci").textContent = crop.wiki;
  if ($("#detail-season-chip")) $("#detail-season-chip").innerHTML = `${m.icon} ${m.label} Season · ${m.month}`;

  if ($("#detail-lead")) $("#detail-lead").textContent = crop.desc;
  if ($("#detail-rain")) $("#detail-rain").textContent = crop.rain;
  if ($("#detail-soil")) $("#detail-soil").textContent = crop.soil || "Well-drained loamy soil";
  if ($("#detail-region")) $("#detail-region").textContent = crop.region;
  if ($("#detail-season-full")) $("#detail-season-full").innerHTML = `${m.icon} ${m.label} Season<br><span style="font-weight:400;opacity:.8;font-size:.92rem">${m.tagline} (${m.month})</span>`;
  if ($("#detail-back-bottom")) $("#detail-back-bottom").onclick = () => goCrops(season);

  initCropReviewSystem(crop.name);
}

/* ---------- Crop Recommendation System Logic ---------- */
function initCropRecommender() {
  const form = $("#recommenderForm");
  const resultsContainer = $("#recommendationResults");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedSeason = $("#recSeason").value;
    const selectedSoil = $("#recSoil").value;

    if (!CROPS || !CROPS[selectedSeason]) return;

    const list = CROPS[selectedSeason];
    const recommended = list.filter((crop) => {
      if (selectedSoil === "all") return true;
      const soilText = (crop.soil || "").toLowerCase();
      return soilText.includes(selectedSoil.toLowerCase());
    });

    resultsContainer.innerHTML = "";

    if (recommended.length === 0) {
      resultsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:#6b7d76;">
        😣 Is soil type ke liye is season me koi exact crop match nahi hui. Try selecting "All Soil Types".
      </div>`;
      return;
    }

    recommended.forEach((crop) => {
      const favActive = isFavorite(crop.name);
      const card = el("div", "crop-card");
      card.onclick = () => goCropDetail(selectedSeason, crop.name);
      card.innerHTML = `
        <div class="thumb" style="position:relative;">
          <img src="${crop.img}" alt="${escapeHtml(crop.name)}" loading="lazy"
               onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23eef3f0\\'/><text x=\\'50%25\\' y=\\'50%25\\' font-family=\\'sans-serif\\' font-size=\\'22\\' fill=\\'%235a8a72\\' text-anchor=\\'middle\\' dy=\\'.35em\\'>${encodeURIComponent(crop.name)}</text></svg>'">
          <button onclick="toggleFavorite('${escapeHtml(crop.name)}', '${selectedSeason}', event)" 
                  title="${favActive ? 'Remove from favorites' : 'Save to favorites'}"
                  style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5); color:${favActive ? '#ff4757' : '#ffffff'}; border:none; border-radius:50%; width:36px; height:36px; font-size:1.1rem; cursor:pointer; display:grid; place-items:center;">
            ${favActive ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="body">
          <div class="name">${escapeHtml(crop.name)}</div>
          <div class="hindi-name">${escapeHtml(crop.hindi || "")}</div>
          <div class="sci">${escapeHtml(crop.wiki)}</div>
          <div class="tags">
            <span class="tag rain">🌧️ ${escapeHtml(crop.rain)}</span>
            <span class="tag soil">🪴 ${shortSoil(crop.soil)}</span>
          </div>
          <div class="crop-desc">${escapeHtml(crop.desc)}</div>
          <div class="more">View details →</div>
        </div>`;
      resultsContainer.appendChild(card);
    });
  });
}

/* ---------- Live Weather Widget Logic ---------- */
async function fetchWeather(cityName = 'Delhi') {
  const cityEl = document.getElementById('weatherCity');
  const tempEl = document.getElementById('weatherTemp');
  const descEl = document.getElementById('weatherDesc');
  const humidityEl = document.getElementById('weatherHumidity');
  const iconEl = document.getElementById('weatherIcon');

  if (!cityEl) return;

  try {
    descEl.textContent = 'Fetching weather...';

    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      descEl.textContent = 'City not found. Try another city!';
      return;
    }

    const city = geoData.results[0];
    const { latitude, longitude, name, admin1 } = city;

    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`);
    const weatherData = await weatherRes.json();

    const current = weatherData.current_weather;
    const temp = Math.round(current.temperature);
    const weatherCode = current.weathercode;

    const weatherMap = {
      0: { text: 'Clear Sky / साफ मौसम', icon: '☀️' },
      1: { text: 'Mainly Clear', icon: '🌤️' },
      2: { text: 'Partly Cloudy / हल्के बादल', icon: '⛅' },
      3: { text: 'Overcast / घने बादल', icon: '☁️' },
      45: { text: 'Foggy / कोहरा', icon: '🌫️' },
      51: { text: 'Light Drizzle / हल्की बूंदाबांदी', icon: '🌦️' },
      61: { text: 'Rainy / बारिश', icon: '🌧️' },
      71: { text: 'Snowy / बर्फबारी', icon: '❄️' },
      95: { text: 'Thunderstorm / तूफान', icon: '🌩️' }
    };

    const condition = weatherMap[weatherCode] || { text: 'Moderate Weather', icon: '🌤️' };

    cityEl.textContent = `${name}, ${admin1 || 'India'}`;
    tempEl.textContent = `${temp} °C`;
    descEl.textContent = condition.text;
    iconEl.textContent = condition.icon;
    humidityEl.textContent = `${weatherData.hourly.relativehumidity_2m[0]}%`;

  } catch (error) {
    console.error('Weather Fetch Error:', error);
    if (descEl) descEl.textContent = 'Unable to load weather details.';
  }
}

function initWeatherWidget() {
  const searchBtn = document.getElementById('searchWeatherBtn');
  const inputEl = document.getElementById('weatherInput');

  fetchWeather('Delhi');

  if (searchBtn && inputEl) {
    searchBtn.addEventListener('click', () => {
      const query = inputEl.value.trim();
      if (query) fetchWeather(query);
    });

    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = inputEl.value.trim();
        if (query) fetchWeather(query);
      }
    });
  }
}

/* ---------- Live Mandi Price Logic ---------- */
const MANDI_DATA = [
  { crop: "Wheat (गेहूं)", mandi: "Khanna, Punjab", min: "₹ 2,275", max: "₹ 2,450", modal: "₹ 2,350 / Qtl" },
  { crop: "Wheat (गेहूं)", mandi: "Indore, Madhya Pradesh", min: "₹ 2,300", max: "₹ 2,600", modal: "₹ 2,420 / Qtl" },
  { crop: "Rice / Paddy (धान)", mandi: "Karnal, Haryana", min: "₹ 3,200", max: "₹ 3,850", modal: "₹ 3,550 / Qtl" },
  { crop: "Rice / Paddy (धान)", mandi: "Burdwan, West Bengal", min: "₹ 2,100", max: "₹ 2,400", modal: "₹ 2,250 / Qtl" },
  { crop: "Mustard (सरसों)", mandi: "Bharatpur, Rajasthan", min: "₹ 5,100", max: "₹ 5,650", modal: "₹ 5,400 / Qtl" },
  { crop: "Potato (आलू)", mandi: "Agra, Uttar Pradesh", min: "₹ 1,200", max: "₹ 1,650", modal: "₹ 1,450 / Qtl" },
  { crop: "Cotton (कपास)", mandi: "Rajkot, Gujarat", min: "₹ 6,800", max: "₹ 7,500", modal: "₹ 7,150 / Qtl" },
  { crop: "Maize (मक्का)", mandi: "Davangere, Karnataka", min: "₹ 1,950", max: "₹ 2,250", modal: "₹ 2,100 / Qtl" }
];

function renderMandiPrices(filterCrop = "all") {
  const tbody = document.getElementById("mandiTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const filtered = filterCrop === "all" 
    ? MANDI_DATA 
    : MANDI_DATA.filter(item => item.crop.toLowerCase().includes(filterCrop.toLowerCase()));

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #888;">Is crop ke liye rates available nahi hain.</td></tr>`;
    return;
  }

  filtered.forEach((item) => {
    const tr = document.createElement("tr");
    tr.style.borderBottom = "1px solid #eef3f0";
    tr.innerHTML = `
      <td style="padding: 12px 16px; font-weight: 600; color: #173a30;">${item.crop}</td>
      <td style="padding: 12px 16px; color: #555;">📍 ${item.mandi}</td>
      <td style="padding: 12px 16px; color: #d9534f; font-weight: 600;">${item.min}</td>
      <td style="padding: 12px 16px; color: #2e8b57; font-weight: 600;">${item.max}</td>
      <td style="padding: 12px 16px; font-weight: 700; color: #10231f; background: #f9fbf9;">${item.modal}</td>
    `;
    tbody.appendChild(tr);
  });
}

function initMandiPrices() {
  const select = document.getElementById("mandiCropSelect");
  const refreshBtn = document.getElementById("refreshMandiBtn");

  renderMandiPrices("all");

  if (select) {
    select.addEventListener("change", (e) => {
      renderMandiPrices(e.target.value);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshBtn.textContent = "⌛ Loading...";
      setTimeout(() => {
        renderMandiPrices(select ? select.value : "all");
        refreshBtn.textContent = "🔄 Refresh Rates";
      }, 500);
    });
  }
}

/* ---------- FERTILIZER & SEED CALCULATOR LOGIC ---------- */
const CROP_REQUIREMENTS_PER_ACRE = {
  wheat:   { seed: 40, urea: 65, dap: 50, potash: 20 },
  rice:    { seed: 10, urea: 70, dap: 40, potash: 25 },
  maize:   { seed: 8,  urea: 80, dap: 50, potash: 30 },
  cotton:  { seed: 2.5, urea: 90, dap: 45, potash: 30 },
  mustard: { seed: 2.5, urea: 45, dap: 30, potash: 15 },
  potato:  { seed: 1200, urea: 100, dap: 80, potash: 60 }
};

function initFertilizerCalculator() {
  const form = document.getElementById('agriCalcForm');
  const resultsBox = document.getElementById('calcResults');

  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();

    const cropKey = document.getElementById('calcCrop').value;
    const landValue = parseFloat(document.getElementById('calcLandValue').value);
    const unit = document.getElementById('calcLandUnit').value;

    if (isNaN(landValue) || landValue <= 0) return;

    let acres = landValue;
    if (unit === 'bigha') {
      acres = landValue / 4.8;
    } else if (unit === 'hectare') {
      acres = landValue * 2.471;
    }

    const req = CROP_REQUIREMENTS_PER_ACRE[cropKey] || { seed: 10, urea: 50, dap: 30, potash: 20 };

    document.getElementById('resSeed').textContent = (req.seed * acres).toFixed(1) + ' kg';
    document.getElementById('resUrea').textContent = (req.urea * acres).toFixed(1) + ' kg';
    document.getElementById('resDap').textContent = (req.dap * acres).toFixed(1) + ' kg';
    document.getElementById('resPotash').textContent = (req.potash * acres).toFixed(1) + ' kg';

    resultsBox.style.display = 'block';
  };
}

/* ---------- Background Music ---------- */
function initMusic() {
  const audio = $("#bg-music");
  const btn = $("#music-toggle");
  if (!audio || !btn) return;
  let isPlaying = false;

  const safePlay = (onOk, onErr) => {
    let result;
    try { result = audio.play(); } catch (e) { if (onErr) onErr(e); return; }
    if (result && typeof result.then === "function") {
      result.then(onOk || (()=>{})).catch(onErr || (()=>{}));
    } else if (result !== undefined) {
      if (onOk) onOk();
    } else {
      if (onErr) onErr();
    }
  };

  const tryPlay = () => {
    safePlay(() => { isPlaying = true; btn.classList.add("playing"); },
             () => { isPlaying = false; btn.classList.remove("playing"); });
  };

  tryPlay();

  const startOnce = () => {
    if (!isPlaying) tryPlay();
    document.removeEventListener("click", startOnce);
  };
  document.addEventListener("click", startOnce);

  btn.onclick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      btn.classList.remove("playing");
    } else {
      safePlay(() => { isPlaying = true; btn.classList.add("playing"); }, () => {});
    }
  };
}

/* ---------- Utilities ---------- */
function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- Main Init ---------- */
function init() {
  if (typeof CROP_DATA === "undefined") {
    console.error("CROP_DATA not found - ensure javascript/data.js is loaded before app.js");
    if (document.querySelector(".loader p")) {
      document.querySelector(".loader p").textContent = "Could not load crop data. Please refresh.";
    }
    return;
  }
  CROPS = CROP_DATA;
  mergeCustomCrops();

  renderSeasons();
  renderFestivals();

  // Welcome CTA
  if ($("#welcome-cta")) {
    $("#welcome-cta").onclick = () => {
      const part2 = document.querySelector(".welcome-part-2");
      if (part2) part2.scrollIntoView({ behavior: "smooth" });
    };
  }
  if ($("#scroll-hint")) {
    $("#scroll-hint").onclick = () => {
      const part2 = document.querySelector(".welcome-part-2");
      if (part2) part2.scrollIntoView({ behavior: "smooth" });
    };
  }

  // Welcome Part-2 Options
  if ($("#opt-recommend")) $("#opt-recommend").onclick = () => goRecommend();
  if ($("#opt-season")) $("#opt-season").onclick = () => goSeasons();
  if ($("#opt-agri")) $("#opt-agri").onclick = () => goAgri();
  if ($("#opt-map")) $("#opt-map").onclick = () => goIndiaMap();

  // Top Nav Tabs
  document.querySelectorAll(".nav-link").forEach(b => {
    b.onclick = () => {
      const nav = b.dataset.nav;
      if (nav === "welcome") goWelcome();
      else if (nav === "recommend") goRecommend();
      else if (nav === "favorites") goFavorites();
      else if (nav === "admin") goAdmin();
      else if (nav === "calculator") goCalculator();
      else if (nav === "season") goSeasons();
      else if (nav === "agri") goAgri();
      else if (nav === "india-map") goIndiaMap();
    };
  });

  // Brand logo
  if ($("#home-btn")) $("#home-btn").onclick = () => goWelcome();

  // Bottom Nav Back Buttons
  if ($("#rec-back-welcome")) $("#rec-back-welcome").onclick = () => goWelcome();
  if ($("#rec-go-seasons")) $("#rec-go-seasons").onclick = () => goSeasons();
  if ($("#fav-back-welcome")) $("#fav-back-welcome").onclick = () => goWelcome();
  if ($("#fav-go-seasons")) $("#fav-go-seasons").onclick = () => goSeasons();
  if ($("#admin-back-welcome")) $("#admin-back-welcome").onclick = () => goWelcome();
  if ($("#calc-back-welcome")) $("#calc-back-welcome").onclick = () => goWelcome();

  // India map page
  if ($("#map-back-welcome")) $("#map-back-welcome").onclick = () => goWelcome();
  if ($("#map-go-seasons")) $("#map-go-seasons").onclick = () => goSeasons();

  // Agri page
  if ($("#agri-back-welcome")) $("#agri-back-welcome").onclick = () => goWelcome();
  if ($("#agri-go-seasons")) $("#agri-go-seasons").onclick = () => goSeasons();

  // Welcome Stats
  if ($("#stat-crops")) $("#stat-crops").textContent = Object.values(CROPS).reduce((a, b) => a + b.length, 0);
  if ($("#stat-seasons")) $("#stat-seasons").textContent = Object.keys(CROPS).length;

  initMusic();
  initCropRecommender();
  initWeatherWidget();
  initMandiPrices();
  initAdminPanel();
  initFertilizerCalculator();
  initInteractiveMap();

  history.replaceState({ view: "welcome-view" }, "", location.pathname + location.search);

  if (document.querySelector(".loader")) document.querySelector(".loader").classList.add("hide");
  showView("welcome-view");
}

document.addEventListener("DOMContentLoaded", init);

/* ---------- User Profile Header Handler ---------- */
function initUserProfile() {
  const profileBtn = document.getElementById('userProfileBtn');
  const dropdown = document.getElementById('userDropdown');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!profileBtn || !dropdown) return;

  const avatarImg = document.getElementById('userAvatar');
  const initialSpan = document.getElementById('userInitial');
  const userNameSpan = document.getElementById('userName');
  const dropdownName = document.getElementById('dropdownName');
  const dropdownEmail = document.getElementById('dropdownEmail');

  const profileData = localStorage.getItem('userProfile');
  if (profileData) {
    try {
      const user = JSON.parse(profileData);
      if (userNameSpan) userNameSpan.textContent = user.name || 'User';
      if (dropdownName) dropdownName.textContent = user.name || 'User';
      if (dropdownEmail) dropdownEmail.textContent = user.email || '';

      if (user.avatar && avatarImg) {
        avatarImg.src = user.avatar;
        avatarImg.style.display = 'block';
        if (initialSpan) initialSpan.style.display = 'none';
      } else if (initialSpan) {
        if (avatarImg) avatarImg.style.display = 'none';
        initialSpan.style.display = 'grid';
        initialSpan.textContent = (user.name || 'U').charAt(0).toUpperCase();
      }
    } catch (e) {
      console.error('Failed to parse user profile', e);
    }
  }

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userProfile');
      window.location.href = 'login page/login.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initUserProfile();
});

/* ---------- FARMER REVIEWS & COMMENTS LOGIC ---------- */
function getCropReviews(cropName) {
  const allReviews = localStorage.getItem('cropReviews');
  const reviewsObj = allReviews ? JSON.parse(allReviews) : {};
  return reviewsObj[cropName] || [];
}

function saveCropReview(cropName, author, comment) {
  const allReviews = localStorage.getItem('cropReviews');
  const reviewsObj = allReviews ? JSON.parse(allReviews) : {};

  if (!reviewsObj[cropName]) {
    reviewsObj[cropName] = [];
  }

  reviewsObj[cropName].unshift({
    author: author,
    comment: comment,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  });

  localStorage.setItem('cropReviews', JSON.stringify(reviewsObj));
}

function renderCropReviews(cropName) {
  const reviewsList = document.getElementById('cropReviewsList');
  if (!reviewsList) return;

  const reviews = getCropReviews(cropName);
  reviewsList.innerHTML = '';

  if (reviews.length === 0) {
    reviewsList.innerHTML = `<p style="color: #888; font-style: italic; font-size: 0.9rem;">No discussions yet. Be the first farmer to share a tip!</p>`;
    return;
  }

  reviews.forEach(r => {
    const item = document.createElement('div');
    item.style.padding = '12px 16px';
    item.style.background = '#f9fbf9';
    item.style.borderRadius = '10px';
    item.style.borderLeft = '4px solid #2e8b57';

    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="color: #173a30; font-size: 0.95rem;">👤 ${escapeHtml(r.author)}</strong>
        <span style="font-size: 0.8rem; color: #888;">${r.date}</span>
      </div>
      <p style="color: #444; font-size: 0.9rem; margin: 0; line-height: 1.4;">${escapeHtml(r.comment)}</p>
    `;
    reviewsList.appendChild(item);
  });
}

function initCropReviewSystem(cropName) {
  renderCropReviews(cropName);

  const form = document.getElementById('cropReviewForm');
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    const authorInput = document.getElementById('reviewAuthor');
    const commentInput = document.getElementById('reviewComment');

    const author = authorInput.value.trim();
    const comment = commentInput.value.trim();

    if (author && comment) {
      saveCropReview(cropName, author, comment);
      renderCropReviews(cropName);
      authorInput.value = '';
      commentInput.value = '';
    }
  };
}