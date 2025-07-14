import { UnifiedViewClient } from './components/unified-view-client';
import connectDB from '@/lib/mongodb';
import SubscriptionModel from '@/models/Subscription';
import FreeTrialModel from '@/models/FreeTrial';
import ContactModel from '@/models/Contact';
import ReferralModel from '@/models/Referral';
import type { Subscription, Trial, Contact, Referral } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const formatDate = (date: any) => {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return 'Invalid Date';
  }
};

async function getData() {
  const connection = await connectDB();
  if (!connection) {
    // Return empty arrays if DB connection fails
    return { subscriptions: [], trials: [], contacts: [], referrals: [], error: 'Could not connect to the database. Please check your MONGODB_URI environment variable.' };
  }

  try {
    const subscriptionsDocs = await SubscriptionModel.find({}).sort({ createdAt: -1 }).lean();
    const trialsDocs = await FreeTrialModel.find({}).sort({ createdAt: -1 }).lean();
    const contactsDocs = await ContactModel.find({}).sort({ createdAt: -1 }).lean();
    const referralsDocs = await ReferralModel.find({}).sort({ createdAt: -1 }).lean();

    const subscriptions: Subscription[] = subscriptionsDocs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      purifierName: doc.purifierName,
      planName: doc.planName,
      tenure: doc.tenure,
      date: formatDate(doc.createdAt),
      status: doc.status || 'New',
      type: 'subscription',
    }));

    const trials: Trial[] = trialsDocs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      location: doc.location,
      purifierName: doc.purifier,
      planName: doc.plan,
      tenure: doc.tenure,
      date: formatDate(doc.createdAt),
      status: doc.status || 'New',
      type: 'trial',
    }));

    const contacts: Contact[] = contactsDocs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      message: doc.message,
      date: formatDate(doc.createdAt),
      status: doc.status || 'New',
      type: 'contact',
    }));

    const referrals: Referral[] = referralsDocs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.friendName,
      referredBy: doc.customerId,
      friendMobile: doc.friendMobile,
      friendAddress: doc.friendAddress,
      date: formatDate(doc.createdAt),
      status: doc.status || 'New',
      type: 'referral',
    }));

    return { subscriptions, trials, contacts, referrals, error: null };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    if (process.env.NODE_ENV !== 'development') {
      return { subscriptions: [], trials: [], contacts: [], referrals: [], error: 'Failed to fetch data from the database.' };
    }
    throw new Error(`Failed to fetch data: ${error}`);
  }
}


export default async function AdminDashboardPage() {
  const allData = await getData();

  if (allData.error) {
     return (
        <div className="flex h-screen items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-lg">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Connection Error</AlertTitle>
                <AlertDescription>
                    {allData.error} Please ensure your environment variables are set correctly in your hosting provider.
                </AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <UnifiedViewClient data={allData} />
    </div>
  );
}
