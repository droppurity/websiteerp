import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
try {
  const serviceAccount = JSON.parse(process.env.FCM_SERVICE_ACCOUNT_JSON || '{}');
  if (Object.keys(serviceAccount).length > 0 && !admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error) {
  console.error('Firebase Admin Initialization Error:', error);
}

export async function GET(request: Request) {
  if (!admin.apps.length) {
    return NextResponse.json({ error: 'Firebase Admin SDK not initialized. Please check your FCM_SERVICE_ACCOUNT_JSON environment variable.' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'FCM token parameter is required' }, { status: 400 });
  }

  const message = {
    notification: {
      title: 'Test Notification',
      body: 'This is a test notification from your server!',
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 });
  }
}
