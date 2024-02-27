const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        user_1: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        user_2: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    }, {
    timestamps: true
}
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation