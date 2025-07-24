
'use server';
/**
 * @fileOverview A flow to update a plant's care plan based on user notes.
 *
 * - updateCarePlan - A function that takes the current state and user feedback to generate a new care plan.
 * - UpdateCarePlanInput - The input type for the updateCarePlan function.
 * - UpdateCarePlanOutput - The return type for the updateCarePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { DiagnosePlantOutput } from './diagnosePlant';

// Schemas copied from diagnosePlant.ts to avoid circular dependencies
const CareTaskSchema = z.object({
  text: z.string().describe("Descripción clara y concisa de la tarea a realizar."),
  completed: z.boolean().default(false).describe("Indica si la tarea ha sido completada."),
});

const DailyCarePlanSchema = z.object({
  day: z.number().describe("El número del día del plan (ej: 1, 2, 3)."),
  tasks: z.array(CareTaskSchema).describe("Una lista de tareas específicas para este día."),
});

const DiagnosisSchema = z.object({
      problem: z.string().describe("Una frase corta en español que resuma el problema principal identificado (ej: 'Presencia de Roya del Café', 'Síntomas de deficiencia de Nitrógeno').").optional(),
      causes: z.string().describe("Un párrafo descriptivo en español explicando las causas probables. Usa una lista con viñetas (con '-') solo si hay múltiples causas.").optional(),
      damages: z.string().describe("Un párrafo descriptivo en español explicando los daños observados. Usa una lista con viñetas (con '-') solo si hay múltiples daños.").optional(),
      dailyCarePlan: z.array(DailyCarePlanSchema).describe("Un plan de cuidados detallado para 7 días. Cada día debe tener de 1 a 3 tareas claras y accionables. Si la planta está sana, este campo puede estar vacío.").optional(),
  }).optional();


// Input schema for the update flow
const UpdateCarePlanInputSchema = z.object({
  plantName: z.string().describe("El nombre de la planta."),
  diagnosis: DiagnosisSchema.describe("El diagnóstico original generado por la IA.").optional(),
  currentPlan: z.array(DailyCarePlanSchema).describe("El plan de cuidados actual que el usuario está siguiendo."),
  userNotes: z.string().describe("Las nuevas observaciones o notas que el usuario ha proporcionado sobre el estado de la planta."),
});
export type UpdateCarePlanInput = z.infer<typeof UpdateCarePlanInputSchema>;

// The output is a new daily care plan
export const UpdateCarePlanOutputSchema = z.array(DailyCarePlanSchema);
export type UpdateCarePlanOutput = z.infer<typeof UpdateCarePlanOutputSchema>;


export async function updateCarePlan(input: UpdateCarePlanInput): Promise<UpdateCarePlanOutput> {
  return updateCarePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'updateCarePlanPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: UpdateCarePlanInputSchema},
  output: {schema: UpdateCarePlanOutputSchema},
  prompt: `Eres un agrónomo experto que asiste a un usuario en el cuidado de su planta. Tu tarea es analizar el estado actual y las notas del usuario para generar un **NUEVO plan de cuidados de 7 días**.

**Contexto de la Planta:**
*   **Planta:** {{{plantName}}}
*   **Diagnóstico Original:** El problema principal identificado fue "{{{diagnosis.problem}}}". Las causas fueron: "{{{diagnosis.causes}}}". Y los daños observados: "{{{diagnosis.damages}}}".
*   **Plan de Cuidados Actual:** El usuario ha estado siguiendo este plan:
    {{#each currentPlan}}
    - **Día {{day}}:**
        {{#each tasks}}
        *   {{text}} (Completada: {{completed}})
        {{/each}}
    {{/each}}
*   **Nuevas Observaciones del Usuario:** "{{{userNotes}}}"

**Tu Tarea:**
1.  **Analiza la Nueva Información:** Considera las notas del usuario en el contexto del diagnóstico original y el progreso del plan actual. ¿La situación ha mejorado, empeorado o ha surgido un nuevo problema?
2.  **Genera un NUEVO Plan de 7 Días:** Basado en tu análisis, crea un plan de acción completamente nuevo y actualizado para los próximos 7 días.
    *   **Sé Específico:** Las tareas deben ser claras y accionables.
    *   **Adapta el Plan:** Si el problema original está mejorando, el nuevo plan puede ser de mantenimiento o para tratar problemas secundarios. Si está empeorando o hay un nuevo problema (como plagas mencionadas en las notas), el plan debe enfocarse en la nueva situación sin olvidar la anterior.
    *   **Mantén el Formato:** La salida debe ser un array de objetos, donde cada objeto representa un día y contiene una lista de tareas.
    *   **Idioma:** Todas las tareas deben estar en español.
    *   **No respondas nada más que el plan.**

Genera el nuevo plan de cuidados de 7 días.`,
});

const updateCarePlanFlow = ai.defineFlow(
  {
    name: 'updateCarePlanFlow',
    inputSchema: UpdateCarePlanInputSchema,
    outputSchema: UpdateCarePlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("La IA no pudo generar un nuevo plan de cuidados.");
    }
    return output;
  }
);
