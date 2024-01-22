// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpcK8VEk9Uf-WbICafDO7BEcbsCHSnymQ",
  authDomain: "wasp-iot.firebaseapp.com",
  projectId: "wasp-iot",
  storageBucket: "wasp-iot.appspot.com",
  messagingSenderId: "661253319130",
  appId: "1:661253319130:web:a97a26098355fb1ecd38e3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
export { auth}
export {storage}