import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgOfV9jcvOmsXYYIVhSBgqn51VXsgFBWE",
  authDomain: "mytrip-6be6f.firebaseapp.com",
  projectId: "mytrip-6be6f",
  storageBucket: "mytrip-6be6f.firebasestorage.app",
  messagingSenderId: "1005507023599",
  appId: "1:1005507023599:web:e3503d2c7036d5bee1c11a",
  measurementId: "G-Z0SV6CMJVN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();