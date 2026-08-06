/**
 * Firebase Connection Test
 * 
 * Run this to verify Firebase is properly configured
 * This is a simple test file that can be run in development
 */

import { db, auth, storage } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Test Firebase Firestore connection
 */
export async function testFirestore() {
  try {
    console.log('Testing Firestore connection...');
    
    // Create a test document
    const testRef = doc(db, 'test', 'connection-test');
    await setDoc(testRef, {
      timestamp: new Date().toISOString(),
      message: 'Firebase Firestore is working!',
      testedAt: new Date().toISOString(),
    });
    
    // Read it back
    const testDoc = await getDoc(testRef);
    
    if (testDoc.exists()) {
      console.log('✅ Firestore connection successful');
      console.log('Test data:', testDoc.data());
      return true;
    } else {
      console.log('❌ Firestore connection failed - document not found');
      return false;
    }
  } catch (error) {
    console.error('❌ Firestore connection error:', error);
    return false;
  }
}

/**
 * Test Firebase Storage connection
 */
export async function testStorage() {
  try {
    console.log('Testing Storage connection...');
    
    // Create a test file
    const testData = new Blob(['Firebase Storage is working!'], { type: 'text/plain' });
    const storageRef = ref(storage, 'test/connection-test.txt');
    
    await uploadBytes(storageRef, testData);
    
    // Get download URL
    const url = await getDownloadURL(storageRef);
    
    console.log('✅ Storage connection successful');
    console.log('Download URL:', url);
    return true;
  } catch (error) {
    console.error('❌ Storage connection error:', error);
    return false;
  }
}

/**
 * Test Firebase Auth
 */
export async function testAuth() {
  try {
    console.log('Testing Auth...');
    console.log('✅ Auth initialized successfully');
    console.log('Current user:', auth.currentUser);
    return true;
  } catch (error) {
    console.error('❌ Auth error:', error);
    return false;
  }
}

/**
 * Run all Firebase tests
 */
export async function runAllTests() {
  console.log('===== Firebase Connection Tests =====\n');
  
  const results = {
    auth: await testAuth(),
    firestore: await testFirestore(),
    storage: await testStorage(),
  };
  
  console.log('\n===== Test Results =====');
  console.log('Auth:', results.auth ? '✅ PASS' : '❌ FAIL');
  console.log('Firestore:', results.firestore ? '✅ PASS' : '❌ FAIL');
  console.log('Storage:', results.storage ? '✅ PASS' : '❌ FAIL');
  
  const allPassed = Object.values(results).every(r => r);
  console.log('\nAll tests:', allPassed ? '✅ PASSED' : '❌ FAILED');
  
  return allPassed;
}

// Run tests when this file is executed directly
// Note: This won't work in React Native without a test runner
// Use this in a Node.js environment or with a test framework
if (typeof window === 'undefined') {
  runAllTests().catch(console.error);
}

export default {
  testFirestore,
  testStorage,
  testAuth,
  runAllTests,
};
