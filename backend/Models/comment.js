const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    commentId: {
        type: String,
        required: true,
    },
    artworkId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    numOfLike: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment