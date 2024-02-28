const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistoryListSchema = new Schema({
    historyList: {
        type: Schema.Types.ObjectId,
        ref: 'historylists',
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'artworks',
    },
}, {
    timestamps: true
})

const HistoryListItem = mongoose.model('HistoryListItem', HistoryListSchema)
module.exports = HistoryListItem