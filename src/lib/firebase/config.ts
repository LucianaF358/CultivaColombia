import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirebaseConfig } from "./clientConfig";

// This function ensures that Firebase is initialized only once.
function createFirebaseApp(): FirebaseApp {
  const firebaseConfig = getFirebaseConfig();

  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

export const app = createFirebaseApp();
