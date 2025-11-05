"""LLM Configuration for CrewAI Agents"""

import os
from crewai import LLM


def get_gemini_llm():
    """
    Create and return configured Gemini LLM for CrewAI agents

    Uses CrewAI's native LLM class with Gemini.

    Returns:
        LLM instance configured for Gemini
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    # Return CrewAI's LLM with gemini/ prefix as per official docs
    return LLM(
        model='gemini/gemini-2.5-flash',
        api_key=api_key,
        temperature=0.7
    )
