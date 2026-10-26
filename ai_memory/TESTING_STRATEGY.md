# Testing Strategy & Quality Assurance Architecture

> **Lifecycle Reference:** This document defines the testing methodology, levels, and automation suites for the Ayush Bansal Portfolio project. Any AI agent or developer making modifications must adhere to this framework.

---

## 1. Testing Levels & Methodology Framework

### 1.1 Static Testing
* **Definition:** Reviewing requirements, design, structure, and code **without running executable code**.
* **Project Applications:**
  * **TypeScript Static Verification:** `tsc --noEmit` verifies type soundness, interface compliance, and dead-code detection (`noUnusedLocals`, `noUnusedParameters`).
  * **Code Reviews & Linting:** Ensuring adherence to accessibility standards, color contrast, and proper clean architecture.
  * **Requirements Audit:** Validating that every requested UI/UX requirement matches the Figma design system before writing implementation code.

---

### 1.2 Unit Testing
* **Definition:** Testing one function, component, or class **in complete isolation**, typically by developers.
* **Project Applications (Vitest + React Testing Library):**
  * [`Button.test.tsx`](../src/test/Button.test.tsx): Tests `<button>` and `<a as="a">` element rendering, onClick event triggers, and style variants.
  * [`ContactForm.test.tsx`](../src/test/ContactForm.test.tsx): Tests form field rendering, short name rejection, invalid email format detection, short message validation, and mock EmailJS dispatch.
  * [`WhatsAppButton.test.tsx`](../src/test/WhatsAppButton.test.tsx): Tests initial scroll visibility (`scrollY > 300`), floating CTA appearance, and encoded `wa.me` URL structure.
  * [`ProjectCard.test.tsx`](../src/test/ProjectCard.test.tsx): Tests project numbering, title, description, and interactive accordion expansion.
  * [`CertificateCard.test.tsx`](../src/test/CertificateCard.test.tsx): Tests title, issuer, image logo rendering, and credential preview click handlers.
  * [`ExperienceItem.test.tsx`](../src/test/ExperienceItem.test.tsx): Tests timeline row rendering and expandable bullet points/tool tags.
  * [`Navigation.test.tsx`](../src/test/Navigation.test.tsx): Tests logo link, availability indicator, and mobile hamburger overlay open/close transitions.
  * [`fallbackData.test.ts`](../src/test/fallbackData.test.ts): Tests data schema consistency (ensuring non-empty IDs, required keys, and valid external links).

---

### 1.3 Integration Testing
* **Definition:** Verifying that independent modules or subsystems **work seamlessly together**.
* **Common Approaches:**
  * **Top-Down:** Testing top-level containers (`App.tsx`, `PortfolioHome`) with sub-components mocked or progressively integrated.
  * **Bottom-Up:** Testing leaf components (`Button`, `Icons`) working together inside composite components (`ContactForm`, `Navigation`).
  * **Sandwich (Hybrid):** Testing middle-layer state controllers (`useSectionData`, `AuthContext`) simultaneously with top-level views and leaf widgets.
  * **Big Bang:** Integrating all modules at once during production build verification.
* **Project Applications:**
  * **Firestore + Fallback Integration:** Verifying that `useSectionData` falls back to `fallbackData.ts` when Firebase returns empty snapshots or errors.
  * **Auth + Routing Guard Integration:** Verifying that `ProtectedRoute` redirects unauthenticated visitors to `/admin/login`.
  * **Form + EmailJS Integration:** Verifying that valid user input structures serialize into the EmailJS template payload.

---

### 1.4 System Testing
* **Definition:** Testing the **complete, integrated application** against all business and technical requirements.
* **The Two Halves:**

#### A. Functional System Testing
* Does the application perform its intended business functions?
  1. Visitors can browse all showcase projects, expand details, and inspect imagery.
  2. Visitors can submit messages via the contact form and reach Ayush via WhatsApp.
  3. Visitors can inspect certificates in an interactive modal.
  4. Administrators can log in, edit project data, and save changes to Firestore.
  5. Fallback mechanisms guarantee zero site downtime even if external APIs are unavailable.

#### B. Non-Functional System Testing
* **Performance:**
  * *Load:* Page load under standard network speeds (LCP < 1.8s, FID/INP < 100ms).
  * *Stress / Spike:* Client-side responsiveness when rapid clicks occur on carousels or form submits.
  * *Endurance:* Memory stability during extended user sessions with active canvas animations or carousels (no memory leaks in event listeners).
* **Security:**
  * Absence of SQL injection (NoSQL Firestore architecture).
  * Enforced Firestore security rules (`firestore.rules`).
  * Prevention of XSS via React contextual auto-escaping.
  * Strict client-side input sanitization.
* **Usability & UX:**
  * Fluid typography across screen sizes (`text-fluid-*`).
  * Touch-friendly targets (minimum 44×44px, WhatsApp FAB at 56×56px).
  * High-contrast legible text on dark backgrounds.
* **Compatibility:**
  * Cross-browser verification: Google Chrome, Apple Safari (iOS/macOS), Mozilla Firefox, Microsoft Edge.
  * Responsive viewports: Mobile (320px–480px), Tablet (768px–1024px), Desktop (1280px+).
* **Accessibility (a11y):**
  * Semantic HTML landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`).
  * ARIA attributes on interactive elements (`aria-label`, `aria-expanded`).
  * Full keyboard accessibility (tab navigation, Enter/Space key triggers).

---

### 1.5 Acceptance Testing
* **Definition:** Final verification and formal sign-off before production release.
* **Sub-types:**
  * **UAT (User Acceptance Testing):** Direct sign-off by Ayush Bansal confirming visual aesthetic, copy accuracy, and project showcases.
  * **Alpha Testing:** Internal team walkthrough checking edge-case interactions and admin panel features.
  * **Beta Testing:** Limited group of external users (peers, hiring managers, design community) reviewing usability and sending feedback.

---

### 1.6 Smoke Testing
* **Definition:** A rapid initial test confirming that a new build is fundamentally stable and testable.
* **Execution Protocol:**
  ```bash
  # 1. Verify build compiles with zero errors
  npm run build

  # 2. Run test suite to verify critical paths
  npm run test
  ```
  * If the build succeeds and core components mount, the build passes smoke testing.

---

### 1.7 Sanity Testing
* **Definition:** A focused, narrow verification executed after a bug fix or minor update to verify that specific issue is resolved.
* **Example:** After tweaking the WhatsApp button position or ContactForm regex, re-testing only `WhatsAppButton.test.tsx` or `ContactForm.test.tsx`:
  ```bash
  npx vitest run src/test/WhatsAppButton.test.tsx
  ```

---

### 1.8 Regression Testing
* **Definition:** Re-running earlier test suites to guarantee that recent changes, bug fixes, or optimizations did not unintentionally break existing features.
* **Execution Protocol:**
  * Executed before every Git commit and deployment:
  ```bash
  npm run test
  ```
  * Ensures 100% pass rate across all 8 test suites.

---

## 2. Test Execution Commands Quick Reference

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **Run all tests** | `npm run test` | Single execution of all test suites via Vitest. |
| **Interactive Watch** | `npm run test:watch` | Re-runs tests on file changes during development. |
| **Run single test file** | `npx vitest run src/test/<FileName>.test.tsx` | Targeted sanity test execution. |
| **Full Production Check** | `npm run build && npm run test` | Pre-deployment smoke and regression gate. |
