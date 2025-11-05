#!/bin/bash
# Start script for Ads Quality Rater Frontend

echo "🚀 Ads Quality Rater Frontend"
echo "=============================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating .env.local..."
    cp .env.local.example .env.local
    echo "✅ .env.local created"
    echo ""
fi

# Start development server
echo "🎨 Starting development server..."
echo "Frontend will be available at: http://localhost:3000"
echo ""
npm run dev
