// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: "minishop-b3604.firebaseapp.com",
    projectId: "minishop-b3604",
    storageBucket: "minishop-b3604.appspot.com",
    messagingSenderId: "592538454645",
    appId: "1:592538454645:web:5859c7ec4fa77b9d72863c",
    measurementId: "G-SSS6QQBQBN"
};

// Initialize Firebase
const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const dbFirebase = getFirestore();
const authFirebase = getAuth();

export default firebase;
export { authFirebase, dbFirebase };
