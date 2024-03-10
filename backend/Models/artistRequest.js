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

const ArtistRequest = mongoose.model('ArtistRequest', ArtistRequestSchema)

module.exports = ArtistRequest