const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  artwork: {
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
})

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem