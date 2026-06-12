# Ayush Bansal - Personal Portfolio & Admin Dashboard

Welcome to the source code for my personal portfolio! This project is a highly customized, premium portfolio website built to showcase my design work, projects, and experiences. 

What makes this project unique is its **fully integrated, secure Admin Dashboard**. Instead of hardcoding my portfolio data into the source code, I can log in securely and update my projects, skills, and experiences in real-time using a custom-built Content Management System (CMS) powered by Firebase.

---

## ✨ Features

### Public Portfolio
- **Modern Premium Design:** Built with a dark-mode aesthetic, utilizing sleek typography and high-contrast UI elements.
- **Dynamic Animations:** Smooth scroll animations and page transitions powered by Framer Motion.
- **Responsive Layout:** Perfectly scales across mobile, tablet, and desktop viewports.
- **Real-Time Contact Form:** Fully functional contact form integrated with EmailJS to send messages directly to my inbox without a backend server.
- **Dynamic Data Fetching:** All projects, experiences, and skills are fetched in real-time from a Firestore database.

### Secure Admin Dashboard
- **Fortress-Level Security:** The admin login portal (`/admin/login`) is strictly locked down. Right-click, inspect element, and developer tools are disabled.
- **Passwordless Authentication:** Uses Firebase Authentication (Email Magic Link / Phone OTP) hardcoded to my personal email and phone number. **No one else can log in.**
- **Real-Time CMS:** Once authenticated, the Admin Dashboard allows me to read, edit, and save my portfolio data directly to the Firestore database with a single click.

---

## 🛠️ Tech Stack & Tools

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 + Vanilla CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend / Database:** Firebase (Cloud Firestore)
- **Authentication:** Firebase Auth (Email Link / Passwordless)
- **Email Service:** EmailJS
- **Version Control:** Git & GitHub

---

## 📂 Folder Structure

```text
ayush-bansal-portfolio-v2.1/
├── public/                 # Static assets (PDF resumes, raw images, SVG logos)
│   ├── certificates/       # PDF certificates
│   ├── images/             # Profile pictures and project mockups
│   └── logos/              # Company and tech stack logos
├── scripts/                
│   └── migrateData.ts      # Node script used to initially populate Firestore
├── src/
│   ├── assets/             # Bundled static assets
│   ├── components/         # Reusable UI components (Buttons, Cards, Contact Form)
│   ├── contexts/           # React Context providers (AuthContext for Firebase)
│   ├── data/               # Fallback template data
│   ├── hooks/              # Custom React hooks (useSectionData for Firestore fetching)
│   ├── pages/              # Full-page routes (AdminDashboard, Login)
│   ├── sections/           # Landing page sections (Hero, About, Projects, etc.)
│   ├── App.tsx             # Main router and public page assembly
│   ├── firebase.ts         # Firebase initialization and SDK config
│   ├── index.css           # Global Tailwind and font imports
│   ├── main.tsx            # React DOM entry point
│   └── style.css           # Custom design tokens and CSS variables
├── .gitignore              # Ignored files (node_modules, .env)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Setup & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayushbansal946/AyushBnansal_portfolio.git
   cd ayush-bansal-portfolio-v2.1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Firebase Setup:**
   - This project requires a Firebase project with **Firestore Database** and **Authentication** (Email Link) enabled.
   - The Firebase config is located in `src/firebase.ts`.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## 🔒 Security Note
The source code contains public Firebase API keys and EmailJS public keys. This is safe and standard practice for Firebase web apps. Security is enforced via **Firestore Security Rules** which strictly prohibit writes from anyone except the authenticated admin user.

```javascript
// Firestore Security Rule Example
allow read: if true;
allow write: if request.auth != null;
```

---
*Designed and engineered by Ayush Bansal.*
