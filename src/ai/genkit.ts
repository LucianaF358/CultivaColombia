import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// =======================================================================================
// !! IMPORTANT !!
// The diagnosis feature will NOT work until you replace the placeholder below.
// 1. Get your API key from Google AI Studio: https://aistudio.google.com/app/apikey
// 2. Replace "YOUR_GEMINI_API_KEY" with your actual key.
// =======================================================================================
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

export const ai = genkit({
  plugins: [googleAI({
    apiKey: GEMINI_API_KEY
  })],
  model: 'googleai/gemini-1.5-flash',
});
