const express = require('express');
const { 
  uploadContent, 
  getMyContent, 
  getAllContent, 
  getPendingContent, 
  approveContent 
} = require('../controllers/contentController');
const { protect, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

// Teacher routes
router.post('/upload', protect, authorize('teacher'), upload.single('file'), uploadContent);
router.get('/my-content', protect, authorize('teacher'), getMyContent);

// Principal routes
router.get('/all', protect, authorize('principal'), getAllContent);
router.get('/pending', protect, authorize('principal'), getPendingContent);
router.patch('/approve/:id', protect, authorize('principal'), approveContent);

module.exports = router;
