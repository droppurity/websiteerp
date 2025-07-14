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
  try {
    const connection = await connectDB();
    if (!connection) {
      return { subscriptions: [], trials: [], contacts: [], referrals: [], error: 'Could not connect to the database. Please check your MONGODB_URI environment variable.' };
    }

    const subscriptionsDocs = await SubscriptionModel.find({}).sort({ createdAt: -1 }).lean();
    const freeTrialsDocs = await FreeTrialModel.find({}).sort({ createdAt: -1 }).lean();
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

    const trials: Trial[] = freeTrialsDocs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      location: doc.location,
      purifierName: doc.purifierName,
      planName: doc.planName,
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
      name: doc.name,
      referredBy: doc.referredBy,
      friendMobile: doc.friendMobile,
      friendAddress: doc.friendAddress,
      date: formatDate(doc.createdAt),
      status: doc.status || 'New',
      type: 'referral',
    }));

    return { subscriptions, trials, contacts, referrals, error: null };
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    // Return a detailed error message to be displayed on the page
    return { 
      subscriptions: [], 
      trials: [], 
      contacts: [], 
      referrals: [], 
      error: `Failed to fetch data from the database. Please check the server logs. Error: ${error.message}` 
    };
  }
}


export default async function AdminDashboardPage() {
  const allData = await getData();

  if (allData.error) {
     return (
        <div className="flex h-screen items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-2xl">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error Fetching Data</AlertTitle>
                <AlertDescription className="break-words">
                    <p>There was a problem loading data from the database. This is the error message received:</p>
                    <pre className="mt-2 whitespace-pre-wrap rounded-md bg-destructive/10 p-2 font-mono text-xs">
                        {allData.error}
                    </pre>
                    <p className="mt-2">Please ensure your environment variables (especially MONGODB_URI) are set correctly in your Netlify deployment settings.</p>
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
