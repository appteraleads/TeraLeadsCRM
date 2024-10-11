import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCk_a96hVoijs7ndAwm83HfyerqMSdu7EE",
    authDomain: "teraleadscrm-d99ea.firebaseapp.com",
    databaseURL: "https://teraleadscrm-d99ea-default-rtdb.firebaseio.com",
    projectId: "teraleadscrm-d99ea",
    storageBucket: "teraleadscrm-d99ea.appspot.com",
    messagingSenderId: "342228155933",
    appId: "1:342228155933:web:1aea8b53235e70920bd0f4",
    measurementId: "G-4D9Z50LX2C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
