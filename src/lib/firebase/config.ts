import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

// WARNING: Hardcoding credentials is not recommended for production environments.
// This is a temporary solution to bypass environment variable loading issues.
// In a real application, use environment variables.
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDP41_jT2pX...Am5HdQwz5bVAI",
  authDomain: "dev-session-santiago.firebaseapp.com",
  projectId: "dev-session-santiago",
  storageBucket: "dev-session-santiago.appspot.com",
  messagingSenderId: "1055536465389",
  appId: "1:1055536465389:web:c793a388a1b632c0288812"
};

// This function ensures that Firebase is initialized only once.
function createFirebaseApp(config: FirebaseOptions): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  // Validate the config
  for (const key in config) {
      if (!config[key as keyof FirebaseOptions]) {
          throw new Error(`Firebase configuration error: Missing value for ${key}. Please check your configuration.`);
      }
  }

  return initializeApp(config);
}

export const app = createFirebaseApp(firebaseConfig);