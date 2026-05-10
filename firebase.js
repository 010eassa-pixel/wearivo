import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// إعدادات مشروعك الجديد logan-x
const firebaseConfig = {
  apiKey: "AIzaSyCaoKoKiOJEOlnkPCBU1RPiSWlTZtNygPY",
  authDomain: "logan-x.firebaseapp.com",
  databaseURL: "https://logan-x-default-rtdb.firebaseio.com",
  projectId: "logan-x",
  storageBucket: "logan-x.appspot.com",
  messagingSenderId: "752942331884",
  appId: "1:752942331884:web:0f64f61bfc4a4209a832c9",
  measurementId: "G-8TFT0KBG1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات عشان نستخدمها في صفحة الـ Login والـ Admin
export const auth = getAuth(app);
export const db = getFirestore(app);
