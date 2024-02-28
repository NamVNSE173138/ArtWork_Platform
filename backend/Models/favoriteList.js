const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavoriteListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
}, {
    timestamps: true
})

const FavoriteList = mongoose.model('FavoriteList', FavoriteListSchema)

module.exports = FavoriteList