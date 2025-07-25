
"use server";

import { cookies } from 'next/headers';

export async function createSession(idToken: string) {
  if (!idToken) {
    return { success: false, message: 'No token provided' };
  }
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    cookies().set('session', idToken, { maxAge: expiresIn, httpOnly: true, secure: true, sameSite: 'lax' });
    return { success: true };
  } catch (error) {
    console.error("Failed to create session:", error);
    return { success: false, message: 'Failed to create session' };
  }
}

export async function logout() {
  cookies().delete('session');
  // No need to redirect from here, client will handle it.
}
