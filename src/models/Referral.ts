import mongoose, { Schema, models } from 'mongoose';

const ReferralSchema = new Schema({
  customerId: { type: String, required: true },
  friendName: { type: String, required: true },
  friendAddress: { type: String, required: true },
  friendMobile: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  type: { type: String, default: 'referral' },
});

const ReferralModel = models.Referral || mongoose.model('Referral', ReferralSchema);
export default ReferralModel;
