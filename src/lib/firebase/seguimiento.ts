
"use client";

import { collection, addDoc, serverTimestamp, getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './db';
import type { DiagnosePlantOutput } from '@/ai/flows/diagnosePlant';
import type { TrackedPlant, CareTask } from '@/types';

interface DiagnosisDataToSave extends DiagnosePlantOutput {
    photoDataUri: string;
    description: string;
}

// This function is now shared between saving and displaying the tasks.
function parseCareTasks(careNeeded: string | undefined): CareTask[] {
    if (!careNeeded) return [];
    
    // AI is instructed to use "- " or "<strong>-</strong>" for bullet points.
    // This regex handles various list formats like "- Task", "* Task", or "1. Task".
    const taskLines = careNeeded.match(/^[ \t]*[-*]\s+(.*)/gm);
    
    if (!taskLines) {
        // Fallback for cases where the list isn't formatted as expected,
        // we can try splitting by newlines if it's just a text block.
        const lines = careNeeded.split('\n').filter(line => line.trim().length > 0);
        if (lines.length > 1) {
             return lines.map(line => ({
                text: line.replace(/^- /, '').trim(),
                completed: false
            }));
        }
        return []; // Return empty if no clear list format is found
    }
    
    return taskLines.map(line => ({
        // Remove the leading "- ", "* ", etc. and trim whitespace
        text: line.replace(/^[ \t]*[-*]\s+/, '').trim(),
        completed: false
    }));
}


export async function saveDiagnosisForTracking(userId: string, data: DiagnosisDataToSave): Promise<void> {
  if (!userId) {
    throw new Error("El usuario no está autenticado.");
  }
  
  const trackingCollectionRef = collection(db, 'usuarios', userId, 'plantasSeguimiento');

  // Generate the initial task list from the AI's diagnosis
  const initialTasks = parseCareTasks(data.diagnosis?.careNeeded);

  try {
    await addDoc(trackingCollectionRef, {
      ...data,
      trackedAt: serverTimestamp(), // Use server timestamp for consistency
      tasks: initialTasks, // Save the generated tasks list
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
        const data = docSnap.data();
        const plantData = { id: docSnap.id, ...data } as TrackedPlant;

        // Ensure tasks property exists and is an array, if not, create it from diagnosis
        if (!plantData.tasks && plantData.diagnosis?.careNeeded) {
             plantData.tasks = parseCareTasks(plantData.diagnosis.careNeeded);
        } else if (!plantData.tasks) {
             plantData.tasks = [];
        }

        return plantData;
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
