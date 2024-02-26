const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'artworks',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
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

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment