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
      problem: z.string().describe("A concise title for the main problem identified (e.g., 'Mildew Infestation', 'Nutrient Deficiency').").optional(),
      causes: z.string().describe("A descriptive paragraph explaining the likely causes for the plant's condition. Use a bulleted list (using Markdown with '-') only if there are multiple distinct causes to enumerate.").optional(),
      damages: z.string().describe("A descriptive paragraph explaining the observed damages on the plant. Use a bulleted list (using Markdown with '-') only if there are multiple distinct damages to enumerate.").optional(),
      careNeeded: z.string().describe("A descriptive paragraph explaining the actionable steps and care instructions to help the plant recover. Use a bulleted list (using Markdown with '-') to clearly outline the steps.").optional(),
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
  prompt: `You are an expert botanist and agricultural scientist specializing in diagnosing plant illnesses, particularly for common Colombian crops. Your task is to analyze an image of a plant and an optional user description to provide a detailed and helpful diagnosis. Your tone should be encouraging and clear.

First, determine if the image contains a plant. If it does not, set 'isPlant' to false and stop.

If it is a plant, identify its common name and determine if it is healthy.

If the plant is not healthy, you must provide a detailed diagnosis. For each of the following fields, provide a descriptive paragraph. Use a bulleted list (with Markdown hyphens, e.g., "- Item 1") only when you need to enumerate multiple distinct points.

- **Problem**: A concise title for the main problem identified (e.g., 'Roya del Café', 'Deficiencia de Nitrógeno', 'Infestación de Ácaros').
- **Damages**: Describe in a paragraph the specific damages you observe in the photo. What do the leaves, stem, or flowers look like? Enumerate specific observations with a bulleted list if necessary.
- **Causes**: Explain in a paragraph the most likely causes for this condition. This could include environmental factors, pests, or diseases. Enumerate specific causes with a bulleted list if necessary.
- **Care Needed**: Provide a clear, step-by-step paragraph on care instructions for the plant to recover. Then, create a bulleted list with the most critical, actionable steps.

Base your analysis on the provided image and description.

User Description: {{{description}}}
Plant Photo: {{media url=photoDataUri}}`,
});

const diagnosePlantFlow = ai.defineFlow(
  {
    name: 'diagnosePlantFlow',
    inputSchema: DiagnosePlantInputSchema,
    outputSchema: DiagnosePlantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid output.");
    }
    return output;
  }
);
