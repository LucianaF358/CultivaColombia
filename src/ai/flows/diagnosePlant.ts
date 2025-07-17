
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

const DiagnosePlantInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('The user-provided description of the plant and its problems.'),
});
export type DiagnosePlantInput = z.infer<typeof DiagnosePlantInputSchema>;

const DiagnosePlantOutputSchema = z.object({
  isPlant: z.boolean().describe('Whether or not the image is actually of a plant.'),
  plantName: z.string().describe('The common name of the identified plant.').optional(),
  isHealthy: z.boolean().describe('Whether or not the plant is healthy.').optional(),
  diagnosis: z.object({
      problem: z.string().describe("Un título conciso en español para el problema principal identificado (ej: 'Roya del Café', 'Deficiencia de Nitrógeno').").optional(),
      causes: z.string().describe("Un párrafo descriptivo en español explicando las causas probables. Usa una lista con viñetas (con '-') solo si hay múltiples causas.").optional(),
      damages: z.string().describe("Un párrafo descriptivo en español explicando los daños observados. Usa una lista con viñetas (con '-') solo si hay múltiples daños.").optional(),
      careNeeded: z.string().describe("Un párrafo descriptivo en español explicando los cuidados necesarios. Usa una lista con viñetas (con '-') para enumerar los pasos.").optional(),
  }).optional(),
});
export type DiagnosePlantOutput = z.infer<typeof DiagnosePlantOutputSchema>;

export async function diagnosePlant(input: DiagnosePlantInput): Promise<DiagnosePlantOutput> {
  return diagnosePlantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantPrompt',
  input: {schema: DiagnosePlantInputSchema},
  output: {schema: DiagnosePlantOutputSchema},
  prompt: `Eres un experto botánico y científico agrícola especializado en diagnosticar enfermedades de plantas, particularly para cultivos comunes de Colombia. Tu tarea es analizar una imagen de una planta y una descripción opcional del usuario para proporcionar un diagnóstico detallado y útil, completamente en español. Tu tono debe ser alentador y claro.

Primero, determina si la imagen contiene una planta. Si no es así, establece 'isPlant' en false y detente.

Si es una planta, identifica su nombre común y determina si está sana.

Si la planta no está sana, debes proporcionar un diagnóstico detallado en español. Para cada uno de los siguientes campos, proporciona un párrafo descriptivo. Usa una lista con viñetas (con Markdown, por ejemplo, "- Elemento 1") solo cuando necesites enumerar múltiples puntos distintos. Para resaltar texto importante, utiliza las etiquetas HTML <strong> y </strong> en lugar de asteriscos.

- <strong>Problema</strong>: Un título conciso en español para el problema principal identificado (ej: 'Roya del Café', 'Deficiencia de Nitrógeno', 'Infestación de Ácaros').
- <strong>Daños</strong>: Describe en un párrafo los daños específicos que observas en la foto. ¿Qué aspecto tienen las hojas, el tallo o las flores? Enumera observaciones específicas con una lista de viñetas si es necesario.
- <strong>Causas</strong>: Explica en un párrafo las causas más probables de esta condición. Podrían ser factores ambientales, plagas o enfermedades. Enumera causas específicas con una lista de viñetas si es necesario.
- <strong>Cuidados Necesarios</strong>: Proporciona un párrafo claro y paso a paso sobre las instrucciones de cuidado para que la planta se recupere. Luego, crea una lista con viñetas para los pasos más críticos y procesables.

Basa tu análisis en la imagen y descripción proporcionadas.

Descripción del usuario: {{{description}}}
Foto de la planta: {{media url=photoDataUri}}`,
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
        return output;
      } catch (error: any) {
        lastError = error;
        // Check if the error is a 503 Service Unavailable
        if (error.cause?.status === 503 || (error.message && error.message.includes('503'))) {
          attempt++;
          if (attempt < maxRetries) {
            // Wait for 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            // If it's the last attempt, re-throw the error to be caught by the final catch block.
             throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
          }
        } else {
          // If it's another type of error, rethrow immediately
          throw error;
        }
      }
    }
    
    // This line is now primarily for handling the case where the loop exits unexpectedly,
    // or to be extra safe. The final error is re-thrown inside the loop now.
    throw new Error(`Failed to diagnose plant after ${maxRetries} attempts. Last error: ${lastError.message}`);
  }
);
