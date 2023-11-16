// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realestate-f90e8.firebaseapp.com",
  projectId: "mern-realestate-f90e8",
  storageBucket: "mern-realestate-f90e8.appspot.com",
  messagingSenderId: "758139635150",
  appId: "1:758139635150:web:8b010c09a70fc5de95979f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);