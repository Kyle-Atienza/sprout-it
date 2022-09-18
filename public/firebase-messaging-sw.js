// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// eslint-disable-next-line no-undef
const firebaseConfig = {
  apiKey: "AIzaSyBK22zg6Piwp6skMRZw5pMO6JzBkJERNd4",
  authDomain: "sprout-it-43e51.firebaseapp.com",
  projectId: "sprout-it-43e51",
  storageBucket: "sprout-it-43e51.appspot.com",
  messagingSenderId: "790789093845",
  appId: "1:790789093845:web:694ac8fad80e7c9fa4a55c",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
