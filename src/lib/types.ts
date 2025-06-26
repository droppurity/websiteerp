export type Status = "New" | "Contacted" | "Resolved" | "Closed";

export interface DataItem {
  id: string;
  name: string;
  email?: string;
  date: string;
  status: Status;
}

export interface Subscription extends DataItem {
  type: 'subscription';
  plan: "Basic" | "Premium" | "Enterprise";
}

export interface Trial extends DataItem {
  type: 'trial';
  phone?: string;
  location?: string;
  address?: string;
  purifierName?: string;
  planName?: string;
  tenure?: string;
}

export interface Contact extends DataItem {
  type: 'contact';
  message: string;
}

export interface Referral extends DataItem {
  type: 'referral';
  referredBy: string;
  friendAddress: string;
  friendMobile: string;
}

export type AllData = Subscription | Trial | Contact | Referral;
