const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        from_user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        to_user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        conversationId: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: true
        },
    }, {
    timestamps: true
}
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message