// src/lib/firebase/db.ts
import { getFirestore, enableIndexedDbPersistence, Firestore } from 'firebase/firestore';
import { app } from './config';

let db: Firestore;

try {
  db = getFirestore(app);
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn(
        'La persistencia de Firestore no se pudo habilitar. ' +
        'Esto puede suceder si hay varias pestañas abiertas. Los datos no se guardarán sin conexión.'
      );
    } else if (err.code === 'unimplemented') {
      console.warn(
        'El navegador actual no soporta la persistencia de Firestore sin conexión.'
      );
    }
  });
} catch (error) {
  console.error("Error al inicializar Firestore:", error);
  // En caso de que la inicialización falle, creamos una instancia simple para evitar que la app se rompa.
  db = getFirestore(app);
}


export { db };
