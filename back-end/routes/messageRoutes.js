const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// /api/messagesに対するGETリクエストを、messageControllerのgetMessages関数に紐づける
router.get('/messages', messageController.getMessages);

module.exports = router;