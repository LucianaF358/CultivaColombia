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
function createFirebaseApp(config: FirebaseOptions): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  // Validate the config
  for (const key in config) {
      if (config[key as keyof FirebaseOptions] === undefined) {
          throw new Error(`Firebase configuration error: Missing value for ${key}. Please check your .env file.`);
      }
  }

  return initializeApp(config);
}

export const app = createFirebaseApp(firebaseConfig);
