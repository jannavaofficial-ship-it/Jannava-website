import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './config';
import { getFriendlyErrorMessage } from './errors';

export const OFFICIAL_ADMIN_EMAIL = 'jannavaofficial@gmail.com';

/**
 * Checks whether the given user is the authorized administrator
 */
export function isAdminUser(user: User | null): boolean {
  if (!user || !user.email) return false;
  return user.email.toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase();
}

/**
 * Authenticates the user using Google Sign-In popup.
 * Strictly verifies that the signed-in account is jannavaofficial@gmail.com.
 * If unauthorized, immediately terminates the session and throws an explicit error.
 */
export async function loginWithGoogleAdmin(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    if (!user.email || user.email.toLowerCase() !== OFFICIAL_ADMIN_EMAIL.toLowerCase()) {
      await signOut(auth);
      throw new Error(
        `Akses ditolak. Akun "${user.email || 'Tanpa Email'}" bukan administrator resmi JANNAVA. Hanya akun ${OFFICIAL_ADMIN_EMAIL} yang memiliki izin akses ke Dashboard Admin.`
      );
    }

    return user;
  } catch (error: any) {
    if (error?.message && error.message.includes('Akses ditolak')) {
      throw error;
    }
    if (error?.code === 'auth/popup-closed-by-user') {
      throw new Error('Proses masuk dengan Google dibatalkan.');
    }
    if (error?.code === 'auth/popup-blocked') {
      throw new Error('Jendela popup Google terblokir peramban. Harap izinkan popup untuk situs ini.');
    }
    const friendlyMessage = getFriendlyErrorMessage(error, 'Gagal masuk dengan Google. Silakan coba lagi.');
    throw new Error(friendlyMessage);
  }
}

/**
 * Signs out current admin session
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error(getFriendlyErrorMessage(error, 'Gagal keluar dari sesi. Silakan coba lagi.'));
  }
}

/**
 * Subscribes to authentication state changes with strict authorization filter
 */
export function subscribeToAuthState(callback: (user: User | null, isAuthorizedAdmin: boolean) => void): () => void {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (isAdminUser(user)) {
        callback(user, true);
      } else {
        // Disallowed user detected in session - sign out immediately
        await signOut(auth);
        callback(null, false);
      }
    } else {
      callback(null, false);
    }
  });
}

/**
 * Get current authenticated admin user snapshot
 */
export function getCurrentAdminUser(): User | null {
  const user = auth.currentUser;
  return isAdminUser(user) ? user : null;
}
