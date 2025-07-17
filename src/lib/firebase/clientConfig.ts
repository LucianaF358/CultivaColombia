import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

// This function ensures that Firebase is initialized only once.
function createFirebaseApp(): FirebaseApp {
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (getApps().length) {
    return getApp();
  }
  
  return initializeApp(firebaseConfig);
}

export const app = createFirebaseApp();