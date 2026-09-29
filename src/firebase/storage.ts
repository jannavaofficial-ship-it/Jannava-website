import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';
import { getFriendlyErrorMessage } from './errors';

export type StorageCategory = 'activities' | 'organizations' | 'site';

/**
 * Upload file to Firebase Storage according to organized folder structure
 */
export async function uploadMediaFile(
  file: File,
  category: StorageCategory,
  entityId: string = 'general'
): Promise<string> {
  try {
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${category}/${entityId}/${timestamp}_${sanitizedFileName}`;

    const storageRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
  } catch (error) {
    console.error('Storage upload error:', error);
    throw new Error(getFriendlyErrorMessage(error, 'File belum dapat diproses. Silakan coba lagi.'));
  }
}
