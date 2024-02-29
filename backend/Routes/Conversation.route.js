const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Conversation = require('../Models/conversation.js')
const ConversationController = require('../Controllers/ConversationController.js')

router.get('/getConversation', ConversationController.getAllConversation)

// router.post('/postMessage', MessageController.postNewMessage)

// router.get('/getMessageById/:id', MessageController.findMessageById)

// router.patch('/updateMessage/:id', MessageController.updateMessage)

// router.delete('/deleteMessage/:id', MessageController.deleteMessage)

module.exports = router