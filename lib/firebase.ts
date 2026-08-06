import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebase-config';

// Use the Firebase config from app.config.ts
// These values are safe to expose client-side

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only on web for now, as mobile analytics requires additional setup)
let analytics: any = null;
try {
  // @ts-ignore - Analytics might not be available on all platforms
  if (typeof window !== 'undefined' && window.hasOwnProperty('firebase')) {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.log('Firebase Analytics not available on this platform');
}

export { analytics };

// Collection names
export const COLLECTIONS = {
  TIMELINE: 'timeline',
  GALLERY: 'gallery',
  LOVE_METER: 'loveMeter',
  UPLOAD_QUEUE: 'uploadQueue',
};

// Storage paths
export const STORAGE_PATHS = {
  GALLERY: 'gallery',
  PHOTOBOOTH: 'photobooth',
  THUMBNAILS: 'thumbnails',
};

export default app;
