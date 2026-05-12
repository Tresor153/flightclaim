/**
 * Airport Search & App Controller
 */

let originAirport = null;
let destinationAirport = null;
let activeInput = null;
let activeDropdown = null;

// ── Airport data – inlined so the app works via file:// and any server ─────
const AIRPORTS = [
  {"iata":"AMS","name":"Amsterdam Schiphol","city":"Amsterdam","country":"NL","lat":52.3086,"lon":4.7639,"eu":true},
  {"iata":"ATH","name":"Athen Eleftherios Venizelos","city":"Athen","country":"GR","lat":37.9364,"lon":23.9445,"eu":true},
  {"iata":"BCN","name":"Barcelona El Prat","city":"Barcelona","country":"ES","lat":41.2974,"lon":2.0833,"eu":true},
  {"iata":"BER","name":"Berlin Brandenburg","city":"Berlin","country":"DE","lat":52.3667,"lon":13.5033,"eu":true},
  {"iata":"BRU","name":"Brüssel Zaventem","city":"Brüssel","country":"BE","lat":50.9014,"lon":4.4844,"eu":true},
  {"iata":"BUD","name":"Budapest Ferenc Liszt","city":"Budapest","country":"HU","lat":47.4298,"lon":19.2611,"eu":true},
  {"iata":"CDG","name":"Paris Charles de Gaulle","city":"Paris","country":"FR","lat":49.0097,"lon":2.5479,"eu":true},
  {"iata":"CIA","name":"Rom Ciampino","city":"Rom","country":"IT","lat":41.7994,"lon":12.5949,"eu":true},
  {"iata":"CPH","name":"Kopenhagen Kastrup","city":"Kopenhagen","country":"DK","lat":55.6181,"lon":12.6561,"eu":true},
  {"iata":"DUB","name":"Dublin","city":"Dublin","country":"IE","lat":53.4213,"lon":-6.2701,"eu":true},
  {"iata":"DUS","name":"Düsseldorf","city":"Düsseldorf","country":"DE","lat":51.2895,"lon":6.7668,"eu":true},
  {"iata":"FCO","name":"Rom Fiumicino","city":"Rom","country":"IT","lat":41.8003,"lon":12.2389,"eu":true},
  {"iata":"FRA","name":"Frankfurt am Main","city":"Frankfurt","country":"DE","lat":50.0333,"lon":8.5706,"eu":true},
  {"iata":"GVA","name":"Genf","city":"Genf","country":"CH","lat":46.2381,"lon":6.1089,"eu":false},
  {"iata":"HAM","name":"Hamburg","city":"Hamburg","country":"DE","lat":53.6304,"lon":9.9882,"eu":true},
  {"iata":"HEL","name":"Helsinki Vantaa","city":"Helsinki","country":"FI","lat":60.3172,"lon":24.9633,"eu":true},
  {"iata":"IST","name":"Istanbul","city":"Istanbul","country":"TR","lat":41.2753,"lon":28.7519,"eu":false},
  {"iata":"LGW","name":"London Gatwick","city":"London","country":"GB","lat":51.1537,"lon":-0.1821,"eu":false},
  {"iata":"LHR","name":"London Heathrow","city":"London","country":"GB","lat":51.4775,"lon":-0.4614,"eu":false},
  {"iata":"LIS","name":"Lissabon Humberto Delgado","city":"Lissabon","country":"PT","lat":38.7813,"lon":-9.1359,"eu":true},
  {"iata":"MAD","name":"Madrid Barajas","city":"Madrid","country":"ES","lat":40.4936,"lon":-3.5668,"eu":true},
  {"iata":"MAN","name":"Manchester","city":"Manchester","country":"GB","lat":53.3537,"lon":-2.2750,"eu":false},
  {"iata":"MUC","name":"München","city":"München","country":"DE","lat":48.3537,"lon":11.7750,"eu":true},
  {"iata":"NAP","name":"Neapel","city":"Neapel","country":"IT","lat":40.8860,"lon":14.2908,"eu":true},
  {"iata":"NRT","name":"Tokyo Narita","city":"Tokyo","country":"JP","lat":35.7720,"lon":140.3929,"eu":false},
  {"iata":"ORY","name":"Paris Orly","city":"Paris","country":"FR","lat":48.7233,"lon":2.3794,"eu":true},
  {"iata":"OSL","name":"Oslo Gardermoen","city":"Oslo","country":"NO","lat":60.1939,"lon":11.1004,"eu":false},
  {"iata":"OTP","name":"Bukarest Henri Coanda","city":"Bukarest","country":"RO","lat":44.5711,"lon":26.0858,"eu":true},
  {"iata":"PMI","name":"Palma de Mallorca","city":"Palma","country":"ES","lat":39.5517,"lon":2.7388,"eu":true},
  {"iata":"PRG","name":"Prag Vaclav Havel","city":"Prag","country":"CZ","lat":50.1008,"lon":14.2600,"eu":true},
  {"iata":"STN","name":"London Stansted","city":"London","country":"GB","lat":51.8850,"lon":0.2350,"eu":false},
  {"iata":"ARN","name":"Stockholm Arlanda","city":"Stockholm","country":"SE","lat":59.6519,"lon":17.9186,"eu":true},
  {"iata":"VIE","name":"Wien Schwechat","city":"Wien","country":"AT","lat":48.1103,"lon":16.5697,"eu":true},
  {"iata":"WAW","name":"Warschau Chopin","city":"Warschau","country":"PL","lat":52.1657,"lon":20.9671,"eu":true},
  {"iata":"ZRH","name":"Zuerich","city":"Zürich","country":"CH","lat":47.4647,"lon":8.5492,"eu":false},
  {"iata":"JFK","name":"New York JFK","city":"New York","country":"US","lat":40.6413,"lon":-73.7781,"eu":false},
  {"iata":"EWR","name":"New York Newark","city":"New York","country":"US","lat":40.6925,"lon":-74.1687,"eu":false},
  {"iata":"LAX","name":"Los Angeles","city":"Los Angeles","country":"US","lat":33.9425,"lon":-118.4081,"eu":false},
  {"iata":"ORD","name":"Chicago O Hare","city":"Chicago","country":"US","lat":41.9742,"lon":-87.9073,"eu":false},
  {"iata":"DXB","name":"Dubai","city":"Dubai","country":"AE","lat":25.2532,"lon":55.3657,"eu":false},
  {"iata":"SIN","name":"Singapur Changi","city":"Singapur","country":"SG","lat":1.3644,"lon":103.9915,"eu":false},
  {"iata":"BKK","name":"Bangkok Suvarnabhumi","city":"Bangkok","country":"TH","lat":13.6811,"lon":100.7472,"eu":false},
  {"iata":"HKG","name":"Hongkong","city":"Hongkong","country":"HK","lat":22.3080,"lon":113.9185,"eu":false},
  {"iata":"YYZ","name":"Toronto Pearson","city":"Toronto","country":"CA","lat":43.6777,"lon":-79.6248,"eu":false},
  {"iata":"GRU","name":"Sao Paulo Guarulhos","city":"Sao Paulo","country":"BR","lat":-23.4356,"lon":-46.4731,"eu":false},
  {"iata":"MEX","name":"Mexiko-Stadt","city":"Mexiko-Stadt","country":"MX","lat":19.4363,"lon":-99.0721,"eu":false},
  {"iata":"CAI","name":"Kairo","city":"Kairo","country":"EG","lat":30.1219,"lon":31.4056,"eu":false},
  {"iata":"JNB","name":"Johannesburg O.R. Tambo","city":"Johannesburg","country":"ZA","lat":-26.1367,"lon":28.2411,"eu":false},
  {"iata":"SYD","name":"Sydney Kingsford Smith","city":"Sydney","country":"AU","lat":-33.9399,"lon":151.1753,"eu":false},
  {"iata":"MXP","name":"Mailand Malpensa","city":"Mailand","country":"IT","lat":45.6306,"lon":8.7281,"eu":true},
  {"iata":"LIN","name":"Mailand Linate","city":"Mailand","country":"IT","lat":45.4455,"lon":9.2767,"eu":true},
  {"iata":"AGP","name":"Malaga","city":"Málaga","country":"ES","lat":36.6749,"lon":-4.4991,"eu":true},
  {"iata":"ALC","name":"Alicante-Elche","city":"Alicante","country":"ES","lat":38.2822,"lon":-0.5582,"eu":true},
  {"iata":"TFS","name":"Teneriffa Sued","city":"Teneriffa","country":"ES","lat":28.0445,"lon":-16.5725,"eu":true},
  {"iata":"LPA","name":"Gran Canaria","city":"Las Palmas","country":"ES","lat":27.9319,"lon":-15.3866,"eu":true},
  {"iata":"KRK","name":"Krakau","city":"Krakau","country":"PL","lat":50.0777,"lon":19.7848,"eu":true},
  {"iata":"BLL","name":"Billund","city":"Billund","country":"DK","lat":55.7403,"lon":9.1519,"eu":true},
  {"iata":"CGN","name":"Koeln Bonn","city":"Köln","country":"DE","lat":50.8659,"lon":7.1427,"eu":true},
  {"iata":"STR","name":"Stuttgart","city":"Stuttgart","country":"DE","lat":48.6899,"lon":9.2220,"eu":true},
  {"iata":"NUE","name":"Nuernberg","city":"Nürnberg","country":"DE","lat":49.4987,"lon":11.0669,"eu":true},
  {"iata":"HAJ","name":"Hannover","city":"Hannover","country":"DE","lat":52.4611,"lon":9.6850,"eu":true},
  {"iata":"LEJ","name":"Leipzig Halle","city":"Leipzig","country":"DE","lat":51.4324,"lon":12.2162,"eu":true},
  {"iata":"DRS","name":"Dresden","city":"Dresden","country":"DE","lat":51.1328,"lon":13.7672,"eu":true},
  {"iata":"BSL","name":"Basel Mulhouse Freiburg","city":"Basel","country":"CH","lat":47.5896,"lon":7.5290,"eu":false},
  {"iata":"SVQ","name":"Sevilla","city":"Sevilla","country":"ES","lat":37.4180,"lon":-5.8931,"eu":true},
  {"iata":"VLC","name":"Valencia","city":"Valencia","country":"ES","lat":39.4893,"lon":-0.4816,"eu":true},
  {"iata":"BOD","name":"Bordeaux","city":"Bordeaux","country":"FR","lat":44.8283,"lon":-0.7156,"eu":true},
  {"iata":"LYS","name":"Lyon Saint-Exupery","city":"Lyon","country":"FR","lat":45.7256,"lon":5.0811,"eu":true},
  {"iata":"MRS","name":"Marseille Provence","city":"Marseille","country":"FR","lat":43.4393,"lon":5.2214,"eu":true},
  {"iata":"NCE","name":"Nizza Cote d Azur","city":"Nizza","country":"FR","lat":43.6584,"lon":7.2159,"eu":true},
  {"iata":"TLS","name":"Toulouse Blagnac","city":"Toulouse","country":"FR","lat":43.6291,"lon":1.3638,"eu":true}
];

