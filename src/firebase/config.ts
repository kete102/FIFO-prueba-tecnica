import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FIRABASE_APP_ID,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_SENDER_ID,
} from "../config";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIRABASE_APP_ID}.firebaseapp.com`,
  projectId: FIREBASE_PROJECT_ID, // Aquí estaba el error
  storageBucket: `${FIRABASE_APP_ID}.firebasestorage.app`,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIRABASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
