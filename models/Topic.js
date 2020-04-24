const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    trim: true,
    required: [true, 'Please add some text'],
  },
  from: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Topic', TopicSchema)