const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistoryListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
}, {
    timestamps: true
})

const HistoryList = mongoose.model('HistoryList', HistoryListSchema)
module.exports = HistoryList