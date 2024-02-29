const createError = require('http-errors')
const mongoose = require('mongoose')
const Tag = require('../Models/tag')

module.exports = {
    getAllTags: async (req, res, next) => {
        try {
            const results = await Tag.find({})
            res.send(results)
        } catch (error) {
            console.log(error.message);
        }
    },
    findTagById: async (req, res, next) => {
        try {
            const id = req.params.id
            const tag = await Tag.findById(id)
            if (!tag) {
                throw createError(404, "Tag does not exist")
            } else {
                res.send(tag)
            }
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid tag id"))
            }
        }
    },
    postNewTag: async (req, res, next) => {
        try {
            const tag = new Tag(req.body)
            const data = await tag.save()
            res.send(data)
        } catch (error) {
            console.log(error.message);
        }
    },
    deleteTag: async (req, res, next) => {
        try {
            const id = req.params.id
            const data = await Tag.findByIdAndDelete(id)
            if (!data) {
                throw createError(404, 'Tag does not exist')
            }
            res.send(data)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid tag id"))
            }
        }
    }
}