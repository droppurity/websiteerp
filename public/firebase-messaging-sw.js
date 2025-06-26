// This file must be in the public folder to work.
// These scripts are imported to make firebase available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg4Ru-ikJrq4zlsB7MV0XN4Nzx8wPHjLw",
  authDomain: "website-ab676.firebaseapp.com",
  projectId: "website-ab676",
  storageBucket: "website-ab676.firebasestorage.app",
  messagingSenderId: "486629812353",
  appId: "1:486629812353:web:a746824e35b8f96aa44580",
  measurementId: "G-2WSFCX1FHR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// If you want to handle background messages, you can do so here.
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png' // Optional: Add an icon in your public folder
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
