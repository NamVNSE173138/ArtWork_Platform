const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'Artwork',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment