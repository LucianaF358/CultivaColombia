import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase for client-side usage
function createFirebaseApp(config: FirebaseOptions): FirebaseApp {
  if (!getApps().length) {
    return initializeApp(config);
  }
  return getApp();
}

export const app = createFirebaseApp(firebaseConfig);
