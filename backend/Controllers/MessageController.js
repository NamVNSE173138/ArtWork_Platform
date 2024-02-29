const createError = require('http-errors')
const mongoose = require('mongoose')
const Message = require('../Models/message')

module.exports = {
    getAllMessages: async (req, res, next) => {
        try {
            //Get all message
            const results = await Message.find({})
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
    },
    findMessageById: async (req, res, next) => {
        try {
            const id = req.params.id
            const message = await Message.findById(id)
            if (!message) {
                throw createError(404, "Message does not exist")
            } else {
                res.send(message)
            }
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid message id"))
            }
        }
    },
    postNewMessage: async (req, res, next) => {
        try {
            const message = new Message(req.body)
            const result = await message.save()
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },
    updateMessage: async (req, res, next) => {
        try {
            const id = req.params.id
            const updates = req.body
            const options = { new: true }
            const result = await Message.findByIdAndUpdate(id, updates, options)
            if (!result) {
                throw createError(404, 'Comment does not exist')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid message id"))
            }
        }
    },
    deleteMessage: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await Message.findByIdAndDelete(id)
            if (!result) {
                throw createError(404, 'Message does not exist')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid comment id"))
            }
        }
    }
}