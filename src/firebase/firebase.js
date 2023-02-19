// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmEvScg0pCTq4lp4EEXPb6LNzg87Xyr8o",
  authDomain: "chaykhana-munduz.firebaseapp.com",
  projectId: "chaykhana-munduz",
  storageBucket: "chaykhana-munduz.appspot.com",
  messagingSenderId: "478253380290",
  appId: "1:478253380290:web:a974875a0aa34ab489015b",
  measurementId: "G-5ZY4SQRZDM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
