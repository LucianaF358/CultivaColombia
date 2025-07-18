
"use client";

import { getFirestore, doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from './config';
import type { DiagnosePlantOutput } from '@/ai/flows/diagnosePlant';

const db = getFirestore(app);

interface DiagnosisDataToSave extends DiagnosePlantOutput {
    photoDataUri: string;
    description: string;
}

export async function saveDiagnosisForTracking(userId: string, data: DiagnosisDataToSave): Promise<void> {
  if (!userId) {
    throw new Error("El usuario no está autenticado.");
  }
  
  const trackingCollectionRef = collection(db, 'usuarios', userId, 'plantasSeguimiento');

  try {
    await addDoc(trackingCollectionRef, {
      ...data,
      trackedAt: serverTimestamp(), // Use server timestamp for consistency
    });
  } catch (error) {
    console.error("Error saving diagnosis for tracking: ", error);
    throw new Error("No se pudo guardar el diagnóstico para seguimiento.");
  }
}
