# 🎯 Product Requirements Document (PRD)
## KI-basierter Quality Rater mit Crew AI + Brand Agent

**Projekt:** Ads Quality Rater
**Version:** 1.1
**Datum:** November 2025
**Autor:innen:** Nic & Team flin
**LLM Stack:** Gemini 2.5 Flash (Text + Vision)

---

## 📑 Inhaltsverzeichnis

1. [Executive Summary](#executive-summary)
2. [Ziele & Erfolgsmetriken](#ziele--erfolgsmetriken)
3. [Nutzer:innen & Use Cases](#nutzerinnen--use-cases)
4. [Funktionale Anforderungen](#funktionale-anforderungen)
5. [Nicht-funktionale Anforderungen](#nicht-funktionale-anforderungen)
6. [Systemarchitektur](#systemarchitektur)
7. [Datenmodell](#datenmodell)
8. [User Experience & Interface](#user-experience--interface)
9. [Testing-Strategie](#testing-strategie)
10. [Deployment-Strategie](#deployment-strategie)
11. [Risiken & Mitigation](#risiken--mitigation)
12. [Roadmap & Meilensteine](#roadmap--meilensteine)
13. [Offene Fragen](#offene-fragen)

---

## 1. Executive Summary

### Vision
Der **Quality Rater** ist ein KI-basiertes System zur automatisierten Bewertung der Konsistenz und Markenkonformität zwischen Werbeanzeigen und ihren zugehörigen Landingpages. Das System entwickelt sich von einer reinen Conversion-Kohärenz-Prüfung zu einem **Brand Integrity Framework**, das Tonalität, Bildsprache, Claims und Markenwerte auf Einhaltung der Markenrichtlinien überprüft.

### Problemstellung
Marketing-Teams und Agenturen investieren Millionen in digitale Werbung, haben aber keine objektive, skalierbare Methode zur Qualitätssicherung. Manuelle Reviews sind:
- **Zeitaufwendig** (30-60 Min pro Ad-LP-Kombination)
- **Inkonsistent** (subjektive Bewertungen)
- **Nicht skalierbar** (bei 100+ Kampagnen/Monat)
- **Teuer** (hohe Personalkosten)

### Lösung
Ein Multi-Agenten-System basierend auf **Crew AI**, das:
1. ✅ Werbeanzeigen visuell analysiert (Gemini 2.5 Flash Vision)
2. ✅ Landingpages vollständig erfasst (Playwright Scraping)
3. ✅ Copywriting auf Message Match prüft (LLM-gestützt)
4. ✅ Markenkonformität bewertet (Brand Consistency Agent)
5. ✅ Strukturierte, nachvollziehbare Reports generiert (Pydantic)

### Geschäftswert
- **60-90% Zeitersparnis** bei Ad-Quality-Checks
- **Objektive, reproduzierbare Scores** für Benchmarking
- **Frühwarnsystem** für Brand-Compliance-Verstöße
- **Integration** in bestehende Marketing-Review-Prozesse

---

## 2. Ziele & Erfolgsmetriken

### 🎯 Primärziele

| Ziel | Beschreibung | Erfolgskriterium |
|------|--------------|------------------|
| **Automatisierung** | Vollautomatische Analyse ohne manuelle Intervention | > 95% der Analysen ohne Human-in-the-Loop |
| **Genauigkeit** | Übereinstimmung mit menschlicher Expert:innen-Bewertung | ≥ 85% Agreement Rate |
| **Performance** | Schnelle Analyse für iteratives Testing | < 60 Sekunden pro Analyse |
| **Skalierbarkeit** | Parallele Verarbeitung mehrerer Analysen | 100+ Analysen/Stunde möglich |
| **Transparenz** | Nachvollziehbare, erklärbare Bewertungen | Jeder Score mit Begründung |

### 📈 Key Performance Indicators (KPIs)

| Metrik | Zielwert | Messmethode |
|--------|----------|-------------|
| **Gesamtanalysezeit** | < 60 s | Server-seitiges Timing-Logging |
| **Übereinstimmungsquote** | ≥ 85% | A/B-Test gegen menschliche Rater:innen |
| **Marken-Compliance-Genauigkeit** | ≥ 90% | Validierung gegen Brand-Guidelines |
| **Fehlerrate** | < 5% | Anteil fehlgeschlagener Analysen |
| **API-Verfügbarkeit** | ≥ 99% | Uptime-Monitoring |
| **Nutzer:innen-Zufriedenheit** | ≥ 4.5/5 | Post-Analysis Survey (NPS) |

### 🎓 Learning Goals
- **Kontinuierliche Verbesserung** durch Human-Feedback-Loop
- **Erkennung neuer Pattern** in erfolgreichen Ad-LP-Kombinationen
- **Brand-Guidelines-Optimierung** basierend auf realen Kampagnendaten

---

## 3. Nutzer:innen & Use Cases

### Primäre Personas

#### 1. Brand Manager:in (Sarah, 34)
**Bedarf:**
- Sicherstellen, dass alle Ads CI-konform sind
- Schnelle Überprüfung vor Kampagnenstart
- Audit-Trail für Compliance-Berichte

**Pain Points:**
- Keine Zeit, jede Ad manuell zu prüfen
- Kreativ-Agenturen interpretieren Guidelines unterschiedlich
- Entdeckung von Verstößen erst nach Launch

**Nutzen durch Quality Rater:**
- ✅ Automatisierte Brand Audits vor Veröffentlichung
- ✅ Objektive Scores für Agentur-Briefings
- ✅ Historische Daten für Trend-Analysen

**User Journey:**
1. Upload Ad + LP-URL
2. Auswahl Brand-Guidelines-Template
3. Start Analyse
4. Review Brand-Compliance-Tab
5. Export Report für Stakeholder

---

#### 2. Creative Director (Marcus, 41)
**Bedarf:**
- Qualitätskontrolle visueller & verbaler Markenintegrität
- Feedback für Designer:innen und Copywriter:innen
- Benchmarking verschiedener Kreativ-Ansätze

**Pain Points:**
- Subjektive Bewertungen führen zu Diskussionen
- Keine Metriken für "gutes Creative"
- Zeitdruck bei Review-Prozessen

**Nutzen durch Quality Rater:**
- ✅ Objektive Bewertungskriterien
- ✅ Vergleich mehrerer Creative-Varianten
- ✅ Datenbasiertes Feedback für Teams

**User Journey:**
1. Batch-Upload mehrerer Ad-Varianten
2. Vergleichsmodus aktivieren
3. Score-Differenzen analysieren
4. Best Practices ableiten
5. Feedback an Kreativ-Team

---

#### 3. Performance Marketing Manager (Lisa, 29)
**Bedarf:**
- Kohärenz zwischen Ad-Promise und LP-Delivery
- Optimierung der User Experience
- Reduktion der Bounce-Rate

**Pain Points:**
- Disconnect zwischen Ad-Team und LP-Team
- Hohe Bounce-Raten trotz guter CTR
- Keine Tools zur Message-Match-Prüfung

**Nutzen durch Quality Rater:**
- ✅ Schnelle Tests neuer Ad-LP-Kombinationen
- ✅ Identifikation von Message-Match-Problemen
- ✅ Korrelation Score ↔ Conversion-Rate

**User Journey:**
1. Ad + LP aus laufender Kampagne eingeben
2. Analyse starten
3. Copywriting-Tab prüfen (Message Match)
4. LP-Optimierungen ableiten
5. Re-Test nach Änderungen

---

#### 4. Agenturleitung (Thomas, 52)
**Bedarf:**
- Reporting für Kund:innen
- Qualitätssicherung über mehrere Projekte
- Benchmarking der eigenen Leistung

**Pain Points:**
- Keine objektiven Qualitätsmetriken
- Zeitaufwändige manuelle Reviews
- Schwierig, Qualität gegenüber Kund:innen zu demonstrieren

**Nutzen durch Quality Rater:**
- ✅ Standardisierte Reports für Kund:innen
- ✅ Portfolio-weites Quality-Tracking
- ✅ Competitive Benchmarking

**User Journey:**
1. Zugriff auf Verlaufs-Ansicht
2. Filter nach Kunde/Zeitraum
3. Trend-Analysen durchführen
4. Export Quarterly Report
5. Präsentation bei Kund:innen

---

### Use Cases

#### UC-01: Einzelanalyse vor Kampagnenstart
**Akteur:** Brand Manager:in
**Vorbedingung:** Ad-Creative und LP sind fertiggestellt
**Trigger:** Nutzer:in klickt "Analyse starten"

**Hauptszenario:**
1. Nutzer:in gibt Ad-URL und LP-URL ein
2. System validiert URLs
3. Nutzer:in wählt Brand-Guidelines-Template oder lädt eigenes hoch
4. System startet Crew AI Workflow
5. Nach < 60s wird Report angezeigt
6. Nutzer:in reviewed Brand-Compliance-Score
7. Bei Score < 70: Nutzer:in leitet Änderungen ein
8. Bei Score ≥ 70: Freigabe für Launch

**Erweiterungen:**
- 4a: Scraping schlägt fehl → Nutzer:in erhält Fehlermeldung mit Retry-Option
- 6a: Confidence-Level "Low" → System schlägt Human-Review vor

**Postcondition:** Analyse-Report ist gespeichert und exportierbar

---

#### UC-02: Batch-Vergleich mehrerer Ad-Varianten
**Akteur:** Creative Director
**Vorbedingung:** 3-5 Ad-Varianten liegen vor
**Trigger:** Nutzer:in aktiviert "Vergleichsmodus"

**Hauptszenario:**
1. Nutzer:in uploaded mehrere Ad-URLs (gleiche LP)
2. System startet parallele Analysen
3. Results-View zeigt Side-by-Side-Vergleich
4. Nutzer:in sortiert nach Overall Score
5. Nutzer:in inspiziert Unterschiede im Detail
6. Export: "Winning Variant Report"

**Postcondition:** Team kann datenbasierte Entscheidung treffen

---

#### UC-03: Laufende Kampagnen-Überprüfung
**Akteur:** Performance Marketing Manager
**Vorbedingung:** Kampagne ist live
**Trigger:** Hohe Bounce-Rate beobachtet

**Hauptszenario:**
1. Nutzer:in gibt URLs der laufenden Kampagne ein
2. Analyse zeigt: Message Consistency Score = 45/100
3. Nutzer:in öffnet Copywriting-Tab
4. System zeigt: "Ad verspricht '50% Rabatt', LP zeigt '20% Rabatt'"
5. Nutzer:in informiert LP-Team
6. Nach Korrektur: Re-Analyse zeigt Score = 92/100

**Postcondition:** Problem identifiziert und behoben

---

## 4. Funktionale Anforderungen

### FR-01: Visuelle Ad-Analyse
**Priority:** MUST HAVE

**Beschreibung:**
Das System muss Werbeanzeigen-Bilder visuell analysieren und folgende Eigenschaften extrahieren:

- **Farbpalette:** Dominante Farben (Hex-Codes)
- **Komposition:** Layout-Qualität (Score 0-100)
- **Emotionale Tonalität:** z.B. "energisch", "seriös", "verspielt"
- **CTA-Sichtbarkeit:** Auffälligkeit des Call-to-Action (Score 0-100)
- **Brand-Elemente:** Präsenz von Logo, Slogan, Markensymbolen

**Akzeptanzkriterien:**
- [x] Gemini 2.5 Flash Vision API ist integriert
- [x] Analyse-Dauer < 10 Sekunden
- [x] Output als strukturiertes JSON (VisualAnalysis-Modell)
- [x] Fehlerbehandlung bei nicht erreichbaren Bildern
- [x] Caching bereits analysierter Ads (Hash-basiert)

---

### FR-02: Landingpage-Scraping
**Priority:** MUST HAVE

**Beschreibung:**
Das System muss den vollständigen Text-Content von Landingpages extrahieren, inkl. dynamischer Inhalte.

**Anforderungen:**
- Unterstützung für JavaScript-gerenderte Seiten (SPAs)
- Automatisches Handling von Cookie-Bannern
- Extraktion von Headlines, Body-Text, CTAs
- Fallback für statische Seiten (trafilatura)

**Akzeptanzkriterien:**
- [x] Playwright ist korrekt konfiguriert
- [x] Cookie-Banner werden automatisch akzeptiert
- [x] Lazy-Loading wird durch Scrolling getriggert
- [x] Scraping-Dauer < 20 Sekunden
- [x] Retry-Logik bei Timeouts (max. 3 Versuche)
- [x] Graceful Degradation bei Scraping-Fehlern

---

### FR-03: Copywriting-Bewertung
**Priority:** MUST HAVE

**Beschreibung:**
Das System muss die semantische Konsistenz zwischen Ad-Text und LP-Text bewerten.

**Bewertungskriterien:**
1. **Message Consistency:** Stimmen Hauptbotschaften überein?
2. **Tone Match:** Bleibt die Tonalität konsistent?
3. **CTA Alignment:** Führt der Ad-CTA zur erwarteten LP-Aktion?
4. **Pain Point Coverage:** Werden im Ad erwähnte Probleme auf LP adressiert?
5. **Persuasion Quality:** Qualität der Überzeugungsarbeit

**Akzeptanzkriterien:**
- [x] Gemini 2.5 Flash generiert strukturiertes Feedback
- [x] Scores sind 0-100 skaliert
- [x] Konkrete Verbesserungsvorschläge werden ausgegeben
- [x] Output validiert durch Pydantic CopywritingFeedback-Modell

---

### FR-04: Brand-Consistency-Prüfung
**Priority:** MUST HAVE

**Beschreibung:**
Das System muss Ad und LP gegen definierte Brand Guidelines prüfen.

**Input: Brand Guidelines JSON**
```json
{
  "brand_name": "flin",
  "tone_of_voice": ["professionell", "zugänglich", "innovativ"],
  "prohibited_words": ["billig", "Schnäppchen", "kostenlos*"],
  "color_palette": {
    "primary": "#FF6B35",
    "secondary": "#004E89",
    "accent": "#F7B32B"
  },
  "visual_style": "minimalistisch, hell, kontrastreich",
  "values": ["Transparenz", "Qualität", "Nachhaltigkeit"],
  "typography": {
    "allowed_fonts": ["Inter", "Helvetica", "Arial"],
    "prohibited_fonts": ["Comic Sans", "Papyrus"]
  }
}
```

**Output: BrandCompliance-Bericht**
- Brand Score (0-100)
- Tone Alignment (Text-Bewertung)
- Visual Alignment (Farben, Stil)
- Liste erkannter Verstöße
- Verbesserungsvorschläge

**Akzeptanzkriterien:**
- [x] System akzeptiert JSON-Guidelines als Input
- [x] Tone-of-Voice wird semantisch geprüft (nicht nur Keyword-Matching)
- [x] Farben werden visuell erkannt und gegen Palette validiert
- [x] Prohibited Words werden zuverlässig erkannt
- [x] Guideline Coverage wird berechnet (%)

---

### FR-05: Report-Synthese
**Priority:** MUST HAVE

**Beschreibung:**
Das System muss alle Agent-Ergebnisse zu einem strukturierten, maschinenlesbaren Report aggregieren.

**Output-Format: Pydantic AdQualityReport**
```python
{
  "report_id": "uuid",
  "timestamp": "2025-11-03T14:30:00Z",
  "ad_url": "https://...",
  "landing_page_url": "https://...",
  "overall_score": 87.5,
  "visual_analysis": {...},
  "copywriting_feedback": {...},
  "brand_compliance": {...},
  "success": true,
  "errors": [],
  "warnings": ["Low confidence on color detection"],
  "processing_time_seconds": 42.3,
  "confidence_level": "High"
}
```

**Akzeptanzkriterien:**
- [x] JSON-Output ist Pydantic-validiert
- [x] Overall Score ist gewichteter Durchschnitt aller Subscores
- [x] Confidence Level wird basierend auf LLM-Uncertainty berechnet
- [x] Fehler werden granular geloggt (scrape_error, llm_timeout, etc.)
- [x] Report ist exportierbar als JSON, PDF, CSV

---

### FR-06: Frontend-Interface
**Priority:** MUST HAVE

**Features:**

#### 6.1 Analyse-Formular
- Input-Felder: Ad-URL, LP-URL
- Optional: Brand-Guidelines (JSON-Upload oder Template-Auswahl)
- Optional: Target Audience (Freitext)
- CTA: "Analyse starten"
- Loading-State mit Progress-Indicator

#### 6.2 Results-View
- **Overall Score** (große Zahl, farbcodiert: Grün ≥ 80, Gelb 60-79, Rot < 60)
- **Tabs:**
  - Branding (BrandCompliance)
  - Copywriting (CopywritingFeedback)
  - Visuell (VisualAnalysis)
  - Technisch (Processing-Info, Errors/Warnings)

#### 6.3 Verlaufs-Ansicht
- Liste aller bisherigen Analysen
- Sortierung: Datum, Brand Score, Campaign ID
- Filter: Zeitraum, Kunde, Score-Range
- Bulk-Export

#### 6.4 Vergleichsmodus
- Side-by-Side Ansicht (2-4 Reports)
- Diff-Highlighting bei Scores
- Export: Comparison Report

**Akzeptanzkriterien:**
- [x] UI folgt flin-Design-System (Tailwind, shadcn/ui)
- [x] Responsive Design (Mobile, Tablet, Desktop)
- [x] Accessibility: WCAG 2.1 AA
- [x] Loading-States für alle Async-Operationen
- [x] Error-Messages sind nutzer:innenfreundlich

---

### FR-07: Export-Funktionen
**Priority:** SHOULD HAVE

**Formate:**
1. **JSON:** Vollständiger Report (Machine-Readable)
2. **PDF:** Formatierter Report mit Charts (Human-Readable)
3. **CSV:** Score-Übersicht für Batch-Analysen

**Akzeptanzkriterien:**
- [x] Export-Buttons in Results-View
- [x] PDF enthält Logo, Timestamp, alle Scores
- [x] CSV enthält Spalten: report_id, timestamp, overall_score, brand_score, etc.

---

### FR-08: API-Endpunkte
**Priority:** MUST HAVE

| Methode | Endpoint | Beschreibung | Request Body | Response |
|---------|----------|--------------|--------------|----------|
| POST | `/api/v1/analyze` | Startet neue Analyse | `{ad_url, landing_page_url, brand_guidelines?, target_audience?}` | `{analysis_id, status, report?}` |
| GET | `/api/v1/analysis/{id}` | Abrufen bestehender Analyse | - | `{report: AdQualityReport}` |
| GET | `/api/v1/history` | Liste aller Analysen | Query: `?limit=50&offset=0` | `{analyses: [...]}` |
| GET | `/health` | System-Status | - | `{status: "healthy"}` |

**Akzeptanzkriterien:**
- [x] OpenAPI/Swagger-Dokumentation verfügbar
- [x] Rate-Limiting: 100 Requests/Minute pro IP
- [x] Authentication: API-Key (Header: `X-API-Key`)
- [x] CORS konfiguriert für Frontend-Domain

---

## 5. Nicht-funktionale Anforderungen

### NFR-01: Performance
| Metrik | Zielwert | Messmethode |
|--------|----------|-------------|
| **Analyse-Gesamtzeit** | < 60 Sekunden | Server-seitiges Timing |
| **API-Response-Zeit** | < 500 ms (ohne Analyse) | Prometheus Histogram |
| **Concurrent Analyses** | 10+ parallel | Load-Testing (Locust) |
| **Frontend-Initial-Load** | < 2 Sekunden | Lighthouse Score ≥ 90 |

**Maßnahmen:**
- Asynchrone Agent-Ausführung (Crew AI Sequential Process)
- Caching: Redis für häufige Guidelines
- CDN für Frontend-Assets
- Database: PostgreSQL mit Indexierung auf report_id, timestamp

---

### NFR-02: Reliability
| Metrik | Zielwert |
|--------|----------|
| **Uptime** | ≥ 99% |
| **Fehlerrate** | < 5% |
| **MTTR** | < 30 Minuten |

**Maßnahmen:**
- Health-Check-Endpoint mit Gemini API Ping
- Retry-Logik für alle externen Calls (3 Versuche)
- Graceful Degradation bei Partial Failures
- Monitoring: Google Cloud Monitoring + Alerting

---

### NFR-03: Scalability
- **Horizontal Scaling:** Cloud Run Auto-Scaling (bis 100 Instanzen)
- **Database:** Connection Pooling (max. 50 Connections/Instance)
- **Async Processing:** Task Queue für Batch-Analysen

---

### NFR-04: Security
- **API-Key-Management:** Google Secret Manager
- **Input-Validation:** Pydantic für alle Requests
- **Rate-Limiting:** Schutz vor Abuse
- **Keine sensiblen Daten:** Ads/LPs werden nicht dauerhaft gespeichert (nur Reports)
- **HTTPS-Only:** TLS 1.3
- **CORS:** Whitelist nur Frontend-Domain

---

### NFR-05: Usability
- **Onboarding:** Interaktives Tutorial beim ersten Login
- **Inline-Hilfe:** Tooltips bei allen Input-Feldern
- **Error-Messages:** Actionable (z.B. "LP nicht erreichbar → Prüfen Sie die URL")
- **Accessibility:** WCAG 2.1 AA konform

---

### NFR-06: Maintainability
- **Code-Style:** Black (Python), Prettier (TypeScript)
- **Documentation:** Docstrings für alle Funktionen
- **Type-Safety:** Pydantic (Backend), TypeScript (Frontend)
- **Versioning:** Semantic Versioning (Major.Minor.Patch)

---

### NFR-07: Auditability
- **Strukturiertes Logging:** JSON-Format mit Timestamp, Level, Context
- **Report-History:** 90 Tage Retention
- **Changelog:** Alle Änderungen an Guidelines/Modellen

---

### NFR-08: Ethics & Transparency
- **KI-Kennzeichnung:** Alle Reports enthalten Hinweis "KI-generiert"
- **Bias-Monitoring:** Regelmäßige Audits auf Gender/Cultural Bias
- **Explainability:** Jeder Score mit Begründung

---

## 6. Systemarchitektur

### High-Level-Architektur

```
┌───────────────────────────────────────────────────────────────┐
│                         User (Browser)                        │
│                    Next.js Frontend (Port 3000)               │
└────────────────────────┬──────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                    FastAPI Backend (Port 8000)                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    API Routes                            │  │
│  │  - POST /api/v1/analyze                                  │  │
│  │  - GET  /api/v1/analysis/{id}                            │  │
│  │  - GET  /api/v1/history                                  │  │
│  └───────────────────────┬──────────────────────────────────┘  │
│                          │                                      │
│  ┌───────────────────────▼──────────────────────────────────┐  │
│  │              Crew AI Orchestrator                        │  │
│  │  Process: sequential (mit Context Dependencies)          │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────┐        │  │
│  │  │  1. Ad_Visual_Analyst                       │        │  │
│  │  │     Tool: GeminiVisionTool                  │        │  │
│  │  └──────────────────┬───────────────────────────┘        │  │
│  │                     │ Context →                          │  │
│  │  ┌──────────────────▼───────────────────────────┐        │  │
│  │  │  2. Landing_Page_Scraper                    │        │  │
│  │  │     Tool: PlaywrightScrapingTool            │        │  │
│  │  └──────────────────┬───────────────────────────┘        │  │
│  │                     │ Context →                          │  │
│  │  ┌──────────────────▼───────────────────────────┐        │  │
│  │  │  3. Copywriting_Expert                      │        │  │
│  │  │     LLM: Gemini 2.5 Flash                   │        │  │
│  │  └──────────────────┬───────────────────────────┘        │  │
│  │                     │ Context →                          │  │
│  │  ┌──────────────────▼───────────────────────────┐        │  │
│  │  │  4. Brand_Consistency_Agent                 │        │  │
│  │  │     LLM: Gemini 2.5 Flash + Guidelines      │        │  │
│  │  └──────────────────┬───────────────────────────┘        │  │
│  │                     │ Context →                          │  │
│  │  ┌──────────────────▼───────────────────────────┐        │  │
│  │  │  5. Quality_Rating_Synthesizer              │        │  │
│  │  │     Output: AdQualityReport (Pydantic)      │        │  │
│  │  └──────────────────────────────────────────────┘        │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
  │   Gemini    │ │  Playwright │ │ PostgreSQL  │
  │ 2.5 Flash   │ │   Browser   │ │  Database   │
  └─────────────┘ └─────────────┘ └─────────────┘
```

### Agent-Workflow (Sequential Process)

```
START
  │
  ├─→ Ad_Visual_Analyst
  │   ├─ Input: Ad-URL
  │   ├─ Tool: GeminiVisionTool
  │   └─ Output: VisualAnalysis
  │
  ├─→ Landing_Page_Scraper
  │   ├─ Input: LP-URL
  │   ├─ Tool: PlaywrightScrapingTool
  │   └─ Output: LP-Text
  │
  ├─→ Copywriting_Expert
  │   ├─ Context: VisualAnalysis + LP-Text
  │   ├─ Task: Message-Match-Analyse
  │   └─ Output: CopywritingFeedback
  │
  ├─→ Brand_Consistency_Agent
  │   ├─ Context: VisualAnalysis + LP-Text + Brand-Guidelines
  │   ├─ Task: CI-Konformitätsprüfung
  │   └─ Output: BrandCompliance
  │
  └─→ Quality_Rating_Synthesizer
      ├─ Context: Alle vorherigen Outputs
      ├─ Task: Aggregation + Score-Berechnung
      └─ Output: AdQualityReport
END
```

### Technologie-Stack

#### Backend
- **Framework:** Crew AI (Multi-Agenten-Orchestrierung)
- **LLM:** Gemini 2.5 Flash (Text + Vision)
- **API:** FastAPI 0.115+
- **Scraping:** Playwright 1.48+
- **HTML-Parser:** trafilatura 1.12+
- **Validation:** Pydantic 2.9+
- **Database:** PostgreSQL 16 (optional, für Report-Persistence)
- **Caching:** Redis (optional, für Guidelines/Ad-Hashes)

#### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.x
- **UI Components:** shadcn/ui
- **State:** Zustand
- **HTTP:** Axios

#### Infrastructure
- **Hosting:** Google Cloud Run
- **Monitoring:** Google Cloud Monitoring
- **Logging:** Google Cloud Logging (structured JSON)
- **Secrets:** Google Secret Manager
- **CI/CD:** Manuelles Deployment (kein GitHub Actions)

---

## 7. Datenmodell

### Pydantic-Schemas

#### VisualAnalysis
```python
from pydantic import BaseModel, Field
from typing import List, Dict

class VisualAnalysis(BaseModel):
    color_palette: List[str] = Field(
        default_factory=list,
        description="Erkannte Hauptfarben (Hex-Codes)",
        example=["#FF6B35", "#004E89"]
    )
    composition_quality: str = Field(
        ...,
        description="Bewertung der Bildkomposition",
        example="Ausgezeichnet: Klare Hierarchie, Goldener Schnitt beachtet"
    )
    composition_score: float = Field(..., ge=0, le=100)
    emotional_tone: str = Field(
        ...,
        description="Emotionale Wirkung",
        example="Energisch, optimistisch, modern"
    )
    cta_visibility: float = Field(
        ...,
        ge=0,
        le=100,
        description="Sichtbarkeit des Call-to-Action (0-100)"
    )
    brand_element_presence: Dict[str, bool] = Field(
        default_factory=dict,
        description="Präsenz von Logo, Slogan, etc.",
        example={"logo": True, "slogan": False}
    )
```

#### CopywritingFeedback
```python
from pydantic import BaseModel, Field
from typing import List

class CopywritingFeedback(BaseModel):
    message_consistency_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Übereinstimmung der Hauptbotschaften (0-100)"
    )
    tone_match: bool = Field(
        ...,
        description="Stimmt die Tonalität überein?"
    )
    tone_description: str = Field(
        ...,
        example="Ad: formell, LP: casual → Inkonsistent"
    )
    cta_alignment: str = Field(
        ...,
        description="Bewertung CTA-Konsistenz",
        example="Ad-CTA 'Jetzt kaufen' führt zu LP-Formular (gut)"
    )
    pain_point_coverage: str = Field(
        ...,
        description="Coverage der Pain Points",
        example="Ad erwähnt 'Zeitersparnis', LP adressiert dies in Headline"
    )
    persuasion_quality: str = Field(
        ...,
        description="Qualität der Überzeugungsarbeit",
        example="Starke Social Proof auf LP, passend zu Ad-Versprechen"
    )
    improvement_suggestions: List[str] = Field(
        default_factory=list,
        example=[
            "LP-Headline sollte Ad-Sprache spiegeln",
            "USPs konsistenter formulieren"
        ]
    )
```

#### BrandCompliance
```python
from pydantic import BaseModel, Field
from typing import List

class BrandCompliance(BaseModel):
    brand_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Gesamtscore Markenkonformität (0-100)"
    )
    tone_alignment: str = Field(
        ...,
        description="Bewertung der Tonalitäts-Übereinstimmung",
        example="Konsistent mit 'professionell, zugänglich'"
    )
    visual_alignment: str = Field(
        ...,
        description="Bewertung der visuellen Markenkonformität",
        example="Primärfarbe #FF6B35 wird korrekt verwendet"
    )
    prohibited_elements: List[str] = Field(
        default_factory=list,
        description="Liste erkannter Verstösse",
        example=["Verwendung von 'billig' in LP-Text"]
    )
    improvement_suggestions: List[str] = Field(
        default_factory=list,
        description="Konkrete Verbesserungsvorschläge",
        example=["Ersetze 'billig' durch 'preisw <ert'"]
    )
    guideline_coverage: float = Field(
        ...,
        ge=0,
        le=100,
        description="Prozent der Guidelines, die geprüft werden konnten",
        example=85.0
    )
```

#### AdQualityReport (Haupt-Output)
```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional

class AdQualityReport(BaseModel):
    # Metadaten
    report_id: str = Field(..., description="UUID")
    timestamp: datetime = Field(default_factory=datetime.now)
    ad_url: str
    landing_page_url: str

    # Scores
    overall_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Gewichteter Gesamtscore"
    )

    # Detailanalysen
    visual_analysis: VisualAnalysis
    copywriting_feedback: CopywritingFeedback
    brand_compliance: BrandCompliance

    # Status & Fehler
    success: bool = Field(default=True)
    errors: List[str] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)

    # Processing-Info
    processing_time_seconds: float
    confidence_level: str = Field(
        ...,
        description="High, Medium, Low",
        example="High"
    )

    # Score-Berechnung (Transparenz)
    score_breakdown: dict = Field(
        default_factory=dict,
        description="Gewichtung der Subscores",
        example={
            "visual": {"score": 85, "weight": 0.25},
            "copywriting": {"score": 78, "weight": 0.35},
            "brand": {"score": 92, "weight": 0.40}
        }
    )
```

### Score-Berechnung

**Overall Score Formel:**
```python
overall_score = (
    visual_analysis.composition_score * 0.25 +
    copywriting_feedback.message_consistency_score * 0.35 +
    brand_compliance.brand_score * 0.40
)
```

**Gewichtung-Rationale:**
- **Brand (40%):** Höchste Priorität, da Markenintegrität kritisch
- **Copywriting (35%):** Message Match ist zentral für Conversion
- **Visual (25%):** Wichtig, aber subjektiver

**Confidence-Level-Logik:**
```python
if all_llm_responses_confident and no_scraping_errors:
    confidence_level = "High"
elif some_warnings_present:
    confidence_level = "Medium"
else:
    confidence_level = "Low"
```

---

## 8. User Experience & Interface

### Design-Prinzipien (flin-Style)
- ✨ **Minimalistisch:** Wenig Clutter, viel Whitespace
- 🎨 **Hell & Kontrastreich:** Light Mode mit klaren Farben
- 📱 **Responsive:** Mobile-first Approach
- ♿ **Accessible:** WCAG 2.1 AA konform
- 🗣️ **Gendergerecht:** Nutzer:innen, Kreativ:innen, etc.

### Farbschema
```css
:root {
  --primary: #FF6B35;      /* flin Orange */
  --secondary: #004E89;    /* flin Blau */
  --accent: #F7B32B;       /* flin Gelb */
  --success: #10B981;      /* Grün */
  --warning: #F59E0B;      /* Orange */
  --error: #EF4444;        /* Rot */
  --background: #FFFFFF;   /* Weiß */
  --text: #1F2937;         /* Dunkelgrau */
}
```

### Typografie
- **Font:** Inter (Primary), System Fallbacks
- **Sizes:**
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### UI-Komponenten

#### 1. Analyse-Formular
```
┌────────────────────────────────────────────┐
│  🎯 Neue Analyse starten                   │
├────────────────────────────────────────────┤
│                                            │
│  Ad-URL*                                   │
│  ┌──────────────────────────────────────┐  │
│  │ https://example.com/ad.jpg           │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Landingpage-URL*                          │
│  ┌──────────────────────────────────────┐  │
│  │ https://example.com/landing          │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Brand-Guidelines (optional)               │
│  ┌──────────────────────────────────────┐  │
│  │ [ Template wählen ▼ ]  [ JSON ↑ ]   │  │
│  └──────────────────────────────────────┘  │
│                                            │
│         [ Analyse starten → ]              │
│                                            │
└────────────────────────────────────────────┘
```

#### 2. Loading-State
```
┌────────────────────────────────────────────┐
│  ⏳ Analyse läuft...                       │
├────────────────────────────────────────────┤
│                                            │
│  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 55%                │
│                                            │
│  ✅ Visuelle Analyse abgeschlossen         │
│  ✅ Landingpage gescraped                  │
│  🔄 Copywriting-Bewertung läuft...         │
│  ⏸️  Brand-Prüfung ausstehend              │
│  ⏸️  Report-Synthese ausstehend            │
│                                            │
│  Geschätzte Restzeit: 18 Sekunden          │
│                                            │
└────────────────────────────────────────────┘
```

#### 3. Results-View (Overall Score)
```
┌────────────────────────────────────────────┐
│  📊 Analyse-Ergebnis                       │
│  Report-ID: abc-123-def | 03.11.2025      │
├────────────────────────────────────────────┤
│                                            │
│              Gesamtscore                   │
│                                            │
│                  87.5                      │
│                                            │
│            ⭐⭐⭐⭐⭐                           │
│        von 100 Punkten                     │
│                                            │
│  [ 📥 JSON ] [ 📄 PDF ] [ 📊 CSV ]        │
│                                            │
└────────────────────────────────────────────┘
```

#### 4. Tabs (Detailansicht)
```
┌────────────────────────────────────────────┐
│ [ Branding ] [ Copywriting ] [ Visuell ]   │
├────────────────────────────────────────────┤
│  🏷️ Brand-Compliance                       │
│                                            │
│  Score: 92/100                    ✅ Hoch │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                            │
│  ✅ Tone-of-Voice: Konsistent              │
│     "professionell, zugänglich" eingehalten│
│                                            │
│  ✅ Farbwelt: Korrekt                      │
│     Primärfarbe #FF6B35 erkannt            │
│                                            │
│  ⚠️  Gefundene Verstöße (1):                │
│     • Verwendung von "billig" in LP-Text   │
│                                            │
│  💡 Verbesserungsvorschläge:               │
│     • Ersetze "billig" durch "preiswert"   │
│                                            │
└────────────────────────────────────────────┘
```

### Interaction-Flow

#### Haupt-User-Journey
1. **Landing:** Nutzer:in sieht Formular + kurze Erklärung
2. **Input:** Ausfüllen der Felder (Inline-Validierung)
3. **Submit:** "Analyse starten" → Loading-State
4. **Wait:** Progress-Indicator (55%) mit Status-Updates
5. **Results:** Overall Score prominent angezeigt
6. **Explore:** Tabs durchklicken für Details
7. **Action:** Export oder neue Analyse

#### Error-Handling (UX)
- **URL ungültig:** Sofort Inline-Feedback ("Bitte gültige URL eingeben")
- **Scraping fehlgeschlagen:** "LP nicht erreichbar. Bitte prüfen Sie die URL oder versuchen Sie es später erneut. [Retry]"
- **LLM-Timeout:** "Analyse dauert ungewöhnlich lang. Möchten Sie warten oder abbrechen? [Warten] [Abbrechen]"
- **Partial Failure:** Report wird trotzdem angezeigt, mit Warnung: "⚠️ Einige Analysen konnten nicht abgeschlossen werden. Details im 'Technisch'-Tab."

---

## 9. Testing-Strategie

### Test-Pyramide

```
          ┌─────┐
          │ E2E │ ← 10% (vollständige User-Journeys)
         /└─────┘\
        /  ┌───┐  \
       /   │INT│   \ ← 30% (Crew-Workflow, API-Integration)
      /   /└───┘\   \
     /   /  ┌─┐  \   \
    /___/___│U│___\___\ ← 60% (Einzelne Tools, Agents, Funktionen)
            └─┘
```

### 1. Unit-Tests (60%)

**Ziel:** Isolierte Funktionalität jeder Komponente

#### 1.1 Tool-Tests
```python
# tests/unit/tools/test_gemini_vision_tool.py

import pytest
from unittest.mock import Mock, patch
from tools.gemini_vision_tool import GeminiVisionTool

class TestGeminiVisionTool:
    @patch('google.generativeai.GenerativeModel')
    def test_successful_image_analysis(self, mock_model):
        # Arrange
        mock_response = Mock()
        mock_response.text = '{"colors": ["#FF0000"], "tone": "energetic"}'
        mock_model.return_value.generate_content.return_value = mock_response

        tool = GeminiVisionTool()

        # Act
        result = tool._run(
            image_url="https://example.com/ad.jpg",
            prompt="Analyze this ad"
        )

        # Assert
        assert 'analysis' in result
        assert result['image_url'] == "https://example.com/ad.jpg"
        assert mock_model.called

    def test_invalid_image_url(self):
        tool = GeminiVisionTool()

        with pytest.raises(ValueError):
            tool._run(
                image_url="not-a-valid-url",
                prompt="Test"
            )

    @patch('google.generativeai.GenerativeModel')
    def test_gemini_timeout_handling(self, mock_model):
        mock_model.side_effect = TimeoutError("API timeout")

        tool = GeminiVisionTool()
        result = tool._run(
            image_url="https://example.com/ad.jpg",
            prompt="Test"
        )

        assert 'error' in result
        assert result['error'] == "API timeout"
```

#### 1.2 Agent-Tests (Logik)
```python
# tests/unit/agents/test_brand_consistency_agent.py

import pytest
from agents.brand_consistency_agent import BrandConsistencyAgent
from models.brand_compliance import BrandCompliance

class TestBrandConsistencyAgent:
    def test_agent_creation(self):
        agent = BrandConsistencyAgent().create()

        assert agent.role == 'Brand Consistency Agent'
        assert agent.llm == 'gemini/gemini-2.5-flash'
        assert not agent.allow_delegation

    def test_prohibited_words_detection(self):
        # Simulierter LLM-Output (gemockt)
        text = "Dieses Produkt ist billig und ein Schnäppchen!"
        guidelines = {
            "prohibited_words": ["billig", "Schnäppchen"]
        }

        # Hier würde die tatsächliche Agent-Logik getestet
        # (vereinfacht ohne LLM-Call)
        detected = [word for word in guidelines["prohibited_words"]
                   if word in text]

        assert len(detected) == 2
        assert "billig" in detected
```

#### 1.3 Pydantic-Model-Tests
```python
# tests/unit/models/test_ad_quality_report.py

import pytest
from datetime import datetime
from models.ad_quality_report import AdQualityReport
from models.visual_analysis import VisualAnalysis
from models.copywriting_feedback import CopywritingFeedback
from models.brand_compliance import BrandCompliance

class TestAdQualityReport:
    def test_valid_report_creation(self):
        report = AdQualityReport(
            report_id="test-123",
            ad_url="https://example.com/ad.jpg",
            landing_page_url="https://example.com/lp",
            overall_score=85.0,
            visual_analysis=VisualAnalysis(...),  # mock data
            copywriting_feedback=CopywritingFeedback(...),
            brand_compliance=BrandCompliance(...),
            processing_time_seconds=42.0,
            confidence_level="High"
        )

        assert report.overall_score == 85.0
        assert report.success is True
        assert report.confidence_level == "High"

    def test_score_validation(self):
        with pytest.raises(ValueError):
            AdQualityReport(
                overall_score=150.0,  # invalid: > 100
                ...
            )

    def test_json_serialization(self):
        report = AdQualityReport(...)
        json_str = report.model_dump_json()

        assert '"overall_score":' in json_str
        assert '"report_id":' in json_str
```

### 2. Integration-Tests (30%)

**Ziel:** Zusammenspiel mehrerer Komponenten

#### 2.1 Crew-Workflow-Test
```python
# tests/integration/test_crew_workflow.py

import pytest
from crew.crew import AdQualityRaterCrew

class TestCrewWorkflow:
    @pytest.mark.integration
    @pytest.mark.asyncio
    async def test_full_analysis_workflow(self):
        """
        Testet den kompletten Crew-Durchlauf mit echten APIs
        (benötigt gültige API-Keys in .env.test)
        """
        crew = AdQualityRaterCrew(
            ad_url="https://example.com/test-ad.jpg",
            landing_page_url="https://example.com/test-lp",
            brand_guidelines={
                "tone_of_voice": ["professional"],
                "prohibited_words": []
            }
        )

        # Act
        result = crew.kickoff()

        # Assert
        assert result is not None
        assert isinstance(result, AdQualityReport)
        assert 0 <= result.overall_score <= 100
        assert result.success is True
        assert result.processing_time_seconds < 120

    @pytest.mark.integration
    async def test_partial_failure_handling(self):
        """
        Testet Graceful Degradation bei Scraping-Fehler
        """
        crew = AdQualityRaterCrew(
            ad_url="https://example.com/valid-ad.jpg",
            landing_page_url="https://invalid-url-404.com",
            brand_guidelines={}
        )

        result = crew.kickoff()

        # Report sollte trotzdem generiert werden
        assert result.success is False
        assert len(result.errors) > 0
        assert "scraping" in result.errors[0].lower()
        # Visual Analysis sollte trotzdem vorhanden sein
        assert result.visual_analysis is not None
```

#### 2.2 API-Endpoint-Tests
```python
# tests/integration/test_api_endpoints.py

import pytest
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

class TestAPIEndpoints:
    def test_health_endpoint(self):
        response = client.get("/health")

        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

    def test_analyze_endpoint_valid_request(self):
        request_body = {
            "ad_url": "https://example.com/ad.jpg",
            "landing_page_url": "https://example.com/lp",
            "brand_guidelines": {"tone_of_voice": ["professional"]}
        }

        response = client.post("/api/v1/analyze", json=request_body)

        assert response.status_code == 200
        data = response.json()
        assert "analysis_id" in data
        assert "report" in data
        assert data["status"] == "completed"

    def test_analyze_endpoint_invalid_url(self):
        request_body = {
            "ad_url": "not-a-valid-url",
            "landing_page_url": "https://example.com/lp"
        }

        response = client.post("/api/v1/analyze", json=request_body)

        assert response.status_code == 422  # Validation Error

    def test_rate_limiting(self):
        # Sende 101 Requests in Folge
        for i in range(101):
            response = client.get("/health")
            if i < 100:
                assert response.status_code == 200
            else:
                assert response.status_code == 429  # Too Many Requests
```

### 3. End-to-End-Tests (10%)

**Ziel:** Vollständige User-Journeys im Browser

#### 3.1 Frontend-E2E mit Playwright
```typescript
// tests/e2e/analysis-flow.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Ad Quality Analysis Flow', () => {
  test('complete successful analysis', async ({ page }) => {
    // 1. Navigate to app
    await page.goto('http://localhost:3000');

    // 2. Fill form
    await page.fill('input[name="ad_url"]',
      'https://example.com/test-ad.jpg');
    await page.fill('input[name="landing_page_url"]',
      'https://example.com/test-lp');

    // 3. Submit
    await page.click('button[type="submit"]');

    // 4. Wait for loading state
    await expect(page.locator('text=Analyse läuft')).toBeVisible();

    // 5. Wait for results (max 60s)
    await page.waitForSelector('.overall-score', { timeout: 60000 });

    // 6. Verify score is displayed
    const scoreText = await page.textContent('.overall-score');
    const score = parseFloat(scoreText);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);

    // 7. Verify tabs are clickable
    await page.click('button:has-text("Branding")');
    await expect(page.locator('text=Brand-Compliance')).toBeVisible();

    await page.click('button:has-text("Copywriting")');
    await expect(page.locator('text=Message Consistency')).toBeVisible();

    // 8. Test export
    await page.click('button:has-text("JSON")');
    // Verify download started
    const download = await page.waitForEvent('download');
    expect(download.suggestedFilename()).toContain('.json');
  });

  test('error handling for invalid URL', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.fill('input[name="ad_url"]', 'invalid-url');
    await page.fill('input[name="landing_page_url"]', 'https://example.com');

    // Inline validation should appear
    await expect(page.locator('text=Bitte gültige URL')).toBeVisible();

    // Submit button should be disabled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('comparison mode with multiple ads', async ({ page }) => {
    // ... Test für Vergleichsmodus
  });
});
```

### Test-Durchführung

#### Lokale Entwicklung
```bash
# Unit-Tests (schnell, kein API-Key nötig)
pytest tests/unit -v

# Integration-Tests (benötigt API-Keys)
pytest tests/integration -v --env=test

# E2E-Tests (benötigt laufenden Server)
npm run test:e2e

# Coverage-Report
pytest --cov=src --cov-report=html
```

#### Pre-Deployment (Manuell)
```bash
# 1. Alle Tests ausführen
pytest tests/ -v

# 2. E2E-Tests gegen Staging
ENVIRONMENT=staging npm run test:e2e

# 3. Performance-Test
locust -f tests/performance/locustfile.py

# 4. Manuelle Smoke-Tests
# - 3 verschiedene Ad-LP-Kombinationen
# - Export-Funktionen (JSON, PDF)
# - Error-Szenarien (404 LP, ungültige Brand-Guidelines)
```

### Test-Daten-Management

#### Fixtures
```python
# tests/fixtures/sample_data.py

SAMPLE_AD_URL = "https://example.com/test-ad.jpg"
SAMPLE_LP_URL = "https://example.com/test-lp"

SAMPLE_BRAND_GUIDELINES = {
    "brand_name": "TestBrand",
    "tone_of_voice": ["professional", "friendly"],
    "prohibited_words": ["cheap", "scam"],
    "color_palette": {
        "primary": "#FF6B35",
        "secondary": "#004E89"
    },
    "visual_style": "minimalist, modern",
    "values": ["transparency", "quality"]
}

SAMPLE_VISUAL_ANALYSIS = {
    "color_palette": ["#FF6B35", "#FFFFFF"],
    "composition_quality": "Excellent",
    "composition_score": 85.0,
    "emotional_tone": "Energetic, optimistic",
    "cta_visibility": 90.0,
    "brand_element_presence": {"logo": True, "slogan": False}
}
```

### Akzeptanzkriterien für Tests

- [x] **Unit-Test-Coverage:** ≥ 80%
- [x] **Integration-Test-Coverage:** ≥ 60%
- [x] **E2E-Tests:** Mindestens 5 kritische User-Journeys
- [x] **Alle Tests grün** vor Deployment
- [x] **Performance-Tests:** 100 parallele Requests ohne Fehler

---

## 10. Deployment-Strategie

### Deployment-Übersicht

**Plattform:** Google Cloud Run (Serverless Containers)
**Strategie:** Manuelles Deployment (kein automatisches CI/CD)
**Environments:** Development → Staging → Production

### Deployment-Prozess

#### 1. Vorbereitung

```bash
# 1.1 Lokale Tests ausführen
pytest tests/ -v
npm run test:e2e

# 1.2 Build lokal testen
docker build -t ads-quality-rater:local .
docker run -p 8000:8000 ads-quality-rater:local

# 1.3 Version-Tag setzen
git tag v1.0.0
git push origin v1.0.0
```

#### 2. Backend-Deployment (Google Cloud Run)

```bash
# 2.1 Authenticate
gcloud auth login
gcloud config set project PROJECT_ID

# 2.2 Build & Push Image
cd backend
gcloud builds submit --tag gcr.io/PROJECT_ID/ads-quality-rater:v1.0.0

# 2.3 Deploy to Cloud Run
gcloud run deploy ads-quality-rater \
  --image gcr.io/PROJECT_ID/ads-quality-rater:v1.0.0 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 120s \
  --max-instances 100 \
  --set-env-vars GEMINI_API_KEY=secret:gemini-api-key:latest \
  --set-env-vars ENVIRONMENT=production

# 2.4 Verify Deployment
BACKEND_URL=$(gcloud run services describe ads-quality-rater \
  --region europe-west1 \
  --format 'value(status.url)')
curl $BACKEND_URL/health
```

#### 3. Frontend-Deployment (Vercel/Cloud Run)

**Option A: Vercel (empfohlen für Next.js)**
```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel Dashboard:
# NEXT_PUBLIC_API_URL=<BACKEND_URL>
```

**Option B: Cloud Run**
```bash
cd frontend

# Build Next.js
npm run build

# Deploy
gcloud run deploy ads-quality-rater-frontend \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

### Environment-Variablen

#### Backend (.env)
```bash
# LLM
GEMINI_API_KEY=<secret>
GEMINI_MODEL=gemini-2.5-flash

# Database (optional)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Redis (optional)
REDIS_URL=redis://host:6379

# API
API_KEY_SALT=<random-string>
RATE_LIMIT=100

# Monitoring
GOOGLE_CLOUD_PROJECT=<project-id>
ENVIRONMENT=production
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://ads-quality-rater-xxx.run.app
NEXT_PUBLIC_ENVIRONMENT=production
```

### Secrets-Management

**Google Secret Manager:**
```bash
# Gemini API Key speichern
echo -n "YOUR_API_KEY" | gcloud secrets create gemini-api-key \
  --data-file=-

# Secret in Cloud Run verfügbar machen (bereits in Deploy-Command)
--set-env-vars GEMINI_API_KEY=secret:gemini-api-key:latest
```

### Rollback-Strategie

```bash
# 1. Liste aller Revisions
gcloud run revisions list --service ads-quality-rater

# 2. Traffic auf alte Revision umleiten
gcloud run services update-traffic ads-quality-rater \
  --to-revisions ads-quality-rater-v1-0-0=100

# 3. Verify
curl $BACKEND_URL/health
```

### Health-Checks

```python
# backend/src/api/main.py

@app.get("/health")
async def health_check():
    # Check Gemini API
    try:
        genai.GenerativeModel('gemini-2.5-flash').generate_content("test")
        gemini_status = "healthy"
    except:
        gemini_status = "unhealthy"

    # Check Playwright
    try:
        # Quick browser launch test
        playwright_status = "healthy"
    except:
        playwright_status = "unhealthy"

    overall = "healthy" if all([
        gemini_status == "healthy",
        playwright_status == "healthy"
    ]) else "degraded"

    return {
        "status": overall,
        "timestamp": datetime.now().isoformat(),
        "services": {
            "gemini": gemini_status,
            "playwright": playwright_status
        }
    }
```

### Monitoring-Setup

```bash
# Cloud Monitoring Alert: Response Time
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="High Response Time" \
  --condition-display-name="Response time > 60s" \
  --condition-threshold-value=60 \
  --condition-threshold-duration=120s

# Cloud Monitoring Alert: Error Rate
gcloud alpha monitoring policies create \
  --display-name="High Error Rate" \
  --condition-threshold-value=0.05 \  # 5%
  --condition-threshold-duration=300s
```

### Deployment-Checklist

**Pre-Deployment:**
- [ ] Alle Tests grün (Unit, Integration, E2E)
- [ ] Performance-Test bestanden (100 Requests/Min)
- [ ] Security-Audit durchgeführt
- [ ] Secrets aktualisiert (Rotation)
- [ ] Version-Tag erstellt (Git)
- [ ] Changelog aktualisiert

**Deployment:**
- [ ] Backend deployed & Health-Check OK
- [ ] Frontend deployed & reachable
- [ ] Environment-Variablen gesetzt
- [ ] Smoke-Tests durchgeführt (3 manuelle Analysen)
- [ ] Monitoring-Dashboards geprüft

**Post-Deployment:**
- [ ] 24h-Monitoring (Fehlerrate, Latenz)
- [ ] User-Feedback sammeln
- [ ] Performance-Metriken tracken
- [ ] Hot-Fixes dokumentieren

---

## 11. Risiken & Mitigation

### Technische Risiken

#### R-01: Gemini API-Instabilität
**Wahrscheinlichkeit:** Mittel
**Impact:** Hoch
**Beschreibung:** Gemini API könnte Timeouts oder Rate-Limits haben.

**Mitigation:**
- Retry-Logik mit Exponential Backoff (3 Versuche)
- Caching häufig analysierter Ads (Redis)
- Fallback auf älteres Modell (Gemini 1.5 Pro)
- Monitoring & Alerting bei hoher Fehlerrate

---

#### R-02: Landingpage-Scraping schlägt fehl
**Wahrscheinlichkeit:** Mittel
**Impact:** Mittel
**Beschreibung:** Dynamische Seiten, CAPTCHA, Bot-Detection.

**Mitigation:**
- User-Agent Rotation
- Fallback zu trafilatura (statische Seiten)
- Graceful Degradation (Report ohne LP-Daten)
- Human-in-the-Loop Option: Nutzer:in kann LP-Text manuell eingeben

---

#### R-03: Unvollständige Brand-Guidelines
**Wahrscheinlichkeit:** Hoch
**Impact:** Niedrig
**Beschreibung:** Nutzer:innen liefern unvollständige Guidelines.

**Mitigation:**
- Validierung der Guidelines (Pydantic)
- Templates für Standard-Branchen (E-Commerce, SaaS, etc.)
- Hinweis im Report: "Guideline Coverage: 65%"
- Best-Effort-Bewertung mit niedrigerem Confidence-Level

---

#### R-04: LLM-Drift (Output-Format ändert sich)
**Wahrscheinlichkeit:** Niedrig
**Impact:** Hoch
**Beschreibung:** Gemini-Updates könnten Output-Format ändern.

**Mitigation:**
- Pydantic-Validierung aller LLM-Outputs
- Monitoring: Alert bei > 5% Validation-Errors
- Version-Pinning des Modells (gemini-2.5-flash-001)
- Fallback-Parsing-Logik

---

### Business-Risiken

#### R-05: Nutzer:innen-Akzeptanz
**Wahrscheinlichkeit:** Mittel
**Impact:** Hoch
**Beschreibung:** Nutzer:innen vertrauen KI-Bewertungen nicht.

**Mitigation:**
- Transparente Erklärungen für jeden Score
- "Powered by Gemini 2.5 Flash" Badge
- Human-in-the-Loop Review bei Low Confidence
- Case Studies mit realen Verbesserungen

---

#### R-06: Kosten durch API-Calls
**Wahrscheinlichkeit:** Mittel
**Impact:** Mittel
**Beschreibung:** Hohe Anzahl Analysen = hohe Gemini API-Kosten.

**Mitigation:**
- Caching bereits analysierter Ads
- Rate-Limiting: 100 Analysen/Minute
- Monitoring & Budget-Alerts
- Preismodell: Pay-per-Analysis

---

#### R-07: Bias in KI-Bewertungen
**Wahrscheinlichkeit:** Mittel
**Impact:** Mittel
**Beschreibung:** LLM könnte Gender/Cultural Bias zeigen.

**Mitigation:**
- Regelmäßige Bias-Audits (Diverse Test-Ads)
- Human-Review-Stichproben (10% aller Analysen)
- Feedback-Loop: Nutzer:innen können Bewertungen melden
- Dokumentation bekannter Limitierungen

---

### Operationale Risiken

#### R-08: Single Point of Failure (Gemini)
**Wahrscheinlichkeit:** Niedrig
**Impact:** Hoch
**Beschreibung:** Gemini API komplett down.

**Mitigation:**
- Multi-Provider-Strategie (später: OpenAI GPT-4 Fallback)
- Status-Page mit aktuellen Service-Status
- Wartungsfenster kommunizieren

---

#### R-09: Daten-Privacy-Verstöße
**Wahrscheinlichkeit:** Niedrig
**Impact:** Sehr Hoch
**Beschreibung:** Versehentliches Loggen sensibler Kund:innendaten.

**Mitigation:**
- Keine Persistierung von Ad/LP-Content (nur Reports)
- Anonymisierung in Logs (URL-Hashing)
- DSGVO-Compliance-Audit
- Data Retention Policy: 90 Tage

---

## 12. Roadmap & Meilensteine

### Phase 1: MVP (Wochen 1-4)

**Ziel:** Funktionierender Prototyp mit Kern-Features

**Deliverables:**
- [x] Backend-Struktur aufgesetzt
- [x] 3 von 5 Agents implementiert (Visual, Scraper, Copywriting)
- [x] API-Endpoint `/api/v1/analyze` funktionsfähig
- [x] Basis-Frontend (Formular + Results-View)
- [x] Unit-Tests für Tools

**Demo:**
- 1 erfolgreiche End-to-End-Analyse
- Overall Score wird korrekt berechnet
- Export als JSON möglich

---

### Phase 2: Brand Agent & Testing (Wochen 5-8)

**Ziel:** Vollständiges Feature-Set + Qualitätssicherung

**Deliverables:**
- [x] Brand_Consistency_Agent implementiert
- [x] Quality_Rating_Synthesizer implementiert
- [x] Frontend-Tabs (Branding, Copywriting, Visuell)
- [x] Export-Funktionen (JSON, PDF, CSV)
- [x] Integration-Tests für Crew-Workflow
- [x] E2E-Tests (Playwright)

**Demo:**
- 5 verschiedene Ad-LP-Kombinationen erfolgreich analysiert
- Brand-Compliance-Scores validiert gegen manuelle Reviews
- Test-Coverage ≥ 75%

---

### Phase 3: UX & Polish (Wochen 9-10)

**Ziel:** Produktionsreife UI/UX

**Deliverables:**
- [x] Vergleichsmodus (Side-by-Side)
- [x] Verlaufs-Ansicht mit Filterung
- [x] Loading-States & Progress-Indicator
- [x] Error-Handling & User-Feedback
- [x] Accessibility-Audit (WCAG 2.1 AA)
- [x] Mobile-Responsive-Design

**Demo:**
- Nutzer:innen-Testing mit 5 Beta-Tester:innen
- SUS-Score (System Usability Scale) ≥ 75

---

### Phase 4: Deployment & Beta (Wochen 11-12)

**Ziel:** Production-Launch mit Beta-Kund:innen

**Deliverables:**
- [x] Google Cloud Run Deployment
- [x] Monitoring & Logging Setup
- [x] Performance-Optimierung (< 60s Analyse)
- [x] Security-Audit
- [x] Onboarding-Tutorial (Interactive)
- [x] Dokumentation (User Guide)

**Beta-Launch:**
- 3-5 Beta-Kund:innen (Agenturen/Marken)
- 50 Analysen/Woche durchführen
- Feedback sammeln (NPS, Interviews)

---

### Phase 5: Iteration & Scale (Wochen 13-16)

**Ziel:** Feature-Erweiterungen basierend auf Feedback

**Mögliche Features:**
- **Batch-Upload:** CSV mit 100+ Ad-LP-Kombinationen
- **API-Zugang:** Self-Service API-Keys für Entwickler:innen
- **Webhooks:** Benachrichtigungen bei Analyse-Completion
- **Custom-Scores:** Nutzer:innen können Gewichtungen anpassen
- **Historical Trends:** Analyse-Entwicklung über Zeit
- **A/B-Testing-Integration:** Direkter Import aus Google Ads

---

### Langfristige Vision (6-12 Monate)

1. **Multi-Provider LLMs:** OpenAI GPT-4, Anthropic Claude als Fallbacks
2. **Video-Ads:** Analyse von Video-Creatives (YouTube, TikTok)
3. **Automated Optimization:** KI schlägt konkrete Änderungen vor
4. **Integration-Marketplace:** Zapier, Make, n8n
5. **White-Label-Lösung:** Agenturen können Tool unter eigener Marke anbieten

---

## 13. Offene Fragen

### Technisch
- [ ] **Caching-Strategie:** Redis vs. In-Memory? Wie lange Retention?
- [ ] **PDF-Generation:** Welche Library? (ReportLab, WeasyPrint, Puppeteer?)
- [ ] **Database:** PostgreSQL wirklich nötig oder reicht File-Storage (Cloud Storage)?
- [ ] **Rate-Limiting:** Pro IP, pro API-Key oder pro User?

### Produkt
- [ ] **Confidence-Schwellwert:** Ab welchem Confidence-Level HITL triggern?
- [ ] **Brand-Guidelines-Templates:** Welche Branchen priorisieren?
- [ ] **Scoring-Gewichtung:** Sollten Nutzer:innen Gewichte anpassen können?
- [ ] **Export-Formate:** CSV ausreichend oder Excel (XLSX) nötig?

### Business
- [ ] **Pricing-Modell:** Pay-per-Analysis, Subscription oder Freemium?
- [ ] **SLA-Definitionen:** 99% Uptime realistisch? Welche Penalties?
- [ ] **Beta-Partner:innen:** Welche Agenturen/Marken ansprechen?
- [ ] **Support-Strategie:** Self-Service (Docs, Chat) oder Premium-Support?

### Legal & Compliance
- [ ] **DSGVO:** Ist anonymisiertes Logging ausreichend?
- [ ] **Terms of Service:** Haftungsausschluss für KI-Bewertungen?
- [ ] **Gemini API Terms:** Dürfen wir Outputs kommerziell nutzen?

---

## Anhang

### Glossar

| Begriff | Definition |
|---------|-----------|
| **Ad** | Werbeanzeige (Display, Social, Search) |
| **LP** | Landingpage (Zielseite nach Ad-Klick) |
| **CI** | Corporate Identity (Markenidentität) |
| **Message Match** | Übereinstimmung der Botschaft zwischen Ad und LP |
| **CTA** | Call-to-Action (Handlungsaufforderung) |
| **HITL** | Human-in-the-Loop (Menschliche Überprüfung) |
| **SPA** | Single Page Application |
| **WCAG** | Web Content Accessibility Guidelines |

### Referenzen

- [Crew AI Dokumentation](https://docs.crewai.com)
- [Gemini API Dokumentation](https://ai.google.dev/docs)
- [Playwright Dokumentation](https://playwright.dev)
- [FastAPI Dokumentation](https://fastapi.tiangolo.com)
- [Next.js Dokumentation](https://nextjs.org/docs)

---

**Dokument-Status:** Final Draft
**Letzte Aktualisierung:** November 2025
**Nächstes Review:** Nach Phase 2 (Woche 8)
**Kontakt:** team@flin.com
