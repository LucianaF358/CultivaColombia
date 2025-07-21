
"use client";

import { collection, addDoc, serverTimestamp, getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './db';
import type { DiagnosePlantOutput } from '@/ai/flows/diagnosePlant';
import type { TrackedPlant, DailyCarePlan } from '@/types';

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
    const docData: Omit<TrackedPlant, 'id'> = {
      ...data,
      trackedAt: serverTimestamp() as any, // Use server timestamp for consistency
      dailyPlan: data.diagnosis?.dailyCarePlan || [], // Save the generated tasks list
    };

    await addDoc(trackingCollectionRef, docData);
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
        const data = docSnap.data();
        const plantData = { id: docSnap.id, ...data } as TrackedPlant;

        // Ensure dailyPlan exists
        if (!plantData.dailyPlan) {
             plantData.dailyPlan = [];
        }

        return plantData;
    } else {
        return null;
    }
}

export async function updateTrackedPlantPlan(userId: string, plantId: string, dailyPlan: DailyCarePlan[]): Promise<void> {
    if (!userId) {
        throw new Error("El usuario no está autenticado.");
    }
    const plantRef = doc(db, 'usuarios', userId, 'plantasSeguimiento', plantId);
    try {
        await updateDoc(plantRef, { dailyPlan });
    } catch (error) {
        console.error("Error updating daily plan in Firestore: ", error);
        throw new Error("No se pudo actualizar el plan de tareas.");
    }
}
