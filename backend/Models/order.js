const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
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

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order