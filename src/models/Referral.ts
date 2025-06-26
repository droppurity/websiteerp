import mongoose, { Schema, models } from 'mongoose';

const ReferralSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  referredBy: { type: String, required: true },
  type: { type: String, default: 'referral' },
});

const ReferralModel = models.Referral || mongoose.model('Referral', ReferralSchema);
export default ReferralModel;
