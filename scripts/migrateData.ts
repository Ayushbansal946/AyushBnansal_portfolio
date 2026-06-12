import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { 
  fallbackProjects, 
  fallbackExperiences, 
  fallbackSkills, 
  fallbackCertificates 
} from "../src/data/fallbackData"; // Note: Need to rename to .js extension for node module resolution or run via ts-node

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjsOHkhs3LlvlL6UBWK96EA86-sicbeq0",
  authDomain: "ayush946portfolio.firebaseapp.com",
  projectId: "ayush946portfolio",
  storageBucket: "ayush946portfolio.firebasestorage.app",
  messagingSenderId: "364535937831",
  appId: "1:364535937831:web:8344c2e9d1a81ddf704702",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateData() {
  console.log("Starting data migration to Firestore...");

  try {
    // 1. Migrate Projects
    console.log("Migrating Projects...");
    for (const project of fallbackProjects) {
      await setDoc(doc(db, "projects", project.id), project);
    }

    // 2. Migrate Experiences
    console.log("Migrating Experiences...");
    for (const exp of fallbackExperiences) {
      await setDoc(doc(db, "experiences", exp.id), exp);
    }

    // 3. Migrate Skills
    console.log("Migrating Skills...");
    for (const skill of fallbackSkills) {
      await setDoc(doc(db, "skills", skill.id), skill);
    }

    // 4. Migrate Certificates
    console.log("Migrating Certificates...");
    for (const cert of fallbackCertificates) {
      await setDoc(doc(db, "certificates", cert.id), cert);
    }

    console.log("✅ Migration complete! All data successfully uploaded to Firestore.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateData();
