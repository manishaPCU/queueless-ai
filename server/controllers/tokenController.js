const Token = require('../models/Token');
const Queue = require('../models/Queue');

const generateToken = async (req, res) => {
  try {
    const { orgId, phoneNumber } = req.body;
    const today = new Date().toISOString().split('T')[0];

    let queue = await Queue.findOne({ organisation: orgId, date: today });
    if (!queue) queue = await Queue.create({ organisation: orgId, date: today });

    queue.lastTokenIssued += 1;
    await queue.save();

    const token = await Token.create({
      organisation: orgId,
      tokenNumber: queue.lastTokenIssued,
      phoneNumber
    });

    const waitingAhead = queue.lastTokenIssued - queue.currentToken - 1;
    const estimatedWait = waitingAhead * queue.avgServiceTime;

    const io = req.app.get('io');
    console.log('Emitting to room:', orgId);
    io.to(orgId.toString()).emit('queueUpdate', {
      currentToken: queue.currentToken,
      lastTokenIssued: queue.lastTokenIssued
    });

    res.status(201).json({ token, estimatedWait, position: waitingAhead + 1 });
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

    await Token.findOneAndUpdate(
      { organisation: orgId, tokenNumber: queue.currentToken, status: 'serving' },
      { status: 'completed' }
    );

    queue.currentToken += 1;
    await queue.save();

    await Token.findOneAndUpdate(
      { organisation: orgId, tokenNumber: queue.currentToken },
      { status: 'serving' }
    );

    req.app.get('io').to(orgId).emit('queueUpdate', {
      currentToken: queue.currentToken,
      lastTokenIssued: queue.lastTokenIssued
    });

    res.json({ currentToken: queue.currentToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markAbsent = async (req, res) => {
  try {
    const { tokenId } = req.body;
    await Token.findByIdAndUpdate(tokenId, { status: 'absent' });
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

module.exports = { generateToken, callNextToken, markAbsent, getQueueStatus };