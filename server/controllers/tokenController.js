// const Token = require('../models/Token');
// const Queue = require('../models/Queue');
// const twilio = require('twilio');
// const axios = require('axios');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendWhatsAppNotification = async (phoneNumber, message) => {
//   try {
//     await client.messages.create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: `+91${phoneNumber}`,
//       body: message
//     });
//     console.log(`SMS sent to ${phoneNumber}`);
//   } catch (err) {
//     console.error('SMS error:', err.message);
//   }
// };

// const getTravelTime = async (customerLat, customerLng, hospitalLat, hospitalLng) => {
//   try {
//     const response = await axios.get(
//       'https://api.openrouteservice.org/v2/directions/driving-car',
//       {
//         params: {
//           api_key: process.env.ORS_API_KEY,
//           start: `${customerLng},${customerLat}`,
//           end: `${hospitalLng},${hospitalLat}`
//         }
//       }
//     );
//     const seconds = response.data.features[0].properties.segments[0].duration;
//     return Math.round(seconds / 60);
//   } catch (err) {
//     console.error('ORS error:', err.message);
//     return 30;
//   }
// };

// const generateToken = async (req, res) => {
//   try {
//     const { orgId, phoneNumber, customerLat, customerLng } = req.body;
//     const today = new Date().toISOString().split('T')[0];

//     let queue = await Queue.findOne({ organisation: orgId, date: today });
//     if (!queue) queue = await Queue.create({ organisation: orgId, date: today });

//     const existingToken = await Token.findOne({
//       organisation: orgId,
//       phoneNumber,
//       status: { $in: ['waiting', 'serving'] }
//     });

//     if (existingToken) {
//       return res.status(400).json({
//         message: 'You already have an active token. Token #' + existingToken.tokenNumber
//       });
//     }

//     queue.lastTokenIssued += 1;
//     await queue.save();

//     const token = await Token.create({
//       organisation: orgId,
//       tokenNumber: queue.lastTokenIssued,
//       phoneNumber
//     });

//     const waitingAhead = queue.lastTokenIssued - queue.currentToken - 1;
//     const estimatedWait = waitingAhead * queue.avgServiceTime;

//     let travelTime = 30;
//     let departureTime = null;

//     if (customerLat && customerLng) {
//       const orgData = await require('../models/Organisation').findById(orgId);
//       const hospitalLat = orgData?.location?.lat || 18.5204;
//       const hospitalLng = orgData?.location?.lng || 73.8567;
//       travelTime = await getTravelTime(customerLat, customerLng, hospitalLat, hospitalLng);
      
//       if (estimatedWait > travelTime) {
//         const now = new Date();
//         const departAt = new Date(now.getTime() + (estimatedWait - travelTime - 10) * 60000);
//         departureTime = departAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
//       } else {
//         departureTime = 'Leave Now';
//       }
//     }

//     const io = req.app.get('io');
//     io.to(orgId.toString()).emit('queueUpdate', {
//       currentToken: queue.currentToken,
//       lastTokenIssued: queue.lastTokenIssued
//     });

//     res.status(201).json({ token, estimatedWait, position: waitingAhead + 1, travelTime, departureTime });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const callNextToken = async (req, res) => {
//   try {
//     const { orgId } = req.body;
//     const today = new Date().toISOString().split('T')[0];

//     const queue = await Queue.findOne({ organisation: orgId, date: today });
//     if (!queue) return res.status(404).json({ message: 'Queue not found' });

//     if (queue.currentToken >= queue.lastTokenIssued) {
//       return res.status(400).json({ message: 'No more tokens in queue' });
//     }

//     await Token.updateMany(
//       { organisation: orgId, tokenNumber: { $lte: queue.currentToken }, status: { $in: ['waiting', 'serving'] } },
//       { status: 'completed' }
//     );

//     queue.currentToken += 1;
//     await queue.save();

//     await Token.findOneAndUpdate(
//       { organisation: orgId, tokenNumber: queue.currentToken },
//       { status: 'serving' }
//     );

//     const upcomingToken = await Token.findOne({
//       organisation: orgId,
//       tokenNumber: queue.currentToken + 1,
//       status: 'waiting'
//     });

//     if (upcomingToken) {
//       const waitTime = 1 * queue.avgServiceTime;
//       await sendWhatsAppNotification(
//         upcomingToken.phoneNumber,
//         `Your turn is approaching! You are next in queue at the hospital. Estimated wait: ${waitTime} minutes.`
//       );
//     }

//     req.app.get('io').to(orgId).emit('queueUpdate', {
//       currentToken: queue.currentToken,
//       lastTokenIssued: queue.lastTokenIssued
//     });

//     res.json({ currentToken: queue.currentToken });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const markAbsent = async (req, res) => {
//   try {
//     const { tokenId } = req.body;
//     await Token.findByIdAndUpdate(tokenId, { status: 'absent' });
//     res.json({ message: 'Marked as absent' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getQueueStatus = async (req, res) => {
//   try {
//     const { orgId } = req.params;
//     const today = new Date().toISOString().split('T')[0];
//     const queue = await Queue.findOne({ organisation: orgId, date: today });
//     const waitingTokens = await Token.find({ organisation: orgId, status: 'waiting' }).sort('tokenNumber');
//     res.json({ queue, waitingTokens });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getPeakHours = async (req, res) => {
//   try {
//     const { orgId } = req.params;

