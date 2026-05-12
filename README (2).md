# ✦ FlightClaim – EU-261 Entschädigungsrechner

Ein professioneller, vollständig clientseitiger Rechner für Fluggastrechte nach **EU-Verordnung (EG) Nr. 261/2004**.

**[→ Live Demo](https://yourusername.github.io/flightclaim)** *(nach Deployment aktiv)*

---

## Screenshot

> Modernes Dark-Design mit Echtzeit-Berechnung, Flughafen-Autocomplete und vollständiger EU-261-Logik.

---

## Features

- **Vollständige EU-261-Logik** – Scope-Check, Distanzberechnung (Haversine), alle 3 Entschädigungsstufen
- **72 Flughäfen** im Datensatz (EU + International), erweiterbar
- **Intelligentes Autocomplete** – suche nach Stadt, IATA-Code oder Flughafenname
- **Slider-basierte Verspätungseingabe** mit visuellem Feedback
- **EU-Carrier Toggle** – korrekte Anwendung von Art. 3 (Scope)
- **50%-Kürzungsregel** (Art. 7 §2) für Langstrecke bei Verspätung < 4h
- **Zusatzrechte** je nach Verspätungsdauer (Mahlzeiten, Erstattung, Hotel)
- **Haversine-Distanzberechnung** direkt im Browser
- Vollständig **offline-fähig** / deploybar als Static Site
- **Kein Backend, keine Daten werden gesendet**

---

## Rechtliche Logik (EU VO 261/2004)

### Anwendungsbereich (Art. 3)
| Situation | EU-Carrier | Nicht-EU-Carrier | Entschädigung? |
|-----------|-----------|-----------------|----------------|
| Abflug aus EU | ✓ | ✓ | ✅ Ja |
| Ankunft in EU | ✓ | ✗ | ✅ Ja (nur EU-Carrier) |
| Abflug außerhalb EU, Ziel außerhalb EU | – | – | ❌ Nein |

### Entschädigungshöhen (Art. 7)
| Distanz | Verspätung | Entschädigung |
|---------|-----------|---------------|
| ≤ 1.500 km | ≥ 3h | **250 €** |
| 1.500 – 3.500 km | ≥ 3h | **400 €** |
| > 3.500 km | ≥ 3h | **600 €** (300 € bei < 4h Verspätung) |

### Schwellenwerte
- **≥ 2h**: Anspruch auf Verpflegung (Art. 9)
- **≥ 3h**: Entschädigungsanspruch (Art. 7)
- **≥ 5h**: Recht auf Erstattung + alternative Beförderung (Art. 8)
- **Über Nacht**: Anspruch auf Hotelunterbringung (Art. 9)

---

## Projektstruktur

```
flightclaim/
├── index.html              # Haupt-App
├── css/
│   └── style.css           # Styling (Dark Theme, responsive)
├── js/
│   ├── eu261.js            # Reine Berechnungslogik (kein DOM)
│   └── app.js              # UI Controller, Autocomplete, Slider
├── data/
│   └── airports.json       # 72 Flughäfen mit EU-Status + Koordinaten
└── README.md
```

---

## Deployment auf GitHub Pages

```bash
# 1. Repository erstellen
git init
git remote add origin https://github.com/DEIN_NAME/flightclaim.git

# 2. Dateien committen
git add .
git commit -m "feat: initial FlightClaim EU-261 calculator"
git push -u origin main

# 3. GitHub Pages aktivieren
# → Settings → Pages → Source: main / (root) → Save
# → https://DEIN_NAME.github.io/flightclaim
```

---

## Lokale Entwicklung

Da die App Flughafendaten per `fetch()` lädt, benötigt sie einen lokalen Server:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```

Dann unter `http://localhost:8080` aufrufen.

---

## Erweiterungsmöglichkeiten

- [ ] Airline-Datenbank (EU/Non-EU Classification)
- [ ] PDF-Musterbrief generieren
- [ ] Mehrsprachigkeit (EN/FR/ES)
- [ ] Dark/Light Mode Toggle
- [ ] Weitere Flughäfen hinzufügen
- [ ] Verjährungsfristen je Land
- [ ] Claim-Tracking mit LocalStorage

---

## Technologie

- Vanilla HTML/CSS/JS – **keine Abhängigkeiten**
- Google Fonts (Syne + DM Sans)
- Vollständig statisch, CDN-deploybar

---

## Rechtlicher Hinweis

Dieses Tool dient ausschließlich zur Information und Orientierung. Es stellt keine Rechtsberatung dar. Maßgeblich ist die EU-Verordnung (EG) Nr. 261/2004 in ihrer jeweils gültigen Fassung sowie die Rechtsprechung des EuGH.

---

*Gebaut als Portfolio-Demo-Projekt.*
