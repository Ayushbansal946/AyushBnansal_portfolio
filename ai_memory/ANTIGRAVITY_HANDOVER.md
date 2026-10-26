# 🛸 ANTIGRAVITY MASTER HANDOVER & PROJECT DOSSIER

> **Target Audience:** Any AI Assistant (Antigravity Agent, Claude, Gemini, GPT) or Software Engineer picking up the **Ayush Bansal Portfolio** codebase under a new conversation, user account, or machine ID.
> 
> **Instructions for the New AI Agent:** Read this document completely. It contains the exact technical architecture, API credentials, Firebase configuration, GitHub workflows, testing protocols, and design systems so that you can resume development with zero context loss and zero token waste.

---

## ⚡ Instant Onboarding Prompt
When switching to a new Antigravity session or sharing this workspace with another user/ID, paste this exact prompt:

```text
You are taking over development on the Ayush Bansal Portfolio project.
Read ANTIGRAVITY_HANDOVER.md and ai_memory/INDEX.md to immediately inherit all project memory, Firebase credentials, GitHub remotes, component architectures, and the 25-case Vitest suite before taking any action.
```

---

## 1. Project Identity & Vital Information

* **Owner:** Ayush Bansal
* **Role:** UI/UX Designer & Product Designer
* **Location:** India
* **Primary Email:** `ayushbansal946@gmail.com`
* **Phone / WhatsApp:** `+91 7500039393`
* **Social Links:**
  * **LinkedIn:** `https://linkedin.com/in/ayush946`
  * **Behance:** `https://behance.net/Ayush-bansal`
  * **GitHub:** `https://github.com/Ayushbansal946`
