import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType, getFriendlyErrorMessage } from './errors';
import {
  activitiesData,
  programs,
  bphMembers,
  departments,
  organizationInfo,
  galleryItems,
  ActivityItem,
  ProgramItem,
  GalleryItem
} from '../data/jannavaData';

export interface FirestoreActivity {
  id: string;
  title: string;
  slug?: string;
  category: string;
  date: string;
  location?: string;
  description: string;
  content?: string;
  coverImage?: string;
  images?: string[];
  highlights?: string[];
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
}

export interface FirestoreProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  keyActivities?: string[];
  icon?: string;
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface FirestoreGalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  caption?: string;
  createdAt?: any;
}

export interface FirestoreInquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt?: any;
}

export interface FirestoreOrganizationMember {
  id: string;
  name: string;
  position: string;
  department: string;
  role: string;
  photo?: string;
  order: number;
  active: boolean;
}

export interface FirestoreSiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  address: string;
  instagram: string;
  whatsapp?: string;
  updatedAt?: any;
}

// ==========================================
// 1. KEGIATAN (ACTIVITIES) CRUD
// ==========================================

export async function getActivities(categoryFilter?: string): Promise<ActivityItem[]> {
  try {
    const collRef = collection(db, 'activities');
    const q = query(collRef, where('published', '==', true));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const items: ActivityItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as FirestoreActivity;
        items.push({
          id: docSnap.id,
          title: data.title || '',
          category: (data.category as any) || 'Dakwah',
          date: data.date || '',
          location: data.location || 'Masjid Miftahul Jannah, Depok',
          excerpt: data.description || '',
          fullDescription: data.content || data.description || '',
          image: data.coverImage || '/src/assets/images/hero_youth_gathering_1790655423889.jpg',
          highlights: data.highlights || []
        });
      });

      if (categoryFilter && categoryFilter !== 'Semua') {
        return items.filter((item) =>
          item.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
          categoryFilter.toLowerCase().includes(item.category.toLowerCase())
        );
      }
      return items;
    }
  } catch (error) {
    console.warn('Firestore activities fetch fallback to local data:', error);
  }

  if (categoryFilter && categoryFilter !== 'Semua') {
    return activitiesData.filter((a) =>
      a.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      categoryFilter.toLowerCase().includes(a.category.toLowerCase())
    );
  }
  return activitiesData;
}

export async function getAllActivitiesAdmin(): Promise<FirestoreActivity[]> {
  try {
    const collRef = collection(db, 'activities');
    const snapshot = await getDocs(collRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<FirestoreActivity, 'id'>)
      }));
    }
  } catch (err) {
    console.warn('Admin activities fetch notice:', err);
  }

  // Fallback map
  return activitiesData.map((a) => ({
    id: a.id,
    title: a.title,
    category: a.category,
    date: a.date,
    location: a.location,
    description: a.excerpt,
    content: a.fullDescription,
    coverImage: a.image,
    highlights: a.highlights,
    published: true
  }));
}

export async function createActivity(activity: Omit<FirestoreActivity, 'id'>): Promise<string> {
  try {
    const newId = `act-${Date.now()}`;
    await setDoc(doc(db, 'activities', newId), {
      ...activity,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return newId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'activities');
  }
}

export async function updateActivity(id: string, data: Partial<FirestoreActivity>): Promise<void> {
  try {
    const docRef = doc(db, 'activities', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `activities/${id}`);
  }
}

export async function deleteActivity(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'activities', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `activities/${id}`);
  }
}

// ==========================================
// 2. PROGRAM UTAMA CRUD
// ==========================================

export async function getPrograms(): Promise<ProgramItem[]> {
  try {
    const collRef = collection(db, 'programs');
    const q = query(collRef, where('published', '==', true));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const items: ProgramItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as FirestoreProgram;
        items.push({
          id: docSnap.id,
          title: data.title || '',
          category: (data.category as any) || 'Pendidikan & Dakwah',
          summary: data.description || '',
          keyActivities: data.keyActivities || [],
          iconName: data.icon || 'BookOpen'
        });
      });
      return items;
    }
  } catch (error) {
    console.warn('Firestore programs fetch fallback to local data:', error);
  }

  return programs;
}

export async function getAllProgramsAdmin(): Promise<FirestoreProgram[]> {
  try {
    const collRef = collection(db, 'programs');
    const snapshot = await getDocs(collRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<FirestoreProgram, 'id'>)
      }));
    }
  } catch (err) {
    console.warn('Admin programs fetch notice:', err);
  }

  return programs.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.summary,
    keyActivities: p.keyActivities,
    icon: p.iconName,
    published: true
  }));
}

export async function createProgram(program: Omit<FirestoreProgram, 'id'>): Promise<string> {
  try {
    const newId = `prog-${Date.now()}`;
    await setDoc(doc(db, 'programs', newId), {
      ...program,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return newId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'programs');
  }
}

export async function updateProgram(id: string, data: Partial<FirestoreProgram>): Promise<void> {
  try {
    await updateDoc(doc(db, 'programs', id), {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `programs/${id}`);
  }
}

export async function deleteProgram(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'programs', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `programs/${id}`);
  }
}

// ==========================================
// 3. DOKUMENTASI (GALLERY) CRUD
// ==========================================

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const collRef = collection(db, 'gallery');
    const snapshot = await getDocs(collRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => {
        const d = docSnap.data() as FirestoreGalleryItem;
        return {
          id: docSnap.id,
          title: d.title,
          category: (d.category as any) || 'Dakwah',
          date: d.date,
          image: d.imageUrl,
          caption: d.caption || d.title
        };
      });
    }
  } catch (err) {
    console.warn('Firestore gallery fetch notice:', err);
  }

  return galleryItems;
}

