import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjsOHkhs3LlvlL6UBWK96EA86-sicbeq0",
  authDomain: "ayush946portfolio.firebaseapp.com",
  projectId: "ayush946portfolio",
  storageBucket: "ayush946portfolio.firebasestorage.app",
  messagingSenderId: "364535937831",
  appId: "1:364535937831:web:8344c2e9d1a81ddf704702",
  measurementId: "G-3HJ698YM3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
