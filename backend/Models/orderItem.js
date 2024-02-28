const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
    },
    artwork: {
        type: Schema.Types.ObjectId,
        ref: 'artworks',
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

module.exports = OrderItem