const mongoose = require("mongoose");

const Topic = new mongoose.Schema({
  topic: String,
  from: String,
  likes: Number,
})

module.exports = {
  Topic,
  TopicModel: mongoose.model('Topic', Topic)
}




