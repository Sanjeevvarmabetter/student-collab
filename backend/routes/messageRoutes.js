const express = require('express');
const { getMessages, createMessage } = require('../Controllers/messageController');

const router = express.Router();

router.get('/messages', getMessages);
router.post('/messages', createMessage);

module.exports = router;
