 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "congo-projects.firebaseapp.com",
  projectId: "congo-projects",
  storageBucket: "congo-projects.appspot.com",
  messagingSenderId: "398615848691",
  appId: "1:398615848691:web:c1eb52315ca9f46dfcf986"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);