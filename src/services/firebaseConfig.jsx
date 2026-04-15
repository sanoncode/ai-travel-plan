// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4TMSGckI6LQVgMAqxhvFK4U0MHNYWAxs",
  authDomain: "ai-travel-planner-43fa9.firebaseapp.com",
  projectId: "ai-travel-planner-43fa9",
  storageBucket: "ai-travel-planner-43fa9.firebasestorage.app",
  messagingSenderId: "490356939822",
  appId: "1:490356939822:web:d9ba9a6c64ee674eef53bf",
  measurementId: "G-0LZJ8JS2NW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore()
// const analytics = getAnalytics(app);