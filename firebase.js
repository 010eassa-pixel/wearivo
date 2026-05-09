
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDX7Q4rH65b0fgW73cFaTlbBGweXn2pnbQا",
  authDomain: "wearivo-84213.firebaseapp.com",
  projectId: "wearivo-84213",
  storageBucket: "wearivo-84213.firebasestorage.app",
  messagingSenderId: "759094709370",
  appId: "1:759094709370:web:776261a2f0e8b399863fc3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);