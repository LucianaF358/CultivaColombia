
"use client";

import { getFirestore, doc, collection, addDoc, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import { app } from './config';
import type { DiagnosePlantOutput } from '@/ai/flows/diagnosePlant';
import type { TrackedPlant, CareTask } from '@/types';

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
      tasks: [], // Initialize tasks array
    });
  } catch (error) {
    console.error("Error saving diagnosis for tracking: ", error);
    throw new Error("No se pudo guardar el diagnóstico para seguimiento.");
  }
}

export async function getTrackedPlantById(userId: string, plantId: string): Promise<TrackedPlant | null> {
    if (!userId) {
        throw new Error("El usuario no está autenticado.");
    }
    const plantRef = doc(db, 'usuarios', userId, 'plantasSeguimiento', plantId);
    const docSnap = await getDoc(plantRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as TrackedPlant;
    } else {
        return null;
    }
}

export async function updateTrackedPlantTasks(userId: string, plantId: string, tasks: CareTask[]): Promise<void> {
    if (!userId) {
        throw new Error("El usuario no está autenticado.");
    }
    const plantRef = doc(db, 'usuarios', userId, 'plantasSeguimiento', plantId);
    try {
        await updateDoc(plantRef, { tasks });
    } catch (error) {
        console.error("Error updating tasks in Firestore: ", error);
        throw new Error("No se pudo actualizar la lista de tareas.");
    }
}

    