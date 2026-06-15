const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
  organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
  currentToken: { type: Number, default: 0 },
  lastTokenIssued: { type: Number, default: 0 },
  avgServiceTime: { type: Number, default: 8 },
  isActive: { type: Boolean, default: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Queue', QueueSchema);