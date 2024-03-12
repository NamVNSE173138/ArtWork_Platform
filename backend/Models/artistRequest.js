const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtistRequestSchema = new Schema({
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'Artwork',
    },
    price: {
        type: Number,
        required: true,
        default: 0,
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
    userRequest: {
        type: Schema.Types.ObjectId,
        ref: 'UserRequest',
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

const ArtistRequest = mongoose.model('ArtistRequest', ArtistRequestSchema)

module.exports = ArtistRequest