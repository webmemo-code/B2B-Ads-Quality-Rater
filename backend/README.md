# Ads Quality Rater Backend

KI-basierter Quality Rater mit Crew AI + Brand Agent für automatisierte Bewertung von Ad-LP-Kohärenz und Markenkonformität.

## Features

- 🎨 **Visuelle Ad-Analyse** mit Gemini 2.0 Flash Vision
- 🌐 **Landingpage-Scraping** mit Playwright (dynamische Seiten)
- ✍️ **Copywriting-Bewertung** (Message Match, Tonalität)
- 🏷️ **Brand-Compliance-Prüfung** gegen Guidelines
- 📊 **Strukturierte Reports** als JSON (Pydantic-validiert)

## Architektur

### Multi-Agent-System (Crew AI)

```
1. Ad_Visual_Analyst → Analysiert Werbemotiv
2. Landing_Page_Scraper → Extrahiert LP-Text
3. Copywriting_Expert → Bewertet Message Match
4. Brand_Consistency_Agent → Prüft Brand-Konformität
5. Quality_Rating_Synthesizer → Erstellt finalen Report
```

### Tech Stack

- **Framework:** Crew AI (Multi-Agenten-Orchestrierung)
- **LLM:** Gemini 2.0 Flash (Text + Vision)
- **API:** FastAPI
- **Scraping:** Playwright + trafilatura
- **Validation:** Pydantic 2.x

## Setup

### 1. Voraussetzungen

- Python 3.11+
- Gemini API Key (https://makersuite.google.com/app/apikey)

### 2. Installation

```bash
# Virtual Environment erstellen
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
# oder: venv\Scripts\activate  # Windows

# Dependencies installieren
pip install -r requirements.txt

# Playwright Browser installieren
playwright install chromium
```

### 3. Environment-Variablen

```bash
# .env erstellen
cp .env.example .env

# Gemini API Key eintragen
# Öffne .env und füge deinen API Key ein:
GEMINI_API_KEY=your-actual-api-key-here
```

### 4. Erste Tests

```bash
# Unit-Tests ausführen
pytest tests/unit -v

# Alle Tests
pytest tests/ -v

# Mit Coverage
pytest --cov=src --cov-report=html
```

### 5. Server starten

```bash
# Development-Server
uvicorn src.api.main:app --reload --port 8000

# Server läuft auf: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## API Usage

### Health Check

```bash
curl http://localhost:8000/health
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
      "prohibited_words": ["cheap"],
      "color_palette": {
        "primary": "#FF6B35"
      }
    }
  }'
```

### Response Format

```json
{
  "analysis_id": "abc-123-def",
  "status": "completed",
  "report": {
    "report_id": "abc-123-def",
    "timestamp": "2025-11-03T14:30:00Z",
    "overall_score": 87.5,
    "visual_analysis": { ... },
    "copywriting_feedback": { ... },
    "brand_compliance": { ... },
    "success": true,
    "processing_time_seconds": 42.3,
    "confidence_level": "High"
  }
}
```

## Brand Guidelines Format

Brand Guidelines sollten als JSON strukturiert sein:

```json
{
  "brand_name": "YourBrand",
  "tone_of_voice": ["professional", "friendly"],
  "prohibited_words": ["cheap", "free"],
  "color_palette": {
    "primary": "#FF6B35",
    "secondary": "#004E89"
  },
  "visual_style": "minimalist, modern",
  "values": ["transparency", "quality"]
}
```

Beispiel: `config/brand_guidelines/example_brand.json`

## Development

### Code-Style

```bash
# Formatierung mit Black
black src/ tests/

# Linting mit Ruff
ruff check src/ tests/
```

### Testing

```bash
# Unit-Tests (schnell, kein API-Key nötig)
pytest tests/unit -v

# Alle Tests
pytest tests/ -v

# Spezifischer Test
pytest tests/unit/test_models.py::TestVisualAnalysis::test_valid_visual_analysis -v

# Coverage-Report
pytest --cov=src --cov-report=html
open htmlcov/index.html
```

### Logging

Strukturiertes JSON-Logging:

```python
from utils.logger import logger

logger.info("Analysis started", ad_url="...", lp_url="...")
```

## Troubleshooting

### Playwright Browser nicht installiert

```bash
playwright install chromium
playwright install-deps chromium  # Linux: System-Dependencies
```

### Gemini API Fehler

```bash
# API Key prüfen
echo $GEMINI_API_KEY

# Key in .env setzen
GEMINI_API_KEY=your-key-here

# Testen
python -c "import google.generativeai as genai; genai.configure(api_key='YOUR_KEY'); print('OK')"
```

### Import-Fehler

```bash
# Sicherstellen, dass src/ im Python-Path ist
export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"

# Oder in Code:
import sys
sys.path.insert(0, 'src')
```

## Projektstruktur

```
backend/
├── src/
│   ├── agents/           # 5 Crew AI Agents
│   ├── tools/            # Gemini Vision, Playwright, trafilatura
│   ├── models/           # Pydantic-Modelle
│   ├── crew/             # Crew-Orchestrierung
│   ├── api/              # FastAPI
│   ├── utils/            # Logger, Helpers
│   └── config/           # Settings
├── tests/
│   ├── unit/             # Unit-Tests
│   ├── integration/      # Integration-Tests
│   └── e2e/              # End-to-End-Tests
├── config/
│   └── brand_guidelines/ # Beispiel-Guidelines
├── requirements.txt
├── pyproject.toml
└── README.md
```

## Performance

- **Analyse-Dauer:** < 60 Sekunden (Ziel)
- **Concurrent Requests:** 10+ parallel möglich
- **Gemini API:** Rate-Limits beachten (siehe Google Cloud Console)

## Nächste Schritte

1. ✅ Tests lokal ausführen
2. ✅ Server starten und testen
3. ⏳ Echte Ad-LP-Kombinationen analysieren
4. ⏳ Brand Guidelines anpassen
5. ⏳ Frontend integrieren

## Support

- **Issues:** https://github.com/your-org/ads-quality-rater/issues
- **Docs:** `/docs` Endpoint (Swagger UI)
- **Contact:** team@flin.com

## License

MIT
