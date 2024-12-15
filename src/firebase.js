// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const provider = new GoogleAuthProvider();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "wardrobe-whisperer-b6d34.firebaseapp.com",
  projectId: "wardrobe-whisperer-b6d34",
  storageBucket: "wardrobe-whisperer-b6d34.firebasestorage.app",
  messagingSenderId: "734499867871",
  appId: "1:734499867871:web:26edd4aac3ac26c979ad6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);