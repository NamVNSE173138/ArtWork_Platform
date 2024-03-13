const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  artwork: {
    type: Schema.Types.ObjectId,
    ref: 'artworks',
  },
  amount: {
    type: Number,
    required: true,
  },
  bankName: {
    type: String,
    required: false,
  },
  transCode: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order