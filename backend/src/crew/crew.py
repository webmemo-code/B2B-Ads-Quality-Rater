"""Ad Quality Rater Crew - Main Orchestrator"""

from crewai import Crew, Task, Process
from typing import Optional
import uuid
from datetime import datetime
import time
import json
import re

from agents.ad_visual_analyst import create_ad_visual_analyst
from agents.landing_page_scraper import create_landing_page_scraper
from agents.copywriting_expert import create_copywriting_expert
from agents.brand_consistency_agent import create_brand_consistency_agent
from agents.quality_rating_synthesizer import create_quality_rating_synthesizer

from models.ad_quality_report import AdQualityReport
from models.visual_analysis import VisualAnalysis
from models.copywriting_feedback import CopywritingFeedback
from models.brand_compliance import BrandCompliance


class AdQualityRaterCrew:
    """
    Main Crew orchestrator for Ad Quality Analysis

    This crew coordinates 5 agents in a sequential process to analyze
    ads and landing pages for quality, consistency, and brand compliance.
    """

    def __init__(
        self,
        ad_url: str,
        landing_page_url: str,
        brand_guidelines: Optional[dict] = None,
        target_audience: Optional[str] = None,
        campaign_goal: Optional[str] = None,
    ):
        self.ad_url = ad_url
        self.landing_page_url = landing_page_url
        self.brand_guidelines = brand_guidelines or {}
        self.target_audience = target_audience or "Allgemeine Zielgruppe"
        self.campaign_goal = campaign_goal or "Allgemeine Kampagne"
        self.report_id = str(uuid.uuid4())
        self.start_time = None

        # Create agents
        self.ad_visual_analyst = create_ad_visual_analyst()
        self.landing_page_scraper = create_landing_page_scraper()
        self.copywriting_expert = create_copywriting_expert()
        self.brand_consistency_agent = create_brand_consistency_agent()
        self.quality_rating_synthesizer = create_quality_rating_synthesizer()

    def _create_tasks(self) -> list[Task]:
        """Create all tasks with proper context dependencies"""

        # Task 1: Analyze Ad Visuals
        analyze_ad_task = Task(
            description=f"""Analysiere das Werbemotiv mit dem Gemini Vision Analyzer Tool EINMAL.

            **TOOL AUFRUF:**
            {{"image_url": "{self.ad_url}"}}

            **Zielgruppe:** {self.target_audience}

            Schreibe eine klare TEXT-ANALYSE nach LinkedIn B2B Best Practices:
            - Format (1:1, horizontal?) und Composition Score (0-100)
            - Authentizität (Stockfoto vs. echt)
            - Text-Overlay (Billboard Rule: max 7 Wörter?)
            - Emotionale Wirkung & Thumb-Stopper Effekt
            - CTA-Sichtbarkeit (0-100)
            - Dominante Farben (Hex-Codes)
            - Verbesserungsvorschläge

            Rufe das Tool NUR EINMAL auf und schreibe dann deine Analyse.""",
            expected_output="""Klare Text-Beschreibung der visuellen Analyse mit Scores,
            Farbcodes und konkreten Verbesserungsvorschlägen.""",
            agent=self.ad_visual_analyst,
        )

        # Task 2: Scrape Landing Page
        scrape_lp_task = Task(
            description=f"""Extrahiere den vollständigen Text-Content von folgender Landingpage: {self.landing_page_url}

            Verwende Playwright für dynamische Seiten und trafilatura als Fallback.

            Achte auf:
            - Vollständige Extraktion aller sichtbaren Texte
            - Headlines, Subheadlines, Body-Text
            - Call-to-Actions
            - Entfernung von Boilerplate (Footer, Cookie-Banner-Text, etc.)

            Bei Problemen (Timeout, 404, etc.) gib eine klare Fehlermeldung zurück.""",
            expected_output="""Extrahierter Text-Content der Landingpage als String,
            oder Fehlermeldung bei Problemen.""",
            agent=self.landing_page_scraper,
        )

        # Task 3: Copywriting Analysis
        copywriting_task = Task(
            description=f"""Analysiere die Konsistenz und Qualität des Copywritings zwischen
            Ad und Landingpage nach LinkedIn B2B Best Practices.

            **Verfügbare Informationen:**
            - Ad-Analyse: {{analyze_ad_task.output}}
            - Landingpage-Text: {{scrape_lp_task.output}}

            Schreibe eine klare TEXT-ANALYSE:
            1. Message Consistency Score (0-100): Wie konsistent?
            2. Tonalität: Pädagogisch oder werblich? Beschreibung?
            3. CTA-Alignment: Passen die CTAs zusammen?
            4. Pain Points: Klar adressiert?
            5. PIO-Formel: Angewendet? (Pain-Impact-Offer)
            6. Textlängen: Intro < 150? Headline < 70?
            7. Psychologische Trigger: Welche genutzt?
            8. Verbesserungsvorschläge mit konkreten Text-Beispielen""",
            expected_output="""Klare Text-Analyse der Copywriting-Qualität mit Scores,
            konkreten Beispielen und Verbesserungsvorschlägen.""",
            agent=self.copywriting_expert,
            context=[analyze_ad_task, scrape_lp_task],
        )

        # Task 4: Brand Compliance Check
        brand_compliance_task = Task(
            description=f"""Prüfe die Markenkonformität von Ad und Landingpage.

            **Brand Guidelines:**
            {self.brand_guidelines if self.brand_guidelines else "Keine spezifischen Guidelines - prüfe allgemeine Markenkonsistenz"}

            **Verfügbare Informationen:**
            - Ad-Analyse: {{analyze_ad_task.output}}
            - Landingpage-Text: {{scrape_lp_task.output}}

            Schreibe eine klare TEXT-ANALYSE:
            1. Brand Score (0-100): Gesamtbewertung Markenkonformität
            2. Tonalität-Alignment: Passt zur Marke?
            3. Visuelle Konsistenz: Farben, Fonts korrekt?
            4. Verbotene Elemente: Gibt es Verstöße? (Liste auf)
            5. Guideline Coverage (0-100%): Wie viel geprüft?
            6. Verbesserungsvorschläge""",
            expected_output="""Klare Text-Analyse der Markenkonformität mit Score
            und konkreten Verbesserungsvorschlägen.""",
            agent=self.brand_consistency_agent,
            context=[analyze_ad_task, scrape_lp_task],
        )

        # Task 5: Synthesize Final Report (TEXT FORMAT)
        synthesize_report_task = Task(
            description=f"""Erstelle einen umfassenden, gut lesbaren Text-Report über die Ad-Qualität.

            **Analysiere folgende Aspekte:**
            - Visual Analysis: {{analyze_ad_task.output}}
            - Copywriting Feedback: {{copywriting_task.output}}
            - Brand Compliance: {{brand_compliance_task.output}}

            **Report-Struktur:**

            # LinkedIn Ad Qualitäts-Analyse

            **Ad-URL:** {self.ad_url}
            **Landing-Page-URL:** {self.landing_page_url}
            **Kampagnenziel:** {self.campaign_goal}
            **Zielgruppe:** {self.target_audience}

            ---

            ## 🎨 Visuelle Analyse

            [Beschreibe die visuelle Qualität des Ads basierend auf LinkedIn B2B Best Practices]
            - Format und Komposition
            - Farbpalette und Emotionale Wirkung
            - CTA-Sichtbarkeit
            - Markenelemente
            - Authentizität vs. Stockfoto

            ## ✍️ Copywriting & Messaging

            [Analysiere die Konsistenz zwischen Ad und Landing Page]
            - Message Consistency (Ad ↔ Landing Page)
            - Tonalität und Ansprache
            - CTA-Alignment
            - Pain Points Coverage
            - PIO-Formel Anwendung (Pain-Impact-Offer)
            - Psychologische Trigger

            ## 🎯 Brand Compliance

            [Bewerte die Markenkonformität]
            - Tonalität-Alignment
            - Visuelle Konsistenz
            - Verbotene Elemente (falls vorhanden)
            - Guidelines Coverage

            ## 💡 Konkrete Textvorschläge

            [Gib 2-3 konkrete Empfehlungen mit MEHREREN Textalternativen]

            **Format:**

            **🔴 [Was ändern]**
            **Option 1:** "[Konkreter Textvorschlag 1]"
            **Option 2:** "[Konkreter Textvorschlag 2]"
            **Option 3:** "[Konkreter Textvorschlag 3]"
            Impact: +X%

            **🟡 [Was ändern]**
            **Option 1:** "[Konkreter Textvorschlag 1]"
            **Option 2:** "[Konkreter Textvorschlag 2]"
            Impact: +X%

            **WICHTIG:**
            - 2-3 Empfehlungen
            - IMMER konkrete Textvorschläge geben
            - Mindestens 2 Optionen pro Empfehlung
            - Direkt copy-paste-bar
            - Impact-Zahl angeben

            Schreibe einen gut strukturierten, leicht lesbaren Text-Report.""",
            expected_output="""Ein umfassender Text-Report in Markdown-Format mit:
            - Visueller Analyse
            - Copywriting Analyse
            - Brand Compliance
            - NUR 2 ultra-kurze Empfehlungen (je 1-2 Sätze)""",
            agent=self.quality_rating_synthesizer,
            context=[analyze_ad_task, scrape_lp_task, copywriting_task, brand_compliance_task],
        )

        return [
            analyze_ad_task,
            scrape_lp_task,
            copywriting_task,
            brand_compliance_task,
            synthesize_report_task,
        ]

    def kickoff(self) -> str:
        """
        Start the crew analysis

        Returns:
            Text report from the analysis
        """
        self.start_time = time.time()

        try:
            # Create crew
            crew = Crew(
                agents=[
                    self.ad_visual_analyst,
                    self.landing_page_scraper,
                    self.copywriting_expert,
                    self.brand_consistency_agent,
                    self.quality_rating_synthesizer,
                ],
                tasks=self._create_tasks(),
                process=Process.sequential,
                verbose=True,
            )

            # Execute crew
            result = crew.kickoff()

            # Return the text result directly
            processing_time = time.time() - self.start_time

            # Convert result to string
            result_text = str(result)

            # Add processing time footer
            result_text += f"\n\n---\n\n**⏱️ Verarbeitungszeit:** {processing_time:.1f} Sekunden"

            return result_text

        except Exception as e:
            processing_time = time.time() - self.start_time if self.start_time else 0

            return f"""# ❌ Analyse Fehlgeschlagen

**Fehler:** {str(e)}

**Verarbeitungszeit:** {processing_time:.1f} Sekunden

Bitte versuchen Sie es erneut oder kontaktieren Sie den Support."""
