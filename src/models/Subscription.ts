import mongoose, { Schema, models } from 'mongoose';

const SubscriptionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  purifierName: { type: String },
  planName: { type: String, enum: ['Basic', 'Premium', 'Enterprise'] },
  tenure: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  type: { type: String, default: 'subscription' },
});

const SubscriptionModel = models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
export default SubscriptionModel;
