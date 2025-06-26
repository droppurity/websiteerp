import mongoose, { Schema, models } from 'mongoose';

const TrialSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], required: true },
  trialEndDate: { type: String, required: true },
  type: { type: String, default: 'trial' },
}, {
  collection: 'free_trials'
});

const TrialModel = models.Trial || mongoose.model('Trial', TrialSchema);
export default TrialModel;
