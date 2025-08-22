
"use server";

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);

export async function sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error: any) {
        console.error("Error sending password reset email:", error);
        return { success: false, error: error.message };
    }
}
