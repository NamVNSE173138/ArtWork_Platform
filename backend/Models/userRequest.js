const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserRequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    priceEst: {
        type: Number,
        required: true,
        default: 0,
    },
    message: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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