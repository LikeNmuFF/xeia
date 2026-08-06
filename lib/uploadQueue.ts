import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { storage, db, STORAGE_PATHS, COLLECTIONS } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

// Queue storage key
const QUEUE_KEY = '@xeia_upload_queue';

interface QueueItem {
  id: string;
  localPath: string;
  filename: string;
  type: 'gallery' | 'photobooth';
  caption?: string;
  createdAt: string;
  attempts: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
}

// Initialize queue
let uploadQueue: QueueItem[] = [];
let isProcessing = false;

// Load queue from storage
export async function loadQueue(): Promise<QueueItem[]> {
  try {
    const data = await AsyncStorage.getItem(QUEUE_KEY);
    uploadQueue = data ? JSON.parse(data) : [];
    return uploadQueue;
  } catch (error) {
    console.error('Error loading upload queue:', error);
    uploadQueue = [];
    return [];
  }
}

// Save queue to storage
async function saveQueue() {
  try {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(uploadQueue));
  } catch (error) {
    console.error('Error saving upload queue:', error);
  }
}

// Add item to queue
export async function addToQueue(
  localPath: string,
  filename: string,
  type: 'gallery' | 'photobooth',
  caption?: string
): Promise<QueueItem> {
  const item: QueueItem = {
    id: Date.now().toString(),
    localPath,
    filename,
    type,
    caption,
    createdAt: new Date().toISOString(),
    attempts: 0,
    status: 'pending',
  };
  
  uploadQueue.push(item);
  await saveQueue();
  
  // Start processing if online and not already processing
  const state = await NetInfo.fetch();
  if (state.isConnected && !isProcessing) {
    processQueue();
  }
  
  return item;
}

// Process queue
export async function processQueue() {
  if (isProcessing) return;
  
  isProcessing = true;
  const state = await NetInfo.fetch();
  
  if (!state.isConnected) {
    isProcessing = false;
    return;
  }
  
  console.log('Processing upload queue...');
  
  while (uploadQueue.length > 0) {
    const item = uploadQueue[0];
    
    if (item.status === 'completed') {
      uploadQueue.shift();
      continue;
    }
    
    try {
      // Update status
      item.status = 'uploading';
      item.attempts++;
      await saveQueue();
      
      // Check if file exists locally
      const info = await FileSystem.getInfoAsync(item.localPath);
      if (!info.exists) {
        console.error('Local file not found:', item.localPath);
        item.status = 'failed';
        await saveQueue();
        uploadQueue.shift();
        continue;
      }
      
      // Read file
      const fileUri = item.localPath;
      const fileBlob = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      
      // Determine storage path
      const storagePath = item.type === 'gallery'
        ? `${STORAGE_PATHS.GALLERY}/${item.filename}`
        : `${STORAGE_PATHS.PHOTOBOOTH}/${item.filename}`;
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, storagePath);
      
      // Convert base64 to Blob
      const response = await fetch(`data:image/jpeg;base64,${fileBlob}`);
      const blob = await response.blob();
      
      await uploadBytes(storageRef, blob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save metadata to Firestore
      const docRef = await addDoc(collection(db, COLLECTIONS.GALLERY), {
        filename: item.filename,
        url: downloadURL,
        thumbnailUrl: downloadURL, // Will be updated by server if thumbnails are generated
        caption: item.caption || '',
        type: item.type,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log('Upload completed:', item.filename);
      
      // Update item status
      item.status = 'completed';
      await saveQueue();
      
      // Remove from queue
      uploadQueue.shift();
      await saveQueue();
      
    } catch (error) {
      console.error('Error uploading file:', error);
      
      if (item.attempts >= 3) {
        item.status = 'failed';
        uploadQueue.shift();
      } else {
        item.status = 'pending';
      }
      
      await saveQueue();
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  isProcessing = false;
  console.log('Upload queue processing completed');
}

// Retry failed uploads
export async function retryFailedUploads() {
  const failedItems = uploadQueue.filter(item => item.status === 'failed');
  
  for (const item of failedItems) {
    item.status = 'pending';
    item.attempts = 0;
  }
  
  await saveQueue();
  
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    processQueue();
  }
}

// Get queue status
export function getQueueStatus() {
  return {
    total: uploadQueue.length,
    pending: uploadQueue.filter(i => i.status === 'pending').length,
    uploading: uploadQueue.filter(i => i.status === 'uploading').length,
    completed: uploadQueue.filter(i => i.status === 'completed').length,
    failed: uploadQueue.filter(i => i.status === 'failed').length,
  };
}

// Setup queue listener
export function setupQueueListener() {
  // Load queue on startup
  loadQueue();
  
  // Listen for connectivity changes
  NetInfo.addEventListener(async state => {
    if (state.isConnected && !isProcessing) {
      await loadQueue();
      processQueue();
    }
  });
}

export default {
  loadQueue,
  addToQueue,
  processQueue,
  retryFailedUploads,
  getQueueStatus,
  setupQueueListener,
};
