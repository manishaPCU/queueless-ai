const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
  tokenNumber: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['waiting', 'called', 'serving', 'completed', 'absent'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Token', TokenSchema);