
import mongoose, { Model } from 'mongoose';

const ReferralSchema = new mongoose.Schema({
  friendName: {
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

let ReferralModel: Model<any>;

try {
  // Try to retrieve the existing model to prevent OverwriteModelError
  ReferralModel = mongoose.model('Referral');
} catch {
  // If the model doesn't exist, create it
  ReferralModel = mongoose.model('Referral', ReferralSchema, 'referrals');
}

export default ReferralModel;
