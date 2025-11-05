"""Copywriting Feedback Pydantic Model"""

from pydantic import BaseModel, Field, ConfigDict
from typing import List


class CopywritingFeedback(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "message_consistency_score": 78.0,
            "tone_match": True,
            "tone_description": "Beide professionell und direkt",
            "cta_alignment": "Ad-CTA 'Jetzt starten' führt zu Registration-Form",
            "pain_point_coverage": "Alle 3 Pain Points aus Ad werden auf LP adressiert",
            "persuasion_quality": "Gute Verwendung von Social Proof und Testimonials",
            "improvement_suggestions": [
                "LP-Headline könnte Ad-Wording direkter übernehmen",
                "Preise früher im Funnel kommunizieren",
            ],
        }
    })
    """Model for copywriting analysis between Ad and Landing Page"""

    message_consistency_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Übereinstimmung der Hauptbotschaften (0-100)",
    )
    tone_match: bool = Field(
        ...,
        description="Stimmt die Tonalität zwischen Ad und LP überein?",
    )
    tone_description: str = Field(
        ...,
        description="Beschreibung der Tonalität",
        examples=["Ad: formell, LP: casual → Inkonsistent"],
    )
    cta_alignment: str = Field(
        ...,
        description="Bewertung der CTA-Konsistenz",
        examples=["Ad-CTA 'Jetzt kaufen' führt zu LP-Formular (gut)"],
    )
    pain_point_coverage: str = Field(
        ...,
        description="Abdeckung der im Ad erwähnten Pain Points auf der LP",
        examples=["Ad erwähnt 'Zeitersparnis', LP adressiert dies in Headline"],
    )
    persuasion_quality: str = Field(
        ...,
        description="Qualität der Überzeugungsarbeit",
        examples=["Starke Social Proof auf LP, passend zu Ad-Versprechen"],
    )
    improvement_suggestions: List[str] = Field(
        default_factory=list,
        description="Konkrete Verbesserungsvorschläge",
        examples=[
            [
                "LP-Headline sollte Ad-Sprache spiegeln",
                "USPs konsistenter formulieren",
            ]
        ],
    )