// ── Fuzzy search airports ──────────────────────────────────────────────────
function searchAirports(query) {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase().trim();
  return AIRPORTS.filter(a =>
    a.iata.toLowerCase().includes(q) ||
    a.city.toLowerCase().includes(q) ||
    a.name.toLowerCase().includes(q) ||
    a.country.toLowerCase().includes(q)
  ).slice(0, 8);
}

// ── Render dropdown ────────────────────────────────────────────────────────
function renderDropdown(results, inputEl, dropdownEl, onSelect) {
  if (!results.length) {
    dropdownEl.innerHTML = `<div class="dropdown-empty">Kein Flughafen gefunden</div>`;
    dropdownEl.classList.add("visible");
    return;
  }
  dropdownEl.innerHTML = results.map((a, i) => `
    <div class="dropdown-item" data-index="${i}" role="option" tabindex="-1">
      <span class="iata-badge">${a.iata}</span>
      <span class="airport-info">
        <span class="airport-city">${a.city}</span>
        <span class="airport-name">${a.name}</span>
      </span>
      <span class="eu-badge ${a.eu ? "eu-yes" : "eu-no"}">${a.eu ? "EU" : "Non-EU"}</span>
    </div>
  `).join("");

  dropdownEl.querySelectorAll(".dropdown-item").forEach((item, i) => {
    item.addEventListener("mousedown", (e) => {
      e.preventDefault();
      onSelect(results[i]);
    });
  });

  dropdownEl.classList.add("visible");
}

