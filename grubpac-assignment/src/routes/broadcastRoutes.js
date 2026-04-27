const express = require('express');
const { getLiveContentByTeacher } = require('../controllers/broadcastController');

const router = express.Router();

router.get('/live/:teacherId', getLiveContentByTeacher);

module.exports = router;
