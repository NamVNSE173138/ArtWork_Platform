const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReportSchema = new Schema({
  artwork: {
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true
})

const Report = mongoose.model('Report', ReportSchema)

module.exports = Report