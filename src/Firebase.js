// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVI2K-ctMqyxALJqY-16fUs_f4z6WLDVA",
    authDomain: "quiz-1c56d.firebaseapp.com",
    projectId: "quiz-1c56d",
    storageBucket: "quiz-1c56d.appspot.com",
    messagingSenderId: "299087123511",
    appId: "1:299087123511:web:d0f429ef3e759931591bb2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);