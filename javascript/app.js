/* ============================================================
   KISHAN - TECH — Application Logic
   Views: welcome -> kisan-help -> recommend -> favorites -> admin -> calculator -> india-map -> agri -> season-select -> crops-list -> crop-detail
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

/* Multi-State Kisan Helplines & District KVK Database */
const STATE_AGRICULTURE_DATA = {
  bihar: {
    name: "Bihar (बिहार)",
    deptHelpline: "1800-345-6455",
    desc: "कृषि विभाग, बिहार सरकार (डीजल अनुदान, बीज वितरण व सरकारी सलाह हेतु)",
    districts: {
      patna: { name: "Patna (पटना)", office: "KVK Barh & DAO Patna", phone: "06132-243250 / 9431821001", email: "kvkpatna@icar.gov.in" },
      gaya: { name: "Gaya (गया)", office: "KVK Manpur, Gaya", phone: "0631-2228390 / 9431479500", email: "kvkgaya@gmail.com" },
      muzaffarpur: { name: "Muzaffarpur (मुजफ्फरपुर)", office: "KVK Saraiya, Muzaffarpur", phone: "0621-2814321 / 9431821004", email: "kvkmuzaffarpur@rediffmail.com" },
      bhagalpur: { name: "Bhagalpur (भागलपुर)", office: "BAU Sabour & KVK Sabour", phone: "0641-2451035 / 9431821010", email: "kvksabour@gmail.com" },
      rohtas: { name: "Rohtas (रोहतास)", office: "KVK Bikramganj, Rohtas", phone: "06185-222120 / 9431479522", email: "rohtaskvk@gmail.com" },
      samastipur: { name: "Samastipur (समस्तीपुर)", office: "RPCAU Pusa & KVK Birauli", phone: "06274-240226 / 9431821015", email: "kvksamastipur@rpcau.ac.in" },
      darbhanga: { name: "Darbhanga (दरभंगा)", office: "KVK Jale, Darbhanga", phone: "06272-284333 / 9431821008", email: "kvkdarbhanga@gmail.com" },
      purnia: { name: "Purnia (पूर्णिया)", office: "KVK Jalalgarh, Purnia", phone: "06543-228120 / 9431821018", email: "kvkpurnea@yahoo.co.in" },
      nalanda: { name: "Nalanda (नालंदा)", office: "KVK Harnaut, Nalanda", phone: "06112-258010 / 9431479511", email: "kvknalanda@gmail.com" },
      vaishali: { name: "Vaishali (वैशाली)", office: "KVK Hariharpur, Vaishali", phone: "06224-273100 / 9431821020", email: "kvkvaishali@gmail.com" },
      bhojpur: { name: "Bhojpur (भोजपुर)", office: "KVK Ara, Bhojpur", phone: "06182-248101 / 9431479505", email: "kvkbhojpur@gmail.com" },
      saran: { name: "Saran / Chhapra (सारण)", office: "KVK Manjhi, Saran", phone: "06152-232145 / 9431821006", email: "kvksaran@gmail.com" }
    }
  },
  up: {
    name: "Uttar Pradesh (उत्तर प्रदेश)",
    deptHelpline: "1800-180-1551 / 0522-2204555",
    desc: "कृषि विभाग, उत्तर प्रदेश सरकार (पारदर्शी किसान सेवा पोर्टल एवं अनुदान)",
    districts: {
      lucknow: { name: "Lucknow (लखनऊ)", office: "KVK ICAR-IISR Lucknow", phone: "0522-2480726", email: "kvklucknow@gmail.com" },
      kanpur: { name: "Kanpur (कानपुर)", office: "CSAUAT & KVK Kanpur", phone: "0512-2534156", email: "kvkkanpur@csauk.ac.in" },
      varanasi: { name: "Varanasi (वाराणसी)", office: "ICAR-IIVR KVK Varanasi", phone: "0542-2635231", email: "kvkvaranasi@iivr.org.in" },
      prayagraj: { name: "Prayagraj (प्रयागराज)", office: "SHUATS KVK Prayagraj", phone: "0532-2684281", email: "kvkallahabad@rediffmail.com" },
      meerut: { name: "Meerut (मेरठ)", office: "SVPUAT KVK Hastinapur", phone: "0121-2888514", email: "kvkmeerut@gmail.com" },
      gorakhpur: { name: "Gorakhpur (गोरखपुर)", office: "KVK Belipar Gorakhpur", phone: "0551-2402241", email: "kvkgorakhpur@gmail.com" },
      agra: { name: "Agra (आगरा)", office: "KVK Bichpuri, Agra", phone: "0562-2760205", email: "kvkagra@gmail.com" }
    }
  },
  punjab: {
    name: "Punjab (पंजाब)",
    deptHelpline: "1800-180-1551 / 0161-2401960",
    desc: "Department of Agriculture & Farmers Welfare, Punjab (PAU Ludhiana)",
    districts: {
      ludhiana: { name: "Ludhiana (ਲੁਧਿਆਣਾ)", office: "PAU Directorate of Extension & KVK", phone: "0161-2401960", email: "kvkludhiana@pau.edu" },
      amritsar: { name: "Amritsar (ਅੰਮ੍ਰਿਤਸਰ)", office: "KVK Nag Kalan, Amritsar", phone: "0183-2783850", email: "kvkamritsar@pau.edu" },
      jalandhar: { name: "Jalandhar (ਜਲੰਧਰ)", office: "KVK Nurmahal, Jalandhar", phone: "01826-244243", email: "kvkjalandhar@pau.edu" },
      patiala: { name: "Patiala (ਪਟਿਆਲਾ)", office: "KVK Rauni, Patiala", phone: "0175-2212055", email: "kvkpatiala@pau.edu" },
      bathinda: { name: "Bathinda (ਬਠਿੰਡਾ)", office: "KVK Dabwali Road, Bathinda", phone: "0164-2212159", email: "kvkbathinda@pau.edu" }
    }
  },
  haryana: {
    name: "Haryana (हरियाणा)",
    deptHelpline: "1800-180-2117 / 0172-2571553",
    desc: "कृषि तथा किसान कल्याण विभाग, हरियाणा (CCSHAU Hisar एवं मेरी फसल मेरा ब्योरा)",
    districts: {
      hisar: { name: "Hisar (हिसार)", office: "CCSHAU Extension Directorate & KVK", phone: "01662-284301", email: "kvkhisar@hau.ac.in" },
      karnal: { name: "Karnal (करनाल)", office: "NDRI & KVK Uchani, Karnal", phone: "0184-2267590", email: "kvkkarnal@gmail.com" },
      rohtak: { name: "Rohtak (रोहतक)", office: "KVK Rohtak", phone: "01262-274205", email: "kvkrohtak@gmail.com" },
      ambala: { name: "Ambala (अम्बाला)", office: "KVK Tepla, Ambala", phone: "0171-2830230", email: "kvkambala@gmail.com" },
      sirsa: { name: "Sirsa (सिरसा)", office: "KVK Sirsa", phone: "01666-220025", email: "kvksirsa@gmail.com" }
    }
  },
  mp: {
    name: "Madhya Pradesh (मध्य प्रदेश)",
    deptHelpline: "0755-2558823 / 1800-180-1551",
    desc: "किसान कल्याण एवं कृषि विकास विभाग, मध्य प्रदेश शासन",
    districts: {
      bhopal: { name: "Bhopal (भोपाल)", office: "CIAE & KVK Nabi Bagh, Bhopal", phone: "0755-2737191", email: "kvkbhopal@icar.gov.in" },
      indore: { name: "Indore (इंदौर)", office: "KVK Kasturbagram, Indore", phone: "0731-2856230", email: "kvkindore@gmail.com" },
      jabalpur: { name: "Jabalpur (जबलपुर)", office: "JNKVV KVK Jabalpur", phone: "0761-2681021", email: "kvkjabalpur@jnkvv.org" },
      gwalior: { name: "Gwalior (ग्वालियर)", office: "RVSKVV KVK Gwalior", phone: "0751-2467650", email: "kvkgwalior@rediffmail.com" },
      ujjain: { name: "Ujjain (उज्जैन)", office: "KVK Ujjain", phone: "0734-2512140", email: "kvkujjain@gmail.com" }
    }
  },
  rajasthan: {
    name: "Rajasthan (राजस्थान)",
    deptHelpline: "1800-180-1551 / 0141-2227365",
    desc: "कृषि विभाग, राजस्थान सरकार (राज किसान साथी पोर्टल)",
    districts: {
      jaipur: { name: "Jaipur (जयपुर)", office: "KVK Chomu, Jaipur", phone: "01423-221235", email: "kvkjaipur@gmail.com" },
      jodhpur: { name: "Jodhpur (जोधपुर)", office: "CAZRI & KVK Jodhpur", phone: "0291-2786534", email: "kvkjodhpur@cazri.res.in" },
      kota: { name: "Kota (कोटा)", office: "Agriculture University & KVK Kota", phone: "0744-2321205", email: "kvkkota@aukota.org" },
      udaipur: { name: "Udaipur (उदयपुर)", office: "MPUAT KVK Badgaon, Udaipur", phone: "0294-2441223", email: "kvkudaipur@mpuat.ac.in" },
      bikaner: { name: "Bikaner (बीकानेर)", office: "SKRAU & KVK Bikaner", phone: "0151-2250025", email: "kvkbikaner@raubikaner.org" }
    }
  },
  maharashtra: {
    name: "Maharashtra (महाराष्ट्र)",
    deptHelpline: "1800-233-4000 / 020-25537550",
    desc: "कृषी विभाग, महाराष्ट्र शासन (महाडीबीटी शेतकरी योजना)",
    districts: {
      pune: { name: "Pune (पुणे)", office: "KVK Baramati, Pune", phone: "02112-255207", email: "kvkbaramati@yahoo.com" },
      nashik: { name: "Nashik (नाशिक)", office: "YCMOU KVK Yashwantrao Chavan Nashik", phone: "0253-2230717", email: "kvknashik@rediffmail.com" },
      nagpur: { name: "Nagpur (नागपूर)", office: "CICR & KVK Nagpur", phone: "07103-275536", email: "kvknagpur@gmail.com" },
      aurangabad: { name: "Chhatrapati Sambhajinagar (औरंगाबाद)", office: "VNMKV KVK Aurangabad", phone: "0240-2376558", email: "kvkaurangabad@rediffmail.com" },
      solapur: { name: "Solapur (सोलापूर)", office: "KVK Kegaon, Solapur", phone: "0217-2500420", email: "kvksolapur@rediffmail.com" }
    }
  },
  wb: {
    name: "West Bengal (পশ্চিমবঙ্গ)",
    deptHelpline: "1800-103-6000 / 033-22145555",
    desc: "Department of Agriculture, Govt. of West Bengal (Krishak Bandhu Scheme)",
    districts: {
      burdwan: { name: "Burdwan (বর্ধমান)", office: "BCKV KVK Burdwan", phone: "0342-2656244", email: "kvkburdwan@gmail.com" },
      north24pgs: { name: "North 24 Parganas (উত্তর ২৪ পরগনা)", office: "WBUAFS KVK Ashokenagar", phone: "03216-231120", email: "kvknorth24pgs@gmail.com" },
      south24pgs: { name: "South 24 Parganas (দক্ষিণ ২৪ পরগনা)", office: "KVK Nimpith, South 24 Pgs", phone: "03218-226002", email: "nimpithkvk1979@gmail.com" },
      murshidabad: { name: "Murshidabad (মুর্শিদাবাদ)", office: "KVK Murshidabad", phone: "03482-251120", email: "kvkmurshidabad@gmail.com" },
      hooghly: { name: "Hooghly (হুগলি)", office: "BCKV KVK Chinsurah, Hooghly", phone: "033-26861240", email: "kvkhooghly@gmail.com" }
    }
  }
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

let CROPS = null;
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
  "kisan-help-view": "kisan-help",
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
function goKisanHelp() { navigate("kisan-help-view"); currentSeason = null; currentCrop = null; }
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
      "kisan-help-view": "Kisan Help & Schemes",
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

/* ---------- DYNAMIC MULTI-STATE KISAN HELP DROPDOWN LOGIC ---------- */
function initKisanHelpSection() {
  const stateSelect = document.getElementById("stateSelect");
  const districtSelect = document.getElementById("districtKvkSelect");
  const resultBox = document.getElementById("districtResultBox");

  const stateCardBadge = document.getElementById("stateCardBadge");
  const stateCardTitle = document.getElementById("stateCardTitle");
  const stateCardDesc = document.getElementById("stateCardDesc");
  const stateCardNumber = document.getElementById("stateCardNumber");
  const stateCardTelLink = document.getElementById("stateCardTelLink");

  if (!stateSelect || !districtSelect || !resultBox) return;

  function populateDistricts(stateKey) {
    districtSelect.innerHTML = '<option value="">-- जिला चुनें (Select District) --</option>';

    if (!stateKey || !STATE_AGRICULTURE_DATA[stateKey]) {
      resultBox.innerHTML = "राज्य व जिले का चयन करने पर संपर्क विवरण यहाँ प्रदर्शित होगा।";
      return;
    }

    const stateData = STATE_AGRICULTURE_DATA[stateKey];

    if (stateCardTitle) stateCardTitle.textContent = `${stateData.name} Agriculture Helpline`;
    if (stateCardBadge) stateCardBadge.textContent = `🏛️ ${stateData.name} State`;
    if (stateCardDesc) stateCardDesc.textContent = stateData.desc;
    if (stateCardNumber) stateCardNumber.textContent = stateData.deptHelpline;
    if (stateCardTelLink) stateCardTelLink.href = `tel:${stateData.deptHelpline.split('/')[0].trim()}`;

    const districts = stateData.districts;
    Object.keys(districts).forEach((distKey) => {
      const opt = document.createElement("option");
      opt.value = distKey;
      opt.textContent = districts[distKey].name;
      districtSelect.appendChild(opt);
    });

    resultBox.innerHTML = `कृपया <strong>${escapeHtml(stateData.name)}</strong> का जिला चुनें।`;
  }

  stateSelect.addEventListener("change", (e) => {
    populateDistricts(e.target.value);
  });

  districtSelect.addEventListener("change", (e) => {
    const stateKey = stateSelect.value;
    const distKey = e.target.value;

    if (!stateKey || !distKey || !STATE_AGRICULTURE_DATA[stateKey]?.districts[distKey]) {
      resultBox.innerHTML = "चयनित जिले का संपर्क विवरण यहाँ प्रदर्शित होगा।";
      return;
    }

    const d = STATE_AGRICULTURE_DATA[stateKey].districts[distKey];
    resultBox.innerHTML = `
      <div style="font-weight: 700; color: #173a30; font-size: 0.95rem; margin-bottom: 4px;">🏢 ${escapeHtml(d.office)}</div>
      <div style="margin-bottom: 3px;"><strong>📞 Phone / Helpline:</strong> <a href="tel:${d.phone.split('/')[0].trim()}" style="color: #2e8b57; font-weight: 700; text-decoration: underline;">${escapeHtml(d.phone)}</a></div>
      <div><strong>✉️ Email:</strong> <a href="mailto:${escapeHtml(d.email)}" style="color: #1d6fa5;">${escapeHtml(d.email)}</a></div>
    `;
  });

  populateDistricts("bihar");
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

/* ---------- ADMIN DASHBOARD SYSTEM (WITH EDIT SUPPORT) ---------- */
let editingCropIndex = null;

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
      <td style="padding: 10px 14px; font-weight: 600; color: #173a30;">${escapeHtml(crop.name)} (${escapeHtml(crop.hindi || '')})</td>
      <td style="padding: 10px 14px; text-transform: capitalize;">${crop.season}</td>
      <td style="padding: 10px 14px; color: #555;">${escapeHtml(crop.soil || 'Loamy')}</td>
      <td style="padding: 10px 14px; text-align: right; white-space: nowrap;">
        <button onclick="startEditCrop(${index})" style="padding: 6px 12px; background: #2e8b57; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; margin-right: 6px;">✏️ Edit</button>
        <button onclick="deleteCustomCrop(${index})" style="padding: 6px 12px; background: #ff4757; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function startEditCrop(index) {
  const custom = getCustomCrops();
  const crop = custom[index];
  if (!crop) return;

  editingCropIndex = index;

  document.getElementById('adminCropName').value = crop.name || '';
  document.getElementById('adminCropHindi').value = crop.hindi || '';
  document.getElementById('adminCropWiki').value = crop.wiki || '';
  document.getElementById('adminCropSeason').value = crop.season || 'summer';
  document.getElementById('adminCropRain').value = crop.rain || '';
  document.getElementById('adminCropSoil').value = crop.soil || 'Alluvial soil';
  document.getElementById('adminCropImg').value = crop.img || '';
  document.getElementById('adminCropRegion').value = crop.region || '';
  document.getElementById('adminCropDesc').value = crop.desc || '';

  const heading = document.getElementById('adminFormHeading');
  const submitBtn = document.getElementById('adminSubmitBtn');
  const cancelBtn = document.getElementById('adminCancelEditBtn');

  if (heading) heading.textContent = `✏️ Edit Crop: ${crop.name}`;
  if (submitBtn) submitBtn.textContent = '💾 Update Crop Details';
  if (cancelBtn) cancelBtn.style.display = 'inline-block';

  document.getElementById('addCropForm').scrollIntoView({ behavior: 'smooth' });
}

function resetAdminForm() {
  editingCropIndex = null;
  const form = document.getElementById('addCropForm');
  if (form) form.reset();

  const heading = document.getElementById('adminFormHeading');
  const submitBtn = document.getElementById('adminSubmitBtn');
  const cancelBtn = document.getElementById('adminCancelEditBtn');

  if (heading) heading.textContent = '➕ Add New Crop (नयी फसल जोड़ें)';
  if (submitBtn) submitBtn.textContent = '🚀 Add Crop to System';
  if (cancelBtn) cancelBtn.style.display = 'none';
}

function deleteCustomCrop(index) {
  if (!confirm("Are you sure you want to delete this crop?")) return;
  let custom = getCustomCrops();
  const deleted = custom.splice(index, 1)[0];

  localStorage.setItem('customCrops', JSON.stringify(custom));

  if (deleted && CROPS[deleted.season]) {
    CROPS[deleted.season] = CROPS[deleted.season].filter(c => c.name !== deleted.name);
  }

  if (editingCropIndex === index) {
    resetAdminForm();
  }

  renderAdminCustomCrops();
}

function initAdminPanel() {
  const form = document.getElementById('addCropForm');
  const cancelBtn = document.getElementById('adminCancelEditBtn');
  if (!form) return;

  if (cancelBtn) {
    cancelBtn.onclick = () => resetAdminForm();
  }

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

    const newOrUpdatedCrop = { name, hindi, wiki, season, rain, soil, img, region, desc };
    let custom = getCustomCrops();

    if (editingCropIndex !== null) {
      const oldCrop = custom[editingCropIndex];

      // Remove old version from runtime memory
      if (oldCrop && CROPS[oldCrop.season]) {
        CROPS[oldCrop.season] = CROPS[oldCrop.season].filter(c => c.name !== oldCrop.name);
      }

      custom[editingCropIndex] = newOrUpdatedCrop;
      localStorage.setItem('customCrops', JSON.stringify(custom));

      // Add updated to runtime memory
      if (CROPS[season]) {
        CROPS[season].unshift(newOrUpdatedCrop);
      }

      alert(`✅ Crop "${name}" updated successfully!`);
    } else {
      custom.unshift(newOrUpdatedCrop);
      localStorage.setItem('customCrops', JSON.stringify(custom));

      if (CROPS[season]) {
        CROPS[season].unshift(newOrUpdatedCrop);
      }

      alert(`🎉 Successfully added "${name}" to ${season.toUpperCase()} crops!`);
    }

    resetAdminForm();
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

  // Equipments Rendering
  const defaultEquipments = [
    "🚜 Tractor / Cultivator (खेत जुताई)",
    "🌱 Seed Drill / Planter (बुवाई मशीन)",
    "💧 Water Pump / Drip Irrigation (सिंचाई यंत्र)",
    "🎒 Knapsack Sprayer (छिड़काव मशीन)",
    "🌾 Sickle / Harvester (फसल कटाई औजार)"
  ];
  const equipList = (crop.equipments && crop.equipments.length > 0) ? crop.equipments : defaultEquipments;
  const equipContainer = $("#detail-equipments");
  if (equipContainer) {
    equipContainer.innerHTML = equipList.map(item => `<span class="equip-pill">${escapeHtml(item)}</span>`).join('');
  }

  // Step-by-Step Cultivation Guide Rendering
  const defaultSteps = [
    {
      title: "Step 1: खेत की तैयारी (Field Preparation)",
      desc: "मिट्टी पलटने वाले हल या रोटावेटर से 2-3 बार गहरी जुताई करें। प्रति एकड़ 4-5 टन सड़ी गोबर की खाद (FYM) मिलाकर खेत को भुरभुरा और समतल बना लें।"
    },
    {
      title: "Step 2: बीज चयन एवं उपचार (Seed Selection & Treatment)",
      desc: "बीज भंडार से प्रमाणित बीजों का चयन करें। फफूंदजनित रोगों से सुरक्षा के लिए थीरम, बाविस्टिन या ट्राइकोडर्मा से बीजोपचार जरूर करें।"
    },
    {
      title: "Step 3: बुवाई एवं रोपाई (Sowing & Transplantation)",
      desc: "कतार से कतार और पौधे से पौधे की निश्चित दूरी बनाए रखते हुए बीजों को 2-4 सेमी गहराई में बोएं या नर्सरी पौधे लगाएं।"
    },
    {
      title: "Step 4: सिंचाई एवं उर्वरक प्रबंधन (Irrigation & Nutrients)",
      desc: "बुवाई के तुरंत बाद पहली हल्की सिंचाई दें। आवश्यकतानुसार यूरिया, डीएपी (DAP) और पोटाश को सही अनुपात में निर्धारित समय पर दें।"
    },
    {
      title: "Step 5: निराई-गुड़ाई एवं खरपतवार नियंत्रण (Weeding & Crop Care)",
      desc: "शुरुआती 20-30 दिनों के भीतर खरपतवार निकालें। किसी भी कीट या रोग के लक्षण दिखने पर अनुशंसित कीटनाशक का छिड़काव करें।"
    },
    {
      title: "Step 6: कटाई एवं सुरक्षित भंडारण (Harvesting & Storage)",
      desc: "फसल पूरी तरह पकने के बाद उचित धूप वाले दिन कटाई करें। दानों को अच्छी तरह सुखाकर सुरक्षित नमी स्तर पर भंडारित करें।"
    }
  ];

  const stepsList = (crop.steps && crop.steps.length > 0) ? crop.steps : defaultSteps;
  const stepsContainer = $("#detail-steps");
  if (stepsContainer) {
    stepsContainer.innerHTML = stepsList.map((step, idx) => `
      <div class="step-card">
        <div class="step-badge">${idx + 1}</div>
        <div class="step-info">
          <h4>${escapeHtml(step.title)}</h4>
          <p>${escapeHtml(step.desc)}</p>
        </div>
      </div>
    `).join('');
  }

  initCropReviewSystem(crop.name);
}

/* ---------- Crop Recommendation System Logic (Expanded Soil Support) ---------- */
function initCropRecommender() {
  const form = $("#recommenderForm");
  const resultsContainer = $("#recommendationResults");

  if (!form) return;

  const soilKeywords = {
    alluvial: ["alluvial", "loam", "loamy", "silt", "ganga", "river", "rich"],
    black: ["black", "regur", "cotton soil", "deep black", "medium black"],
    red: ["red", "yellow", "red loam", "red soil"],
    laterite: ["laterite", "lateritic", "acidic", "ghats"],
    loam: ["loam", "loamy", "fertile loam", "sandy loam", "clay loam"],
    sandy: ["sandy", "arid", "desert", "light", "drought", "dry"],
    clay: ["clay", "clayey", "heavy soil", "water-retentive", "puddled"],
    mountain: ["mountain", "forest", "hill", "hilly", "humus", "stone"],
    saline: ["saline", "alkaline", "sodic", "salt", "coastal", "usar"],
    peaty: ["peaty", "marshy", "organic", "boggy", "waterlogged"],
    tarai: ["terai", "tarai", "swampy", "sub-mountain", "alluvial"],
    coastal: ["coastal", "beach", "coastal sand", "lateritic", "saline"],
    gravelly: ["gravelly", "skeletal", "rocky", "stony", "marginal", "poor"]
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedSeason = $("#recSeason").value;
    const selectedSoil = $("#recSoil").value;

    if (!CROPS || !CROPS[selectedSeason]) return;

    const list = CROPS[selectedSeason];
    const recommended = list.filter((crop) => {
      if (selectedSoil === "all") return true;

      const soilText = (crop.soil || "").toLowerCase();
      const keywords = soilKeywords[selectedSoil] || [selectedSoil.toLowerCase()];

      return keywords.some((kw) => soilText.includes(kw));
    });

    resultsContainer.innerHTML = "";

    if (recommended.length === 0) {
      resultsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:#6b7d76;">
        😣 Is soil type ke liye is season mein exact crop match nahi mili. Kripya "All Soil Types" chunein.
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

/* ---------- EXPANDED FERTILIZER & SEED CALCULATOR ENGINE ---------- */
const CROP_REQUIREMENTS_PER_ACRE = {
  wheat:       { seed: 40,   urea: 65,  dap: 50, potash: 20 },
  rice:        { seed: 12,   urea: 70,  dap: 40, potash: 25 },
  maize:       { seed: 8,    urea: 85,  dap: 50, potash: 30 },
  bajra:       { seed: 2,    urea: 40,  dap: 30, potash: 15 },
  jowar:       { seed: 4,    urea: 45,  dap: 30, potash: 20 },
  barley:      { seed: 35,   urea: 50,  dap: 35, potash: 20 },
  ragi:        { seed: 2,    urea: 35,  dap: 25, potash: 15 },

  sugarcane:   { seed: 3000, urea: 150, dap: 60, potash: 50 },
  cotton:      { seed: 2.5,  urea: 90,  dap: 45, potash: 30 },
  jute:        { seed: 3,    urea: 50,  dap: 25, potash: 20 },
  potato:      { seed: 1200, urea: 100, dap: 80, potash: 60 },
  onion:       { seed: 4,    urea: 60,  dap: 45, potash: 35 },

  mustard:     { seed: 2,    urea: 45,  dap: 30, potash: 15 },
  soybean:     { seed: 30,   urea: 25,  dap: 50, potash: 25 },
  groundnut:   { seed: 45,   urea: 20,  dap: 40, potash: 30 },
  sunflower:   { seed: 3,    urea: 40,  dap: 40, potash: 25 },
  sesame:      { seed: 2,    urea: 25,  dap: 20, potash: 15 },

  chickpea:    { seed: 35,   urea: 15,  dap: 45, potash: 15 },
  pigeonpea:   { seed: 8,    urea: 15,  dap: 40, potash: 15 },
  moong:       { seed: 8,    urea: 10,  dap: 35, potash: 10 },
  urad:        { seed: 8,    urea: 10,  dap: 35, potash: 10 },
  lentil:      { seed: 15,   urea: 15,  dap: 40, potash: 15 },
  pea:         { seed: 35,   urea: 20,  dap: 40, potash: 20 },

  chilli:      { seed: 0.5,  urea: 70,  dap: 50, potash: 40 },
  tomato:      { seed: 0.2,  urea: 65,  dap: 50, potash: 45 },
  garlic:      { seed: 200,  urea: 50,  dap: 40, potash: 30 },
  turmeric:    { seed: 800,  urea: 80,  dap: 50, potash: 60 },
  ginger:      { seed: 700,  urea: 75,  dap: 45, potash: 50 }
};

function convertToAcres(val, unit) {
  switch (unit) {
    case "acre":       return val;
    case "hectare":    return val * 2.47105;
    case "bigha_std":  return val / 1.6;
    case "bigha_wb":   return val / 3.025;
    case "katha":      return val / 32;
    case "biswa":      return val / 32;
    case "guntha":     return val / 40;
    case "cent":       return val / 100;
    case "ground":     return val / 18.15;
    case "kanal":      return val / 8;
    case "marla":      return val / 160;
    case "sq_yard":    return val / 4840;
    case "sq_meter":   return val / 4046.86;
    default:           return val;
  }
}

function initFertilizerCalculator() {
  const form = document.getElementById("agriCalcForm");
  const resultsBox = document.getElementById("calcResults");

  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();

    const cropKey = document.getElementById("calcCrop").value;
    const landValue = parseFloat(document.getElementById("calcLandValue").value);
    const unit = document.getElementById("calcLandUnit").value;

    if (isNaN(landValue) || landValue <= 0) return;

    const acres = convertToAcres(landValue, unit);
    const req = CROP_REQUIREMENTS_PER_ACRE[cropKey] || { seed: 10, urea: 50, dap: 30, potash: 20 };

    const seedTotal = (req.seed * acres).toFixed(acres < 0.1 ? 2 : 1);
    const ureaTotal = (req.urea * acres).toFixed(acres < 0.1 ? 2 : 1);
    const dapTotal = (req.dap * acres).toFixed(acres < 0.1 ? 2 : 1);
    const potashTotal = (req.potash * acres).toFixed(acres < 0.1 ? 2 : 1);

    document.getElementById("resSeed").textContent = `${seedTotal} kg`;
    document.getElementById("resUrea").textContent = `${ureaTotal} kg`;
    document.getElementById("resDap").textContent = `${dapTotal} kg`;
    document.getElementById("resPotash").textContent = `${potashTotal} kg`;

    const acreText = document.getElementById("calculatedAcreText");
    if (acreText) {
      acreText.textContent = `Equiv. Area: ${acres.toFixed(3)} Acre (एकड़)`;
    }

    resultsBox.style.display = "block";
    resultsBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
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

  if ($("#opt-help")) $("#opt-help").onclick = () => goKisanHelp();
  if ($("#opt-recommend")) $("#opt-recommend").onclick = () => goRecommend();
  if ($("#opt-season")) $("#opt-season").onclick = () => goSeasons();
  if ($("#opt-agri")) $("#opt-agri").onclick = () => goAgri();
  if ($("#opt-map")) $("#opt-map").onclick = () => goIndiaMap();

  document.querySelectorAll(".nav-link").forEach(b => {
    b.onclick = () => {
      const nav = b.dataset.nav;
      if (nav === "welcome") goWelcome();
      else if (nav === "kisan-help") goKisanHelp();
      else if (nav === "recommend") goRecommend();
      else if (nav === "favorites") goFavorites();
      else if (nav === "admin") goAdmin();
      else if (nav === "calculator") goCalculator();
      else if (nav === "season") goSeasons();
      else if (nav === "agri") goAgri();
      else if (nav === "india-map") goIndiaMap();
    };
  });

  if ($("#home-btn")) $("#home-btn").onclick = () => goWelcome();

  if ($("#help-back-welcome")) $("#help-back-welcome").onclick = () => goWelcome();
  if ($("#help-go-seasons")) $("#help-go-seasons").onclick = () => goSeasons();
  if ($("#rec-back-welcome")) $("#rec-back-welcome").onclick = () => goWelcome();
  if ($("#rec-go-seasons")) $("#rec-go-seasons").onclick = () => goSeasons();
  if ($("#fav-back-welcome")) $("#fav-back-welcome").onclick = () => goWelcome();
  if ($("#fav-go-seasons")) $("#fav-go-seasons").onclick = () => goSeasons();
  if ($("#admin-back-welcome")) $("#admin-back-welcome").onclick = () => goWelcome();
  if ($("#calc-back-welcome")) $("#calc-back-welcome").onclick = () => goWelcome();

  if ($("#map-back-welcome")) $("#map-back-welcome").onclick = () => goWelcome();
  if ($("#map-go-seasons")) $("#map-go-seasons").onclick = () => goSeasons();

  if ($("#agri-back-welcome")) $("#agri-back-welcome").onclick = () => goWelcome();
  if ($("#agri-go-seasons")) $("#agri-go-seasons").onclick = () => goSeasons();

  if ($("#stat-crops")) $("#stat-crops").textContent = Object.values(CROPS).reduce((a, b) => a + b.length, 0);
  if ($("#stat-seasons")) $("#stat-seasons").textContent = Object.keys(CROPS).length;

  initMusic();
  initKisanHelpSection();
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