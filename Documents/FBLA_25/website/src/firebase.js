// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyOOK4BvUv2QARD1L7GrA-SLwjxqk5WsQ",
  authDomain: "nchs-job-site-2.firebaseapp.com",
  projectId: "nchs-job-site-2",
  storageBucket: "nchs-job-site-2.firebasestorage.app",
  messagingSenderId: "331320328867",
  appId: "1:331320328867:web:e8e3d5fd1b524cd728f516"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app