// ── Set selected airport ───────────────────────────────────────────────────
function selectAirport(airport, inputEl, dropdownEl, type) {
  inputEl.value = `${airport.iata} – ${airport.city}`;
  inputEl.dataset.selected = "true";
  dropdownEl.classList.remove("visible");

  const flagEl = inputEl.closest(".input-wrapper")?.querySelector(".selected-flag");
  if (flagEl) {
    flagEl.textContent = airport.eu ? "🇪🇺" : "🌍";
    flagEl.classList.add("show");
  }

  if (type === "origin") {
    originAirport = airport;
    document.getElementById("origin-iata").textContent = airport.iata;
  } else {
    destinationAirport = airport;
    document.getElementById("dest-iata").textContent = airport.iata;
  }

  updateRouteVisual();
}

// ── Route visual update ────────────────────────────────────────────────────
function updateRouteVisual() {
  if (originAirport && destinationAirport) {
    const dist = Math.round(EU261.haversine(
      originAirport.lat, originAirport.lon,
      destinationAirport.lat, destinationAirport.lon
    ));
    document.getElementById("route-distance").textContent = `${dist.toLocaleString("de-DE")} km`;
    document.getElementById("route-visual").classList.add("active");
  }
}

// ── Bind autocomplete to an input ─────────────────────────────────────────
function bindAutocomplete(inputId, dropdownId, type) {
  const inputEl = document.getElementById(inputId);
  const dropdownEl = document.getElementById(dropdownId);

  inputEl.addEventListener("input", () => {
    inputEl.dataset.selected = "false";
    if (type === "origin") originAirport = null;
    else destinationAirport = null;

    const results = searchAirports(inputEl.value);
    if (inputEl.value.length === 0) {
      dropdownEl.classList.remove("visible");
      return;
    }
    renderDropdown(results, inputEl, dropdownEl, (airport) => {
      selectAirport(airport, inputEl, dropdownEl, type);
    });
  });

  inputEl.addEventListener("focus", () => {
    if (inputEl.value.length > 0 && inputEl.dataset.selected !== "true") {
      const results = searchAirports(inputEl.value);
      renderDropdown(results, inputEl, dropdownEl, (airport) => {
        selectAirport(airport, inputEl, dropdownEl, type);
      });
    }
  });

  inputEl.addEventListener("keydown", (e) => {
    const items = dropdownEl.querySelectorAll(".dropdown-item");
    const current = dropdownEl.querySelector(".dropdown-item.focused");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = current ? current.nextElementSibling : items[0];
      if (next) { current?.classList.remove("focused"); next.classList.add("focused"); next.focus(); }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = current ? current.previousElementSibling : items[items.length - 1];
      if (prev) { current?.classList.remove("focused"); prev.classList.add("focused"); prev.focus(); }
    } else if (e.key === "Escape") {
      dropdownEl.classList.remove("visible");
    }
  });

  document.addEventListener("click", (e) => {
    if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
      dropdownEl.classList.remove("visible");
    }
  });
}

// ── Delay slider ───────────────────────────────────────────────────────────
function initSlider() {
  const slider = document.getElementById("delay-slider");
  const display = document.getElementById("delay-display");
  const track = document.getElementById("slider-track-fill");

  function update() {
    const val = parseInt(slider.value);
    const max = parseInt(slider.max);
    const pct = (val / max) * 100;

    if (val < 3) {
      display.innerHTML = `<span class="delay-num">${val}</span><span class="delay-unit">Stunde${val !== 1 ? "n" : ""}</span><span class="delay-badge below">Unter Schwelle</span>`;
    } else {
      display.innerHTML = `<span class="delay-num">${val}</span><span class="delay-unit">Stunde${val !== 1 ? "n" : ""}</span><span class="delay-badge above">Anspruch möglich ✓</span>`;
    }

    track.style.width = pct + "%";
    // Color coding
    const colors = val < 3 ? ["#ff6b6b","#ff6b6b"] : val < 5 ? ["#ffd93d","#ff9f43"] : ["#6bcb77","#4ecdc4"];
    track.style.background = `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`;
  }

  slider.addEventListener("input", update);
  update();
}

// ── Carrier toggle ─────────────────────────────────────────────────────────
function initCarrierToggle() {
  const toggle = document.getElementById("carrier-eu-toggle");
  const label = document.getElementById("carrier-label");

  toggle.addEventListener("change", () => {
    label.textContent = toggle.checked ? "EU-/EEA-Fluggesellschaft" : "Nicht-EU-Fluggesellschaft";
  });
}

