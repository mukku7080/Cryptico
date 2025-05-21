// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAtKO5evooW2D2v31SOLzXVemnl3eJsmwI",
    authDomain: "onnbit-64749.firebaseapp.com",
    projectId: "onnbit-64749",
    storageBucket: "onnbit-64749.firebasestorage.app",
    messagingSenderId: "920396326566",
    appId: "1:920396326566:web:2c851fbd7ba7d581f37667",
    measurementId: "G-21Z74GFQSV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { db, messaging };
