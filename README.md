# 🎯 Ads Quality Rater

KI-basierter Quality Rater mit Crew AI + Brand Agent für automatisierte Bewertung von Ad-LP-Kohärenz und Markenkonformität.

## 📋 Übersicht

Dieses System analysiert automatisiert die Qualität und Konsistenz von Werbeanzeigen und deren Landingpages:

- **Visuelle Analyse** von Ads (Gemini 2.0 Flash Vision)
- **Landingpage-Scraping** (Playwright für dynamische Seiten)
- **Copywriting-Bewertung** (Message Match, Tonalität)
- **Brand-Compliance-Prüfung** gegen Guidelines
- **Strukturierte JSON-Reports** (Pydantic-validiert)

## 🏗️ Architektur

### Multi-Agent-System (Crew AI)

Das System verwendet 5 spezialisierte Agents in sequentieller Ausführung:

1. **Ad_Visual_Analyst** → Analysiert Werbemotiv visuell
2. **Landing_Page_Scraper** → Extrahiert LP-Text
3. **Copywriting_Expert** → Bewertet Message Match
4. **Brand_Consistency_Agent** → Prüft Markenkonformität
5. **Quality_Rating_Synthesizer** → Erstellt finalen Report

### Tech Stack

- **Framework:** Crew AI (Multi-Agenten-Orchestrierung)
- **LLM:** Gemini 2.0 Flash (Text + Vision)
- **API:** FastAPI
- **Scraping:** Playwright + trafilatura
- **Validation:** Pydantic 2.x
- **Testing:** pytest

## 🚀 Quick Start

### Voraussetzungen

- Python 3.11+
- Node.js 18+
- Gemini API Key (https://makersuite.google.com/app/apikey)

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/your-org/ads-quality-rater.git
cd ads-quality-rater/backend

# 2. Virtual Environment erstellen
python -m venv venv
source venv/bin/activate  # macOS/Linux
# oder: venv\Scripts\activate  # Windows

# 3. Dependencies installieren
pip install -r requirements.txt

# 4. Playwright Browser installieren
playwright install chromium

# 5. Environment-Variablen konfigurieren
cp .env.example .env
# Öffne .env und füge deinen Gemini API Key ein
```

### .env Konfiguration

```bash
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-2.0-flash-exp
ENVIRONMENT=development
LOG_LEVEL=INFO
```

### Tests ausführen

```bash
# Alle Tests
pytest tests/ -v

# Nur Unit-Tests (schnell, kein API-Key nötig)
pytest tests/unit -v

# Mit Coverage
pytest --cov=src --cov-report=html
```

### Server starten

```bash
# Development-Server
uvicorn src.api.main:app --reload --port 8000

# Server läuft auf: http://localhost:8000
# API Docs (Swagger): http://localhost:8000/docs
```

## 📖 API Usage

### Health Check

```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-03T18:30:00Z",
  "services": {
    "gemini": "healthy"
  }
}
```

### Analyse starten

```bash
curl -X POST http://localhost:8000/api/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "ad_url": "https://example.com/ad.jpg",
    "landing_page_url": "https://example.com/landing",
    "brand_guidelines": {
      "tone_of_voice": ["professional", "friendly"],
      "prohibited_words": ["cheap", "free"],
      "color_palette": {
        "primary": "#FF6B35",
        "secondary": "#004E89"
      },
      "visual_style": "minimalist, modern",
      "values": ["transparency", "quality"]
    },
    "target_audience": "Young professionals (25-35)"
  }'
