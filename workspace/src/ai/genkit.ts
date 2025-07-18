import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { GEMINI_API_KEY } from '@/lib/firebase/config';

// Initialize Genkit with the Google AI plugin, passing the API key directly.
// This ensures that Genkit has the necessary credentials to communicate with the Gemini API.
export const ai = genkit({
  plugins: [googleAI({
    apiKey: GEMINI_API_KEY
  })],
  // You can set a default model here if you want.
  // model: 'googleai/gemini-1.5-flash',
});
