import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  const admin = await getFirebaseAdmin();
  if (!admin) {
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
