// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNgwuFCGCXUn7lhEWM4ceNCT_UeDN9qeM",
  authDomain: "ecommorce-platform.firebaseapp.com",
  projectId: "ecommorce-platform",
  storageBucket: "ecommorce-platform.firebasestorage.app",
  messagingSenderId: "879005084703",
  appId: "1:879005084703:web:0be26ac6d3b42c2247392a",
  measurementId: "G-JY0HSZ8LL9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
