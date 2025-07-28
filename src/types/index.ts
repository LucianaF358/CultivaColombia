
import type { Timestamp } from 'firebase/firestore';
import type { DiagnosePlantOutput } from '@/ai/flows/diagnosePlant';

export type Crop = {
  id: string;
  nombre: string;
  nombreCientifico: string;
  familia: string;
  tipo: string;
  region: string;
  clima: string;
  dificultad: 'Fácil' | 'Media' | 'Difícil';
  descripcionDetallada: string;
  temporada: string;
  tipoDeSuelo: string;
  tiempoSiembra: string;
  tiempoCosecha: string;
  plagasComunes: string;
  imageUrl: string;
  dataAiHint?: string;
};

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type TaskType = 'sowing' | 'watering' | 'care' | 'observation' | 'default';

export type CareTask = {
    text: string;
    completed: boolean;
    type?: TaskType;
};

export type DailyCarePlan = {
    day: number;
    tasks: CareTask[];
};

export type Note = {
    text: string;
    date: string; // ISO date string
}

// This interface combines the AI diagnosis output with tracking-specific fields.
// It's designed to be flexible for both diagnosed plants and manually added crops.
export interface TrackedPlant extends Omit<DiagnosePlantOutput, 'isPlant' | 'plantName' | 'isHealthy'> {
    id: string;
    
    // Core Info
    isPlant: boolean;
    plantName?: string;
    isHealthy?: boolean; // true for germination tracking, false for diagnosed problems
    
    // Image Data
    photoDataUri?: string; // From user upload for diagnosis
    imageUrl?: string; // From crop data for germination tracking
    
    // Diagnosis & Notes
    description?: string; // User's initial description for diagnosis
    diagnosis?: DiagnosePlantOutput['diagnosis']; // The full AI diagnosis object
    notes?: Note[];
    
    // Tracking Metadata
    trackedAt: Timestamp | null;
    dailyPlan?: DailyCarePlan[];
}
