// const express = require('express');
// const router = express.Router();
// const { generateToken, callNextToken, markAbsent, getQueueStatus } = require('../controllers/tokenController');
// const { protect } = require('../middleware/authMiddleware');
// const {getPeakHours } = require('../controllers/tokenController');
// const {getNoShowRate } = require('../controllers/tokenController');
// const {completeCurrentToken } = require('../controllers/tokenController');

// router.post('/complete', protect, completeCurrentToken);

// router.get('/noshow/:orgId', protect, getNoShowRate);

// router.get('/peak/:orgId', protect, getPeakHours);
// router.post('/generate', generateToken);
// router.get('/status/:orgId', getQueueStatus);
// router.post('/next', protect, callNextToken);
// router.post('/absent', protect, markAbsent);

// module.exports = router;



//--------------------------------------------------------------------



const express = require('express');
const router = express.Router();
const {
  generateToken, callNextToken, markAbsent,
  getQueueStatus, getPeakHours, getNoShowRate, completeCurrentToken
} = require('../controllers/tokenController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', generateToken);
router.get('/status/:orgId', getQueueStatus);
router.post('/next', protect, callNextToken);
router.post('/absent', protect, markAbsent);
router.post('/complete', protect, completeCurrentToken);
router.get('/peak/:orgId', protect, getPeakHours);
router.get('/noshow/:orgId', protect, getNoShowRate);

module.exports = router;
