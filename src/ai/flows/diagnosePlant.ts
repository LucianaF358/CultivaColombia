
'use server';
/**
 * @fileOverview A plant problem diagnosis AI agent.
 *
 * - diagnosePlant - A function that handles the plant diagnosis process.
 * - DiagnosePlantInput - The input type for the diagnosePlant function.
 * - DiagnosePlantOutput - The return type for the diagnosePlant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { CareTask, DailyCarePlan } from '@/types';

const DiagnosePlantInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  description: z.string().optional().describe('The user-provided description of the plant and its problems.'),
});
export type DiagnosePlantInput = z.infer<typeof DiagnosePlantInputSchema>;

const CareTaskSchema = z.object({
  text: z.string().describe("Descripción clara y concisa de la tarea a realizar."),
  completed: z.boolean().default(false).describe("Indica si la tarea ha sido completada."),
});

const DailyCarePlanSchema = z.object({
  day: z.number().describe("El número del día del plan (ej: 1, 2, 3)."),
  tasks: z.array(CareTaskSchema).describe("Una lista de tareas específicas para este día."),
});

const DiagnosePlantOutputSchema = z.object({
  isPlant: z.boolean().describe('Whether or not the image is actually of a plant.'),
  plantName: z.string().describe('The common name of the identified plant.').optional(),
  isHealthy: z.boolean().describe('Whether or not the plant is healthy.').optional(),
  diagnosis: z.object({
      problem: z.string().describe("Una frase corta en español que resuma el problema principal identificado (ej: 'Presencia de Roya del Café', 'Síntomas de deficiencia de Nitrógeno').").optional(),
      causes: z.string().describe("Un párrafo descriptivo en español explicando las causas probables. Usa una lista con viñetas (con '-') solo si hay múltiples causas.").optional(),
      damages: z.string().describe("Un párrafo descriptivo en español explicando los daños observados. Usa una lista con viñetas (con '-') solo si hay múltiples daños.").optional(),
      dailyCarePlan: z.array(DailyCarePlanSchema).describe("Un plan de cuidados detallado para 7 días. Cada día debe tener de 1 a 3 tareas claras y accionables. Si la planta está sana, este campo puede estar vacío.").optional(),
  }).optional(),
});
export type DiagnosePlantOutput = z.infer<typeof DiagnosePlantOutputSchema>;

export async function diagnosePlant(input: DiagnosePlantInput): Promise<DiagnosePlantOutput> {
  return diagnosePlantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: DiagnosePlantInputSchema},
  output: {schema: DiagnosePlantOutputSchema},
  prompt: `Eres un experto botánico y agrónomo colombiano. Tu tarea es analizar una foto y una descripción opcional para diagnosticar el estado de una planta y proporcionar un plan de acción claro y conciso, totalmente en español.

1.  **Análisis Inicial:**
    *   Determina si la imagen contiene una planta. Si no, el campo 'isPlant' es 'false' y detente.
    *   Si es una planta, identifica su nombre común ('plantName') y si está sana ('isHealthy').

2.  **Diagnóstico (si no está sana):**
    *   **Problema:** Una frase corta resumiendo el problema.
    *   **Daños:** Un párrafo describiendo los daños visibles.
    *   **Causas:** Un párrafo explicando las causas probables.
    *   **Plan de Cuidados Diario (dailyCarePlan):** Crea un plan de recuperación de **7 días**. Para cada día, define entre 1 y 3 tareas sencillas y accionables. Las tareas deben ser claras y fáciles de seguir para un principiante.
        *   **Ejemplo de Tarea (Día 1):** "Retirar las hojas más afectadas con tijeras limpias."
        *   **Ejemplo de Tarea (Día 2):** "Aplicar aceite de neem diluido en agua sobre las hojas (mañana o tarde)."
        *   **Ejemplo de Tarea (Día 3):** "Revisar el envés de las hojas en busca de nuevas plagas."

3.  **Si la planta está sana:**
    *   'isHealthy' es 'true'. El campo 'diagnosis' puede omitirse o contener un 'dailyCarePlan' vacío.

**Formato del Texto:**
*   Usa párrafos simples.
*   Para resaltar texto importante, utiliza las etiquetas HTML \`<strong>\` y \`</strong>\`.
*   NO uses Markdown para listas con viñetas. La estructura del plan diario ya maneja las listas de tareas.

**Contexto del Usuario:**
Descripción: {{{description}}}
Foto de la planta: {{media url=photoDataUri}}`,
  config: {
    temperature: 0,
  }
});

const diagnosePlantFlow = ai.defineFlow(
  {
    name: 'diagnosePlantFlow',
    inputSchema: DiagnosePlantInputSchema,
    outputSchema: DiagnosePlantOutputSchema,
  },
  async (input, streamingCallback) => {
    const maxRetries = 3;
    let attempt = 0;
    let lastError: any;

    while (attempt < maxRetries) {
      try {
        const { output } = await prompt(input);
        if (!output) {
          throw new Error("The AI model did not return a valid output.");
        }
        return output; // Success, exit the loop and flow
      } catch (error: any) {
        lastError = error;
        attempt++;
        
        const isServiceUnavailable = error.cause?.status === 503 || (error.message && (error.message.includes('503') || error.message.toLowerCase().includes('service unavailable')));

        if (isServiceUnavailable && attempt < maxRetries) {
          // Wait for 2 seconds before retrying
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          // Not a retriable error or max retries reached, rethrow to be caught outside the loop.
          throw error;
        }
      }
    }
    
    // This part is reached only if the loop completes due to max retries for a 503 error.
    throw new Error(`El modelo de IA está sobrecargado. Por favor, intenta de nuevo en unos momentos.`);
  }
);
