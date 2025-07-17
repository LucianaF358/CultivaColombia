
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// This function ensures that Firebase is initialized only once.
let app: FirebaseApp;

if (getApps().length === 0) {
  // Validate that the values are not empty before initializing.
  for (const key in firebaseConfig) {
      if (!(firebaseConfig as any)[key]) {
          console.error(`Firebase configuration error: Missing value for NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}. Please check your .env file.`);
      }
  }
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
