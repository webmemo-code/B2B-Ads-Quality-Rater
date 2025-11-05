"""Application Settings"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # LLM Configuration
    gemini_api_key: str
    gemini_model: str = "gemini-2.0-flash-exp"

    # API Configuration
    api_key_salt: str = "default-salt-change-in-production"
    rate_limit: int = 100

    # Environment
    environment: str = "development"

    # Database (optional)
    database_url: Optional[str] = None

    # Redis (optional)
    redis_url: Optional[str] = None

    # Monitoring
    log_level: str = "INFO"
    google_cloud_project: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = False


# Create settings instance
settings = Settings()
