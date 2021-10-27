import * as firebase from 'firebase'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIAIbpP-J3EDx8X55rnfpbJMDo1j_-ldQ",
  authDomain: "mern-ecommerce-4d0dd.firebaseapp.com",
  projectId: "mern-ecommerce-4d0dd",
  storageBucket: "mern-ecommerce-4d0dd.appspot.com",
  messagingSenderId: "984101276826",
  appId: "1:984101276826:web:4ff5806ff554e80ba46323",
  measurementId: "G-WBD5VLDKC7"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()