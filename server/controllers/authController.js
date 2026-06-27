// const Organisation = require('../models/Organisation');
// const Queue = require('../models/Queue');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const QRCode = require('qrcode');

// const signup = async (req, res) => {
//   try {
//     const { name, type, email, password, address, lat, lng } = req.body;
//     const exists = await Organisation.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Organisation already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const org = await Organisation.create({ 
//       name, type, email, password: hashed, address,
//       location: { lat: parseFloat(lat), lng: parseFloat(lng) }
//     });

//     const qrData = `${process.env.CLIENT_URL}/token/${org._id}`;
//     const qrCode = await QRCode.toDataURL(qrData);
//     org.qrCode = qrCode;
//     await org.save();

//     const today = new Date().toISOString().split('T')[0];
//     await Queue.create({ organisation: org._id, date: today });

//     const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.status(201).json({ 
//       token, 
//       org: { id: org._id, name: org.name, qrCode: org.qrCode } 
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const org = await Organisation.findOne({ email });
//     if (!org) return res.status(400).json({ message: 'Invalid credentials' });

//     const match = await bcrypt.compare(password, org.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, org: { id: org._id, name: org.name, qrCode: org.qrCode } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// const updateSettings = async (req, res) => {
//   try {
//     const { avgServiceTime } = req.body;
//     const today = new Date().toISOString().split('T')[0];
    
//     await Queue.findOneAndUpdate(
//       { organisation: req.org.id, date: today },
//       { avgServiceTime: parseInt(avgServiceTime) },
//       { new: true }
//     );

//     res.json({ message: 'Settings updated' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { signup, login, updateSettings };





//-------------------------------------------------------------




const Organisation = require('../models/Organisation');
const Queue = require('../models/Queue');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');

const signup = async (req, res) => {
  try {
    const { name, type, email, password, address, lat, lng } = req.body;

    if (!name || !email || !password || !lat || !lng) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = await Organisation.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Organisation already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const org = await Organisation.create({
      name, type, email, password: hashed, address,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) }
    });

    const qrData = `${process.env.CLIENT_URL}/token/${org._id}`;
    const qrCode = await QRCode.toDataURL(qrData);
    org.qrCode = qrCode;
    await org.save();

    const today = new Date().toISOString().split('T')[0];
    await Queue.create({ organisation: org._id, date: today });

    const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      org: { id: org._id, name: org.name, type: org.type, address: org.address, qrCode: org.qrCode }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const org = await Organisation.findOne({ email });
    if (!org) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, org.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // Fix: return type and address so sidebar can show org details
    const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      org: { id: org._id, name: org.name, type: org.type, address: org.address, qrCode: org.qrCode }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { avgServiceTime } = req.body;

    if (!avgServiceTime || avgServiceTime < 1) {
      return res.status(400).json({ message: 'Invalid service time' });
    }

    const today = new Date().toISOString().split('T')[0];
    await Queue.findOneAndUpdate(
      { organisation: req.org.id, date: today },
      { avgServiceTime: parseInt(avgServiceTime) },
      { new: true }
    );

    res.json({ message: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login, updateSettings };
