// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcHkEyXMnxcyb8VtUjiepKTzQ5HVPDS1M",
  authDomain: "e-jav-c3173.firebaseapp.com",
  projectId: "e-jav-c3173",
  storageBucket: "e-jav-c3173.appspot.com",
  messagingSenderId: "604684627349",
  appId: "1:604684627349:web:0ea25fb684ef670d415a9c",
  measurementId: "G-NP47VS43SY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;