* **Live Production URL:** [`https://ayush946portfolio.web.app`](https://ayush946portfolio.web.app)
* **Local Workspace Directory:** `E:\portfolio\ayush-bansal-portfolio-v2.1`

---

## 2. GitHub Repository Configuration

* **Remote Repository URL:** [`https://github.com/Ayushbansal946/AyushBnansal_portfolio.git`](https://github.com/Ayushbansal946/AyushBnansal_portfolio.git)
* **Default Branch:** `main`
* **Clone Command:**
  ```bash
  git clone https://github.com/Ayushbansal946/AyushBnansal_portfolio.git
  cd AyushBnansal_portfolio/ayush-bansal-portfolio-v2.1
  ```
* **Git Remote Verification:**
  ```bash
  git remote -v
  # origin https://github.com/Ayushbansal946/AyushBnansal_portfolio.git (fetch)
  # origin https://github.com/Ayushbansal946/AyushBnansal_portfolio.git (push)
  ```
* **Git Workflow:**
  All changes must be tested with `npm run test` and `npm run build` prior to committing. All production commits are pushed directly to `main` and deployed to Firebase Hosting.

---

## 3. Firebase Architecture & Configuration

The application is deployed on **Google Firebase** using Firebase Hosting, Cloud Firestore (NoSQL), and Firebase Authentication.

### 3.1 Client Configuration (`src/firebase.ts`)
```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjsOHkhs3LlvlL6UBWK96EA86-sicbeq0",
  authDomain: "ayush946portfolio.firebaseapp.com",
  projectId: "ayush946portfolio",
  storageBucket: "ayush946portfolio.firebasestorage.app",
  messagingSenderId: "364535937831",
  appId: "1:364535937831:web:8344c2e9d1a81ddf704702",
  measurementId: "G-3HJ698YM3F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 3.2 Firebase CLI Files
* **`.firebaserc`:**
  ```json
  {
    "projects": {
      "default": "ayush946portfolio"
    }
  }
  ```
* **`firebase.json`:**
  Configured for Single Page Application (SPA) routing, custom caching headers for favicons, and firestore rules:
  ```json
  {
    "firestore": {
      "rules": "firestore.rules"
    },
    "hosting": {
      "public": "dist",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "headers": [
        {
          "source": "**/*favicon*",
          "headers": [
            { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
          ]
        },
        {
          "source": "**/*apple-touch-icon*",
          "headers": [
            { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
          ]
        }
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  }
  ```

### 3.3 Firestore Security Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public collections are readable by anyone to render the portfolio
    // Modifications are strictly locked to authenticated admin sessions
    match /projects/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /experiences/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /skills/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /certificates/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Reject all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 3.4 Firestore Collections & Data Schemas

1. **`projects` (Collection):**
   * `id` (`string`): e.g. `'project_1'`
   * `num` (`string`): e.g. `'01'`
   * `title` (`string`): Project name (e.g. `'FOUNDRY'`)
   * `subtitle` (`string`): Subtitle (e.g. `'Male Accessories'`)
   * `description` (`string`): Project brief
   * `images` (`string[]`): Array of image/video URLs
   * `tags` (`string[]`): Category tags (e.g. `['Figma', 'UI Design', 'Mobile App']`)
   * `type` (`string`): e.g. `'Mobile App'` or `'Web Platform'`
   * `tools` (`string`): e.g. `'Figma, Illustrator'`
   * `details` (`string[]`): Array of accomplishment bullet points
2. **`experiences` (Collection):**
   * `id` (`string`): e.g. `'exp_1'`
   * `num` (`string`): e.g. `'01'`
   * `role` (`string`): Job title (e.g. `'Freelance UI/UX Designer'`)
   * `company` (`string`): Employer (e.g. `'Self-Employed'`)
   * `date` (`string`): e.g. `'Jun 2025 – Present'`
   * `tools` (`string[]`): Array of tool names used
   * `bullets` (`string[]`): Accomplishment bullet points
3. **`skills` (Collection):**
   * `id` (`string`): e.g. `'skill_cat_1'`
   * `title` (`string`): Category header (e.g. `'01 / Artificial Intelligence'`)
   * `skills` (`string[]`): Array of skills (e.g. `['Figma', 'Generative AI', 'React']`)
4. **`certificates` (Collection):**
   * `id` (`string`): e.g. `'cert_1'`
   * `title` (`string`): Certification name
   * `issuer` (`string`): Issuing institution (e.g. `'IBM'`, `'Accenture'`, `'IIT Roorkee'`)
   * `logoUrl` (`string`): Path to issuer logo SVG/PNG
   * `fileUrl` (`string`): Path to credential PDF or image
   * `type` (`string`): `'pdf'` or `'image'`
5. **`settings` (Collection) -> `profile` (Document):**
   * `resumeUrl` (`string`): `/resume/Ayush_Bansal_Resume.pdf`
   * `phone` (`string`): `+91 7500039393`
   * `email` (`string`): `ayushbansal946@gmail.com`
   * `linkedin` (`string`): `https://linkedin.com/in/ayush946`
   * `behance` (`string`): `https://behance.net/Ayush-bansal`

### 3.5 Real-Time Data Hook & Cache Architecture (`src/hooks/useSectionData.ts`)
* Visitors first instantly receive data from `localStorage` (`cache_<collectionName>`) to eliminate UI layout shift or flash.
* A Firestore `onSnapshot` listener runs in the background. If live changes occur, state and `localStorage` update in real time.
* If Firestore is unreachable or offline, the app seamlessly falls back to [`src/data/fallbackData.ts`](./src/data/fallbackData.ts).

### 3.6 Firebase Authentication Architecture
* Admin access is restricted in [`src/pages/Login.tsx`](./src/pages/Login.tsx):
  * **Phone OTP:** Sends SMS code to `+917500039393` verified via invisible reCAPTCHA.
  * **Passwordless Email Link:** Dispatches sign-in link to `ayushbansal946@gmail.com`.
* Authentication state is broadcast globally via [`src/contexts/AuthContext.tsx`](./src/contexts/AuthContext.tsx).
* The `/admin/*` route is protected by [`src/components/ProtectedRoute.tsx`](./src/components/ProtectedRoute.tsx).
* A simulated read-only CMS is available to prospective clients and guests at `/demo-admin` via [`src/pages/DemoAdminDashboard.tsx`](./src/pages/DemoAdminDashboard.tsx).

---

## 4. Third-Party Integrations & API Keys

### 4.1 EmailJS Contact Form Integration (`src/components/ContactForm.tsx`)
* **Provider:** EmailJS Browser SDK
* **Service ID:** `service_xcaj0rh`
* **Template ID:** `template_29pap4c`
* **Public Key:** `QI9x2QSSGOmPBEmWx`
* **Payload Variables:**
  * `name`: Visitor name (sanitized 2–80 chars)
  * `email`: Visitor email (RFC regex validated)
  * `message`: Visitor message (sanitized 5–3000 chars)

### 4.2 Google Analytics 4 (`index.html`)
* **Tracking ID:** `G-H9SLJ2KW7F`
* **Script:** Integrated asynchronously in `<head>`.

### 4.3 WhatsApp Floating Action Button (`src/components/WhatsAppButton.tsx`)
* **Target Number:** `917500039393`
* **Default URL:** `https://wa.me/917500039393?text=Hi%20Ayush!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project.`
* **Trigger:** Mounts in DOM when `window.scrollY > 300`.
* **Visuals:** Fixed bottom-right, `#25D366` background, 56×56px touch target, `@keyframes whatsappPulse` infinite ring animation.

---

## 5. Visual Design System & CSS Tokens (`src/index.css`)

The portfolio uses an ultra-dark, high-contrast, minimalist design language tailored for a UI/UX Designer:

### 5.1 CSS Custom Properties
```css
:root {
  --bg:           #0A0A0A; /* Deep obsidian background */
  --surface:      #161616; /* Elevated card surface */
  --accent:       #0055FF; /* Electric Royal Blue primary accent */
  --accent-dark:  #003399; /* Deep blue active state */
  --accent-glow:  rgba(0, 85, 255, 0.22);
  --text-main:    #E0E0E0; /* Primary high-contrast text */
  --text-light:   #C0C0C0; /* Secondary text */
  --text-muted:   #787878; /* Muted labels & timestamps */
  --border:       #2A2A2A; /* Card and divider border */
  --white:        #F0F0F0;

  --font-heading: 'Anton', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

### 5.2 Fluid Clamp Typography
* `.text-fluid-heading`: `clamp(2rem, 5vw, 4rem)`
* `.text-fluid-hero`: `clamp(3rem, 10vw, 8.5rem)`
* `.text-fluid-step-title`: `clamp(1.8rem, 4.3vw, 4.6rem)`
* `.text-fluid-proj-num`: `clamp(1.75rem, 3vw, 2.5rem)`
* `.text-fluid-proj-title`: `clamp(1.5rem, 2.5vw, 2rem)`
* `.text-fluid-proj-desc`: `clamp(1rem, 1.2vw, 1.15rem)`

### 5.3 Golden Ratio Mathematics
* All core CTA buttons use a border radius calculated via the Golden Ratio constant ($\phi \approx 1.61803398875$):
  $$\text{Radius} = \frac{20\text{px}}{\phi} \approx 12.36\text{px}$$

---

## 6. Complete Component & Section Inventory

### 6.1 Landing Page Sections (`src/sections/`)
1. **`HeroSection.tsx`:** Above-the-fold hero with oversized "AYUSH®" wordmark, editorial tagline, cityscape background blend, and direct "Download Resume" CTA.
2. **`ProjectsSection.tsx`:** Showcase of client projects featuring image carousels, category tags, and expandable process breakdowns.
3. **`ProcessSection.tsx`:** 
   * Desktop: Sticky scroll-driven horizontal process stepper (300vh scroll track).
   * Mobile: Touch-swipe CSS snap carousel.
   * **Tech Stack Marquee:** Infinite hardware-accelerated ticker featuring Figma, Adobe CC, Canva, HTML5, CSS3, JS, TS, React, Tailwind, Firebase, Copilot, ChatGPT, Gemini, Claude, and Antigravity. **Pauses on hover** and reveals interactive **popup tooltips** with tool names.
4. **`SkillsSection.tsx`:** Categorized interactive skill matrix (AI, UI/UX, Web Dev, Tools).
5. **`ExperienceSection.tsx`:** Expandable professional timeline rows detailing role, company, dates, tools, and resume bullet points.
6. **`CertificatesSection.tsx`:** Interactive grid of credentials from IBM, Microsoft, Accenture, and IIT Roorkee, opening full-screen PDF/image modals.
7. **`AboutSection.tsx`:** Personal philosophy, designer biography, and design principles.
8. **`ContactSection.tsx`:** High-contrast contact section featuring the EmailJS-integrated form, direct contact links, and social links.

### 6.2 Atomic Components (`src/components/`)
* **`Button.tsx`:** Multi-variant CTA (`primary`, `secondary`, `outline`) supporting both `<button>` and `<a as="a">`.
* **`CertificateCard.tsx`:** Interactive credential card with issuer logo and modal click trigger.
* **`ContactForm.tsx`:** Validated contact form with input length bounds, RFC email regex, and submission states.
* **`ExperienceItem.tsx`:** Timeline row expanding to show tools and accomplishments.
* **`Navigation.tsx`:** Fixed navbar with brand monogram logo, availability indicator, GitHub link, Admin Demo link, and mobile drawer.
* **`ProjectCard.tsx`:** Card container housing the carousel and accordion details.
* **`ProjectCarousel.tsx`:** Multi-image project showcase with touch navigation and pagination indicators.
* **`WhatsAppButton.tsx`:** Floating WhatsApp action button with scroll trigger and pulse animation.
* **`WordReveal.tsx`:** Staggered typography entrance animations.
* **`Icons.tsx`:** Clean, tree-shakable SVG icon library.

---

## 7. SEO, AI Crawlers & Brand Favicon Suite

### 7.1 Public SEO & Crawler Files (`public/`)
* **`sitemap.xml`:** XML sitemap with `xmlns:image` extensions indexing hero and profile photos for Google Images.
* **`ai.txt` & `ai.text`:** Machine-readable AI crawler file specifying site identity, licensing, and tools.
* **`llms.txt`:** Standard LLM markdown context document (conforming to `llmstxt.org`).
* **`robots.txt`:** Permits all legitimate search bots and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), while strictly disallowing private admin routes (`/admin`, `/demo-admin`).
* **`manifest.json`:** PWA manifest with dark theme definitions and maskable icon pointers.

### 7.2 Custom Brand Favicon Suite
* **Design:** Deep obsidian squircle (`#0A0A0A`) with subtle border (`#262626`), bold white architectural **"A"** glyph, and an electric blue (`#0055FF`) accent crossbar and dot.
* **Files:**
  * `favicon.svg`: Vector icon for modern desktop/mobile browsers.
  * `favicon.ico`: Multi-resolution (16×16, 32×32, 48×48) for Windows & legacy browsers.
  * `favicon-96x96.png`: High-density displays.
  * `apple-touch-icon.png`: 180×180 for iOS Safari home screen bookmarks.
  * `web-app-manifest-192x192.png` & `web-app-manifest-512x512.png`: PWA app launchers.
* **Cache Management:** `<link>` tags in `index.html` use `?v=3` query parameters, and `firebase.json` headers enforce `no-cache, no-store, must-revalidate` to prevent stale browser caching.

---

## 8. Automated Unit Testing Suite (Vitest)

The codebase has a comprehensive automated testing suite built with **Vitest**, **React Testing Library**, and **JSDOM**.

### 8.1 Test Inventory (9 Suites / 25 Passing Tests)
| Test File | Component / Area | Verification Criteria |
| :--- | :--- | :--- |
| `src/test/Button.test.tsx` | `Button.tsx` | Label rendering, onClick triggers, `<a as="a">` anchor mode, style variants. |
| `src/test/ContactForm.test.tsx` | `ContactForm.tsx` | Input rendering, name validation, email regex validation, short message rejection, mock EmailJS dispatch. |
| `src/test/WhatsAppButton.test.tsx` | `WhatsAppButton.tsx` | Hidden when `scrollY = 0`, appears when `scrollY > 300`, valid `wa.me` URL formatting. |
| `src/test/ProjectCard.test.tsx` | `ProjectCard.tsx` | Basic details rendering, click-to-expand accordion toggles. |
| `src/test/CertificateCard.test.tsx` | `CertificateCard.tsx` | Title, issuer, logo loading, preview click handler. |
| `src/test/ExperienceItem.test.tsx` | `ExperienceItem.tsx` | Role, company, dates, row expansion for tools and bullets. |
| `src/test/Navigation.test.tsx` | `Navigation.tsx` | Logo mark, brand name, availability badge, drawer open/close animations. |
| `src/test/TechStackMarquee.test.tsx` | `ProcessSection.tsx` | Marquee rendering, accessible ARIA tool labels, tooltip hints. |
| `src/test/fallbackData.test.ts` | `fallbackData.ts` | Data schema integrity (non-empty arrays, required keys, valid contact URLs). |

### 8.2 Test Commands
```bash
# Run all tests once
npm run test

# Run tests in interactive watch mode
npm run test:watch

# Run a specific test suite
npx vitest run src/test/ContactForm.test.tsx
```

---

## 9. Complete Developer Runbook

### 9.1 Environment Prerequisites
* **Node.js:** `v22.17.1` or higher
* **NPM:** `v11.10.0` or higher
* **Operating System:** Windows / macOS / Linux

### 9.2 Daily Commands
```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Run Vitest unit tests
npm run test

# Compile production bundle (Typecheck + Vite build)
npm run build

# Deploy hosting to live production
npx firebase-tools deploy --only hosting

# Deploy Firestore database security rules
npx firebase-tools deploy --only firestore:rules
```

### 9.3 Emergency Rollback Procedure
* **Firebase Console:** Open Firebase Console -> Hosting -> Release History -> Select previous stable version -> Click **Rollback**.
* **Git:**
  ```bash
  git log -n 5 --oneline
  git revert HEAD
  git push origin main
  npm run build && npx firebase-tools deploy --only hosting
  ```

---

## 10. AI Memory Synchronization
Detailed companion documents exist in [`ai_memory/`](./ai_memory/):
* [`ai_memory/INDEX.md`](./ai_memory/INDEX.md): Memory files navigation map.
* [`ai_memory/PROJECT_OVERVIEW.md`](./ai_memory/PROJECT_OVERVIEW.md): In-depth architecture specification.
* [`ai_memory/TESTING_STRATEGY.md`](./ai_memory/TESTING_STRATEGY.md): Testing levels from Static to Regression.
* [`ai_memory/DEPLOYMENT_AND_OPERATIONS.md`](./ai_memory/DEPLOYMENT_AND_OPERATIONS.md): Operations runbook.
