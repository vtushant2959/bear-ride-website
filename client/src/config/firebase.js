import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBnkJhSoK1b6mneVYrrUeTS6xPc6yQYgv8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bearride-11dca.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bearride-11dca",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bearride-11dca.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "92443527505",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:92443527505:web:5d8e3c43bd734c394aeb70",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
