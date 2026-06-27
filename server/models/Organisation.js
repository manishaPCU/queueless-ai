// const mongoose = require('mongoose');

// const OrganisationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, enum: ['hospital', 'bank', 'clinic', 'government', 'other'], required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   address: { type: String, required: true },
//   location: {
//     lat: { type: Number },
//     lng: { type: Number }
//   },
//   qrCode: { type: String },
//   counters: { type: Number, default: 1 },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Organisation', OrganisationSchema);




//-----------------------------------------------------




const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['hospital', 'bank', 'clinic', 'government', 'other'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  qrCode: { type: String },
  counters: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Organisation', OrganisationSchema);