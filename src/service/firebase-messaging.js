// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK22zg6Piwp6skMRZw5pMO6JzBkJERNd4",
  authDomain: "sprout-it-43e51.firebaseapp.com",
  projectId: "sprout-it-43e51",
  storageBucket: "sprout-it-43e51.appspot.com",
  messagingSenderId: "790789093845",
  appId: "1:790789093845:web:694ac8fad80e7c9fa4a55c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
