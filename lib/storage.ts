import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { db, COLLECTIONS } from './firebase';
import { collection, getDocs, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

// Cache keys
export const CACHE_KEYS = {
  TIMELINE: '@xeia_timeline_cache',
  GALLERY: '@xeia_gallery_cache',
  LOVE_METER: '@xeia_love_meter_cache',
  LAST_SYNC: '@xeia_last_sync',
  APP_OPENED: '@xeia_app_opened',
  LETTER_READ: '@xeia_letter_read',
};

// File system paths
export const FILE_PATHS = {
  CACHE_DIR: FileSystem.documentDirectory + 'xeia-cache/',
  GALLERY_IMAGES: FileSystem.documentDirectory + 'xeia-cache/gallery/',
  PHOTOBOOTH_IMAGES: FileSystem.documentDirectory + 'xeia-cache/photobooth/',
};

// Ensure cache directories exist
async function ensureDirectories() {
  await FileSystem.makeDirectoryAsync(FILE_PATHS.CACHE_DIR, { intermediates: true });
  await FileSystem.makeDirectoryAsync(FILE_PATHS.GALLERY_IMAGES, { intermediates: true });
  await FileSystem.makeDirectoryAsync(FILE_PATHS.PHOTOBOOTH_IMAGES, { intermediates: true });
}

// Initialize - call this on app start
let isInitialized = false;
export async function initStorage() {
  if (isInitialized) return;
  
  await ensureDirectories();
  isInitialized = true;
  
  // Check connectivity and sync if online
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    await syncFromFirebase();
  }
  
  // Listen for connectivity changes
  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncFromFirebase();
    }
  });
}

// Get cached data
export async function getCachedData(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

// Set cached data
export async function setCachedData(key: string, data: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    await AsyncStorage.setItem(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

// Cache an image file
export async function cacheImageFile(uri: string, localPath: string): Promise<string> {
  try {
    // Check if already cached
    const info = await FileSystem.getInfoAsync(localPath);
    if (info.exists) {
      return localPath;
    }
    
    // Download and cache
    const { uri: downloadedUri } = await FileSystem.downloadAsync(
      uri,
      localPath
    );
    
    return downloadedUri;
  } catch (error) {
    console.error('Error caching image:', error);
    return uri; // Return original URI if caching fails
  }
}

// Get cached image URI
export async function getCachedImageUri(remoteUri: string, localFilename: string): Promise<string> {
  const localPath = FILE_PATHS.GALLERY_IMAGES + localFilename;
  const info = await FileSystem.getInfoAsync(localPath);
  
  if (info.exists) {
    return localPath;
  }
  
  // Try to cache it
  return cacheImageFile(remoteUri, localPath);
}

// Sync timeline from Firebase
export async function syncTimeline() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.TIMELINE));
    const timeline = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    await setCachedData(CACHE_KEYS.TIMELINE, timeline);
    return timeline;
  } catch (error) {
    console.error('Error syncing timeline:', error);
    return await getCachedData(CACHE_KEYS.TIMELINE);
  }
}

// Sync gallery from Firebase
export async function syncGallery() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.GALLERY));
    const gallery = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    await setCachedData(CACHE_KEYS.GALLERY, gallery);
    return gallery;
  } catch (error) {
    console.error('Error syncing gallery:', error);
    return await getCachedData(CACHE_KEYS.GALLERY);
  }
}

// Sync love meter from Firebase
export async function syncLoveMeter() {
  try {
    const docRef = doc(db, COLLECTIONS.LOVE_METER, 'current');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      await setCachedData(CACHE_KEYS.LOVE_METER, data);
      return data;
    }
    return await getCachedData(CACHE_KEYS.LOVE_METER);
  } catch (error) {
    console.error('Error syncing love meter:', error);
    return await getCachedData(CACHE_KEYS.LOVE_METER);
  }
}

// Full sync from Firebase
export async function syncFromFirebase() {
  console.log('Syncing from Firebase...');
  
  try {
    await Promise.all([
      syncTimeline(),
      syncGallery(),
      syncLoveMeter(),
    ]);
    
    console.log('Sync completed successfully');
  } catch (error) {
    console.error('Error during full sync:', error);
  }
}

// Check if app has been opened before
export async function isAppOpened(): Promise<boolean> {
  const opened = await AsyncStorage.getItem(CACHE_KEYS.APP_OPENED);
  return opened === 'true';
}

// Mark app as opened
export async function markAppOpened() {
  await AsyncStorage.setItem(CACHE_KEYS.APP_OPENED, 'true');
}

// Check if letter has been read
export async function isLetterRead(): Promise<boolean> {
  const read = await AsyncStorage.getItem(CACHE_KEYS.LETTER_READ);
  return read === 'true';
}

// Mark letter as read
export async function markLetterRead() {
  await AsyncStorage.setItem(CACHE_KEYS.LETTER_READ, 'true');
}

export default {
  initStorage,
  getCachedData,
  setCachedData,
  cacheImageFile,
  getCachedImageUri,
  syncFromFirebase,
  syncTimeline,
  syncGallery,
  syncLoveMeter,
  isAppOpened,
  markAppOpened,
  isLetterRead,
  markLetterRead,
};
