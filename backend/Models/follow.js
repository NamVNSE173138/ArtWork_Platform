const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true
})

const Follow = mongoose.model('Follow', FollowSchema)

module.exports = Follow