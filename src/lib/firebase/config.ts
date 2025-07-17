
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAC4fmFUf4-c-I8IZmcJxhdfHVvXObs_rI",
  authDomain: "agrocolombia-tfkvb.firebaseapp.com",
  projectId: "agrocolombia-tfkvb",
  storageBucket: "agrocolombia-tfkvb.appspot.com",
  messagingSenderId: "24070420473",
  appId: "1:24070420473:web:7d4574a90eb0e7e4066f28"
};

// This function ensures that Firebase is initialized only once.
let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
