"""Brand Compliance Pydantic Model"""

from pydantic import BaseModel, Field, ConfigDict
from typing import List


class BrandCompliance(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "brand_score": 92.0,
            "tone_alignment": "Sehr gut: Konsistent mit definierter Tonalität 'professionell, zugänglich'",
            "visual_alignment": "Primärfarbe #FF6B35 korrekt verwendet, Schrift passt",
            "prohibited_elements": ["Verwendung von 'billig' in LP-Text"],
            "improvement_suggestions": [
                "Ersetze 'billig' durch 'preiswert'",
                "Logo-Platzierung sollte prominenter sein",
            ],
            "guideline_coverage": 85.0,
        }
    })
    """Model for brand compliance analysis"""

    brand_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Gesamtscore Markenkonformität (0-100)",
    )
    tone_alignment: str = Field(
        ...,
        description="Bewertung der Tonalitäts-Übereinstimmung mit Guidelines",
        examples=["Konsistent mit 'professionell, zugänglich'"],
    )
    visual_alignment: str = Field(
        ...,
        description="Bewertung der visuellen Markenkonformität",
        examples=["Primärfarbe #FF6B35 wird korrekt verwendet"],
    )
    prohibited_elements: List[str] = Field(
        default_factory=list,
        description="Liste erkannter Verstöße gegen Guidelines",
        examples=[["Verwendung von 'billig' in LP-Text"]],
    )
    improvement_suggestions: List[str] = Field(
        default_factory=list,
        description="Konkrete Verbesserungsvorschläge für Brand-Konformität",
        examples=[["Ersetze 'billig' durch 'preiswert'"]],
    )
    guideline_coverage: float = Field(
        ...,
        ge=0,
        le=100,
        description="Prozent der Guidelines, die geprüft werden konnten",
    )
