"""Visual Analysis Pydantic Model"""

from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict


class VisualAnalysis(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "color_palette": ["#FF6B35", "#004E89", "#FFFFFF"],
            "composition_quality": "Sehr gut: Klare visuelle Hierarchie",
            "composition_score": 85.0,
            "emotional_tone": "Professionell, vertrauenswürdig",
            "cta_visibility": 90.0,
            "brand_element_presence": {"logo": True, "slogan": True},
        }
    })
    """Model for visual analysis results from Ad Creative"""

    color_palette: List[str] = Field(
        default_factory=list,
        description="Erkannte Hauptfarben (Hex-Codes)",
        examples=[["#FF6B35", "#004E89", "#FFFFFF"]],
    )
    composition_quality: str = Field(
        ...,
        description="Bewertung der Bildkomposition",
        examples=["Ausgezeichnet: Klare Hierarchie, Goldener Schnitt beachtet"],
    )
    composition_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Numerischer Score für Komposition (0-100)",
    )
    emotional_tone: str = Field(
        ...,
        description="Emotionale Wirkung des Ads",
        examples=["Energisch, optimistisch, modern"],
    )
    cta_visibility: float = Field(
        ...,
        ge=0,
        le=100,
        description="Sichtbarkeit des Call-to-Action (0-100)",
    )
    brand_element_presence: Dict[str, str | bool] = Field(
        default_factory=dict,
        description="Präsenz von Markenelementen (kann Boolean oder Beschreibung sein)",
        examples=[{"logo": True, "slogan": "Prominent platziert in der oberen Ecke"}],
    )
