const express = require('express')
const router = express.Router()

const Message = require('../Models/message')
const MessageController = require('../Controllers/MessageController')

router.get('/getMessage', MessageController.getAllMessages)

router.post('/postMessage', MessageController.postNewMessage)

router.get('/getMessageById/:id', MessageController.findMessageById)

router.patch('/updateMessage/:id', MessageController.updateMessage)

router.delete('/deleteMessage/:id', MessageController.deleteMessage)

module.exports = router