# Ayush Bansal Portfolio v2.1

A premium, dynamic UI/UX Designer portfolio built with React, featuring a custom-built, secure Content Management System (Admin Dashboard) powered by Firebase. 

This project was engineered from the ground up to provide a stunning frontend experience alongside a robust backend that allows the portfolio owner to add, edit, and delete their content without ever touching the code.

![Portfolio Version](https://img.shields.io/badge/version-2.1-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28.svg?logo=firebase)

---

## ✨ Key Features

- **Premium UI/UX:** Built with modern design principles, including glassmorphism, smooth scrolling, and dynamic micro-animations using Framer Motion.
- **Custom Admin Dashboard:** A hidden `/admin/login` route that provides a full CMS to manage Projects, Experience, Skills, and Certificates in real-time.
- **Secure Authentication:** Passwordless login via Firebase Phone OTP and Email Magic Links, strictly locked down to the owner.
- **Real-Time Database:** Powered by Firebase Firestore, ensuring instantaneous updates across the live portfolio when changes are made in the admin panel.
- **Custom Iconography:** Removed generic icon libraries in favor of a dedicated `Icons.tsx` component, allowing for 100% custom SVG vectors directly exported from Figma.
- **Serverless Contact Form:** Fully integrated with EmailJS to securely route client inquiries directly to the owner's inbox without a backend server.
- **Optimized for Production:** Configured for Firebase Hosting with custom domain security restrictions.

---

## 🛠️ Tech Stack & Tools Used

* **Frontend Framework:** React 19 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS + Vanilla CSS (for custom tokens)
* **Animations:** Framer Motion
* **Backend & Database:** Firebase Firestore
* **Authentication:** Firebase Auth (Phone OTP & Email Link)
* **Hosting:** Firebase Hosting
* **Email Service:** EmailJS

---

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
├── package.json            # Project dependencies and scripts
└── vite.config.ts          # Vite bundler configuration
```

---

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

### 3. Environment Setup
Create a `.env` file in the root directory if you need to override any local variables (Firebase Config and EmailJS public keys are safely embedded in the source for public web access, protected by Domain Restrictions).

### 4. Run Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🔒 Security Implementations

* **API Key Domain Restrictions:** The Firebase and EmailJS API keys have been strictly locked to `ayush946portfolio.web.app` and `localhost` via the Google Cloud Console to prevent unauthorized usage.
* **Firestore Security Rules:** The database rules are configured to allow public read access for the portfolio, but strictly require an authenticated admin session for any write/delete operations.
* **Protected Routes:** The `/admin` dashboard is protected by a React Context Auth wrapper that redirects unauthenticated users back to the login screen.

---

## 🌐 Deployment

The application is configured to deploy directly to Firebase Hosting.

1. Build the production bundle:
```bash
npm run build
```

2. Log into Firebase CLI:
```bash
npx firebase-tools login
```

3. Deploy to Firebase Hosting:
```bash
npx firebase-tools deploy --only hosting
```

---
*Designed & Developed by Ayush Bansal.*
