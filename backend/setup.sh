#!/bin/bash
# Setup script for Ads Quality Rater Backend

set -e

echo "🚀 Ads Quality Rater - Setup Script"
echo "===================================="
echo ""

# Check Python version
echo "📋 Checking Python version..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "   Found: Python $python_version"

if [[ ! "$python_version" > "3.11" ]]; then
    echo "   ❌ Python 3.11+ required"
    exit 1
fi
echo "   ✅ Python version OK"
echo ""

# Create virtual environment
echo "📦 Creating virtual environment..."
if [ -d "venv" ]; then
    echo "   ⚠️  venv already exists, skipping"
else
    python3 -m venv venv
    echo "   ✅ Virtual environment created"
fi
echo ""

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate
echo "   ✅ Virtual environment activated"
echo ""

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip setuptools wheel --quiet
echo "   ✅ pip upgraded"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt --quiet
echo "   ✅ Dependencies installed"
echo ""

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
playwright install chromium
echo "   ✅ Playwright chromium installed"
echo ""

# Check .env file
echo "🔐 Checking environment variables..."
if [ ! -f ".env" ]; then
    echo "   ⚠️  .env file not found"
    cp .env.example .env
    echo "   ✅ Created .env from .env.example"
    echo ""
    echo "   ⚠️  IMPORTANT: Edit .env and add your GEMINI_API_KEY"
    echo "   Get your API key from: https://makersuite.google.com/app/apikey"
else
    echo "   ✅ .env file exists"
fi
echo ""

# Run tests
echo "🧪 Running tests..."
pytest tests/unit -v --tb=short
if [ $? -eq 0 ]; then
    echo "   ✅ All tests passed!"
else
    echo "   ❌ Some tests failed"
    exit 1
fi
echo ""

# Success message
echo "✅ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "  1. Edit .env and add your GEMINI_API_KEY"
echo "  2. Start the server: uvicorn src.api.main:app --reload"
echo "  3. Visit: http://localhost:8000/docs"
echo ""
