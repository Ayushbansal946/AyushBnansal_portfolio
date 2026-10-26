# Deployment & Operations Runbook

> **Purpose:** Reference manual for building, testing, committing, and deploying updates to GitHub and Firebase Hosting.

---

## 1. Environment & Prerequisites
* **Node.js:** `v22.17.1+`
* **NPM:** `11.10.0+`
* **Firebase Project ID:** `ayush946portfolio`
* **Hosting URL:** [`https://ayush946portfolio.web.app`](https://ayush946portfolio.web.app)
* **GitHub Repository:** [`https://github.com/Ayushbansal946/AyushBnansal_portfolio`](https://github.com/Ayushbansal946/AyushBnansal_portfolio)

---

## 2. Standard Deployment Workflow

Always execute the following pipeline to prevent deploying broken code:

### Step 1: Run Static Checks & Smoke Tests
```bash
# 1. Typecheck and build bundle
npm run build

# 2. Run full automated regression suite
npm run test
```

### Step 2: Commit & Push to GitHub
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

### Step 3: Deploy to Live Production
```bash
# Deploy hosting assets
npx firebase-tools deploy --only hosting

# If firestore.rules changed, also deploy rules
npx firebase-tools deploy --only firestore:rules
```

---

## 3. SEO & Public Crawler Files
The following static files reside in `public/` and are published to root upon build:
* [`sitemap.xml`](../public/sitemap.xml): XML sitemap with image namespace extensions.
* [`ai.txt`](../public/ai.txt) / [`ai.text`](../public/ai.text): Machine-readable AI crawler specification.
* [`llms.txt`](../public/llms.txt): LLM markdown context document (llmstxt.org).
* [`robots.txt`](../public/robots.txt): Search engine and AI crawler rules (disallowing `/admin` & `/demo-admin`).
* [`manifest.json`](../public/manifest.json): Progressive Web App manifest.

---

## 4. Emergency Rollback Procedures
* **Firebase Hosting Instant Rollback:**
  1. Open Firebase Console → Hosting → Release History.
  2. Select the previous stable version and click **Rollback**.
* **Git Rollback:**
  ```bash
  git log -n 5 --oneline
  git revert HEAD
  git push origin main
  npm run build && npx firebase-tools deploy --only hosting
  ```
