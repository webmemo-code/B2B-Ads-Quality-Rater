# 🛠️ PLANNING.md
## KI-basierter Quality Rater mit Crew AI + Brand Agent

**Projekt:** Ads Quality Rater
**Version:** 1.0
**Datum:** November 2025
**Basis:** PRD v1.1

---

## 📋 Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Technologie-Stack](#technologie-stack)
3. [Projektstruktur](#projektstruktur)
4. [Implementierungs-Roadmap](#implementierungs-roadmap)
5. [Agent-Implementierung](#agent-implementierung)
6. [Tool-Implementierung](#tool-implementierung)
7. [Datenmodelle](#datenmodelle)
8. [API-Architektur](#api-architektur)
9. [Frontend-Implementierung](#frontend-implementierung)
10. [Testing-Strategie](#testing-strategie)
11. [Deployment](#deployment)
12. [Monitoring & Logging](#monitoring--logging)

---

## Projektübersicht

### Ziel
Automatisierte Bewertung der Kohärenz und Markenkonformität zwischen Werbeanzeigen (Ads) und zugehörigen Landingpages mit Multi-Agenten-System basierend auf Crew AI.

### Kernfunktionalität
- **Visuelle Analyse** von Ads (Gemini 2.5 Flash Vision)
- **Landingpage-Scraping** (Playwright)
- **Copywriting-Bewertung** (Message Match, Tonalität)
- **Brand-Compliance-Prüfung** (CI/CD-Konformität)
- **Report-Synthese** (strukturierter JSON-Output)

---

## Technologie-Stack

### Backend
| Komponente | Technologie | Version | Zweck |
|------------|-------------|---------|-------|
| Framework | Crew AI | latest | Multi-Agenten-Orchestrierung |
| LLM & Vision | Gemini 2.5 Flash | latest | Text- und Bildanalyse |
| API | FastAPI | ^0.115.0 | REST API |
| Scraping | Playwright | ^1.48.0 | Dynamisches Browser-Scraping |
| HTML Parser | trafilatura | ^1.12.0 | Schneller Text-Extraktor |
| Validation | Pydantic | ^2.9.0 | Schema-Validierung |
| Environment | python-dotenv | ^1.0.0 | Config Management |

### Frontend
| Komponente | Technologie | Version | Zweck |
|------------|-------------|---------|-------|
| Framework | Next.js | 14.x | React-Framework |
| Styling | Tailwind CSS | 3.x | Utility-First CSS |
| UI Components | shadcn/ui | latest | Komponentenbibliothek |
| State Management | Zustand | latest | Leichtgewichtiges State Management |
| API Client | Axios | latest | HTTP Client |

### DevOps & Cloud
- **Deployment:** Google Cloud Run
- **CI/CD:** GitHub Actions
- **Logging:** Google Cloud Logging
- **Monitoring:** Google Cloud Monitoring

---

## Projektstruktur

```
ads-quality-rater/
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   │   ├── __init__.py
│   │   │   ├── ad_visual_analyst.py
│   │   │   ├── landing_page_scraper.py
│   │   │   ├── copywriting_expert.py
│   │   │   ├── brand_consistency_agent.py
│   │   │   └── quality_rating_synthesizer.py
│   │   ├── tools/
│   │   │   ├── __init__.py
│   │   │   ├── gemini_vision_tool.py
│   │   │   ├── playwright_scraping_tool.py
│   │   │   └── trafilatura_tool.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── ad_quality_report.py
│   │   │   ├── brand_compliance.py
│   │   │   └── copywriting_feedback.py
│   │   ├── crew/
│   │   │   ├── __init__.py
│   │   │   ├── crew.py
│   │   │   ├── tasks.yaml
│   │   │   └── agents.yaml
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   └── analysis.py
│   │   │   └── middleware/
│   │   │       ├── __init__.py
│   │   │       └── error_handler.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── logger.py
│   │       └── validators.py
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── config/
│   │   ├── brand_guidelines/
│   │   │   └── example_brand.json
│   │   └── settings.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── pyproject.toml
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── analysis/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── AnalysisForm.tsx
│   │   │   ├── ResultsView.tsx
│   │   │   ├── BrandComplianceTab.tsx
│   │   │   ├── CopywritingTab.tsx
│   │   │   └── VisualTab.tsx
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── types.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
├── docs/
│   ├── PLANNING.md (dieses Dokument)
│   ├── PRD.md
│   ├── API.md
│   └── ARCHITECTURE.md
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── frontend-ci.yml
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## Implementierungs-Roadmap

### Phase 1: Foundation & Setup (Woche 1-2)
- [ ] **1.1 Projekt-Setup**
  - [ ] Repository initialisieren
  - [ ] Backend-Struktur aufsetzen (Poetry/pip)
  - [ ] Frontend-Struktur aufsetzen (Next.js)
  - [ ] Docker & docker-compose konfigurieren
  - [ ] Environment-Variablen definieren (.env.example)

- [ ] **1.2 Basis-Infrastruktur**
  - [ ] Gemini API-Integration testen
  - [ ] Playwright Setup & Browser-Installation
  - [ ] FastAPI Basis-Server aufsetzen
  - [ ] Health-Check-Endpoint implementieren

### Phase 2: Core Agents & Tools (Woche 3-5)
- [ ] **2.1 Tools implementieren**
  - [ ] `GeminiVisionTool` (Image-Analyse)
  - [ ] `PlaywrightScrapingTool` (Landingpage-Scraping)
  - [ ] `TrafilaturaParserTool` (Fast-Path HTML-Parsing)

- [ ] **2.2 Agents implementieren**
  - [ ] `Ad_Visual_Analyst`
  - [ ] `Landing_Page_Scraper`
  - [ ] `Copywriting_Expert`
  - [ ] `Brand_Consistency_Agent`
  - [ ] `Quality_Rating_Synthesizer`

- [ ] **2.3 Crew-Konfiguration**
  - [ ] `agents.yaml` erstellen
  - [ ] `tasks.yaml` erstellen
  - [ ] Crew-Orchestrator implementieren
  - [ ] Sequential-Process mit Context-Dependencies

### Phase 3: Datenmodelle & API (Woche 6-7)
- [ ] **3.1 Pydantic-Modelle**
  - [ ] `BrandCompliance`
  - [ ] `CopywritingFeedback`
  - [ ] `VisualAnalysis`
  - [ ] `AdQualityReport`

- [ ] **3.2 API-Entwicklung**
  - [ ] POST `/api/v1/analyze` (Haupt-Endpoint)
  - [ ] GET `/api/v1/analysis/{id}` (Abruf bestehender Analysen)
  - [ ] GET `/api/v1/health` (System-Status)
  - [ ] Error-Handling & Logging-Middleware

### Phase 4: Frontend (Woche 8-9)
- [ ] **4.1 UI-Komponenten**
  - [ ] Analyse-Formular (Input: Ad-URL, LP-URL, Guidelines)
  - [ ] Loading-State & Progress-Indicator
  - [ ] Resultat-Ansicht (Tabs: Branding, Copywriting, Visuell)
  - [ ] Score-Visualisierung (Charts)

- [ ] **4.2 Features**
  - [ ] Export-Funktionen (PDF, JSON, CSV)
  - [ ] Verlaufs-Ansicht (alle bisherigen Analysen)
  - [ ] Vergleichs-Modus (2+ Analysen nebeneinander)

### Phase 5: Testing & Quality Assurance (Woche 10-11)
- [ ] **5.1 Unit-Tests**
  - [ ] Tools (Mocking von Gemini/Playwright)
  - [ ] Agents (Isolierte Logik)
  - [ ] API-Endpoints

- [ ] **5.2 Integration-Tests**
  - [ ] End-to-End Crew-Workflow
  - [ ] API → Crew → Response Flow

- [ ] **5.3 E2E-Tests**
  - [ ] Frontend → Backend Integration
  - [ ] Real-World-Szenarien mit echten Ads/LPs

### Phase 6: Deployment & Go-Live (Woche 12)
- [ ] **6.1 Cloud-Setup**
  - [ ] Google Cloud Run Konfiguration
  - [ ] Cloud Logging & Monitoring
  - [ ] Secrets Management (API-Keys)

- [ ] **6.2 CI/CD**
  - [ ] GitHub Actions für Backend
  - [ ] GitHub Actions für Frontend
  - [ ] Automated Tests in Pipeline

- [ ] **6.3 Beta-Launch**
  - [ ] Internal Testing mit flin-Team
  - [ ] Human-in-the-Loop Review
  - [ ] Performance-Benchmarking

---

## Agent-Implementierung

### 1. Ad_Visual_Analyst

**Ziel:** Visuelle Analyse des Ad-Creatives

```python
# backend/src/agents/ad_visual_analyst.py

from crewai import Agent
from tools.gemini_vision_tool import GeminiVisionTool

class AdVisualAnalyst:
    def create(self):
        return Agent(
            role='Ad Visual Analyst',
            goal='Analysiere visuelle Elemente, Tonalität und Botschaft des Werbematerials',
            backstory="""Du bist Expert:in für visuelle Kommunikation mit
            Spezialisierung auf digitale Werbung. Du erkennst subtile
            Farb-, Form- und Kompositions-Nuancen.""",
            tools=[GeminiVisionTool()],
            verbose=True,
            allow_delegation=False
        )
```

**Wichtige Analysepunkte:**
- Farbpalette & Kontraste
- Bildkomposition & Hierarchie
- Emotionale Tonalität
- Call-to-Action Sichtbarkeit
- Logo-Platzierung

### 2. Landing_Page_Scraper

**Ziel:** Vollständiger Text-Extrakt der Landingpage

```python
# backend/src/agents/landing_page_scraper.py

from crewai import Agent
from tools.playwright_scraping_tool import PlaywrightScrapingTool
from tools.trafilatura_tool import TrafilaturaParserTool

class LandingPageScraper:
    def create(self):
        return Agent(
            role='Landing Page Scraper',
            goal='Extrahiere strukturierten Text-Content von Landingpages',
            backstory="""Du bist spezialisiert auf robustes Web-Scraping,
            inklusive dynamischer Inhalte, Cookie-Banner und komplexer
            JavaScript-Anwendungen.""",
            tools=[
                PlaywrightScrapingTool(),
                TrafilaturaParserTool()
            ],
            verbose=True,
            allow_delegation=False
        )
```

**Herausforderungen & Lösungen:**
- **Cookie-Banner:** Automatisches Akzeptieren via Playwright-Selektoren
- **Lazy-Loading:** Scroll-to-Bottom vor Extraktion
- **SPA-Seiten:** Wait-for-Network-Idle
- **Fallback:** trafilatura für statische Seiten (Fast-Path)

### 3. Copywriting_Expert

**Ziel:** Semantische Analyse & Message Match

```python
# backend/src/agents/copywriting_expert.py

from crewai import Agent

class CopywritingExpert:
    def create(self):
        return Agent(
            role='Copywriting Expert',
            goal='Bewerte Message Match, Tonalität und Persuasion zwischen Ad und LP',
            backstory="""Du bist Senior Copywriter:in mit Erfahrung in
            Direct-Response-Marketing. Du erkennst persuasive Muster,
            Tonalitäts-Shifts und semantische Inkonsistenzen.""",
            tools=[],  # Verwendet direkt Gemini 2.5 Flash
            verbose=True,
            allow_delegation=False,
            llm='gemini/gemini-2.5-flash'
        )
```

**Bewertungskriterien:**
- **Message Consistency:** Stimmen Value Proposition und Claims überein?
- **Tone Match:** Bleibt die emotionale Ansprache konsistent?
- **CTA Alignment:** Führt der Ad-CTA zur erwarteten LP-Aktion?
- **Pain Point Coverage:** Werden im Ad erwähnte Probleme auf der LP adressiert?

### 4. Brand_Consistency_Agent

**Ziel:** CI/CD-Konformität prüfen

```python
# backend/src/agents/brand_consistency_agent.py

from crewai import Agent

class BrandConsistencyAgent:
    def create(self):
        return Agent(
            role='Brand Consistency Agent',
            goal='Prüfe visuelle und textliche Markenkonformität gemäss Guidelines',
            backstory="""Du bist Brand Manager:in mit tiefem Verständnis
            für Corporate Identity. Du erkennst Verstösse gegen Tonalität,
            Farbwelt, Typografie und Markenwerte.""",
            tools=[],
            verbose=True,
            allow_delegation=False,
            llm='gemini/gemini-2.5-flash'
        )
```

**Brand-Guideline-Input:**
```json
{
  "brand_name": "flin",
  "tone_of_voice": ["professionell", "zugänglich", "innovativ"],
  "prohibited_words": ["billig", "Schnäppchen"],
  "color_palette": {
    "primary": "#FF6B35",
    "secondary": "#004E89"
  },
  "visual_style": "minimalistisch, hell, kontrastreich",
  "values": ["Transparenz", "Qualität", "Nachhaltigkeit"]
}
```

### 5. Quality_Rating_Synthesizer

**Ziel:** Aggregation aller Ergebnisse

```python
# backend/src/agents/quality_rating_synthesizer.py

from crewai import Agent
from models.ad_quality_report import AdQualityReport

class QualityRatingSynthesizer:
    def create(self):
        return Agent(
            role='Quality Rating Synthesizer',
            goal='Erstelle strukturierten AdQualityReport aus allen Agent-Ergebnissen',
            backstory="""Du bist Daten-Analyst:in mit Fokus auf strukturierte
            Berichterstellung. Du aggregierst qualitative Insights in
            quantitative Metriken.""",
            tools=[],
            verbose=True,
            allow_delegation=False,
            llm='gemini/gemini-2.5-flash'
        )
```

---

## Tool-Implementierung

### 1. GeminiVisionTool

**Zweck:** Bildanalyse mit Gemini 2.5 Flash

```python
# backend/src/tools/gemini_vision_tool.py

from crewai_tools import BaseTool
import google.generativeai as genai
from PIL import Image
import requests
from io import BytesIO

class GeminiVisionTool(BaseTool):
    name: str = "Gemini Vision Analyzer"
    description: str = """Analysiert Bilder mit Gemini 2.5 Flash Vision.
    Input: Bild-URL oder lokaler Pfad.
    Output: Strukturierte Analyse (JSON)."""

    def _run(self, image_url: str, prompt: str) -> dict:
        # Bild laden
        if image_url.startswith('http'):
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content))
        else:
            image = Image.open(image_url)

        # Gemini API
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content([prompt, image])

        return {
            'analysis': response.text,
            'image_url': image_url
        }
```

**Optimierungen:**
- **Caching:** Hash-basiertes Caching bereits analysierter Ads
- **Retry-Logic:** Max. 3 Versuche bei Timeout
- **Error-Handling:** Graceful Fallback bei nicht erreichbaren Bildern

### 2. PlaywrightScrapingTool

**Zweck:** Robustes Scraping dynamischer Landingpages

```python
# backend/src/tools/playwright_scraping_tool.py

from crewai_tools import BaseTool
from playwright.sync_api import sync_playwright
import trafilatura

class PlaywrightScrapingTool(BaseTool):
    name: str = "Playwright Landingpage Scraper"
    description: str = """Scraped vollständigen Text-Content von Landingpages.
    Unterstützt JavaScript, Cookie-Banner, Lazy-Loading."""

    def _run(self, url: str) -> dict:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            try:
                # Seite laden
                page.goto(url, wait_until='networkidle', timeout=30000)

                # Cookie-Banner handling
                cookie_selectors = [
                    'button:has-text("Accept")',
                    'button:has-text("Akzeptieren")',
                    '#onetrust-accept-btn-handler'
                ]
                for selector in cookie_selectors:
                    try:
                        page.click(selector, timeout=2000)
                        break
                    except:
                        continue

                # Scroll to bottom (Lazy-Loading)
                page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
                page.wait_for_timeout(2000)

                # HTML extrahieren
                html = page.content()

                # Text mit trafilatura parsen
                text = trafilatura.extract(html, include_comments=False)

                return {
                    'url': url,
                    'text': text,
                    'success': True
                }

            except Exception as e:
                return {
                    'url': url,
                    'error': str(e),
                    'success': False
                }
            finally:
                browser.close()
```

**Fehlerbehandlung:**
- **Timeout:** Fallback zu trafilatura-only (ohne Browser)
- **Bot-Detection:** User-Agent Rotation
- **CAPTCHA:** Logging + Human-in-the-Loop Hinweis

### 3. TrafilaturaParserTool

**Zweck:** Fast-Path für statische Seiten

```python
# backend/src/tools/trafilatura_tool.py

from crewai_tools import BaseTool
import trafilatura
import requests

class TrafilaturaParserTool(BaseTool):
    name: str = "Trafilatura Fast Parser"
    description: str = """Schneller Text-Extraktor für statische HTML-Seiten."""

    def _run(self, url: str) -> dict:
        try:
            downloaded = trafilatura.fetch_url(url)
            text = trafilatura.extract(downloaded, include_comments=False)

            return {
                'url': url,
                'text': text,
                'success': True
            }
        except Exception as e:
            return {
                'url': url,
                'error': str(e),
                'success': False
            }
```

---

## Datenmodelle

### BrandCompliance

```python
# backend/src/models/brand_compliance.py

from pydantic import BaseModel, Field
from typing import List

class BrandCompliance(BaseModel):
    brand_score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Gesamtscore Markenkonformität (0-100)"
    )
    tone_alignment: str = Field(
        ...,
        description="Bewertung der Tonalitäts-Übereinstimmung"
    )
    visual_alignment: str = Field(
        ...,
        description="Bewertung der visuellen Markenkonformität"
    )
    prohibited_elements: List[str] = Field(
        default_factory=list,
        description="Liste erkannter Verstösse (z.B. verbotene Wörter)"
    )
    improvement_suggestions: List[str] = Field(
        default_factory=list,
        description="Konkrete Verbesserungsvorschläge"
    )
    guideline_coverage: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Prozent der Guidelines, die geprüft werden konnten"
    )
```

### CopywritingFeedback

```python
# backend/src/models/copywriting_feedback.py

from pydantic import BaseModel, Field
from typing import Optional

class CopywritingFeedback(BaseModel):
    message_consistency_score: float = Field(..., ge=0.0, le=100.0)
    tone_match: bool = Field(..., description="Stimmt die Tonalität überein?")
    cta_alignment: str = Field(..., description="Bewertung CTA-Konsistenz")
    pain_point_coverage: str = Field(..., description="Coverage der Pain Points")
    persuasion_quality: str = Field(..., description="Qualität der Überzeugungsarbeit")
    improvement_suggestions: list[str] = Field(default_factory=list)
```

### VisualAnalysis

```python
# backend/src/models/visual_analysis.py

from pydantic import BaseModel, Field
from typing import List, Dict

class VisualAnalysis(BaseModel):
    color_palette: List[str] = Field(
        default_factory=list,
        description="Erkannte Hauptfarben (Hex-Codes)"
    )
    composition_quality: str = Field(..., description="Bewertung der Bildkomposition")
    emotional_tone: str = Field(..., description="Emotionale Wirkung")
    cta_visibility: float = Field(..., ge=0.0, le=100.0)
    brand_element_presence: Dict[str, bool] = Field(
        default_factory=dict,
        description="Präsenz von Logo, Slogan, etc."
    )
```

### AdQualityReport (Haupt-Output)

```python
# backend/src/models/ad_quality_report.py

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .brand_compliance import BrandCompliance
from .copywriting_feedback import CopywritingFeedback
from .visual_analysis import VisualAnalysis

class AdQualityReport(BaseModel):
    # Metadaten
    report_id: str = Field(..., description="Eindeutige Report-ID")
    timestamp: datetime = Field(default_factory=datetime.now)
    ad_url: str
    landing_page_url: str

    # Scores
    overall_score: float = Field(..., ge=0.0, le=100.0)

    # Detailanalysen
    visual_analysis: VisualAnalysis
    copywriting_feedback: CopywritingFeedback
    brand_compliance: BrandCompliance

    # Status & Fehler
    success: bool = Field(default=True)
    errors: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)

    # Processing-Info
    processing_time_seconds: float
    confidence_level: str = Field(
        ...,
        description="High, Medium, Low"
    )
```

---

## API-Architektur

### FastAPI Main Server

```python
# backend/src/api/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Optional
import uuid
from datetime import datetime

from crew.crew import AdQualityRaterCrew
from models.ad_quality_report import AdQualityReport

app = FastAPI(
    title="Ads Quality Rater API",
    version="1.0.0",
    description="KI-basierte Bewertung von Ad-LP-Kohärenz und Markenkonformität"
)

# CORS für Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request-Modell
class AnalysisRequest(BaseModel):
    ad_url: HttpUrl
    landing_page_url: HttpUrl
    brand_guidelines: Optional[dict] = None
    target_audience: Optional[str] = None

# Response-Modell
class AnalysisResponse(BaseModel):
    analysis_id: str
    status: str
    report: Optional[AdQualityReport] = None

@app.post("/api/v1/analyze", response_model=AnalysisResponse)
async def analyze_ad(request: AnalysisRequest):
    """
    Haupt-Endpoint: Startet Crew AI Analyse
    """
    analysis_id = str(uuid.uuid4())

    try:
        # Crew initialisieren
        crew = AdQualityRaterCrew(
            ad_url=str(request.ad_url),
            landing_page_url=str(request.landing_page_url),
            brand_guidelines=request.brand_guidelines or {},
            target_audience=request.target_audience
        )

        # Analyse starten
        result = crew.kickoff()

        return AnalysisResponse(
            analysis_id=analysis_id,
            status="completed",
            report=result
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}
```

### Endpoint-Übersicht

| Methode | Endpoint | Beschreibung | Auth |
|---------|----------|--------------|------|
| POST | `/api/v1/analyze` | Startet neue Analyse | API-Key |
| GET | `/api/v1/analysis/{id}` | Abrufen bestehender Analyse | API-Key |
| GET | `/health` | System-Status | Public |
| GET | `/api/v1/history` | Alle bisherigen Analysen | API-Key |

---

## Frontend-Implementierung

### Analyse-Formular

```tsx
// frontend/src/components/AnalysisForm.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { analyzeAd } from '@/lib/api';
import type { AdQualityReport } from '@/lib/types';

export default function AnalysisForm() {
  const [adUrl, setAdUrl] = useState('');
  const [lpUrl, setLpUrl] = useState('');
  const [brandGuidelines, setBrandGuidelines] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdQualityReport | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const guidelines = brandGuidelines
        ? JSON.parse(brandGuidelines)
        : undefined;

      const response = await analyzeAd({
        ad_url: adUrl,
        landing_page_url: lpUrl,
        brand_guidelines: guidelines,
      });

      setResult(response.report);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Ad-URL
          </label>
          <Input
            type="url"
            value={adUrl}
            onChange={(e) => setAdUrl(e.target.value)}
            placeholder="https://example.com/ad-image.jpg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Landingpage-URL
          </label>
          <Input
            type="url"
            value={lpUrl}
            onChange={(e) => setLpUrl(e.target.value)}
            placeholder="https://example.com/landing-page"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Brand Guidelines (JSON, optional)
          </label>
          <Textarea
            value={brandGuidelines}
            onChange={(e) => setBrandGuidelines(e.target.value)}
            placeholder='{"tone_of_voice": ["professionell"], ...}'
            rows={4}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Analyse läuft...' : 'Analyse starten'}
        </Button>
      </form>

      {result && <ResultsView report={result} />}
    </div>
  );
}
```

### Resultat-Ansicht

```tsx
// frontend/src/components/ResultsView.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import type { AdQualityReport } from '@/lib/types';
import BrandComplianceTab from './BrandComplianceTab';
import CopywritingTab from './CopywritingTab';
import VisualTab from './VisualTab';

interface ResultsViewProps {
  report: AdQualityReport;
}

export default function ResultsView({ report }: ResultsViewProps) {
  return (
    <div className="mt-8">
      {/* Overall Score */}
      <Card className="p-6 mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Gesamtscore</h2>
          <div className="text-6xl font-bold text-blue-600">
            {report.overall_score.toFixed(1)}
          </div>
          <p className="text-sm text-gray-500 mt-2">von 100 Punkten</p>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="branding">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="copywriting">Copywriting</TabsTrigger>
          <TabsTrigger value="visual">Visuell</TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <BrandComplianceTab data={report.brand_compliance} />
        </TabsContent>

        <TabsContent value="copywriting">
          <CopywritingTab data={report.copywriting_feedback} />
        </TabsContent>

        <TabsContent value="visual">
          <VisualTab data={report.visual_analysis} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Testing-Strategie

### Unit-Tests

```python
# backend/tests/unit/test_tools.py

import pytest
from unittest.mock import Mock, patch
from tools.gemini_vision_tool import GeminiVisionTool

class TestGeminiVisionTool:
    @patch('google.generativeai.GenerativeModel')
    def test_image_analysis(self, mock_model):
        # Mock Gemini response
        mock_response = Mock()
        mock_response.text = '{"colors": ["#FF0000"], "tone": "energetic"}'
        mock_model.return_value.generate_content.return_value = mock_response

        # Tool ausführen
        tool = GeminiVisionTool()
        result = tool._run(
            image_url="https://example.com/ad.jpg",
            prompt="Analyze this ad"
        )

        assert 'analysis' in result
        assert result['image_url'] == "https://example.com/ad.jpg"
```

### Integration-Tests

```python
# backend/tests/integration/test_crew_workflow.py

import pytest
from crew.crew import AdQualityRaterCrew

class TestCrewWorkflow:
    @pytest.mark.asyncio
    async def test_full_analysis_workflow(self):
        crew = AdQualityRaterCrew(
            ad_url="https://example.com/test-ad.jpg",
            landing_page_url="https://example.com/test-lp",
            brand_guidelines={"tone_of_voice": ["professional"]}
        )

        result = crew.kickoff()

        assert result is not None
        assert hasattr(result, 'overall_score')
        assert 0 <= result.overall_score <= 100
        assert result.success is True
```

### E2E-Tests

```typescript
// frontend/tests/e2e/analysis.spec.ts

import { test, expect } from '@playwright/test';

test('complete analysis flow', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Fill form
  await page.fill('input[name="ad_url"]', 'https://example.com/ad.jpg');
  await page.fill('input[name="landing_page_url"]', 'https://example.com');

  // Submit
  await page.click('button[type="submit"]');

  // Wait for results
  await page.waitForSelector('.results-view', { timeout: 60000 });

  // Verify score is displayed
  const score = await page.textContent('.overall-score');
  expect(parseFloat(score)).toBeGreaterThanOrEqual(0);
  expect(parseFloat(score)).toBeLessThanOrEqual(100);
});
```

---

## Deployment

### Docker-Setup

```dockerfile
# backend/Dockerfile

FROM python:3.11-slim

WORKDIR /app

# System dependencies (für Playwright)
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Playwright browsers installieren
RUN playwright install chromium
RUN playwright install-deps chromium

# App code
COPY src/ ./src/
COPY config/ ./config/

# Environment
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

EXPOSE 8000

CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Google Cloud Run Deployment

```yaml
# .github/workflows/deploy-backend.yml

name: Deploy Backend to Cloud Run

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Google Cloud
        uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}

      - name: Build and Push Docker Image
        run: |
          cd backend
          gcloud builds submit --tag gcr.io/${{ secrets.GCP_PROJECT_ID }}/ads-quality-rater

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ads-quality-rater \
            --image gcr.io/${{ secrets.GCP_PROJECT_ID }}/ads-quality-rater \
            --platform managed \
            --region europe-west1 \
            --allow-unauthenticated \
            --set-env-vars GEMINI_API_KEY=${{ secrets.GEMINI_API_KEY }}
```

---

## Monitoring & Logging

### Strukturiertes Logging

```python
# backend/src/utils/logger.py

import logging
import json
from datetime import datetime

class StructuredLogger:
    def __init__(self, name: str):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)

        handler = logging.StreamHandler()
        handler.setFormatter(logging.Formatter('%(message)s'))
        self.logger.addHandler(handler)

    def log(self, level: str, message: str, **kwargs):
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'level': level,
            'message': message,
            **kwargs
        }
        self.logger.info(json.dumps(log_entry))

# Usage
logger = StructuredLogger('ads_quality_rater')
logger.log('INFO', 'Analysis started', analysis_id='123', ad_url='...')
```

### Metriken-Tracking

```python
# backend/src/utils/metrics.py

from prometheus_client import Counter, Histogram, Gauge

# Counters
analyses_total = Counter(
    'analyses_total',
    'Total number of analyses performed'
)

analyses_failed = Counter(
    'analyses_failed',
    'Total number of failed analyses'
)

# Histograms
processing_time = Histogram(
    'processing_time_seconds',
    'Time spent processing analysis'
)

# Gauges
active_analyses = Gauge(
    'active_analyses',
    'Number of currently running analyses'
)
```

---

## Nächste Schritte

### Sofort (Woche 1)
1. Repository aufsetzen
2. Backend-Struktur erstellen
3. Gemini API-Zugang konfigurieren
4. Erste Tool-Implementierung (GeminiVisionTool)

### Kurzfristig (Woche 2-4)
1. Alle 5 Agents implementieren
2. Crew-Workflow testen (sequential process)
3. API-Endpoints fertigstellen
4. Erste Frontend-Version (MVP)

### Mittelfristig (Woche 5-8)
1. Vollständige Pydantic-Modelle
2. Frontend UI-Komponenten
3. Testing-Suite aufbauen
4. Brand-Guidelines-Templates erstellen

### Langfristig (Woche 9-12)
1. Production-Deployment auf Cloud Run
2. CI/CD-Pipeline
3. Monitoring & Alerting
4. Beta-Testing mit echten Kund:innen

---

## Offene Fragen & Entscheidungen

### Technisch
- [ ] **API-Keys-Management:** Vault vs. Google Secret Manager?
- [ ] **Rate-Limiting:** Wie viele parallele Analysen erlauben?
- [ ] **Caching-Strategie:** Redis vs. In-Memory?
- [ ] **Export-Formate:** PDF-Generator-Library wählen

### Produkt
- [ ] **Human-in-the-Loop:** Bei welchen Confidence-Scores HITL triggern?
- [ ] **Brand-Guidelines:** Template vs. freie Eingabe?
- [ ] **Pricing-Modell:** Pro Analyse oder Subscription?

### Business
- [ ] **Beta-Test-Partner:innen:** Welche Agenturen/Marken?
- [ ] **SLA-Definitionen:** 99% Uptime, < 60s Processing?
- [ ] **Support-Strategie:** Self-Service vs. Premium-Support?

---

**Letzte Aktualisierung:** November 2025
**Nächstes Review:** Bei Start Phase 3
**Kontakt:** team@flin.com