//     const tokens = await Token.find({ organisation: orgId });

//     const hourCounts = Array(24).fill(0);
//     tokens.forEach(token => {
//       const hour = new Date(token.createdAt).getHours();
//       hourCounts[hour]++;
//     });

//     const peakData = hourCounts.map((count, hour) => ({
//       hour: `${hour}:00`,
//       tokens: count
//     })).filter(h => h.tokens > 0);

//     res.json({ peakData });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// const getNoShowRate = async (req, res) => {
//   try {
//     const { orgId } = req.params;
    
//     const totalTokens = await Token.countDocuments({ organisation: orgId });
//     const absentTokens = await Token.countDocuments({ organisation: orgId, status: 'absent' });
    
//     const noShowRate = totalTokens > 0 ? ((absentTokens / totalTokens) * 100).toFixed(1) : 0;
    
//     res.json({ totalTokens, absentTokens, noShowRate });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// const completeCurrentToken = async (req, res) => {
//   try {
//     const { orgId } = req.body;
//     const today = new Date().toISOString().split('T')[0];

//     const queue = await Queue.findOne({ organisation: orgId, date: today });
//     if (!queue) return res.status(404).json({ message: 'Queue not found' });

//     await Token.findOneAndUpdate(
//       { organisation: orgId, tokenNumber: queue.currentToken, status: 'serving' },
//       { status: 'completed' }
//     );

//     req.app.get('io').to(orgId).emit('queueUpdate', {
//       currentToken: queue.currentToken,
//       lastTokenIssued: queue.lastTokenIssued
//     });

//     res.json({ message: 'Token completed' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { generateToken, callNextToken, markAbsent, getQueueStatus, getPeakHours, getNoShowRate, completeCurrentToken };



//----------------------------------------------------------------------------------




