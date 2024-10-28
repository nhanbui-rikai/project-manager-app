// utils/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/*
  
  const firebaseConfig = {
  apiKey: "AIzaSyA-K9OaqWrmJJNuJYevV5XYNRuG0di8gs8",
  authDomain: "next-project-b6aba.firebaseapp.com",
  projectId: "next-project-b6aba",
  storageBucket: "next-project-b6aba.appspot.com",
  messagingSenderId: "590588807828",
  appId: "1:590588807828:web:5d5deb8f8518b079cd0281",
  measurementId: "G-42LVF5GKXD"
};
  */
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
