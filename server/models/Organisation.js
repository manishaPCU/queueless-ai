const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['hospital', 'bank', 'clinic', 'government', 'other'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  qrCode: { type: String },
  counters: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organisation', OrganisationSchema);