"""Unit tests for Pydantic models"""

import pytest
from datetime import datetime
from pydantic import ValidationError

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "src"))

from models.visual_analysis import VisualAnalysis
from models.copywriting_feedback import CopywritingFeedback
from models.brand_compliance import BrandCompliance
from models.ad_quality_report import AdQualityReport, ScoreBreakdown


class TestVisualAnalysis:
    """Tests for VisualAnalysis model"""

    def test_valid_visual_analysis(self):
        """Test creating valid visual analysis"""
        analysis = VisualAnalysis(
            color_palette=["#FF6B35", "#004E89"],
            composition_quality="Sehr gut",
            composition_score=85.0,
            emotional_tone="Professionell",
            cta_visibility=90.0,
            brand_element_presence={"logo": True, "slogan": False},
        )

        assert analysis.composition_score == 85.0
        assert len(analysis.color_palette) == 2
        assert analysis.brand_element_presence["logo"] is True

    def test_score_validation(self):
        """Test that scores must be between 0-100"""
        with pytest.raises(ValidationError):
            VisualAnalysis(
                color_palette=[],
                composition_quality="Test",
                composition_score=150.0,  # Invalid: > 100
                emotional_tone="Test",
                cta_visibility=50.0,
            )

        with pytest.raises(ValidationError):
            VisualAnalysis(
                color_palette=[],
                composition_quality="Test",
                composition_score=-10.0,  # Invalid: < 0
                emotional_tone="Test",
                cta_visibility=50.0,
            )


class TestCopywritingFeedback:
    """Tests for CopywritingFeedback model"""

    def test_valid_copywriting_feedback(self):
        """Test creating valid copywriting feedback"""
        feedback = CopywritingFeedback(
            message_consistency_score=78.0,
            tone_match=True,
            tone_description="Konsistent professionell",
            cta_alignment="Gut",
            pain_point_coverage="Vollständig",
            persuasion_quality="Stark",
            improvement_suggestions=["Headline anpassen"],
        )

        assert feedback.message_consistency_score == 78.0
        assert feedback.tone_match is True
        assert len(feedback.improvement_suggestions) == 1


class TestBrandCompliance:
    """Tests for BrandCompliance model"""

    def test_valid_brand_compliance(self):
        """Test creating valid brand compliance"""
        compliance = BrandCompliance(
            brand_score=92.0,
            tone_alignment="Sehr gut",
            visual_alignment="Korrekt",
            prohibited_elements=[],
            improvement_suggestions=[],
            guideline_coverage=85.0,
        )

        assert compliance.brand_score == 92.0
        assert compliance.guideline_coverage == 85.0
        assert len(compliance.prohibited_elements) == 0


class TestAdQualityReport:
    """Tests for AdQualityReport model"""

    def test_valid_complete_report(self):
        """Test creating complete valid report"""
        report = AdQualityReport(
            report_id="test-123",
            timestamp=datetime.now(),
            ad_url="https://example.com/ad.jpg",
            landing_page_url="https://example.com/lp",
            overall_score=87.5,
            visual_analysis=VisualAnalysis(
                color_palette=["#FF6B35"],
                composition_quality="Gut",
                composition_score=85.0,
                emotional_tone="Modern",
                cta_visibility=90.0,
            ),
            copywriting_feedback=CopywritingFeedback(
                message_consistency_score=80.0,
                tone_match=True,
                tone_description="Konsistent",
                cta_alignment="Gut",
                pain_point_coverage="Vollständig",
                persuasion_quality="Stark",
            ),
            brand_compliance=BrandCompliance(
                brand_score=90.0,
                tone_alignment="Gut",
                visual_alignment="Korrekt",
                guideline_coverage=85.0,
            ),
            success=True,
            errors=[],
            warnings=[],
            processing_time_seconds=42.3,
            confidence_level="High",
        )

        assert report.overall_score == 87.5
        assert report.success is True
        assert report.confidence_level == "High"

    def test_report_with_errors(self):
        """Test report with errors but still valid"""
        report = AdQualityReport(
            report_id="test-456",
            timestamp=datetime.now(),
            ad_url="https://example.com/ad.jpg",
            landing_page_url="https://example.com/lp",
            overall_score=0.0,
            success=False,
            errors=["Scraping failed"],
            warnings=["Low confidence"],
            processing_time_seconds=10.0,
            confidence_level="Low",
        )

        assert report.success is False
        assert len(report.errors) == 1
        assert report.confidence_level == "Low"

    def test_confidence_level_validation(self):
        """Test that confidence_level must be High, Medium, or Low"""
        with pytest.raises(ValidationError):
            AdQualityReport(
                report_id="test",
                ad_url="https://example.com",
                landing_page_url="https://example.com",
                overall_score=50.0,
                processing_time_seconds=10.0,
                confidence_level="Invalid",  # Must be High, Medium, or Low
            )

    def test_json_serialization(self):
        """Test that report can be serialized to JSON"""
        report = AdQualityReport(
            report_id="test-789",
            ad_url="https://example.com/ad.jpg",
            landing_page_url="https://example.com/lp",
            overall_score=85.0,
            processing_time_seconds=30.0,
            confidence_level="High",
        )

        json_str = report.model_dump_json()
        assert '"overall_score":' in json_str or '"overall_score": ' in json_str
        assert '"report_id":' in json_str or '"report_id": ' in json_str
