const mongoose = require("mongoose");

 const Topic = new mongoose.Schema({
  msg: String,
  date: Date,
  likes: Number,
  status: String,
  userIds: [String]
})

module.exports = mongoose.model('Topic', Topic)