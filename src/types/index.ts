
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

export type CareTask = {
    text: string;
    completed: boolean;
};

export type DailyCarePlan = {
    day: number;
    tasks: CareTask[];
};

export interface TrackedPlant extends DiagnosePlantOutput {
    id: string;
    photoDataUri: string;
    description: string;
    trackedAt: Timestamp | null;
    dailyPlan?: DailyCarePlan[];
}
