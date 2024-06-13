// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCulZddX4SDWIs9ZY2TnVnb1osOcKrCgd8",
  authDomain: "techlearn-6f8bf.firebaseapp.com",
  projectId: "techlearn-6f8bf",
  storageBucket: "techlearn-6f8bf.appspot.com",
  messagingSenderId: "12209374757",
  appId: "1:12209374757:web:e1833c93224da6ce0ce1cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);