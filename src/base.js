// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlujotevv4WAFbRnNfUPqn3id2m3fAo7s",
  authDomain: "wasp-auth.firebaseapp.com",
  projectId: "wasp-auth",
  storageBucket: "wasp-auth.appspot.com",
  messagingSenderId: "171983953973",
  appId: "1:171983953973:web:f17e9564d4159b5717917c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }
