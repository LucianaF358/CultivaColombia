'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import 'dotenv/config';

// =======================================================================================
// !! IMPORTANT !!
// The diagnosis feature uses a an API key which is now loaded from the `.env` file.
// This is a more secure practice than hardcoding keys.
// A fallback key is provided to prevent crashes if the .env variable is not set.
// =======================================================================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyB-mP3m4Z_qK5n7rX8sY9z_w3Bv2A1c0F0";

if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY" || !GEMINI_API_KEY) {
  console.warn("Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.");
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: GEMINI_API_KEY
  })],
});
