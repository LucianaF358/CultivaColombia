
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

// Hardcoding credentials to ensure they are always available and bypass environment variable loading issues.
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAC4fmFUf4-c-I8IZmcJxhdfHVvXObs_rI",
  authDomain: "agrocolombia-tfkvb.firebaseapp.com",
  projectId: "agrocolombia-tfkvb",
  storageBucket: "agrocolombia-tfkvb.appspot.com",
  messagingSenderId: "24070420473",
  appId: "1:24070420473:web:7d4574a90eb0e7e4066f28"
};

// =======================================================================================
// !! IMPORTANT !!
// The diagnosis feature will NOT work until you replace the placeholder below.
// 1. Get your API key from Google AI Studio: https://aistudio.google.com/app/apikey
// 2. Replace "YOUR_GEMINI_API_KEY" with your actual key.
// =======================================================================================
export const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";


// This function ensures that Firebase is initialized only once.
let app: FirebaseApp;

if (getApps().length === 0) {
  // Validate that the hardcoded values are not empty before initializing.
  for (const key in firebaseConfig) {
      if (!(firebaseConfig as any)[key]) {
          console.error(`Firebase configuration error: Missing value for ${key}.`);
      }
  }
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
