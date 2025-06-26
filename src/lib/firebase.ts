import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCg4Ru-ikJrq4zlsB7MV0XN4Nzx8wPHjLw",
  authDomain: "website-ab676.firebaseapp.com",
  projectId: "website-ab676",
  storageBucket: "website-ab676.firebasestorage.app",
  messagingSenderId: "486629812353",
  appId: "1:486629812353:web:a746824e35b8f96aa44580",
  measurementId: "G-2WSFCX1FHR"
};

function initializeFirebase() {
    if (getApps().length > 0) return getApps()[0];

    const app = initializeApp(firebaseConfig);
    return app;
}

export const app = initializeFirebase();
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;
