const createError = require('http-errors')
const mongoose = require('mongoose')
const Comment = require('../Models/comment')

module.exports = {
    getAllComments: async (req, res, next) => {
        try {
            const results = await Comment.find({}, { __v: 0 })
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
    },
    findCommentById: async (req, res, next) => {
        try {
            const id = req.params.id
            const comment = await Comment.findById(id)
            // const comment = await Comment.findOne({ __id: id})
            if (!comment) {
                throw createError(404, "Comment does not exist")
            } else {
                res.send(comment)
            }
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid comment id"))
            }
        }
    },
    postNewComment: async (req, res, next) => {
        try {
            const comment = new Comment(req.body)
            const result = await comment.save()
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },
    updateComment: async (req, res, next) => {
        try {
            const id = req.params.id
            const updates = req.body
            const options = { new: true }
            const result = await Comment.findByIdAndUpdate(id, updates, options)
            if (!result) {
                throw createError(404, 'Comment does not exist')
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid comment id"))
            }
        }
    },
    deleteComment: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await Comment.findByIdAndDelete(id)
            if (!result) {
                throw createError(404, 'Comment does not exist')
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