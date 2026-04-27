const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Principal only analytics
router.get('/subjects', protect, authorize('principal'), getAnalytics);

module.exports = router;