const Token = require('../models/Token');
const Queue = require('../models/Queue');
const Organisation = require('../models/Organisation');
const twilio = require('twilio');
const axios = require('axios');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Fix 1: WhatsApp from/to format + correct env var
const sendWhatsAppNotification = async (phoneNumber, message) => {
  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:+91${phoneNumber}`,
      body: message
    });
    console.log(`WhatsApp sent to +91${phoneNumber}`);
  } catch (err) {
    console.error('WhatsApp error:', err.message);
  }
};

const getTravelTime = async (customerLat, customerLng, hospitalLat, hospitalLng) => {
  try {
    const response = await axios.get(
      'https://api.openrouteservice.org/v2/directions/driving-car',
      {
        params: {
          api_key: process.env.ORS_API_KEY,
          start: `${customerLng},${customerLat}`,
          end: `${hospitalLng},${hospitalLat}`
        }
      }
    );
    const seconds = response.data.features[0].properties.segments[0].duration;
    return Math.round(seconds / 60);
  } catch (err) {
    console.error('ORS error:', err.message);
    return 30;
  }
};

const generateToken = async (req, res) => {
  try {
    const { orgId, phoneNumber, customerLat, customerLng } = req.body;
    const today = new Date().toISOString().split('T')[0];

    let queue = await Queue.findOne({ organisation: orgId, date: today });
    if (!queue) queue = await Queue.create({ organisation: orgId, date: today });

    const existingToken = await Token.findOne({
      organisation: orgId,
      phoneNumber,
      status: { $in: ['waiting', 'serving'] }
    });

    if (existingToken) {
      return res.status(400).json({
        message: 'You already have an active token. Token #' + existingToken.tokenNumber
      });
    }

    queue.lastTokenIssued += 1;
    await queue.save();

    const token = await Token.create({
      organisation: orgId,
      tokenNumber: queue.lastTokenIssued,
      phoneNumber
    });

    const waitingAhead = queue.lastTokenIssued - queue.currentToken - 1;
    const estimatedWait = waitingAhead * queue.avgServiceTime;

    let travelTime = 30;
    let departureTime = null;

    if (customerLat && customerLng) {
      // Fix: moved Organisation require to top of file
      const orgData = await Organisation.findById(orgId);
      const hospitalLat = orgData?.location?.lat || 18.5204;
      const hospitalLng = orgData?.location?.lng || 73.8567;
      travelTime = await getTravelTime(customerLat, customerLng, hospitalLat, hospitalLng);

      if (estimatedWait > travelTime) {
        const now = new Date();
        const departAt = new Date(now.getTime() + (estimatedWait - travelTime - 10) * 60000);
        departureTime = departAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      } else {
        departureTime = 'Leave Now';
      }
    }

    // Fix 3: consistent orgId.toString() across all emits
    const io = req.app.get('io');
    io.to(orgId.toString()).emit('queueUpdate', {
      currentToken: queue.currentToken,
      lastTokenIssued: queue.lastTokenIssued
    });

    res.status(201).json({ token, estimatedWait, position: waitingAhead + 1, travelTime, departureTime });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const callNextToken = async (req, res) => {
  try {
    const { orgId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const queue = await Queue.findOne({ organisation: orgId, date: today });
    if (!queue) return res.status(404).json({ message: 'Queue not found' });

    if (queue.currentToken >= queue.lastTokenIssued) {
      return res.status(400).json({ message: 'No more tokens in queue' });
    }

    await Token.updateMany(
      { organisation: orgId, tokenNumber: { $lte: queue.currentToken }, status: { $in: ['waiting', 'serving'] } },
      { status: 'completed' }
    );

    queue.currentToken += 1;
    await queue.save();

    await Token.findOneAndUpdate(
      { organisation: orgId, tokenNumber: queue.currentToken },
      { status: 'serving' }
    );

    const upcomingToken = await Token.findOne({
      organisation: orgId,
      tokenNumber: queue.currentToken + 1,
      status: 'waiting'
    });

    if (upcomingToken) {
      const waitTime = queue.avgServiceTime;
      await sendWhatsAppNotification(
        upcomingToken.phoneNumber,
        `🔔 Your turn is coming up!\n\nYou are next in queue. Please start heading to the counter.\n\nEstimated wait: ${waitTime} minute(s).\n\n— QueueLess AI`
      );
    }

    // Fix 3: consistent toString()
    req.app.get('io').to(orgId.toString()).emit('queueUpdate', {
      currentToken: queue.currentToken,
      lastTokenIssued: queue.lastTokenIssued
    });

    res.json({ currentToken: queue.currentToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fix 2: markAbsent now advances queue if the absent token is currently serving
const markAbsent = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const token = await Token.findByIdAndUpdate(tokenId, { status: 'absent' }, { new: true });

    if (!token) return res.status(404).json({ message: 'Token not found' });

    // If the absent token was the one currently serving, advance the queue
    if (token.status === 'serving' || token.tokenNumber === token.tokenNumber) {
      const today = new Date().toISOString().split('T')[0];
      const queue = await Queue.findOne({ organisation: token.organisation, date: today });

      if (queue && queue.currentToken === token.tokenNumber) {
        queue.currentToken += 1;
        await queue.save();

        await Token.findOneAndUpdate(
          { organisation: token.organisation, tokenNumber: queue.currentToken },
          { status: 'serving' }
        );

        req.app.get('io').to(token.organisation.toString()).emit('queueUpdate', {
          currentToken: queue.currentToken,
          lastTokenIssued: queue.lastTokenIssued
        });
      }
    }

    res.json({ message: 'Marked as absent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQueueStatus = async (req, res) => {
  try {
    const { orgId } = req.params;
    const today = new Date().toISOString().split('T')[0];
    const queue = await Queue.findOne({ organisation: orgId, date: today });
    const waitingTokens = await Token.find({ organisation: orgId, status: 'waiting' }).sort('tokenNumber');
    res.json({ queue, waitingTokens });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fix 4: readable hour labels (9 AM, 2 PM) instead of 9:00, 14:00
const getPeakHours = async (req, res) => {
  try {
    const { orgId } = req.params;
    const tokens = await Token.find({ organisation: orgId });

    const hourCounts = Array(24).fill(0);
    tokens.forEach(token => {
      const hour = new Date(token.createdAt).getHours();
      hourCounts[hour]++;
    });

    const formatHour = (h) => {
      if (h === 0) return '12 AM';
      if (h < 12) return `${h} AM`;
      if (h === 12) return '12 PM';
      return `${h - 12} PM`;
    };

    const peakData = hourCounts
      .map((count, hour) => ({ hour: formatHour(hour), tokens: count }))
      .filter(h => h.tokens > 0);

    res.json({ peakData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNoShowRate = async (req, res) => {
  try {
    const { orgId } = req.params;
    const totalTokens = await Token.countDocuments({ organisation: orgId });
    const absentTokens = await Token.countDocuments({ organisation: orgId, status: 'absent' });
    const noShowRate = totalTokens > 0 ? ((absentTokens / totalTokens) * 100).toFixed(1) : 0;
    res.json({ totalTokens, absentTokens, noShowRate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const completeCurrentToken = async (req, res) => {
  try {
    const { orgId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const queue = await Queue.findOne({ organisation: orgId, date: today });
    if (!queue) return res.status(404).json({ message: 'Queue not found' });

    await Token.findOneAndUpdate(
      { organisation: orgId, tokenNumber: queue.currentToken, status: 'serving' },
      { status: 'completed' }
    );

    // Fix 3: consistent toString()
    req.app.get('io').to(orgId.toString()).emit('queueUpdate', {
      currentToken: queue.currentToken,
      lastTokenIssued: queue.lastTokenIssued
    });

    res.json({ message: 'Token completed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  generateToken, callNextToken, markAbsent,
  getQueueStatus, getPeakHours, getNoShowRate, completeCurrentToken
};



