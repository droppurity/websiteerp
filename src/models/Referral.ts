import mongoose, { Schema, models } from 'mongoose';

const ReferralSchema = new Schema({
  customerId: { type: String },
  friendName: { type: String, required: true },
  friendMobile: { type: String },
  friendAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  type: { type: String, default: 'referral' },
}, {
  collection: 'referrals' // Explicitly set the collection name
});

const ReferralModel = models.Referral || mongoose.model('Referral', ReferralSchema);
export default ReferralModel;