```

**Response:**
```json
{
  "analysis_id": "abc-123-def-456",
  "status": "completed",
  "report": {
    "report_id": "abc-123-def-456",
    "timestamp": "2025-11-03T18:35:42Z",
    "ad_url": "https://example.com/ad.jpg",
    "landing_page_url": "https://example.com/landing",
    "overall_score": 87.5,
    "visual_analysis": {
      "color_palette": ["#FF6B35", "#004E89", "#FFFFFF"],
      "composition_score": 85.0,
      "cta_visibility": 90.0,
      ...
    },
    "copywriting_feedback": {
      "message_consistency_score": 78.0,
      "tone_match": true,
      ...
    },
    "brand_compliance": {
      "brand_score": 92.0,
      "prohibited_elements": [],
      ...
    },
    "success": true,
    "processing_time_seconds": 42.3,
    "confidence_level": "High"
  }
}
```

## 📁 Projektstruktur

```
ads-quality-rater/
├── backend/
│   ├── src/
│   │   ├── agents/           # 5 Crew AI Agents
│   │   ├── tools/            # Gemini Vision, Playwright, trafilatura
│   │   ├── models/           # Pydantic-Modelle
│   │   ├── crew/             # Crew-Orchestrierung
│   │   ├── api/              # FastAPI
│   │   ├── utils/            # Logger, Helpers
│   │   └── config/           # Settings
│   ├── tests/
│   │   ├── unit/             # Unit-Tests (13 tests, alle bestanden ✅)
│   │   ├── integration/      # Integration-Tests
│   │   └── e2e/              # End-to-End-Tests
│   ├── config/
│   │   └── brand_guidelines/ # Beispiel-Guidelines
│   ├── requirements.txt
│   └── README.md
├── PLANNING.md               # Detaillierte Implementierungsplanung
├── PRD.md                    # Product Requirements Document
└── README.md                 # Dieses Dokument
```

## 🧪 Test-Status

**Alle Backend-Tests bestanden! ✅**

```
tests/unit/test_models.py ............ 8 passed
tests/unit/test_api.py ............... 5 passed
===================================== 13 passed in 7.32s
```

## 🎨 Brand Guidelines Format

Brand Guidelines können als JSON strukturiert werden:

```json
{
  "brand_name": "YourBrand",
  "tone_of_voice": ["professional", "friendly", "innovative"],
  "prohibited_words": ["cheap", "free", "scam"],
  "color_palette": {
    "primary": "#FF6B35",
    "secondary": "#004E89",
    "accent": "#F7B32B"
  },
  "visual_style": "minimalist, modern, clean",
  "values": ["transparency", "quality", "sustainability"],
  "typography": {
    "allowed_fonts": ["Inter", "Helvetica", "Arial"],
    "prohibited_fonts": ["Comic Sans", "Papyrus"]
  }
}
```

Beispiel: `backend/config/brand_guidelines/example_brand.json`

## 📊 Score-Berechnung

Der Overall Score wird gewichtet berechnet:

```python
overall_score = (
    visual_score * 0.25 +      # 25% Gewicht
    copywriting_score * 0.35 + # 35% Gewicht
    brand_score * 0.40         # 40% Gewicht (höchste Priorität)
)
```

**Confidence Level:**
- **High:** Alle Analysen erfolgreich, keine Fehler
- **Medium:** Einige Warnungen vorhanden
- **Low:** Fehler aufgetreten oder unvollständige Daten

## 🔧 Development

### Code-Style

```bash
# Formatierung mit Black
black src/ tests/

# Linting mit Ruff
ruff check src/ tests/

# Type-Checking mit MyPy
mypy src/
```

### Debugging

Strukturiertes JSON-Logging aktiviert:

```python
from utils.logger import logger

logger.info("Analysis started", ad_url="...", lp_url="...")
logger.error("Scraping failed", error=str(e), url="...")
```

## 🐛 Troubleshooting

### Gemini API Fehler

```bash
# Prüfen ob API Key gesetzt ist
echo $GEMINI_API_KEY

# Testen
python -c "import google.generativeai as genai; genai.configure(api_key='YOUR_KEY'); print('OK')"
```

### Playwright Browser fehlt

```bash
playwright install chromium

# macOS/Linux: System-Dependencies
playwright install-deps chromium
```

### Import-Fehler

```bash
# Python-Path setzen
export PYTHONPATH="${PYTHONPATH}:$(pwd)/backend/src"
```

## 📝 Nächste Schritte

### Für lokale Tests:

1. ✅ **Dependencies installiert**
2. ✅ **Tests bestanden**
3. ⏳ **Server starten:** `uvicorn src.api.main:app --reload`
4. ⏳ **Gemini API Key konfigurieren** in `.env`
5. ⏳ **Erste Analyse durchführen** (siehe API Usage oben)

### Empfohlener Workflow:

#### Backend starten:

```bash
# 1. .env konfigurieren
cp backend/.env.example backend/.env
# Füge deinen Gemini API Key ein

# 2. Backend-Server starten
cd backend
source venv/bin/activate
uvicorn src.api.main:app --reload --port 8000
```

Backend läuft auf: http://localhost:8000
API Docs: http://localhost:8000/docs

#### Frontend starten (neues Terminal):

```bash
cd frontend
npm install
npm run dev
```

Frontend läuft auf: http://localhost:3000

#### Test-Analyse durchführen:

1. Öffne http://localhost:3000 im Browser
2. Gib Ad-URL und LP-URL ein
3. Optional: Brand Guidelines hinzufügen
4. "Analyse starten" klicken
5. Ergebnisse in 30-60 Sekunden

## 📚 Dokumentation

- **PRD.md:** Vollständige Product Requirements
- **PLANNING.md:** Technische Implementierungsplanung
- **backend/README.md:** Backend-spezifische Dokumentation
- **/docs Endpoint:** Swagger UI für API-Dokumentation

## 🤝 Support

- **Issues:** GitHub Issues
- **Docs:** `http://localhost:8000/docs` (wenn Server läuft)
- **Contact:** team@flin.com

## 📄 License

MIT

---

**Status:** ✅ Backend implementiert und getestet
**Nächster Schritt:** API-Key konfigurieren und erste Analysen durchführen
**Letzte Aktualisierung:** November 2025
