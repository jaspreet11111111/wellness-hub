#!/bin/bash

# Wellness Hub - Quick Deployment Script
# This script will help you deploy to GitHub and Vercel

echo "🚀 Wellness Hub - Deployment Helper"
echo "===================================="
echo ""

# Step 1: Create GitHub Repository
echo "📋 Step 1: Create GitHub Repository"
echo ""
echo "Go to: https://github.com/new"
echo ""
echo "Repository settings:"
echo "  - Repository name: wellness-hub"
echo "  - Make it: Public (or Private)"
echo "  - ❌ DON'T initialize with README"
echo ""
echo "Press ENTER after you've created the repository..."
read

# Step 2: Push to GitHub
echo ""
echo "📤 Step 2: Pushing code to GitHub..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code successfully pushed to GitHub!"
    echo ""
    echo "Your repo: https://github.com/jaspreet11111111/wellness-hub"
    echo ""
else
    echo ""
    echo "⚠️  Push failed. You may need to authenticate."
    echo ""
    echo "If prompted, use your GitHub credentials or Personal Access Token"
    echo "Generate token at: https://github.com/settings/tokens"
    echo ""
    exit 1
fi

# Step 3: Deploy to Vercel
echo "🌐 Step 3: Deploy to Vercel"
echo ""
echo "1. Go to: https://vercel.com/new"
echo "2. Click 'Import' next to your wellness-hub repository"
echo "3. Add these environment variables:"
echo ""
echo "   NEXT_PUBLIC_SUPABASE_URL"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   STRIPE_SECRET_KEY"
echo "   NEXT_PUBLIC_URL=https://your-project.vercel.app"
echo ""
echo "4. Click 'Deploy' and wait 2-3 minutes"
echo ""
echo "✨ After deployment, update NEXT_PUBLIC_URL with your actual Vercel URL"
echo ""
echo "🎉 Your Wellness Hub will be LIVE!"
