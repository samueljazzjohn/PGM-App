// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHfwi1Dwn4pqT_30gz1zu-oLW6IPUVEss",
  authDomain: "pgm-app-storage.firebaseapp.com",
  projectId: "pgm-app-storage",
  storageBucket: "pgm-app-storage.appspot.com",
  messagingSenderId: "756232740097",
  appId: "1:756232740097:web:d1ff58859f3d1aed3b4f00",
  measurementId: "G-GZMDDPVEGR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)