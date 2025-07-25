
"use server";

import { getAuth, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { app } from './config';
import { cookies } from 'next/headers';
import { logout } from '../actions';

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

export async function deleteUserAccount(): Promise<{ success: boolean; error?: string }> {
    const sessionCookie = cookies().get('session');
    
    // This action requires the user to be recently signed in.
    // We can't easily re-authenticate on the server, so we'll rely on the client-side user object.
    // If the token is expired, Firebase Admin SDK would be a better choice, but for simplicity
    // with client-side auth, we'll proceed this way. The operation will fail if the user's
    // token is expired, and we will catch that error.
    
    if (!auth.currentUser) {
        return { success: false, error: "Usuario no autenticado. Por favor, inicia sesión de nuevo." };
    }
    
    try {
        await deleteUser(auth.currentUser);
        await logout(); // Log out after successful deletion
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting user account:", error);
        let message = "Ocurrió un error al eliminar la cuenta.";
        if (error.code === 'auth/requires-recent-login') {
            message = "Esta operación es sensible y requiere autenticación reciente. Por favor, cierra sesión y vuelve a iniciar sesión antes de intentarlo de nuevo.";
        }
        return { success: false, error: message };
    }
}
