
import mongoose from 'mongoose';

const FreeTrialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  location: {
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

export default mongoose.models.FreeTrial || mongoose.model('FreeTrial', FreeTrialSchema, 'free_trials');
