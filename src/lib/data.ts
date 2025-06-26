import type { Subscription, Trial, Contact, Referral } from './types';

export const subscriptions: Subscription[] = [
  { id: 'sub1', name: 'Alice Johnson', email: 'alice@example.com', date: '2024-07-15', status: 'Resolved', plan: 'Premium', type: 'subscription' },
  { id: 'sub2', name: 'Bob Williams', email: 'bob@example.com', date: '2024-07-14', status: 'New', plan: 'Basic', type: 'subscription' },
  { id: 'sub3', name: 'Charlie Brown', email: 'charlie@example.com', date: '2024-07-13', status: 'Contacted', plan: 'Enterprise', type: 'subscription' },
];

export const trials: Trial[] = [
  { id: 'tri1', name: 'Diana Prince', email: 'diana@example.com', date: '2024-07-12', status: 'New', trialEndDate: '2024-07-26', type: 'trial' },
  { id: 'tri2', name: 'Ethan Hunt', email: 'ethan@example.com', date: '2024-07-11', status: 'Closed', trialEndDate: '2024-07-25', type: 'trial' },
];

export const contacts: Contact[] = [
  { id: 'con1', name: 'Fiona Gallagher', email: 'fiona@example.com', date: '2024-07-10', status: 'New', message: 'I have a question about pricing.', type: 'contact' },
  { id: 'con2', name: 'George Costanza', email: 'george@example.com', date: '2024-07-09', status: 'Resolved', message: 'Thank you for your help!', type: 'contact' },
  { id: 'con3', name: 'Hannah Montana', email: 'hannah@example.com', date: '2024-07-16', status: 'New', message: 'I would like to request a demo of your Enterprise plan features.', type: 'contact' },
];

export const referrals: Referral[] = [
  { id: 'ref1', name: 'Ivy Green', email: 'ivy@example.com', date: '2024-07-08', status: 'Contacted', referredBy: 'Alice Johnson', type: 'referral' },
  { id: 'ref2', name: 'Jack Black', email: 'jack@example.com', date: '2024-07-07', status: 'New', referredBy: 'Charlie Brown', type: 'referral' },
];
