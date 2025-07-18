import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { GEMINI_API_KEY } from '@/lib/firebase/config';

export const ai = genkit({
  plugins: [googleAI({
    apiKey: GEMINI_API_KEY
  })],
  model: 'googleai/gemini-1.5-flash',
});
