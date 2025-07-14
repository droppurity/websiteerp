import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SubscriptionModel from '@/models/Subscription';
import FreeTrialModel from '@/models/FreeTrial';
import TrialModel from '@/models/Trial';
import ContactModel from '@/models/Contact';
import ReferralModel from '@/models/Referral';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lastCheck = searchParams.get('lastCheck');

  if (!lastCheck) {
    return NextResponse.json({ error: 'lastCheck parameter is required' }, { status: 400 });
  }

  try {
    const connection = await connectDB();
    if (!connection) {
        return NextResponse.json({ error: 'Database connection not available.' }, { status: 503 });
    }

    const lastCheckDate = new Date(lastCheck);

    const newSubscriptions = await SubscriptionModel.countDocuments({ createdAt: { $gt: lastCheckDate } });
    const newFreeTrials = await FreeTrialModel.countDocuments({ createdAt: { $gt: lastCheckDate } });
    const newTrials = await TrialModel.countDocuments({ createdAt: { $gt: lastCheckDate } });
    const newContacts = await ContactModel.countDocuments({ createdAt: { $gt: lastCheckDate } });
    const newReferrals = await ReferralModel.countDocuments({ createdAt: { $gt: lastCheckDate } });

    const totalNew = newSubscriptions + newFreeTrials + newTrials + newContacts + newReferrals;

    return NextResponse.json({ newItems: totalNew });
  } catch (error) {
    console.error('Error checking for new data:', error);
    return NextResponse.json({ error: 'Failed to check for new data' }, { status: 500 });
  }
}
