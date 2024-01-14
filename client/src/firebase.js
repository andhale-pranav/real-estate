// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fc8f1.firebaseapp.com",
  projectId: "mern-estate-fc8f1",
  storageBucket: "mern-estate-fc8f1.appspot.com",
  messagingSenderId: "847637565024",
  appId: "1:847637565024:web:79d9e4880f35c54c6fbd05"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);