const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestSchema = new Schema({
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'artworks',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
})

const Request = mongoose.model('Request', RequestSchema)

module.exports = Request