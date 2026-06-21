const express = require('express');
const router = express.Router();
const { generateToken, callNextToken, markAbsent, getQueueStatus } = require('../controllers/tokenController');
const { protect } = require('../middleware/authMiddleware');

const {getPeakHours } = require('../controllers/tokenController');

router.get('/peak/:orgId', protect, getPeakHours);

router.post('/generate', generateToken);
router.get('/status/:orgId', getQueueStatus);
router.post('/next', protect, callNextToken);
router.post('/absent', protect, markAbsent);

module.exports = router;