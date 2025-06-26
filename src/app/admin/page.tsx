import { UnifiedViewClient } from './components/unified-view-client';
import connectDB from '@/lib/mongodb';
import SubscriptionModel from '@/models/Subscription';
import TrialModel from '@/models/Trial';
import ContactModel from '@/models/Contact';
import ReferralModel from '@/models/Referral';
import type { Subscription, Trial, Contact, Referral } from '@/lib/types';

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
    date: doc.date,
    status: doc.status,
    plan: doc.plan,
    type: 'subscription',
  }));

  const trials: Trial[] = trialsDocs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    date: doc.date,
    status: doc.status,
    trialEndDate: doc.trialEndDate,
    type: 'trial',
  }));

  const contacts: Contact[] = contactsDocs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    date: doc.date,
    status: doc.status,
    message: doc.message,
    type: 'contact',
  }));

  const referrals: Referral[] = referralsDocs.map((doc: any) => ({
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    date: doc.date,
    status: doc.status,
    referredBy: doc.referredBy,
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
