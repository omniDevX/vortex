// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB6QZYvm1sd4ARKYmPeS5MJLz1h-oCfs8U',
    authDomain: 'aiinvapp.firebaseapp.com',
    projectId: 'aiinvapp',
    storageBucket: 'aiinvapp.appspot.com',
    messagingSenderId: '497498007772',
    appId: '1:497498007772:android:f0d46420d4ea8dca8a2c19',
    measurementId: 'G-1MTSL7GX79', // ⛔️ You must add this in Firebase Console → Project settings
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
