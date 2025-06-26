import mongoose, { Schema, models } from 'mongoose';

const SubscriptionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], required: true },
  plan: { type: String, enum: ['Basic', 'Premium', 'Enterprise'], required: true },
  type: { type: String, default: 'subscription' },
});

const SubscriptionModel = models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
export default SubscriptionModel;
