<div align="center">

# 🌟 Ayush Bansal | Premium UI/UX Portfolio v2.2

*A stunning, dynamic UI/UX Designer portfolio engineered with React and Framer Motion, featuring a completely custom-built, secure Content Management System (Admin Dashboard) powered by Firebase.*

![Portfolio Version](https://img.shields.io/badge/version-2.2-blue.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**[Live Preview](https://ayush946portfolio.web.app) • [Admin Portal](https://ayush946portfolio.web.app/admin/login)**

</div>

<br />

## 🚀 What's New in v2.2
- **Deep UI QA & Accessibility:** Implemented global semantic focus states (`*:focus-visible`) for complete keyboard navigation support. Upgraded project cards to fully accessible `role="button"` elements.
- **Project Card Redesign:** Encased each project in a premium `bg-surface` card with rounded corners, consistent padding, and a smooth hover-lift effect — matching the Certifications card style. Fixed grid layout for uniform card widths across mobile, tablet, and desktop.
- **Micro-Interactions:** Added stepped "snapping" scroll animation to the desktop Process section for a premium, presentation-like feel. Enhanced hover states across experience items.
- **Visual Polish:** Added giant background step numbers ("01", "02") to the Process section to beautifully balance the layout. Fixed broken ticker logos and added custom SVG support for ChatGPT and Microsoft 365 Copilot.
- **Admin Demo Route:** Added a secure read-only `/demo-admin` route and linked it to the navigation bar to showcase the custom CMS without risking the production database.
- **SEO & PWA:** Fully integrated Google Analytics (`gtag.js`), custom 404 pages, JSON-LD structured data, Apple Touch Icons, and a Web App Manifest.

<br />

## ✨ Key Features

- 🎨 **Premium UI/UX:** Built with modern design principles, including glassmorphism, smooth scrolling, and dynamic micro-animations using Framer Motion.
- 🎛️ **Custom Admin Dashboard:** A hidden `/admin/login` route that provides a full CMS to manage Projects, Experience, Skills, and Certificates in real-time.
- 🔐 **Secure Authentication:** Passwordless login via Firebase Phone OTP and Email Magic Links, strictly locked down to the owner.
- ⚡ **Real-Time Database:** Powered by Firebase Firestore, ensuring instantaneous updates across the live portfolio when changes are made in the admin panel.
- ✒️ **Custom Iconography:** Bypassed generic icon libraries in favor of a dedicated `Icons.tsx` component, allowing for 100% custom SVG vectors directly exported from Figma.
- 📧 **Serverless Contact Form:** Fully integrated with EmailJS to securely route client inquiries directly to the owner's inbox without a backend server.
- 🚀 **Optimized for Production:** Configured for Firebase Hosting with custom domain security restrictions.

<br />

## 🛠️ Tech Stack & Tools Used

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS + Vanilla CSS (for custom tokens) |
| **Animations** | Framer Motion |
| **Backend & Database** | Firebase Firestore |
| **Authentication** | Firebase Auth (Phone OTP & Email Link) |
| **Hosting** | Firebase Hosting |
| **Email Service** | EmailJS |

<br />

## 📂 Folder Structure

```text
ayush-bansal-portfolio-v2.1/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Buttons, Cards, Icons)
│   ├── contexts/           # React Context providers (AuthContext)
│   ├── data/               # Fallback data and types
│   ├── hooks/              # Custom React hooks (useSectionData)
│   ├── pages/              # Main routes (Portfolio, AdminDashboard, Login)
│   ├── sections/           # Modular portfolio sections (Hero, Projects, etc.)
│   ├── App.tsx             # Main application router
│   ├── firebase.ts         # Firebase initialization and configuration
│   └── index.css           # Global design system tokens and Tailwind setup
├── .firebaserc             # Firebase project configuration
├── firebase.json           # Firebase Hosting configuration
└── package.json            # Project dependencies and scripts
```

<br />

## 🔒 Security Implementations

* **API Key Domain Restrictions:** The Firebase and EmailJS API keys have been strictly locked to `ayush946portfolio.web.app` and `localhost` via the Google Cloud Console to prevent unauthorized usage.
* **Firestore Security Rules:** The database rules are configured to allow public read access for the portfolio, but strictly require an authenticated admin session for any write/delete operations.
* **Protected Routes:** The `/admin` dashboard is protected by a React Context Auth wrapper that redirects unauthenticated users back to the login screen.

<br />

## 🚀 Setup & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/Ayushbansal946/AyushBnansal_portfolio.git
cd AyushBnansal_portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

<br />

## 📬 Contact & Connect

Feel free to reach out for collaborations, freelance work, or just to say hi!

- ✉️ **Email:** [ayushbansal946@gmail.com](mailto:ayushbansal946@gmail.com)
- 📱 **Phone:** +91 7500039393
- 🌐 **Live Portfolio:** [ayush946portfolio.web.app](https://ayush946portfolio.web.app)

<br />
<br />

<div align="center">
  <i>Designed & Developed by Ayush Bansal</i>
</div>
