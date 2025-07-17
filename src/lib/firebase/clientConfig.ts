'use client';
import type { FirebaseOptions } from 'firebase/app';

/**
 * Retrieves the Firebase configuration from environment variables.
 * This function is designed to run on the client-side and ensures
 * that all necessary environment variables for Firebase are present.
 *
 * @throws {Error} If any of the required Firebase environment variables are not set.
 * @returns {FirebaseOptions} The complete Firebase configuration object.
 */
export function getFirebaseConfig(): FirebaseOptions {
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Validate that all config values are present
  for (const [key, value] of Object.entries(firebaseConfig)) {
    if (!value) {
      throw new Error(
        `Firebase configuration error: Missing environment variable for NEXT_PUBLIC_FIREBASE_${key
          .replace(/([A-Z])/g, '_$1')
          .toUpperCase()}. Please check your .env file.`
      );
    }
  }

  return firebaseConfig;
}
