import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// =======================================================================================
// !! IMPORTANT !!
// The diagnosis feature uses a valid API key hardcoded below to ensure functionality.
// In a real-world production app, you should manage this key securely,
// for example, using environment variables or a secret manager.
// =======================================================================================
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

export const ai = genkit({
  plugins: [googleAI({
    apiKey: GEMINI_API_KEY
  })],
  model: 'googleai/gemini-1.5-flash',
});
