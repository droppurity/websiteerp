import mongoose, { Schema, models } from 'mongoose';

const TrialSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  location: { type: String },
  purifier: { type: String },
  plan: { type: String },
  tenure: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  type: { type: String, default: 'trial' },
}, {
  collection: 'trials'
});

const TrialModel = models.Trial || mongoose.model('Trial', TrialSchema);
export default TrialModel;
