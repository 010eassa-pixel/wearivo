import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // التعديل 1: استيراد خدمة التخزين

// إعدادات مشروعك الجديد logan-x
const firebaseConfig = {
  apiKey: "AIzaSyCaoKoKiOJEOlnkPCBU1RPiSWlTZtNygPY",
  authDomain: "logan-x.firebaseapp.com",
  databaseURL: "https://logan-x-default-rtdb.firebaseio.com",
  projectId: "logan-x",
  storageBucket: "logan-x.firebasestorage.app", // ملاحظة: تأكد من صحة هذا الرابط من كونسول فايربيز
  messagingSenderId: "752942331884",
  appId: "1:752942331884:web:0f64f61bfc4a4209a832c9",
  measurementId: "G-8TFT0KBG1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات عشان نستخدمها في صفحة الـ Login والـ Admin والرفع
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // التعديل 2: تصدير storage عشان الـ Build ينجح
