
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
    // Note: The most robust way to handle this is with the Firebase Admin SDK to manage the user
    // based on the session cookie. However, to stick with the client-side SDK pattern,
    // we must rely on auth.currentUser, which can be unreliable on the server.
    // This implementation will work if the auth state is correctly propagated, but it's fragile.
    // A key improvement is providing a clear error message to the user if it fails.
    if (!auth.currentUser) {
        // This is a likely failure point on the server.
        // We'll return a specific error that the client can interpret.
        return { success: false, error: "auth/no-current-user" };
    }
    
    try {
        await deleteUser(auth.currentUser);
        // Do not call logout() here directly, as it causes a redirect within a server action
        // which is not recommended. The client will handle the redirect after the action completes.
        cookies().delete('session');
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting user account:", error);
        // Forward the error code to the client
        return { success: false, error: error.code || "Ocurrió un error desconocido." };
    }
}
