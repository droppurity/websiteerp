import mongoose, { Schema, models, Model } from 'mongoose';

const ReferralSchema = new Schema({
  referredBy: { type: String },
  name: { type: String, required: true },
  friendMobile: { type: String },
  friendAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  type: { type: String, default: 'referral' },
}, {
  collection: 'referrals'
});

const ReferralModel: Model<any> = models.Referral || mongoose.model('Referral', ReferralSchema);
export default ReferralModel;
