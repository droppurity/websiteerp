'use server';

import * as admin from 'firebase-admin';

let app: admin.app.App | undefined;

export async function getFirebaseAdmin() {
  if (app) {
    return app;
  }
  
  if (admin.apps.length > 0) {
    app = admin.apps[0]!;
    return app;
  }

  try {
    const serviceAccountJson = process.env.FCM_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      console.error('FCM_SERVICE_ACCOUNT_JSON is not defined in environment variables.');
      return undefined;
    }
    
    const serviceAccount = JSON.parse(serviceAccountJson);

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    return app;
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
    return undefined;
  }
}
