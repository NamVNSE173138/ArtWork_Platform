const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavoriteListItemSchema = new Schema({
    favoriteList: {
        type: Schema.Types.ObjectId,
        ref: 'favoritelists',
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'artworks',
    },
}, {
    timestamps: true
})

const FavoriteListItem = mongoose.model('FavoriteListItem', FavoriteListItemSchema)

module.exports = FavoriteListItem