// ── Calculate & show result ────────────────────────────────────────────────
function calculate() {
  const resultSection = document.getElementById("result-section");

  if (!originAirport || !destinationAirport) {
    shakeForm();
    showError("Bitte wähle Start- und Zielflughafen aus der Liste aus.");
    return;
  }

  if (originAirport.iata === destinationAirport.iata) {
    showError("Start- und Zielflughafen dürfen nicht identisch sein.");
    return;
  }

  const delayHours = parseInt(document.getElementById("delay-slider").value);
  const carrierEU = document.getElementById("carrier-eu-toggle").checked;

  const result = EU261.calculate({
    origin: originAirport,
    destination: destinationAirport,
    delayHours,
    carrierEU,
  });

  renderResult(result);
  resultSection.classList.add("visible");
  setTimeout(() => resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
}

// ── Render result card ─────────────────────────────────────────────────────
function renderResult(r) {
  const el = document.getElementById("result-section");

  if (!r.eligible) {
    const isScope = r.reason === "out_of_scope";
    el.innerHTML = `
      <div class="result-card result-negative">
        <div class="result-icon">${isScope ? "🌍" : "⏱️"}</div>
        <h2 class="result-title">Kein Entschädigungsanspruch</h2>
        <p class="result-reason">${r.reasonText}</p>
        ${r.distanceKm ? `<div class="result-meta"><span>Distanz: ${r.distanceKm.toLocaleString("de-DE")} km</span><span>Verspätung: ${r.delayHours}h</span></div>` : ""}
        <div class="result-hint">
          <strong>Wann entsteht ein Anspruch?</strong><br>
          Bei Abflug aus der EU oder Ankunft in der EU mit EU-Carrier + mind. 3h Ankunftsverspätung.
        </div>
      </div>
    `;
    return;
  }

  const isReduced = r.reduced;
  el.innerHTML = `
    <div class="result-card result-positive">
      <div class="result-header-top">
        <div class="result-verdict">Anspruch besteht! ✓</div>
        <div class="legal-basis">${r.legalBasis}</div>
      </div>

      <div class="compensation-display">
        <div class="comp-amount">
          ${isReduced ? `<span class="comp-original">${r.compensationBase}€</span>` : ""}
          <span class="comp-final">${r.compensationFinal}€</span>
        </div>
        <div class="comp-label">Entschädigungsanspruch pro Person</div>
        ${isReduced ? `<div class="comp-reduction-note">* 50% Kürzung anwendbar (Langstrecke, Verspätung unter 4h – Art. 7 §2)</div>` : ""}
      </div>

      <div class="result-details">
        <div class="detail-item">
          <span class="detail-icon">✈️</span>
          <div>
            <div class="detail-label">Streckenkategorie</div>
            <div class="detail-value">${r.tierLabel}</div>
          </div>
        </div>
        <div class="detail-item">
          <span class="detail-icon">📏</span>
          <div>
            <div class="detail-label">Flugdistanz</div>
            <div class="detail-value">${r.distanceKm.toLocaleString("de-DE")} km</div>
          </div>
        </div>
        <div class="detail-item">
          <span class="detail-icon">⏱️</span>
          <div>
            <div class="detail-label">Verspätung</div>
            <div class="detail-value">${r.delayHours} Stunden</div>
          </div>
        </div>
      </div>

      ${r.additionalRights.length > 0 ? `
        <div class="additional-rights">
          <h4>Weitere Rechte</h4>
          <ul>
            ${r.additionalRights.map(right => `
              <li><span class="right-icon">${right.icon}</span> ${right.text}</li>
            `).join("")}
          </ul>
        </div>
      ` : ""}

      <div class="result-cta">
        <div class="cta-tip">
          <strong>💡 Tipp:</strong> Fordern Sie die Entschädigung direkt bei der Fluggesellschaft schriftlich ein.
          Bei Ablehnung helfen Schlichtungsstellen wie die <em>söp</em> oder spezialisierte Dienstleister kostenlos weiter.
        </div>
      </div>
    </div>
  `;

  // Animate amount counter
  animateAmount(r.compensationFinal);
}

function animateAmount(target) {
  const el = document.querySelector(".comp-final");
  if (!el) return;
  let current = 0;
  const step = target / 40;
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + "€";
    if (current >= target) clearInterval(interval);
  }, 16);
}

