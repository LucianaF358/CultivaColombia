
"use client";

import { collection, addDoc, serverTimestamp, getDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from './db';
import type { DiagnosePlantOutput } from '@/ai/flows/diagnosePlant';
import { updateCarePlan, type UpdateCarePlanOutput } from '@/ai/flows/updateCarePlan';
import type { TrackedPlant, DailyCarePlan, Note, Crop } from '@/types';

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
      isPlant: data.isPlant,
      plantName: data.plantName,
      isHealthy: data.isHealthy,
      diagnosis: data.diagnosis,
      photoDataUri: data.photoDataUri,
      description: data.description,
      trackedAt: serverTimestamp() as any,
      dailyPlan: data.diagnosis?.dailyCarePlan || [],
      notes: [],
    };

    await addDoc(trackingCollectionRef, docData);
  } catch (error) {
    console.error("Error saving diagnosis for tracking: ", error);
    throw new Error("No se pudo guardar el diagnóstico para seguimiento.");
  }
}

export async function startSowingCrop(userId: string, crop: Crop): Promise<void> {
    if (!userId) {
        throw new Error("El usuario no está autenticado.");
    }
    const trackingCollectionRef = collection(db, 'usuarios', userId, 'plantasSeguimiento');

    try {
        const docData: Omit<TrackedPlant, 'id'> = {
            isPlant: true,
            plantName: crop.nombre,
            isHealthy: true, // Started from a healthy state
            imageUrl: crop.imageUrl, // Store the reference image URL
            trackedAt: serverTimestamp() as any,
            description: `Seguimiento de siembra para ${crop.nombre}.`,
            dailyPlan: [ // Interactive germination plan
                { day: 1, tasks: [{ text: `Preparar el sustrato y sembrar la semilla de ${crop.nombre}.`, completed: false, type: 'sowing' }] },
                { day: 2, tasks: [{ text: "Realizar el primer riego con cuidado para no desenterrar la semilla.", completed: false, type: 'watering' }] },
                { day: 3, tasks: [{ text: "Verificar la humedad del sustrato. Mantener húmedo pero no encharcado.", completed: false, type: 'care' }] },
                { day: 4, tasks: [{ text: "Asegurar que la siembra reciba la cantidad de luz solar adecuada.", completed: false, type: 'care' }] },
                { day: 5, tasks: [{ text: "Revisar en busca de los primeros signos de germinación.", completed: false, type: 'observation' }] },
                { day: 6, tasks: [{ text: "Mantener la humedad constante con un riego suave si es necesario.", completed: false, type: 'watering' }] },
                { day: 7, tasks: [{ text: `Vigilar la aparición de plántulas de ${crop.nombre}.`, completed: false, type: 'observation' }] },
            ]
        };
        await addDoc(trackingCollectionRef, docData);
    } catch (error) {
        console.error("Error starting sowing tracking:", error);
        throw new Error("No se pudo iniciar el seguimiento de la siembra.");
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

        // Ensure dailyPlan and notes exist
        if (!plantData.dailyPlan) {
             plantData.dailyPlan = [];
        }
        if (!plantData.notes) {
            plantData.notes = [];
        }
        
        // Use imageUrl for photoDataUri if it exists, for consistent display
        if (plantData.imageUrl && !plantData.photoDataUri) {
            plantData.photoDataUri = plantData.imageUrl;
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

export async function addNoteAndUpdatePlan(userId: string, plantId: string, newNote: string): Promise<UpdateCarePlanOutput> {
    if (!userId) {
        throw new Error("El usuario no está autenticado.");
    }

    const plant = await getTrackedPlantById(userId, plantId);
    if (!plant) {
        throw new Error("La planta en seguimiento no fue encontrada.");
    }

    // Call the AI flow to get the updated plan
    const updatedPlan = await updateCarePlan({
        plantName: plant.plantName || "planta",
        diagnosis: plant.diagnosis,
        currentPlan: plant.dailyPlan || [],
        userNotes: newNote,
    });
    
    // Update the document in Firestore
    const plantRef = doc(db, 'usuarios', userId, 'plantasSeguimiento', plantId);
    const noteObject: Note = {
        text: newNote,
        date: new Date().toISOString(),
    };
    
    await updateDoc(plantRef, {
        dailyPlan: updatedPlan,
        notes: arrayUnion(noteObject),
    });

    return updatedPlan;
}
