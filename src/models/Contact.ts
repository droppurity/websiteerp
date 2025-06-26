import mongoose, { Schema, models } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  message: { type: String, required: true },
  type: { type: String, default: 'contact' },
});

const ContactModel = models.Contact || mongoose.model('Contact', ContactSchema);
export default ContactModel;
