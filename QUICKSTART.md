# ⚡ Quick Start Guide

Schnelle Anleitung zum Starten des Ads Quality Raters.

## 🎯 Was ist das?

Ein KI-System das automatisch Werbeanzeigen und ihre Landingpages analysiert auf:
- ✅ Visuelle Qualität
- ✅ Copywriting-Konsistenz
- ✅ Markenkonformität

## 📋 Voraussetzungen

- **Python 3.11+**
- **Node.js 18+**
- **Gemini API Key** (kostenlos: https://makersuite.google.com/app/apikey)

## 🚀 Start in 3 Schritten

### 1. Backend starten

```bash
# Terminal 1
cd backend

# API Key konfigurieren
cp .env.example .env
# Editiere .env und füge deinen GEMINI_API_KEY ein

# Virtual Environment aktivieren
source venv/bin/activate

# Server starten
uvicorn src.api.main:app --reload --port 8000
```

✅ Backend läuft auf: **http://localhost:8000**
📖 API Docs: **http://localhost:8000/docs**

---

### 2. Frontend starten

```bash
# Terminal 2 (neues Terminal öffnen)
cd frontend

# Dependencies installieren (nur beim ersten Mal)
npm install

# Frontend starten
npm run dev
```

✅ Frontend läuft auf: **http://localhost:3000**

---

### 3. Erste Analyse

1. Öffne **http://localhost:3000** im Browser
2. Gib URLs ein:
   - **Ad-URL:** URL zu deinem Werbemotiv (JPG/PNG)
   - **LP-URL:** URL zur Landingpage
3. Klicke **"Analyse starten"**
4. Warte 30-60 Sekunden ⏳
5. Ergebnisse werden angezeigt! 🎉

## 📊 Was du siehst

Nach der Analyse bekommst du:

- **Overall Score** (0-100 Punkte)
- **Score Breakdown:**
  - 🎨 Visuell (25% Gewicht)
  - ✍️ Copywriting (35% Gewicht)
  - 🏷️ Marke (40% Gewicht)
- **Detaillierte Tabs:**
  - Brand Compliance
  - Copywriting Feedback
  - Visuelle Analyse
- **JSON-Export** zum Download

## 🔧 Optional: Brand Guidelines

Für bessere Brand-Compliance-Prüfung kannst du Guidelines als JSON hinzufügen:

```json
{
  "tone_of_voice": ["professionell", "freundlich"],
  "prohibited_words": ["billig", "kostenlos"],
  "color_palette": {
    "primary": "#FF6B35"
  }
}
```

Beispiel: `backend/config/brand_guidelines/example_brand.json`

## ❓ Troubleshooting

### Backend startet nicht?

```bash
# Prüfe ob Port 8000 frei ist
lsof -ti:8000 | xargs kill -9

# Neu starten
uvicorn src.api.main:app --reload --port 8000
```

### Frontend zeigt Fehler?

```bash
# Prüfe ob Backend läuft
curl http://localhost:8000/health

# Sollte zurückgeben:
# {"status":"healthy",...}
```

### API Key fehlt?

```bash
# Editiere backend/.env
nano backend/.env

# Füge ein:
GEMINI_API_KEY=dein-key-hier
```

API Key erhalten: https://makersuite.google.com/app/apikey

## 📚 Weiterführende Docs

- **README.md** - Vollständige Dokumentation
- **PRD.md** - Product Requirements
- **PLANNING.md** - Technische Details
- **backend/README.md** - Backend-spezifisch
- **frontend/README.md** - Frontend-spezifisch

## 💡 Beispiel-URLs zum Testen

Du kannst mit echten Websites testen:

**Ad-URL:** Ein beliebiges Werbebild (muss öffentlich erreichbar sein)
**LP-URL:** Die dazugehörige Landingpage

Beispiel:
- Ad: Link zu deinem Marketing-Material
- LP: Deine Produkt- oder Service-Seite

## ✅ Erfolgreicher Test

Wenn du das siehst, läuft alles:

1. Backend-Terminal: `INFO: Application startup complete`
2. Frontend-Terminal: `Local: http://localhost:3000`
3. Browser: Formular ist sichtbar
4. Nach Analyse: Score wird angezeigt

## 🎉 Fertig!

Du kannst jetzt beliebig viele Analysen durchführen.

Bei Problemen:
- Backend-Logs prüfen (Terminal 1)
- Frontend-Logs prüfen (Terminal 2)
- Browser-Console öffnen (F12)

---

**Happy Testing! 🚀**
