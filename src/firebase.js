// Import the functions you need from the SDKs you need
/* import { initializeApp } from "firebase/app"; */
/* import { getMessaging } from "firebase/messaging"; */
// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const publicKey =
  "BONzIT54VoJu5HmbEDPXzSdqf6pyIIWkabSpb76w6xyPTZDUzdf0OLUkzmc0Od2px47nI9mbpe0_SFspnAM3x_0";

export const getToken = async () => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    /* if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    } */
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () => {
  console.log("message listener");

  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
};
