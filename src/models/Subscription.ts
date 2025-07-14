
import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  purifierName: {
    type: String,
  },
  planName: {
    type: String,
  },
  tenure: {
    type: String,
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Resolved", "Closed"],
    default: "New",
  },
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema, 'subscriptions');
