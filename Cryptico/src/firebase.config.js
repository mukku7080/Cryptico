
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAtKO5evooW2D2v31SOLzXVemnl3eJsmwI",
    authDomain: "onnbit-64749.firebaseapp.com",
    projectId: "onnbit-64749",
    storageBucket: "onnbit-64749.firebasestorage.app",
    messagingSenderId: "920396326566",
    appId: "1:920396326566:web:2c851fbd7ba7d581f37667",
    measurementId: "G-21Z74GFQSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAtKO5evooW2D2v31SOLzXVemnl3eJsmwI",
//     authDomain: "onnbit-64749.firebaseapp.com",
//     projectId: "onnbit-64749",
//     storageBucket: "onnbit-64749.firebasestorage.app",
//     messagingSenderId: "920396326566",
//     appId: "1:920396326566:web:2c851fbd7ba7d581f37667",
//     measurementId: "G-21Z74GFQSV"
// };