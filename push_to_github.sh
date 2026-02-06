#!/bin/bash
# PUSH ONLY CODE FILES TO GITHUB

# Navigate to project root
cd "C:\Users\acer\OneDrive\Desktop\TrustHire-Blue Collar Plateform"

# Configure git (only first time)
git config user.name "Your Name"
git config user.email "your.email@gmail.com"

# Initialize git
git init

# Add only code files (respects .gitignore)
git add server/src/
git add trusthire/src/
git add server/package.json
git add trusthire/package.json
git add README.md
git add .gitignore

# Check what will be pushed
git status

# Commit
git commit -m "feat: TrustHire platform - Backend and Frontend code"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/trusthire.git

# Push to GitHub
git branch -M main
git push -u origin main

echo "✅ Pushed to GitHub!"