function showError(msg) {
  const el = document.getElementById("form-error");
  el.textContent = msg;
  el.classList.add("visible");
  setTimeout(() => el.classList.remove("visible"), 4000);
}

function shakeForm() {
  const form = document.querySelector(".calculator-card");
  form.classList.add("shake");
  setTimeout(() => form.classList.remove("shake"), 500);
}

// ── Swap airports ──────────────────────────────────────────────────────────
function swapAirports() {
  const originInput = document.getElementById("origin-input");
  const destInput = document.getElementById("dest-input");

  const tmpVal = originInput.value;
  const tmpAirport = originAirport;

  originInput.value = destInput.value;
  destInput.value = tmpVal;
  originAirport = destinationAirport;
  destinationAirport = tmpAirport;

  document.getElementById("origin-iata").textContent = originAirport?.iata || "---";
  document.getElementById("dest-iata").textContent = destinationAirport?.iata || "---";

  // Swap flags
  const wrappers = document.querySelectorAll(".input-wrapper .selected-flag");
  if (wrappers.length >= 2) {
    const tmp = wrappers[0].textContent;
    wrappers[0].textContent = wrappers[1].textContent;
    wrappers[1].textContent = tmp;
  }

  // Animate swap button
  const btn = document.getElementById("swap-btn");
  btn.classList.add("spinning");
  setTimeout(() => btn.classList.remove("spinning"), 400);

  updateRouteVisual();
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  bindAutocomplete("origin-input", "origin-dropdown", "origin");
  bindAutocomplete("dest-input", "dest-dropdown", "destination");
  initSlider();
  initCarrierToggle();

  document.getElementById("calc-btn").addEventListener("click", calculate);

  // Enter key triggers calculation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement.tagName !== "INPUT") {
      calculate();
    }
  });
});
