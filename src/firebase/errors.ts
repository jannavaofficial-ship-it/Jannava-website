import { auth } from './config';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };

  console.error('Firestore Error context:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User-friendly error message formatter in Indonesian
export function getFriendlyErrorMessage(error: unknown, fallback: string = 'Terjadi kendala. Silakan coba lagi.'): string {
  if (!error) return fallback;

  const msg = error instanceof Error ? error.message : String(error);

  if (
    msg.includes('auth/invalid-credential') ||
    msg.includes('auth/wrong-password') ||
    msg.includes('auth/user-not-found') ||
    msg.includes('auth/invalid-email')
  ) {
    return 'Email atau password tidak sesuai.';
  }

  if (msg.includes('auth/too-many-requests')) {
    return 'Terlalu banyak percobaan masuk yang gagal. Silakan tunggu beberapa saat.';
  }

  if (msg.includes('permission-denied') || msg.includes('Missing or insufficient permissions')) {
    return 'Akses ditolak. Anda tidak memiliki izin untuk melakukan tindakan ini.';
  }

  if (msg.includes('storage/unauthorized')) {
    return 'Akses penyimpanan ditolak.';
  }

  if (msg.includes('storage/unknown') || msg.includes('storage/cannot-slice-blob')) {
    return 'File belum dapat diproses. Silakan coba lagi.';
  }

  if (msg.includes('Quota exceeded')) {
    return 'Batas kuota layanan tercapai. Silakan coba lagi nanti.';
  }

  if (msg.includes('the client is offline') || msg.includes('network-request-failed')) {
    return 'Data belum dapat dimuat. Silakan periksa koneksi internet Anda.';
  }

  return fallback;
}
