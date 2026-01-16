import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3qb5owSuEONIAL_zbqHsHv2x6Gw1LRTk",
    authDomain: "dreamcrafter-2946b.firebaseapp.com",
    projectId: "dreamcrafter-2946b",
    storageBucket: "dreamcrafter-2946b.firebasestorage.app",
    messagingSenderId: "993310759364",
    appId: "1:993310759364:web:a03d45642a65950460ac91",
    measurementId: "G-D940D02CZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
