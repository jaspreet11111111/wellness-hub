## 🐛 Quick Fixes for Local Issues

### Issue 1: "Invalid URL" Error on Checkout
**Error**: "Invalid URL: An explicit scheme (such as https) must be provided"

**Fix**: Update your `.env.local` file
Change:
```
NEXT_PUBLIC_URL=localhost:3000
```

To:
```
NEXT_PUBLIC_URL=http://localhost:3000
```

**Then restart your dev server:**
```bash
# Stop the current server (Ctrl+C)
rm -rf .next && npm run dev
```

---

### Issue 2: Duplicate Packages
**Fix in Supabase SQL Editor:**
```sql
DELETE FROM packages;

INSERT INTO packages (name, credits, price, description, active) VALUES
  ('5-Class Pack', 5, 90.00, 'Save $10 with our 5-class package.', true),
  ('10-Class Pack', 10, 170.00, 'Our most popular package! Save $30.', true),
  ('20-Class Pack', 20, 320.00, 'Best value! Save $80.', true);
```

---

## After Both Fixes:
1. Refresh http://localhost:3000/dashboard/packages
2. You should see 3 unique packages
3. "Purchase Package" button should work without errors

Let me know when you've made these changes!
