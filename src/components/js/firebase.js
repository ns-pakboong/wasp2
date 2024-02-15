// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase,ref,set} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtMoZiyXl35Chen4OBJfddIy8dGXlPO_4",
  authDomain: "iot-wasp-a44a2.firebaseapp.com",
  databaseURL: "https://iot-wasp-a44a2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "iot-wasp-a44a2",
  storageBucket: "iot-wasp-a44a2.appspot.com",
  messagingSenderId: "533623446116",
  appId: "1:533623446116:web:6662a1297ea943300fdd71"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const database = getDatabase(app); // เพิ่มการนำเข้านี้


export { auth}
export {storage}
export {database}
