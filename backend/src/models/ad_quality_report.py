"""Ad Quality Report - Main Output Model"""

from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import List, Optional
from .visual_analysis import VisualAnalysis
from .copywriting_feedback import CopywritingFeedback
from .brand_compliance import BrandCompliance


class ScoreBreakdown(BaseModel):
    """Breakdown of score calculation for transparency"""

    score: float = Field(..., ge=0, le=100)
    weight: float = Field(..., ge=0, le=1)


class Recommendation(BaseModel):
    """Single actionable recommendation"""

    title: str = Field(..., description="Kurzer Titel der Empfehlung")
    description: str = Field(..., description="Detaillierte Beschreibung")
    priority: str = Field(..., description="Priorität: High, Medium, Low", pattern="^(High|Medium|Low)$")


class AdQualityReport(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "report_id": "abc-123-def-456",
            "timestamp": "2025-11-03T14:30:00Z",
            "ad_url": "https://example.com/ad.jpg",
            "landing_page_url": "https://example.com/landing",
            "overall_score": 87.5,
            "visual_analysis": {
                "color_palette": ["#FF6B35", "#004E89"],
                "composition_quality": "Sehr gut",
                "composition_score": 85.0,
                "emotional_tone": "Professionell",
                "cta_visibility": 90.0,
                "brand_element_presence": {"logo": True},
            },
            "copywriting_feedback": {
                "message_consistency_score": 78.0,
                "tone_match": True,
                "tone_description": "Konsistent professionell",
                "cta_alignment": "Gut",
                "pain_point_coverage": "Vollständig",
                "persuasion_quality": "Stark",
                "improvement_suggestions": [],
            },
            "brand_compliance": {
                "brand_score": 92.0,
                "tone_alignment": "Sehr gut",
                "visual_alignment": "Korrekt",
                "prohibited_elements": [],
                "improvement_suggestions": [],
                "guideline_coverage": 85.0,
            },
            "success": True,
            "errors": [],
            "warnings": ["Low confidence on color detection"],
            "processing_time_seconds": 42.3,
            "confidence_level": "High",
            "score_breakdown": {
                "visual": {"score": 85.0, "weight": 0.25},
                "copywriting": {"score": 78.0, "weight": 0.35},
                "brand": {"score": 92.0, "weight": 0.40},
            },
        }
    })
    """Main output model for Ad Quality Analysis"""

    # Metadaten
    report_id: str = Field(..., description="Eindeutige Report-ID (UUID)")
    timestamp: datetime = Field(
        default_factory=datetime.now,
        description="Zeitstempel der Analyse",
    )
    ad_url: str = Field(..., description="URL des analysierten Ads")
    landing_page_url: str = Field(..., description="URL der analysierten Landingpage")

    # Overall Score
    overall_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Gewichteter Gesamtscore (0-100)",
    )

    # Detailanalysen
    visual_analysis: Optional[VisualAnalysis] = Field(
        None,
        description="Ergebnisse der visuellen Ad-Analyse",
    )
    copywriting_feedback: Optional[CopywritingFeedback] = Field(
        None,
        description="Ergebnisse der Copywriting-Analyse",
    )
    brand_compliance: Optional[BrandCompliance] = Field(
        None,
        description="Ergebnisse der Brand-Compliance-Prüfung",
    )

    # Status & Fehler
    success: bool = Field(
        default=True,
        description="War die Analyse erfolgreich?",
    )
    errors: List[str] = Field(
        default_factory=list,
        description="Liste aufgetretener Fehler",
    )
    warnings: List[str] = Field(
        default_factory=list,
        description="Liste von Warnungen",
    )

    # Processing-Info
    processing_time_seconds: float = Field(
        ...,
        ge=0,
        description="Verarbeitungszeit in Sekunden",
    )
    confidence_level: str = Field(
        ...,
        description="Confidence Level der Analyse: High, Medium, Low",
        pattern="^(High|Medium|Low)$",
    )

    # Score-Berechnung (Transparenz)
    score_breakdown: dict = Field(
        default_factory=dict,
        description="Detaillierte Score-Berechnung (flexibles Format)",
    )

    # Handlungsempfehlungen
    recommendations: List[Recommendation] = Field(
        default_factory=list,
        description="Konkrete Handlungsempfehlungen basierend auf Analyse und Kampagnenziel",
    )
