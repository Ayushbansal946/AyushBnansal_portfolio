# Project Overview & Architecture Reference

## 1. Identity & Contact Information
* **Name:** Ayush Bansal
* **Role:** UI/UX Designer & Product Designer
* **Email:** `ayushbansal946@gmail.com`
* **Phone / WhatsApp:** `+91 7500039393`
* **LinkedIn:** `https://linkedin.com/in/ayush946`
* **Behance:** `https://behance.net/Ayush-bansal`
* **GitHub:** `https://github.com/Ayushbansal946`
* **Live Portfolio:** `https://ayush946portfolio.web.app`

---

## 2. Technology Stack & Dependencies
* **Core:**
  * React `19.2.6`
  * TypeScript `~6.0.2`
  * Vite `^8.0.12`
  * Tailwind CSS `^4.3.0` (`@tailwindcss/vite`)
  * Framer Motion `^12.40.0`
  * React Router DOM `^7.17.0`
* **Backend & Integrations:**
  * **Firebase Firestore (`^12.14.0`):** NoSQL cloud database storing live projects, experiences, skills, certificates, and profile configurations.
  * **Firebase Auth:** Phone OTP (reCAPTCHA) and passwordless email link authentication.
  * **EmailJS Browser (`^4.4.1`):** Client-side transactional email service for the contact form.
* **Testing:**
  * Vitest `^5.0.5`
  * `@testing-library/react` `^16.3.3`
  * `@testing-library/jest-dom` `^7.0.1`
  * JSDOM `^29.1.1`

---

## 3. Directory Layout
```
ayush-bansal-portfolio-v2.1/
├── .firebase/                  # Firebase hosting cache
├── ai_memory/                  # Persistent AI knowledge base (this directory)
│   ├── INDEX.md
│   ├── PROJECT_OVERVIEW.md
│   ├── TESTING_STRATEGY.md
│   └── DEPLOYMENT_AND_OPERATIONS.md
├── public/                     # Static production assets (served at root)
│   ├── ai.text / ai.txt        # Machine-readable AI crawler specification
│   ├── llms.txt                # LLM markdown context document (llmstxt.org)
│   ├── robots.txt              # Crawler permissions & disallows (/admin)
│   ├── sitemap.xml             # XML sitemap with Google Image metadata
│   ├── manifest.json           # Web app manifest
│   ├── images/                 # High-resolution hero and profile photos
│   ├── logos/                  # Issuer & tool SVG/PNG logos
│   ├── certificates/           # PDF and image credentials
│   └── resume/                 # Downloadable PDF resume
├── src/
│   ├── assets/                 # Build-time static images & icons
│   ├── components/             # Reusable UI & Atomic components
│   │   ├── Button.tsx          # Golden-ratio styled CTA button / link
│   │   ├── CertificateCard.tsx # Credential preview card
│   │   ├── ContactForm.tsx     # Contact form with input sanitization & EmailJS
│   │   ├── ContactInfo.tsx     # Contact links and details
│   │   ├── ExperienceItem.tsx  # Timeline item with expandable details
│   │   ├── Icons.tsx           # Feather-style SVG icons
│   │   ├── Navigation.tsx      # Fixed responsive navbar & mobile overlay
│   │   ├── ProjectCard.tsx     # Project card with carousel & accordion
│   │   ├── ProjectCarousel.tsx # Image carousel with pagination dots
│   │   ├── ProtectedRoute.tsx  # React Router guard requiring auth
│   │   ├── WhatsAppButton.tsx  # Floating pulse CTA opening wa.me
│   │   └── WordReveal.tsx      # Framer Motion animated typography
│   ├── contexts/
│   │   └── AuthContext.tsx     # Firebase Auth context & observer
│   ├── data/
│   │   └── fallbackData.ts     # Offline/fail-safe fallback dataset
│   ├── hooks/
│   │   ├── useProfileSettings.ts # Profile document hook with caching
│   │   └── useSectionData.ts   # Firestore onSnapshot hook with localStorage cache
│   ├── pages/
│   │   ├── AdminDashboard.tsx  # Full CMS editor for Firebase Firestore
│   │   ├── DemoAdminDashboard.tsx # Client-side simulated editor (read-only demo)
│   │   ├── Login.tsx           # OTP / Email sign-in page
│   │   └── NotFound.tsx        # 404 error page
│   ├── sections/               # Main one-page landing sections
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── CertificatesSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── test/                   # Vitest unit & integration test suites
│   │   ├── setup.ts            # JSDOM matchMedia & IntersectionObserver mocks
│   │   ├── Button.test.tsx
│   │   ├── CertificateCard.test.tsx
│   │   ├── ContactForm.test.tsx
│   │   ├── ExperienceItem.test.tsx
│   │   ├── fallbackData.test.ts
│   │   ├── Navigation.test.tsx
│   │   ├── ProjectCard.test.tsx
│   │   └── WhatsAppButton.test.tsx
│   ├── App.tsx                 # Routing & global providers
│   ├── firebase.ts             # Firebase client SDK initialization
│   ├── index.css               # Global theme variables & custom CSS
│   └── main.tsx                # React entry point
├── firestore.rules             # Production security rules for Firestore
├── firebase.json               # Firebase deployment configuration
├── package.json                # Scripts & package dependencies
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite & Vitest configuration
```

---

## 4. Routing Architecture
| Route | Component | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `PortfolioHome` in `App.tsx` | **Public** | One-page portfolio layout rendering all 8 sections + WhatsApp FAB. |
| `/admin/login` | `Login.tsx` | **Public** | Phone OTP (hardcoded `+917500039393`) / Email link login. |
| `/admin/*` | `AdminDashboard.tsx` | **Protected** | Authenticated CMS dashboard for editing projects, skills, certs, and profile. |
| `/demo-admin` | `DemoAdminDashboard.tsx` | **Public (Demo)** | Interactive preview of the admin CMS without modifying production Firestore. |
| `*` | `NotFound.tsx` | **Public** | Custom 404 page redirecting back to home. |

---

## 5. Data Flow & Synchronization
1. **Initial Mount:**
   `useSectionData(collectionName, fallbackData)` first checks `localStorage` cache (`cache_<collectionName>`).
2. **Real-time Listener:**
   `onSnapshot` connects to Firestore. When data arrives, it updates React state and synchronizes `localStorage`.
3. **Fail-safe Fallback:**
   If Firestore is unreachable or offline, the component automatically falls back to `fallbackData.ts`.
4. **Offline Sync Script:**
   `npm run db:sync` fetches the latest Firestore records and updates `fallbackData.ts` automatically.

---

## 6. Security Infrastructure
1. **Firestore Database Rules (`firestore.rules`):**
   * Collections `projects`, `experiences`, `skills`, `certificates`, `settings` allow **read** for everyone (`allow read: if true`).
   * Modifications (create, update, delete) are strictly locked to authenticated users (`allow write: if request.auth != null`).
   * All other collections/documents are rejected by default (`allow read, write: if false`).
2. **SQL Injection:**
   * Not applicable. The application uses Firebase Firestore (NoSQL) with typed JavaScript object SDK APIs. No SQL query compilation or string concatenation exists.
3. **XSS Protection:**
   * React automatically escapes JSX expressions.
   * Zero occurrences of `dangerouslySetInnerHTML`, `eval()`, or `Function()`.
4. **Contact Form Sanitization:**
   * Name trimmed (2–80 chars).
   * Email validated via strict regex.
   * Message trimmed (5–3000 chars).
   * Debounced to prevent multi-click spam.
