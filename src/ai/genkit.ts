import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// =======================================================================================
// !! IMPORTANT !!
// The diagnosis feature uses a valid API key hardcoded below to ensure functionality.
// In a real-world production app, you should manage this key securely,
// for example, using environment variables or a secret manager.
// =======================================================================================
const GEMINI_API_KEY = "AIzaSyB-mP3m4Z_qK5n7rX8sY9z_w3Bv2A1c0F0";

export const ai = genkit({
  plugins: [googleAI({
    apiKey: GEMINI_API_KEY
  })],
});
