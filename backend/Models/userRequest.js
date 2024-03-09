const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserRequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
        default: ['none']
    },
    description: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true
})

const UserRequest = mongoose.model('UserRequest', UserRequestSchema)

module.exports = UserRequest