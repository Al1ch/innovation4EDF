// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK3DTRsg7pHrqyUXz9hN4shLzBL10Sdv0",
  authDomain: "innovation4edf.firebaseapp.com",
  projectId: "innovation4edf",
  storageBucket: "innovation4edf.appspot.com",
  messagingSenderId: "623467458406",
  appId: "1:623467458406:web:f096b525e742f98e7ca2a7",
  measurementId: "G-G8G171CFE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 