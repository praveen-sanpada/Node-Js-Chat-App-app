// routes/ChatRoutes.js
const express = require('express');
const ChatController = require('../controllers/ChatController');
const router = express.Router();

router.post('/add_user', ChatController.createUser);
router.post('/get_user', ChatController.getUserById);
router.post('/add_message', ChatController.createMessage);

module.exports = router;