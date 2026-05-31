import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSuzntV7tnmpenJRBa4xcIYz7X0FqPkaE",
  authDomain: "shot-flicks.firebaseapp.com",
  projectId: "shot-flicks",
  storageBucket: "shot-flicks.firebasestorage.app",
  messagingSenderId: "741413175258",
  appId: "1:741413175258:web:a97d4b7830239119324ae3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
