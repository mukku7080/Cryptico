
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
    // apiKey: "AIzaSyAXCNR-chqDtukt_atYabE03SRj1V7Y_p8",

    // authDomain: "cryptico-b8094.firebaseapp.com",

    // projectId: "cryptico-b8094",

    // storageBucket: "cryptico-b8094.firebasestorage.app",

    // messagingSenderId: "174976436699",

    // appId: "1:174976436699:web:5643ffb284b7d4464bbffe",

    // measurementId: "G-263BGLN4HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);