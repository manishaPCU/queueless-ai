const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
const {updateSettings } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.put('/settings', protect, updateSettings);

module.exports = router;