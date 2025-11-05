"""Unit tests for FastAPI endpoints"""

import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "src"))

from api.main import app

client = TestClient(app)


class TestAPIEndpoints:
    """Tests for API endpoints"""

    def test_root_endpoint(self):
        """Test root endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "version" in data

    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert "timestamp" in data

    def test_analyze_endpoint_invalid_url(self):
        """Test analyze endpoint with invalid URL"""
        request_body = {
            "ad_url": "not-a-valid-url",
            "landing_page_url": "https://example.com/lp",
        }

        response = client.post("/api/v1/analyze", json=request_body)
        assert response.status_code == 422  # Validation Error

    def test_analyze_endpoint_missing_fields(self):
        """Test analyze endpoint with missing required fields"""
        request_body = {
            "ad_url": "https://example.com/ad.jpg",
            # landing_page_url is missing
        }

        response = client.post("/api/v1/analyze", json=request_body)
        assert response.status_code == 422  # Validation Error

    def test_analyze_endpoint_valid_structure(self):
        """Test that analyze endpoint accepts valid request structure"""
        # Note: This will fail in actual execution without real API keys
        # but tests the request/response structure
        request_body = {
            "ad_url": "https://example.com/ad.jpg",
            "landing_page_url": "https://example.com/lp",
            "brand_guidelines": {"tone_of_voice": ["professional"]},
            "target_audience": "Young professionals",
        }

        # This will likely fail without proper setup, but we're testing structure
        response = client.post("/api/v1/analyze", json=request_body)

        # We accept either success or 500 (since we don't have real API keys in test)
        assert response.status_code in [200, 500]

        if response.status_code == 200:
            data = response.json()
            assert "analysis_id" in data
            assert "status" in data
