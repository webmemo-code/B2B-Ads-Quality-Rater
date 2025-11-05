"""Structured Logger for JSON logging"""

import logging
import json
from datetime import datetime
from typing import Any


class StructuredLogger:
    """Logger that outputs structured JSON logs"""

    def __init__(self, name: str):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)

        # Remove existing handlers
        self.logger.handlers.clear()

        # Add console handler
        handler = logging.StreamHandler()
        handler.setFormatter(logging.Formatter("%(message)s"))
        self.logger.addHandler(handler)

    def log(self, level: str, message: str, **kwargs: Any):
        """Log structured message"""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "level": level,
            "message": message,
            **kwargs,
        }
        self.logger.info(json.dumps(log_entry))

    def info(self, message: str, **kwargs: Any):
        """Log info message"""
        self.log("INFO", message, **kwargs)

    def error(self, message: str, **kwargs: Any):
        """Log error message"""
        self.log("ERROR", message, **kwargs)

    def warning(self, message: str, **kwargs: Any):
        """Log warning message"""
        self.log("WARNING", message, **kwargs)


# Create default logger
logger = StructuredLogger("ads_quality_rater")
