// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_A5hKElY_1k0mWenQ9LvQFHJQd4CYNXA",
  authDomain: "eaglenest-3e13c.firebaseapp.com",
  projectId: "eaglenest-3e13c",
  storageBucket: "eaglenest-3e13c.appspot.com",
  messagingSenderId: "445819320992",
  appId: "1:445819320992:web:e210a8f905fe05457e27c5",
  measurementId: "G-J3B79SNMDS"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);


