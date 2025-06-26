import mongoose, { Schema, models } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'contact' },
});

const ContactModel = models.Contact || mongoose.model('Contact', ContactSchema);
export default ContactModel;
