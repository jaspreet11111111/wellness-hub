#!/bin/bash

# Quick GitHub Authentication & Push Script

echo "🚀 Pushing Wellness Hub to GitHub..."
echo ""
echo "When prompted:"
echo "  Username: jaspreet11111111"
echo "  Password: [Your GitHub Password or Token]"
echo ""
echo "If password doesn't work, create a token at:"
echo "  https://github.com/settings/tokens/new"
echo "  (Check 'repo' scope, copy token, use as password)"
echo ""
echo "---"
echo ""

cd /Users/jaspreetsingh/Documents/vividautomate-workspace/projects/wellness-hub

# Try to push
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo ""
    echo "View your code: https://github.com/jaspreet11111111/wellness-hub"
    echo ""
    echo "📍 Next Step: Deploy to Vercel"
    echo "   1. Go to: https://vercel.com/new"
    echo "   2. Import 'wellness-hub'"
    echo "   3. Add environment variables"
    echo "   4. Deploy!"
    echo ""
else
    echo ""
    echo "⚠️ Push failed. Please check your credentials."
    echo ""
    echo "Quick token creation:"
    echo "  1. https://github.com/settings/tokens/new"
    echo "  2. Note: 'Wellness Hub'"
    echo "  3. Scopes: ✅ repo"
    echo "  4. Generate & copy token"
    echo "  5. Run this script again, use token as password"
fi
