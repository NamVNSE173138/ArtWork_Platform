const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
  },
  artwork: {
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification