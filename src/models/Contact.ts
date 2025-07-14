import mongoose, { Schema, models } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved', 'Closed'], default: 'New' },
  type: { type: String, default: 'contact' },
}, {
  collection: 'contacts'
});

const ContactModel = models.Contact || mongoose.model('Contact', ContactSchema);
export default ContactModel;
