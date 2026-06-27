const express = require('express');
const router = express.Router();
const { signup, login, updateSettings } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.put('/settings', protect, updateSettings);

module.exports = router;
