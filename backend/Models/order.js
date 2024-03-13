const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  artwork: {
    type: Schema.Types.ObjectId,
    ref: 'artworks',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order