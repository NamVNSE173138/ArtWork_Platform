const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    tagName: {
        type: String,
        required: true,
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'artworks',
    },
    price: {
        type: Number,
        required: true,
    },
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag