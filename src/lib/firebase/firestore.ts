
"use client";

import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './db';

export async function toggleFavorite(userId: string, cropId: string, toFavorite: boolean): Promise<void> {
  if (!userId) {
    throw new Error("El usuario no está autenticado.");
  }
  
  const favRef = doc(db, 'usuarios', userId, 'cultivosFavoritos', cropId);

  try {
    if (toFavorite) {
      await setDoc(favRef, { favoritedAt: new Date() });
    } else {
      await deleteDoc(favRef);
    }
  } catch (error) {
    console.error("Error toggling favorite: ", error);
    throw new Error("No se pudo actualizar la lista de favoritos.");
  }
}
