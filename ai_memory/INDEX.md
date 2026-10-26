# AI Memory Index & Quick Reference

> **Purpose:** Persistent memory bank for AI assistants working on the Ayush Bansal Portfolio project. Use this directory to instantly recall project architecture, credentials, testing protocols, and operational workflows without wasting tokens exploring the codebase.

---

## 🗂️ Memory Files Map

| File | Purpose | Key Contents |
| :--- | :--- | :--- |
| **[`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md)** | Core Architecture & Spec | Author details, tech stack, directory tree, Firebase config, routing, data flows, and fallback systems. |
| **[`TESTING_STRATEGY.md`](./TESTING_STRATEGY.md)** | Complete QA & Testing Guide | Full testing hierarchy (Static, Unit, Integration, System, Acceptance, Smoke, Sanity, Regression) and test execution commands. |
| **[`DEPLOYMENT_AND_OPERATIONS.md`](./DEPLOYMENT_AND_OPERATIONS.md)** | Deployment & Runbooks | Git workflow, Firebase hosting/rules deployment commands, environment scripts, and live URLs. |

---

## ⚡ Instant Cheatsheet

* **Project Name:** Ayush Bansal Portfolio (`v2.2.0`)
* **Author:** Ayush Bansal (UI/UX Designer)
* **Live Production URL:** [`https://ayush946portfolio.web.app`](https://ayush946portfolio.web.app)
* **GitHub Repository:** [`https://github.com/Ayushbansal946/AyushBnansal_portfolio`](https://github.com/Ayushbansal946/AyushBnansal_portfolio)
* **Primary Tech:** React 19 + TypeScript 6 + Vite 8 + Tailwind CSS 4 + Framer Motion 12 + Firebase Firestore/Auth
* **Test Runner:** Vitest 5 + React Testing Library + JSDOM (`npm run test`)
* **Build Command:** `npm run build` (`tsc && vite build`)
* **Deploy Command:** `npx firebase-tools deploy`