export async function createGalleryItem(item: Omit<FirestoreGalleryItem, 'id'>): Promise<string> {
  try {
    const newId = `gal-${Date.now()}`;
    await setDoc(doc(db, 'gallery', newId), {
      ...item,
      createdAt: serverTimestamp()
    });
    return newId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'gallery');
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
  }
}

// ==========================================
// 4. KONTAK & PESAN MASUK (INQUIRIES) CRUD
// ==========================================

export async function submitInquiry(inquiry: Omit<FirestoreInquiry, 'id' | 'read' | 'createdAt'>): Promise<string> {
  try {
    const newId = `inq-${Date.now()}`;
    await setDoc(doc(db, 'inquiries', newId), {
      ...inquiry,
      read: false,
      createdAt: serverTimestamp()
    });
    return newId;
  } catch (error) {
    console.warn('Inquiry submit fallback/notice:', error);
    return `local-${Date.now()}`;
  }
}

export async function getInquiries(): Promise<FirestoreInquiry[]> {
  try {
    const collRef = collection(db, 'inquiries');
    const snapshot = await getDocs(collRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<FirestoreInquiry, 'id'>)
      }));
    }
  } catch (err) {
    console.warn('Admin inquiries fetch notice:', err);
  }
  return [];
}

export async function markInquiryAsRead(id: string, read: boolean = true): Promise<void> {
  try {
    await updateDoc(doc(db, 'inquiries', id), { read });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `inquiries/${id}`);
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'inquiries', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
  }
}

// ==========================================
// 5. PENGATURAN SITUS & ORGANISASI
// ==========================================

export async function getSiteSettings(): Promise<FirestoreSiteSettings> {
  try {
    const snap = await getDoc(doc(db, 'siteSettings', 'main'));
    if (snap.exists()) {
      return snap.data() as FirestoreSiteSettings;
    }
  } catch (err) {
    console.warn('Site settings fetch notice:', err);
  }

  return {
    siteName: organizationInfo.officialName,
    tagline: organizationInfo.taglineIndonesian,
    email: organizationInfo.contact.email,
    address: organizationInfo.address.fullFormatted,
    instagram: organizationInfo.contact.instagramHandle,
    whatsapp: '+62 812-3456-7890'
  };
}

export async function updateSiteSettings(settings: Partial<FirestoreSiteSettings>): Promise<void> {
  try {
    await setDoc(
      doc(db, 'siteSettings', 'main'),
      {
        ...settings,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'siteSettings/main');
  }
}

// ==========================================
// 6. DASHBOARD STATS & 1-CLICK SEEDING
// ==========================================

export async function getAdminStats() {
  let activitiesCount = activitiesData.length;
  let programsCount = programs.length;
  let documentationCount = galleryItems.length;
  let inquiriesCount = 0;
  let isFirestoreLive = false;

  try {
    const actSnap = await getDocs(collection(db, 'activities'));
    if (!actSnap.empty) activitiesCount = actSnap.size;

    const progSnap = await getDocs(collection(db, 'programs'));
    if (!progSnap.empty) programsCount = progSnap.size;

    const galSnap = await getDocs(collection(db, 'gallery'));
    if (!galSnap.empty) documentationCount = galSnap.size;

    const inqSnap = await getDocs(collection(db, 'inquiries'));
    if (!inqSnap.empty) inquiriesCount = inqSnap.size;

    isFirestoreLive = true;
  } catch (err) {
    console.warn('Firestore stats read notice:', err);
  }

  return {
    activitiesCount,
    programsCount,
    documentationCount,
    inquiriesCount,
    isFirestoreLive,
    organizationMembersCount: bphMembers.length + 10
  };
}

export async function seedInitialDataIfEmpty(): Promise<{ success: boolean; message: string }> {
  try {
    const activitiesColl = collection(db, 'activities');
    const actSnap = await getDocs(activitiesColl);

    if (actSnap.empty) {
      // Seed Activities
      for (const act of activitiesData) {
        await setDoc(doc(db, 'activities', act.id), {
          title: act.title,
          category: act.category,
          date: act.date,
          location: act.location,
          description: act.excerpt,
          content: act.fullDescription,
          coverImage: act.image,
          highlights: act.highlights,
          published: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          createdBy: 'admin'
        });
      }

      // Seed Programs
      for (const prog of programs) {
        await setDoc(doc(db, 'programs', prog.id), {
          title: prog.title,
          category: prog.category,
          description: prog.summary,
          keyActivities: prog.keyActivities,
          icon: prog.iconName,
          published: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Seed Gallery
      for (const gal of galleryItems) {
        await setDoc(doc(db, 'gallery', gal.id), {
          title: gal.title,
          category: gal.category,
          date: gal.date,
          imageUrl: gal.image,
          caption: gal.caption,
          createdAt: serverTimestamp()
        });
      }

      // Seed Site Settings
      await setDoc(doc(db, 'siteSettings', 'main'), {
        siteName: organizationInfo.officialName,
        tagline: organizationInfo.taglineIndonesian,
        email: organizationInfo.contact.email,
        address: organizationInfo.address.fullFormatted,
        instagram: organizationInfo.contact.instagramHandle,
        updatedAt: serverTimestamp()
      });

      return {
        success: true,
        message: 'Data awal JANNAVA berhasil dimigrasikan ke Cloud Firestore!'
      };
    } else {
      return {
        success: true,
        message: 'Koleksi Firestore sudah memiliki data aktif.'
      };
    }
  } catch (error) {
    const friendly = getFriendlyErrorMessage(error, 'Gagal menginisialisasi data ke Firestore.');
    console.error('Seeding error:', error);
    return {
      success: false,
      message: friendly
    };
  }
}
