# 🔐 GitHub Authentication Setup

Your repository is created! Now we just need to push the code.

## Option 1: Use GitHub CLI (Easiest - Recommended)

### Install GitHub CLI:
```bash
brew install gh
```

### Authenticate and push:
```bash
cd /Users/jaspreetsingh/Documents/vividautomate-workspace/projects/wellness-hub
gh auth login
# Follow the browser prompts to log in
git push -u origin main
```

---

## Option 2: Use Personal Access Token

### Step 1: Create Token
1. Go to: https://github.com/settings/tokens/new
2. Note: "Wellness Hub Deployment"
3. Expiration: 90 days (or custom)
4. Select scopes: ✅ **repo** (all repo permissions)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Use token to push:
```bash
cd /Users/jaspreetsingh/Documents/vividautomate-workspace/projects/wellness-hub
git push -u origin main
```

When prompted for username: `jaspreet11111111`
When prompted for password: `paste_your_token_here`

---

## Option 3: Use SSH (Most Secure)

### Step 1: Generate SSH key (if you don't have one):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for all prompts (use defaults)
```

### Step 2: Add SSH key to GitHub:
```bash
# Copy your public key:
cat ~/.ssh/id_ed25519.pub
# Copy the output
```

Go to: https://github.com/settings/ssh/new
- Title: "Mac Laptop"
- Key: Paste the copied key
- Click "Add SSH key"

### Step 3: Change remote URL and push:
```bash
cd /Users/jaspreetsingh/Documents/vividautomate-workspace/projects/wellness-hub
git remote set-url origin git@github.com:jaspreet11111111/wellness-hub.git
git push -u origin main
```

---

## ⚡ Quick Choice:

**For quickest setup:** Use Option 1 (GitHub CLI)
**For one-time use:** Use Option 2 (Token)
**For permanent setup:** Use Option 3 (SSH)

After code is pushed, you'll see:
```
✅ Counting objects: 75, done.
✅ Writing objects: 100% (75/75)
✅ Branch 'main' set up to track remote branch 'main' from 'origin

'.
```

Then we'll deploy to Vercel!
