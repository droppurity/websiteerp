import { UnifiedViewClient } from './components/unified-view-client';
import connectDB from '@/lib/mongodb';
import SubscriptionModel from '@/models/Subscription';
import TrialModel from '@/models/Trial';
import ContactModel from '@/models/Contact';
import ReferralModel from '@/models/Referral';
import type { Subscription, Trial, Contact, Referral } from '@/lib/types';

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
  await connectDB();

  const subscriptionsDocs = await SubscriptionModel.find({}).lean();
  const trialsDocs = await TrialModel.find({}).lean();
  const contactsDocs = await ContactModel.find({}).lean();
  const referralsDocs = await ReferralModel.find({}).lean();

  const subscriptions: Subscription[] = subscriptionsDocs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    date: formatDate(doc.createdAt),
    status: doc.status || 'New',
    plan: doc.planName,
    phone: doc.phone,
    address: doc.address,
    purifierName: doc.purifierName,
    tenure: doc.tenure,
    type: 'subscription',
  }));

  const trials: Trial[] = trialsDocs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    date: formatDate(doc.createdAt),
    status: doc.status || 'New',
    phone: doc.phone,
    location: doc.location,
    address: doc.address,
    purifierName: doc.purifierName,
    planName: doc.planName,
    tenure: doc.tenure,
    type: 'trial',
  }));

  const contacts: Contact[] = contactsDocs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    date: formatDate(doc.createdAt),
    status: doc.status || 'New',
    message: doc.message,
    type: 'contact',
  }));

  const referrals: Referral[] = referralsDocs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.friendName,
    date: formatDate(doc.createdAt),
    status: doc.status || 'New',
    referredBy: doc.customerId,
    friendAddress: doc.friendAddress,
    friendMobile: doc.friendMobile,
    type: 'referral',
  }));

  return { subscriptions, trials, contacts, referrals };
}

export default async function AdminDashboardPage() {
  const allData = await getData();

  return (
    <div className="flex-1 overflow-auto">
      <UnifiedViewClient data={allData} />
    </div>
  );
}
