"use client";

import { getFirestore, doc, setDoc, deleteDoc, getDocs, collection, writeBatch } from 'firebase/firestore';
import { app } from './config';
import type { Crop } from '@/types';

const db = getFirestore(app);

export async function toggleFavorite(userId: string, cropId: string, toFavorite: boolean): Promise<void> {
  if (!userId) {
    throw new Error("El usuario no está autenticado.");
  }
  
  const favRef = doc(db, 'usuarios', userId, 'cultivosFavoritos', cropId);

  try {
    if (toFavorite) {
      // We can store some basic crop info or just a timestamp.
      await setDoc(favRef, { favoritedAt: new Date() });
    } else {
      await deleteDoc(favRef);
    }
  } catch (error) {
    console.error("Error toggling favorite: ", error);
    throw new Error("No se pudo actualizar la lista de favoritos.");
  }
}

export async function getFavoriteCrops(userId: string): Promise<{ id: string }[]> {
  if (!userId) return [];
  
  const favsRef = collection(db, 'usuarios', userId, 'cultivosFavoritos');
  const querySnapshot = await getDocs(favsRef);
  
  const favorites = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
  }));

  return favorites;
}
