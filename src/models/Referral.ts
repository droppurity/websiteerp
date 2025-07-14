
import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  referredBy: {
    type: String,
    required: true,
  },
  friendMobile: {
    type: String,
  },
  friendAddress: {
    type: String,
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Resolved", "Closed"],
    default: "New",
  },
}, { timestamps: true });

export default mongoose.models.Referral || mongoose.model('Referral', ReferralSchema, 'referrals');
