const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false,
    default: '',
  },
  numOfFollower: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
