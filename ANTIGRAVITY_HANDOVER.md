# 🚀 Antigravity Agent Handover & Context Briefing

> **Instructions for the New Antigravity Agent / ID:**
> Welcome! You are continuing development on the **Ayush Bansal Portfolio** project.
> Read this document in full to instantly inherit complete project memory, architecture patterns, completed milestones, and development guidelines without re-exploring the codebase or wasting context tokens.

---

## 📋 Quick Start Prompt for New Antigravity Sessions
If you are opening a new conversation or sharing with another user/ID on Antigravity, paste this prompt:

```text
You are continuing development on Ayush Bansal's Portfolio project.
Read ANTIGRAVITY_HANDOVER.md and ai_memory/INDEX.md to review the complete architecture, test suite, and completed work before proceeding.
```

---

## 1. Project Overview & Vital Links

* **Owner & Role:** Ayush Bansal — UI/UX Designer & Product Designer
* **Contact Email:** `ayushbansal946@gmail.com`
* **Contact Phone / WhatsApp:** `+91 7500039393`
* **Live Production URL:** [`https://ayush946portfolio.web.app`](https://ayush946portfolio.web.app)
* **GitHub Repository:** [`https://github.com/Ayushbansal946/AyushBnansal_portfolio`](https://github.com/Ayushbansal946/AyushBnansal_portfolio)
* **Active Working Branch:** `main`
* **Working Directory:** `E:\portfolio\ayush-bansal-portfolio-v2.1`
* **Firebase Project ID:** `ayush946portfolio`

---

## 2. Technology Stack & Key Libraries

| Layer | Technologies Used | Version / Configuration |
| :--- | :--- | :--- |
| **Frontend Framework** | React + TypeScript | React `19.2.6`, TypeScript `~6.0.2` |
| **Build & Bundler** | Vite | Vite `^8.0.12` |
| **Styling** | Tailwind CSS v4 | `@tailwindcss/vite` `^4.3.0`, CSS design tokens in `src/index.css` |
| **Animations** | Framer Motion | `framer-motion` `^12.40.0` |
| **Routing** | React Router DOM | `react-router-dom` `^7.17.0` |
| **Database** | Firebase Firestore | `firebase` `^12.14.0` (NoSQL collections: `projects`, `experiences`, `skills`, `certificates`, `settings`) |
| **Auth** | Firebase Auth | Phone OTP (reCAPTCHA) & Passwordless Email Link |
| **Email Dispatch** | EmailJS Browser | `@emailjs/browser` `^4.4.1` client-side dispatch |
| **Testing Suite** | Vitest + RTL + JSDOM | Vitest `^5.0.5`, `@testing-library/react` `^16.3.3`, JSDOM `^29.1.1` |

---

## 3. Directory Layout & Key Files

```
ayush-bansal-portfolio-v2.1/
├── ANTIGRAVITY_HANDOVER.md     # THIS FILE (master handover briefing)
├── ai_memory/                  # Persistent AI knowledge base
│   ├── INDEX.md                # Quick navigation cheatsheet
│   ├── PROJECT_OVERVIEW.md     # Detailed architecture & data sync guide
│   ├── TESTING_STRATEGY.md     # Testing hierarchy (Static to Regression)
│   └── DEPLOYMENT_AND_OPERATIONS.md # CLI runbooks & rollback procedures
├── public/
│   ├── favicon.svg             # Custom dark & electric blue "A" monogram
│   ├── favicon.ico             # Multi-size Windows/browser ICO
│   ├── apple-touch-icon.png    # 180x180 iOS bookmark icon
│   ├── favicon-96x96.png       # High-density tab icon
│   ├── sitemap.xml             # Google image-extended sitemap
│   ├── ai.txt / ai.text        # AI crawler specification (GPTBot, ClaudeBot, etc.)
│   ├── llms.txt                # LLM markdown context document (llmstxt.org)
│   ├── robots.txt              # Crawler permissions (disallowing /admin)
│   └── resume/
│       └── Ayush_Bansal_Resume.pdf # Latest updated resume (419 KB)
├── src/
│   ├── components/
│   │   ├── Button.tsx          # Golden ratio CTA button/anchor
│   │   ├── ContactForm.tsx     # Form with strict client-side regex sanitization
│   │   ├── Navigation.tsx      # Navbar with brand logo + mobile drawer
│   │   ├── ProjectCard.tsx     # Project card with carousel & accordion
│   │   ├── WhatsAppButton.tsx  # Floating WhatsApp button with scroll trigger
│   │   └── ...
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero presentation & resume download
│   │   ├── ProcessSection.tsx  # How I Work + Tech Stack Marquee (hover-pause + tooltips)
│   │   └── ...
│   ├── test/                   # 9 Vitest test suites (25 tests, 100% passing)
│   ├── firebase.ts             # Firebase client SDK initialization
│   └── index.css               # Global theme tokens, typography, keyframes
├── firestore.rules             # Deployed Firestore security rules
└── firebase.json               # Hosting headers & rewrites
```

---

## 4. Completed Work & Features Summary

1. **Floating WhatsApp Chat Button:**
   * Component: [`src/components/WhatsAppButton.tsx`](./src/components/WhatsAppButton.tsx)
   * Behavior: Appears after 300px scroll, pulses green ring, hover tooltip, opens chat with `+91 7500039393` and pre-filled greeting.
2. **SEO & AI Search Engine Integration:**
   * Configured [`sitemap.xml`](./public/sitemap.xml), [`ai.txt`](./public/ai.txt), [`llms.txt`](./public/llms.txt), and [`robots.txt`](./public/robots.txt).
   * Upgraded [`index.html`](./index.html) with full Schema.org JSON-LD graph (`WebSite`, `ProfilePage`, `Person`), OpenGraph, and Twitter tags.
3. **Security Audit & Hardening:**
   * Confirmed zero SQL injection vulnerability (NoSQL Firestore architecture).
   * Deployed [`firestore.rules`](./firestore.rules) locking write/delete permissions to authenticated admin.
   * Hardened [`ContactForm.tsx`](./src/components/ContactForm.tsx) with strict input trimming, length boundaries, and RFC email regex.
4. **Automated Unit Testing Architecture:**
   * Configured Vitest, Testing Library, and JSDOM with 9 test files in `src/test/` (25/25 passing tests).
5. **Resume Update:**
   * Replaced resume with updated version (`419 KB`) in `public/resume/Ayush_Bansal_Resume.pdf` and verified live download.
6. **Custom Brand Favicon Suite:**
   * Designed custom dark squircle with electric blue **"A"** monogram.
   * Cache-busted with `?v=3` in `index.html` and `no-cache` headers in `firebase.json` to prevent stale browser caching.
7. **Brand Logo in Website Header:**
   * Integrated monogram icon next to the "AYUSH" wordmark in the desktop navbar and mobile slide-out menu.
8. **Interactive Tech Stack Marquee:**
   * Added GPU-accelerated continuous ticker in [`ProcessSection.tsx`](./src/sections/ProcessSection.tsx).
   * **Stops on Hover:** Pauses instantaneously at its exact pixel position on mouse enter / focus.
   * **Popup Name Hints:** Hovering any tool reveals a sleek dark tooltip badge displaying the technology's full name.
9. **Persistent AI Memory Folder:**
   * Comprehensive documentation saved in [`ai_memory/`](./ai_memory/) to minimize token consumption.

---

## 5. Standard Development Commands

Execute from `E:\portfolio\ayush-bansal-portfolio-v2.1`:

```bash
# 1. Run local development server
npm run dev

# 2. Run automated unit test suite (Vitest)
npm run test

# 3. Run tests in live watch mode
npm run test:watch

# 4. Compile and verify production build (tsc + vite)
npm run build

# 5. Deploy to live Firebase Hosting
npx firebase-tools deploy --only hosting

# 6. Deploy Firestore security rules
npx firebase-tools deploy --only firestore:rules
```

---

## 6. Developer Guidelines for Future Antigravity Agents

* ✅ **ALWAYS** run `npm run test` and `npm run build` before pushing commits or deploying.
* ✅ **MAINTAIN** existing design tokens in `src/index.css` (`--bg`, `--surface`, `--accent`, `--border`).
* ✅ **PRESERVE** accessibility: Ensure interactive elements retain `tabIndex`, `aria-label`, and keyboard focus rings.
* ❌ **NEVER** use `dangerouslySetInnerHTML` or `eval()`.
* ❌ **NEVER** expose Firebase Admin credentials in client code.
