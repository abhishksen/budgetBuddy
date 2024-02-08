// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYpMOMlqTf4COAWnVdi3N3s4wpvReM2PY",
    authDomain: "addfood-5eb29.firebaseapp.com",
    databaseURL: "https://addfood-5eb29-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "addfood-5eb29",
    storageBucket: "addfood-5eb29.appspot.com",
    messagingSenderId: "979666401668",
    appId: "1:979666401668:web:72576294e179b16a60c5d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);