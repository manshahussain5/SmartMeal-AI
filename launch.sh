#!/bin/bash

echo "Starting SmartMeal AI..."
echo ""
echo "Opening in your default browser..."

# Try to open with different browsers/commands
if command -v xdg-open > /dev/null; then
    xdg-open index.html
elif command -v open > /dev/null; then
    open index.html
elif command -v start > /dev/null; then
    start index.html
else
    echo "Please open index.html in your web browser manually"
fi

echo ""
echo "If you want to run with a local server instead:"
echo "1. Install Node.js from https://nodejs.org/"
echo "2. Run: npm install"
echo "3. Run: npm start"
echo ""
read -p "Press Enter to continue..."
